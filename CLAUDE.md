# CLAUDE.md

Working guidance for coding agents. `README.md` is the human-facing version.

## What this is

Personal page of Rene Verinaud Anguita Junior. A **hand-written static site — HTML
+ CSS only**. No framework, no build, no npm, no tests, no config files.

```
src/                             site source — this is what Pages publishes
  index.html                     home (dossiê): intro · projetos · trajetória ·
                                 competências · certificações
  style.css                      one stylesheet, shared by all 4 pages
  projects/wind-farm/index.html  case study (short prose + repo link)
  projects/lake-fastf1/index.html  case study
  projects/bank-customer-churn/index.html  case study
  certificates/                  24 certificate PDFs
  assets/social-card.png         Open Graph image
  assets/dossie-rene-anguita.pdf full-site PDF snapshot, linked from contact/footer
  icon.png                       favicon
  .nojekyll                      stops GitHub Pages running Jekyll
.github/workflows/deploy.yml     publishes src/ to Pages (shell only, no build)
```

Served at `https://rvanguita.github.io/portfolio/`. **All links are relative**
(nav, `style.css`, `icon.png`, PDFs) so it works locally and under `/portfolio/`
unchanged. Absolute URLs only in `<meta og:*>` and `<link rel="canonical">`.

## Editing

- **Design changes are gated on the `frontend-design` skill.** Before writing
  or editing CSS in `style.css`, or any structural/visual HTML (new component,
  new layout, new class — not plain copy edits), invoke the `frontend-design`
  skill (`.claude/skill/frontend-design/SKILL.md`) first and follow its
  process. This applies to every session, on any machine, no exceptions. Plain
  content edits (text, links, a new certificate `<li>`) don't need it. Don't
  confuse this with the other vendored skill, `.claude/skill/frontend-patterns`
  — that one is React/Next.js component patterns and doesn't apply to this
  plain-HTML site. (On the maintainer's machine this is additionally enforced
  by a local hook in `.claude/settings.json` that blocks edits to `style.css`
  until the skill has run in the session — that hook is gitignored and won't
  exist on a fresh clone, so this written rule is the only guarantee elsewhere.)
- **Content:** edit the text directly in the HTML files. The home page holds all
  the profile/projects/timeline/skills/certificates content; each case study is
  self-contained.
- **Design:** all of it is in `style.css` (~400 lines). Concept: a "caderno em
  papel milimetrado" — the page sits on a faint CSS grid (`body::before`),
  section dividers are labelled axes (`.axis` + `.axis-fig`), prose is serif and
  every measurement is monospace. Custom properties at the top: `--paper` `--ink`
  `--ink-soft` `--rule` `--grid` `--grid-bold` `--accent` (copper, text) /
  `--accent-ink` (copper, graphics), plus `--fs-*` type scale and `--measure`.
  Classes: `.wrap` / `.intro` + `.hero-mark` (inline-SVG axis/curve device —
  used on the home hero and reused as a content-specific schematic on each
  case-study page) / `.axis` / `.projects` + `.project-*` + `.project-glyph`
  (inline-SVG domain schematic) / `.timeline` + `.tl-*` (CV Gantt on a real
  time axis; `--t0`/`--t1` on `.timeline`, `--from`/`--to` on each
  `.tl-track`) / `.skills` (a `<dl>`; `.skill-n` is a plain count, not a
  proficiency meter) / `.cert-bar` + `.cert-legend` / `.certs` (`<details>`) /
  `.site-footer` / `.doc` + `.sig` (case-study prose).
- Inline SVG only (no asset files). The PR check parses SVG as HTML, so
  **self-close every leaf** (`<path …/>`, `<line …/>`, `<rect …/>`, `<polyline …/>`).
- **Dark mode:** automatic via `prefers-color-scheme`, plus a manual override —
  a hidden `#theme-toggle` checkbox + `.theme-toggle-btn` label (fixed circle,
  bottom-right), matched by `:root:has(#theme-toggle:checked)` in CSS. Zero JS.
  Every color **must** be one of the 8 tokens (never a bare hex) — the `:root`,
  `@media (prefers-color-scheme: dark)`, and `:has(#theme-toggle:checked)`
  blocks at the top of `style.css` are the only place colors are defined. The
  toggle markup is duplicated across the 4 pages, right after `<body>` (same
  pattern as the footer/head boilerplate).
- **New certificate:** drop the PDF in `certificates/`, add an `<li>` in the
  right `.certs-group` of `index.html` (replace spaces with `%20` in the `href`),
  bump: the `<summary>` count, the `.axis-fig` `[24]`, and the matching
  `.cert-bar` span `flex:` value + `.cert-legend` number.
- **New case study:** a `projects/<slug>/index.html` following the existing
  pattern (head boilerplate, `.doc` prose, a content-specific `.hero-mark`
  schematic reusing the `hm-*` SVG parts, `.tech`, `.repo`), plus: a
  "Estudo de caso →" link on its `.project` card in `index.html`, its path
  added to `PAGES` in `.github/check.py`, and its footer/`<head>` copied from
  another case-study page.
- **Footer** and the `<head>` boilerplate are duplicated across the 4 pages —
  change all four when you touch them.

Don't reintroduce a build step, a framework, a package.json, or client JS unless
the user explicitly asks. The site deliberately has none.

## Preview & deploy

- Local: `python3 -m http.server 8000 -d src` in the repo root, or open
  `src/index.html`.
- Deploy: push to `main` → `.github/workflows/deploy.yml` publishes the `src/`
  directory (it is the site, `.nojekyll` included) to GitHub Pages.
- PR gate: `.github/workflows/ci.yml` runs `python3 .github/check.py` — pages
  exist, tags balanced, one `<h1>`/`lang`/`<title>` each, every local `href`
  resolves to a real file, deploy targets present. No npm.

Conventional Commit subjects; everything lands via a PR to `main` (branch
protection requires the `ci.yml` check).
