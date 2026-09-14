// Utilitários compartilhados pelos testes de invariante.
//
// Os testes leem `dist/`, não os fontes, porque vários invariantes só existem
// depois do build: o CSS é um bundle, o JSON-LD é serializado e os links já
// carregam o prefixo da base. Rodar `npm run build` antes é obrigatório.

import { readFileSync, existsSync, statSync } from "node:fs";
import { globSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const DIST = join(ROOT, "dist");

export function read(relative) {
  return readFileSync(join(ROOT, relative), "utf8");
}

/** Todas as páginas construídas, como [caminho relativo, html]. */
export function pages() {
  return globSync("**/index.html", { cwd: DIST })
    .sort()
    .map((rel) => [rel, readFileSync(join(DIST, rel), "utf8")]);
}

/** O bundle de CSS emitido pelo Astro. */
export function bundledCss() {
  const files = globSync("_astro/*.css", { cwd: DIST });
  if (files.length !== 1) {
    throw new Error(`esperava um bundle de CSS, encontrei ${files.length}`);
  }
  return readFileSync(join(DIST, files[0]), "utf8");
}

/**
 * Texto visível de uma página: sem <head>, sem <script>, sem <style>, sem tags.
 * É o que um leitor enxerga — a base para conferir se uma afirmação de metadado
 * tem lastro na página.
 */
export function visibleText(html) {
  const body = html
    .replace(/<head>[\s\S]*?<\/head>/i, " ")
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(body).replace(/\s+/g, " ").trim();
}

function decodeEntities(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/** Extrai o bloco de um seletor CSS balanceado, a partir da sua primeira chave. */
export function cssBlock(css, needle) {
  const start = css.indexOf(needle);
  if (start === -1) return null;
  const open = css.indexOf("{", start);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(open + 1, i);
  }
  return null;
}

export { existsSync, statSync, join };
