import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { SkillCard } from "@/components/cards/SkillCard";
import type { ArchitectureStep } from "@/lib/types";

export const metadata: Metadata = {
  title:
    "Modelagem da Geração de Energia Eólica — XGBoost, janela expansível e SHAP | Rene Verinaud",
  description:
    "Estudo de caso: previsão da geração de quatro turbinas eólicas onshore ao longo de um ano com XGBRegressor, validação temporal por janela expansível e interpretabilidade via SHAP. Dataset público do Zenodo; RMSE de 12,41% e R² de 81,93%.",
};

const MODEL_STEPS: ArchitectureStep[] = [
  {
    icon: "cloud",
    title: "1. Dataset & Variáveis",
    description:
      "Séries coletadas a cada <strong>10 minutos</strong> de seis turbinas (WT1–WT6) e três mastros meteorológicos, do repositório público do <strong>Zenodo</strong>. Foram modeladas as turbinas <strong>onshore</strong> WT3 e WT4, com cinco variáveis ambientais: velocidade (<code>V</code>) e direção (<code>D</code>) do vento, densidade do ar (<code>rho</code>), intensidade de turbulência (<code>I</code>) e cisalhamento vertical (<code>Sb</code>).",
    tags: ["Zenodo", "CSV", "Séries temporais", "10 min"],
  },
  {
    icon: "chart-pie",
    title: "2. Análise Exploratória",
    description:
      "Verificação de valores nulos e duplicados, seguida de um <strong>heatmap de correlação</strong>: relação forte entre potência, velocidade do vento e mês do ano; a intensidade de turbulência tem relação inversa. Boxplots por mês mostram mediana máxima em setembro e mínima em junho.",
    tags: ["Pandas", "Matplotlib", "Correlação", "Boxplot"],
  },
  {
    icon: "bolt",
    title: "3. Modelagem com XGBRegressor",
    description:
      "Como a curva de potência é <strong>não linear</strong>, métodos baseados em árvores levam vantagem. O <code>XGBRegressor</code> constrói árvores de decisão em sequência, cada uma corrigindo os resíduos da anterior. A validação usa <strong>janela expansível</strong> (expanding window), preservando a ordem cronológica e o viés sazonal dos meses.",
    tags: ["XGBoost", "XGBRegressor", "Janela expansível", "Regressão"],
  },
  {
    icon: "shield-check",
    title: "4. Interpretabilidade & Resultados",
    description:
      "Análise <strong>SHAP</strong> para quantificar a contribuição de cada variável na previsão — a <strong>velocidade do vento</strong> é a mais relevante. O modelo alcançou <strong>RMSE de 12,41%</strong> e <strong>R² de 81,93%</strong> na previsão de potência.",
    tags: ["SHAP", "Feature Importance", "RMSE", "R²"],
  },
];

const PIPELINE_DIAGRAM = `        Pipeline de Modelagem  ·  main.ipynb
        ═══════════════════════════════════════

   CSV por turbina (10 min, Zenodo)
        │
        ▼
   Limpeza  ──  remoção de nulos e duplicatas
        │
        ▼
   Análise exploratória  ──  heatmap de correlação · boxplots por mês
        │
        ▼
   Seleção de features  ──►  V · D · rho · I · Sb
        │
        ▼
   XGBRegressor  +  validação por janela expansível
        │
        ▼
   SHAP  ──►  velocidade do vento = variável dominante
        │
        ▼
   Resultado  ──►  RMSE 12,41%   ·   R² 81,93%`;

const STACK_ROWS: {
  icon: Parameters<typeof Icon>[0]["name"];
  domain: string;
  techs: string[];
  responsibility: React.ReactNode;
}[] = [
  {
    icon: "cloud",
    domain: "Dados & Fonte",
    techs: ["Zenodo", "CSV"],
    responsibility:
      "Séries de potência e variáveis ambientais das turbinas, amostradas a cada 10 minutos.",
  },
  {
    icon: "square-3-stack-3d",
    domain: "Manipulação & Preparação",
    techs: ["Pandas", "NumPy"],
    responsibility:
      "Limpeza de nulos e duplicatas, junção mastro–turbina e engenharia do atributo de mês.",
  },
  {
    icon: "chart-pie",
    domain: "Análise Exploratória",
    techs: ["Matplotlib"],
    responsibility:
      "Heatmap de correlação, boxplots mensais e scatter plots da curva de potência.",
  },
  {
    icon: "bolt",
    domain: "Modelagem",
    techs: ["XGBoost", "XGBRegressor"],
    responsibility:
      "Regressão por gradient boosting sobre árvores para a curva de potência não linear.",
  },
  {
    icon: "clock",
    domain: "Validação Temporal",
    techs: ["Janela expansível"],
    responsibility:
      "Divisão treino/teste respeitando a ordem cronológica, sem embaralhar meses.",
  },
  {
    icon: "shield-check",
    domain: "Interpretabilidade",
    techs: ["SHAP"],
    responsibility:
      "Contribuição marginal de cada variável na previsão de potência.",
  },
  {
    icon: "command-line",
    domain: "Ambiente",
    techs: ["Python", "Jupyter"],
    responsibility: (
      <>
        Todo o fluxo em <code>main.ipynb</code>, reproduzível de ponta a ponta.
      </>
    ),
  },
];

