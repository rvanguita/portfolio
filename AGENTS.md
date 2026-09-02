# Repository Guidelines

## Project Structure & Module Organization

- `app/` contains routes, metadata, and global CSS.
- `components/` contains UI, cards, sections, and SEO; `hooks/`, `context/`, and `lib/` contain hooks, theme state, utilities, types, and content in `lib/data/`.
- `public/` contains published images and PDFs; `tests/` contains Vitest/Testing Library tests; `scripts/` contains quality tooling.
- `docs/` contains specifications, ADRs, tasks, and audits. `.github/workflows/` defines CI and deployment.

## Build, Test, and Development Commands

Use Node 22.12.0 and install with `npm ci`.

```bash
npm run dev             # Start the development server at /portfolio/
npm run lint            # Run ESLint
npm run typecheck       # Check TypeScript without emitting files
npm test                # Run the Vitest suite once
npm run test:watch      # Run Vitest in watch mode
npm run build           # Create the static export in out/
npm run lighthouse      # Build and run the local Lighthouse audit
```

Before a pull request, run `npm run lint && npm run typecheck && npm test && npm run build`. Do not commit generated artifacts.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons, and the existing TypeScript/React style. Components and hooks use PascalCase and `use*` names; utilities and data modules use lower-case names such as `base-path.ts`. Prefer typed data in `lib/data/` over duplicated prose. Reuse design tokens in `app/globals.css`; keep client boundaries small.

Because the site uses `output: "export"` and `basePath: "/portfolio"`, avoid server-only features. Use `asset()` from `lib/base-path.ts` for `public/` references and preserve accessible labels, landmarks, and reduced-motion behavior.

## Testing Guidelines

Tests use Vitest, jsdom, and React Testing Library. Name files `*.test.ts` or `*.test.tsx`; test behavior, structure, accessibility, and data invariants. Run focused tests with `npx vitest run tests/hero.test.tsx`. New routes, filters, links, icons, or structured data should include invariant coverage.

## Commit & Pull Request Guidelines

Use `type(scope): imperative summary`, for example `fix(nav): prevent mobile overflow`; common types include `feat`, `fix`, `test`, `docs`, `refactor`, and `ci`. Keep commits focused. PRs should describe the change, list validation commands, link the task/issue, and include screenshots for visual changes. Architecture changes should update or add an ADR.

## Security & Configuration Tips

Never commit credentials, tokens, or local personal data. Add certificates/assets under `public/` and register content in the appropriate `lib/data/` module. Enable the hook with `git config core.hooksPath .githooks`.
