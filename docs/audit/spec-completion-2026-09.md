# Auditoria — Passe de Conclusão da Spec (2026-09)

Este é o entregável da **Task 013**. A refatoração descrita em `docs/` (Jekyll →
Next.js 15 static export, redesign "Telemetria", dois estudos de caso) já estava
implementada e no ar. Este passe auditou a base contra cada critério de aceitação
das Tasks 001–012 + PRD §30 / SDD §30, fechou as lacunas de código e formalizou os
artefatos de processo.

## Commits do passe

| Commit | Unidade |
| --- | --- |
| `7bac88a` | `refactor(motion)` — remove framer-motion; fade em CSS; ADR-006 |
| `602f413` | `refactor(content)` — copy profissional para `lib/data/profile.ts` |
| `576bfce` | `feat(a11y)` — landmarks, `aria-labelledby` de seção, `<pre role="img">`, `<caption>`/`scope` |
| `e15ea34` | `feat(seo)` — canonical/OG por página + JSON-LD (Person/WebSite/Breadcrumb/Article) |
| `2ec9883` | `feat(projects)` — divisão destaque / outros; ADR-007 |
| `bad2cc4` | `refactor(css)` — tokens de sombra/z-index + registro de breakpoints; ADR-003 emendado |
| `54466b7` | `test` — mobile-nav, internal-links, structured-data, a11y-structure |
| _(este)_ | `docs` — ADR-001 `Accepted`, Task 002, checklists, esta auditoria, ADR-005, SDD §11 |

## Tasks 001–012

| Task | Situação | Evidência |
| --- | --- | --- |
| 001 Auditoria | ✅ | Alternativas de stack em ADR-001; migração Jekyll → Next em `21aa295`; este passe |
| 002 Stack | ✅ | ADR-001 (`Accepted`) + `## Decisão (resolvida)` na task |
| 003 Fundação | ✅ | `lint`/`typecheck`/`test`/`build` verdes; sem dependência não usada (framer removido em `7bac88a`) |
| 004 Design System | ✅ | Tokens de sombra/z-index + registro de breakpoints (`bad2cc4`); ADR-003 emendado |
| 005 Conteúdo | ✅ | Copy profissional separada da apresentação em `lib/data/profile.ts` (`602f413`); pt-BR; nada inventado |
| 006 Layout & Navegação | ✅ | `<header>` + `<nav aria-label>` + seções nomeadas (`576bfce`); mobile-nav coberto por teste (`54466b7`) |
| 007 Projetos | ✅ | Dados-driven; **destaque visual real** para Featured (`2ec9883`); ADR-007 |
| 008 Experiência/Formação | ✅ | Cronológico, técnico, semântico — já atendido pela base |
| 009 SEO & A11y | ✅ | Metadata base + por-página, sitemap, robots, **structured data** (`e15ea34`); landmarks/ARIA (`576bfce`) |
| 010 Performance | ⚠️ parcial | `7bac88a` remove a maior dependência de runtime. **Falta: rodar Lighthouse** (ver abaixo) |
| 011 Testes & Quality Gates | ✅ | 12 arquivos / 47 testes; **links internos verificados** (`54466b7`); nenhum teste removido |
| 012 Deploy | ✅ | `ci.yml` (PR) + `deploy.yml` (push→Pages), ambos com gate lint+typecheck+test(+build) |

## Correções incidentais

* `<title>` dos estudos de caso tinha ` | Rene Verinaud` **duplicado** (o título já
  trazia o sufixo e o `template` base concatenava de novo) — corrigido em `e15ea34`.
* `.sr-only` existia em `globals.css` sem uso — agora usado nas `<caption>` das
  tabelas de stack.
* Fences `` ```markdown `` que envolviam `docs/prd.md` e `docs/sdd.md` inteiros
  (faziam o arquivo renderizar como um bloco de código único) removidos; um fence
  de 4 crases malformado no SDD §3 corrigido para 3.

## Pendências (antes/depois do merge)

| Item | Ação |
| --- | --- |
| Desktop / Mobile validado (Task 013) | QA visual manual: `npm run dev` + preview do export, temas claro/escuro, ≤820px |
| Lighthouse (Task 010) | `npx lighthouse http://localhost:3000/portfolio/ --preset=desktop` (alvo ≥ 90 em todas as categorias) ou passo de Lighthouse CI |
| Produção validada (Task 013) | Após merge do PR + deploy: conferir canonical/OG/JSON-LD em produção com o Rich Results Test |
| Node version drift | `.tool-versions` (25.2.1) ≠ workflows (20) ≠ `engines` (≥20.9). Fora do escopo deste passe; alinhar em tarefa própria |
| `README.md` | Link interno defasado `…/lake-fastf1.html` (deveria ser `/projects/lake-fastf1/`). O `README.md` documenta o projeto externo, não o repo — deixado como está |

## Desvio de escopo aceito

**Seção "Contato" (PRD §7 / §15).** O site não tem uma seção `#contato` dedicada.
O contato é atendido pelo **Hero** (e-mail, LinkedIn, GitHub, localização, idiomas),
pelo **Footer** e pelo botão "Contato" na **navbar**. Uma seção dedicada exigiria um
7º item de navegação e a renumeração dos canais `CH1–CH6`, quebrando o invariante
verificado por `tests/nav.test.tsx` e `tests/home.test.tsx`. Registrado em
`docs/sdd.md` §11 (que permite desvios de layout desde que registrados).
