# ADR-005 — Sistema Visual Editorial ("passe de sobriedade editorial")

## Status

Accepted (2026-09). Substitui em parte o **ADR-004 ("Telemetria")** — ver
"Supersedes".

## Context

O ADR-004 registrou o sistema "Telemetria": um painel de instrumento
multi-canal, **escuro por padrão**, com tríade de cores de sinal
(ciano/magenta/âmbar), rótulos de canal `CHn ·` com ponto de sinal, uma faixa de
onda animada (`HeroSignature`), fonte **monoespaçada em todo** número / rótulo /
link de navegação / botão, CAIXA-ALTA com tracking largo nos eyebrows e
`font-feature-settings: "zero" 1` (o "tell" de editor de código) nos algarismos.

Três iterações já haviam suavizado o excesso (a última, "passe de sobriedade" no
ADR-004, tirou a CAIXA-ALTA de nav/botões e acalmou o hero) **sem sair da
linguagem de instrumento**. O proprietário pediu ir além: *"algo mais sóbrio e
menos tecnológico"*.

O PRD de design (`docs/prd/design.md` §3–§5) sempre descreveu o alvo como
**"Editorial + Academic + Technical + Professional"** — referência em
"documentação técnica sofisticada, artigos científicos modernos, portfólios de
pesquisadores, interfaces editoriais minimalistas", explicitamente **evitando**
"dashboard corporativo" e "página excessivamente experimental". "Telemetria"
havia derivado justamente para o lado que o PRD alertava. Este ADR traz o site de
volta para perto da *letra* do PRD.

Mudança no design system ⇒ ADR (ADR-project-005). A fonte **normativa** do
sistema continua sendo `app/globals.css` + `docs/adr/project/003` (com emendas) +
a seção "Design system" do `CLAUDE.md`, agora reescrita.

## Decision

Adotar um sistema visual **editorial / acadêmico**, mantida a folha única
`app/globals.css` ordenada por `@layer reset, tokens, base, layout, components,
utilities`.

### Tema

**Claro ("papel") por padrão.** `:root` puro = paleta clara
(`color-scheme: light`). O tema escuro entra por `:root[data-theme="dark"]` e,
para o quadro sem-JS / pré-script, por um `@media (prefers-color-scheme: dark)`
guardado por `:root:not([data-theme="light"])`. Alternância manual persistida em
`localStorage` (`portfolio_theme`), aplicada antes da pintura pelo `<script>`
anti-FOUC de `lib/theme.ts` (inalterado). `context/ThemeContext.tsx` passa a cair
para `"light"` no frame RSC. `components/ThemeToggle.tsx` só reflete o tema real
após montar (`aria-pressed`) — evita divergência de hidratação para quem prefere
o escuro.

### Tokens (nomes mantidos, valores novos)

Os nomes de token de "Telemetria" foram **mantidos** (todo seletor continua
referenciando os mesmos) e só **re-valorados**:

- **Superfícies / tinta (claro):** `--panel` `#f7f6f3` (papel) · `--panel-raised`
  `#ffffff` · `--panel-sunken` `#efeeea` · `--readout` `#1b1b1a` (tinta) ·
  `--label` `#5b5a55` · `--rule` `#dedcd5` · `--rule-strong` `#bcbab1`.
- **Escuro:** `--panel` `#16171a` · `--panel-raised` `#1d1f23` · `--panel-sunken`
  `#101113` · `--readout` `#ededea` · `--label` `#8a8a83` · `--rule` `#2a2b2e` ·
  `--rule-strong` `#3a3b3f`.
- **Acento único:** `--trace-1` = azul-ardósia — `#2e4b63` (claro) / `#7fa9c9`
  (escuro, clareado p/ contraste AA). Links, foco, estado ativo, `code`,
  `::selection`, fio da margem do card em destaque, primário dos botões.
  `--trace-1-dim` = `color-mix(--trace-1 12%, transparent)` (fundo de `code`).
- **`--ok`** `#3b7a4b` — mantido, mas agora **só** para o ponto de
  disponibilidade do hero.
- **Removidos:** `--trace-2` (magenta), `--alert` (âmbar), a família
  `--cat-de/-ml/-opt/-analytics` (legenda categórica de domínio),
  `--trace-1-edge`, `--shadow-ring` / `--shadow-ring-lg` (anéis de brilho),
  `--mono-settings`.
- **Raio:** `--r-sm` 3→**2px**, `--r-md` 6→**4px**. `--wrap` 1140px mantido.
- **Escala:** `--fs-lg` 1.4→**1.5rem**, `--fs-xl` 1.85→**2rem**, `--fs-hero`
  `clamp(1.9rem…3rem)` → `clamp(2rem, 4.5vw, 3.2rem)`.

### Tipografia

Via `next/font` em `app/layout.tsx`:

- **Source Serif 4** (`--font-serif`, **nova**) — `h1–h3`, `.hero-title`,
  `.section-title`, `.edu-degree`, `.nav-logo` e os números das telhas
  (`.metric-number`). É a maior alavanca "acadêmico, não techy".
- **Archivo** (`--font-display`, mantida) — corpo, navegação, botões, filtros,
  tags, rótulos, eyebrows.
