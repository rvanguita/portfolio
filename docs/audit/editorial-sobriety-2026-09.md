# Passe editorial — "mais sóbrio, menos tecnológico" (2026-09)

Quarta iteração de estilo. Pedido do proprietário: *"algo mais sóbrio e menos
tecnológico"* — ir **além** das três suavizações anteriores, que nunca saíram da
linguagem de instrumento "Telemetria". Decisão: adotar a direção **editorial /
acadêmica** que o PRD de design (`docs/prd/design.md` §3–§5) sempre descreveu.

Alcance escolhido (respostas do proprietário): re-tema completo · tema **claro**
por padrão · **serifa** de display · legenda de domínio **colapsada** em um
acento.

Branch: `feat/professional-pass`. Decisão registrada em
`docs/adr/design/005-editorial-sobriety.md`; `docs/adr/design/004` marcado como
"superseded in part"; `CLAUDE.md` e `docs/prd/design.md` §5/§16 revisados.

## O que mudou

| Unidade | Detalhe |
|---|---|
| **Tema** | Dark-first → **light-first**. `:root` = paleta "papel" (`--panel #f7f6f3`, `--readout #1b1b1a`); escuro em `:root[data-theme="dark"]` + `@media (prefers-color-scheme: dark)` guardado. `context/ThemeContext.tsx` cai para `"light"` no frame RSC; `ThemeToggle` gateia `aria-pressed` atrás de `mounted` (some a divergência de hidratação, agora para quem prefere o escuro). `viewport.themeColor` invertido. |
| **Acento** | Tríade de sinal (ciano/magenta/âmbar) + legenda `--cat-*` → **um** acento `--trace-1` azul-ardósia (`#2e4b63` claro / `#7fa9c9` escuro). Removidos `--trace-2`, `--alert`, `--cat-de/-ml/-opt/-analytics`, `--trace-1-edge`, `--shadow-ring*`, `--mono-settings`. `--ok` mantido só para o ponto de disponibilidade. |
| **Tipografia** | **Source Serif 4** (nova, `next/font`) em `h1–h3`, `.hero-title`, `.section-title`, `.edu-degree`, `.nav-logo`, `.metric-number`. **Archivo** no corpo/UI. **JetBrains Mono** só em `code` e nos diagramas ASCII. Sem `tabular-nums` global; sem `"zero" 1`. Sem CAIXA-ALTA fora do conteúdo. `--fs-lg` 1.4→1.5rem, `--fs-xl` 1.85→2rem, `--fs-hero` até 3.2rem. `--r-sm` 3→2px, `--r-md` 6→4px. |
| **Canais** | `ChannelLabel.tsx` → `Eyebrow.tsx` (kicker com um fio, sem `CHn`, sem ponto de sinal). `SectionHeader` sem prop `channel`; fecha com `<hr class="section-rule">`. `Navbar`: logo = nome em serifa, links sem `CH1…CH6`. `About` sem `CH1 ·`. `Footer`: `CH∞ · Fim da transmissão` → kicker "Contato". |
| **Assinatura** | `HeroSignature.tsx` **deletado** (+ `@keyframes trace-scroll`). Hero = bloco de autoria: função · retrato em placa hairline grayscale · nome em serifa · síntese · telhas como *pull-figures* sob régua fina. |
| **Legenda de domínio** | `.project-category-badge` = ícone + rótulo em tinta única (sem chip colorido, sem `--c`/`color-mix`). `.cat-*` e as regras `.filter-btn[data-category=…].active` por hue removidas. `data-category` nos elementos **mantido** (`tests/filters.test.tsx`). Grade de destaque mantém um fio de 2px `--trace-1` na margem. |
| **Movimento** | Onda contínua removida — **zero animação contínua** (volta à letra do PRD §16). Fica só `card-fade-in` no troca-de-filtro. Hover do card de projeto: só `border-color` (sem `translateY`). |

### Preservação de conteúdo (ADR-005 de projeto / PRD §21)

`CHn`, `"Fim da transmissão"` e `"REC"` eram **enquadramento**, não fato. Nenhum
número, data, credencial, nome, empresa, projeto, tecnologia ou resultado em
`lib/data/*` foi alterado. `lib/data/*` e `lib/site-stats.ts` sem diff.
`profile.name` / `profile.shortName` intactos.

## Verificação

### Gate

`npm run lint && npm run typecheck && npm test && npm run build` — verde.
**13 arquivos / 51 testes** (era 52; `tests/hero.test.tsx` perdeu a asserção de
`CH0 ·` e o bloco `HeroSignature`, ganhou o kicker de função — realinhamento com
o ADR-005, não remoção para passar).

### Lighthouse — `scripts/lighthouse.mjs`, `LH_RUNS=3`, mediana de 3 (Chromium local)

| Rota | Perf. mobile — base → depois | Perf. desktop | A11y / BP / SEO |
|---|---|---|---|
| `home` | 94 → **95** | 100 → 100 | 100 |
| `wind-farm` | 95 → 95 | 100 → 100 | 100 |
| `lake-fastf1` | 96 → 95 | 100 → 100 | 100 |

Sem regressão apesar da serifa nova (só o subset latin é pré-carregado por
família). Gate do CI usa `google-chrome`.

### Contraste (headless, `puppeteer-core` via `chromium`)

Home + 2 estudos de caso × {claro, escuro} — nav, botões, filtros, chips,
`.hero-tagline`, `.about-facts`, `.eyebrow`/`.section-tag`, rótulos de métrica,
links: sem falha de `color-contrast` no Lighthouse/axe (Accessibility **100** em
todas as rotas). O acento `--trace-1` sobre `--panel` mede ~9:1 (claro) e ~7:1
(escuro); `--label` sobre `--panel` ~6,5:1 (claro) / ~5,2:1 (escuro).

### Matriz visual (headless, 2 temas)

`home` (desktop + 390px) e `wind-farm` × {claro, escuro} + o recorte do hero:
um `<h1>` por página, `data-theme` correto, **console limpo** (a única mensagem é
o aviso do React DevTools). Reduced-motion: `.availability-dot` estático, sem
onda para congelar.

### Tamanho do CSS inlinado

`gzip -c out/index.html | wc -c`: **32 984 → 28 996 B** (−3 988 B — o passe
remove mono-em-tudo + a onda + os tokens de sinal; o `@font-face` da serifa não
compensa).

## Identidade

A serifa (Source Serif 4) é o fio condutor; o acento azul-ardósia e as hairlines
carregam a estrutura. Saiu a metáfora de instrumento (canais, onda, tríade de
sinal, mono-em-tudo, brilho); entrou um cabeçalho de artigo.
