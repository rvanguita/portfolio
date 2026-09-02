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
