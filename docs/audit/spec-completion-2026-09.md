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
| 010 Performance | ✅ | `7bac88a` remove a maior dependência de runtime; **Lighthouse no CI** (`scripts/lighthouse.mjs`, ADR-008) — mediana de 3, todas as categorias ≥ 90 |
| 011 Testes & Quality Gates | ✅ | 13 arquivos / 52 testes; **links internos verificados** (`54466b7`); nenhum teste removido |
| 012 Deploy | ✅ | `ci.yml` (PR) + `deploy.yml` (push→Pages), ambos com gate lint+typecheck+test(+build) |

## Correções incidentais

* `<title>` dos estudos de caso tinha ` | Rene Verinaud` **duplicado** (o título já
  trazia o sufixo e o `template` base concatenava de novo) — corrigido em `e15ea34`.
* `.sr-only` existia em `globals.css` sem uso — agora usado nas `<caption>` das
  tabelas de stack.
* Fences `` ```markdown `` que envolviam `docs/prd.md` e `docs/sdd.md` inteiros
  (faziam o arquivo renderizar como um bloco de código único) removidos; um fence
  de 4 crases malformado no SDD §3 corrigido para 3.

## Passe do Lighthouse / QA visual (2026-09)

Segunda rodada do passe de conclusão, fechando as pendências de verificação.

| Commit | Unidade |
| --- | --- |
| `c848966` | `fix` — `<script>` anti-FOUC quebrava no build RSC (`THEME_STORAGE_KEY` vindo de módulo client → stub de client-reference → `SyntaxError`); movido para `lib/theme.ts`. Contraste WCAG AA: `--trace-1`/`--alert` do tema claro escurecidos, `.nav-link-ch` → `--label`. `tests/theme-init-script.test.ts` |
| `126f89e` | `ci(perf)` — `lighthouse` devDep + `scripts/lighthouse.mjs` (serve `out/` com gzip, home + 2 casos × mobile/desktop, mediana de 3, falha < 90) + passo obrigatório no CI + `experimental.inlineCss`. **Node 22** em `.tool-versions` / `engines` / workflows |
| `dc9cc98` | `fix(nav)` — navbar transbordava ~33px abaixo de ~408px; `.btn-nav-contact` some em ≤820px |
| _(docs)_ | ADR-008, emenda ADR-003 (contraste), `visual-qa-2026-09.md`, checklists das Tasks 010/013, PRD §30, este arquivo |

**Lighthouse (mediana de 3):** home 93/100 · `wind-farm` 94/100 · `lake-fastf1` 96/100 (mobile/desktop);
Accessibility, Best Practices, SEO = 100 em todas as rotas.

**QA visual:** headless (`puppeteer-core`), 320–1680px × 2 temas, home + 2 casos — sem scroll horizontal,
sem erros de console, menu mobile OK. Ver `docs/audit/visual-qa-2026-09.md`.

**Reestruturação de `docs/`:** os documentos passaram a viver em duas trilhas —
`docs/{prd,sdd}/{project,design}.md`, `docs/adr/{project,design}/`, `docs/tasks/project/…` +
`docs/tasks/design.md`. Os caminhos citados neste arquivo seguem a nova árvore.

## Registro final (antes/depois do merge)

| Item | Ação |
| --- | --- |
| Produção validada (Task 013) | ✅ Verificada em 2026-09-02: home e dois estudos de caso retornaram HTTP 200; canonical/OG/JSON-LD/robots/sitemap presentes e coerentes nas URLs públicas; links e assets internos principais retornaram HTTP 200. |
| `README.md` | Reescrito como documentação do repositório neste ciclo (era do projeto externo *FastF1 Data Platform*) |

Os checks locais do passe final também ficaram verdes: ESLint sem warnings,
TypeScript sem erros, 13 arquivos / 52 testes aprovados e `next build` com
export estático de todas as rotas. A execução usou os binários instalados no
repositório; o `mise` não pôde instalar o Node 22.12.0 por restrição de
filesystem, portanto o runtime fixado deve continuar sendo usado em CI.

## Desvio de escopo aceito

**Seção "Contato" (PRD §7 / §15).** O site não tem uma seção `#contato` dedicada.
O contato é atendido pelo **Hero** (e-mail, LinkedIn, GitHub, localização, idiomas),
pelo **Footer** e pelo botão "Contato" na **navbar**. Uma seção dedicada exigiria um
7º item de navegação e a renumeração dos canais `CH1–CH6`, quebrando o invariante
verificado por `tests/nav.test.tsx` e `tests/home.test.tsx`. Registrado em
`docs/sdd/project.md` §11 (que permite desvios de layout desde que registrados).
