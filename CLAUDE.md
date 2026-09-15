# CLAUDE.md

Working guidance for coding agents. README.md is the human-facing version.

## Project

Portuguese professional portfolio for Rene Verinaud Anguita Junior, presenting
**Data Engineering** capabilities to recruiters. Static Astro site with 24 pages:
home, project catalog, nine project details, ten technology pages, trajectory,
skills, and certificates.
Published at https://rvanguita.github.io/portfolio/.

The visual direction is light and sophisticated: pale blue ground, white
surfaces, navy typography and blue actions. The FastF1 architecture is the
visual signature, beside the professional identity and direct contact actions.
Keep the page focused on capabilities and evidence a recruiter can assess.

Contextual results distinguish `medida`, `arquitetura`, `publicacao` and
`desenvolvimento`. Only measured results receive large numerals. Each card
retains its type and qualifications; the explanatory legend follows the catalog.
Do not imply that a submitted article has already been accepted or peer reviewed.

## Architecture and content

- `src/config.ts`: SITE and NAV, shared with astro.config.mjs.
- `src/data/`: profile, timeline, skills, certificates. Preserve documented facts,
  contacts, qualifications, dates and the existing PDFs.
- `src/content/projetos/*.md`: validated content collection. Full entries have a
  Markdown case study with the four beats; light entries use the structured spec.
  Keep both formats in the schema — but all nine entries are `full` today, so
  `light` exists for a new project with no case study written yet, not for an
  existing one to preserve.
- `order` controls the catalog; the first three entries appear on the home page.
  Current priorities: FastF1, Bank Churn, Rota do Perfume, Personal Expenses,
  Shopping List Intelligence, then the remaining projects. FastF1 appears in
  the hero; Bank Churn and Rota do Perfume appear in the two cards below it.
  Cards show the first five technologies; detail pages preserve the full stack.