- **JetBrains Mono** (`--font-mono`) — **só** `code` e os diagramas ASCII de
  pipeline (`.architecture-card pre`). Saiu de nav, botões, filtros, chips,
  telhas, rodapé, `.stack-table` e eyebrows.

Sem CAIXA-ALTA fora do conteúdo. Sem `tabular-nums` global; sem `"zero" 1`.

### Estrutura — sem metáfora de instrumento

- **Sem numeração de canais.** `components/ui/ChannelLabel.tsx` →
  `components/ui/Eyebrow.tsx` (kicker editorial: rótulo + um fio à esquerda, sem
  número, sem ponto de sinal). `SectionHeader` perde a prop `channel`; a régua de
  fecho é `<hr class="section-rule">` (hairline simples, sem o tick ciano).
  `Navbar` sem `CH0 ·` no logo e sem os prefixos `CH1…CH6` nos links.
  `About` sem `CH1 ·`. `Footer` sem `CH∞ · Fim da transmissão` (agora um kicker
  "Contato").
- **`HeroSignature` removido** (`components/HeroSignature.tsx` deletado, com o
  `@keyframes trace-scroll`). O Hero passa a ser um **bloco de autoria**: função
  (kicker) · retrato em placa hairline grayscale · nome em serifa · síntese ·
  telhas como *pull-figures*.
- **Legenda categórica colapsada.** `.project-category-badge` vira um rótulo
  discreto (ícone + texto, tinta única); sem chip colorido, sem `--c` /
  `color-mix` por domínio. Filtro ativo e fio do card em destaque usam o acento
  único. `data-category` nos elementos **permanece** (invariante de
  `tests/filters.test.tsx`).
- **Movimento:** a única animação contínua (a onda) some — o site atende de novo
  a *letra* de `prd/design.md` §16. Fica só o `card-fade-in` no troca-de-filtro
  (já protegido por `prefers-reduced-motion`). Hover do card de projeto: só
  `border-color` (sem o `translateY(-2px)`).

### Elemento de assinatura

O **bloco de autoria do hero** — nome em Source Serif 4, retrato em placa, telhas
em serifa sob uma régua fina — lê como o cabeçalho de um artigo. A serifa é o fio
condutor da identidade; o resto fica quieto e disciplinado.

## Supersedes

Prevalece sobre estes pontos do ADR-004 (o resto do ADR-004 é histórico):

| ADR-004 | ADR-005 |
|---|---|
| Dark-first (`:root` = escuro) | **Light-first** (`:root` = claro) |
| Três cores de sinal (ciano/magenta/âmbar) + legenda `--cat-*` de domínio | **Um** acento (azul-ardósia); legenda colapsada em rótulo + ícone |
| `CHn · TÍTULO` com ponto de sinal (CH0 hero, CH1–CH6 seções, CH∞ rodapé) | Sem numeração de canais; kicker editorial com um fio |
| `HeroSignature` — faixa de onda animada (`trace-scroll` 14s) | Removida; hero = bloco de autoria |
| Mono em todo dado/rótulo/nav/botão; sem serif | Serif (Source Serif 4) nos títulos; mono só em código/diagramas |
| CAIXA-ALTA + tracking largo em `.section-tag` etc.; `"zero" 1` nos algarismos | Sem CAIXA-ALTA fora do conteúdo; sem feature-settings de dígito |
| Anéis de brilho (`--shadow-ring*`) como elevação | Sem brilho; `outline` de foco sólido, bordas hairline |

`prd/design.md` §5 (paleta neutra, **uma** cor de destaque) e §16 ("evitar
animações contínuas") voltam a valer pela letra — as notas "Substituído" dessas
seções foram revisadas para apontar este ADR. `sdd/design.md` §6 ("serif para
títulos", opcional) agora é seguido.

## Consequences

### Positivas

- A primeira impressão comunica "pesquisador / engenheiro", editorial e sóbria —
  o alvo do PRD, sem a leitura de "dashboard".
- Menos CSS: `gzip -c out/index.html | wc -c` caiu de **32 984 → 28 996 B**
  (−3 988 B — o passe remove mono-em-tudo + a onda + os tokens de sinal; o
  `@font-face` da serifa nova não compensa).
- Uma animação contínua a menos para auditar.
- `prefers-color-scheme` e o default agora concordam (claro), o que reduz o
  cenário de divergência de tema no primeiro paint.

### Negativas / custos

- **Três** famílias de fonte self-hosted (Source Serif 4 + Archivo + JetBrains
  Mono). Só o subset latin de cada uma é pré-carregado; medir a cada revisão de
  performance. Lighthouse (mediana de 3, Chromium local): home mobile **95**
  (linha de base 94), desktop 100; estudos de caso 95 / 100; A11y / BP / SEO
  **100** em todas as rotas — sem regressão.
- `docs/prd/design.md` §5/§16, `docs/adr/design/004` e a seção "Design system" do
  `CLAUDE.md` passam a exigir cruzamento com este ADR.
- `tests/hero.test.tsx` foi realinhado (some a asserção de `CH0 ·` e o bloco
  `HeroSignature`; entra o kicker de função). 13 arquivos / **51** testes.
