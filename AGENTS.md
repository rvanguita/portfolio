# Agent guidelines

This repo's working guidance for coding agents lives in [`CLAUDE.md`](CLAUDE.md);
[`README.md`](README.md) is the human-facing overview.

Quick version: Next.js 15 App Router, statically exported (`output: "export"`,
`basePath: "/portfolio"`) to GitHub Pages. Single light theme, one type family,
**no client JavaScript** — every component is a static Server Component. Content
lives in `lib/data/*`. Gate: `npm run lint && npm run typecheck && npm test &&
npm run build`. Conventional Commit subjects; everything lands via a PR to `main`.
