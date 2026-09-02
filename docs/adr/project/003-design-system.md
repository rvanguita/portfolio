# ADR-003 — Design System

## Status

Accepted

## Context

O site precisa apresentar consistência visual entre suas diferentes seções e componentes.

Valores visuais arbitrários espalhados pelo código dificultariam manutenção e evolução.

## Decision

Será utilizado um conjunto centralizado de design tokens.

Os tokens deverão contemplar, no mínimo:

* Cores.
* Tipografia.
* Espaçamento.
* Border radius.
* Sombras.
* Breakpoints.
* Transições.

Componentes devem utilizar os tokens existentes sempre que possível.

Novos valores visuais não devem ser introduzidos arbitrariamente.

## Consequences

Alterações globais de identidade visual poderão ser realizadas de maneira centralizada.

A implementação também reduz inconsistências visuais entre componentes.

## Update — passe de conclusão da spec (2026-09)

O redesign "Telemetria" (`app/globals.css`, folha única com
`@layer reset, tokens, base, layout, components, utilities`) já cobria cores,
tipografia, espaçamento, radius e transições como tokens. Este passe fechou as
três categorias que ainda estavam com valores fixos:

* **Sombras** — `--shadow-ring` (`0 0 0 3px var(--trace-1-dim)`) e
  `--shadow-ring-lg` (`0 0 0 4px`). Não existe escala de drop-shadow: a linguagem
  "Telemetria" usa apenas anéis de brilho.
* **z-index** — `--z-navbar` (100) e `--z-skip-link` (200); eram os dois únicos
  contextos de empilhamento.
* **Breakpoints** — como custom properties não valem dentro de `@media`, ficam
  como um **registro em comentário** no bloco `tokens` (sm 640 / md 720 / lg 820
  / xl 860), sem alterar nenhum valor renderizado. Não foi adicionado PostCSS
  `@custom-media` (evita dependência de build — SDD §25).

As substituições mantêm os valores byte a byte; nenhuma mudança visual.

## Update — contraste WCAG AA (2026-09, passe do Lighthouse)

A auditoria Lighthouse (ADR-008) reprovou `color-contrast` (WCAG 2.2 AA — SDD §13,
PRD §17): o acento ciano e o âmbar do **tema claro** ficavam abaixo de 4,5:1 em
texto pequeno, e `.nav-link-ch` usava `--rule-strong` como cor de texto
(1,76:1 no tema escuro). Ajustes, só em `app/globals.css`:

* tema claro — `--trace-1` `#0e8fa0` → `#086b78`, `--alert` `#b9740c` → `#946000`
  (≥ 4,5:1 sobre `--panel` / `--panel-raised` / `--panel-sunken`, nos dois
  sentidos: acento como texto e texto claro sobre o acento);
* `.nav-link-ch` passa de `--rule-strong` para `--label` (token de texto
  secundário, legível nos dois temas).

Tokens do **tema escuro** e a identidade "Telemetria" ficam inalterados.
Resultado: Accessibility 100 em todas as rotas.

## Update — higiene de `@layer` nos `@media` (2026-09)

Os dois blocos `@media` no fim de `app/globals.css` (menu mobile ≤ 820px e
`prefers-reduced-motion`) estavam **fora de qualquer `@layer`**. Estilos
não-camadados vencem qualquer estilo camadado, então o bloco mobile sobrepunha
a camada `components` por *não* estar em camada — não pela ordem de camadas
(que o `CLAUDE.md` diz ser o mecanismo de resolução). Frágil: qualquer regra
não-camadada nova passaria por cima de todo o sistema em silêncio.

Regra: **todo bloco `@media` em `globals.css` mora dentro de uma camada
nomeada.** O bloco `@media (max-width: 820px)` passou para `@layer components`
(mesma camada dos componentes que ele sobrepõe — `.navbar`, `.nav-menu`,
`.hero-meta`; como vem depois na ordem de fonte da camada, continua vencendo).
Mesmos seletores e declarações; nenhuma mudança visual (verificado por build +
matriz headless 320–1680px × 2 temas + Lighthouse).

**Exceção:** o bloco `@media (prefers-reduced-motion: reduce)` fica
**deliberadamente fora de camada** — um interruptor de "reduzir movimento" deve
vencer todas as camadas, sempre. O SDD §13 usa exatamente esse bloco
não-camadado como exemplo. Comentado no arquivo para não parecer esquecimento.


## Update — legenda categórica de domínio (2026-09)

A paleta ganha a família `--cat-*` (`--cat-de` / `--cat-ml` / `--cat-opt` /
`--cat-analytics`): uma leitura de sinal por área de atuação, para que projetos e
skills sejam lidos como uma legenda de gráfico. Três reaproveitam sinais
existentes (`--trace-1`, `--alert`, `--ok`); só `--cat-ml` (violeta `#9d8df1`
escuro / `#5b4bc4` claro) é hue nova. São **tokens documentados**, não valores
soltos — "novos valores visuais não devem ser introduzidos arbitrariamente"
continua valendo.

`--ok` (verde) estava definido sem uso; ao entrar em uso, seu valor no tema
claro passou de `#2f8f3f` (≈ 4:1 sobre branco) para `#1a7a34` (≥ 4,5:1) —
estendendo a mesma sintonia WCAG AA já aplicada a `--trace-1` / `--alert`.

`--fs-2xl` (0 usos) e o seletor `.panel-card` (0 renders) foram removidos.
Detalhe visual e verificação em `docs/adr/design/004-telemetria-system.md`
(emenda) e `docs/audit/restyle-2026-09.md`.
