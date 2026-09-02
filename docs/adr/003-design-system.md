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

