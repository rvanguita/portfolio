# CLAUDE.md

Guidance for Claude Code working in this repo. See `docs/NOTES.md` for the
project overview; `README.md` is the public-facing version.

## What this is

One-page personal portfolio of Rene Verinaud Anguita Junior — **Next.js 15 App
Router**, **statically exported** (`output: 'export'`) to **GitHub Pages** at
`https://rvanguita.github.io/portfolio` (base path `/portfolio`). No server
runtime; the deploy is a folder of static HTML/CSS + Next's baseline JS. Content
is Portuguese, single light theme.

Design is **"Dossiê"**: one narrow reading column, one type family (Newsreader),
one accent, a year rail on the Trajetória. **No navbar and no client JS at all**
— every component is a static Server Component.

This project deliberately has **no spec/ADR process** — decisions live in git
history and `docs/NOTES.md`. Prior passes removed a `docs/` tree
(prd/sdd/adr/tasks/audit), the dark-theme toggle, category filters,
JSON-LD/sitemap/robots, the Lighthouse CI gate, the on-page number "metrics",
the navbar/scroll-spy/mobile-menu, `next/image` avatars and the icon set. Don't
reintroduce them without the user asking.

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

Single test: `npx vitest run tests/intro.test.tsx` or `npx vitest run -t "<name>"`.

## Architecture

### Static export + base path (the load-bearing constraint)

`next.config.mjs`: `output: 'export'`, `basePath: '/portfolio'`,
`trailingSlash: true`, `images.unoptimized: true`, `env.NEXT_PUBLIC_BASE_PATH`.
Every route emits `<route>/index.html`. **Do not** add server-only features
(Route Handlers, `dynamic`, `next/image` optimization, middleware) — they don't
survive export.

`next/link` and file-based metadata prepend `basePath` automatically. Use
`asset(path)` from `lib/base-path.ts` for every `/public` reference (certificate
PDFs, the OG image). `SITE_URL` also comes from there (used by `lib/metadata.ts`
— `baseMetadata` + `caseStudyMetadata`). `public/.nojekyll` stops Pages
Jekyll-processing `_next/`.

### Content lives in `lib/data/`

`profile.ts` (long-form bio + footer identity + contact — the home for
professional prose), `projects.ts`, `skills.ts`, `timeline.ts` (`experience` +
`education`), `certificates.ts`; typed by `lib/types.ts`. `lib/timeline-merge.ts`
folds experience+education into one reverse-chronological `trajetoria` (sort by
trailing 4-digit year; presentation only). Section components in `components/`
(`Intro`, `Projetos`, `Trajetoria`, `Competencias`, `Certificacoes`) map over
these; `app/page.tsx` composes them inside `<article class="wrap">`. Rich strings
(`<strong>`) render through `components/ui/Rich.tsx` — a sanctioned
`dangerouslySetInnerHTML` for repo-authored content. Project descriptions are
**qualitative — no result figures** (RMSE/R²/etc. were removed); keep it that way.

### Server vs Client

**Everything is a static Server Component.** There is no `"use client"` anywhere,
no `hooks/`, no `ErrorBoundary`. Interactivity is limited to what HTML gives for
free (the certificates `<details>`). Keep it that way — a new client component is
a real decision.

### Design system — "Dossiê"

`app/globals.css` is a flat ~180-line sheet (no `@layer`, no build step). One
light theme. Structure is the design: a single `.wrap` column
(`max-width: 42rem`, centered), one type family, one accent, a two-column year
rail on the Trajetória that collapses under `@media (max-width: 32rem)`.

Tokens on `:root`: `--bg` `#fcfcfb` · `--ink` `#1a1a1a` · `--ink-soft` `#6b6b68`
(labels, years, meta) · `--rule` `#e4e3df` · `--accent` `#3a5a78` (links + the
rule under the name — the only accent). `--font-serif` = **Newsreader** (via
`next/font` in `layout.tsx`, the only webfont); `--font-mono` = a system stack,
used only by `code`. Key classes: `.intro` / `.sig` / `.kicker` (section
heading) / `.projects` + `.project-*` / `.rail` + `.entry-*` / `.skills` (a
`<dl>`) / `.certs` (`<details>`) / `.site-footer` / `.doc` (case-study prose).

## Tests

Vitest + RTL (jsdom); `tests/*.test.tsx` assert **structure/data invariants**,
not visuals. `vitest.config.mts` has `css: false`. Five files: `home` (section
ids resolve, unique ids), `intro` (name in `<h1>`, email link), `a11y-structure`
(each `<section>` has resolvable `aria-labelledby`; one `<h1>` on home and on
each case study), `internal-links` (project action URLs are https or a real
route; certificate PDFs exist in `public/`), `external-links` (`rel="noopener"`
on every `target="_blank"`). Don't delete tests to get green.

## Adding content

- **Project:** add to `lib/data/projects.ts` (qualitative — no figures). Case
  study: `app/projects/<slug>/page.tsx` (copy `wind-farm/page.tsx` — bare title
  via `caseStudyMetadata()`, short prose + a repo link, wrapped in
  `<article class="wrap doc">`), a
  `{label:"Estudo de caso", url:"/projects/<slug>/", primary:true}` action, and a
  `ROUTES` entry in `tests/internal-links.test.tsx`.
- **New page block:** a `<section id="…" class="block">` with
  `<h2 class="kicker" id="…-h">` + `aria-labelledby`, added to `app/page.tsx`;
  add the id to `tests/home.test.tsx`.

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
