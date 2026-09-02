# SDD — Personal Portfolio Redesign

**Status:** Final — validado em 2026-09.

## 1. Objetivo

Definir a arquitetura técnica e a estratégia de implementação do redesign visual do portfólio pessoal.

O sistema continuará sendo uma aplicação web estática hospedada no GitHub Pages.

O redesign deve modificar principalmente apresentação, composição, tipografia, responsividade e experiência visual, preservando conteúdo e funcionalidades existentes.

---

## 2. Escopo

### Incluído

* redesign visual completo;
* sistema de design;
* tipografia;
* paleta de cores;
* layout;
* navegação;
* componentes visuais;
* responsividade;
* acessibilidade;
* SEO básico;
* otimização de performance;
* adequação ao GitHub Pages.

### Fora do escopo

* backend;
* banco de dados;
* autenticação;
* CMS;
* APIs próprias;
* alteração de informações profissionais sem justificativa;
* reescrita estrutural completa da aplicação sem necessidade.

---

## 3. Princípios Arquiteturais

### 3.1 Static First

A aplicação deve permanecer completamente compatível com hospedagem estática.

### 3.2 Progressive Enhancement

JavaScript não deve ser requisito para conteúdo essencial.

### 3.3 Content Preservation

O redesign não deve alterar dados profissionais existentes.

### 3.4 Minimal Dependencies

Novas dependências devem ser adicionadas somente quando houver benefício técnico claro.

### 3.5 Accessibility by Default

Acessibilidade deve fazer parte da implementação dos componentes, não ser uma etapa posterior.

### 3.6 Design Consistency

Todos os componentes devem consumir o mesmo sistema de tokens e regras visuais.

---

# 4. Arquitetura

```text
Browser
   │
   ▼
Static Assets
   │
   ├── HTML
   ├── CSS
   ├── JavaScript
   ├── Images
   └── Fonts
   │
   ▼
GitHub Pages
```

Não deve existir comunicação obrigatória com backend para renderização ou funcionamento básico.

---

# 5. Sistema de Design

## 5.1 Design Tokens

Os valores visuais devem ser centralizados.

Exemplo:

```css
:root {
  --color-background: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-border: ...;
  --color-accent: ...;

  --font-display: ...;
  --font-body: ...;
  --font-mono: ...;

  --space-xs: ...;
  --space-sm: ...;
  --space-md: ...;
  --space-lg: ...;
  --space-xl: ...;
  --space-2xl: ...;

  --content-width: ...;
  --reading-width: ...;

  --radius-sm: ...;
  --radius-md: ...;
}
```

Os valores exatos devem ser definidos durante a implementação após inspeção da interface existente.

---

# 6. Tipografia

A tipografia deve estabelecer três níveis principais:

```text
Display / Headings
        │
        ├── títulos principais
        └── títulos de seção

Body
        │
        ├── descrição
        └── conteúdo

Technical
        │
        ├── código
        ├── tecnologias
        └── metadados técnicos
```

A combinação tipográfica deve reforçar a relação:

```text
Academic / Editorial
        +
Technical / Engineering
```

Fontes externas devem ser utilizadas somente quando justificadas por design e performance.

---

# 7. Layout

O layout deve utilizar um container centralizado:

```text
┌───────────────────────────────────────┐
│               Header                  │
├───────────────────────────────────────┤
│                                       │
│                Hero                   │
│                                       │
├───────────────────────────────────────┤
│                                       │
│                About                  │
│                                       │
├───────────────────────────────────────┤
│                                       │
│             Experience                │
│                                       │
├───────────────────────────────────────┤
│                                       │
│              Research                 │
│                                       │
├───────────────────────────────────────┤
│                                       │
│              Projects                 │
│                                       │
├───────────────────────────────────────┤
│                                       │
│               Skills                  │
│                                       │
├───────────────────────────────────────┤
│               Contact                 │
├───────────────────────────────────────┤
│               Footer                  │
└───────────────────────────────────────┘
```

A ordem deve ser adaptada ao conteúdo existente caso a análise da aplicação demonstre uma estrutura melhor.

---

# 8. Componentes

Os componentes devem ser semanticamente orientados.

Exemplos:

