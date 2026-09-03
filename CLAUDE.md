# CLAUDE.md

Guidance for Claude Code working in this repo. See `docs/NOTES.md` for the
project overview; `README.md` is the public-facing version.

## What this is

One-page personal portfolio of Rene Verinaud Anguita Junior — **Next.js 15 App
Router**, **statically exported** (`output: 'export'`) to **GitHub Pages** at
`https://rvanguita.github.io/portfolio` (base path `/portfolio`). No server
runtime; the deploy is a folder of static HTML/JS/CSS. Content is Portuguese,
single light theme.

This project deliberately has **no spec/ADR process** — decisions live in git
history and `docs/NOTES.md`. A prior `docs/` tree (prd/sdd/adr/tasks/audit) plus
the dark-theme toggle, category filters, JSON-LD/sitemap/robots, the Lighthouse
CI gate and the on-page number "metrics" were all removed in a simplification
pass. Don't reintroduce them without the user asking.

## Commands

Node ≥ 22.12 (`.tool-versions` pins `22.12.0`).

```bash
npm ci
npm run dev        # http://localhost:3000/portfolio/  (basePath enforced in dev)
npm run lint       # next lint — react/jsx-no-target-blank is an error
npm run typecheck  # tsc --noEmit
npm test           # Vitest run-once   (npm run test:watch for watch)
npm run build      # next build → static export in ./out
```

`npm run lint && npm run typecheck && npm test && npm run build` is the full
gate (what CI runs). Preview the real artifact with `npm run build && npx serve
out`. The `.githooks/pre-commit` hook runs lint + typecheck + tests — enable
once per clone with `git config core.hooksPath .githooks`.

Single test: `npx vitest run tests/hero.test.tsx` or `npx vitest run -t "<name>"`.

## Architecture

### Static export + base path (the load-bearing constraint)

`next.config.mjs`: `output: 'export'`, `basePath: '/portfolio'`,
`trailingSlash: true`, `images.unoptimized: true`, `env.NEXT_PUBLIC_BASE_PATH`.
Every route emits `<route>/index.html`. **Do not** add server-only features
(Route Handlers, `dynamic`, `next/image` optimization, middleware) — they don't
survive export.

`next/link` and file-based metadata prepend `basePath` automatically; **`next/image`
does not** for a `/public` src under `output:'export' + unoptimized`. Use
`asset(path)` from `lib/base-path.ts` for every `/public` reference (hero avatar,
certificate PDFs, OG image). `SITE_URL` also comes from there (used by
`lib/metadata.ts`). `public/.nojekyll` stops Pages Jekyll-processing `_next/`.

### Content lives in `lib/data/`

`profile.ts` (long-form About bio + hero/footer identity + contact — the home
for professional prose), `projects.ts`, `skills.ts`, `timeline.ts` (`experience`
+ `education`), `certificates.ts`; typed by `lib/types.ts`. Section components
map over these. Rich strings (`<strong>`, `<code>`) render through
`components/ui/Rich.tsx` — a sanctioned `dangerouslySetInnerHTML` for
repo-authored content. `Icon.tsx` (static Heroicons-v2-solid `<path>`) is the
same. Project descriptions are **qualitative — no result figures** (RMSE/R²/etc.
were removed); keep it that way unless the user asks.

### Server vs Client

Almost everything is a Server Component. Client: `Navbar`, `ErrorBoundary`, and
`hooks/*` (`useMediaQuery`, `useScrollSpy`, `useToggle`). Keep client boundaries
small; pass data down.

### Design system — editorial

`app/globals.css` is a single sheet ordered by `@layer reset, tokens, base,
layout, components, utilities` (layer order, not specificity, resolves
conflicts). Section outer spacing lives in `layout`; a component's own
responsive spacing lives with it in `components`. **Every `@media` sits inside a
named layer** except the `prefers-reduced-motion` kill-switch (unlayered, so it
beats every layer). Single light theme (`:root` only, `color-scheme: light`).

Tokens: `--panel` (paper `#f7f6f3`) / `--panel-raised` / `--panel-sunken` /
`--readout` (ink) / `--label` / `--rule` / `--rule-strong` / `--trace-1` (the
one accent — slate-blue `#2e4b63`: links, active, focus, `code`, `::selection`)
/ `--ok` (green — only the hero availability dot). Plus `--fs-*`, `--sp-*`,
`--r-sm`/`--r-md`, `--wrap` 1140px. Fonts via `next/font` in `layout.tsx`:
**Source Serif 4** (`--font-serif` — headings, `.hero-title`, `.nav-logo`),
**Archivo** (`--font-display` — body/UI), **JetBrains Mono** (`--font-mono` —
only `code` + `.architecture-card pre`). Class names are reused across
section/card/case-study components so `globals.css` carries the look.

### Motion

Gate every programmatic scroll on `usePrefersReducedMotion()`
(`hooks/useMediaQuery.ts`) — JS `behavior: 'smooth'` overrides the CSS
`@media (prefers-reduced-motion)`. Nav/logo scroll → `lib/scroll.ts`. Scroll-spy
→ `hooks/useScrollSpy.ts` (`IntersectionObserver`).

## Tests

Vitest + RTL (jsdom); `tests/*.test.tsx` assert **structure/data invariants**,
not visuals. `vitest.config.mts` has `css: false` — no test catches a CSS
regression. `vitest.setup.ts` stubs `matchMedia` / `IntersectionObserver` /
`localStorage`. Suite: `home` / `nav` (six nav sections ↔ `<section id>`, unique
ids), `hero`, `icon` (every referenced icon name resolves), `external-links`
(`rel="noopener"` on `target="_blank"`), `internal-links` (project action URLs,
certificate PDFs exist), `mobile-nav` (hamburger open/close/Esc/click-out),
`a11y-structure` (section `aria-labelledby`, one `<h1>`, case-study
`<pre role="img">` + `<table><caption>`/`scope`). Don't delete tests to get green.

## Adding content

- **Project:** add to `lib/data/projects.ts` (qualitative — no figures). Case
  study: `app/projects/<slug>/page.tsx` (copy `wind-farm/page.tsx` — bare title
  via `caseStudyMetadata()`, `ArchitectureStep[]`, `<pre role="img">` diagram,
  stack table), a `{label:"Estudo de caso", url:"/projects/<slug>/", primary:true}`
  action, and a `ROUTES` entry in `tests/internal-links.test.tsx`.
- **Nav section:** `<section id="…">` with `aria-labelledby`, register in
  `lib/nav.ts` `NAV_ITEMS` (icon must exist in `Icon.tsx`), give its
  `SectionHeader` a `tag` + `title` + `id`. `tests/nav.test.tsx` checks it.
- **Icon:** add `name: '<path .../>'` to `Icon.tsx` (`viewBox="0 0 24 24"`,
  Heroicons v2 solid).

## Workflow

Conventional Commit subjects (`feat:`/`fix:`/`refactor:`/`test:`/`chore:`).
Everything lands via a PR to `main`; `ci.yml` (lint → typecheck → tests → build)
must be green; `deploy.yml` builds + publishes to Pages on push to `main`
(its `deploy` job `needs: build`). Branch protection should require the
`ci.yml` job's display name (`🔍 Lint, Types, Testes & Build`, workflow
`🧪 Validação do Portfólio (CI)`), not a check literally named `CI`.

A user-global `Stop` hook auto-branches/commits/pushes and opens a draft PR when
the tree has un-pushed work — work on a feature branch, keep commits clean.
`CLAUDE_AUTO_PR=0` disables it. `.claude/` is git-ignored.
