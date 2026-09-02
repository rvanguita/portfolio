# Auditoria — Re-verificação da Spec (2026-09)

Segundo passe sobre a base já fechada por `docs/audit/spec-completion-2026-09.md`.
Objetivo: **re-verificar cada critério de aceitação das Tasks 001–013 contra o
código como ele está hoje**, forçar o fechamento das lacunas residuais e fazer os
documentos de spec descreverem o que está no ar. Sem reescrever código que
funciona (SDD §37 / ADR-005).

Branch: `chore/spec-reverify-pass`. Gate ao fim de **cada** commit:
`npm run lint && npm run typecheck && npm test && npm run build` — verde nos 10
commits. Testes: **13 arquivos / 52 casos**, nenhum removido ou enfraquecido.
Node 22.12.0 (binários do repositório; `mise` segue bloqueado por filesystem — o
runtime fixado continua sendo usado no CI).

## O que este passe mudou

### Código — remoção de código morto / superfície não usada

| Commit | Unidade |
| --- | --- |
| `remove dead ui/Card component` | `components/ui/Card.tsx` não era importado em lugar nenhum; `.card-header`/`.card-body` não existem em `globals.css`. Removido. |
| `drop unused Icon style prop` | `Icon` expunha `style?: CSSProperties` sem nenhum call site; removido junto do import. |
| `trim unused ThemeContext surface; dark SSR default` | Re-exports `THEME_STORAGE_KEY` / `Theme` (zero importadores externos) e membros `setTheme` / `dispatch` do valor de contexto (só `theme` + `toggle` são consumidos) removidos. `initialState()` fora do browser passa de `{theme:"light"}` para `"dark"` (dark-first). |

### Código — consistência estrutural (comportamento preservado)

| Commit | Unidade |
| --- | --- |
| `consume useToggle's toggle slot` | `Navbar` usava `[menuOpen, , setMenuOpen]` + `onClick={() => setMenuOpen(!menuOpen)}`; passa a usar o `toggle` que o hook já devolve. |
| `case-study section headers use SectionHeader` | 6 cabeçalhos hand-built nas duas páginas de estudo de caso → `<SectionHeader [first] …>`. HTML exportado idêntico exceto o `<Icon className="section-icon">` (que é `display:none`). Dá ao prop `first` seus primeiros call sites. |
| `Footer channel label via ChannelLabel` | `<span className="section-tag">CH∞ · …` → `<ChannelLabel channel="∞">`. `.channel-label` ≡ `.section-tag` exceto `align-self` (no-op no `.footer-info`). |
| `single external-link primitive` | `lib/url.ts#isExternalUrl` (checagem única por esquema) + `components/ui/ExternalLink.tsx` (`target="_blank" rel="noopener noreferrer"` num só lugar). 9 âncoras hand-rolled migradas; `ProjectActionLink` e `lib/seo/schema.ts` passam a chamar `isExternalUrl`. Oráculos de teste (`external-links`, `internal-links`) mantidos com suas próprias checagens. |

### Documentação — spec ↔ realidade

| Commit | Unidade |
| --- | --- |
| `align stale spec references with shipped tree` | `globals.css` comment "Recursive Mono" → "JetBrains Mono"; `sdd/project.md` §7 (árvore App Router real), §8 (`content/` = `lib/data/*.ts`), §21 (`ci.yml`), §26 (índice de ADR real, dois trilhos); `adr/project/001` (boilerplate pré-decisão em "Alternatives → Next.js" removido), `002` (`content/` → `lib/data`), `005` (caminhos `docs/prd.md`/`docs/sdd.md` → dois trilhos); `CLAUDE.md` (nome real do check de CI). |
| `record Telemetria design system (design ADR-004); annotate PRD/SDD design` | Novo `docs/adr/design/004-telemetria-system.md` (Accepted) — o sistema visual real, com o que substitui. Anotações datadas em `prd/design.md` §5/§16 e `sdd/design.md` §5.1 (texto original preservado — ADR-005). |
| `reconcile home Lighthouse score` | ADR-008 dizia home mobile 95; Task 010 + auditorias dizem 93. ADR-008 alinhado a 93/94/96, rotulado como medição de CI, com a nota da oscilação em baixos 90. |
| `docs(audit): re-verify Tasks 001-013; rebuild design task list` | Este arquivo; `docs/tasks/design.md` reconstruído como lista `TASK-001…025` verificada por conclusão, com o aviso de colisão de numeração; adendo em `spec-completion-2026-09.md`. |

