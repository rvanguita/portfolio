# ADR-004 — Hospedagem Estática

## Status

Accepted

## Context

O site será disponibilizado gratuitamente utilizando GitHub Pages.

GitHub Pages fornece hospedagem adequada para arquivos estáticos, mas não deve ser tratado como ambiente de execução de backend.

## Decision

A aplicação será construída como um site estático.

Não será utilizado:

* Backend próprio.
* Banco de dados.
* API própria.
* Server-side rendering dependente de runtime.
* Sessões de servidor.

Todo conteúdo necessário para renderização deverá estar disponível durante o build ou no cliente.

## Consequences

A arquitetura será simples, barata e adequada ao GitHub Pages.

Funcionalidades que futuramente exigirem backend deverão ser tratadas como uma nova decisão arquitetural.
