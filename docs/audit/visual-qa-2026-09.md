# QA visual — Desktop / Mobile (2026-09)

Fecha os itens **`Desktop validado`** e **`Mobile validado`** da Task 013.

Captura headless (Chrome via `puppeteer-core`) contra o export estático servido
sob `/portfolio`, nos dois temas e em 7 larguras. Não substitui um olhar humano
nos screenshots (em `lighthouse-report/` do CI e anexados ao PR), mas verifica de
forma reproduzível os invariantes que um restyle costuma quebrar.

## Matriz

| Largura | Alvo | overflow-x | Tema claro | Tema escuro |
|---:|---|---|---|---|
| 320 | home | nenhum | ok | ok |
| 375 | home | nenhum | ok | ok |
| 414 | home | nenhum | ok | ok |
| 768 | home | nenhum | ok | ok |
| 820 | home (colapso do menu) | nenhum | ok | ok |
| 1280 | home | nenhum | ok | ok |
| 1680 | home | nenhum | ok | ok |
| 390 / 1280 | estudo de caso `wind-farm` | nenhum | ok | ok |
| 390 / 1280 | estudo de caso `lake-fastf1` | nenhum | ok | ok |

## Verificado

* **Sem scroll horizontal** em 320–1680 px, nos dois temas, nas 3 páginas
  (`documentElement.scrollWidth ≤ clientWidth`).
* **Tema** — `prefers-color-scheme` e o toggle manual (`localStorage`) aplicam
  `data-theme` corretamente; paletas clara e escura íntegras. O `<script>`
  anti-FOUC roda (sem `SyntaxError` — ver `docs/adr/project/008` e o fix do
  script).
* **Sem erros no console** em nenhuma combinação (PRD §30).
* **Menu mobile** — o hambúrguer abre (`aria-expanded=true`) e lista CH1–CH6 em
  todas as larguras ≤ 820 px.
* **Avatar do Hero** carrega (`img.complete && naturalWidth > 0`) — sem
  regressão de `basePath`.
* **Estudos de caso** — diagrama `<pre role="img">` e `<table><caption>`
  presentes; ações (GitHub / dataset / notebook) e tabela de stack renderizam.
* **Hierarquia / espaçamento** — navbar (CH0 + canais), Hero (tagline âmbar,
  CTAs, waveform), tiles de leitura, seções Perfil / Habilidades / Projetos
  (destaque + `<details>`) / Experiência / Formação / Certificações e footer
  consistentes nos dois temas.

## Corrigido neste passe (a QA encontrou)

* **Navbar transbordava abaixo de ~408 px** (iPhone SE / mini): logo + toggle +
  botão "Contato" + hambúrguer não cabiam. Em ≤ 820 px o `.btn-nav-contact` some
  e o `.nav-container` aperta gap/padding. `commit fix(nav)`.
* **`SyntaxError` no script anti-FOUC** e **contraste < WCAG AA no tema claro** —
  ver `docs/adr/project/003` (emenda) e `008`.

## Contraste + Lighthouse (mediana de 3, 2026-09)

`color-contrast` (axe) = 0 falhas após o ajuste de tokens.

| Rota | Performance (mobile / desktop) | A11y | Best Practices | SEO |
|---|---|---|---|---|
| home | 93 / 100 | 100 | 100 | 100 |
| `wind-farm` | 94 / 100 | 100 | 100 | 100 |
| `lake-fastf1` | 96 / 100 | 100 | 100 | 100 |

Performance móvel oscila na casa dos baixos 90 entre execuções (mediana de 95 e
93 em duas rodadas). Fica acima do limite de 90 do CI, com folga pequena na home
— uma queda futura deve ser tratada com otimização de LCP, não baixando o limite
(ADR-008). Relatórios completos em `lighthouse-report/`.

## Validação de produção

Validada em 2026-09-02 nas rotas públicas da home e dos dois estudos de caso:
HTTP 200, canonical, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`
presentes. A verificação foi feita contra o artefato publicado no GitHub Pages.
