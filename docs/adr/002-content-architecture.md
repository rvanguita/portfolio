# ADR-002 — Arquitetura de Conteúdo

## Status

Accepted

## Context

O site possui informações profissionais, projetos, competências, experiência e formação.

Esse conteúdo não deve ficar acoplado diretamente aos componentes visuais, pois isso dificulta manutenção e evolução do site.

## Decision

O conteúdo será separado da camada de apresentação.

Componentes devem receber dados estruturados em vez de conter textos profissionais diretamente em seu código.

Exemplo conceitual:

```text
content/
├── profile
├── projects
├── experience
└── education
```

Projetos devem possuir uma estrutura consistente contendo, quando disponível:

* Nome.
* Descrição.
* Problema.
* Solução.
* Tecnologias.
* Resultados.
* Links.

## Consequences

Alterações de conteúdo não deverão exigir alterações nos componentes visuais.

A estrutura também facilitará futuras migrações para CMS, Markdown ou outro sistema de gerenciamento de conteúdo.
