// Invariantes do HTML construído: base das rotas, ausência de JavaScript de
// cliente e hierarquia de heading. O build e o type-check não pegam nenhum
// destes — um href sem url() é uma string válida.

import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { DIST, pages } from "./helpers.mjs";

const BASE = "/portfolio/";

/** Todas as referências internas do build, como [página, href]. */
function internalRefs() {
  const refs = [];
  for (const [rel, html] of pages()) {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const href = match[1];
      if (/^(https?:|mailto:|data:|#)/.test(href)) continue;
      refs.push([rel, href]);
    }
  }
  return refs;
}

test("toda referência interna carrega o prefixo da base", () => {
  for (const [page, href] of internalRefs()) {
    assert.ok(
      href.startsWith(BASE),
      `${page}: "${href}" não passa por url() — aponta para fora de ${BASE}`,
    );
  }
});

test("toda referência interna resolve para um arquivo real", () => {
  for (const [page, href] of internalRefs()) {
    // Sem decodificar, os 24 PDFs de certificado — que têm espaço e pontuação
    // no caminho — dão 24 falsos positivos.
    const clean = decodeURIComponent(href.slice(BASE.length).split(/[?#]/)[0]);
    if (clean === "") continue;
    const target = href.endsWith("/") ? join(clean, "index.html") : clean;
    const full = join(DIST, target);
    const asDir = join(DIST, clean, "index.html");
    assert.ok(
      existsSync(full) || existsSync(asDir),
      `${page}: "${href}" não resolve para nenhum arquivo em dist/`,
    );
  }
});

test("todo script do build é JSON-LD estático, nenhum é executável", () => {
  // A regra do PRD é sobre TIPO, não sobre contagem por página: "nenhum
  // JavaScript de cliente; o único script no HTML de produção é o JSON-LD".
  // A primeira versão deste teste fixou o fato incidental de que só a abertura
  // tinha script, e passou a reprovar quando as fichas ganharam o schema delas.
  for (const [rel, html] of pages()) {
    for (const [, attrs] of html.matchAll(/<script\b([^>]*)>/g)) {
      assert.match(
        attrs,
        /type="application\/ld\+json"/,
        `${rel}: script que não é JSON-LD — o site não leva JavaScript de cliente`,
      );
    }
  }
});

test("todo JSON-LD do build é JSON válido", () => {
  for (const [rel, html] of pages()) {
    for (const [, body] of html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    )) {
      let parsed;
      assert.doesNotThrow(() => {
        parsed = JSON.parse(body);
      }, `${rel}: JSON-LD não parseia`);
      assert.ok(parsed["@type"], `${rel}: JSON-LD sem @type`);
    }
  }
});

test("um <h1> por página, sem pular nível de heading", () => {
  for (const [rel, html] of pages()) {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    assert.equal(
      levels.filter((l) => l === 1).length,
      1,
      `${rel}: esperava exatamente um <h1>`,
    );
    assert.equal(levels[0], 1, `${rel}: a página não começa pelo <h1>`);
    for (let i = 1; i < levels.length; i++) {
      assert.ok(
        levels[i] <= levels[i - 1] + 1,
        `${rel}: salto de h${levels[i - 1]} para h${levels[i]}`,
      );
    }
  }
});

test("toda página declara canonical e título próprio", () => {
  const titles = new Set();
  for (const [rel, html] of pages()) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    assert.ok(canonical, `${rel}: sem canonical`);
    assert.ok(canonical[1].includes(BASE), `${rel}: canonical fora da base`);

    const title = html.match(/<title>([^<]*)<\/title>/);
    assert.ok(title && title[1].trim(), `${rel}: sem <title>`);
    assert.ok(
      !titles.has(title[1]),
      `título repetido entre páginas: "${title[1]}"`,
    );
    titles.add(title[1]);
  }
});
