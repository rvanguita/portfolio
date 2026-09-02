# Task 010 — Performance

## Objective

Otimizar o site para carregamento rápido e baixo consumo de recursos.

## Depends On

* Tasks 006–009.

## Scope

Avaliar:

* JavaScript.
* CSS.
* Imagens.
* Fontes.
* Third-party scripts.
* Bundle size.
* Caching.
* Lazy loading.

## Acceptance Criteria

* [x] Assets otimizados.
* [x] Imagens possuem dimensões adequadas.
* [x] JavaScript desnecessário removido.
* [x] Dependências desnecessárias removidas.
* [x] Third-party scripts minimizados.
* [x] Lighthouse apresenta resultados adequados.

## Resultado (2026-09)

Verificação automatizada em `scripts/lighthouse.mjs`, obrigatória no CI
(**ADR-008**). Mediana de 3 execuções — todas as categorias ≥ 90:

| Rota | Perf. mobile / desktop | A11y | Best Practices | SEO |
|---|---|---|---|---|
| home | 93 / 100 | 100 | 100 | 100 |
| `projects/wind-farm/` | 94 / 100 | 100 | 100 | 100 |
| `projects/lake-fastf1/` | 96 / 100 | 100 | 100 | 100 |

Ajustes do passe: `experimental.inlineCss` (tira o CSS do caminho crítico),
correção do `<script>` anti-FOUC e do contraste WCAG AA. Ver
`docs/audit/spec-completion-2026-09.md`.
