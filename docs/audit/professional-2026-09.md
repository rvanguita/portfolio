# Passe de sobriedade — "mais profissional para a área de dados" (2026-09)

Terceira iteração de estilo. Pedido: o site parecia esforçado em vez de sênior —
nome gigante de landing page, CAIXA-ALTA monoespaçada em quase tudo, elementos de
efeito (`REC ·` piscando, onda animada, `CHn`), telhas "10x / 20+" repetidas.
Decisão do proprietário: **suavizar os excessos, manter a identidade "Telemetria"**;
alcance **visual + reorganização de conteúdo + reescrita de copy**.

Branch: `feat/professional-pass` (de `main`). Registro em
`docs/adr/design/004-telemetria-system.md` (emenda "passe de sobriedade").

## Commits

| Commit | Unidade |
|---|---|
| `refactor(design): drop uppercase from nav, buttons, filters, chips` | CAIXA-ALTA e tracking largo removidos de `.nav-link`, `.btn-*`, `.filter-btn/.cert-filter-btn`, `.projects-other > summary`, `.footer-socials a`, `.social-chip`. Mantida em `.section-tag`, `.project-category-badge`, `.stack-table th`. |
| `feat(design): calmer hero — smaller title, quiet status, subtler wave` | `--fs-hero` clamp(2.6→1.9 … 4.4→3rem); `.hero-title` stretch 108→102%. `.hero-tagline` vira linha mono discreta em `--label`, ponto verde estático. `@keyframes blink` removido. `.hero-signature` 46→28px, sem grade; onda com amplitude/opacidade menores. |
| `refactor(content): hero + About copy, senior tone` | `lib/data/profile.ts`: `heroTagline` sem `REC`; `heroLead`, `aboutHeading`, `aboutBio` reescritos; `footerTagline` com separadores limpos. Fatos literais. |
| `feat(design): stat tiles once; scannable About; drop fake sparklines` | Telhas só no hero (sem sparkline). `About.tsx` = cabeçalho + bio em dois parágrafos + faixa `.about-facts` (3 fatos). `Sparkline.tsx` removido; `site-stats.ts` sem `trend`. |
| `refactor(content): normalize project action labels` | "Ver Código no GitHub" → "GitHub"; "Estudo de Caso" → "Estudo de caso". Texto de challenge/highlights intacto (já conciso). |
| `refactor(design): un-shout the CH0 label; "Entrar em contato"` | `.channel-label` (o `CH0 ·` do hero, `CH∞` do rodapé) sem CAIXA-ALTA. CTA "Vamos conversar" → "Entrar em contato". |

## Preservação de conteúdo (ADR-005 / PRD §21)

Diff de `profile.ts` + `projects.ts` + `site-stats.ts` conferido: **nenhum fato,
número, credencial, nome, data ou resultado adicionado ou alterado** — só
enquadramento. Verbatim: `Ph.D.`, `10x`, `20+`, `Doutorado em Engenharia
Elétrica pela UNICAMP`, `Busca Tabu`, `método Cônico clássico`, `planejamento de
expansão de sistemas de distribuição de energia elétrica`, `RMSE de 12,41%`,
`R² de 81,93%`. `profile.name` / `profile.shortName` intactos.

## Verificação

### Lighthouse — `LH_RUNS=3`, mediana de 3 (Chromium local)

| Rota | Perf. mobile — base → depois | Perf. desktop | A11y / BP / SEO |
|---|---|---|---|
| `home` | 94 → **94** | 100 → 100 | 100 |
| `wind-farm` | 95 → 95 | 100 → 100 | 100 |
| `lake-fastf1` | 96 → 96 | 100 → 100 | 100 |

Sem regressão. Gate do CI usa `google-chrome`.

### Contraste (headless, `puppeteer-core`)

160 amostras — home + 2 estudos de caso × {claro, escuro} — de nav links,
botões, filtros, chips, `.hero-tagline`, `.about-facts`, `.channel-label`,
`.section-tag`, rótulos de métrica: **0 abaixo de 4,5:1**. `axe`/Lighthouse
`color-contrast` sem falhas (Accessibility 100).

### Matriz visual (headless)

320 / 375 / 414 / 768 / 820 / 900 / 1024 / 1100 / 1280 / 1680 px × {claro,
escuro} × 3 páginas — um `<h1>` por página, `data-theme` correto, console limpo.
**Overflow horizontal da navbar em ~821–1099 px (pré-existente,
`spec-reverify-2026-09.md` risco 4): diminuiu** — de ~171 px para ~85 px em
900 px, zerando por volta de 1000 px (`.nav-link` sem tracking largo ficou mais
estreito). Ainda não zera nessa faixa; o fix completo (subir o breakpoint +
emenda em `docs/adr/project/003`) continua sendo follow-up próprio.

### Tamanho do CSS inlinado

`gzip -c out/index.html | wc -c`: **34 012 → 32 984 B** (−1 028 B — o passe
remove mais CSS/animação do que adiciona).

### Gate

`npm run lint && npm run typecheck && npm test && npm run build` verde ao fim de
cada commit. **13 arquivos / 52 testes**, nenhum alterado.

## Identidade preservada

`CHn` (canais + prefixos), ponto de sinal, dark-first, onda `trace-scroll`
(agora discreta), legenda categórica de domínio, telhas de leitura em mono. O
que saiu foi o volume, não a linguagem.
