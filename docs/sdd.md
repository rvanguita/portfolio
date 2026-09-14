# SDD — Implementação do portfólio

> **Sobre os documentos desta pasta.** Este SDD e o [PRD](./prd.md) são os
> documentos vigentes e descrevem a implementação **como ela é hoje**.
> [`historico/`](./historico/) guarda o plano de simplificação, avaliado e
> atendido. Onde a letra dele divergir do que está aqui, **vale o estado atual**.

## Decisão técnica

Site estático em Astro, sem framework de UI, sem roteamento no cliente e sem
JavaScript de cliente. O conteúdo vive em arquivos versionados — TypeScript para
dados estruturados, Markdown para os estudos de caso — e a apresentação é HTML
semântico com CSS.

A consequência prática: o build é a única etapa dinâmica. `astro check` e `tsc`
pegam referência quebrada antes do deploy, e uma referência inválida entre
competência e projeto **falha o build** em vez de renderizar vazio.

## Stack e versões

| Item       | Versão / decisão                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Astro      | `^7.3.1`, `compressHTML: true`. `output` não é declarado — estático é o padrão                                                               |
| Node       | `24.20.0`, fixado em `mise.toml` e nos dois workflows                                                                                        |
| TypeScript | `astro check` seguido de `tsc --noEmit`                                                                                                      |
| Imagens    | `passthroughImageService()` — assets servidos direto de `public/`, sem `sharp`                                                               |
| Fontes     | Archivo Variable no eixo de **peso** (display), IBM Plex Sans 400/500 (corpo), IBM Plex Mono 400/500 (tecnologia e metadado), via fontsource |
| Sitemap    | `@astrojs/sitemap`                                                                                                                           |
| Zod        | importado de `astro/zod`, não como dependência própria                                                                                       |

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
                         competencias, certificacoes, 404
  styles/                tokens.css, global.css
tests/                   suíte de invariantes (node:test), lida contra dist/
scripts/                 generate_dossier.py, check_dossier.py, check_links.mjs,
                         dossier-content.json
                         (as dependências vêm de requirements-pdf.txt, na raiz)
public/                  assets, certificates (24 PDFs), icon.svg, icon.png,
                         robots.txt, .nojekyll
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
| `skills.ts`       | `skills: SkillGroup[]`      | `title`, `summary`, `projectIds`, `items: SkillItem[]` — 4 grupos, 29 itens                |
| `timeline.ts`     | `timeline: TimelineEntry[]` | `years`, `from`, `to`, `title`, `org`, `note?` — 9 entradas                                |
| `certificates.ts` | `certGroups`, `certTotal`   | 3 grupos, 24 itens; `file` é o caminho sob `public/certificates/`                          |

`SkillGroup.projectIds` e `SkillItem.projectIds` são validados em `Skills.astro`: id
inexistente lança e falha o build. Cada item lista os projetos que o demonstram, em
ordem de catálogo, e o elo aponta para o primeiro — o de maior prioridade. Item com
`projectIds` vazio renderiza sem elo, de propósito: é a diferença entre não ter
evidência publicada e ter evidência forjada.

O elo estende a área de toque na vertical com padding e margem negativa, chegando aos
44 px que a seção de acessibilidade exige sem engordar a etiqueta — a menor delas
ainda recebe `min-width`, senão ficaria em 43 px. `certTotal` é derivado, nunca escrito à mão. `timeline` guarda
`from`/`to` numéricos para a página calcular o intervalo exibido.

### `src/content.config.ts`

Schema Zod da coleção `projetos`. Campos que carregam regra, não só dado:

- `kind`: `full` (corpo Markdown com os quatro beats) ou `light` (objeto `spec`
  com `problema`, `dados`, `metodo`, `resultado`). Os dois formatos coexistem, e
  um `superRefine` amarra os dois campos: `spec` continua opcional no objeto,
  porque `full` não a usa, mas falta dela num `light` é erro de schema. Sem isso
  um `light` sem ficha publicaria quatro `<dd>` vazios e passaria no build;
