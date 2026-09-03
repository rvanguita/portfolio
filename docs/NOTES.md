# NOTES — portfólio

Portfólio de uma página de Rene Verinaud Anguita Junior. Site estático em
pt-BR, publicado no GitHub Pages free em <https://rvanguita.github.io/portfolio/>.

Este projeto **não usa** processo de spec/ADR. As decisões ficam no histórico do
git e neste arquivo. Antes havia `docs/prd`, `docs/sdd`, `docs/adr`, `docs/tasks`
e `docs/audit` — foram removidos num passe de simplificação (junto com o tema
claro/escuro, os filtros de categoria, o JSON-LD/sitemap/robots, o gate
Lighthouse no CI e as "métricas" de número na interface).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**.
- **`output: "export"`** — `next build` gera `out/`, uma pasta de HTML/CSS/JS
  estático. Sem servidor em produção.
- **`basePath: "/portfolio"`** — o site vive num repositório de projeto do
  Pages. `next/link` e os metadados de arquivo já prefixam o basePath; **`next/image`
  não** para `src` em `/public`. Use `asset(path)` de `lib/base-path.ts` para
  todo recurso de `/public` (avatar, PDFs de certificado, card social).
  `public/.nojekyll` impede o Pages de processar `_next/`.
- CSS próprio em `app/globals.css` (folha única, `@layer reset, tokens, base,
  layout, components, utilities`). Direção editorial: serifa (Source Serif 4) nos
  títulos, Archivo no corpo/interface, JetBrains Mono só em código/diagramas, um
  acento azul-ardósia. Tema único (claro).
- **Vitest** + Testing Library (jsdom) para testes de estrutura/dados.
- Fontes via `next/font` (self-hosted no build).

## Rodar

Node ≥ 22.12.

```bash
npm ci
npm run dev        # http://localhost:3000/portfolio/
```

Gate (o que o CI roda):

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

Pré-visualizar o artefato publicado (o dev server ≠ export):

```bash
npm run build && npx serve out   # abre out/ sob /portfolio/
```

O hook `.githooks/pre-commit` roda lint + typecheck + testes — ativar uma vez por
clone: `git config core.hooksPath .githooks`.

## Deploy

- Push em `main` → `.github/workflows/deploy.yml`: `npm ci` → lint/typecheck/test
  → `next build` → `upload-pages-artifact` → `deploy-pages`. Se algo falha, não
  publica.
- PRs para `main` → `.github/workflows/ci.yml`: lint + typecheck + testes + build.

## Editar conteúdo

Todo texto profissional fica em `lib/data/*` (não espalhado pelos componentes):

| Arquivo | Conteúdo |
| --- | --- |
| `lib/data/profile.ts` | Nome, título, apresentação, contato, redes. |
| `lib/data/projects.ts` | Projetos: desafio, solução, tecnologias, links (descrições qualitativas — sem cifras). |
| `lib/data/skills.ts` | Grupos de competências. |
| `lib/data/timeline.ts` | Experiência e formação. |
| `lib/data/certificates.ts` | Certificados e caminhos dos PDFs em `public/`. |

- **Adicionar certificado:** PDF em `public/certificates/`, caminho em
  `lib/data/certificates.ts`.
- **Adicionar projeto:** entrada em `lib/data/projects.ts`. Para um estudo de
  caso: `app/projects/<slug>/page.tsx` (copiar `wind-farm/page.tsx`), uma action
  `{ label: "Estudo de caso", url: "/projects/<slug>/", primary: true }` e a rota
  em `tests/internal-links.test.tsx`.
- **Nova seção de navegação:** componente `<section id="…">` com
  `aria-labelledby`, registrar em `lib/nav.ts` (`NAV_ITEMS`, ícone tem de existir
  em `components/ui/Icon.tsx`). `tests/nav.test.tsx` confere.

Não versionar credenciais, tokens ou dados pessoais. `.gitignore` já exclui
`Profile.pdf`, `node_modules`, `out/` e `.next/`.
