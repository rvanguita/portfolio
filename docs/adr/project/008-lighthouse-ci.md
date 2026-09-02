# ADR-008 — Orçamento de Performance / Lighthouse no CI

## Status

Accepted

## Context

O PRD §19/§27 e o SDD §15/§23 definem metas objetivas de qualidade de página:

```text
Performance    >= 90
Accessibility  >= 90
Best Practices >= 90
SEO            >= 90
```

A **Task 010** deixou esse critério (`Lighthouse apresenta resultados
adequados`) em aberto — nunca foi medido nesta base e não havia ferramenta
instalada. Sem uma verificação automatizada, uma regressão de performance,
acessibilidade ou SEO passa despercebida (os testes Vitest rodam com
`css: false` e em jsdom — nenhum deles enxerga LCP, contraste real, ou o
`<script>` inline renderizado).

Restrições: export estático (sem servidor), minimizar dependências (SDD §25),
o CI já roda em `ubuntu-latest` com Chrome pré-instalado.

## Decision

* `lighthouse` entra como **devDependency** (única dependência nova; traz
  `chrome-launcher` de forma transitiva).
* `scripts/lighthouse.mjs` (Node puro, sem outras dependências):
  * sobe um servidor estático mínimo servindo `out/` sob o base path
    `/portfolio`, **com `Content-Encoding: gzip`** nos assets de texto — o
    GitHub Pages comprime, então o transfer size que o Lighthouse simula
    precisa refletir isso;
  * roda Lighthouse na home e nos dois estudos de caso, nos form factors
    **mobile** e **desktop**;
  * **mediana de 3 execuções** por alvo (como o Lighthouse CI — o score móvel
    oscila com o throttling simulado). `LH_RUNS=1` para uma passada rápida
    local;
  * grava HTML + JSON em `lighthouse-report/` (git-ignored);
  * sai com código ≠ 0 se qualquer categoria de qualquer alvo ficar < 90.
* `npm run lighthouse` = `next build && node scripts/lighthouse.mjs`.
* No `ci.yml`, após o build: passo que roda `node scripts/lighthouse.mjs`
  (`CHROME_PATH=/usr/bin/google-chrome`, `LH_RUNS=3`) e publica
  `lighthouse-report/` como artefato. O passo é **obrigatório** — falha o job.
* `next.config.mjs` ganha `experimental.inlineCss: true`: inlina o CSS no
  `<head>` de cada página exportada, removendo a requisição render-blocking da
  folha de estilos do caminho crítico (necessário para a home móvel cruzar 90).

## Alternatives Considered

* **Rodada manual `npx lighthouse` quando lembrar** — não reproduzível; a
  regressão volta em silêncio. Rejeitada.
* **PageSpeed Insights API** — depende de rede externa e chave; não roda contra
  um build local de PR. Rejeitada.
* **`@lhci/cli` (Lighthouse CI server + assertions)** — mais peso e configuração
  do que o necessário para 3 rotas e um limite único. O script próprio cobre o
  caso com zero dependência extra.
* **Não inlinar o CSS e aceitar a home móvel < 90** — contraria a meta do
  SDD §15. Rejeitada.

## Consequences

* O CI fica ~2 min mais lento (18 execuções do Lighthouse) e passa a depender do
  Chrome do runner.
* Toda categoria abaixo de 90 quebra o PR — o orçamento tem de ser mantido
  honesto. Se uma execução real vier < 90, a saída: **corrigir**, ou registrar
  uma exceção documentada neste ADR / na auditoria — nunca baixar o limite no
  script.
* `experimental.inlineCss` é uma flag experimental do Next; cada HTML exportado
  cresce ~5 kB (gzip) em troca de um round trip a menos.
* Medição de referência (mediana de 3, 2026-09): home mobile **95** / desktop
  **100**; estudos de caso mobile **96** / desktop **100**; Accessibility, Best
  Practices e SEO **100** em todas as rotas. Ver
  `docs/audit/spec-completion-2026-09.md`.
