# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio of Rene Verinaud Anguita Junior, built as a **Next.js 15 App Router** app and
**statically exported** (`output: 'export'`) to **GitHub Pages** at `https://rvanguita.github.io/portfolio`
(base path `/portfolio`). No server runtime — the deploy is a folder of static HTML/JS/CSS.

> Migrated from a Jekyll site. The old `_layouts/`, `_includes/`, `_data/`, `_config.yml`, `index.html`,
> `projects/*.html`, `Gemfile`, and `scripts/test_site.py` are gone; their content lives in `app/`,
> `components/`, and `lib/data/`.

## Project structure

- `app/` — App Router.
  - `layout.tsx` — root layout: `<html lang="pt-BR">`, the anti-FOUC theme `<script>` (runs before paint),
    `next/font` Inter, then `ThemeProvider` → `ErrorBoundary` → `Navbar` → `<main id="main-content">` →
    `Footer`. Exports `metadata` from `lib/metadata.ts`.
  - `page.tsx` — home; composes the seven section components (all Server Components except `Projects` and
    `Certificates`).
  - `projects/lake-fastf1/page.tsx` — the one case-study page (its own `metadata`).
  - `globals.css` — the entire stylesheet (moved verbatim from the old `assets/css/custom.css`); still a
    single sheet of CSS custom properties with a light `:root` palette and `[data-theme="dark"]` overrides.
  - `sitemap.ts`, `robots.ts`, `icon.png` — file-based metadata (Next handles the base path).
- `components/`
  - `ui/` — primitives: `Icon` (typed name→SVG-path map, ported from the old `icon.html` sprite),
    `Card` (compound: `Card` / `Card.Header` / `Card.Body`), `Tag`, `Rich` (renders trusted inline HTML
    from the data modules), `SectionHeader`.
  - `sections/` — `Hero`, `About`, `Skills`, `Projects`, `Experience`, `Education`, `Certificates`.
  - `cards/` — `SkillCard`, `ProjectCard` (memoized, `forwardRef` so `motion.create` can animate it),
    `ProjectActionLink`, `EduCard`, `CertBadge`.
  - `Navbar.tsx` (client), `ThemeToggle.tsx` (client), `Footer.tsx`, `ErrorBoundary.tsx` (class component).
- `context/ThemeContext.tsx` — `ThemeProvider` using **Context + `useReducer`**; hydrates from the
  `data-theme` attribute the inline script set, then persists changes to `localStorage.portfolio_theme`
  (all `localStorage` access wrapped in try/catch).
- `hooks/` — `useTheme`, `useToggle`, `useMediaQuery` / `usePrefersReducedMotion`, `useScrollSpy`
  (`IntersectionObserver`, `rootMargin: '-45% 0px -50% 0px'`), `useCategoryFilter` (`useMemo`ed filtered list).
- `lib/`
  - `data/` — `skills.ts`, `projects.ts`, `timeline.ts` (`experience` + `education`), `certificates.ts`.
    **This is where site content lives now.** Typed by `lib/types.ts`.
  - `base-path.ts` — `BASE_PATH`, `SITE_URL`, and `asset(path)` (prepends base path + `encodeURI`) for
    `/public` files that `next/link`/`next/image` don't rewrite (certificate PDFs, OG image).
  - `nav.ts` — `NAV_ITEMS` (id/label/icon); every `id` must be a real `<section id>` on the home page.
  - `metadata.ts` — base `Metadata` (title template, description, canonical, OG/Twitter `summary_large_image`).
  - `scroll.ts`, `cx.ts`.
- `public/` — `assets/img/*`, `certificates/**` (PDFs, names keep spaces — referenced via `asset()`),
  `.nojekyll` (stops Pages from Jekyll-processing `_next/`).
- `tests/` — Vitest + React Testing Library (jsdom). Ports of the old `test_site.py` checks.
- `.github/workflows/ci.yml` — PRs to `main`: `npm ci` → lint → typecheck → `npm test` → `next build`.
- `.github/workflows/deploy.yml` — push to `main`: same checks, then `next build` → `upload-pages-artifact`
  (`./out`) → `deploy-pages`. The `deploy` job `needs: build`, so a failing check blocks the release.

## Build, test, and development commands

Requires Node ≥ 20.9 (`.tool-versions` pins `node 25.2.1` for local `mise`; CI uses Node 20).

```bash
npm install          # first time
npm run dev          # dev server — http://localhost:3000/portfolio
npm run lint         # next lint (ESLint) — includes react/jsx-no-target-blank
npm run typecheck    # tsc --noEmit
npm test             # Vitest (run once);  npm run test:watch to watch
npm run build        # next build → static export in ./out
```

