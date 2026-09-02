/** @type {import('next').NextConfig} */

// Publicado no GitHub Pages sob https://rvanguita.github.io/portfolio
// (equivalente ao antigo `baseurl: /portfolio` do Jekyll).
const basePath = "/portfolio";

const nextConfig = {
  // Exportação 100% estática: `next build` gera `out/`, servível pelo Pages.
  output: "export",
  basePath,
  // O Pages serve os arquivos como estão; sem otimização de imagem em runtime.
  images: { unoptimized: true },
  // URLs com barra final => cada rota vira `<rota>/index.html`.
  trailingSlash: true,
  // Exposto ao cliente para montar hrefs de arquivos em /public (ver lib/base-path.ts).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  reactStrictMode: true,
  // Inlina o CSS no <head> de cada página exportada: remove a requisição
  // render-blocking da folha de estilos do caminho crítico (ganho de LCP no
  // primeiro carregamento móvel). Ver ADR-008.
  experimental: { inlineCss: true },
};

export default nextConfig;
