# PRD — Redesign do Portfólio Pessoal

## 1. Visão Geral

### 1.1 Objetivo

Redesenhar a interface visual do portfólio pessoal existente, preservando seu conteúdo, estrutura funcional e informações relevantes, mas estabelecendo uma nova identidade visual profissional, técnica e sofisticada.

O site será hospedado gratuitamente através do **GitHub Pages**, portanto a solução deve permanecer compatível com hospedagem estática e não depender de backend, serviços pagos ou infraestrutura externa obrigatória.

O redesign deve posicionar o proprietário do portfólio como um profissional da área de:

* Data Engineering;
* Data Science;
* Machine Learning;
* Software Engineering aplicado a dados;
* Pesquisa e desenvolvimento tecnológico.

A identidade visual deve refletir uma trajetória originada no ambiente acadêmico e de pesquisa, evoluindo para uma atuação profissional orientada a engenharia e dados.

---

## 2. Problema

A interface atual não comunica adequadamente:

1. maturidade técnica;
2. experiência com pesquisa;
3. capacidade de engenharia;
4. especialização em dados;
5. rigor e profundidade técnica.

O objetivo não é simplesmente tornar o site "mais bonito".

O objetivo é fazer com que a primeira impressão visual comunique:

> profissional técnico, pesquisador e engenheiro, com forte domínio de dados e capacidade de transformar problemas complexos em soluções de software.

---

## 3. Direção de Design

### 3.1 Conceito

O design deve combinar:

**Academic / Research + Data Engineering + Modern Professional**

A referência estética deve estar mais próxima de:

* documentação técnica sofisticada;
* artigos científicos modernos;
* portfólios de pesquisadores;
* publicações acadêmicas;
* empresas de tecnologia orientadas a engenharia;
* interfaces editoriais minimalistas.

Evitar aparência de:

* landing page de startup de IA;
* SaaS genérico;
* template de desenvolvedor;
* site de agência;
* portfolio "cyberpunk";
* dashboard corporativo;
* página excessivamente experimental.

---

## 4. Princípios Visuais

### 4.1 Clássico antes de moderno

O design deve priorizar longevidade visual.

A interface deve continuar parecendo profissional daqui a alguns anos, evitando tendências visuais passageiras.

### 4.2 Tipografia como elemento principal

A tipografia deve possuir forte presença e hierarquia clara.

Priorizar:

* excelente legibilidade;
* contraste entre títulos e corpo;
* hierarquia editorial;
* espaçamento generoso;
* aparência acadêmica/técnica.

Pode ser utilizada uma combinação de:

* serif para títulos ou elementos editoriais;
* sans-serif para interface e conteúdo técnico.

A combinação deve ser discreta e sofisticada.

### 4.3 Minimalismo

Não adicionar elementos visuais apenas para preencher espaço.

Cada elemento deve possuir função clara.

Preferir:

* whitespace;
* grids;
* linhas divisórias;
* tipografia;
* pequenos detalhes geométricos;
* blocos de informação bem definidos.

Evitar:

* sombras excessivas;
* cards em excesso;
* bordas arredondadas exageradas;
* efeitos 3D;
* partículas;
* elementos flutuantes desnecessários.

---

## 5. Paleta de Cores

> **Substituído (2026-09) — ver `docs/adr/design/004-telemetria-system.md`.**
> A implementação "Telemetria" é escura por padrão e usa três cores de sinal
> (ciano / magenta / âmbar) como leitura de instrumento. O objetivo desta
> seção — cor a serviço de precisão e confiabilidade, sem excesso decorativo —
> é mantido; a base neutra clara e a "única cor de destaque" não.

A paleta deve transmitir:

* conhecimento;
* precisão;
* confiabilidade;
* tecnologia;
* pesquisa.

Preferência por uma paleta neutra.

Base:

* branco/off-white;
* preto/grafite;
* cinzas;
* uma cor de destaque discreta.

Possíveis cores de destaque:

* azul profundo;
* azul petróleo;
* verde escuro;
* vinho/bordô discreto.

Não utilizar cores neon.

Não utilizar gradientes chamativos.

A cor de destaque deve ser utilizada para:

* links;
* estados ativos;
* pequenos indicadores;
* elementos interativos;
* detalhes de identidade.

---

## 6. Layout

### 6.1 Estrutura geral

A página deve utilizar um sistema de grid consistente.

Priorizar:

* largura máxima de conteúdo;
* alinhamento vertical consistente;
* margens generosas;
* ritmo visual;
* hierarquia clara.

O conteúdo não deve ocupar 100% da largura da tela em monitores grandes.

---

## 7. Hero / Introdução

O primeiro viewport deve comunicar imediatamente:

1. quem é o profissional;
2. área de atuação;
3. background de pesquisa;
4. principais especializações;
5. formas de contato ou navegação.

