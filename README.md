# Portfólio — Rene Verinaud Anguita Junior

Portfólio profissional de **Engenharia de Dados**, com projetos de pipelines,
lakehouses, machine learning e otimização. Site estático em **[Astro](https://astro.build)**,
em português, voltado à apresentação do trabalho a recrutadores.

- **Publicado:** <https://rvanguita.github.io/portfolio/>
- **GitHub:** <https://github.com/rvanguita> · **LinkedIn:** <https://linkedin.com/in/rvanguita>

## Design e navegação

Direção clara e sofisticada: fundo azul muito claro, superfícies brancas,
títulos em azul-marinho e azul para ações. Archivo nos títulos, IBM Plex Sans
na leitura e IBM Plex Mono em tecnologias e dados técnicos. Fontes locais, sem CDN.

A abertura apresenta a especialidade, a credencial e os contatos ao lado do
FastF1. Seu diagrama documenta a ingestão, Raw em Parquet, Bronze/Silver em
Delta Lake, orquestração semanal no Airflow e consumo via FastAPI/Streamlit.
O nome é acompanhado de um retrato pequeno apenas quando há uma foto no perfil;
nenhum espaço é reservado para uma imagem ausente.

Os três primeiros projetos da coleção aparecem na página inicial: FastF1 na
abertura, Bank Churn e Rota do Perfume nos cartões seguintes. O catálogo mantém
os nove projetos e sua ordem. Cartões apresentam até cinco tecnologias principais;
a ficha mantém a lista completa.

Os resultados continuam contextualizados: **Resultado em teste**, **Arquitetura
implementada**, **Publicação** e **Em desenvolvimento**. Apenas resultados medidos
recebem números em destaque. A legenda fica ao final do catálogo; métricas e
ressalvas permanecem junto aos projetos.

A página inicial resume os quatro grupos de competências com links para exemplos
concretos. A página de competências conserva todos os 28 itens. Formação e
certificações têm um resumo conjunto na home; trajetória completa e os 24
certificados continuam em suas páginas próprias.

O tema acompanha a preferência do sistema e pode ser invertido por um controle
CSS-only. Não há JavaScript de interação no cliente. A preferência manual vale
para a página atual; não é persistida entre navegações.
O layout inclui foco visível, link para pular a navegação, controles de pelo menos
44 px, estilos de impressão e respeito à preferência por movimento reduzido.
No celular, o cabeçalho acompanha a rolagem para não ocupar a área de leitura.

## Estrutura

- `src/config.ts`: endereço, prefixo, idioma e navegação.
- `src/pages/`: início, projetos, nove detalhes, trajetória, competências e certificações.
- `src/content.config.ts`: schema da coleção de projetos.
- `src/content/projetos/*.md`: conteúdo e ordenação dos nove projetos.
- `src/data/`: perfil, contatos, trajetória, competências e certificações.
- `src/components/layout/`: layout, metadados, navegação, tema e rodapé.
- `src/components/panels/`: cartões, resultados contextualizados, legenda e
  competências com referências aos projetos.
- `src/lib/metric.ts`: o vocabulário da aferição, compartilhado pelo cartão e pela
  legenda.
- `src/components/viz/`: arquitetura FastF1 e linha do tempo.
- `src/styles/`: tokens semânticos e estilos compartilhados.
- `src/lib/url.ts`: links internos e URLs absolutas.
- `public/`: ícones, imagem social, dossiê e certificados em PDF.

O site é servido sob `/portfolio/`. Todo caminho interno ou de arquivo público
passa pelo helper `url()`; metadados absolutos usam `Astro.site`.
Imports entre diretórios usam aliases como `@components/`, `@data/` e `@lib/`.

## Conteúdo

- O perfil e as tecnologias em destaque ficam em `src/data/profile.ts`.
- Competências e experiências ficam em `src/data/skills.ts` e `timeline.ts`.
  Cada `SkillGroup` inclui `summary`, `projectIds` e a lista integral `items`.
  Referências a projetos inexistentes fazem o build falhar.
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

O dossiê profissional é gerado de forma reproduzível a partir de
`scripts/dossier-content.json`. Para regenerar e validar o PDF, instale as
dependências listadas em `requirements-pdf.txt` e execute `npm run dossier:generate`
seguido de `npm run dossier:check`. O arquivo publicado permanece em
`public/assets/dossie-rene-anguita.pdf`.

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