- `metricKind`: **obrigatório e sem valor padrão**, de propósito. Só 3 dos 9
  projetos têm métrica aferida, e um padrão silencioso faria escopo e arquitetura
  passarem por resultado medido;
- `architecture`: opcional. Só os 4 projetos com fluxo em camadas real o
  declaram;
- `order`: controla o catálogo; as três primeiras entradas aparecem na home;
- `periodo` e `atualizadoEm`: o intervalo de trabalho para exibição e a data em ISO
  para máquina. São dois campos porque servem a coisas diferentes — `periodo` é um
  intervalo ("2024–25") e o `lastmod` do sitemap precisa de timestamp. Ambos vêm da
  data real dos repositórios do projeto, pela API do GitHub, e nunca de estimativa;
  projetos com mais de um repositório usam o intervalo que cobre todos.

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

**O 404 é a exceção, e de propósito.** Astro trata `/404` como página de código de
status (`STATUS_CODE_PAGES`, em `core/build/common.js`) e emite `dist/404.html` na
raiz, **não** `dist/404/index.html` — que é exatamente o arquivo que o GitHub Pages
serve para endereço inexistente. Por isso o build informa 15 páginas enquanto o site
tem 14 rotas navegáveis: o 404 não é rota, não entra no sitemap e não conta nas
contagens que os documentos publicam.

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

`Pipeline.astro` não tem constante de conteúdo **por projeto**. Ele lê o objeto
`architecture` do frontmatter: `caption`, `orchestrator?`, `stages[]` (`layer`,
`name`, `detail`, `tech`) e `outputs[]` (`role`, `tech`). As três strings fixas
do componente são rótulos de chrome — "Fluxo de dados", e os dois `aria-label`
das listas — e são genéricas de propósito: nomear a arquitetura ali afirmaria,
para quem usa leitor de tela, uma camada que dois dos quatro casos não têm.

Regras que o componente e o CSS assumem:

- **fidelidade por projeto**: nenhum diagrama mostra camada que o estudo de caso
  não descreve. Rota do Perfume vai de `bronze` a `gold` e **não tem camada
  raw**; Personal Expenses e Shopping List **não têm orquestrador** e por isso
  omitem o campo;
- **nenhum número mágico**: as grades seguem a contagem real, via `--stage-count`
  e `--output-count` definidos inline pelo componente. Cada variável governa o
  layout a que pertence, e nenhuma alcança o outro: `--output-count` está na
  regra base de `.pipeline-outputs`, mas a variante `full` sobrescreve
  `grid-template-columns` dentro de `@media (min-width: 70rem)`, e ali ele deixa
  de valer; `--stage-count` só é usado nessa mesma variante horizontal;
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

O sitemap emite `lastmod` **por ficha de projeto**, com a data real do repositório
(`atualizadoEm` no frontmatter). As outras cinco rotas não levam `lastmod`: não há
fonte honesta para elas, e uma data de build serviria para todas ao mesmo tempo — o
que diria ao robô que tudo mudou quando só uma página mudou. O `serialize` lê o
frontmatter direto do disco, porque o sitemap é montado fora da camada de conteúdo.

`BaseHead` monta canonical com `new URL(Astro.url.pathname, Astro.site)`, Open
Graph com imagem absoluta e dimensões declaradas, Twitter card e `theme-color`
por preferência de tema.

A abertura injeta um JSON-LD `Person` — `jobTitle` em pt e en, `knowsLanguage`,
`seeks`, `knowsAbout`, `alumniOf`, `address`. **É o único script no HTML de
produção da abertura**, e é estático. Cada ficha de projeto injeta o seu próprio
`SoftwareSourceCode` pelo mesmo `slot="head"`, montado do frontmatter que a página já
renderiza — nome, resumo, stack, categoria, tipo de resultado e repositório. O invariante
que vale para todo o build é de **tipo**, não de contagem: todo `<script>` é
`application/ld+json`, e a suíte reprova qualquer script executável.

