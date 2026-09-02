# Restyle — legenda categórica de domínio (2026-09)

Passe de **refinamento** do sistema "Telemetria" para empurrar a identidade
"dados / ciência de dados / ML / engenharia de dados" um pouco mais longe, sem
virar dashboard. Nível de ambição e motivo condutor ("legenda de instrumento")
decididos pelo proprietário. Registro de decisão em
`docs/adr/design/004-telemetria-system.md` (emenda) e `docs/adr/project/003`
(emenda — família `--cat-*`).

Branch: `feat/instrument-legend` (sobre `main` + PR #14 + PR #15).

## O que mudou

| Commit | Unidade |
|---|---|
| `feat(design): per-domain categorical palette (--cat-*)` | 4 tokens de domínio (`--cat-de` = ciano, `--cat-ml` violeta novo, `--cat-opt` = âmbar, `--cat-analytics` = verde `--ok`). Aplicados via CSS aos ganchos que já existiam (`data-category` / `.cat-*`): badge de categoria (`--c`), barra do card em destaque, filtro ativo. `--ok` claro escurecido `#2f8f3f` → `#1a7a34` p/ WCAG AA. |
| `feat(design): tabular figures on readouts` | `body { font-variant-numeric: tabular-nums }`; `.metric-number` / `.edu-year` com `font-feature-settings: "tnum" 1, "zero" 1` (zero cortado). |
| `feat(design): sparklines read as mini-plots; clean tnum fallback` | `Sparkline.tsx` ganha grade de eixo fraca (`aria-hidden`, 0,22 opacidade, sem dado). Correção de um fallback inválido que o lightningcss gerava para `font-variant-numeric` de dois valores. |
| `refactor(css): wire .trace-divider under section headers; drop dead tokens` | `<SectionHeader>` fecha com `<hr class="trace-divider" aria-hidden>`. `--fs-2xl` e o seletor `.panel-card` (0 usos) removidos. |
| `feat(design): tint skill-group icons by domain` | `SkillGroup.domain` (reusa `ProjectCategory`); ícone do grupo assume a cor da legenda. |

**A cor nunca é o único diferenciador** (WCAG 1.4.1): todo chip de domínio tem
ícone + rótulo de texto.

## Verificação

### Lighthouse — `scripts/lighthouse.mjs`, `LH_RUNS=3`, mediana de 3 (Chromium local)

| Rota | Perf. mobile — antes → depois | Perf. desktop | A11y / BP / SEO |
|---|---|---|---|
| `home` | 94 → **94** | 100 → 100 | 100 |
| `wind-farm` | 96 → 94 | 100 → 100 | 100 |
| `lake-fastf1` | 96 → 95 | 100 → 100 | 100 |

Nenhuma categoria abaixo de 90 em nenhuma rota/form factor. As quedas de 1–2 pts
nos estudos de caso móveis estão dentro do ruído de execução documentado em
`docs/adr/project/008` (a folga da home é a que importa e ficou intacta). O gate
do CI usa `google-chrome`.

### Contraste (headless, `puppeteer-core`)

Home + dois estudos de caso × {claro, escuro}: **106 amostras** de elementos que
usam uma cor `--cat-*` como texto ou preenchimento — **0 abaixo de 4,5:1**.
Mínimo teórico das quatro hues (texto sobre `panel`/`raised`/`sunken` e `--panel`
sobre a hue preenchida, nos dois temas): **4,63:1** (`--cat-opt` no tema claro).
`axe`/Lighthouse `color-contrast` = 0 falhas (Accessibility 100 em todas as rotas).

### Matriz visual (headless)

320 / 375 / 414 / 768 / 820 / 1280 / 1680 px × {claro, escuro} × 3 páginas —
**0 falhas**: sem scroll horizontal (exceto a faixa ~821–1099 px, pré-existente
e já registrada em `spec-reverify-2026-09.md`), um `<h1>` por página, `data-theme`
correto, console limpo. Filtro de projeto: 6 cards → clicar "Machine Learning" →
2 cards, a grade de destaque e o `<details>` colapsam, o botão ativo fica violeta.
`prefers-reduced-motion`: `.availability-dot` e a faixa de onda continuam
congelados.

### Tamanho do CSS inlinado

`gzip -c out/index.html | wc -c`: **33 341 → 34 049 B** (+708 B; orçamento +1 KB).
Compensado em parte com a remoção de `--fs-2xl` e `.panel-card`.

### Gate

`npm run lint && npm run typecheck && npm test && npm run build` verde ao fim de
cada um dos 5 commits de código. **13 arquivos / 52 testes**, nenhum alterado
(os testes rodam `css:false` — a rede de segurança visual é o Lighthouse + esta
matriz headless).

## Não feito (fora do escopo escolhido)

- Fundo de "papel milimetrado" / grade de plot atrás do hero — era objetivo
  esticado; o proprietário escolheu "textura mínima". Não incluído.
- Reskin assertivo (paleta mais forte, motivos de notebook) — exigiria reverter
  linhas "não fazer" do PRD e um ADR que as substitui. Não é este passe.
