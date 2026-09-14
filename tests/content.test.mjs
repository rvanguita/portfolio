// Invariantes de conteúdo: as contagens que o PRD e o SDD publicam, a fidelidade
// dos diagramas e a regra de honestidade do JSON-LD — que já foi violada uma vez,
// com quatro termos declarados sem lastro no texto visível.

import { test } from "node:test";
import assert from "node:assert/strict";
import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ROOT,
  DIST,
  read,
  pages,
  routes,
  visibleText,
  TOKENS,
} from "./helpers.mjs";

const projectFiles = globSync("src/content/projetos/*.md", { cwd: ROOT }).map(
  (rel) => [rel, readFileSync(join(ROOT, rel), "utf8")],
);

/** Sinônimos de busca aceitos no schema: o site mostra o equivalente, não o termo. */
const SEARCH_SYNONYMS = new Set(["Data Engineering", "Apache Spark"]);

/**
 * Números por extenso que a prosa dos documentos usa, em pt e en. Só os que
 * aparecem: uma tabela maior daria a impressão de cobertura que ela não tem.
 */
const POR_EXTENSO = {
  três: 3,
  tres: 3,
  quatro: 4,
  cinco: 5,
  nove: 9,
  dez: 10,
  quinze: 15,
  three: 3,
  four: 4,
  five: 5,
  nine: 9,
  ten: 10,
  fifteen: 15,
};

/** O grupo de captura das contagens: numeral ou número por extenso. */
const N = [String.raw`\d+`, ...Object.keys(POR_EXTENSO)].join("|");

const valor = (bruto) => POR_EXTENSO[bruto.toLowerCase()] ?? Number(bruto);

