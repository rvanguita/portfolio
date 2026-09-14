// Invariantes de conteúdo: as contagens que o PRD e o SDD publicam, a fidelidade
// dos diagramas e a regra de honestidade do JSON-LD — que já foi violada uma vez,
// com quatro termos declarados sem lastro no texto visível.

import { test } from "node:test";
import assert from "node:assert/strict";
import { globSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, DIST, read, pages, routes, visibleText } from "./helpers.mjs";

const projectFiles = globSync("src/content/projetos/*.md", { cwd: ROOT }).map(
  (rel) => [rel, readFileSync(join(ROOT, rel), "utf8")],
);

/** Sinônimos de busca aceitos no schema: o site mostra o equivalente, não o termo. */
const SEARCH_SYNONYMS = new Set(["Data Engineering", "Apache Spark"]);

test("as contagens publicadas continuam de pé", () => {
  assert.equal(routes().length, 14, "14 rotas");
  assert.equal(projectFiles.length, 9, "9 projetos");

  const skills = read("src/data/skills.ts");
  const groups = [...skills.matchAll(/items:\s*\[/g)];
  // Cada item é um objeto `{ name, projectIds }`: contar `name:` é imune tanto à
  // lista de evidências aninhada quanto a um regex não-guloso parar no `]` errado.
  const items = (skills.match(/name:\s*"/g) ?? []).length;
  assert.equal(groups.length, 4, "4 grupos de competência");
  assert.equal(items, 29, "29 itens de competência");

  const certs = read("src/data/certificates.ts");
  assert.equal((certs.match(/file:\s*"/g) ?? []).length, 24, "24 certificados");

  const withArch = projectFiles.filter(([, md]) => /^architecture:/m.test(md));
  assert.equal(withArch.length, 4, "4 projetos declaram arquitetura");
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
  // como recorte legítimo — "só os 4 projetos que declaram arquitetura", ou
  // "3 grupos, 24 itens" falando de certificados.
  // Mesmo motivo do teste de contagens: cada item é `{ name, projectIds }`.
  const itens = (read("src/data/skills.ts").match(/name:\s*"/g) ?? []).length;
  const certificados = (
    read("src/data/certificates.ts").match(/file:\s*"/g) ?? []
  ).length;

  const checagens = [
    [/(\d+) rotas/g, routes().length, "rotas"],
    // Todo "N itens" conta competência, menos a linha dos certificados, que usa
    // a mesma palavra para outra coisa ("3 grupos, 24 itens").
    [/(?<!3 grupos, )(?<!\d)(\d+) itens/g, itens, "itens de competência"],
    [/(\d+) certificados/g, certificados, "certificados"],
    [/(?<!só os )(?<!dos )(\d+) projetos/gi, projectFiles.length, "projetos"],
  ];

  const vistos = new Map(checagens.map(([, , rotulo]) => [rotulo, 0]));
  for (const arquivo of ["docs/prd.md", "docs/sdd.md", "README.md"]) {
    // Normalizar o espaço: o número e o substantivo podem estar em linhas diferentes.
    const texto = read(arquivo).replace(/\s+/g, " ");
    for (const [padrao, esperado, rotulo] of checagens) {
      for (const [trecho, numero] of texto.matchAll(padrao)) {
        vistos.set(rotulo, vistos.get(rotulo) + 1);
        assert.equal(
          Number(numero),
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
