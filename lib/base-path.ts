/**
 * Prefixo de deploy (GitHub Pages: /portfolio). Equivalente ao `baseurl` do Jekyll.
 *
 * `next/link` já prefixa o basePath automaticamente. `next/image` NÃO prefixa
 * com output:'export' + images.unoptimized. Use este helper para tudo servido
 * de /public: `src`/`href` de imagens, PDFs de certificado, favicon, card
 * social — e para URLs em metadata.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_ORIGIN = "https://rvanguita.github.io";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/** Monta o href público de um arquivo em /public, com basePath e espaços escapados. */
export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${encodeURI(normalized)}`;
}
