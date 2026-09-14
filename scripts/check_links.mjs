// Confere se os links externos dos projetos continuam respondendo.
//
// Fica fora do CI de PR de propósito: mergear não pode depender da rede de
// terceiros. Roda agendado, porque a quebra aqui não vem de um commit — vem de
// alguém renomear, arquivar ou tornar privado um repositório, e isso desmente em
// silêncio a promessa central do site, "cada projeto aponta para o código".

import { globSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const urls = new Map();
for (const rel of globSync("src/content/projetos/*.md", { cwd: ROOT })) {
  const md = readFileSync(join(ROOT, rel), "utf8");
  for (const [, url] of md.matchAll(/url:\s*(https?:\/\/\S+)/g)) {
    if (!urls.has(url)) urls.set(url, []);
    urls.get(url).push(rel.split("/").pop());
  }
}

const failures = [];
for (const [url, projects] of urls) {
  let status = "erro de rede";
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(20000),
    });
    status = response.status;
    if (response.ok) {
      console.log(`ok    ${status}  ${url}`);
      continue;
    }
  } catch (error) {
    status = error.name === "TimeoutError" ? "tempo esgotado" : error.message;
  }
  console.log(`FALHA ${status}  ${url}  (${projects.join(", ")})`);
  failures.push({ url, status, projects });
}

console.log(
  `\n${urls.size} links verificados, ${failures.length} com problema.`,
);
if (failures.length > 0) process.exit(1);
