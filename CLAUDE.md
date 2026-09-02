# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio of Rene Verinaud Anguita Junior, built as a **Next.js 15 App Router** app and
**statically exported** (`output: 'export'`) to **GitHub Pages** at `https://rvanguita.github.io/portfolio`
(base path `/portfolio`). No server runtime — the deploy is a folder of static HTML/JS/CSS. Content is
Portuguese. Migrated from a Jekyll site (the `_layouts/`, `_data/`, `Gemfile`, `scripts/test_site.py` etc.
are gone; content now lives in `app/`, `components/`, `lib/data/`).

## Commands

Node ≥ 20.9. `.tool-versions` pins `node 25.2.1` for local `mise`; CI uses Node 20.

```bash
npm install
npm run dev          # dev server — http://localhost:3000/portfolio  (basePath is enforced in dev)
npm run lint         # next lint (ESLint) — react/jsx-no-target-blank is an error here
npm run typecheck    # tsc --noEmit
npm test             # Vitest run-once
npm run test:watch   # Vitest watch
npm run build        # next build → static export in ./out
```

Run a single test file / test:

```bash
npx vitest run tests/hero.test.tsx
npx vitest run -t "renderiza o rótulo de canal"
```

`npm run lint && npm run typecheck && npm test && npm run build` is the full gate (what CI runs). The
**pre-commit hook** at `.githooks/pre-commit` runs lint + typecheck + tests — enable once per clone with
`git config core.hooksPath .githooks`.

Preview the actual deployed artifact (dev server ≠ export output):

```bash
npm run build && mkdir -p .preview/portfolio && cp -r out/. .preview/portfolio/ && npx serve .preview
# http://localhost:3000/portfolio/
```

## Architecture

### Static export + base path (the load-bearing constraint)

`next.config.mjs`: `output: 'export'`, `basePath: '/portfolio'`, `trailingSlash: true`,
`images.unoptimized: true`, `env.NEXT_PUBLIC_BASE_PATH`. Every route emits `<route>/index.html`. **Do not**
add server-only features (Route Handlers, `dynamic`, `next/image` optimization, middleware) — they don't
survive export.

`next/link` and file-based metadata prepend `basePath` automatically; **`next/image` does not** for a
`/public` src under `output:'export' + unoptimized`. Use `asset(path)` from `lib/base-path.ts` (prepends
`BASE_PATH` + `encodeURI`) for every `/public` reference — the hero avatar, certificate PDFs, OG image.
`public/.nojekyll` stops Pages from Jekyll-processing `_next/`.

### Content lives in `lib/data/`

`skills.ts`, `projects.ts`, `timeline.ts` (`experience` + `education`), `certificates.ts`, typed by
`lib/types.ts`; `lib/site-stats.ts` holds the hero/About readout-tile data. Section components map over
these. Rich strings in the data (`<strong>`, `<code>`) are rendered through `components/ui/Rich.tsx` — the
**only** sanctioned `dangerouslySetInnerHTML` for content (repo-authored, not user input). `Icon.tsx` also
uses it, for its static `Record<IconName, string>` of Heroicons-v2-solid `<path>` markup.

### Server vs Client

Sections are Server Components **except** `Projects` and `Certificates` (`"use client"` for the category
filter). `Navbar`, `ThemeToggle`, `ErrorBoundary`, `HeroSignature`, and every `hooks/*` are client. Keep
client boundaries small; pass data down from Server Components.

### Theme (no-FOUC, dark-first)

Inline `<script>` in `app/layout.tsx` sets `data-theme` on `<html>` before paint from
`localStorage.portfolio_theme` (try/catch) → `prefers-color-scheme`. `context/ThemeContext.tsx`
(**Context + `useReducer`**) seeds its state from that attribute, then owns the attribute + persistence.
`<html>` has `suppressHydrationWarning`. `globals.css` is **dark-first**: bare `:root` = dark palette,
`:root[data-theme="light"]` + a guarded `prefers-color-scheme: light` block = light palette.

### Design system — "Telemetria"

`app/globals.css` is a single sheet ordered by `@layer reset, tokens, base, layout, components, utilities`
(the layer order, not selector specificity, resolves conflicts — keep all outer spacing in the `layout`
layer, never on components). Visual language = a multi-channel instrument readout:

- **Named tokens** (`tokens` layer): `--panel` / `--panel-raised` / `--readout` / `--label` / `--rule` /
  `--trace-1` (cyan accent — links, active, focus ring) / `--trace-2` (magenta) / `--alert` (amber). Plus
  `--fs-*` type scale, `--sp-*` spacing, `--r-sm/--r-md`.
