# ADR-005 — Desenvolvimento Assistido por IA

## Status

Accepted

## Context

O projeto será desenvolvido parcialmente ou predominantemente utilizando agentes de IA.

Isso aumenta a necessidade de documentação explícita das decisões arquiteturais e de controle do escopo das alterações.

## Decision

Agentes de IA deverão utilizar como fonte de contexto:

1. `CLAUDE.md` na raiz (o papel historicamente descrito como `AGENTS.md`)
2. O PRD do trilho relevante — `docs/prd/project.md` (construção) ou
   `docs/prd/design.md` (redesign visual)
3. O SDD do trilho relevante — `docs/sdd/project.md` ou `docs/sdd/design.md`
4. ADRs relevantes — `docs/adr/project/*` e `docs/adr/design/*`
5. A task atual — `docs/tasks/project/001–013` ou `docs/tasks/design.md`

> **Nota (2026-09):** a documentação foi reorganizada em dois trilhos
> (`project/` e `design/`). Os caminhos antigos `docs/prd.md` / `docs/sdd.md`
> não existem mais.

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
