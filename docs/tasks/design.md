# Tasks — Portfolio Redesign ("Telemetria")

## Status

**Concluído — 2026-09.** Reconciliado com a implementação no ar e re-verificado
no passe de 2026-09 (`docs/audit/spec-reverify-2026-09.md`). Não há trabalho
pendente.

> **A numeração `TASK-nnn` deste arquivo NÃO é a mesma de `Task nnn` em
> `docs/tasks/project/`.** Este é o trilho do redesign visual; o trilho de
> projeto (Jekyll → Next.js static export) é outro. Os números colidem por
> coincidência — `TASK-013` aqui é "Redesenhar Footer", `Task 013` lá é
> "Auditoria Final". Ao cruzar com os relatórios de auditoria, note que eles
> citam a numeração **de projeto**.

A execução foi absorvida pelo trilho de projeto (`docs/tasks/project/001–013`) —
por isso as tarefas abaixo são fechadas por referência a artefatos concretos, e
não com sub-checklists próprios.

## Fase 0 — Discovery

| Task | Entrega | Evidência |
|---|---|---|
| TASK-001 — Auditar aplicação existente | ✅ | `docs/adr/project/001` (alternativas de stack), migração Jekyll → Next `21aa295`, `docs/audit/spec-completion-2026-09.md` §001 |

## Fase 1 — Design System

| Task | Entrega | Evidência |
|---|---|---|
| TASK-002 — Tokens visuais | ✅ | `app/globals.css` bloco `@layer tokens`; catalogados em `docs/adr/design/004-telemetria-system.md` e `docs/adr/project/003` (+ emendas sombra/z-index e contraste AA) |
| TASK-003 — Sistema tipográfico | ✅ | Archivo + JetBrains Mono via `next/font` em `app/layout.tsx`; escala `--fs-2xs … --fs-hero`; mono em todo dado/rótulo. `docs/adr/design/004` |

## Fase 2 — Global Layout

| Task | Entrega | Evidência |
|---|---|---|
| TASK-004 — Estrutura global | ✅ | `@layer layout` em `app/globals.css` (`.main-wrapper`, grids, `--wrap` 1140px); toda margem externa de seção nessa camada |
| TASK-005 — Header | ✅ | `components/Navbar.tsx` — scroll-spy, hover/focus, menu ≤820px, Esc/clique-fora, teclado. `tests/nav.test.tsx`, `tests/mobile-nav.test.tsx` |
| TASK-006 — Hero | ✅ | `components/sections/Hero.tsx` — CH0, tagline, headline "pesquisa + dados + engenharia", CTAs, links, `HeroSignature`. `tests/hero.test.tsx` |

## Fase 3 — Content Components

| Task | Entrega | Evidência |
|---|---|---|
| TASK-007 — About | ✅ | `components/sections/About.tsx` — CH1, bio de `lib/data/profile.ts` via `Rich`, telhas de leitura |
| TASK-008 — Experience | ✅ | `components/sections/Experience.tsx` + `cards/EduCard.tsx`, dados de `lib/data/timeline.ts` (`experience`), ordem cronológica |
| TASK-009 — Research | ✅ (absorvida) | Sem seção "Research" isolada — a trajetória de pesquisa aparece em Experiência/Formação e nos estudos de caso. Desvio registrado em `docs/adr/design/004` |
| TASK-010 — Projects | ✅ | `components/sections/Projects.tsx` + `cards/ProjectCard.tsx`; destaque/outros (`docs/adr/project/007`); filtro por categoria. `tests/projects-featured.test.tsx`, `tests/filters.test.tsx` |
| TASK-011 — Skills | ✅ | `components/sections/Skills.tsx` + `cards/SkillCard.tsx`, `lib/data/skills.ts` agrupado por domínio, sem logos |
| TASK-012 — Contact | ✅ (absorvida) | Sem seção `#contato` dedicada — contato no Hero, Footer e botão da navbar. Desvio registrado em `docs/sdd/project.md` §11 |
| TASK-013 — Footer | ✅ | `components/Footer.tsx` — `ChannelLabel` CH∞, identidade de `lib/data/profile.ts`, links via `ExternalLink` |

## Fase 4 — Responsive

