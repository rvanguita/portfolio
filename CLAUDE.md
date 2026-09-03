# CLAUDE.md

Working guidance for coding agents. `README.md` is the human-facing version.

## What this is

Personal page of Rene Verinaud Anguita Junior. A **hand-written static site — HTML
+ CSS only**. No framework, no build, no npm, no tests, no config files.

```
index.html                       home (dossiê): intro · projetos · trajetória ·
                                 competências · certificações
style.css                        one stylesheet, shared by all 3 pages
projects/wind-farm/index.html    case study (short prose + repo link)
projects/lake-fastf1/index.html  case study
certificates/                    24 certificate PDFs
assets/social-card.png           Open Graph image
icon.png                         favicon
.nojekyll                        stops GitHub Pages running Jekyll
.github/workflows/deploy.yml     copies the files to Pages (shell only, no build)
```

Served at `https://rvanguita.github.io/portfolio/`. **All links are relative**
(nav, `style.css`, `icon.png`, PDFs) so it works locally and under `/portfolio/`
unchanged. Absolute URLs only in `<meta og:*>` and `<link rel="canonical">`.

## Editing

- **Content:** edit the text directly in the HTML files. The home page holds all
  the profile/projects/timeline/skills/certificates content; each case study is
  self-contained.
- **Design:** all of it is in `style.css` (~180 lines, CSS custom properties at
  the top: `--bg` `--ink` `--ink-soft` `--rule` `--accent`; a single serif font
  stack). Classes: `.wrap` / `.intro` / `.sig` / `.kicker` / `.projects` +
  `.project-*` / `.rail` + `.entry-*` / `.skills` (a `<dl>`) / `.certs`
  (`<details>`) / `.site-footer` / `.doc` (case-study prose).
- **New certificate:** drop the PDF in `certificates/`, add an `<li>` in the
  Certificações section of `index.html` (replace spaces with `%20` in the `href`),
  bump the count in the `<summary>`.
- **Footer** and the `<head>` boilerplate are duplicated across the 3 pages —
  change all three when you touch them.

Don't reintroduce a build step, a framework, a package.json, or client JS unless
the user explicitly asks. The site deliberately has none.

## Preview & deploy

- Local: `python3 -m http.server 8000` in the repo root, or just open
  `index.html`.
- Deploy: push to `main` → `.github/workflows/deploy.yml` copies
  `index.html style.css icon.png .nojekyll projects/ certificates/ assets/` into
  `_site/` and publishes to GitHub Pages. There is no PR gate.

Conventional Commit subjects; everything lands via a PR to `main`.
