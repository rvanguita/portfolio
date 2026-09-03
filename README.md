# Portfólio — Rene Verinaud Anguita Junior

Página pessoal de Rene Verinaud Anguita Junior (Cientista de Dados, Ph.D. em
Engenharia Elétrica). Site estático escrito à mão — **só HTML e CSS**, sem
framework, sem build, sem dependências.

- **Publicado:** <https://rvanguita.github.io/portfolio/>
- **GitHub:** <https://github.com/rvanguita> · **LinkedIn:** <https://linkedin.com/in/rvanguita>

## Estrutura

```
index.html                     página única (dossiê): intro, projetos,
                               trajetória, competências, certificações
style.css                      folha única, compartilhada pelas 3 páginas
projects/wind-farm/index.html  estudo de caso
projects/lake-fastf1/index.html estudo de caso
certificates/                  24 PDFs de certificado
assets/social-card.png         imagem de compartilhamento (Open Graph)
icon.png                       favicon
.nojekyll                      impede o GitHub Pages de rodar Jekyll
```

Todos os links (navegação, CSS, favicon, PDFs) são **relativos** — o site
funciona igual localmente e sob `/portfolio/`. URLs absolutas só nos
`<meta og:*>` e no `<link rel="canonical">`.

## Editar

Abra `index.html` (ou uma das páginas em `projects/`) e edite o texto direto no
HTML. A aparência inteira está em `style.css` (~180 linhas, variáveis CSS no
topo). Novo certificado: coloque o PDF em `certificates/` e adicione um `<li>`
na seção **Certificações** do `index.html` (lembre de trocar espaços por `%20`
no `href`).

## Ver localmente

```bash
python3 -m http.server 8000      # na raiz do repo
```

Abra <http://localhost:8000/>. Ou simplesmente abra `index.html` no navegador.

## Publicar

Push em `main` → `.github/workflows/deploy.yml` copia
`index.html style.css icon.png .nojekyll projects/ certificates/ assets/` para
`_site/` e publica no GitHub Pages. Também dá para disparar manualmente pelo
Actions (`workflow_dispatch`).

Pull requests para `main` passam por `.github/workflows/ci.yml`, que roda
`python3 .github/check.py`: confere que as 3 páginas existem e estão bem
formadas e que todo link local aponta para um arquivo real. Sem npm.

## Licença

Portfólio pessoal e materiais profissionais. Para reutilização de conteúdo,
imagens ou certificados, entre em contato com o autor.
