# Portfólio — Rene Verinaud Anguita Junior

Portfólio profissional de **Engenharia de Dados**, com projetos de pipelines,
lakehouses, machine learning e otimização. Site estático em **[Astro](https://astro.build)**,
em português, voltado à apresentação do trabalho a recrutadores.

- **Publicado:** <https://rvanguita.github.io/portfolio/>
- **GitHub:** <https://github.com/rvanguita> · **LinkedIn:** <https://linkedin.com/in/rvanguita>

## Design e navegação

Direção "contrato de dados": uma **faixa** de grafite (cabeçalho, abertura e
contato) sobre um **corpo** claro de documento, com cartões. Archivo para os
títulos, IBM Plex Sans para leitura, IBM Plex Mono para tecnologias e metadados.
Fontes locais, sem CDN.

A assinatura é a **aferição tipada**: cada afirmação declara o que é — resultado
medido, arquitetura construída, publicação ou algo ainda em desenvolvimento — e
cada tipo recebe um tratamento tipográfico próprio. Um número aferido aparece
grande; um escopo construído, nunca. Uma legenda publica esse código para quem lê,
de modo que a distinção entre "medi" e "construí" seja uma posição declarada.

A abertura apresenta a especialidade, a credencial e os contatos ao lado do
diagrama da arquitetura documentada do FastF1: ingestão, Raw em Parquet,
Bronze/Silver em Delta Lake, orquestração semanal no Airflow e consumo via
FastAPI/Streamlit. Logo abaixo, uma barra de prova reúne o que se confere em
segundos — nove projetos com código aberto, 24 certificados, uma publicação e o
doutorado. FastF1, Bank Churn e Rota do Perfume aparecem em destaque; o catálogo
preserva os nove projetos e seus estudos de caso ou fichas.

As páginas de competências, trajetória e certificações complementam a apresentação.
A trajetória usa uma linha do tempo vertical. As competências priorizam Engenharia
de Dados e preservam o repertório de ML, visualização e otimização.

O tema acompanha a preferência do sistema e pode ser invertido por um controle
CSS-only. Não há JavaScript de interação no cliente. A preferência manual vale
para a página atual; não é persistida entre navegações.
O layout inclui foco visível, link para pular a navegação, controles de pelo menos
44 px, estilos de impressão e respeito à preferência por movimento reduzido.

## Estrutura

- `src/config.ts`: endereço, prefixo, idioma e navegação.
- `src/pages/`: início, projetos, nove detalhes, trajetória, competências e certificações.
- `src/content.config.ts`: schema da coleção de projetos.
- `src/content/projetos/*.md`: conteúdo e ordenação dos nove projetos.
- `src/data/`: perfil, contatos, trajetória, competências e certificações.
- `src/components/layout/`: layout, metadados, navegação, tema e rodapé.
- `src/components/panels/`: cartões de projetos, aferição tipada, legenda dos
  tipos e barra de prova.
- `src/lib/metric.ts`: o vocabulário da aferição, compartilhado pelo cartão e pela
  legenda.
- `src/components/viz/`: arquitetura FastF1 e linha do tempo; o componente Trace
  legado permanece disponível, mas não é renderizado pelo site.
- `src/styles/`: tokens semânticos e estilos compartilhados.
- `src/lib/url.ts`: links internos e URLs absolutas.
- `public/`: ícones, imagem social, dossiê e certificados em PDF.

O site é servido sob `/portfolio/`. Todo caminho interno ou de arquivo público
passa pelo helper `url()`; metadados absolutos usam `Astro.site`.
Imports entre diretórios usam aliases como `@components/`, `@data/` e `@lib/`.

## Conteúdo

- O perfil e as tecnologias em destaque ficam em `src/data/profile.ts`.
- Competências e experiências ficam em `src/data/skills.ts` e `timeline.ts`.
- Os 24 certificados ficam em `src/data/certificates.ts`, com os PDFs em
  `public/certificates/`. Os caminhos são codificados por segmento.
- Projetos `kind: full` usam o corpo Markdown; `kind: light` usam a ficha
  problema/dados/método/resultado no frontmatter.
- `order` determina a ordem do catálogo; os três primeiros aparecem na página inicial.
  Novos projetos geram automaticamente a rota e entram no sitemap.
- Resultados experimentais e projetos em desenvolvimento mantêm suas ressalvas.
  Métricas, experiência e qualificações devem se apoiar em conteúdo documentado.

## Rodar e validar

```bash
npm ci
npm run dev
npm run format:check
npm run build
npm run check
npm run preview
```

Sempre conferir também a prévia de produção em `/portfolio/`, incluindo links,
PDFs, navegação por teclado, temas e layouts de 360, 768 e 1440 px.
O build e a checagem de tipos não substituem uma verificação dos links ou do layout.

`npm run format` aplica Prettier. Arquivos públicos, relatórios gerados
`report.*.json` e alguns arquivos com formatação manual são excluídos conforme
`.prettierignore`. As cores ficam exclusivamente nos tokens, exceto estilos de
impressão e a cor do navegador nos metadados.

Node 24.20.0 no ambiente local (`mise.toml`) e no CI. Dependências e lockfile são
mantidos com npm. O site usa Astro 7, com `compressHTML: true` para preservar os
espaços entre elementos inline.

`npm run check` verifica os componentes com `astro check` e os arquivos TypeScript
com `tsc --noEmit` (TypeScript 7). Como o verificador do Astro ainda depende da API
do compilador anterior, `typescript` é um alias de `@typescript/typescript6`, e
`@typescript/native` instala o compilador TypeScript 7. Essa configuração segue a
[compatibilidade documentada pela Microsoft](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0).

## Publicar

O fluxo existente permanece no GitHub Pages: push em `main` executa
`.github/workflows/deploy.yml`, que usa `npm ci`, gera `dist/` e publica o site.

Pull requests para `main` executam `.github/workflows/ci.yml`: formatação,
build e tipos. Use PRs para integrar mudanças; não é necessária outra plataforma
de hospedagem.

## Licença

O **código** está sob a licença MIT (ver LICENSE). O **conteúdo** — textos,
currículo, certificados, imagens e PDF do dossiê — permanece reservado e não
está incluído nessa licença. Para reuso, entre em contato com o autor.