A regra do `knowsAbout`: só entra capacidade que o
site evidencia. O sinônimo em inglês do que já aparece em português é aceito —
`Data Engineering` ao lado de "Engenharia de Dados", `Apache Spark` ao lado de
`PySpark` —, porque é assim que o leitor procura. Capacidade sem lastro no texto
visível, não: `ETL` e `Pipelines de Dados` saíram por isso.

## Dossiê em PDF

`scripts/generate_dossier.py` monta o PDF com ReportLab a partir de
`scripts/dossier-content.json`; `scripts/check_dossier.py` valida com pypdf.
Rodam por `uv`, sem venv:

```
npm run dossier:generate
npm run dossier:check
```

O `Canvas` recebe `invariant=1`, que congela data de criação e IDs internos: duas
gerações seguidas do mesmo manifesto saem **byte a byte idênticas**. É o que permite ao
CI regenerar e exigir árvore limpa — sem isso, o PDF mudaria a cada execução e não
haveria como distinguir "manifesto alterado sem regenerar" de "gerado agora".

O check é estrutural e assertivo: **3 páginas A4**, pelo menos 7 anotações de
link, todas `/URI`, presença de termos obrigatórios e ausência de resíduo de
versões antigas. `profile.lead` é renderizado em 24 pt, então precisa ser curto —
é uma variante própria, não a `leadHtml` do site.

O manifesto duplica parte da copy do perfil de propósito, mas **isso deriva**:
mudar o site sem regenerar o PDF desalinha o currículo que a abertura promove.

Na página de projetos do dossiê, os cartões têm 64 mm de altura. Cada link para
o GitHub começa 2 mm abaixo do fim calculado do parágrafo de tecnologias; não
usa uma posição independente que possa sobrepor o texto.

## CI/CD

| Workflow     | Gatilho                  | Papel                                  |
| ------------ | ------------------------ | -------------------------------------- |
| `ci.yml`     | `pull_request`, manual   | job `🔍 Lint, Types, Testes & Build`   |
| `deploy.yml` | `push` em `main`, manual | build e publicação em Pages            |
| `links.yml`  | semanal, manual          | confere os links externos dos projetos |

O `ci.yml` roda, nesta ordem: `format:check`, `build`, `check`, `test`,
`dossier:check` e `dossier:generate` seguido de `git diff --exit-code`. A suíte vem
depois do `build` porque lê `dist/`. O `uv` é instalado no job por `astral-sh/setup-uv`,
para os scripts do dossiê.

Os dois últimos passos se complementam: o `dossier:check` pega um PDF estruturalmente
quebrado, mas **não compara o PDF com o manifesto** — ele nunca abre o JSON. Quem pega
copy alterada sem regenerar é o `git diff` depois do `dossier:generate`, possível porque
o gerador é determinístico.

O `links.yml` fica **fora do caminho da PR** de propósito: mergear não pode depender da
rede de terceiros. A quebra que ele vigia não vem de commit — vem de alguém renomear,
arquivar ou tornar privado um repositório.

Todas as Actions são fixadas por **SHA**, com a versão em comentário ao lado. Tag é
ponteiro móvel, e o `deploy.yml` roda com `pages: write` e `id-token: write`. Para que
fixar não vire congelar, o `.github/dependabot.yml` acompanha `github-actions` e `npm`
mensalmente, agrupando os cinco pacotes de fonte numa PR só.

A proteção da `main` exige um status check com o **nome exato** do job
(`🔍 Lint, Types, Testes & Build`). GitHub casa por `name:`, então renomear o job
deixa a PR bloqueada para sempre mesmo com CI verde. Acrescentar passo ao job é
seguro; mexer no `name:` não.

Pages está em `build_type=workflow`: quem publica é o `deploy.yml`, não o builder
legado por branch.

## Validação

Durante o trabalho, `npm run dev`. Antes de entregar:

```
npm run format:check
npm run build          # deve gerar 14 páginas
npm run check          # astro check + tsc --noEmit
npm test               # invariantes, lidos contra dist/
```