- Every project declares `periodo` (display span) and `atualizadoEm` (ISO date, feeds
  the sitemap's per-page lastmod). Both come from the real repository dates via the
  GitHub API — never estimate them. Projects with several repositories use the span
  covering all of them.
- `src/pages/404.astro`: Astro treats /404 as a status-code page and emits
  dist/404.html at the root, not a directory — that is the file GitHub Pages serves.
  It is why the build reports 25 pages for 24 navigable routes.
- `src/components/layout/`: shared layout, metadata, header, theme and footer.
- `src/components/panels/`: Channels renders project cards; Readout renders
  contextual results, including nonnumeric architecture or scope; MetricLegend
  publishes the four result types at the end of the catalog; Skills renders
  capability descriptions and links to evidence, with all items on its full page.
  SkillGroup requires summary and projectIds, and every item is a SkillItem with its
  own projectIds; invalid references fail the build at both levels. The link is
  evidence, not a condition of existence: an item whose projectIds are empty still
  belongs on the list, unlinked. Knowing a tool without a public project that uses
  it is not invention — the rule here is never to inflate scale, seniority or
  impact, and never to simulate evidence that is not there.
- `src/lib/metric.ts`: the measurement vocabulary (terms and glosses). Readout and
  MetricLegend both read it so the card and the legend cannot drift apart.
- `src/components/viz/Pipeline.astro`: semantic HTML layer diagram, driven by
  the optional `architecture` field in a project's frontmatter — never by
  constants in the component. Four of the nine projects have a real layered
  flow and declare it; the other five must not, because a generic diagram
  would invent a pipeline their case study never describes. The grid follows
  the declared stage and output counts through --stage-count/--output-count.
- `src/components/viz/Timeline.astro`: vertical list of existing experiences.

All visible interface copy is Portuguese. Keep official technology names, project
names and certificate titles, and keep the loanwords already current in technical
Portuguese — machine learning, pipeline, lakehouse, dataset, dashboard. What the
rule forbids is writing the interface in English, or planting a search term in
visible copy purely to be indexed; those belong in title, description and JSON-LD.
Preserve experimental/in-development qualifications; do not invent production
scale, seniority, business impact or employment.

## Paths and dependencies

Every internal link and public asset reference must use `url()` from
`src/lib/url.ts` to preserve the `/portfolio/` base. Canonical and social metadata
use Astro.site. Preserve the existing social image and PDF resources.

Use aliases for imports between directories: `@/`, `@components/`, `@data/`,
`@lib/`, `@styles/`. Same-folder imports may be relative.

Keep Astro, npm, package-lock.json, static rendering and the existing GitHub Pages
workflow. Do not add a UI framework, client routing or client JavaScript unless
requested. The only script in production HTML is static JSON-LD.

## Design workflow

Before structural/visual Astro edits or changes in src/styles, read and apply
`.claude/skills/frontend-design/SKILL.md`. Plain copy edits do not need it.
The accepted user design direction supersedes earlier measurement-panel styling.

Styles live in tokens.css and global.css:

- Fifteen semantic colors: paper, well, ink, ink-soft, rule, rule-strong,
  accent, accent-bright, on-accent, signal, signal-open, layer-raw, layer-bronze,
  layer-silver and layer-gold. Both theme blocks need the identical list or the
  dark mode breaks. The four layer colors name storage layers. The
  diagram nodes use all four; Readout's medallion ramp covers raw/bronze/silver
  only, because no project's `metric.sub` has a gold link — so `LAYERS` in
  Readout and the `.chain--*` rules in global.css must stay in step, or a link
  renders classed and unstyled. Colour there only ever reinforces a layer name
  the element already spells out, so it is never the sole carrier of meaning —
  and a chain link that is not a layer stays deliberately uncoloured. The button
  foreground uses on-accent in both themes.
  Define colors in tokens.css; derive component variations with color-mix.
  Exceptions: the `@media print` block in global.css redefines the whole palette
  for paper, and BaseHead's theme-color metadata is a literal copy of --paper.
  So a color token has **three** places: the two theme blocks plus the print
  block. Adding or moving one means updating all three — a token missing
  from print silently keeps its screen value on paper (this is how --layer-gold
  was left out when it was introduced). theme-color must track --paper too.
- Archivo Variable for display, IBM Plex Sans 400/500 for body and UI, IBM Plex
  Mono 400/500 for technologies and metadata. Self-hosted fontsource packages.
- Text needs 4.5:1 and control borders 3:1. Distinguish dark surfaces through
  luminance and borders; retain visible keyboard focus in both themes.
- Body text is at least 16 px, regular controls at least 14 px. Reserve 12–13 px
  for secondary metadata. Controls have a minimum 44 px target.
- Light is the default, regardless of the OS preference; a checkbox and :has()
  switch to dark without JavaScript. Do not reintroduce a
  prefers-color-scheme block that redefines colour — a test guards against it.
  The override is intentionally page-local. Test both checkbox states under light
  and dark OS preferences.
- Shared styles must account for 360/768/1440 px widths, enlarged text, keyboard
  focus, skip navigation, print and reduced motion. Never hide page overflow to
  conceal a layout problem.
- Keep every architecture diagram faithful to its own case study: no diagram may
  show a layer the project's text does not describe. Rota do Perfume runs
  bronze/silver/gold and has no raw layer; Personal Expenses and Shopping List
  have no scheduler, so they declare no orchestrator. Do not imply
  that its experimental model has a published performance benchmark.

## Validation and delivery

Use npm run dev while implementing. Then run npm run format:check,
npm run build, npm run check and npm test. Always check npm run preview at the
production /portfolio/ base. Build/type checks do not detect every broken link or
layout issue.

npm test is the invariant suite (tests/, Node's own runner, no new dependency). It
reads dist/, so it runs after the build. It guards what this file and the SDD claim:
the colour tokens in all three places, LAYERS against the .chain--* rules, each
metricKind against its rule, knowsAbout against the visible text, the honesty
caveats, every internal link, one h1 per page, and the counts published in the docs.
When you add an invariant, break it once on purpose and confirm the suite fails — a
test that has never gone red is not a guard.

Check all generated pages, internal links, certificate/dossier URLs, project order
and metadata. Preserve all 29 skill items, nine projects and 24 certificate entries.
Keep generated diagnostic reports out of formatting checks through .prettierignore;
do not remove user files as cleanup.

Node 24.20.0 is pinned in mise.toml and both workflows. Astro 7 uses
compressHTML: true, which collapses the generated HTML — whitespace between inline
elements is significant, which is why the files sensitive to it sit outside Prettier
(see .prettierignore). Import Zod from astro/zod;
tsconfig paths use explicit ./ prefixes without the removed baseUrl option.

npm run check runs astro check followed by TypeScript 7's tsc --noEmit.
Keep the documented Microsoft compatibility aliases: typescript resolves to
@typescript/typescript6 for Astro's compiler API, while @typescript/native
resolves to typescript@7 for the tsc executable. Do not replace this with a
TypeScript 7 API dependency or bypass peer checks with force/legacy-peer-deps.

Source formatting is governed by Prettier, with intentional exclusions recorded
in .prettierignore.

Use Conventional Commit subjects. Changes land via a PR to main. The existing
deploy.yml builds and publishes dist/ on pushes to main. Publish through the
existing GitHub Pages workflow when requested; do not create copies elsewhere.
