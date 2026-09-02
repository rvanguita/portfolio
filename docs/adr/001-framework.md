# ADR-001 — Escolha da Stack do Site

## Status

Proposed

## Context

O site será hospedado gratuitamente no GitHub Pages e deverá funcionar como um portfólio técnico profissional.

A aplicação não necessita de backend, banco de dados ou processamento dinâmico em runtime.

Os principais requisitos técnicos são:

* Geração de conteúdo estático.
* Compatibilidade com GitHub Pages.
* Excelente performance.
* SEO adequado.
* Boa experiência de desenvolvimento.
* Manutenção simples.
* Baixa quantidade de dependências.
* Suporte a TypeScript quando houver JavaScript.
* Facilidade de implementação e manutenção por agentes de IA.

O projeto existente deve ser auditado antes da decisão final da stack.

## Decision

A stack definitiva será escolhida após a auditoria do projeto atual.

A escolha deve priorizar uma solução de geração estática, evitando infraestrutura de backend.

As alternativas devem ser avaliadas considerando:

| Critério     |        Peso |
| ------------ | ----------: |
| GitHub Pages | Obrigatório |
| Performance  |        Alto |
| SEO          |        Alto |
| Manutenção   |        Alto |
| Complexidade |        Alto |
| DX           |       Médio |
| Ecossistema  |       Médio |

A decisão final deve ser registrada neste ADR antes da implementação estrutural.

## Alternatives Considered

### Astro

Possui forte orientação para sites estáticos, baixo JavaScript enviado ao cliente e boa integração com conteúdo.

### Eleventy

Solução simples e orientada a geração estática, com baixa complexidade.

### Hugo

Excelente performance de build e arquitetura adequada para sites estáticos.

### Next.js

Pode ser utilizado com exportação estática, porém adiciona complexidade que pode não ser necessária para este projeto.

### Implementação sem framework

HTML, CSS e JavaScript podem ser suficientes caso os requisitos permaneçam simples.

## Consequences

A decisão deve minimizar complexidade operacional e manter o site compatível com GitHub Pages.

A stack escolhida não deve introduzir funcionalidades de servidor que não sejam utilizadas.
