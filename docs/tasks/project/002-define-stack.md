# Task 002 — Definir Stack

## Objective

Definir a stack definitiva do projeto com base na auditoria.

## Depends On

* Task 001.

## Scope

Definir:

* Framework.
* Linguagem.
* Sistema de estilos.
* Ferramentas de build.
* Test framework.
* Lint.
* Formatter.
* Package manager.

## Constraints

A solução deve:

* Funcionar no GitHub Pages.
* Gerar conteúdo estático.
* Evitar dependências desnecessárias.
* Priorizar performance e SEO.

## Acceptance Criteria

* [x] Stack definida.
* [x] Decisão registrada na ADR-001.
* [x] Dependências principais justificadas.
* [x] Estratégia de build definida.
* [x] Estratégia de deploy definida.

## Decisão (resolvida)

Ver **ADR-001** (status `Accepted`): Next.js 15 App Router com `output: 'export'`,
TypeScript `strict`, CSS único em `@layer`, Vitest + RTL, ESLint, npm, GitHub
Actions → GitHub Pages.
