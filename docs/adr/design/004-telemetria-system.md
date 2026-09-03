# ADR-004 — Sistema Visual "Telemetria"

## Status

**Superseded in part (2026-09) por [ADR-005](005-editorial-sobriety.md).** O site
passou a um sistema **editorial / acadêmico**: claro por padrão, um único acento
(azul-ardósia), serifa (Source Serif 4) nos títulos, sem numeração de canais
`CHn`, sem a faixa de onda `HeroSignature`, sem a legenda categórica `--cat-*` e
com o mono restrito a código/diagramas. O que o ADR-005 substitui está tabelado
lá em "Supersedes"; o restante deste documento é histórico do que esteve no ar
entre 2026-09 e o passe editorial.

Accepted (2026-09 — registro retroativo; o sistema já estava implementado e no
ar. Formaliza, no trilho de design, uma decisão que até aqui só existia em
`docs/adr/project/003-design-system.md`, `app/globals.css` e `CLAUDE.md`.)

## Context

O ADR-design-001 fixou a direção "Editorial + Academic + Technical +
Professional" com **paleta neutra** e **destaque cromático discreto**. O PRD de
design (`docs/prd/design.md` §5) e o SDD de design (`docs/sdd/design.md` §5.1,
§6) descrevem, coerentemente, um redesign editorial claro: base branco/grafite,
uma única cor de destaque, nomes de token genéricos (`--color-*`, `--font-body`,
`--content-width`), sem gradientes, "sem animações contínuas" (PRD §16).

A implementação evoluiu para algo mais opinativo — **"Telemetria"**: um painel
de instrumento multi-canal, **escuro por padrão**, com uma tríade de cores de
sinal e uma faixa de onda ambiente. Essa evolução preserva os objetivos do
ADR-001 (rigor, precisão, longevidade, hierarquia forte, minimalismo funcional)
mas contradiz a *letra* de partes do PRD/SDD de design. O ADR-project-005 exige
que mudanças no design system sejam registradas em ADR; este documento faz isso
e marca explicitamente o que substitui.

A fonte **normativa** do sistema continua sendo `app/globals.css` +
`docs/adr/project/003-design-system.md` (com as emendas 2026-09) + a seção
"Design system" do `CLAUDE.md`. Este ADR descreve e sanciona; não duplica
valores que possam divergir.

## Decision

Adotar o sistema "Telemetria", implementado como **folha única**
`app/globals.css` ordenada por `@layer reset, tokens, base, layout, components,
utilities` (a ordem das camadas — não a especificidade — resolve conflitos).

### Tema

**Dark-first.** `:root` puro = paleta escura (`color-scheme: dark`). O tema
claro ("daytime") entra por `:root[data-theme="light"]` e, para o quadro
sem-JS / pré-script, por um bloco `@media (prefers-color-scheme: light)`
guardado. Alternância manual persistida em `localStorage` (`portfolio_theme`),
aplicada antes da pintura por um `<script>` inline anti-FOUC cuja fonte vive em
`lib/theme.ts` (módulo sem `"use client"`).

### Tokens (nomes reais)

- **Superfícies / tinta:** `--panel`, `--panel-raised`, `--panel-sunken`,
  `--readout`, `--label`, `--rule`, `--rule-strong`.
- **Cores de sinal:** `--trace-1` (ciano — acento primário: links, foco, ativo),
  `--trace-2` (magenta — série secundária), `--alert` (âmbar — REC/destaques),
  `--ok` (verde). Mais `--trace-1-dim` / `--trace-1-edge` (mixes).
  No tema claro, `--trace-1` e `--alert` são escurecidos para WCAG 2.2 AA
  (≥ 4,5:1) — ver emenda de `docs/adr/project/003`.
- **Tipografia:** escala `--fs-2xs … --fs-2xl` + `--fs-hero`.
- **Espaçamento:** `--sp-1 … --sp-24`. **Raio:** `--r-sm` (3px), `--r-md` (6px).
  **Régua:** `--rule-w`. **Largura de conteúdo:** `--wrap` (1140px).
