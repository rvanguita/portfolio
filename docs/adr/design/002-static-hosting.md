# ADR-002 — Manutenção de Arquitetura Estática

## Status

Accepted

## Context

O portfólio será hospedado através do GitHub Pages sem infraestrutura paga.

## Decision

Manter a aplicação como uma aplicação estática.

O funcionamento essencial não poderá depender de backend.

## Consequences

### Positive

* custo de hospedagem zero;
* deploy simplificado;
* menor superfície de ataque;
* alta disponibilidade;
* baixa complexidade operacional.

### Negative

* funcionalidades dinâmicas precisam utilizar soluções client-side;
* não existe processamento server-side;
* funcionalidades futuras que exigirem backend deverão ser arquitetadas separadamente.