// Derivadas uma vez e usadas nos dois testes: o de código afirma o número que os
// documentos publicam hoje, o de prosa confronta os documentos com o real. Se as
// duas pontas lessem fontes diferentes, elas poderiam divergir em silêncio — que
// é justamente a falha que estes testes existem para pegar.
// Cada item é `{ name, projectIds }`: contar `name:` é imune tanto à lista de
// evidências aninhada quanto a um regex não-guloso parar no `]` errado.
const itens = (read("src/data/skills.ts").match(/name:\s*"/g) ?? []).length;
const grupos = [...read("src/data/skills.ts").matchAll(/items:\s*\[/g)].length;
const certificados = (
  read("src/data/certificates.ts").match(/file:\s*"/g) ?? []
).length;
// `years: "` e não `years:`, senão a declaração da interface (`years: string;`)
// entra na conta — a mesma armadilha que o teste dos certificados evita.
const entradas = (read("src/data/timeline.ts").match(/years:\s*"/g) ?? [])
  .length;
const comArquitetura = projectFiles.filter(([, md]) =>
  /^architecture:/m.test(md),
).length;
// Sai das rotas construídas, não do vocabulário: o que os documentos publicam é
// quantas páginas existem, e é o build que decide isso ao aplicar o mínimo de
// dois projetos.
const paginasDeTecnologia = routes().filter(([rel]) =>
  rel.startsWith("projetos/stack/"),
).length;

test("as contagens publicadas continuam de pé", () => {
  assert.equal(routes().length, 24, "24 rotas");
  assert.equal(projectFiles.length, 9, "9 projetos");

  assert.equal(grupos, 4, "4 grupos de competência");
  assert.equal(itens, 29, "29 itens de competência");
  assert.equal(certificados, 24, "24 certificados");
  assert.equal(comArquitetura, 4, "4 projetos declaram arquitetura");
  assert.equal(entradas, 9, "9 entradas de trajetória");
  assert.equal(paginasDeTecnologia, 10, "10 páginas de tecnologia");
  // A lista canônica vive em helpers.mjs; styles.test.mjs confere que cada cor
  // existe nos cinco lugares, e aqui só a contagem que os documentos publicam.
  assert.equal(TOKENS.length, 15, "15 cores semânticas");
});

test("cada certificado referenciado existe em public/", () => {
  const certs = read("src/data/certificates.ts");
  for (const [, file] of certs.matchAll(/file:\s*"([^"]+)"/g)) {
    const path = join(ROOT, "public", "certificates", file);
    assert.ok(
      globSync(file, { cwd: join(ROOT, "public/certificates") }).length > 0,
      `certificado ausente em public/certificates: ${file} (${path})`,
    );
  }
});

test("nenhum diagrama mostra camada que o projeto não descreve", () => {
  for (const [rel, md] of projectFiles) {
    const arch = md.match(/^architecture:[\s\S]*?(?=^[a-z_]+:|^---)/m);
    if (!arch) continue;
    const layers = [...arch[0].matchAll(/^\s*-?\s*layer:\s*(\w+)/gm)].map(
      (m) => m[1],
    );
    for (const layer of layers) {
      if (layer === "source") continue; // "source" é a origem, não uma camada nomeada no texto
      assert.match(
        md,
        new RegExp(`\\b${layer}\\b`, "i"),
        `${rel}: o diagrama declara a camada "${layer}", que o texto do projeto não menciona`,
      );
    }
  }
});

test("o schema da abertura só declara o que a página mostra", () => {
  const home = readFileSync(join(DIST, "index.html"), "utf8");
  const json = home.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(json, "JSON-LD não encontrado na abertura");
  const schema = JSON.parse(json[1]);

  const allVisible = pages().map(([, html]) => visibleText(html).toLowerCase());
  for (const term of schema.knowsAbout) {
    if (SEARCH_SYNONYMS.has(term)) continue;
    const found = allVisible.some((text) => text.includes(term.toLowerCase()));
    assert.ok(
      found,
      `knowsAbout declara "${term}", que não aparece no texto visível de nenhuma página. ` +
        `Ou o site passa a mostrar, ou o termo sai, ou entra em SEARCH_SYNONYMS com justificativa.`,
    );
  }
});

test("as ressalvas de honestidade continuam literais", () => {
  const cases = [
    ["fastf1.md", /experimental/i, "o modelo do FastF1 segue experimental"],
    [
      "otimizacao-eletrica.md",
      /submetido/i,
      "o artigo da INDUSCON está submetido, nunca aceito",
    ],
    [
      "fraud-detection.md",
      /em desenvolvimento/i,
      "o fraud-detection está em desenvolvimento",
    ],
    [
      "bank-churn.md",
      /incomuns em dados/i,
      "o bank-churn mantém a ressalva de viés do dataset",
    ],
  ];
  for (const [file, pattern, why] of cases) {
    const entry = projectFiles.find(([rel]) => rel.endsWith(file));
    assert.ok(entry, `${file} não encontrado`);
    // O Markdown quebra linha no meio das frases: normalizar antes de casar,
    // senão a ressalva "incomuns em\ndados" escapa do teste.
    assert.match(entry[1].replace(/\s+/g, " "), pattern, why);
  }
});

test('"pleno" aparece só como cargo procurado', () => {
  for (const [rel, html] of pages()) {
    const text = visibleText(html);
    for (const match of text.matchAll(/pleno/gi)) {
      const before = text.slice(Math.max(0, match.index - 120), match.index);
      assert.match(
        before,
        /busco|cargos/i,
        `${rel}: "pleno" sem o enquadramento de cargo procurado — vira cargo exercido`,
      );
    }
  }
});

test("as contagens que os documentos publicam batem com o código", () => {
  // Esta classe de erro já reapareceu três vezes: alguém muda o conteúdo e os
  // números no PRD, no SDD e no README ficam para trás.
  //
  // Duas armadilhas, ambas já vividas. O Markdown quebra linha no meio das
  // frases, então "29 itens de\ncompetência" escapa de um padrão ingênuo — daí a
  // normalização do espaço antes de casar. E um padrão que não casa com nada
  // passa em silêncio, dando falsa segurança: por isso cada checagem exige pelo
  // menos uma ocorrência.
  //
  // Os padrões são específicos porque "N projetos" e "N itens" também aparecem
  // como recorte legítimo — "só os 4 projetos que declaram arquitetura", "as
  // outras cinco rotas sem lastmod", ou "3 grupos, 24 itens" falando de
  // certificados. Os lookbehinds são a lista dos marcadores que abrem um
  // recorte: "só os", "dos", "outros", "outras".
  //
  // A terceira armadilha é a prosa escrever o número por extenso. "Quinze cores
  // semânticas" no SDD e "nove projetos" no README passavam em silêncio por um
  // padrão que só casa `\d+`, e obrigar a prosa a virar numeral seria dobrar o
  // texto ao regex — o certo é a guarda ler o que os documentos já escrevem.
  const checagens = [
    [`(?<!outras )(${N}) rotas`, "gi", routes().length, "rotas"],
    [`(${N}) skill items`, "gi", itens, "skill items"],
    [`(${N}) certificate entries`, "gi", certificados, "certificate entries"],
    // Todo "N itens" conta competência, menos a linha dos certificados, que usa
    // a mesma palavra para outra coisa ("3 grupos, 24 itens").
    [
      `(?<!3 grupos, )(?<!\\d)(${N}) itens`,
      "gi",
      itens,
      "itens de competência",
    ],
    [`(${N}) certificados`, "gi", certificados, "certificados"],
    [
      `(?<!só os )(?<!dos )(?<!outros )(${N}) projetos`,
      "gi",
      projectFiles.length,
      "projetos",
    ],
    // O CLAUDE.md publica as mesmas contagens em inglês, e ficou de fora na
    // primeira versão deste teste — que é como a drift voltaria justamente pelo
    // arquivo que orienta quem trabalha aqui.
    [`(${N}) projects`, "gi", projectFiles.length, "projects"],
    // Os quatro abaixo eram a lacuna seguinte: são exatamente os números que o
    // SDD nomeia como os primeiros a envelhecer, e nenhum tinha guarda.
    //
    // Os substantivos vão qualificados porque a palavra solta pertence a outra
    // contagem no mesmo parágrafo: "3 grupos" são os dos certificados, e
    // "dez entradas" são as do .prettierignore.
    [`(${N}) cores`, "gi", TOKENS.length, "cores semânticas"],
    [`(${N}) semantic colors`, "gi", TOKENS.length, "semantic colors"],
    [
      `(${N}) grupos de (?:capacidade|compet[êe]ncias?)`,
      "gi",
      grupos,
      "grupos de competência",
    ],
    [`(${N}) entradas de trajetória`, "gi", entradas, "entradas de trajetória"],
    [
      `(${N}) diagramas de arquitetura`,
      "gi",
      comArquitetura,
      "diagramas de arquitetura",
    ],
    [
      `(${N}) (?:páginas de tecnologia|technology pages)`,
      "gi",
      paginasDeTecnologia,
      "páginas de tecnologia",
    ],
  ].map(([fonte, flags, esperado, rotulo]) => [
    new RegExp(fonte, flags),
    esperado,
    rotulo,
  ]);

  const vistos = new Map(checagens.map(([, , rotulo]) => [rotulo, 0]));
  for (const arquivo of [
    "docs/prd.md",
    "docs/sdd.md",
    "README.md",
    "CLAUDE.md",
  ]) {
    // Normalizar o espaço: o número e o substantivo podem estar em linhas diferentes.
    const texto = read(arquivo).replace(/\s+/g, " ");
    for (const [padrao, esperado, rotulo] of checagens) {
      for (const [trecho, numero] of texto.matchAll(padrao)) {
        vistos.set(rotulo, vistos.get(rotulo) + 1);
        assert.equal(
          valor(numero),
          esperado,
          `${arquivo}: "${trecho.trim()}" não bate com o código (${esperado} ${rotulo})`,
        );
      }
    }
  }

  for (const [rotulo, n] of vistos) {
    assert.ok(
      n > 0,
      `nenhum documento menciona "${rotulo}" — o padrão virou letra morta`,
    );
  }
});