```text
Header
Navigation
Hero
Section
ExperienceItem
ResearchItem
ProjectItem
TechnologyList
SocialLinks
Contact
Footer
```

Não criar abstrações apenas para reduzir quantidade de HTML.

A abstração deve existir quando houver:

* reutilização;
* consistência;
* comportamento independente;
* responsabilidade clara.

---

# 9. Componentes de Projeto

Cada projeto deve possuir estrutura equivalente a:

```text
Project
├── title
├── description
├── context
├── technologies
├── links
└── metadata
```

A apresentação deve priorizar conteúdo e legibilidade.

---

# 10. Responsividade

O layout deve ser desenvolvido com abordagem mobile-first.

### Mobile

* uma coluna;
* navegação simplificada;
* conteúdo prioritário;
* menor escala tipográfica;
* espaçamento reduzido.

### Tablet

* expansão gradual do grid;
* maior área de conteúdo;
* componentes híbridos.

### Desktop

* container limitado;
* composição editorial;
* grid completo;
* maior espaço negativo.

Não utilizar breakpoints excessivos.

---

# 11. Navegação

A navegação deve:

* indicar seção atual quando aplicável;
* possuir foco visível;
* funcionar sem JavaScript;
* possuir comportamento previsível em mobile.

Caso seja implementado menu mobile interativo:

```text
Closed
   │
   ▼
Open
   │
   ▼
Navigation
   │
   ▼
Close
```

O estado deve ser acessível via teclado.

---

# 12. Acessibilidade

Implementar:

* HTML semântico;
* headings hierárquicos;
* landmarks;
* links descritivos;
* `alt`;
* foco visível;
* contraste adequado;
* navegação por teclado;
* `aria-*` somente quando necessário;
* suporte a `prefers-reduced-motion`.

Evitar substituir elementos HTML nativos por componentes customizados sem necessidade.

---

# 13. Animações

Animações devem utilizar CSS sempre que possível.

Exemplo:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

Nenhuma animação deve ser necessária para compreender o conteúdo.

---

# 14. Performance

Prioridades:

1. HTML renderizável rapidamente;
2. CSS enxuto;
3. JavaScript mínimo;
4. imagens otimizadas;
5. fontes limitadas;
6. ausência de recursos externos desnecessários.

Evitar:

* bibliotecas de animação;
* frameworks de UI adicionados apenas para estética;
* bibliotecas de ícones pesadas;
* imagens sem compressão;
* scripts de terceiros não essenciais.

---

# 15. SEO

Implementar:

```html
<title>
<meta name="description">
<meta property="og:title">
<meta property="og:description">
<meta property="og:image">
<meta property="og:url">
```

Utilizar:

* `<main>`;
* `<header>`;
* `<nav>`;
* `<section>`;
* `<footer>`.

---

# 16. GitHub Pages

O processo de build deve produzir arquivos estáticos.

Resultado esperado:

```text
dist/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── fonts/
└── ...
```

O pipeline deve publicar o diretório de build no GitHub Pages.

---

# 17. Estratégia de Implementação

A implementação deve ocorrer incrementalmente:

```text
Existing Application
        │
        ▼
Audit
        │
        ▼
Design System
        │
        ▼
Global Layout
        │
        ▼
Components
        │
        ▼
Responsive
        │
        ▼
Accessibility
        │
        ▼
Performance
        │
        ▼
Validation
```

Não realizar uma reescrita completa sem necessidade.

---

# 18. Validação

Antes de considerar a implementação concluída:

### Functional

* todos os links funcionam;
* navegação funciona;
* build funciona;
* GitHub Pages funciona.

### Visual

* desktop;
* tablet;
* mobile;
* diferentes tamanhos de viewport.

### Accessibility

* teclado;
* foco;
* contraste;
* reduced motion;
* headings.

### Technical

* console sem erros;
* assets carregam corretamente;
* nenhum recurso externo quebrado;
* build reproduzível.

---

# 19. Definition of Done

Uma tarefa de redesign somente estará concluída quando:

* implementação segue o sistema de design;
* conteúdo existente foi preservado;
* desktop e mobile estão validados;
* acessibilidade foi validada;
* build passa;
* não existem erros de console;
* GitHub Pages funciona;
* não foram introduzidas dependências desnecessárias;
* resultado visual está alinhado ao PRD.
