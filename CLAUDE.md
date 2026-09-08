# CLAUDE.md

Working guidance for coding agents. `README.md` is the human-facing version.

## What this is

Personal page of Rene Verinaud Anguita Junior — a **static site built with
[Astro](https://astro.build)**. Concept: a **"painel de leitura"** (a precision
measurement-instrument readout) — each page is a panel, every project's headline
metric is a large numeric readout with units, thin inline-SVG "signal traces"
echo each result, and a fixed **readout strip** carries the identity + nav.

```
astro.config.mjs                 site + base: '/portfolio', passthrough image service, sitemap
package.json / package-lock.json  npm; scripts: dev · build · preview · check
mise.toml                         pins Node for local dev

src/
  pages/
    index.astro                  home — the "master panel" (hero + 6-project grid + module links)
    projetos/index.astro         project index (the same channel grid)
    projetos/[slug].astro        one page per project, from the content collection
    trajetoria.astro             CV Gantt on a real time axis
    competencias.astro           4 skill panels
    certificacoes.astro          segmented "level meter" (12/9/3) + grouped lists
  content.config.ts              zod schema for the 'projetos' collection
  content/projetos/*.md          6 projects — `kind: full` has a Markdown body
                                 (migrated case study), `kind: light` has a
                                 structured `spec` (problema/dados/método/resultado)
  data/                          profile.ts · timeline.ts · skills.ts · certificates.ts
                                 (all content, kept verbatim from the old site)
  components/                    Layout · BaseHead · ReadoutStrip · ThemeToggle ·
                                 Panel-less (classes) · Readout · Trace · Timeline ·
                                 Channels · Footer
  lib/url.ts                     url() — prefixes every internal href with the base
  styles/                        tokens.css (8 colour tokens per theme, type, sizes)
                                 + global.css (everything else)

public/                          served verbatim: .nojekyll · icon.png · robots.txt ·
                                 assets/ (social-card.png, dossiê PDF) · certificates/ (24 PDFs)

.github/workflows/
  deploy.yml                     push to main → npm ci && npm run build → Pages (./dist)
  ci.yml                         PR → npm ci && npm run build && npm run check
```

Served at `https://rvanguita.github.io/portfolio/`.

## Editing

### The base-path rule (most common source of bugs)

The site lives under `/portfolio/`. **Every internal link and every reference to
a file in `public/` must go through `url()` from `src/lib/url.ts`** —
`href={url('/projetos/wind-farm/')}`, `href={url('/assets/dossie-rene-anguita.pdf')}`.
Canonical/OG URLs use `new URL(path, Astro.site)` (see `BaseHead.astro`).
**Always verify with `npm run preview`** (it serves under the real base), not
just `npm run dev`.

### Design changes are gated on the `frontend-design` skill

Before writing or editing anything in `src/styles/`, or any structural/visual
`.astro` (new component, new layout, new class — not plain copy), invoke the
`frontend-design` skill first and follow its process. Plain content edits
(text in `src/data/*`, a `.md` body, a new certificate entry) don't need it.

### Design system

All of it is `src/styles/tokens.css` + `src/styles/global.css`.

- **Colour: exactly 8 tokens per theme**, defined only in the `:root`,
  `@media (prefers-color-scheme: dark)`, and `:root:has(#theme-toggle:checked)`
  blocks of `tokens.css` — `--paper --ink --ink-soft --rule --accent
  --accent-bright` plus `--well`. Never a bare hex anywhere else (the two
  exceptions are `@media print` and the `<meta name="theme-color">` in
  `BaseHead.astro`). Accent is **cyan** (`#0f6f7a` / `#12a0ad` light).
- **Type:** IBM Plex Sans (structure, UI, panel titles) + IBM Plex Mono (all
  data, readouts, labels), self-hosted via `@fontsource/*` imported in
  `Layout.astro`. No web-font CDN.