A apresentação deve ser objetiva.

Exemplo conceitual:

> Data Engineer & Researcher
> Building reliable systems for data, machine learning and scientific computing.

A informação de pesquisa deve fazer parte da identidade profissional, não aparecer como uma característica secundária.

---

## 8. Seção de Perfil

Apresentar uma síntese profissional enfatizando a interseção entre:

**Research → Software Engineering → Data → Machine Learning**

A narrativa deve demonstrar evolução profissional e continuidade entre essas áreas.

Evitar textos genéricos como:

> "Passionate developer who loves technology."

Preferir linguagem objetiva, técnica e profissional.

---

## 9. Projetos

Projetos devem ser tratados como evidências de competência técnica.

Cada projeto deve permitir identificar rapidamente:

* problema;
* solução;
* tecnologias;
* área;
* resultado;
* repositório;
* eventualmente publicação ou documentação.

Priorizar projetos relacionados a:

* Data Engineering;
* Data Science;
* Machine Learning;
* pesquisa;
* software engineering;
* automação;
* processamento de dados.

A apresentação deve evitar transformar cada projeto em um card visualmente pesado.

---

## 10. Experiência / Pesquisa

A experiência acadêmica deve receber tratamento visual semelhante a uma timeline editorial ou currículo técnico.

Destacar:

* pesquisa;
* projetos;
* publicações;
* métodos;
* contribuições;
* tecnologias utilizadas.

A experiência acadêmica não deve parecer um desvio de carreira.

Ela deve ser apresentada como parte da formação que fundamenta a atuação atual em engenharia e dados.

---

## 11. Stack Técnica

As tecnologias devem ser apresentadas de forma objetiva.

Agrupar por domínio:

### Languages

* Python
* SQL
* etc.

### Data Engineering

* Apache Spark
* Airflow
* dbt
* etc.

### Data Science / ML

* pandas
* NumPy
* scikit-learn
* PyTorch
* etc.

### Infrastructure

* Docker
* AWS
* Linux
* CI/CD
* etc.

Não utilizar grandes logos coloridos para todas as tecnologias.

A prioridade é legibilidade e organização.

---

## 12. Publicações / Pesquisa

Caso existam publicações, trabalhos acadêmicos ou materiais científicos relevantes, eles devem receber uma seção própria.

O tratamento visual deve lembrar uma publicação acadêmica:

* título;
* autores;
* ano;
* venue;
* breve descrição;
* DOI/link;
* GitHub quando aplicável.

Essa seção é importante para conectar o passado acadêmico à atuação profissional atual.

---

## 13. GitHub

O GitHub deve ser tratado como evidência de trabalho técnico.

Links para:

* GitHub;
* projetos;
* documentação;
* código;
* contribuições;

devem estar facilmente acessíveis.

O design não deve depender de widgets externos do GitHub que possam comprometer performance ou disponibilidade.

---

## 14. Navegação

A navegação deve ser simples e previsível.

Possível estrutura:

* About
* Experience
* Research
* Projects
* Skills
* Contact

A navegação deve funcionar perfeitamente em desktop e dispositivos móveis.

Evitar menus excessivamente criativos.

---

## 15. Responsividade

O site deve ser totalmente responsivo.

Breakpoints devem considerar:

* mobile;
* tablet;
* desktop;
* telas grandes.

O layout mobile não deve simplesmente reduzir o desktop.

A hierarquia deve ser adaptada para leitura vertical.

---

## 16. Animações

> **Desvio registrado (2026-09) — ver `docs/adr/design/004-telemetria-system.md`.**
> Há uma animação contínua: a faixa de onda `trace-scroll` (14s) sob a navbar.
> É ambiente e não informativa — congela sob `prefers-reduced-motion` e o site
> permanece profissional com ela desligada (regra final desta seção mantida).
> Todo o resto abaixo continua valendo.

Animações devem ser mínimas.

Permitido:

* transições sutis;
* hover states;
* entrada discreta de elementos;
* feedback visual de interação.

Evitar:

* parallax;
* elementos seguindo o mouse;
* animações contínuas;
* partículas;
* efeitos exagerados;
* loading animations desnecessárias.

O site deve continuar profissional mesmo com animações desabilitadas.

---

## 17. Acessibilidade

O redesign deve preservar ou melhorar:

* contraste;
* navegação por teclado;
* foco visível;
* semântica HTML;
* `alt` em imagens;
* hierarquia correta de headings;
* suporte a `prefers-reduced-motion`.

Não utilizar cor como único mecanismo para comunicar informação.

---

## 18. Performance

Como o site será hospedado através do GitHub Pages, performance deve ser uma prioridade.

Evitar dependências desnecessárias.

Priorizar:

* assets pequenos;
* imagens otimizadas;
* lazy loading quando aplicável;
* CSS enxuto;
* JavaScript somente quando necessário;
* fontes otimizadas;
* ausência de chamadas externas desnecessárias.

O site deve funcionar como uma aplicação estática.

---

## 19. Compatibilidade com GitHub Pages

O resultado final deve ser compatível com hospedagem estática através do GitHub Pages.

Não introduzir dependências obrigatórias de:

* backend;
* banco de dados;
* servidor próprio;
* API privada;
* autenticação;
* serviços pagos.

Caso o projeto utilize framework, a aplicação deve possuir build estático compatível com GitHub Pages.

---

## 20. SEO

Implementar ou preservar:

* `<title>` adequado;
* meta description;
* Open Graph;
* favicon;
* headings semânticos;
* URLs amigáveis;
* `lang` correto;
* conteúdo indexável.

O objetivo é permitir que recrutadores encontrem o profissional através de mecanismos de busca.

---

## 21. Conteúdo

### Regra principal

**Não alterar o conteúdo factual existente sem necessidade.**

O trabalho principal desta tarefa é visual.

Caso seja necessário modificar textos para adequá-los à nova identidade, preservar:

* fatos;
* experiências;
* tecnologias;
* datas;
* projetos;
* publicações;
* informações profissionais.

Não inventar experiência, resultados, empresas, tecnologias ou qualificações.

---

## 22. Uso da Skill `frontend-design`

A implementação deve utilizar a skill `frontend-design`.

A skill deve ser utilizada para:

1. analisar a interface existente;
2. identificar problemas de hierarquia visual;
3. definir direção visual;
4. melhorar composição;
5. estabelecer tipografia;
6. definir espaçamento;
7. criar componentes consistentes;
8. implementar responsividade;
9. evitar padrões visuais genéricos de páginas geradas por IA.

A implementação deve priorizar **design intencional**, e não simplesmente adicionar componentes ou estilos.

---

## 23. Restrições

### Não fazer

* Não transformar o site em uma landing page SaaS.
* Não utilizar estética "AI futuristic".
* Não utilizar neon.
* Não utilizar excesso de gradientes.
* Não utilizar glassmorphism como linguagem principal.
* Não adicionar dezenas de cards.
* Não adicionar animações sem função.
* Não adicionar dependências sem justificativa.
* Não modificar conteúdo factual.
* Não introduzir backend.
* Não criar dependência de serviços pagos.
* Não comprometer compatibilidade com GitHub Pages.

### Fazer

* Design editorial.
* Aparência profissional.
* Forte hierarquia tipográfica.
* Espaçamento consistente.
* Grid bem definido.
* Interface minimalista.
* Identidade acadêmica/técnica.
* Ênfase em dados e engenharia.
* Excelente experiência mobile.
* Performance elevada.
* Acessibilidade.

---

## 24. Critérios de Aceitação

O redesign será considerado concluído quando:

### Visual

* [x] A página possui identidade visual consistente.
* [x] A aparência comunica pesquisa + engenharia + dados.
* [x] O design não parece um template genérico de portfolio.
* [x] A tipografia possui hierarquia clara.
* [x] A paleta é profissional e discreta.
* [x] O espaçamento é consistente.
* [x] Não existem elementos visuais decorativos sem propósito.

### Conteúdo

* [x] Todo conteúdo factual existente foi preservado.
* [x] Projetos continuam acessíveis.
* [x] Links continuam funcionando.
* [x] Informações profissionais permanecem corretas.

### Técnica

* [x] Build executa sem erros.
* [x] Site funciona no GitHub Pages.
* [x] Não existe dependência obrigatória de backend.
* [x] Não existem erros no console.
* [x] Layout funciona em mobile.
* [x] Layout funciona em desktop.
* [x] Navegação por teclado funciona.
* [x] `prefers-reduced-motion` é respeitado.

### Performance

* [x] Assets são otimizados.
* [x] JavaScript é utilizado somente quando necessário.
* [x] Não existem bibliotecas adicionadas sem necessidade.
* [x] Recursos externos são minimizados.

---

## 25. Resultado Esperado

Resultado verificado em `docs/audit/spec-completion-2026-09.md` e
`docs/audit/visual-qa-2026-09.md`. A validação pública de 2026-09-02 confirmou
as rotas publicadas e os metadados essenciais.

O resultado final deve parecer um portfólio de um:

> **Researcher turned Data/Software Engineer**

e não simplesmente de um desenvolvedor buscando emprego.

A interface deve transmitir:

**Rigor acadêmico + engenharia de software + domínio de dados + maturidade profissional.**

A estética deve ser suficientemente clássica para refletir uma trajetória de pesquisa, mas suficientemente moderna para posicionar o profissional no mercado atual de Data Engineering, Data Science e Machine Learning.