- **Elevação:** só anéis de brilho — `--shadow-ring`, `--shadow-ring-lg`. Não
  existe escala de drop-shadow.
- **z-index:** `--z-navbar` (100), `--z-skip-link` (200).
- **Breakpoints:** registro em comentário no bloco `tokens` (sm 640 / md 720 /
  lg 820 / xl 860); custom properties não valem dentro de `@media`.
- **Movimento:** `--easing`, `--dur`.

### Tipografia

Via `next/font` em `app/layout.tsx`: **Archivo** (display + corpo) e **JetBrains
Mono** (todo número, rótulo, tag de tecnologia, rótulo de canal e `code`). Sem
serif; sem Inter.

### Convenção de canais

`CHn · TÍTULO` com um ponto de sinal à esquerda. `CH0` = hero/logo; `CH1…CH6` =
as seis seções de navegação (índice de `NAV_ITEMS` + 1); `CH∞` = rodapé.
Renderizada por `components/ui/ChannelLabel.tsx` / `SectionHeader.tsx` /
`.section-tag` / `.channel-label`. Exatamente seis canais — invariante
verificado por `tests/nav.test.tsx` e `tests/home.test.tsx`.

### Elemento de assinatura

`components/HeroSignature.tsx` — faixa de onda SVG ambiente sob a navbar,
animada por `@keyframes trace-scroll` (loop de 14s), **congelada** pelo bloco
`@media (prefers-reduced-motion: reduce)`.

## Supersedes / desvios registrados

Prevalece sobre a letra dos seguintes pontos do trilho de design (o *espírito*
— discrição, tecnicidade, precisão — é mantido):

| Doc | Texto original | "Telemetria" |
|---|---|---|
| `prd/design.md` §5 | paleta neutra, **uma** cor de destaque discreta, "não utilizar gradientes chamativos" | dark-first; **três** cores de sinal (ciano/magenta/âmbar) usadas como leitura de instrumento, não decoração; `repeating-linear-gradient` sutil na faixa de onda e `color-mix` na navbar |
| `prd/design.md` §16 | "evitar animações contínuas" | uma animação contínua: a faixa `trace-scroll` (14s). É ambiente e **não informativa** — congela sob `prefers-reduced-motion`, custo de performance ~nulo; o site permanece legível e profissional com ela desligada (§16 in fine) |
| `sdd/design.md` §5.1 | nomes de token `--color-*`, `--font-body`, `--content-width`, `--reading-width` | vocabulário real: `--panel`, `--readout`, `--trace-1`, `--sp-*`, `--wrap`, `--r-sm/-md` (sem `--font-body` — o corpo usa `--font-display`) |
| `sdd/design.md` §6 | "serif para títulos" (opcional) | sem serif — Archivo (display+corpo) + JetBrains Mono (dado/rótulo) |

`prd/design.md` §14 e `sdd/design.md` §7 listavam seções "Research" e "Contact";
a ausência de `#contato` dedicada já está registrada em `docs/sdd/project.md`
§11 e não há seção "Research" isolada (a pesquisa aparece em Experiência /
Formação).

## Consequences

### Positivas

- O trilho de design passa a descrever o que está no ar; um agente que leia
  `prd/design.md` + `sdd/design.md` + este ADR não é induzido a "corrigir" o
  tema escuro ou remover a faixa de onda.
- A identidade fica mais distinta e memorável que um editorial neutro, sem
  perder longevidade (paleta e movimento contidos, tipografia como base).

### Negativas / custos

- Duas cores de sinal a mais para manter em contraste AA nos dois temas
  (coberto pela emenda de `docs/adr/project/003`).
- Uma animação contínua a auditar em cada revisão de performance/motion — o
  `prefers-reduced-motion` é o guarda.
- `prd/design.md` §5/§16 e `sdd/design.md` §5.1 passam a ter uma anotação de
  "substituído"; quem edita o design precisa cruzar com este ADR.

## Update — legenda categórica de domínio (2026-09)

