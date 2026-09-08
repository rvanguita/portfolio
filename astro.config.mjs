// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Servido em https://rvanguita.github.io/portfolio/ — `site` + `base` precisam
// bater com isso. Todo href interno passa pelo helper `src/lib/url.ts`.
// Sem transformação de imagem (assets servidos direto de public/) → passthrough,
// evitando a dependência nativa `sharp`.
export default defineConfig({
  site: 'https://rvanguita.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: { service: passthroughImageService() },
  integrations: [sitemap()],
});
