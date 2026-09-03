# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio of Rene Verinaud Anguita Junior, built as a **Next.js 15 App Router** app and
**statically exported** (`output: 'export'`) to **GitHub Pages** at `https://rvanguita.github.io/portfolio`
(base path `/portfolio`). No server runtime — the deploy is a folder of static HTML/JS/CSS. Content is
Portuguese. Migrated from a Jekyll site (the `_layouts/`, `_data/`, `Gemfile`, `scripts/test_site.py` etc.
are gone; content now lives in `app/`, `components/`, `lib/data/`).

## Commands

Node ≥ 22.12. `.tool-versions` pins `node 22.12.0` for local `mise`; CI + deploy use Node 22.

```bash
npm install
npm run dev          # dev server — http://localhost:3000/portfolio  (basePath is enforced in dev)
npm run lint         # next lint (ESLint) — react/jsx-no-target-blank is an error here
npm run typecheck    # tsc --noEmit
npm test             # Vitest run-once
npm run test:watch   # Vitest watch
npm run build        # next build → static export in ./out
npm run lighthouse   # next build + scripts/lighthouse.mjs (LH_RUNS=1 for a fast pass)
```

Run a single test file / test:

```bash
npx vitest run tests/hero.test.tsx
npx vitest run -t "renderiza o rótulo de canal"
```

`npm run lint && npm run typecheck && npm test && npm run build` is the full gate (what CI runs). CI then
also runs `node scripts/lighthouse.mjs` — every category ≥ 90 (median of 3), see `docs/adr/project/008`.
The **pre-commit hook** at `.githooks/pre-commit` runs lint + typecheck + tests — enable once per clone
with `git config core.hooksPath .githooks`.

Preview the actual deployed artifact (dev server ≠ export output):

```bash
npm run build && mkdir -p .preview/portfolio && cp -r out/. .preview/portfolio/ && npx serve .preview
# http://localhost:3000/portfolio/
```

## Architecture

### Static export + base path (the load-bearing constraint)