Passo de *refinamento* dentro da direção já aceita (não um novo sistema): o site
passa a **ler como uma legenda de instrumento**, empurrando a identidade "dados /
DS / ML / DE" um pouco mais longe sem virar dashboard. A decisão de nível de
ambição (refinamento, não reskin) e o motivo condutor ("legenda de instrumento")
foram do proprietário.

### Cores por domínio

As quatro áreas de atuação ganham uma leitura de sinal própria — antes
`.cat-de/-ml/-opt/-analytics` resolviam todas para o mesmo chip ciano.

| Domínio | Token | Origem | Escuro | Claro (WCAG AA) |
|---|---|---|---|---|
| Engenharia de Dados | `--cat-de` | = `--trace-1` (ciano — a espinha dorsal) | `#4fd1e0` | `#086b78` |
| Machine Learning | `--cat-ml` | **novo** — violeta discreto | `#9d8df1` | `#5b4bc4` |
| Pesquisa Operacional | `--cat-opt` | = `--alert` (âmbar — restrições/limites) | `#f5a524` | `#946000` |
| Analytics & BI | `--cat-analytics` | = `--ok` (verde — resultado) | `#3fb950` | `#1a7a34` |

Três reaproveitam sinais existentes; só o violeta é hue nova. Aplicadas via CSS
(os ganchos `data-category` / classe `.cat-*` já vinham do TSX): tinta do
`.project-category-badge` (um custom-prop `--c` definido pela classe `.cat-*`), a
barra lateral do card em destaque, o filtro ativo (`.filter-btn[data-category]`)
e o ícone do grupo de skills. Filtros/grupos de **certificados ficam ciano** —
não são a taxonomia DE/ML/OR/BI.

**A cor nunca é o único diferenciador** (WCAG 1.4.1): todo chip de domínio traz
ícone + rótulo de texto. Contraste verificado nos dois temas, nos dois sentidos
(hue como texto sobre panel/raised/sunken e `--panel` como texto sobre a hue
preenchida): mínimo medido 4,63:1 — 106 amostras headless, 0 reprovações.
`--trace-2` (magenta) segue reservado para o pico do sparkline, não é domínio.

### Algarismos tabulares

`body { font-variant-numeric: tabular-nums }` — todo dígito alinha em coluna,
inclusive em prosa (R², RMSE, datas). `.metric-number` / `.edu-year` acrescentam
`font-feature-settings: "tnum" 1, "zero" 1` (zero cortado — o "tell" de editor de
código; JetBrains Mono traz a feature).

### Sparkline como mini-plot

`components/ui/Sparkline.tsx` ganha uma grade horizontal fraca (base + 1/3 + 2/3)
a 0,22 de opacidade, `aria-hidden` — moldura de eixo, **sem** informação (o
componente já era "Decorativo"). A linha continua sendo o único dado.

### `.trace-divider` sob os cabeçalhos de seção

`.trace-divider` (regra reserva, 0 usos) vira o fecho do `<SectionHeader>`:
`<hr class="trace-divider" aria-hidden>` — cada cabeçalho encerra com um marcador
de canal, delimitado do corpo. About mantém o cabeçalho em painel (tratamento
distinto).

### Contraste / custo

- `--ok` estava definido e sem uso; o valor claro `#2f8f3f` só alcançava ~4:1
  sobre branco. Escurecido para `#1a7a34` (≥ 4,5:1) — a mesma sintonia WCAG AA
  que `docs/adr/project/003` já aplicara a `--trace-1`/`--alert`, agora que
  `--ok` está em uso. Registrado também em ADR-003 (emenda 2026-09).
- Delta de CSS: **+708 B gzip** na página inicial inlinada (orçamento +1 KB);
  `--fs-2xl` e o seletor `.panel-card` (ambos 0 usos) removidos para compensar.
- Lighthouse (mediana de 3, local): home mobile **94 → 94**, desktop 100;
  estudos de caso mobile 95-94 (dentro do ruído documentado); A11y / Best
  Practices / SEO **100** em todas as rotas. Ver
  `docs/audit/restyle-2026-09.md`.

