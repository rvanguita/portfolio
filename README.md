# Portfólio — Rene Verinaud Anguita Junior

Página pessoal de Rene Verinaud Anguita Junior (Cientista de Dados, Ph.D. em
Engenharia Elétrica). Site estático construído com **[Astro](https://astro.build)**.

- **Publicado:** <https://rvanguita.github.io/portfolio/>
- **GitHub:** <https://github.com/rvanguita> · **LinkedIn:** <https://linkedin.com/in/rvanguita>

## Conceito

Um **painel de leitura** — o site se lê como o painel frontal de um instrumento
de precisão: cada página é um painel, a métrica-chave de cada projeto aparece
como uma leitura numérica grande com unidade, traços de sinal (SVG inline)
ecoam cada resultado, e uma barra fixa no topo carrega a identidade e a
navegação. Acento ciano, hairlines, tipografia IBM Plex (Sans + Mono).
Tema claro/escuro com alternância em CSS puro, sem JavaScript no cliente.

## Estrutura

```
portfolio/
│
├─ astro.config.mjs          site + base vindos de src/config.ts, sitemap
├─ package.json              scripts: dev · build · preview · check · format
├─ tsconfig.json             aliases de import (@/ @components @data @lib @styles)
├─ mise.toml                 fixa a versão do Node no dev local
├─ .prettierrc · .editorconfig · .vscode/   formatação e convenções de editor
├─ LICENSE                   MIT — só o código; conteúdo reservado
│
├─ src/
│  ├─ config.ts                   SITE (url, base, título) + NAV — o lugar único
│  ├─ pages/
│  │  ├─ index.astro              home — o "painel mestre"
│  │  ├─ projetos/index.astro     índice de projetos
│  │  ├─ projetos/[slug].astro    uma página por projeto (da coleção)
│  │  ├─ trajetoria.astro         Gantt do CV num eixo de tempo real
│  │  ├─ competencias.astro       4 painéis de competência
│  │  └─ certificacoes.astro      medidor 12/9/3 + listas agrupadas
│  ├─ content.config.ts           schema zod da coleção 'projetos'
│  ├─ content/projetos/*.md       9 projetos — kind: full (corpo Markdown) | light (spec)
│  ├─ data/                       profile · timeline · skills · certificates (todo o texto)
│  ├─ components/
│  │  ├─ layout/                  Layout · BaseHead · ReadoutStrip · ThemeToggle · Footer
│  │  ├─ panels/                  Channels (grade de projetos) · Readout (métrica grande)
│  │  └─ viz/                     Trace (sinal SVG inline) · Timeline (Gantt)
│  ├─ lib/url.ts                   url() — prefixa todo href interno com o base
│  └─ styles/                      tokens.css (8 cores/tema) + global.css
│
├─ public/                        servido verbatim
│  ├─ icon.svg · icon.png         favicon
│  ├─ robots.txt · .nojekyll
│  ├─ assets/                     social-card.png · dossiê.pdf
│  └─ certificates/               24 PDFs
│
└─ .github/
   ├─ workflows/ci.yml            PR → npm ci && format:check && build && check
   ├─ workflows/deploy.yml        push em main → build → GitHub Pages
   └─ dependabot.yml · PULL_REQUEST_TEMPLATE.md
```

O site é servido sob `/portfolio/`. Todo link interno passa pelo helper
`src/lib/url.ts` para ganhar esse prefixo; URLs absolutas (canonical, Open
Graph) usam `Astro.site`. Imports usam aliases (`@components/…`, `@data/…`) —
sem `../../`.

## Conteúdo

Todo o texto do site mora em dados estruturados, não no HTML:

- `src/data/profile.ts` — perfil, contato, disponibilidade
- `src/data/timeline.ts` — as 9 entradas da trajetória, com o eixo de tempo
- `src/data/skills.ts` — os 4 grupos de competências
- `src/data/certificates.ts` — as 24 certificações, em 3 grupos (12 / 9 / 3)
- `src/content/projetos/*.md` — os 9 projetos. `kind: full` traz o estudo de
  caso completo no corpo Markdown; `kind: light` traz só a ficha
  problema/dados/método/resultado no frontmatter.

## Rodar localmente

```bash
npm install
npm run dev        # desenvolvimento (rápido)
npm run build && npm run preview   # confere o site sob /portfolio/
npm run check      # astro check (tipos)
npm run format     # Prettier (--write); `format:check` só verifica
```

Node: `mise.toml` fixa a versão para o desenvolvimento local; o CI usa Node 20.

## Publicar

Push em `main` → `.github/workflows/deploy.yml` roda `npm ci && npm run build` e
publica `dist/` no GitHub Pages. Pull requests para `main` passam por
`.github/workflows/ci.yml` (`npm ci && npm run format:check && npm run build &&
npm run check`): formatação fora do padrão, link interno quebrado, violação de
schema de conteúdo ou erro de tipo derrubam o check. A proteção da branch `main`
exige esse check. O `dependabot.yml` abre PRs semanais de atualização de deps.

## Licença

O **código** está sob a licença MIT (ver `LICENSE`). O **conteúdo** — textos,
currículo, certificados, imagens e o PDF do dossiê — não está sob essa licença e
permanece reservado; para reuso, entre em contato com o autor.
