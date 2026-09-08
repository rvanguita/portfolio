#!/usr/bin/env node
// Sincroniza os metadados dos repositórios públicos do usuário GitHub do perfil
// para src/data/github-repos.json. Node puro (fetch global), sem dependências.
//
//   node scripts/sync-github.mjs
//
// Usa GITHUB_TOKEN do ambiente se existir (5000 req/h); senão, anônimo (60/h).
// Idempotente: mesma entrada da API → mesmo arquivo.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/data/github-repos.json");

/** Nomes de repositório sempre fora do site. */
const EXCLUDE = new Set(["portfolio", "rvanguita"]);
/** Topic no GitHub que esconde um repo do site. */
const HIDE_TOPIC = "portfolio-hide";

const token = process.env.GITHUB_TOKEN || process.env.PORTFOLIO_GITHUB_TOKEN || "";
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "rvanguita-portfolio-sync",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub ${path} → ${res.status} ${res.statusText}`);
  }
  return res;
}

/** Lê o usuário do link do GitHub em src/data/profile.ts (fonte única). */
async function resolveUser() {
  const src = await readFile(join(ROOT, "src/data/profile.ts"), "utf8");
  const m = src.match(/github\.com\/([A-Za-z0-9-]+)/);
  if (!m) throw new Error("não achei o usuário do GitHub em src/data/profile.ts");
  return m[1];
}

async function listRepos(user) {
  const out = [];
  for (let page = 1; ; page++) {
    const res = await gh(
      `/users/${user}/repos?per_page=100&type=owner&sort=pushed&page=${page}`,
    );
    const batch = await res.json();
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

/** 1º parágrafo do README, sem o H1, truncado — só quando falta `description`. */
async function readmeBlurb(user, repo) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${user}/${repo}/readme`,
      { headers: { ...headers, Accept: "application/vnd.github.raw+json" } },
    );
    if (!res.ok) return null;
    const md = await res.text();
    const firstPara = md
      .replace(/^#.*$/m, "") // tira o primeiro H1
      .split(/\n\s*\n/)
      .map((s) => s.trim())
      .find((s) => s && !s.startsWith("#") && !s.startsWith("![") && !s.startsWith("```"));
    if (!firstPara) return null;
    const flat = firstPara.replace(/\s+/g, " ").replace(/[*_`>]/g, "").trim();
    return flat.length > 200 ? flat.slice(0, 197).trimEnd() + "…" : flat;
  } catch {
    return null;
  }
}

async function main() {
  const user = await resolveUser();
  const raw = await listRepos(user);

  const kept = raw
    .filter((r) => !r.fork && !r.archived && !r.private)
    .filter((r) => !EXCLUDE.has(r.name))
    .filter((r) => !(r.topics || []).includes(HIDE_TOPIC));

  const repos = [];
  for (const r of kept.sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))) {
    let description = r.description?.trim() || null;
    if (!description) description = await readmeBlurb(user, r.name);
    repos.push({
      name: r.name,
      description,
      language: r.language || null,
      topics: (r.topics || []).slice().sort(),
      stars: r.stargazers_count,
      forks: r.forks_count,
      archived: r.archived,
      fork: r.fork,
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
      homepage: r.homepage || null,
      url: r.html_url,
      license: r.license?.spdx_id || null,
    });
  }

  // idempotência: só troca `generatedAt` quando a lista de repos muda de fato,
  // senão o bot abriria um PR toda semana só por causa do carimbo de tempo.
  let generatedAt = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  try {
    const prev = JSON.parse(await readFile(OUT, "utf8"));
    if (JSON.stringify(prev.repos) === JSON.stringify(repos) && prev.user === user) {
      generatedAt = prev.generatedAt;
    }
  } catch {
    /* primeiro run — sem arquivo anterior */
  }

  const doc = { generatedAt, user, repos };
  await writeFile(OUT, JSON.stringify(doc, null, 2) + "\n", "utf8");
  console.log(
    `synced ${repos.length} repos → src/data/github-repos.json` +
      (token ? " (authed)" : " (anon)"),
  );
}

main().catch((err) => {
  console.error(String(err.message || err));
  process.exit(1);
});
