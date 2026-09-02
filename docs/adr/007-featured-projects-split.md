# ADR-007 — Divisão "Projetos em Destaque" / "Outros Projetos"

## Status

Accepted

## Context

O PRD §12 pede uma hierarquia explícita entre **Featured Projects** (mais
relevantes para posicionamento profissional) e **Other Projects** (amplitude
técnica), e limita a quantidade exibida inicialmente para não deixar a página
longa demais.

Até aqui a seção `#projetos` renderizava os seis projetos numa única grade plana
— o título "Projetos em Destaque" não correspondia a nenhuma marcação de destaque
real.

Restrições: export estático (sem runtime), minimizar JavaScript (PRD §19), o
filtro por categoria existente (`useCategoryFilter`) precisa continuar
funcionando, e `tests/filters.test.tsx` assume que todos os cards de projeto
estão no DOM antes de qualquer clique.

## Decision

* Novo campo opcional `featured?: boolean` em `Project` (`lib/types.ts`).
* `featured: true` nos dois projetos com estudo de caso escrito
  (`fastf1`, `wind-farm`). Nada além do booleano é adicionado — sem métricas ou
  textos inventados.
* Em `components/sections/Projects.tsx`, com o filtro em "Todos":
  * grade **"Em destaque"** sempre visível, com marcação visual (borda
    esquerda em `--trace-1`);
  * os demais projetos dentro de um `<details>` nativo
    ("Ver todos os projetos (N)") — disclosure sem JavaScript, sobrevive ao
    export estático, e mantém todos os cards no DOM.
* Ao escolher uma categoria, a divisão some e a seção volta a ser uma única
  grade filtrada (nenhum card renderizado duas vezes).

## Alternatives Considered

* **Rota separada `/projects` com todos os projetos** — mais navegação e um
  arquivo HTML a mais para manter, sem ganho claro para seis projetos.
* **Botão "ver mais" controlado por JavaScript** — adiciona estado de cliente
  para algo que `<details>` resolve nativamente.
* **Sempre mostrar tudo, só reordenando os destacados** — não reduz o tamanho da
  primeira visualização (PRD §12).

## Consequences

* Primeira visualização mais curta; os destaques ganham peso visual.
* Nenhuma dependência nem JavaScript novo.
* O estado aberto/fechado do `<details>` não é persistido entre navegações
  (aceitável).
* `tests/filters.test.tsx` continua válido sem alteração (todos os cards no DOM);
  `tests/projects-featured.test.tsx` cobre o novo comportamento.
