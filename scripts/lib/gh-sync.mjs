// Lógica pura da sincronização com o GitHub (sem rede, sem I/O) — testável.
// `sync-github.mjs` é só a casca que busca na API e grava o arquivo.

/** Nomes de repositório sempre fora do site. */
export const EXCLUDE = new Set(["portfolio", "rvanguita"]);
/** Topic no GitHub que esconde um repo do site. */
export const HIDE_TOPIC = "portfolio-hide";
/** Limite do fallback de descrição pelo README. */
export const BLURB_MAX = 200;

/** Extrai o usuário do GitHub do texto de src/data/profile.ts. */
export function userFromProfile(profileSource) {
  const m = String(profileSource).match(/github\.com\/([A-Za-z0-9-]+)/);
  return m ? m[1] : null;
}

/** Um repo entra no site? (fora fork, arquivado, privado, EXCLUDE e portfolio-hide) */
export function keepRepo(repo, { exclude = EXCLUDE, hideTopic = HIDE_TOPIC } = {}) {
  if (repo.fork || repo.archived || repo.private) return false;
  if (exclude.has(repo.name)) return false;
  if ((repo.topics || []).includes(hideTopic)) return false;
  return true;
}

/** Repo cru da API → forma estável do snapshot (chaves ordenadas, topics sorted). */
export function normalizeRepo(repo, description = null) {
  return {
    name: repo.name,
    description: description ?? repo.description?.trim() ?? null,
    language: repo.language || null,
    topics: (repo.topics || []).slice().sort(),
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    archived: !!repo.archived,
    fork: !!repo.fork,
    pushedAt: repo.pushed_at,
    createdAt: repo.created_at,
    homepage: repo.homepage || null,
    url: repo.html_url,
    license: repo.license?.spdx_id || null,
  };
}

/** 1º parágrafo "de verdade" de um README markdown, achatado e truncado. */
export function blurbFromReadme(markdown, max = BLURB_MAX) {
  if (!markdown) return null;
  const para = markdown
    .replace(/^#.*$/m, "") // tira o primeiro H1
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .find(
      (s) =>
        s &&
        !s.startsWith("#") &&
        !s.startsWith("![") &&
        !s.startsWith("```") &&
        !s.startsWith(">") &&
        !s.startsWith("|"),
    );
  if (!para) return null;
  const flat = para.replace(/\s+/g, " ").replace(/[*_`>]/g, "").trim();
  return flat.length > max ? flat.slice(0, max - 3).trimEnd() + "…" : flat;
}

/** Ordena por push mais recente primeiro (string ISO). */
export function byPushedDesc(a, b) {
  return String(b.pushedAt ?? b.pushed_at).localeCompare(
    String(a.pushedAt ?? a.pushed_at),
  );
}

/** A lista de repos e o usuário são iguais aos do snapshot anterior? */
export function sameSnapshot(prev, repos, user) {
  return (
    !!prev &&
    prev.user === user &&
    JSON.stringify(prev.repos) === JSON.stringify(repos)
  );
}