Run `npm run lint && npm run typecheck && npm test && npm run build` before every commit — it is the full
correctness gate (also what CI runs). A **pre-commit hook** at `.githooks/pre-commit` runs lint + typecheck
+ tests; enable it once per clone with `git config core.hooksPath .githooks`.

Preview the exact deployed artifact:

```bash
npm run build && mkdir -p .preview/portfolio && cp -r out/. .preview/portfolio/ && npx serve .preview
# then open http://localhost:3000/portfolio/
```

## Architecture notes

- **Static export + base path.** `next.config.mjs` sets `output: 'export'`, `basePath: '/portfolio'`,
  `trailingSlash: true`, `images.unoptimized: true`, and exposes `NEXT_PUBLIC_BASE_PATH`. Every route
  becomes `<route>/index.html`. Do not add server-only features (Route Handlers, `dynamic = 'force-dynamic'`,
  `next/image` optimization, middleware) — they don't survive export.
- **Server vs Client.** Sections are Server Components except `Projects` and `Certificates`, which are
  `"use client"` for the category filter. `Navbar`, `ThemeToggle`, `ErrorBoundary`, and every hook are
  client. Keep client boundaries small; pass data down from Server Components.
- **Theme (no FOUC).** The inline `<script>` in `app/layout.tsx` sets `data-theme` on `<html>` from
  `localStorage` (try/catch) → `prefers-color-scheme` before first paint. `ThemeProvider` reads that
  attribute for its initial `useReducer` state and thereafter owns the attribute + persistence.
  `<html>` has `suppressHydrationWarning` because the script mutates it pre-hydration.
- **Category filtering.** `useCategoryFilter(items, getCategory)` holds the active category and returns a
  memoized filtered list; cards are re-rendered, not shown/hidden with inline styles. When
  `prefers-reduced-motion` is set, the grid renders a plain map; otherwise Framer Motion `AnimatePresence`
  animates enter/exit. Every filter button's `data-category` / `data-cert-category` must correspond to a
  category present in `lib/data/*` (enforced by `tests/filters.test.tsx`).
- **Programmatic scroll** (nav links, logo) goes through `lib/scroll.ts` and is gated by
  `usePrefersReducedMotion` — a JS `behavior: 'smooth'` overrides the CSS `@media (prefers-reduced-motion)`
  rule, so the check must be in JS.
- **Icons.** `components/ui/Icon.tsx` is a `Record<IconName, string>` of raw `<path>` markup injected with
  `dangerouslySetInnerHTML` on a static `<svg>`. To add an icon, add a `name: '<path .../>'` entry (Heroicons
  v2 solid, `viewBox="0 0 24 24"`). `tests/icon.test.tsx` fails if any referenced name falls through to the
  fallback path.
- **`Rich`** is the only sanctioned use of `dangerouslySetInnerHTML` for content — and only for the small
  inline HTML (`<strong>`, `<code>`) already present in `lib/data/*`, which is repo-authored, not user input.

## Adding content

- **New project:** add a `Project` object to `lib/data/projects.ts` (`category` must be one of the
  `ProjectCategory` union and have a matching entry in `FILTERS` in `components/sections/Projects.tsx`).
  Optionally add a case study at `app/projects/<slug>/page.tsx` (copy `lake-fastf1/page.tsx`; give it its
  own `metadata`) and add the route to `app/sitemap.ts`.
- **New skill / timeline entry / certificate:** append to the relevant `lib/data/*.ts` file.
- **New nav section:** add a `<section id="…">` component, register it in `lib/nav.ts` (`NAV_ITEMS`), and
  add its icon to `Icon.tsx` if new. `tests/nav.test.tsx` checks every `NAV_ITEMS.id` resolves.

## Coding style

Two-space indent. TypeScript strict. Prefer Server Components; add `"use client"` only for interactivity.
Reuse the `ui/` primitives and the existing hooks. Keep the CSS custom-property / light-dark pattern in
`globals.css`; keep existing class names when porting markup so the stylesheet keeps applying. Path alias
`@/*` maps to the repo root.

## Commit & PR guidelines

Conventional Commit subjects (`feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `test:`, `chore:`). PRs
should describe the visible/structural change, state that `npm run lint && npm run typecheck && npm test &&
npm run build` passed, and include screenshots for visual changes. CI must be green; deploys run only from
`main`.

## Security & configuration

Do not commit secrets. External links must use `target="_blank" rel="noopener noreferrer"` (lint enforces
`noopener`; `tests/external-links.test.tsx` re-checks). Review renamed/added certificate paths in
`public/certificates/**` and their `lib/data/certificates.ts` entries for broken links or accidental
exposure. `README.md` still documents the external *FastF1 Data Platform* project the portfolio showcases —
it is not repo documentation; this file is.
