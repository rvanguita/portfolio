#!/usr/bin/env node
// Sincroniza os metadados dos repositórios públicos do usuário GitHub do perfil
// para src/data/github-repos.json. Node puro (fetch global), sem dependências.
//
//   node scripts/sync-github.mjs
//
// Usa GITHUB_TOKEN do ambiente se existir (5000 req/h); senão, anônimo (60/h).
// Idempotente: mesma entrada da API → mesmo arquivo. A lógica pura mora em
// scripts/lib/gh-sync.mjs (testada em scripts/sync-github.test.mjs).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  userFromProfile,
  keepRepo,
  normalizeRepo,
  blurbFromReadme,
  byPushedDesc,
  sameSnapshot,
} from "./lib/gh-sync.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/data/github-repos.json");

const token = process.env.GITHUB_TOKEN || process.env.PORTFOLIO_GITHUB_TOKEN || "";
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "rvanguita-portfolio-sync",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function gh(path, accept) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: accept ? { ...headers, Accept: accept } : headers,
  });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status} ${res.statusText}`);
  return res;
}

async function resolveUser() {
  const src = await readFile(join(ROOT, "src/data/profile.ts"), "utf8");
  const user = userFromProfile(src);
  if (!user) throw new Error("não achei o usuário do GitHub em src/data/profile.ts");
  return user;
}

async function listRepos(user) {
  const out = [];
  for (let page = 1; ; page++) {
    const batch = await (
      await gh(`/users/${user}/repos?per_page=100&type=owner&sort=pushed&page=${page}`)
    ).json();
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

async function readmeBlurb(user, repo) {
  try {
    const res = await gh(
      `/repos/${user}/${repo}/readme`,
      "application/vnd.github.raw+json",
    );
    return blurbFromReadme(await res.text());
  } catch {
    return null;
  }
}

async function main() {
  const user = await resolveUser();
  const raw = await listRepos(user);

  const kept = raw.filter((r) => keepRepo(r));
  const repos = [];
  for (const r of kept) {
    const desc =
      r.description?.trim() || (await readmeBlurb(user, r.name)) || null;
    repos.push(normalizeRepo(r, desc));
  }
  repos.sort(byPushedDesc);

  // idempotência: só troca `generatedAt` quando a lista de repos muda de fato.
  let generatedAt = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  try {
    const prev = JSON.parse(await readFile(OUT, "utf8"));
    if (sameSnapshot(prev, repos, user)) generatedAt = prev.generatedAt;
  } catch {
    /* primeiro run */
  }

  await writeFile(OUT, JSON.stringify({ generatedAt, user, repos }, null, 2) + "\n");
  console.log(
    `synced ${repos.length} repos → src/data/github-repos.json` +
      (token ? " (authed)" : " (anon)"),
  );
}

main().catch((err) => {
  console.error(String(err.message || err));
  process.exit(1);
});