## Re-verificação — Tasks de projeto 001–013

| Task | Critério | Situação | Evidência (estado atual) |
| --- | --- | --- | --- |
| **001** Auditoria | Projeto/stack/deps/problemas documentados; compat. Pages avaliada; recomendação produzida | ✅ | `docs/adr/project/001` (alternativas + trade-off aceito, reescrito neste passe); `docs/audit/spec-completion-2026-09.md` §001 |
| **002** Stack | Stack definida + ADR-001 + deps justificadas + build/deploy | ✅ | `docs/adr/project/001` `Accepted`; `next.config.mjs` (`output:'export'`, `basePath`, `trailingSlash`); `ci.yml`+`deploy.yml` |
| **003** Fundação | Inicia/build/lint/test OK; estrutura segue o SDD; **sem dependências não usadas** | ✅ | Gate verde nos 10 commits; `docs/sdd/project.md` §7 agora descreve a árvore real; deps de runtime = apenas `next`/`react`/`react-dom` |
| **004** Design System | Tokens/tipografia/espaçamento/breakpoints/estados/contraste/reduced-motion | ✅ | `app/globals.css` `@layer tokens`; `docs/adr/design/004` cataloga o vocabulário; `docs/adr/project/003` emendas (sombra/z-index; contraste AA) |
| **005** Conteúdo | Revisado; separado da apresentação; pt-BR; nada inventado; projetos consistentes | ✅ | `lib/data/*.ts` + `lib/types.ts`; `Rich` para HTML repo-authored; nenhuma edição de fato profissional neste passe |
| **006** Layout & Navegação | Navegação/links/mobile/teclado/foco/responsivo/HTML semântico | ✅ | `components/Navbar.tsx` (agora via `toggle` do hook); `tests/nav.test.tsx`, `tests/mobile-nav.test.tsx`; `<header>/<nav>/<main>/<footer>` |
| **007** Projetos | Data-driven; nada hardcoded no componente; links; responsivo; acessível; **destaque real p/ Featured** | ✅ | `components/sections/Projects.tsx` + `cards/ProjectCard.tsx`; `.projects-grid-featured` borda `--trace-1`; `docs/adr/project/007`; `tests/projects-featured.test.tsx` |
| **008** Experiência/Formação | Cronológico; objetivo; ênfase técnica; responsivo; semântico | ✅ | `components/sections/{Experience,Education}.tsx` + `cards/EduCard.tsx`; `lib/data/timeline.ts` |
| **009** SEO & A11y | Metadata/OG/sitemap/robots/structured data; teclado; contraste; sem problema crítico | ✅ | `lib/metadata.ts`, `app/{robots,sitemap}.ts`, `lib/seo/schema.ts` (agora via `isExternalUrl`); `tests/{structured-data,a11y-structure,internal-links}.test.tsx`; Lighthouse A11y/BP/SEO 100 |
| **010** Performance | Assets/imagens/JS/deps/3rd-party; **Lighthouse adequado** | ✅ (margem fina) | `docs/adr/project/008` (Lighthouse no CI, ≥ 90 mediana de 3); framer-motion removido (`006`); `inlineCss`. **Risco residual:** home mobile ~93 no CI, 88–89 em Chromium local — ver "Riscos" abaixo |
| **011** Testes & Quality Gates | Testes relevantes; typecheck/lint/build; links internos; **nenhum teste removido** | ✅ | 13 arquivos / 52 casos, intactos; `tests/internal-links.test.tsx`; `.githooks/pre-commit` roda lint+typecheck+test |
| **012** Deploy | Workflow automático; build reproduzível; pipeline falha no obrigatório; publica; assets/rotas em produção | ✅ | `ci.yml` (PR) + `deploy.yml` (push→Pages, `deploy` `needs: build`); validação pública 2026-09-02 |
| **013** Auditoria Final — **Código: sem código morto** | ✅ (agora genuíno) | `ui/Card.tsx` + superfície não usada de `ThemeContext` + prop `style` de `Icon` removidos neste passe. Antes o critério estava marcado, com esses itens presentes. |
| **013** Auditoria Final — demais grupos (Produto/Arquitetura/UX/A11y/SEO/Performance/Deploy) | ✅ | `docs/audit/spec-completion-2026-09.md` + `docs/audit/visual-qa-2026-09.md` + linhas acima. ADRs atualizadas neste passe (001, 002, 003→ref, 005, 008, design-004) — "nenhuma decisão arquitetural não documentada" reforçado |

