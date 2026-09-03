# Portfólio técnico

Portfólio profissional de Rene Verinaud Anguita Junior, desenvolvido para apresentar sua atuação em Ciência de Dados, Machine Learning, otimização e engenharia de dados.

O site é totalmente estático, responsivo e escrito em pt-BR. Ele foi projetado para funcionar como portfólio profissional no GitHub Pages, sem backend, banco de dados ou infraestrutura paga.

## Acesso

- **Site publicado:** <https://rvanguita.github.io/portfolio/>
- **GitHub:** <https://github.com/rvanguita>
- **LinkedIn:** <https://linkedin.com/in/rvanguita>

## O que o site apresenta

O portfólio é uma página única em coluna, no formato de um dossiê, com páginas dedicadas a dois projetos:

- apresentação profissional e contato;
- projetos, com desafio, solução e tecnologias;
- trajetória (formação e experiência numa linha do tempo única);
- competências em Ciência de Dados, Machine Learning, otimização, analytics e engenharia de dados;
- certificados em PDF;
- links para GitHub, LinkedIn e os dois estudos de caso.

Os estudos de caso estão disponíveis em:

- [`/projects/lake-fastf1/`](https://rvanguita.github.io/portfolio/projects/lake-fastf1/)
- [`/projects/wind-farm/`](https://rvanguita.github.io/portfolio/projects/wind-farm/)

## Stack e decisões técnicas

- **Next.js 15** com App Router;
- **React 19** e **TypeScript**;
- CSS próprio em `app/globals.css` (folha plana, ~180 linhas, tema claro único, coluna única);
- uma família tipográfica (**Newsreader**), via `next/font`;
- **sem JavaScript de cliente** — todos os componentes são Server Components estáticos;
- exportação estática (`output: "export"`), gerando a pasta `out/`;
- Vitest e Testing Library para testes;
- GitHub Actions para CI e deploy; GitHub Pages para hospedagem.

O `basePath` do Next.js está configurado como `/portfolio`, pois o site é publicado em um repositório de projeto do GitHub Pages. Não há servidor em produção.

## Requisitos

- Node.js **22.12 ou superior** (fixado em `.tool-versions`);
- npm.

## Executar localmente

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/rvanguita/portfolio.git
cd portfolio
npm ci
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra <http://localhost:3000/portfolio/> no navegador. O servidor recarrega a página automaticamente enquanto os arquivos são alterados.

Para executar uma compilação equivalente à publicação:

```bash
npm run build
```

O resultado será gerado em `out/`. Essa pasta é um artefato de build e não deve ser versionada.

## Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Gera o site estático em `out/`. |
| `npx serve out` | Serve localmente a pasta estática gerada por `npm run build`. |
| `npm run lint` | Executa o ESLint. |
| `npm run typecheck` | Verifica os tipos TypeScript sem gerar arquivos. |
| `npm test` | Executa os testes uma vez. |
| `npm run test:watch` | Executa os testes em modo de observação. |

Antes de abrir um pull request, execute:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Como atualizar o conteúdo

O conteúdo profissional fica centralizado em arquivos TypeScript para evitar textos duplicados entre componentes. Os principais pontos de edição são:

| Arquivo | Conteúdo |
| --- | --- |
| [`lib/data/profile.ts`](lib/data/profile.ts) | Nome, título, apresentação, localização, e-mail e redes profissionais. |
| [`lib/data/projects.ts`](lib/data/projects.ts) | Projetos, tecnologias e links (descrições qualitativas). |
| [`lib/data/skills.ts`](lib/data/skills.ts) | Grupos de competências técnicas. |
| [`lib/data/timeline.ts`](lib/data/timeline.ts) | Experiência e formação (fundidas na trajetória). |
| [`lib/data/certificates.ts`](lib/data/certificates.ts) | Certificados e caminhos dos PDFs publicados. |
| `public/` | Ícone, card social e certificados estáticos. |

Os blocos da página ficam em `components/` (`Intro`, `Projetos`, `Trajetoria`, `Competencias`, `Certificacoes`), compostos em `app/page.tsx`. Ao adicionar um certificado, coloque o PDF em `public/certificates/` e registre seu caminho em `lib/data/certificates.ts`.

Não inclua credenciais, tokens ou dados pessoais locais no repositório. O `.gitignore` já exclui arquivos como `Profile.pdf`, dependências e artefatos de build.

## Testes e qualidade

Os testes cobrem a estrutura das seções, a acessibilidade (headings, `aria-labelledby`) e os links internos e externos. Eles estão em `tests/`.

O pipeline de CI executa, em pull requests para `main`, ESLint, verificação de tipos, testes e build estático.

## Publicação

Todo push para `main` aciona o workflow de deploy em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

```text
push em main
  → npm ci
  → lint, typecheck e testes
  → next build
  → upload da pasta out/
  → publicação no GitHub Pages
```

Se qualquer etapa de validação falhar, a publicação não é realizada. O deploy manual também pode ser iniciado pelo GitHub Actions com `workflow_dispatch`.

## Licença

Este repositório contém um portfólio pessoal e materiais profissionais. Para reutilização de conteúdo, imagens, currículo ou certificados, entre em contato com o autor.
