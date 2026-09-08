// node --test  ·  testa a lógica pura de scripts/lib/gh-sync.mjs + valida o
// snapshot commitado. Sem rede.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

test("userFromProfile extrai o handle do link do GitHub", () => {
  assert.equal(
    userFromProfile(`  github: "https://github.com/rvanguita",`),
    "rvanguita",
  );
  assert.equal(userFromProfile("linkedin: https://linkedin.com/in/x"), null);
});

test("keepRepo filtra fork / arquivado / privado / excluídos / portfolio-hide", () => {
  const ok = { name: "algo", fork: false, archived: false, private: false, topics: [] };
  assert.equal(keepRepo(ok), true);
  assert.equal(keepRepo({ ...ok, fork: true }), false);
  assert.equal(keepRepo({ ...ok, archived: true }), false);
  assert.equal(keepRepo({ ...ok, private: true }), false);
  assert.equal(keepRepo({ ...ok, name: "portfolio" }), false);
  assert.equal(keepRepo({ ...ok, name: "rvanguita" }), false);
  assert.equal(keepRepo({ ...ok, topics: ["x", "portfolio-hide"] }), false);
  // overrides
  assert.equal(keepRepo({ ...ok, name: "z" }, { exclude: new Set(["z"]) }), false);
  assert.equal(
    keepRepo({ ...ok, topics: ["secreto"] }, { hideTopic: "secreto" }),
    false,
  );
});

test("normalizeRepo mapeia campos, ordena topics e usa o fallback de descrição", () => {
  const out = normalizeRepo(
    {
      name: "r",
      description: "  da API  ",
      language: "Python",
      topics: ["z", "a"],
      stargazers_count: 3,
      forks_count: 1,
      archived: false,
      fork: false,
      pushed_at: "2026-01-02T00:00:00Z",
      created_at: "2025-01-01T00:00:00Z",
      homepage: "",
      html_url: "https://github.com/x/r",
      license: { spdx_id: "MIT" },
    },
    null,
  );
  assert.deepEqual(Object.keys(out).sort(), [
    "archived", "createdAt", "description", "fork", "forks", "homepage",
    "language", "license", "name", "pushedAt", "stars", "topics", "url",
  ]);
  assert.equal(out.description, "da API");
  assert.deepEqual(out.topics, ["a", "z"]);
  assert.equal(out.homepage, null);
  assert.equal(out.license, "MIT");
  assert.equal(out.stars, 3);

  // descrição explícita ganha da API; sem nenhuma → null
  assert.equal(normalizeRepo({ name: "r", description: "x" }, "do README").description, "do README");
  assert.equal(normalizeRepo({ name: "r" }).description, null);
  assert.equal(normalizeRepo({ name: "r", stargazers_count: undefined }).stars, 0);
});

test("blurbFromReadme pega o 1º parágrafo, pula ruído e trunca", () => {
  const md = [
    "# Título",
    "",
    "![badge](x.svg)",
    "",
    "> citação",
    "",
    "Primeiro **parágrafo** de verdade, com `código`.",
    "",
    "Segundo.",
  ].join("\n");
  assert.equal(
    blurbFromReadme(md),
    "Primeiro parágrafo de verdade, com código.",
  );
  assert.equal(blurbFromReadme("# Só um título\n"), null);
  assert.equal(blurbFromReadme(""), null);

  const longo = "x ".repeat(300);
  const cut = blurbFromReadme(`# t\n\n${longo}`);
  assert.ok(cut.length <= 200 && cut.endsWith("…"));
});

test("byPushedDesc ordena do mais recente pro mais antigo", () => {
  const a = { pushedAt: "2020-01-01T00:00:00Z" };
  const b = { pushedAt: "2026-01-01T00:00:00Z" };
  assert.deepEqual([a, b].sort(byPushedDesc), [b, a]);
  // aceita a forma crua da API também
  assert.deepEqual(
    [{ pushed_at: "2021" }, { pushed_at: "2025" }].sort(byPushedDesc).map((r) => r.pushed_at),
    ["2025", "2021"],
  );
});

test("sameSnapshot detecta igualdade e diferença", () => {
  const repos = [{ name: "a" }];
  assert.equal(sameSnapshot({ user: "u", repos }, [{ name: "a" }], "u"), true);
  assert.equal(sameSnapshot({ user: "u", repos }, [{ name: "b" }], "u"), false);
  assert.equal(sameSnapshot({ user: "u", repos }, repos, "outro"), false);
  assert.equal(sameSnapshot(null, repos, "u"), false);
});

test("o snapshot commitado (src/data/github-repos.json) está válido", () => {
  const snap = JSON.parse(
    readFileSync(join(ROOT, "src/data/github-repos.json"), "utf8"),
  );
  assert.equal(snap.user, "rvanguita");
  assert.ok(Array.isArray(snap.repos) && snap.repos.length > 0);
  assert.match(snap.generatedAt, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

  const keys = [
    "archived", "createdAt", "description", "fork", "forks", "homepage",
    "language", "license", "name", "pushedAt", "stars", "topics", "url",
  ];
  for (const r of snap.repos) {
    assert.deepEqual(Object.keys(r).sort(), keys, `chaves de ${r.name}`);
    assert.equal(r.fork, false);
    assert.equal(r.archived, false);
    assert.ok(!["portfolio", "rvanguita"].includes(r.name));
    assert.ok(!r.topics.includes("portfolio-hide"));
  }
  // ordenado por push desc
  const pushed = snap.repos.map((r) => r.pushedAt);
  assert.deepEqual(pushed, [...pushed].sort().reverse());
});