Spot-check PRD §30 / SDD §30 (`docs/prd/project.md` / `docs/sdd/project.md`): os
18 / 13 itens permanecem atendidos; "Sem duplicação desnecessária" e "Código
organizado" saem reforçados (primitiva única de link externo, cabeçalho de seção
único, rótulo de canal consolidado).

## Trilho de design

`docs/tasks/design.md` foi reconstruído (estava reduzido a um registro de fases)
como `TASK-001…025` verificada por conclusão, com aviso explícito de que a
numeração **não** coincide com `docs/tasks/project/`. Nenhuma pendência.

## Riscos residuais (aceitos, não fechados)

1. **Margem de performance móvel da home.** Mediana de 3 no CI ~93; em Chromium
   local mediu 88–89 com o mesmo `out/`. Acima do piso de 90 no CI, com folga
   pequena. Uma queda real se resolve com LCP, nunca baixando o limite
   (`docs/adr/project/008`). Uma execução ruim de CI pode bloquear um PR — é
   flakiness conhecida, não regressão deste passe (as mudanças de código aqui só
   removem peso).
2. **Nome do check de CI ↔ branch protection.** O job de `ci.yml` não se chama
   `CI`; `CLAUDE.md` foi corrigido para descrever o nome real. Se a proteção de
   branch de `main` exige um check chamado `CI`, um admin precisa apontá-la para
   o nome real (`🔍 Lint, Types, Testes & Build`). Fora do alcance deste passe.
3. **`mise` / Node 22.12.0.** Continua sem instalar por restrição de filesystem;
   o runtime fixado do repositório é o usado.
4. **Overflow horizontal da navbar em ~821–1050px (pré-existente).** A matriz
   headless deste passe (320/375/414/768/820/1280/1680) está limpa, mas
   varreduras extra a 900/1000/1024px acham scroll horizontal (~171px em 900,
   ~47px em 1024, zero em ≥ 1100): acima de 820px o botão "Contato" volta a
   aparecer e o hambúrguer some, mas os 6 links + logo + ações só cabem a partir
   de ~1100px. Confirmado presente em `origin/main` (com as edições da higiene
   de `@layer` stashed) — não é regressão de nenhum dos dois PRs deste passe. A
   matriz de `docs/audit/visual-qa-2026-09.md` pula de 820 para 1280 e nunca
   cobriu essa faixa. **Follow-up sugerido:** subir o ponto em que
   `.btn-nav-contact` some (ou o colapso do menu) para ~1100px — mexe no
   registro de breakpoints, então merece PR + nota em `docs/adr/project/003`.

## Validação de produção

Sem re-deploy neste passe (PR ainda aberto). A última validação pública
(`2026-09-02`, em `docs/audit/spec-completion-2026-09.md`) permanece a
referência: HTTP 200 na home e nos dois estudos de caso + canonical / OG /
JSON-LD / `robots.txt` / `sitemap.xml`.
