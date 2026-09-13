# SDD — Implementação do portfólio

> **Sobre os documentos desta pasta.** Este SDD e o [PRD](./prd.md) descrevem a
> implementação **como ela é hoje**. Os arquivos `future-simple-portfolio-*.md`
> são um plano de simplificação **que não foi executado**. Onde divergirem,
> **vale o estado atual**.

## Decisão técnica

Site estático em Astro, sem framework de UI, sem roteamento no cliente e sem
JavaScript de cliente. O conteúdo vive em arquivos versionados — TypeScript para
dados estruturados, Markdown para os estudos de caso — e a apresentação é HTML
semântico com CSS.

A consequência prática: o build é a única etapa dinâmica. `astro check` e `tsc`
pegam referência quebrada antes do deploy, e uma referência inválida entre
competência e projeto **falha o build** em vez de renderizar vazio.

## Stack e versões

| Item       | Versão / decisão                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------------------ |
| Astro      | `^7.3.1`, `output` estático, `compressHTML: true`                                                                        |
| Node       | `24.20.0`, fixado em `mise.toml` e nos dois workflows                                                                    |
| TypeScript | `astro check` seguido de `tsc --noEmit`                                                                                  |
| Imagens    | `passthroughImageService()` — assets servidos direto de `public/`, sem `sharp`                                           |
| Fontes     | Archivo Variable (display), IBM Plex Sans 400/500 (corpo), IBM Plex Mono 400/500 (tecnologia e metadado), via fontsource |
| Sitemap    | `@astrojs/sitemap`                                                                                                       |
| Zod        | importado de `astro/zod`, não como dependência própria                                                                   |

`compressHTML: true` preserva os espaços entre elementos inline — por isso alguns
arquivos ficam fora do Prettier (ver "Formatação").

### Aliases

`tsconfig.json` define cinco, todos em uso: `@/`, `@components/`, `@data/`,
`@lib/`, `@styles/`. Importação entre diretórios usa alias; dentro da mesma pasta,
caminho relativo.

## Estrutura de diretórios

```
src/
  config.ts              SITE e NAV — fonte única, compartilhada com astro.config.mjs
  content.config.ts      schema Zod da coleção `projetos`
  data/                  profile, skills, timeline, certificates
  lib/                   url.ts, metric.ts
  content/projetos/      9 arquivos Markdown
  components/
    layout/              BaseHead, Layout, ReadoutStrip, ThemeToggle, Footer
    panels/              Channels, Readout, MetricLegend, Skills
    viz/                 Pipeline, Timeline
  pages/                 index, projetos/index, projetos/[slug], trajetoria,
                         competencias, certificacoes
  styles/                tokens.css, global.css
scripts/                 generate_dossier.py, check_dossier.py, dossier-content.json
public/                  assets, certificates (24 PDFs), icons, robots.txt, .nojekyll
```

## Referência de arquivos

### `src/config.ts`

`SITE` (`url`, `base`, `title`) é a fonte de `site` e `base` em
`astro.config.mjs` — não duplicar esses valores. `NAV` alimenta a navegação
compartilhada e `NavKey` tipa a página ativa.

### `src/lib/url.ts`

Duas funções, e **toda** rota interna e todo asset em `public/` passam por elas:

- `url(path)` prefixa com o `base` (`/projetos/x/` → `/portfolio/projetos/x/`);
- `absoluteUrl(pathWithBase, site)` monta canonical e `og:image`.

Um `href` interno escrito sem `url()` aponta para fora do `/portfolio/` e
quebra — e **nem `astro check` nem `tsc` pegam isso**, porque é uma string
válida. A rede de segurança é abrir `dist/` servido na base, não o build.

### `src/lib/metric.ts`

O vocabulário da aferição tipada: `MetricKind`, `METRIC_KINDS` (ordem de
leitura), `METRIC_TAG` (o termo no cartão) e `METRIC_GLOSS` (o contexto na
legenda). `Readout` e `MetricLegend` leem daqui, para que cartão e legenda não
possam divergir.

### `src/data/`