Reverte a orientação do `CLAUDE.md` de que os quatro `.cat-*` "resolvem para um
único chip ciano".

## Update — passe de sobriedade (2026-09)

Terceira iteração de estilo, pedida como "mais profissional para a área de
dados". A identidade "Telemetria" é mantida; o que sai é o *excesso* que fazia o
site parecer esforçado em vez de sênior. Decisão do proprietário: suavizar, não
recuar da identidade.

### Caixa-alta

CAIXA-ALTA monoespaçada era usada em quase tudo. Passou a valer só onde carrega
significado de "instrumento": `.section-tag` (o `CHn ·` dos cabeçalhos de seção),
`.project-category-badge` (códigos curtos de domínio) e `.stack-table th`.
Perderam a caixa-alta (e o tracking largo, agora `0.02em`): `.nav-link`,
`.btn-primary/.btn-secondary/.btn-project`, `.btn-nav-contact`,
`.filter-btn/.cert-filter-btn`, `.projects-other > summary`, `.footer-socials a`,
`.social-chip` e `.channel-label` (o `CH0 ·` do hero e o `CH∞` do rodapé — não se
grita o nome de uma pessoa). Tudo continua monoespaçado.

### Hero

- `--fs-hero` `clamp(2.6rem, 6vw, 4.4rem)` → `clamp(1.9rem, 4vw, 3rem)`;
  `.hero-title` `font-stretch` 108% → 102%. Editorial, não outdoor.
- `heroTagline` "REC · Disponível para novos desafios" → "Disponível para novos
  projetos". O `REC` (metáfora de gravador) sai; o chip âmbar bordado vira uma
  linha mono discreta em `--label` com um ponto verde estático.
- `@keyframes blink` removido (o ponto não pulsa mais).
- `.hero-signature` 46px → 28px, sem a grade vertical
  (`repeating-linear-gradient`); amplitudes da onda 9/5 → 5/3, opacidades
  0.55 / 0.22. Continua rolando (congelada sob `prefers-reduced-motion`).

### Telhas de leitura

Apareciam duas vezes (hero e Sobre) e cada uma trazia um sparkline desenhado a
partir de arrays de tendência inventados — o oposto de "profissional para dados".
Agora: só no hero, sem sparkline (valor + rótulo). `components/ui/Sparkline.tsx`
foi removido; `lib/site-stats.ts` perdeu o campo `trend`.

### Conteúdo (copy)

Reescrita de tom sênior no `lib/data/profile.ts` e nos rótulos de ação de
`lib/data/projects.ts` — **todo fato, número, nome, data e resultado preservado
literalmente** (ADR-005 / PRD §21). Só o enquadramento muda. O Sobre passou a
dois parágrafos + uma faixa de três fatos escaneáveis (`.about-facts`, todos
derivados do próprio texto). `profile.name` / `shortName` intactos.

### Verificação

- Lighthouse (mediana de 3, local): idêntico à linha de base — home mobile **94**,
  desktop 100; casos 95-96 / 100; A11y / Best Practices / SEO **100** em todas as
  rotas.
- Contraste: 160 amostras headless (home + 2 casos × 2 temas) — **0 abaixo de
  4,5:1**; o texto sem caixa-alta e a nova `.hero-tagline` em `--label` passam.
- CSS inlinado da home: **34 012 → 32 984 B gzip** (o passe remove mais do que
  adiciona).
- O overflow horizontal pré-existente da navbar em ~821–1099 px
  (`spec-reverify-2026-09.md` risco 4) **diminuiu** — de ~171 px para ~85 px em
  900 px, zerando por volta de 1000 px — porque `.nav-link` ficou mais estreito.
  Ainda não é zero nessa faixa; o fix completo (subir o breakpoint) segue sendo
  um follow-up próprio.

Identidade preservada: `CHn`, o ponto de sinal, dark-first, a onda `trace-scroll`,
a legenda categórica de domínio.
