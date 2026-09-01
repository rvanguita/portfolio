/**
 * Prefixo de deploy (GitHub Pages: /portfolio). Equivalente ao `baseurl` do Jekyll.
 *
 * `next/link` e `next/image` já prefixam o basePath automaticamente. Este helper
 * é para os casos que o Next NÃO prefixa: `href` de arquivos servidos de /public
 * (PDFs de certificado, favicon, imagem de card social) e URLs em metadata.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_ORIGIN = "https://rvanguita.github.io";

export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/** Monta o href público de um arquivo em /public, com basePath e espaços escapados. */
export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${encodeURI(normalized)}`;
}