| Arquivo           | Exporta                     | Contrato                                                                                   |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| `profile.ts`      | `profile`                   | identidade, contatos, `screening` (ficha de triagem), `leadHtml`, `description`, `ogImage` |
| `skills.ts`       | `skills: SkillGroup[]`      | `title`, `summary`, `projectIds`, `items` — 4 grupos, 28 itens                             |
| `timeline.ts`     | `timeline: TimelineEntry[]` | `years`, `from`, `to`, `title`, `org`, `note?` — 9 entradas                                |
| `certificates.ts` | `certGroups`, `certTotal`   | 3 grupos, 24 itens; `file` é o caminho sob `public/certificates/`                          |

`SkillGroup.projectIds` é validado em `Skills.astro`: id inexistente lança e
falha o build. `certTotal` é derivado, nunca escrito à mão. `timeline` guarda
`from`/`to` numéricos para a página calcular o intervalo exibido.

### `src/content.config.ts`

Schema Zod da coleção `projetos`. Campos que carregam regra, não só dado:

- `kind`: `full` (corpo Markdown com os quatro beats) ou `light` (objeto `spec`
  com `problema`, `dados`, `metodo`, `resultado`). Os dois formatos coexistem;
- `metricKind`: **obrigatório e sem valor padrão**, de propósito. Só 3 dos 9
  projetos têm métrica aferida, e um padrão silencioso faria escopo e arquitetura
  passarem por resultado medido;
- `architecture`: opcional. Só os 4 projetos com fluxo em camadas real o
  declaram;
- `order`: controla o catálogo; as três primeiras entradas aparecem na home.

### Componentes e contratos de props

| Componente     | Props                                              | Papel                                            |
| -------------- | -------------------------------------------------- | ------------------------------------------------ |
| `Layout`       | `title`, `description?`, `ogType?`, `current?`     | casca das páginas, `slot="head"` para JSON-LD    |
| `BaseHead`     | `title`, `description?`, `ogType?`                 | metadados, canonical, Open Graph, theme-color    |
| `ReadoutStrip` | `current?`                                         | cabeçalho e navegação, marca a página ativa      |
| `ThemeToggle`  | —                                                  | checkbox que inverte o tema do sistema           |
| `Footer`       | —                                                  | identidade, contatos e link do dossiê            |
| `Channels`     | `projects`, `level?`, `columns?`                   | cartões de projeto; `level` controla o heading   |
| `Readout`      | `kind`, `label`, `value`, `sub?`, `class?`         | resultado tipado; decide cadeia vs. linha        |
| `MetricLegend` | —                                                  | publica os quatro tipos ao fim do catálogo       |
| `Skills`       | `compact?`                                         | capacidades; `compact` esconde os itens na home  |
| `Pipeline`     | `architecture`, `variant?`, `headingId?`, `class?` | diagrama de camadas                              |
| `Timeline`     | —                                                  | lista vertical da trajetória, `<h2>` por entrada |

`level` em `Channels` existe porque a home já gastou o `h2` no título da seção e
precisa de `h3`; o catálogo usa `h2`. É hierarquia de heading, não tamanho.

## Rotas e geração

`trailingSlash: "always"` e `build.format: "directory"` — cada rota é um
`index.html` em seu diretório. `projetos/[slug].astro` gera as nove fichas por
`getStaticPaths`, ordenando por `order` e passando `prev`/`next` para a navegação
entre projetos.

## Aferição tipada

O mecanismo que o PRD descreve como regra de produto tem três partes que precisam
concordar:

1. `metricKind` no frontmatter do projeto;
2. `METRIC_TAG` / `METRIC_GLOSS` em `src/lib/metric.ts`;
3. as regras `.metric--<kind>` em `global.css`.

`Readout` também suprime repetição na apresentação: quando o `label` ou um trecho
do `sub` repete a palavra que a etiqueta já diz, o componente esconde — sem
editar o arquivo de conteúdo.

### A rampa medalhão

Quando o `sub` de um resultado de arquitetura tem dois ou mais elos, `Readout`
renderiza uma cadeia e colore **apenas os elos que são camadas de armazenamento**,
casando o termo e nunca a posição. Duas invariantes, ambas já quebradas uma vez:

- `LAYERS` em `Readout.astro` e as regras `.chain--*` em `global.css` têm de
  cobrir os mesmos termos. Um termo em `LAYERS` sem regra correspondente sai
  classificado e sem estilo. Hoje ambos são `raw`, `bronze`, `silver`;
- a cor **reforça** um nome que o elo escreve por extenso — nunca é o único
  portador de significado. Um elo que não é camada (`propensão`, `write-back`)
  fica deliberadamente sem régua.

