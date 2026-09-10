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
  // Mantém os espaços entre elementos inline após a migração para Astro 7.
  compressHTML: true,
  build: { format: "directory" },
  image: { service: passthroughImageService() },
  integrations: [sitemap()],
});
