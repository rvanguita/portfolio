# ADR-004 — Sistema Visual "Telemetria"

## Status

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