- **Signature devices:** `.strip` (the fixed readout bar), `.panel` /
  `.panel-tab` (hairline module + mono label), `.readout` (label / big value /
  sub — `Readout.astro`), `.trace` (inline-SVG signal — `Trace.astro`, six
  named variants; draws once on load, respects reduced-motion), `.channels` /
  `.skills` (instrument-bank grids: `gap:1px` on a `--rule` background).
- **Dark mode:** automatic via `prefers-color-scheme` + a manual CSS-only
  toggle (`#theme-toggle` checkbox + `:has()` — zero JS). `ThemeToggle.astro`
  sits inside the strip.
- **Inline SVG only** for graphics (`Trace.astro`); no image files beyond
  `public/`. Self-close every leaf.

### Content

- **Profile / timeline / skills / certificates:** edit `src/data/*.ts`.
- **A project:** edit its `src/content/projetos/<slug>.md`. Frontmatter is
  validated by `src/content.config.ts`. `kind: full` → write the case study as
  the Markdown body (`## Problema` … `## Resultado`); `kind: light` → fill the
  `spec` object, no body.
- **New certificate:** drop the PDF in `public/certificates/…`, add an entry to
  the right group in `src/data/certificates.ts` (readable path with spaces —
  the page encodes each segment). The `[NN]` counts and the segmented bar derive
  from the data; nothing else to bump.
- **New project page:** a `src/content/projetos/<slug>.md` with valid
  frontmatter — the route, the home grid, the sitemap and the counts all follow
  automatically. Set `repo: <github-repo-name>` (and `reposGh: [...]` for extras)
  so the card gets its live `★` / language / "updated N ago" and the repo drops
  out of the "Mais no GitHub" section.

Don't remove the build, but also don't add a UI framework, client-side routing,
or client JS unless asked — the theme toggle is deliberately CSS-only and the
pages ship no JS.

### GitHub sync (repos → site)

The profile's GitHub user (parsed from `src/data/profile.ts`) drives two things:
live badges on curated cards, and an auto "Mais no GitHub" section for every
public repo without a curated card.

- **Source of truth:** `src/data/github-repos.json` — a committed snapshot.
  Regenerate with `npm run sync` (`scripts/sync-github.mjs`, Node-only, no deps;
  reads `GITHUB_TOKEN` if present, else anonymous). The snapshot only changes
  its timestamp when the repo list actually changes (idempotent).
- **The build never calls the API** — it reads the JSON. Helpers in
  `src/data/github.ts` (`repoMeta`, `relativeTime`, `pickExtras`, `isNew`,
  `publicRepoCount`, `warnMissing`).
- **Refresh:** `.github/workflows/sync-github.yml` runs weekly (and on demand),
  reruns the script and opens/updates a PR (`chore/sync-github`) via
  `peter-evans/create-pull-request`. Needs repo setting *Actions → General →
  Workflow permissions → "Allow GitHub Actions to create and approve pull
  requests"*.
- **Control from GitHub's UI** (no code change): topic `portfolio-hide` drops a
  repo from the site; `portfolio-pin` sorts it first in "Mais no GitHub". Always
  excluded: `portfolio`, `rvanguita`, forks, archived.
- A build-time `console.warn` fires if a curated `repo:` no longer exists in the
  snapshot (deleted / made private / renamed → run `npm run sync`).

## Preview & deploy

- Local: `npm run dev` (fast) then always sanity-check `npm run build &&
  npm run preview` (real `/portfolio/` base). `npm run check` runs `astro check`;
  `npm test` runs the sync-logic unit tests (`scripts/sync-github.test.mjs`,
  `node --test`, no deps).
- Node: `mise.toml` pins it locally; CI uses Node 20.
- Deploy: push to `main` → `deploy.yml` builds and publishes `dist/` to Pages.
- PR gate: `ci.yml` runs `npm ci && npm test && npm run build && npm run check`.
  A broken internal content link, a schema violation, a type error or a failing
  unit test fails the check.
- `sync-github.yml` (weekly cron) refreshes `src/data/github-repos.json` via a PR
  (runs the tests against the fresh snapshot before opening it).

Conventional Commit subjects; everything lands via a PR to `main`.
