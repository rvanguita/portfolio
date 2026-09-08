// Constantes do site num lugar só. `SITE.url` / `SITE.base` são a fonte para
// `astro.config.mjs`; `NAV` alimenta a barra de leitura (ReadoutStrip).

export const SITE = {
  url: "https://rvanguita.github.io",
  base: "/portfolio",
  title: "rvanguita",
  locale: "pt-BR",
} as const;

export type NavKey =
  "home" | "projetos" | "trajetoria" | "competencias" | "certificacoes";

export const NAV: readonly { href: string; label: string; key: NavKey }[] = [
  { href: "/", label: "Painel", key: "home" },
  { href: "/projetos/", label: "Projetos", key: "projetos" },
  { href: "/trajetoria/", label: "Trajetória", key: "trajetoria" },
  { href: "/competencias/", label: "Competências", key: "competencias" },
  { href: "/certificacoes/", label: "Certificações", key: "certificacoes" },
];
