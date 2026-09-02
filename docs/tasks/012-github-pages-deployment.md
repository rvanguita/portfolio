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

* [ ] Workflow executa automaticamente.
* [ ] Build é reproduzível.
* [ ] Pipeline falha quando validações obrigatórias falham.
* [ ] Site é publicado no GitHub Pages.
* [ ] Assets carregam corretamente em produção.
* [ ] Rotas e links funcionam em produção.
