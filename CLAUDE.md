# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure & Module Organization

This repository is a static Jekyll portfolio published through GitHub Pages at `https://rvanguita.github.io/portfolio`.

- `index.html` is the main portfolio page (hero, skills matrix, filterable projects grid, education timeline, certificates); `projects/` contains dedicated case-study pages (currently `lake-fastf1.html`) linked from the projects grid.
- `_layouts/default.html` provides the shared HTML/Liquid layout — navbar, theme-toggle script, `{{ content }}` slot, and footer. All pages (`index.html`, `projects/*.html`) declare `layout: default` in front matter.
- `_config.yml` configures Jekyll, site metadata (title, description, author), and the `/portfolio` `baseurl`.
- `assets/css/custom.css` contains all site styling — a single stylesheet using CSS custom properties for a light/dark theme system (see Theming below).
- `assets/img/` contains image assets (avatar, favicon).
- `certificates/` stores linked PDF credentials, organized in nested folders by specialization/course name. Folder and file names contain spaces and must stay URL-safe in Markdown/HTML links (spaces are referenced literally and decoded via `urllib.parse.unquote` in tests, not pre-encoded).
- `scripts/test_site.py` is the repository's structural and link-integrity test suite (stdlib only, no dependencies) — 12 checks, enforced locally via a git hook and in both GitHub Actions workflows (see below).
- `.github/workflows/ci.yml` runs `scripts/test_site.py`, then validates the Jekyll build and audits structure/links, on pull requests to `main`. `.github/workflows/deploy.yml` runs `scripts/test_site.py`, then builds and deploys to GitHub Pages, on push to `main` — a failing test blocks the deploy job since it `needs: build`.

## Build, Test, and Development Commands

Run the repository test suite from its root (no dependencies to install):

```bash
python3 scripts/test_site.py
```

Run it after every content, path, layout, or styling change — it is the primary correctness check for this repo (there is no build step required to validate most changes).

**Pre-commit hook**: a hook that runs this suite before every commit lives at `.githooks/pre-commit` (versioned) but is *not* auto-enabled on a fresh clone — Git's `core.hooksPath` is a local config, not something a repo can force. Enable it once per clone with:

```bash
git config core.hooksPath .githooks
```

If Jekyll is installed locally, build the site with:

```bash
jekyll build --source . --destination _site
```

To preview changes locally:

```bash
jekyll serve --baseurl /portfolio
```

GitHub Actions performs the authoritative Jekyll build on pull requests (`ci.yml`) and deploys pushes to `main` (`deploy.yml`); there is no local Jekyll dependency required for most edits since `test_site.py` covers structural correctness without a full build.

## Architecture Notes

- **Content model**: this is hand-authored HTML with Liquid tags, not componentized. New projects are added as a new `<div class="project-card-item" data-category="...">` block inside the `#projetos` grid in `index.html`, optionally paired with a new case-study page under `projects/` (copy the structure/classes of `projects/lake-fastf1.html`, set `layout: default` front matter with `title`/`description`).
- **Theming**: light/dark mode is driven entirely by CSS custom properties. `:root` in `custom.css` defines the light palette; `[data-theme="dark"]` overrides the same variable names for dark mode. `_layouts/default.html` includes an inline script (before any stylesheet) that reads `localStorage.portfolio_theme` (falling back to `prefers-color-scheme`) and sets `data-theme` on `<html>` immediately to avoid a flash of unstyled content; the navbar theme-toggle button flips and persists this value.
- **Category filtering**: both the projects grid and the certificates section use client-side filtering (no framework) — buttons with `data-category`/`data-cert-category` toggle `.active` and show/hide sibling cards via inline `style.display`, wired up in the `DOMContentLoaded` script at the bottom of `_layouts/default.html`.
- **Asset links use Liquid's `relative_url`** (e.g. `{{ '/assets/img/face.png' | relative_url }}`) so links resolve correctly under the `/portfolio` baseurl in both local Jekyll builds and production. Follow this convention for any new internal link, image, or certificate reference rather than hardcoding `/portfolio/...` paths.
- **`README.md` is not repository documentation** — it currently documents the *FastF1 Data Platform* project (an external project at `github.com/rvanguita/lake-fastf1`) that this portfolio showcases, and `scripts/test_site.py::test_readme_project_documentation` asserts specific required sections/links in it. Do not repurpose `README.md` for repo-level instructions; this file (`CLAUDE.md`) and `AGENTS.md`-style guidance belong elsewhere.
- **`scripts/test_site.py` is the change-detection net**: it validates `_config.yml` keys, layout markers (`{{ content }}`, `portfolio_theme`, `custom.css`), CSS brace-balance and required theme variables (`--bg-page`, `--accent`, `[data-theme="dark"]`), that every local asset/certificate link referenced in `index.html` exists on disk, required navigation anchors (`#sobre`, `#habilidades`, `#projetos`, `#experiencia`, `#formacao`, `#certificados`), the README's required sections, that every page in `projects/` has a layout and non-empty content, HTML tag balance across `index.html`/`_layouts/default.html`/`projects/*.html`, that every `data-category`/`data-cert-category` used on a card has a matching filter button (and vice versa), uniqueness of `id` attributes in `index.html`, that every nav-menu link resolves to a real section id, and that every `target="_blank"` link carries `rel="noopener"`. When adding a new required page structure, section, or asset type, extend this file rather than relying only on CI's Jekyll build.

## Coding Style & Naming Conventions

Two-space indentation in HTML, Liquid, YAML, and CSS. Keep semantic HTML accessible, use lowercase kebab-case for new asset filenames (e.g. `project-cover.png`), and preserve existing Liquid conventions such as `relative_url`. Follow the existing CSS custom-property and light/dark theme patterns. Python in `scripts/` follows PEP 8 with four-space indentation; keep tests small and descriptive.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style subjects, consistent with history: `feat:`, `fix:`, `style:`, or `docs:` followed by an imperative description. Pull requests should explain the visible or structural change, mention validation commands and results, link relevant issues, and include screenshots for visual updates. Ensure CI passes before requesting review; deployment occurs only from `main`.

## Security & Configuration Tips

Do not commit secrets, credentials, or private documents. Keep public contact links and site metadata in the existing files, and review generated or renamed certificate paths for accidental exposure or broken links.
