# NOTES — portfólio

Portfólio de uma página de Rene Verinaud Anguita Junior. Site estático em
pt-BR, publicado no GitHub Pages free em <https://rvanguita.github.io/portfolio/>.

Este projeto **não usa** processo de spec/ADR. As decisões ficam no histórico do
git e neste arquivo. Passes anteriores removeram `docs/prd|sdd|adr|tasks|audit`,
o tema claro/escuro, os filtros de categoria, o JSON-LD/sitemap/robots, o gate
Lighthouse no CI e as "métricas" de número. O último redesign ("Dossiê")
reconstruiu o layout do zero: **coluna única**, uma família tipográfica, um
acento, **sem navbar** e **sem nenhum JavaScript de cliente**.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**.
- **`output: "export"`** — `next build` gera `out/`, uma pasta de HTML/CSS/JS
  estático. Sem servidor em produção.
- **`basePath: "/portfolio"`** — o site vive num repositório de projeto do
  Pages. `next/link` e os metadados de arquivo já prefixam o basePath; **`next/image`
  não** para `src` em `/public`. Use `asset(path)` de `lib/base-path.ts` para
  todo recurso de `/public` (PDFs de certificado, card social do Open Graph).
  `public/.nojekyll` impede o Pages de processar `_next/`.
- CSS próprio em `app/globals.css` — folha plana (~180 linhas, sem `@layer`).
  Direção **"Dossiê"**: coluna única (`.wrap`, `max-width: 42rem`), uma família
  (**Newsreader**, via `next/font`), um acento (`--accent` azul-ardósia
  `#3a5a78`), trilho de anos na Trajetória. Tema claro único. `code` usa pilha
  de fonte do sistema.
- **Zero componente de cliente** — não há `"use client"`, `hooks/` nem navbar;
  tudo é Server Component estático.
- **Vitest** + Testing Library (jsdom) para testes de estrutura/dados.

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
| `lib/data/timeline.ts` | Experiência e formação (fundidas na Trajetória por `lib/timeline-merge.ts`). |
| `lib/data/certificates.ts` | Certificados e caminhos dos PDFs em `public/`. |

A home (`app/page.tsx`) é um `<article class="wrap">` com 5 blocos:
`Intro` · `Projetos` · `Trajetoria` · `Competencias` · `Certificacoes`
(um componente por bloco, todos em `components/`).

- **Adicionar certificado:** PDF em `public/certificates/`, caminho em
  `lib/data/certificates.ts`.
- **Adicionar projeto:** entrada em `lib/data/projects.ts`. Para um estudo de
  caso: `app/projects/<slug>/page.tsx` (copiar `wind-farm/page.tsx` — prosa
  curta + link do repo), uma action
  `{ label: "Estudo de caso", url: "/projects/<slug>/", primary: true }` e a rota
  em `tests/internal-links.test.tsx`.
- **Novo bloco na página:** componente `<section id="…" class="block">` com
  `<h2 class="kicker" id="…-h">` + `aria-labelledby`, adicionado em
  `app/page.tsx`. `tests/home.test.tsx` lista os ids de seção.

Não versionar credenciais, tokens ou dados pessoais. `.gitignore` já exclui
`Profile.pdf`, `node_modules`, `out/` e `.next/`.
