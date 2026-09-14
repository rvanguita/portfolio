// Confere se o `atualizadoEm` de cada projeto ainda bate com o repositório.
//
// O campo vem da API do GitHub na hora de escrever a ficha e, até aqui, nunca
// mais era conferido. Um projeto que recebeu commit depois disso continua
// anunciando a data antiga — e ela não fica só na ficha: o sitemap a publica como
// `lastmod`, então data velha vira sinal errado para o robô.
//
// Fica fora do CI de PR pelo mesmo motivo que o check_links.mjs: mergear não pode
// depender da rede de terceiros. A divisão de trabalho entre os dois é essa —
// aquele pega ruptura (o repositório some, é renomeado ou vira privado, e nada
// mais responde); este pega deriva silenciosa, em que tudo responde 200 e só a
// data é que envelheceu.
//
// Ressalva conhecida: `pushed_at` sobe com qualquer push, inclusive um que só
// mexa no README. O resultado daqui é uma issue para uma pessoa decidir, nunca um
// build quebrado, e é por isso que ele pode ser levemente barulhento sem causar
// dano.

import { globSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// Sem token são 60 requisições por hora por IP, e o IP de um runner é
// compartilhado. Com o GITHUB_TOKEN do workflow são 1000.
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

/**
 * Os repositórios de um projeto, deduplicados.
 *
 * `repos[].url` aparece em duas formas — a raiz do repositório e o link para um
 * arquivo dentro dele (`.../blob/main/main.ipynb`, nos projetos cujo resultado é
 * medido). Ficar com os dois primeiros segmentos resolve as duas de uma vez.
 */
function repositorios(md) {
  const encontrados = [
    ...md.matchAll(/https:\/\/github\.com\/([^/\s]+)\/([^/\s)"]+)/g),
  ];
  return [...new Set(encontrados.map(([, dono, nome]) => `${dono}/${nome}`))];
}

async function ultimoPush(repo) {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      accept: "application/vnd.github+json",
      ...(token && { authorization: `Bearer ${token}` }),
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const { pushed_at } = await response.json();
  return pushed_at.slice(0, 10);
}

const atrasados = [];
const ilegiveis = [];

for (const rel of globSync("src/content/projetos/*.md", { cwd: ROOT }).sort()) {
  const projeto = rel.split("/").pop().replace(/\.md$/, "");
  const md = readFileSync(join(ROOT, rel), "utf8");
  const declarada = md.match(/^atualizadoEm:\s*"([^"]+)"/m)?.[1];

  // Projeto com mais de um repositório usa o push mais recente entre eles — a
  // mesma regra que o `periodo` já segue para cobrir o intervalo de todos.
  let real = null;
  for (const repo of repositorios(md)) {
    try {
      const push = await ultimoPush(repo);
      if (!real || push > real) real = push;
    } catch (error) {
      // Repositório ilegível é o alarme do check_links.mjs. Registrar aqui sem
      // falhar evita que as duas verificações gritem pela mesma causa.
      ilegiveis.push({ projeto, repo, motivo: error.message });
    }
  }

  if (!real) {
    console.log(`?     ${projeto}  nenhum repositório legível`);
    continue;
  }

  // Só numa direção: repositório parado não é problema, ficha atrasada é.
  if (real > declarada) {
    console.log(`ATRASO ${projeto}  ficha=${declarada}  repositório=${real}`);
    atrasados.push({ projeto, declarada, real });
  } else {
    console.log(`ok     ${projeto}  ${declarada}`);
  }
}

for (const { projeto, repo, motivo } of ilegiveis) {
  console.log(`aviso  ${projeto}  não consegui ler ${repo} (${motivo})`);
}

console.log(
  `\n${atrasados.length} ficha(s) com data atrasada, ` +
    `${ilegiveis.length} repositório(s) ilegível(is).`,
);

if (atrasados.length > 0) {
  console.log(
    "\nCorrija `atualizadoEm` no frontmatter com a data acima e regenere o build:\n" +
      atrasados
        .map(
          ({ projeto, declarada, real }) =>
            `  ${projeto}: ${declarada} → ${real}`,
        )
        .join("\n"),
  );
  process.exit(1);
}
