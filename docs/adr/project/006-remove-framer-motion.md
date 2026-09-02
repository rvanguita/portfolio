# ADR-006 — Remoção do framer-motion

## Status

Accepted

## Context

O único uso de `framer-motion` no projeto era a animação de entrada/saída
(`AnimatePresence` + `motion.create`) dos cards ao trocar o filtro de categoria
em duas seções client-side: `components/sections/Projects.tsx` e
`components/sections/Certificates.tsx`.

Ambas as seções já ramificavam em `usePrefersReducedMotion()` e renderizavam um
fallback estático equivalente — ou seja, a animação nunca foi essencial ao
conteúdo.

`framer-motion` é a maior dependência de runtime do projeto (~3,9 MB instalados)
e entra nos bundles das rotas `projetos` e `certificados`. Isso conflita com:

* PRD §19 (minimizar JavaScript, evitar bibliotecas pesadas sem justificativa).
* PRD §25 (animações apenas quando agregam valor).
* SDD §25 (toda dependência precisa de justificativa; se HTML/CSS resolve, não adicionar).
* Task 010 — "dependências desnecessárias removidas".

## Decision

Remover `framer-motion`. A troca de filtro passa a ser uma re-renderização
simples da lista filtrada (`useCategoryFilter`), com um fade de entrada leve em
CSS:

```css
@media (prefers-reduced-motion: no-preference) {
  .projects-grid > .project-card-item,
  .cert-categories-container > .cert-category-group {
    animation: card-fade-in var(--dur) var(--easing) both;
  }
}
@keyframes card-fade-in { from { opacity: 0; transform: translateY(8px); } }
```

O bloco `@media (prefers-reduced-motion: reduce)` já existente em `globals.css`
zera essa animação automaticamente.

`components/cards/ProjectCard.tsx` perde o `forwardRef` (que só existia para
alimentar `motion.create`) e mantém o `memo`.

## Alternatives Considered

* **Manter `framer-motion`** — custo de bundle desproporcional para um único fade.
* **Pacote `motion` (mini) / `motion/react`** — ainda uma dependência para algo
  que o CSS resolve.
* **Web Animations API em JS** — mais código do que o `@keyframes`, sem ganho.

## Consequences

* Uma dependência de runtime a menos; bundles de `projetos`/`certificados` menores.
* Perde-se a animação de saída (exit) dos cards — aceitável (PRD §25).
* `prefers-reduced-motion` continua respeitado, agora só via CSS.
