// O site é servido sob /portfolio/ no GitHub Pages. Todo href interno e todo
// caminho de asset em public/ passa por aqui para ganhar o prefixo do `base`.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ''); // -> "/portfolio"

/** Prefixa um caminho absoluto do site com o `base` configurado.
 *  url('/projetos/wind-farm/') -> '/portfolio/projetos/wind-farm/' */
export function url(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}`;
}

/** URL absoluta (canonical / og:image) a partir de um caminho já com base. */
export function absoluteUrl(pathWithBase: string, site: URL | undefined): string {
  return new URL(pathWithBase, site ?? 'https://rvanguita.github.io').href;
}
