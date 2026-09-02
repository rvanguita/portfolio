# ADR-001 — Escolha da Stack do Site

## Status

Accepted (2026-09 — decisão consolidada no passe de conclusão da spec; a stack
já estava implementada e no ar desde a migração Jekyll → Next.js).

## Context

O site será hospedado gratuitamente no GitHub Pages e deverá funcionar como um portfólio técnico profissional.

A aplicação não necessita de backend, banco de dados ou processamento dinâmico em runtime.

Os principais requisitos técnicos são:

* Geração de conteúdo estático.
* Compatibilidade com GitHub Pages.
* Excelente performance.
* SEO adequado.
* Boa experiência de desenvolvimento.
* Manutenção simples.
* Baixa quantidade de dependências.
* Suporte a TypeScript quando houver JavaScript.
* Facilidade de implementação e manutenção por agentes de IA.

O projeto existente deve ser auditado antes da decisão final da stack.

## Decision

**Next.js 15 (App Router) com `output: 'export'`** — exportação 100% estática para
o GitHub Pages (`basePath: '/portfolio'`, `trailingSlash: true`,
`images.unoptimized: true`). Sem runtime de servidor.

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 15 App Router, static export |
| Linguagem | TypeScript (`strict: true`) |
| Estilos | CSS único escrito à mão em `app/globals.css`, ordenado por `@layer reset, tokens, base, layout, components, utilities` — sem Tailwind/Sass/PostCSS |
| Fontes | `next/font` (Archivo + JetBrains Mono, self-hosted) |
| Build | `next build` → `./out` |
| Testes | Vitest + React Testing Library (jsdom) |
| Lint | ESLint (`next/core-web-vitals` + `next/typescript`) |
| Formatter | — (sem formatter dedicado; o lint cobre o essencial) |
| Package manager | npm |
| CI/CD | GitHub Actions → GitHub Pages (`ci.yml` no PR, `deploy.yml` no push para `main`) |

Justificativa da escolha frente às alternativas: a **Metadata API baseada em
arquivos** + **React Server Components** dão SEO forte (title/OG/canonical/sitemap/
robots + JSON-LD) com JavaScript mínimo no cliente; `basePath`/`trailingSlash`/
`next/font`/`next/link` são de primeira classe e resolvem o deploy em subpath do
Pages sem gambiarra; e o ecossistema/DX reduzem o atrito para manutenção por
diferentes agentes. Astro/Eleventy/Hugo seriam igualmente válidos para conteúdo
estático; a decisão ficou com o Next.js pela integração SEO + o
componente-modelo já existente (`app/projects/<slug>/page.tsx`).

## Alternatives Considered

Todas foram avaliadas e preteridas em favor do Next.js (ver *Decision*).

### Astro

Forte orientação para sites estáticos, baixo JavaScript no cliente e boa
integração com conteúdo. Preterido: a integração de SEO (Metadata API baseada
em arquivos) e o componente-modelo de estudo de caso já existente no Next.js
pesaram mais que o menor bundle-base do Astro.

### Eleventy

Solução simples e orientada a geração estática, com baixa complexidade.
Preterido: sem camada de componentes React nem tipagem de primeira classe, o
que aumentaria o atrito de manutenção por agentes de IA.

### Hugo

Excelente performance de build. Preterido: o modelo de templates Go e a
ausência de um ecossistema React/TS afastam da DX pretendida.

### Implementação sem framework

HTML, CSS e JavaScript nativos poderiam bastar. Preterido: perderíamos
roteamento, Metadata API, `next/font` e `basePath`/`trailingSlash` de primeira
classe — reimplementá-los à mão custaria mais do que o peso de build do Next.

### Custo aceito do Next.js

O build é mais pesado que o de um gerador puramente estático e funcionalidades
de servidor do framework não sobrevivem ao `output: 'export'` (ver
*Consequences*). Trade-off aceito pelo ganho de SEO + DX.

## Consequences

O site é uma pasta de HTML/JS/CSS estáticos — sem custo de infraestrutura, sem
banco, sem servidor.

Funcionalidades de servidor do Next (Route Handlers, `dynamic`, middleware,
otimização de imagem do `next/image`) **não sobrevivem ao export** e não podem ser
usadas; a regra é reforçada por convenção e pelo `CLAUDE.md`. Rotas de metadata
(`app/robots.ts`, `app/sitemap.ts`) precisam de `export const dynamic = "force-static"`.

O build é mais pesado que o de um gerador puramente estático (Hugo) — aceitável
pelo ganho de DX e SEO.