| Task | Entrega | Evidência |
|---|---|---|
| TASK-014 — Mobile (320/375/414) | ✅ | `docs/audit/visual-qa-2026-09.md` — matriz headless 320–1680px, sem scroll horizontal; `fix(nav)` `dc9cc98` para ~408px |
| TASK-015 — Tablet | ✅ | `docs/audit/visual-qa-2026-09.md` — 768/820px (colapso do menu em 820) |
| TASK-016 — Desktop | ✅ | `docs/audit/visual-qa-2026-09.md` — 1280/1680px, `--wrap` limita a leitura |

## Fase 5 — Accessibility

| Task | Entrega | Evidência |
|---|---|---|
| TASK-017 — Accessibility audit | ✅ | `docs/tasks/project/009`; landmarks + `aria-labelledby` por seção + `<pre role="img">` + `<caption>`/`scope` (`576bfce`); contraste AA (`docs/adr/project/003` emenda); Lighthouse Accessibility 100. `tests/a11y-structure.test.tsx` |

## Fase 6 — Performance

| Task | Entrega | Evidência |
|---|---|---|
| TASK-018 — Asset optimization | ✅ | `next/font` self-hosted, `images.unoptimized` + `<Image>` dimensionado, `experimental.inlineCss`. `docs/tasks/project/010` |
| TASK-019 — JavaScript audit | ✅ | framer-motion removido (`docs/adr/project/006`); sem dependência de runtime além de next/react; console limpo (`docs/audit/visual-qa-2026-09.md`). Passe 2026-09: `ui/Card.tsx` morto e superfície não usada de `ThemeContext` removidos |

## Fase 7 — SEO

| Task | Entrega | Evidência |
|---|---|---|
| TASK-020 — Metadata | ✅ | `lib/metadata.ts` + Metadata API (title/description/canonical/OG/Twitter), `app/robots.ts`, `app/sitemap.ts`, JSON-LD (`lib/seo/schema.ts`). `tests/structured-data.test.tsx`, `tests/internal-links.test.tsx` |

## Fase 8 — GitHub Pages

| Task | Entrega | Evidência |
|---|---|---|
| TASK-021 — Validar build | ✅ | `next build` → `out/` (`output: 'export'`, `basePath`, `trailingSlash`), `.nojekyll`, `asset()` para todo `/public`. `docs/tasks/project/012` |
| TASK-022 — Validar deployment | ✅ | `.github/workflows/deploy.yml` (job `deploy` `needs: build`); validação pública 2026-09-02 (HTTP 200 + metadados) em `docs/audit/spec-completion-2026-09.md` |

## Fase 9 — Final Review

| Task | Entrega | Evidência |
|---|---|---|
| TASK-023 — Visual QA | ✅ | `docs/audit/visual-qa-2026-09.md` — 7 larguras × 2 temas × 3 páginas; hover/focus/reduced-motion |
| TASK-024 — Content QA | ✅ | Conteúdo em `lib/data/*` revisado; nenhuma informação profissional inventada (`docs/tasks/project/005`, PRD §21) |
| TASK-025 — Final technical QA | ✅ | `docs/tasks/project/013` + `docs/audit/spec-completion-2026-09.md` + `docs/audit/spec-reverify-2026-09.md`: lint/typecheck/testes/build verdes, sem broken links, Lighthouse ≥ 90 no CI |

## Evidências

- `docs/audit/spec-completion-2026-09.md` — auditoria das Tasks de projeto 001–013, PRD e SDD.
- `docs/audit/spec-reverify-2026-09.md` — re-verificação de 2026-09 (este passe).
- `docs/audit/visual-qa-2026-09.md` — matriz visual, temas, mobile, desktop, console, acessibilidade estrutural.
- `docs/adr/design/` e `docs/adr/project/` — decisões aceitas (incl. `docs/adr/design/004-telemetria-system.md`).
- Validação pública de 2026-09-02: HTTP 200 na home e nos dois estudos de caso, + canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`.

## Definition of Done

O redesign está concluído: permanece estático, preserva o conteúdo factual,
funciona no GitHub Pages, atende aos requisitos de responsividade,
acessibilidade, SEO e performance, e não possui pendências conhecidas.

Desvios aceitos e registrados: sem seção `#contato` dedicada (`docs/sdd/project.md`
§11); sistema visual "Telemetria" no lugar do editorial claro genérico do
PRD/SDD de design (`docs/adr/design/004-telemetria-system.md`).
