# ADR-003 — Minimização de Dependências

## Status

Accepted

## Context

O redesign pode ser implementado com bibliotecas adicionais de UI, animação, ícones ou componentes.

Entretanto, dependências adicionais aumentam:

* tamanho do bundle;
* complexidade;
* superfície de manutenção;
* risco de incompatibilidade;
* dependência de terceiros.

## Decision

Não adicionar dependências sem justificativa técnica.

Priorizar:

* HTML semântico;
* CSS;
* JavaScript nativo;
* recursos já existentes no projeto.

Uma nova dependência deve demonstrar benefício concreto que não seja obtido de maneira razoável com as tecnologias existentes.

## Consequences

### Positive

* menor bundle;
* melhor performance;
* menor complexidade;
* maior controle sobre o design;
* menor risco de dependências abandonadas.

### Negative

Alguns componentes poderão exigir implementação própria.
