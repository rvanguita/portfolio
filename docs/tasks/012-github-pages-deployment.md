# Task 012 — Deploy no GitHub Pages

## Objective

Configurar publicação automatizada do site.

## Depends On

* Task 011.

## Scope

Implementar GitHub Actions para:

```text
Checkout
↓
Setup runtime
↓
Install
↓
Lint
↓
Typecheck
↓
Test
↓
Build
↓
Deploy
```

## Acceptance Criteria

* [x] Workflow executa automaticamente.
* [x] Build é reproduzível.
* [x] Pipeline falha quando validações obrigatórias falham.
* [x] Site é publicado no GitHub Pages.
* [x] Assets carregam corretamente em produção.
* [x] Rotas e links funcionam em produção.