- **Fonts** via `next/font` in `layout.tsx`: **Archivo** (`--font-archivo`, display + body) and
  **JetBrains Mono** (`--font-mono-face`) — every number, label, tech tag, channel label, and `code` is
  mono. No Inter.
- **Channel-label convention**: `CHn · TÍTULO`. `CH0` = hero/logo, `CH1…CH6` = the six nav sections (the
  number comes from `NAV_ITEMS` order in `Navbar.tsx` and the `channel` prop of `SectionHeader`). Rendered
  by `.section-tag` / `.channel-label` / `components/ui/ChannelLabel.tsx`, each with a leading signal dot.
- **Signature element**: `components/HeroSignature.tsx` — an ambient SVG waveform strip under the navbar,
  animated with a CSS `@keyframes` (frozen under `prefers-reduced-motion`).
- Class names are reused from the pre-redesign markup so section/card/case-study components barely change
  when restyling — `globals.css` carries the look. Category badges (`.cat-de/.cat-ml/.cat-opt/.cat-analytics`)
  all resolve to one cyan chip in this direction.

### Category filtering

`hooks/useCategoryFilter(items, getCategory)` holds the active category and returns a memoized filtered
list (re-render, not inline show/hide). Under `prefers-reduced-motion` the grid renders a plain map;
otherwise Framer Motion `AnimatePresence` animates enter/exit. Every filter button's `data-category` /
`data-cert-category` must match a category present in `lib/data/*` — `tests/filters.test.tsx` enforces it.

### Motion

Gate every programmatic scroll and animation on `usePrefersReducedMotion()` (`hooks/useMediaQuery.ts`) —
a JS `behavior: 'smooth'` overrides the CSS `@media (prefers-reduced-motion)` rule, so the check must be in
JS. Nav/logo scroll goes through `lib/scroll.ts`. Scroll-spy is `hooks/useScrollSpy.ts`
(`IntersectionObserver`, `rootMargin: '-45% 0px -50% 0px'`).

## Tests

Vitest + React Testing Library (jsdom); `tests/*.test.tsx` are ports of the old Jekyll `test_site.py`
structural checks — section landmarks, `NAV_ITEMS` ids resolve, filter categories match data, unique ids,
`rel="noopener"` on every `target="_blank"`, every referenced `Icon` name resolves (no fallback), hero
renders. They assert **structure/data invariants**, not visuals — a restyle should not touch them.

## Adding content

- **Project:** add a `Project` to `lib/data/projects.ts` (`category` ∈ `ProjectCategory` union **and** has
  a `FILTERS` entry in `components/sections/Projects.tsx`). Case study: `app/projects/<slug>/page.tsx`
  (copy `wind-farm/page.tsx` — its own `metadata`, `ArchitectureStep[]`, `<pre>` diagram, stack table),
  add a `{label:"Estudo de Caso", url:"/projects/<slug>/", primary:true}` action, and a `sitemap.ts` entry.
- **Nav section:** new `<section id="…">` component, register in `lib/nav.ts` `NAV_ITEMS` (icon must exist
  in `Icon.tsx`), pass `channel={n}` to its `SectionHeader`. `tests/nav.test.tsx` checks the id resolves.
- **Icon:** add a `name: '<path .../>'` entry to `Icon.tsx` (`viewBox="0 0 24 24"`, Heroicons v2 solid).

## Workflow

Conventional Commit subjects (`feat:`/`fix:`/`style:`/`refactor:`/`test:`/`chore:`, `feat(design):`).
Everything lands via a PR to `main`; CI (`.github/workflows/ci.yml`) must be green; `deploy.yml` builds +
publishes to Pages on push to `main` (its `deploy` job `needs: build`). `main` should be protected
(PR-only, `CI` check required) — the CI job in `ci.yml` is named `CI` for exactly that.

Note: a user-global Claude Code `Stop` hook (`~/.claude/hooks/auto-pr.sh`) auto-branches, commits stray
changes, pushes, and opens a draft PR at the end of each turn when the tree has un-pushed work — so work
on a feature branch, keep commits clean, and expect the branch pushed for you. `CLAUDE_AUTO_PR=0` disables
it for a session.

`.claude/` is git-ignored (untracked skills of unknown provenance were dropped there). `README.md`
documents the external *FastF1 Data Platform* project the portfolio showcases — it is **not** repo
documentation; this file is.
