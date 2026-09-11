# CLAUDE.md

Working guidance for coding agents. README.md is the human-facing version.

## Project

Portuguese professional portfolio for Rene Verinaud Anguita Junior, presenting
**Data Engineering** capabilities to recruiters. Static Astro site with 14 pages:
home, project catalog, nine project details, trajectory, skills, and certificates.
Published at https://rvanguita.github.io/portfolio/.

The visual direction is "data contract": a graphite BAND (header, hero, contact)
against a light document BODY of cards. The band is the darkest surface in both
themes — in dark mode it drops below the page ground rather than rising above it,
because a step upward there measured 1.04:1 and was invisible.

The signature is the typed measurement (`.metric`): every claim declares whether
it is `medida`, `arquitetura`, `publicacao` or `desenvolvimento`, and each type
gets its own typographic treatment — a measured number is set large in the display
face, a built scope never is. `MetricLegend` publishes that code to the reader.
This is the portfolio's differentiator, not a workaround for missing metrics: keep
it honest and keep it visible. The FastF1 architecture diagram is the second
signature; neither is a decorative chart.

## Architecture and content

- `src/config.ts`: SITE and NAV, shared with astro.config.mjs.
- `src/data/`: profile, timeline, skills, certificates. Preserve documented facts,
  contacts, qualifications, dates and the existing PDFs.
- `src/content/projetos/*.md`: validated content collection. Full entries have a
  Markdown case study; light entries use the structured spec. Keep both formats.
- `order` controls the catalog; the first three entries appear on the home page.
  Current priorities: FastF1, Bank Churn, Rota do Perfume, Personal Expenses,
  Shopping List Intelligence, then the remaining projects. Bank Churn sits at 2
  deliberately: it is the only measured result above the fold, and without it a
  recruiter scanning the home page sees three `arquitetura` cards and no number.
- `src/components/layout/`: shared layout, metadata, header, theme and footer.
- `src/components/panels/`: Channels renders project cards; Readout renders
  contextual results, including nonnumeric architecture or scope; MetricLegend
  publishes the four measurement types; Proof renders the verifiable counts.
- `src/lib/metric.ts`: the measurement vocabulary (terms and glosses). Readout and
  MetricLegend both read it so the card and the legend cannot drift apart.
- `src/components/viz/Pipeline.astro`: semantic HTML diagram of FastF1.
- `src/components/viz/Timeline.astro`: vertical list of existing experiences.
- The legacy Trace component and trace content field are retained for compatibility
  but are not rendered. Do not present illustrative traces as measured results.

All visible interface copy is Portuguese. Keep official technology names, project
names and certificate titles. Preserve experimental/in-development qualifications;
do not invent production scale, seniority, business impact or employment.

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

- Fifteen semantic colors: the body (paper, well, ink, ink-soft, rule,
  rule-strong, accent, accent-bright), the typed signals (signal, signal-open) and
  the band (band, band-ink, band-soft, band-rule, band-accent). All four theme
  blocks need the identical list or the manual inversion breaks.
  Define colors in tokens.css; derive component variations with color-mix.
  Exceptions: print styles and BaseHead's theme-color metadata, which are literal
  copies of --paper and must be updated whenever that token moves.
- Archivo Variable for display, IBM Plex Sans 400/500 for body and UI, IBM Plex
  Mono 400/500 for technologies and metadata. Self-hosted fontsource packages.
- Text needs 4.5:1 and control borders 3:1. Adjacent dark surfaces cannot be judged
  by WCAG ratio — it saturates near 1.0 down there — so separate them by luminance
  step instead (band → paper → well currently step 2.7x and 2.1x).
- Body text is at least 16 px, regular controls at least 14 px. Reserve 12–13 px
  for secondary metadata. Controls have a minimum 44 px target.
- Theme follows the OS; a checkbox and :has() invert it without JavaScript.
  The override is intentionally page-local. Test both OS preferences and inversions.
- Shared styles must account for 360/768/1440 px widths, enlarged text, keyboard
  focus, skip navigation, print and reduced motion. Never hide page overflow to
  conceal a layout problem.
- Keep the architecture diagram faithful to the FastF1 case study. Do not imply
  that its experimental model has a published performance benchmark.

## Validation and delivery

Use npm run dev while implementing. Then run npm run format:check,
npm run build and npm run check. Always check npm run preview at the production
/portfolio/ base. Build/type checks do not detect every broken link or layout issue.

Check all generated pages, internal links, certificate/dossier URLs, project order
and metadata. Preserve all 28 skill items, nine projects and 24 certificate entries.
Keep generated diagnostic reports out of formatting checks through .prettierignore;
do not remove user files as cleanup.

Node 24.20.0 is pinned in mise.toml and both workflows. Astro 7 uses
compressHTML: true to preserve inline whitespace. Import Zod from astro/zod;
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