export default function WindFarmPage() {
  return (
    <>
      <div className="case-study-nav">
        <Link href="/#projetos" className="btn-secondary">
          Voltar aos Projetos
        </Link>
      </div>

      <div className="case-study-hero about-card">
        <div className="case-study-heading">
          <div>
            <span className="project-category-badge cat-ml">
              <Icon name="sun" className="badge-icon" /> Regressão &amp; Energia
              Renovável
            </span>
            <h1>
              Modelagem da Geração de Energia Eólica: Previsão de Potência com
              XGBoost
            </h1>
            <p className="case-study-lead">
              <strong>Desafio:</strong> prever a geração de energia de{" "}
              <strong>quatro turbinas eólicas</strong> ao longo de um ano. A
              curva de potência de uma turbina é <strong>não linear</strong>, o
              que descarta modelos lineares; e, por ser uma{" "}
              <strong>série temporal</strong>, a validação cruzada tradicional
              também não se aplica — ela removeria o viés sazonal de alguns
              meses.
            </p>
          </div>
        </div>

        <div className="case-study-meta">
          <a
            href="https://github.com/rvanguita/wind-farm"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Acessar Repositório no GitHub
          </a>
          <span className="social-chip">
            <Icon name="check-circle" className="chip-icon" /> Dataset público
            (Zenodo)
          </span>
          <span className="social-chip">
            <Icon name="chart-bar" className="chip-icon" /> Notebook: main.ipynb
          </span>
        </div>
      </div>

      <div className="about-metrics case-study-metrics">
        <div className="metric-box">
          <div className="metric-number">4 Turbinas</div>
          <div className="metric-label">
            Turbinas onshore WT3 e WT4 modeladas ao longo de um ano (as offshore
            WT5 e WT6 foram analisadas em paralelo)
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-number">R² 81,93%</div>
          <div className="metric-label">
            Coeficiente de determinação do XGBRegressor na previsão de potência
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-number">RMSE 12,41%</div>
          <div className="metric-label">
            Erro quadrático médio da previsão; a velocidade do vento é a variável
            mais relevante
          </div>
        </div>
      </div>

      <section className="case-study-section" aria-labelledby="wf-metodologia">
        <div className="section-header section-header-first">
          <span className="section-tag">Abordagem</span>
          <h2 className="section-title" id="wf-metodologia">
            <Icon name="squares-2x2" className="section-icon" />
            Metodologia do Pipeline
          </h2>
          <p className="section-desc">
            Do dado bruto coletado a cada 10 minutos até a previsão de potência
            interpretada com SHAP.
          </p>
        </div>

        <div className="about-card architecture-card">
          <pre
            role="img"
            aria-label="Fluxo do pipeline de modelagem: CSV por turbina amostrado a cada 10 minutos (Zenodo) → limpeza de nulos e duplicatas → análise exploratória com heatmap de correlação e boxplots por mês → seleção das features V, D, rho, I e Sb → XGBRegressor com validação por janela expansível → análise SHAP identifica a velocidade do vento como variável dominante → resultado: RMSE 12,41% e R² 81,93%."
          >
            {PIPELINE_DIAGRAM}
          </pre>
        </div>
      </section>

      <section className="case-study-section" aria-labelledby="wf-etapas">
        <div className="section-header">
          <span className="section-tag">Ciência de Dados</span>
          <h2 className="section-title" id="wf-etapas">
            <Icon name="square-3-stack-3d" className="section-icon" />
            Etapas da Modelagem
          </h2>
        </div>

        <div className="skills-grid">
          {MODEL_STEPS.map((step) => (
            <SkillCard
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              tags={step.tags}
            />
          ))}
        </div>
      </section>

      <section className="case-study-section" aria-labelledby="wf-stack">
        <div className="section-header">
          <span className="section-tag">Tecnologias</span>
          <h2 className="section-title" id="wf-stack">
            <Icon name="cog-6-tooth" className="section-icon" />
            Stack Tecnológica Completa
          </h2>
        </div>

        <div className="about-card stack-table-wrapper">
          <table className="stack-table">
            <caption className="sr-only">
              Stack tecnológica do projeto: camada ou domínio, tecnologias
              utilizadas e responsabilidade de cada uma.
            </caption>
            <thead>
              <tr>
                <th scope="col">Camada / Domínio</th>
                <th scope="col">Tecnologias Utilizadas</th>
                <th scope="col">Responsabilidade</th>
              </tr>
            </thead>
            <tbody>
              {STACK_ROWS.map((row) => (
                <tr key={row.domain}>
                  <td>
                    <Icon name={row.icon} className="stack-icon" /> {row.domain}
                  </td>
                  <td className="stack-table-techs">
                    {row.techs.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </td>
                  <td>{row.responsibility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="case-study-actions">
        <a
          href="https://github.com/rvanguita/wind-farm"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Explorar Código no GitHub
        </a>
        <Link href="/#projetos" className="btn-secondary">
          Ver Outros Projetos
        </Link>
      </div>
    </>
  );
}