## Diagrama de arquitetura orientado a dados

`Pipeline.astro` não tem constante de conteúdo. Ele lê o objeto `architecture` do
frontmatter: `caption`, `orchestrator?`, `stages[]` (`layer`, `name`, `detail`,
`tech`) e `outputs[]` (`role`, `tech`).

Regras que o componente e o CSS assumem:

- **fidelidade por projeto**: nenhum diagrama mostra camada que o estudo de caso
  não descreve. Rota do Perfume vai de `bronze` a `gold` e **não tem camada
  raw**; Personal Expenses e Shopping List **não têm orquestrador** e por isso
  omitem o campo;
- **nenhum número mágico**: a grade horizontal segue a contagem real, via
  `--stage-count` e `--output-count` definidos inline pelo componente;
- as saídas não fixam `grid-row`. Coluna definida e linha automática fazem elas
  caírem na mesma linha dos estágios, tenha o projeto orquestrador ou não;
- `outputs` vazio não renderiza a lista, para não deixar conector solto.

Os cinco projetos sem fluxo em camadas **não** têm diagrama, e isso é decisão de
produto: inventar pipeline onde não há contraria a regra de fidelidade.

## Sistema de estilos

Dois arquivos: `tokens.css` (tokens) e `global.css` (componentes). Cor é definida
só em tokens; variação de componente sai de `color-mix()`.

**Quinze cores semânticas**: `paper`, `well`, `ink`, `ink-soft`, `rule`,
`rule-strong`, `accent`, `accent-bright`, `on-accent`, `signal`, `signal-open`,
`layer-raw`, `layer-bronze`, `layer-silver`, `layer-gold`.

**Quatro blocos de tema**, e todos precisam da lista idêntica:

1. `:root` — claro;
2. `@media (prefers-color-scheme: dark) :root` — escuro;
3. `:root:has(#theme-toggle:checked)` — inversão sobre sistema claro;
4. o mesmo dentro do media query escuro — inversão sobre sistema escuro.

Divergir a lista entre blocos quebra a inversão manual. O tema é CSS puro:
checkbox mais `:has()`, sem JavaScript, e o override é local à página de
propósito.

**Duas exceções documentadas** ao "cor só em tokens": os estilos de impressão e o
`theme-color` do `BaseHead` são cópias literais de `--paper` e precisam ser
atualizados quando aquele token mudar.

### A armadilha de especificidade

`.metric-chain li[class*="chain--"]` tem especificidade maior que `.chain--raw`.
Usar o atalho `border-left` na regra base fazia `currentColor` vencer e apagava a
rampa inteira — com as capturas de tela parecendo corretas. Por isso a regra base
define **largura e estilo** e a cor fica só nas regras de camada.

Aula geral: ao adicionar uma regra base com atalho, conferir se ela não vence as
regras de variação por especificidade.

## Acessibilidade

- texto a 4,5:1, bordas de controle e marcadores semânticos a 3:1, nos dois temas
  e nas duas inversões;
- corpo a partir de 16 px, controles a partir de 14 px; 12–13 px reservado a
  metadado secundário; alvo mínimo de 44 px;
- `:focus-visible` com contorno de 3 px e `outline-offset`;
- link de pulo para o conteúdo; `.sr-only` com `clip-path`;
- um `<h1>` por página, com hierarquia real de heading;
- diagrama é `<figure>` com `<ol>` — a ordem das camadas é informação, não
  estilo;
- nunca hide de overflow para esconder problema de layout.

## Metadados e SEO

`BaseHead` monta canonical com `new URL(Astro.url.pathname, Astro.site)`, Open
Graph com imagem absoluta e dimensões declaradas, Twitter card e `theme-color`
por preferência de tema.

A abertura injeta um JSON-LD `Person` — `jobTitle` em pt e en, `knowsLanguage`,
`seeks`, `knowsAbout`, `alumniOf`, `address`. **É o único script no HTML de
produção**, e é estático. O schema só declara o que a página realmente mostra.

## Dossiê em PDF

`scripts/generate_dossier.py` monta o PDF com ReportLab a partir de
`scripts/dossier-content.json`; `scripts/check_dossier.py` valida com pypdf.
Rodam por `uv`, sem venv:

```
npm run dossier:generate
npm run dossier:check
```

