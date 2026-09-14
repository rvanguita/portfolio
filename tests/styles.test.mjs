// Invariantes do sistema de estilos. Os três já quebraram pelo menos uma vez:
// o --layer-gold saiu do bloco de impressão sem ninguém notar, a rampa medalhão
// perdeu a cor por especificidade, e cartão e legenda chegaram a divergir.

import { test } from "node:test";
import assert from "node:assert/strict";
import { read, bundledCss, cssBlock } from "./helpers.mjs";

const TOKENS = [
  "paper",
  "well",
  "ink",
  "ink-soft",
  "rule",
  "rule-strong",
  "accent",
  "accent-bright",
  "on-accent",
  "signal",
  "signal-open",
  "layer-raw",
  "layer-bronze",
  "layer-silver",
  "layer-gold",
];

test("as 15 cores existem nos cinco lugares (4 temas + impressão)", () => {
  const tokens = read("src/styles/tokens.css");
  const global = read("src/styles/global.css");

  // Os quatro blocos de tema: :root, o escuro por preferência, e as duas
  // inversões — duas delas aninhadas dentro do @media escuro, então a varredura
  // conta chaves em vez de tentar casar com uma expressão regular.
  const themeBlocks = [];
  for (const match of tokens.matchAll(/([^{}]*:root[^{}]*)\{/g)) {
    const open = match.index + match[0].length - 1;
    let depth = 0;
    for (let i = open; i < tokens.length; i++) {
      if (tokens[i] === "{") depth++;
      else if (tokens[i] === "}" && --depth === 0) {
        const body = tokens.slice(open + 1, i);
        if (body.includes("--paper:"))
          themeBlocks.push([match[1].trim(), body]);
        break;
      }
    }
  }

  assert.equal(
    themeBlocks.length,
    4,
    `esperava 4 blocos de tema, achei ${themeBlocks.length}`,
  );

  for (const [selector, body] of themeBlocks) {
    for (const token of TOKENS) {
      assert.match(
        body,
        new RegExp(`--${token}\\s*:`),
        `--${token} falta em "${selector}"`,
      );
    }
  }

  const print = cssBlock(global, "@media print");
  assert.ok(print, "bloco @media print não encontrado");
  for (const token of TOKENS) {
    assert.match(
      print,
      new RegExp(`--${token}\\s*:`),
      `--${token} falta no @media print`,
    );
  }
});

test("theme-color do BaseHead acompanha --paper nos dois temas", () => {
  const head = read("src/components/layout/BaseHead.astro");
  const tokens = read("src/styles/tokens.css");
  const declared = [...head.matchAll(/content="(#[0-9A-Fa-f]{3,8})"/g)].map(
    (m) => m[1].toUpperCase(),
  );
  const papers = [...tokens.matchAll(/--paper:\s*(#[0-9A-Fa-f]{3,8})/g)].map(
    (m) => m[1].toUpperCase(),
  );

  assert.equal(declared.length, 2, "esperava dois theme-color, claro e escuro");
  for (const color of declared) {
    assert.ok(
      papers.includes(color),
      `theme-color ${color} não corresponde a nenhum --paper`,
    );
  }
});

test("LAYERS do Readout cobre exatamente as regras .chain--*", () => {
  const readout = read("src/components/panels/Readout.astro");
  const css = read("src/styles/global.css");

  const declared = [
    ...readout
      .match(/const LAYERS\s*=\s*\[([^\]]*)\]/)[1]
      .matchAll(/"([^"]+)"/g),
  ]
    .map((m) => m[1])
    .sort();
  const styled = [
    ...new Set([...css.matchAll(/\.chain--([a-z]+)/g)].map((m) => m[1])),
  ].sort();

  assert.deepEqual(
    declared,
    styled,
    "um termo em LAYERS sem regra .chain--* sai classificado e sem estilo (ou vice-versa)",
  );
});

test("a regra base da cadeia não usa o atalho border-left", () => {
  const css = read("src/styles/global.css");
  const base = cssBlock(css, '.metric-chain li[class*="chain--"]');
  assert.ok(base, "regra base da cadeia não encontrada");
  assert.doesNotMatch(
    base,
    /border-left\s*:/,
    "o atalho vence as regras de camada por especificidade e apaga a rampa inteira",
  );
  assert.match(base, /border-left-width/);
  assert.match(base, /border-left-style/);
});

test("cada metricKind tem a sua regra .metric--<kind>", () => {
  const metric = read("src/lib/metric.ts");
  const css = read("src/styles/global.css");

  const kinds = [
    ...metric
      .match(/METRIC_KINDS[^=]*=\s*\[([^\]]*)\]/)[1]
      .matchAll(/"([^"]+)"/g),
  ].map((m) => m[1]);
  const ruled = new Set(
    [...css.matchAll(/\.metric--([a-z]+)/g)].map((m) => m[1]),
  );

  for (const kind of kinds) {
    assert.ok(
      ruled.has(kind),
      `metricKind "${kind}" não tem regra .metric--${kind}`,
    );
  }
  for (const rule of ruled) {
    assert.ok(
      kinds.includes(rule),
      `.metric--${rule} não corresponde a nenhum metricKind`,
    );
  }
});

test("movimento só existe dentro do guard de prefers-reduced-motion", () => {
  const css = bundledCss();
  const transitions = (css.match(/transition\s*:/g) ?? []).length;
  const guard = cssBlock(css, "prefers-reduced-motion");

  assert.equal(
    (css.match(/@keyframes/g) ?? []).length,
    0,
    "nenhuma animação é esperada",
  );
  assert.ok(guard, "guard de prefers-reduced-motion não encontrado no bundle");
  const inside = (guard.match(/transition\s*:/g) ?? []).length;
  assert.equal(
    inside,
    transitions,
    "há transição fora do guard: quem pede menos movimento receberia mesmo assim",
  );
});
