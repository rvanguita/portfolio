/**
 * `true` quando `url` tem um esquema absoluto (`https://`, `http://`, …) — ou
 * seja, aponta para fora do site. Rotas internas (`/projetos/…`, `#sec`) e
 * `mailto:` (sem `//`) retornam `false`.
 *
 * Fonte única para a distinção interno/externo (usada em `ProjectActionLink`).
 */
export function isExternalUrl(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(url);
}