O check é estrutural e assertivo: **3 páginas A4**, pelo menos 7 anotações de
link, todas `/URI`, presença de termos obrigatórios e ausência de resíduo de
versões antigas. `profile.lead` é renderizado em 24 pt, então precisa ser curto —
é uma variante própria, não a `leadHtml` do site.

O manifesto duplica parte da copy do perfil de propósito, mas **isso deriva**:
mudar o site sem regenerar o PDF desalinha o currículo que a abertura promove.

## CI/CD

| Workflow     | Gatilho                  | Papel                                |
| ------------ | ------------------------ | ------------------------------------ |
| `ci.yml`     | `pull_request`, manual   | job `🔍 Lint, Types, Testes & Build` |
| `deploy.yml` | `push` em `main`, manual | build e publicação em Pages          |

A proteção da `main` exige um status check com o **nome exato** do job
(`🔍 Lint, Types, Testes & Build`). GitHub casa por `name:`, então renomear o job
deixa a PR bloqueada para sempre mesmo com CI verde.

Pages está em `build_type=workflow`: quem publica é o `deploy.yml`, não o builder
legado por branch.

## Validação

Durante o trabalho, `npm run dev`. Antes de entregar:

```
npm run format:check
npm run build          # deve gerar 14 páginas
npm run check          # astro check + tsc --noEmit
```

Build e type check **não** detectam link quebrado nem problema de layout. Por
isso, conferir também:

- `dist/` servido na base `/portfolio/` — asset fora do `url()` só falha aqui;
- ausência de overflow em 360, 768 e 1440 px. **Medir dentro de um iframe da
  largura exata**: `--window-size` do headless não entrega o viewport pedido;
- contraste nos dois temas. Duas armadilhas produzem pilhas de falso positivo: o
  fundo é pintado em `html`, não em `body`, e `getComputedStyle` devolve
  `color-mix()` como `color(srgb …)` em floats de 0 a 1, não 0 a 255;
- contagens preservadas: 9 projetos, 28 itens, 24 certificados, 14 páginas, 4
  diagramas, ordem do catálogo;
- `npm run dossier:check` quando o manifesto ou o gerador mudarem.

### Formatação

Prettier governa o código-fonte. As exclusões em `.prettierignore` são
intencionais: `src/styles/` (alinhamento de coluna feito à mão),
`src/data/certificates.ts` (entradas de uma linha), `Channels.astro` e
`certificacoes.astro` (markup sensível a espaço, onde o Prettier injetaria
whitespace que muda o render) e `report.*.json` (relatórios de diagnóstico).

**`docs/` não está excluído** — este arquivo entra no `format:check`.

## Riscos e controles

| Risco                                           | Controle                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| Link ou asset sem `url()`                       | conferir em `dist/` servido na base `/portfolio/`, nunca só em dev    |
| Divergência entre cartão e legenda de resultado | ambos leem `src/lib/metric.ts`                                        |
| Termo em `LAYERS` sem regra `.chain--*`         | tratar os dois como uma mudança só                                    |
| Lista de cores divergente entre blocos de tema  | testar as duas preferências de SO e as duas inversões                 |
| Diagrama afirmar camada inexistente             | confrontar cada diagrama com o texto do próprio caso                  |
| PDF desalinhado do site                         | regenerar e rodar `dossier:check` ao mexer na copy do perfil          |
| Renomear o job de CI                            | o nome é o contexto exigido pela proteção da `main`                   |
| PR empilhada sobre PR aberta                    | uma PR por vez contra `main`; conferir com `merge-base --is-ancestor` |

## Onde esta documentação envelhece

Primeiro nas contagens (14 rotas, 9 projetos, 28 itens, 24 certificados, 15
cores) e nas versões da tabela de stack. Depois no inventário de componentes, se
algum for criado ou removido.

**O código é a fonte da verdade.** Este documento registra decisão, contrato e
invariante — o que não se lê olhando um arquivo isolado. Ao mexer em schema,
token, workflow ou no conjunto de componentes, atualize a seção correspondente
aqui e as contagens no [PRD](./prd.md).

## Definição de pronto

Uma mudança está pronta quando `format:check`, `build` e `check` passam; quando a
revisão em `dist/` servido na base não mostra link quebrado nem overflow em 360,
768 e 1440 px nos dois temas; quando as contagens seguem intactas; quando as
ressalvas de conteúdo continuam literais; e quando nenhuma dependência, rota ou
script de cliente novo entrou sem justificativa registrada.
