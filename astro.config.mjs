// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.ts";
import { readdirSync, readFileSync } from "node:fs";

// `site` / `base` vêm de src/config.ts (fonte única). Todo href interno passa
// pelo helper src/lib/url.ts. Sem transformação de imagem (assets servidos
// direto de public/) → passthrough, evitando a dependência nativa `sharp`.
// Datas lidas do frontmatter dos projetos: o sitemap é montado fora da camada de
// conteúdo, então não dá para usar getCollection aqui.
const PROJECTS = "./src/content/projetos";
const projectDates = Object.fromEntries(
  readdirSync(PROJECTS)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const front = readFileSync(`${PROJECTS}/${file}`, "utf8");
      const date = front.match(/^atualizadoEm:\s*"([^"]+)"/m);
      return [file.replace(/\.md$/, ""), date?.[1]];
    }),
);

export default defineConfig({
  site: SITE.url,
  base: SITE.base,
  trailingSlash: "always",
  // Colapsa o HTML gerado. O whitespace entre elementos inline é significativo,
  // e é por isso que os arquivos sensíveis a ele ficam fora do Prettier
  // (ver .prettierignore): o formatador injetaria espaço que muda o render.
  compressHTML: true,
  build: { format: "directory" },
  image: { service: passthroughImageService() },
  integrations: [
    sitemap({
      // `lastmod` por página, não do build. Uma data única para as 14 URLs diria
      // ao robô que tudo mudou quando só uma mudou, e sinal falso é pior que
      // sinal ausente. As fichas usam a data real do projeto; o resto fica sem
      // lastmod, porque não há fonte honesta para elas.
      serialize(item) {
        const match = item.url.match(/\/projetos\/([^/]+)\/$/);
        if (match) {
          const date = projectDates[match[1]];
          if (date) return { ...item, lastmod: date };
        }
        return item;
      },
    }),
  ],
});
