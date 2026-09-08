// Consome o snapshot versionado gerado por `scripts/sync-github.mjs`.
// O build lê só este JSON — nunca a API do GitHub.
import snapshot from "./github-repos.json";

export interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  archived: boolean;
  fork: boolean;
  pushedAt: string;
  createdAt: string;
  homepage: string | null;
  url: string;
  license: string | null;
}

export const githubUser: string = snapshot.user;
export const allRepos: Repo[] = snapshot.repos as Repo[];
export const publicRepoCount = allRepos.length;
export const syncedAt: string = snapshot.generatedAt;

const byName = new Map(allRepos.map((r) => [r.name, r]));

/** Metadados ao vivo de um repo (para os cards curados). */
export function repoMeta(name?: string): Repo | null {
  return name ? (byName.get(name) ?? null) : null;
}

const NEW_DAYS = 30;
export function isNew(repo: Repo): boolean {
  const ref = Date.parse(repo.pushedAt || repo.createdAt);
  return Number.isFinite(ref) && Date.now() - ref < NEW_DAYS * 864e5;
}

/** "há 3 meses" / "há 5 dias" — pt-BR. */
export function relativeTime(iso: string): string {
  const then = Date.parse(iso);
  if (!Number.isFinite(then)) return "";
  const secs = Math.round((then - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  const steps: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of steps) {
    if (Math.abs(secs) >= size || unit === "minute") {
      return rtf.format(Math.round(secs / size), unit);
    }
  }
  return "agora";
}

/** Repos públicos que nenhum projeto curado reivindicou. `portfolio-pin` primeiro. */
export function pickExtras(claimed: Iterable<string>): Repo[] {
  const taken = new Set(claimed);
  return allRepos
    .filter((r) => !taken.has(r.name))
    .sort((a, b) => {
      const ap = a.topics.includes("portfolio-pin") ? 0 : 1;
      const bp = b.topics.includes("portfolio-pin") ? 0 : 1;
      return ap - bp || b.pushedAt.localeCompare(a.pushedAt);
    });
}

/** Topics "de verdade" — sem os de controle do portfólio. */
export function displayTopics(repo: Repo): string[] {
  return repo.topics.filter((t) => !t.startsWith("portfolio-"));
}

/** Aviso no build: card curado aponta para um repo que sumiu do snapshot. */
export function warnMissing(claimed: Iterable<string>): void {
  const known = new Set(allRepos.map((r) => r.name));
  for (const name of new Set(claimed)) {
    if (!known.has(name)) {
      console.warn(
        `[portfolio] card curado referencia repo ausente do snapshot: "${name}" ` +
          `— apagado, privado, arquivado ou renomeado? rode \`npm run sync\`.`,
      );
    }
  }
}