### A suíte de invariantes

`tests/*.test.mjs`, com o runner nativo do Node — **sem dependência nova**. Lê `dist/`,
não os fontes, porque vários invariantes só existem depois do build: o CSS é um bundle, o
JSON-LD é serializado e os links já carregam o prefixo da base. Por isso roda depois do
`build`, e por isso `npm run build` é pré-requisito.

Ela existe porque todo invariante deste documento que já quebrou foi pego por auditoria
humana, nunca pelo pipeline. Cobre hoje:

| Arquivo            | O que guarda                                                                                                                                                                                                |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles.test.mjs`  | as 15 cores nos cinco lugares; `theme-color` ≡ `--paper`; `LAYERS` ≡ `.chain--*`; a regra base da cadeia sem o atalho `border-left`; cada `metricKind` com a sua regra; movimento só dentro do guard        |
| `content.test.mjs` | as contagens publicadas; certificado referenciado existindo em `public/`; fidelidade dos diagramas; `knowsAbout` com lastro no texto visível; as quatro ressalvas literais; "pleno" só como cargo procurado |
| `html.test.mjs`    | base em toda referência interna; toda referência resolvendo para arquivo real; um único `<script>`, e só na abertura; um `<h1>` por página sem pular nível; canonical e título próprio por página           |

Três detalhes que custaram tempo e não devem ser refeitos: os blocos de tema são varridos
**contando chaves**, porque dois deles ficam aninhados no `@media` escuro e expressão
regular não alcança; o Markdown quebra linha no meio das frases, então as ressalvas são
casadas com o espaço normalizado; e os links passam por `decodeURIComponent` antes do
teste de existência, senão os 24 PDFs de certificado dão 24 falsos positivos.

Quando um invariante novo entrar aqui, **quebre-o de propósito uma vez** e confirme que o
teste reprova. Um teste que nunca viu vermelho não é uma guarda.

Build, type check e a suíte **não** detectam problema de layout nem link externo morto.
Por isso, conferir também:

- `dist/` servido na base `/portfolio/` — asset fora do `url()` só falha aqui;
- ausência de overflow em 360, 768 e 1440 px. **Medir dentro de um iframe da
  largura exata**: `--window-size` do headless não entrega o viewport pedido;
- primeira tela da home em 360×800, 768×800 e 1440×800 px: identidade,
  filtros de contratação, declaração de evidência e as três ações da abertura
  inteiramente visíveis no tamanho padrão de texto. Com texto ampliado, aceitar
  rolagem vertical e verificar acesso e ausência de overflow horizontal;
- contraste nos dois temas. Duas armadilhas produzem pilhas de falso positivo: o
  fundo é pintado em `html`, não em `body`, e `getComputedStyle` devolve
  `color-mix()` como `color(srgb …)` em floats de 0 a 1, não 0 a 255;
- contraste de bordas após o fim das transições do tema, incluindo os links de
  projeto anterior/próximo; alvos da navegação com pelo menos 44×44 px;
- a ordem do catálogo — as contagens já são responsabilidade da suíte;
- a geometria do dossiê. O `dossier:check` é textual e estrutural e o CI ainda pega
  divergência com o manifesto, mas **nenhum dos dois afere sobreposição**: depois de
  mexer no gerador, conferir as 3 páginas à vista.

### Formatação

Prettier governa o código-fonte. O `.prettierignore` tem dez entradas. Cinco são
as previsíveis — `dist/`, `.astro/`, `node_modules/`, `package-lock.json` e
`public/`. As outras cinco carregam decisão: `src/styles/` (alinhamento de coluna
feito à mão), `src/data/certificates.ts` (entradas de uma linha de propósito),
`src/components/panels/Channels.astro` e `src/pages/certificacoes.astro` (markup
sensível a espaço, onde o Prettier injetaria whitespace que muda o render) e
`report.*.json` (relatórios de diagnóstico gerados).

**`docs/` não está excluído** — este arquivo entra no `format:check`.

## Riscos e controles

Os riscos com **teste** ao lado deixaram de depender de alguém lembrar: reprovam a PR
sozinhos. Os demais continuam sendo disciplina.

| Risco                                           | Controle                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------- |
| Link ou asset sem `url()`                       | **teste** (`html.test.mjs`) — `astro check` e `tsc` não pegam                   |
| Divergência entre cartão e legenda de resultado | ambos leem `src/lib/metric.ts`; **teste** confere kind ↔ regra                  |
| Termo em `LAYERS` sem regra `.chain--*`         | **teste** (`styles.test.mjs`), incluindo o atalho `border-left`                 |
| Lista de cores divergente entre blocos de tema  | **teste** cobre os cinco lugares; revisão visual segue valendo para a aparência |
| Diagrama afirmar camada inexistente             | **teste** (`content.test.mjs`) confronta cada camada com o texto do caso        |
| Metadado afirmando o que a página não mostra    | **teste** confere `knowsAbout` contra o texto visível                           |
| Ressalva de honestidade removida sem querer     | **teste** exige as quatro literais e "pleno" só como cargo procurado            |
| PDF desalinhado do manifesto                    | **CI** regenera e exige árvore limpa; sobreposição ainda é revisão visual       |
| Repositório de projeto renomeado ou privado     | `links.yml`, semanal — fora do caminho da PR, de propósito                      |
| Action com tag reapontada                       | fixadas por SHA; Dependabot reabre para não congelar                            |
| Renomear o job de CI                            | o nome é o contexto exigido pela proteção da `main`                             |
| PR empilhada sobre PR aberta                    | uma PR por vez contra `main`; conferir com `merge-base --is-ancestor`           |

## Evolução técnica proposta

**Nada nesta seção está implementado.** As seções anteriores descrevem o que existe;
aqui ficam as mudanças técnicas propostas, com o critério que diz quando cada uma está
pronta. Medições de 14/09/2026.

Quatro itens saíram daqui por terem sido implementados — a suíte de invariantes, a
vigilância dos links externos, o dossiê determinístico e as Actions fixadas por SHA. O
que eles fazem hoje está descrito em "Validação" e em "CI/CD".

### 1. Preload da fonte crítica — não feito, e por quê

A abertura não emite `rel="preload"`, então a Archivo do título só é descoberta depois
que o CSS baixa e é parseado.

Este item ficou parado de propósito. O critério dele exige número medido antes e depois,
e a troca do eixo mudou a conta: o arquivo caiu de 87 para 34 KB, então o atraso que o
preload evitaria é bem menor do que era quando o item foi escrito. Somando a isso que o
`font-display` do fontsource já pinta o texto na fonte de recurso, o ganho restante é de
LCP e estabilidade, não de conteúdo visível.

Medir isso exige ferramenta de performance de verdade — Lighthouse ou o protocolo de
devtools —, não captura de tela. Aplicar sem medir seria seguir a reputação da técnica,
que é exatamente o que o critério proíbe.

_Aceite:_ entra com número de LCP antes e depois, nos três viewports da métrica de
primeira tela. Sem esse número, não entra.

## Onde esta documentação envelhece

Primeiro nas contagens (14 rotas, 9 projetos, 29 itens, 24 certificados, 15
cores) e nas versões da tabela de stack. Depois no inventário de componentes, se
algum for criado ou removido.

**O código é a fonte da verdade.** Este documento registra decisão, contrato e
invariante — o que não se lê olhando um arquivo isolado. Ao mexer em schema,
token, workflow ou no conjunto de componentes, atualize a seção correspondente
aqui e as contagens no [PRD](./prd.md).

## Definição de pronto

Uma mudança está pronta quando `format:check`, `build`, `check` e `test` passam; quando a
revisão em `dist/` servido na base não mostra link quebrado nem overflow em 360,
768 e 1440 px nos dois temas; quando as contagens seguem intactas; quando as
ressalvas de conteúdo continuam literais; e quando nenhuma dependência, rota ou
script de cliente novo entrou sem justificativa registrada.