`next.config.mjs`: `output: 'export'`, `basePath: '/portfolio'`, `trailingSlash: true`,
`images.unoptimized: true`, `env.NEXT_PUBLIC_BASE_PATH`, `experimental.inlineCss: true` (stylesheet
inlined into each page's `<head>`, off the critical path — LCP; `docs/adr/project/008`). Every route emits
`<route>/index.html`. **Do not** add server-only features (Route Handlers, `dynamic`, `next/image`
optimization, middleware) — they don't survive export.

`next/link` and file-based metadata prepend `basePath` automatically; **`next/image` does not** for a
`/public` src under `output:'export' + unoptimized`. Use `asset(path)` from `lib/base-path.ts` (prepends
`BASE_PATH` + `encodeURI`) for every `/public` reference — the hero avatar, certificate PDFs, OG image.
`SITE_URL` / `SITE_ORIGIN` also come from there. `public/.nojekyll` stops Pages from Jekyll-processing
`_next/`. The only sanctioned "server" files are the metadata routes `app/robots.ts` + `app/sitemap.ts`,
and they carry `export const dynamic = "force-static"` so they survive the export.

### Content lives in `lib/data/`

`skills.ts`, `projects.ts`, `timeline.ts` (`experience` + `education`), `certificates.ts`, `profile.ts`
(long-form About bio + hero/footer identity + contact links — the sanctioned home for professional prose,
SDD §9), typed by `lib/types.ts`; `lib/site-stats.ts` holds the hero readout-tile data. Section
components map over these. Rich strings in the data (`<strong>`, `<code>`) are rendered through
`components/ui/Rich.tsx` — a sanctioned `dangerouslySetInnerHTML` for repo-authored content (not user
input). `components/seo/JsonLd.tsx` (structured data, built by `lib/seo/schema.ts`) and `Icon.tsx` (static
Heroicons-v2-solid `<path>` markup) use it the same way.

### Server vs Client

Sections are Server Components **except** `Projects` and `Certificates` (`"use client"` for the category
filter). `Navbar`, `ThemeToggle`, `ErrorBoundary`, and every `hooks/*` are client. Keep
client boundaries small; pass data down from Server Components.

### Theme (no-FOUC, light-first)

Inline `<script>` in `app/layout.tsx` sets `data-theme` on `<html>` before paint from
`localStorage.portfolio_theme` (try/catch) → `prefers-color-scheme`. Its source **and** the storage key
live in `lib/theme.ts` (`THEME_INIT_SCRIPT`, `THEME_STORAGE_KEY`) — a module with **no `"use client"`**:
importing them from `context/ThemeContext.tsx` (which is `"use client"`) makes the RSC build stringify a
client-reference stub into the script → `SyntaxError`, no no-FOUC (`tests/theme-init-script.test.ts`
guards this). `context/ThemeContext.tsx` (**Context + `useReducer`**) re-exports both, seeds its state
from the attribute (falling back to `"light"` in the RSC frame), then owns the attribute + persistence.
`<html>` has `suppressHydrationWarning`; `components/ThemeToggle.tsx` gates `aria-pressed` behind a
`mounted` flag (the static frame can't know the client theme). `globals.css` is **light-first**: bare
`:root` = light ("paper") palette, `:root[data-theme="dark"]` + a `@media (prefers-color-scheme: dark)`
block guarded by `:root:not([data-theme="light"])` = dark palette (`--trace-1` lightened for WCAG AA).

### Design system — editorial (ADR-design-005)

`app/globals.css` is a single sheet ordered by `@layer reset, tokens, base, layout, components, utilities`
(the layer order, not selector specificity, resolves conflicts). Page/section outer spacing lives in the
`layout` layer; a component's own responsive spacing (e.g. `.nav-container` in the `@media (max-width:820px)`
block) lives with the component in `components`. **Every `@media` block must sit inside a named layer** —
the one exception is the `prefers-reduced-motion` kill-switch, deliberately unlayered so it beats every
layer (`docs/adr/project/003` amendment). Visual language = editorial / academic (a well-set research
paper): serif display, one accent, hairline rules, generous whitespace, **no instrument metaphor**. This
replaces the earlier "Telemetria" readout (`docs/adr/design/004`, superseded in part by `005`).

- **Named tokens** (`tokens` layer): `--panel` (paper `#f7f6f3`) / `--panel-raised` / `--panel-sunken` /
  `--readout` (ink) / `--label` / `--rule` / `--rule-strong` / `--trace-1` (the **single** accent —
  slate-blue `#2e4b63`, lightened `#7fa9c9` in dark: links, active, focus, `code`, `::selection`,
  featured-card spine) / `--trace-1-dim` (12% mix, `code` bg) / `--ok` (green — **only** the hero
  availability dot). Plus `--fs-*` type scale, `--sp-*` spacing, `--r-sm` (2px) / `--r-md` (4px), `--wrap`
  1140px. **Removed vs Telemetria**: `--trace-2`, `--alert`, `--cat-de/-ml/-opt/-analytics`,
  `--shadow-ring*`, `--mono-settings`; no global `tabular-nums`, no `"zero"` digit feature.
- **Fonts** via `next/font` in `layout.tsx`: **Source Serif 4** (`--font-serif` — `h1–h3`, `.hero-title`,
  `.section-title`, `.edu-degree`, `.nav-logo`, `.metric-number`), **Archivo** (`--font-display` — body,
  nav, buttons, filters, tags, labels, eyebrows), **JetBrains Mono** (`--font-mono` — **only** `code` and
  the `.architecture-card pre` ASCII diagrams). No UPPERCASE outside content.
- **Section eyebrow**: `components/ui/Eyebrow.tsx` (`.eyebrow`) and `SectionHeader`'s `.section-tag` —
  a short sans label with a leading hairline rule (`::before`). **No channel numbering** (`CHn`), no
  signal dot. `SectionHeader` has no `channel` prop; it closes with `<hr class="section-rule">` (plain
  hairline). `Navbar` logo is the name in serif; nav links are plain labels. `tests/nav.test.tsx` +
  `tests/home.test.tsx` still enforce exactly the six nav sections (`lib/nav.ts` `NAV_ITEMS` ids ↔
  `<section id>`) — a 7th means touching both tests, but there is no renumbering to do.
- **Signature element**: the hero is an **author block** — role (eyebrow) · grayscale portrait plate
  (hairline border) · name in Source Serif 4 · synthesis · the three stat tiles as serif *pull-figures*
  under a thin rule. There is **no** `HeroSignature` (the animated waveform was deleted with
  `@keyframes trace-scroll`); the only motion is `card-fade-in` on filter change (reduced-motion-safe).
- Class names are reused from the pre-redesign markup so section/card/case-study components barely change
  when restyling — `globals.css` carries the look. `.project-category-badge` is a plain icon + label in
  one ink colour (the per-domain `--cat-*` hues are gone); `data-category` attrs stay on the card and
  filter button (`tests/filters.test.tsx`). The featured-projects grid keeps a 2px `--trace-1` left spine.

### Category filtering

`hooks/useCategoryFilter(items, getCategory)` holds the active category and returns a memoized filtered
list (re-render, not inline show/hide). Enter transitions are a CSS `@keyframes card-fade-in` (no
Framer Motion — removed, see `docs/adr/project/006`), self-neutralised by the `prefers-reduced-motion` block.
Every filter button's `data-category` / `data-cert-category` must match a category present in `lib/data/*`
— `tests/filters.test.tsx` enforces it.

`Projects` also splits **featured** vs the rest: with the "Todos" filter it shows a `.projects-grid-featured`
grid plus a native `<details>` ("Ver todos os projetos") holding the others — every card stays in the DOM
(so `filters.test.tsx`'s pre-click count holds); picking a category collapses it to one flat filtered grid.
See `docs/adr/project/007`, `tests/projects-featured.test.tsx`.

### Motion

Gate every programmatic scroll and animation on `usePrefersReducedMotion()` (`hooks/useMediaQuery.ts`) —
a JS `behavior: 'smooth'` overrides the CSS `@media (prefers-reduced-motion)` rule, so the check must be in
JS. Nav/logo scroll goes through `lib/scroll.ts`. Scroll-spy is `hooks/useScrollSpy.ts`
(`IntersectionObserver`, `rootMargin: '-45% 0px -50% 0px'`).

## Tests

Vitest + React Testing Library (jsdom); `tests/*.test.tsx` assert **structure/data invariants**, not
visuals — a restyle should not touch them. `vitest.setup.ts` forces `prefers-reduced-motion: true` and
stubs `matchMedia` / `IntersectionObserver` / `localStorage`, so rendered tests always hit the
reduced-motion path. `vitest.config.mts` has `css: false` — **no test catches a CSS regression**.

Ported from the old Jekyll `test_site.py`: `home` / `nav` (section landmarks, `NAV_ITEMS` ids resolve,
unique ids), `filters` (filter categories ↔ `lib/data/*`, both directions), `external-links`
(`rel="noopener"` on every `target="_blank"`), `icon` (every referenced name resolves, no fallback),
`hero`, `theme`. Added in the 2026-09 completion pass: `mobile-nav` (hamburger open/close/Esc/click-out),
`internal-links` (sitemap ↔ routes, project action URLs, certificate PDFs exist), `structured-data`
(JSON-LD shape + no invented fields), `a11y-structure` (section `aria-labelledby`, one `<h1>`, case-study
`<pre role="img">` + `<table><caption>`/`scope`), `projects-featured`, `theme-init-script` (no-FOUC
`<script>` is valid JS from a non-client module). Non-Vitest: `scripts/lighthouse.mjs` (perf/a11y/BP/SEO
budget, CI-gated) and `docs/audit/visual-qa-2026-09.md` (headless 320–1680px × 2 themes).

## Adding content

- **Project:** add a `Project` to `lib/data/projects.ts` (`category` ∈ `ProjectCategory` union **and** has
  a `FILTERS` entry in `components/sections/Projects.tsx`; `featured: true` puts it in the top grid instead
  of the `<details>`). Case study: `app/projects/<slug>/page.tsx` (copy `wind-farm/page.tsx` — bare `title`
  via `caseStudyMetadata()`, `<JsonLd>` with `breadcrumbSchema` + `caseStudySchema("<key>", …)`,
  `ArchitectureStep[]`, `<pre role="img">` diagram, stack table), add a
  `{label:"Estudo de Caso", url:"/projects/<slug>/", primary:true}` action, a `sitemap.ts` entry, and a
  `ROUTES` entry in `tests/internal-links.test.tsx`.
- **Nav section:** new `<section id="…">` component with `aria-labelledby`, register in `lib/nav.ts`
  `NAV_ITEMS` (icon must exist in `Icon.tsx`), give its `SectionHeader` a `tag` + `title` + `id`.
  `tests/nav.test.tsx` checks the id resolves.
- **Icon:** add a `name: '<path .../>'` entry to `Icon.tsx` (`viewBox="0 0 24 24"`, Heroicons v2 solid).

## Spec-driven docs (`docs/`)

Two tracks under `docs/`:

- **`project/`** — the build spec (Jekyll → Next.js static export, stack, content model, deploy):
  `docs/prd/project.md`, `docs/sdd/project.md`, `docs/adr/project/001–008`, `docs/tasks/project/001–013`.
- **`design/`** — the visual redesign spec: `docs/prd/design.md`, `docs/sdd/design.md`,
  `docs/adr/design/001–005` (visual-direction · static-hosting · minimal-dependencies ·
  telemetria-system [superseded in part] · **editorial-sobriety** — the current light-first editorial
  system), `docs/tasks/design.md` (phased `TASK-nnn`).

`docs/audit/` holds the completion reports: `spec-completion-2026-09.md` (Task 013 deliverable),
`spec-reverify-2026-09.md`, `visual-qa-2026-09.md`, `restyle-2026-09.md` (the categorical-legend pass),
`professional-2026-09.md` (the sobriety pass) and `editorial-sobriety-2026-09.md` (the move off
"Telemetria"). Per **`docs/adr/project/005`** (AI development): read the relevant PRD, SDD, ADRs
and the current task before non-trivial work; keep changes small and task-scoped; **a change that alters
architecture (framework, content model, design system, deploy) must create or update an ADR**; never
invent professional facts (rewriting/reordering/tightening existing content is fine — fabricating
experience/roles/companies/projects/tech/results/metrics is not); don't add dependencies or refactor
outside the task; don't delete tests to get green.

`project/` ADR index: 001 stack · 002 content architecture · 003 design system (+ 2026-09 amendments:
shadow/z-index tokens; WCAG-AA contrast on light `--trace-1`/`--alert`) · 004 static hosting · 005 AI
development · 006 framer-motion removal · 007 featured-projects split · 008 Lighthouse-in-CI +
`experimental.inlineCss`.

## Workflow

Conventional Commit subjects (`feat:`/`fix:`/`style:`/`refactor:`/`test:`/`chore:`, `feat(design):`).
Everything lands via a PR to `main`; CI (`.github/workflows/ci.yml`) must be green; `deploy.yml` builds +
publishes to Pages on push to `main` (its `deploy` job `needs: build`). `main` should be protected
(PR-only, the `ci.yml` check required). `ci.yml`'s single job runs lint → typecheck → tests → build →
Lighthouse; its status-check name is the job's display name (`🔍 Lint, Types, Testes & Build`, workflow
`🧪 Validação do Portfólio (CI)`), so set branch protection to require *that* check, not a check literally
named `CI`.

Note: a user-global Claude Code `Stop` hook (`~/.claude/hooks/auto-pr.sh`) auto-branches, commits stray
changes, pushes, and opens a draft PR at the end of each turn when the tree has un-pushed work — so work
on a feature branch, keep commits clean, and expect the branch pushed for you. `CLAUDE_AUTO_PR=0` disables
it for a session.

`.claude/` is git-ignored (untracked skills of unknown provenance were dropped there). `README.md` is
public-facing repo documentation (what the site is, how to run it, stack, deploy); this file (`CLAUDE.md`)
is the working guidance for Claude.
