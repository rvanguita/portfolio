# ADR-005 — Desenvolvimento Assistido por IA

## Status

Accepted

## Context

O projeto será desenvolvido parcialmente ou predominantemente utilizando agentes de IA.

Isso aumenta a necessidade de documentação explícita das decisões arquiteturais e de controle do escopo das alterações.

## Decision

Agentes de IA deverão utilizar como fonte de contexto:

1. `CLAUDE.md` na raiz (o papel historicamente descrito como `AGENTS.md`)
2. `docs/prd.md`
3. `docs/sdd.md`
4. ADRs relevantes
5. Task atual

As alterações devem ser pequenas, verificáveis e limitadas ao escopo da task.

Agentes não devem:

* Inventar informações profissionais.
* Alterar arquitetura sem justificativa.
* Adicionar dependências desnecessárias.
* Executar refatorações não relacionadas à tarefa.
* Remover testes para contornar falhas.
* Alterar requisitos do produto silenciosamente.

Mudanças arquiteturais devem gerar ou atualizar uma ADR.

## Consequences

O projeto terá maior previsibilidade quando desenvolvido por diferentes agentes ou em diferentes sessões.

O custo é a necessidade de manter documentação e decisões atualizadas.
