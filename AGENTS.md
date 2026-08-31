# Repository Guidelines

## Project Structure & Module Organization

This repository is a static Jekyll portfolio published through GitHub Pages.

- `index.html` is the main portfolio page; `projects/` contains dedicated case-study pages.
- `_layouts/default.html` provides the shared HTML/Liquid layout, and `_config.yml` configures Jekyll, metadata, and the `/portfolio` base URL.
- `assets/css/custom.css` contains the site styling; `assets/img/` contains image assets.
- `certificates/` stores linked PDF credentials. Keep certificate paths URL-safe in Markdown links.
- `scripts/test_site.py` is the repository’s structural and link-integrity test suite.
- `.github/workflows/` contains CI validation and GitHub Pages deployment workflows.

## Build, Test, and Development Commands

Run the repository test suite from its root:

```bash
python3 scripts/test_site.py
```

If Jekyll is installed locally, build the site with:

```bash
jekyll build --source . --destination _site
```

To preview changes locally, use `jekyll serve --baseurl /portfolio` and open the displayed local URL. GitHub Actions performs the authoritative Jekyll build on pull requests and deploys pushes to `main`.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, Liquid, YAML, and CSS. Keep semantic HTML accessible, use lowercase kebab-case for new asset filenames (for example, `project-cover.png`), and preserve existing Liquid conventions such as `relative_url`. Follow the existing CSS custom-property and light/dark theme patterns. Python in `scripts/` follows PEP 8 with four-space indentation; keep tests small and descriptive.

## Testing Guidelines

The test suite uses Python’s standard library and checks configuration, layout markers, CSS integrity, local assets, certificate links, and project pages. Run it after every content, path, layout, or styling change. Add validation to `scripts/test_site.py` when introducing a new required page structure or asset type.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style subjects, consistent with history: `feat:`, `fix:`, `style:`, or `docs:` followed by an imperative description. Pull requests should explain the visible or structural change, mention validation commands and results, link relevant issues, and include screenshots for visual updates. Ensure CI passes before requesting review; deployment occurs only from `main`.

## Security & Configuration Tips

Do not commit secrets, credentials, or private documents. Keep public contact links and site metadata in the existing files, and review generated or renamed certificate paths for accidental exposure or broken links.
