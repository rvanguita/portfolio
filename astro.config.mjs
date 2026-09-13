// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config.ts";

// `site` / `base` vêm de src/config.ts (fonte única). Todo href interno passa
// pelo helper src/lib/url.ts. Sem transformação de imagem (assets servidos
// direto de public/) → passthrough, evitando a dependência nativa `sharp`.
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
  integrations: [sitemap()],
});
