import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { SkillCard } from "@/components/cards/SkillCard";
import type { ArchitectureStep } from "@/lib/types";

export const metadata: Metadata = {
  title:
    "FastF1 Data Platform — Data Lakehouse & MLOps para Fórmula 1 | Rene Verinaud",
  description:
    "Estudo de caso da FastF1 Data Platform: ingestão de dados de Fórmula 1, arquitetura Raw/Bronze/Silver com Delta Lake, orquestração no Airflow, MLOps com MLflow, API FastAPI e painel Streamlit.",
};

const ARCHITECTURE_STEPS: ArchitectureStep[] = [
  {
    icon: "cloud",
    title: "1. Ingestão & Camada Bruta",
    description:
      "Extração automatizada de dados de corridas, treinos livres, classificações e telemetria da Fórmula 1 utilizando a biblioteca <code>FastF1</code>, salvando os resultados brutos particionados em formato <strong>Parquet</strong>.",
    tags: ["FastF1", "Python", "Parquet", "AWS S3 Boto3"],
  },
  {
    icon: "square-3-stack-3d",
    title: "2. Bronze & Silver (Delta Lake)",
    description:
      "Consolidação dos dados em tabelas <strong>Delta Lake</strong> na camada Bronze com versionamento ACID e criação da camada Silver curada com estatísticas agregadas de pilotos, construtores e histórico de voltas.",
    tags: ["Delta Lake", "PySpark", "Pandas / NumPy", "Transações ACID"],
  },
  {
    icon: "clock",
    title: "3. Orquestração no Airflow",
    description:
      "DAG programada para execução semanal com monitoramento de linhagem de dados (<code>Asset</code>), controle de concorrência e tarefas sequenciais com tolerância a falhas e espelhamento final para <strong>MySQL</strong>.",
    tags: ["Apache Airflow", "DAGs", "MySQL / SQLAlchemy", "Linhagem de Dados"],
  },
  {
    icon: "chart-bar",
    title: "4. MLOps, API & Painel",
    description:
      "Modelo de Machine Learning para predição de campeonatos treinado com <code>Scikit-Learn</code> e rastreado no <code>MLflow</code>, exposto via API de baixa latência no <strong>FastAPI</strong> e painel analítico no <strong>Streamlit</strong>.",
    tags: ["MLflow", "Scikit-Learn", "FastAPI", "Streamlit / Plotly"],
  },
];

const ARCHITECTURE_DIAGRAM = `┌────────────────────────── Apache Airflow DAG: data-pipeline (Semanal) ──────────────────────────┐
│                                                                                                  │
│   FastF1 API ──► Raw (Parquet) ──► Bronze (Delta Lake) ──► Silver (Delta Lake) ──► Espelho MySQL│
│                       │                                                                          │
└───────────────────────┼──────────────────────────────────────────────────────────────────────────┘
                        │ CLI de Arquivamento
                  ┌─────▼─────┐
                  │  AWS S3   │
                  └───────────┘

    MLflow (Rastreamento) ──Modelo Preditivo──► FastAPI (:5002 /predict) ◄──── Painel Streamlit (:8501)
                                                                                  │
                                      Bronze + Silver (Delta Lake) ──Leitura──────┘`;

const STACK_ROWS: {
  icon: Parameters<typeof Icon>[0]["name"];
  domain: string;
  techs: string[];
  responsibility: React.ReactNode;
}[] = [
  {
    icon: "cloud",
    domain: "Coleta & Acesso a Dados",
    techs: ["FastF1"],
    responsibility: "Extração de telemetrias, tempos de volta e dados climáticos.",
  },
  {
    icon: "square-3-stack-3d",
    domain: "Processamento & Lakehouse",
    techs: ["Delta Lake", "PySpark", "Pandas"],
    responsibility:
      "Transformações em camadas Raw, Bronze e Silver com particionamento.",
  },
  {
    icon: "clock",
    domain: "Orquestração de Pipelines",
    techs: ["Apache Airflow"],
    responsibility: "Agendamento semanal automatizado e governança de dados.",
  },
  {
    icon: "chart-bar",
    domain: "Machine Learning & Rastreamento",
    techs: ["Scikit-Learn", "MLflow"],
    responsibility:
      "Treinamento, versionamento de modelos e rastreamento de métricas.",
  },
  {
    icon: "server",
    domain: "API de Inferência",
    techs: ["FastAPI", "Uvicorn"],
    responsibility: (
      <>
        Endpoint REST (<code>/predict</code>) para inferências de predição em
        tempo real.
      </>
    ),
  },
  {
    icon: "chart-pie",
    domain: "Visualização & BI",
    techs: ["Streamlit", "Plotly", "MySQL"],
    responsibility:
      "Painel interativo para exploração visual e espelhamento relacional.",
  },
  {
    icon: "cube",
    domain: "DevOps & Infraestrutura",
    techs: ["Docker", "Docker Compose", "uv", "AWS S3"],
    responsibility:
      "Ambiente isolado em contêineres, gerenciamento moderno de pacotes e backup em nuvem.",
  },
];

export default function LakeFastF1Page() {
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
            <span className="project-category-badge cat-de">
              <Icon name="flag" className="badge-icon" /> Engenharia de Dados,
              Lakehouse &amp; MLOps
            </span>
            <h1>FastF1 Data Platform: Data Lakehouse e Predição da Fórmula 1</h1>
            <p className="case-study-lead">
              <strong>Desafio:</strong> transformar dados de corridas em uma base
              confiável para análise e previsão. A{" "}
              <strong>FastF1 Data Platform</strong> combina{" "}
              <strong>Data Lakehouse</strong>, <strong>MLOps</strong> e
              interfaces analíticas em um fluxo ponta a ponta.
            </p>
          </div>
        </div>

        <div className="case-study-meta">
          <a
            href="https://github.com/rvanguita/lake-fastf1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Acessar Repositório no GitHub
          </a>
          <span className="social-chip">
            <Icon name="check-circle" className="chip-icon" /> Status: Ativo /
            Produção
          </span>
          <span className="social-chip">
            <Icon name="cube" className="chip-icon" /> Docker &amp; Docker Compose
          </span>
        </div>
      </div>

      <div className="about-metrics case-study-metrics">
        <div className="metric-box">
          <div className="metric-number">3 Camadas</div>
          <div className="metric-label">
            Arquitetura Lakehouse (Raw Parquet, Bronze Delta, Silver Curada)
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-number">Semanal</div>
          <div className="metric-label">
            Orquestração automatizada via DAG no Apache Airflow
          </div>
        </div>
        <div className="metric-box">
          <div className="metric-number">2 Serviços</div>
          <div className="metric-label">
            FastAPI (:5002) + Painel Streamlit (:8501) conteinerizados
          </div>
        </div>
      </div>

      <section className="case-study-section">
        <div className="section-header section-header-first">
          <span className="section-tag">Design de Engenharia</span>
          <h2 className="section-title">
            <Icon name="squares-2x2" className="section-icon" />
            Arquitetura da Plataforma
          </h2>
          <p className="section-desc">
            Fluxo de dados completo desde a coleta bruta via API FastF1 até as
            interfaces de predição e visualização.
          </p>
        </div>

        <div className="about-card architecture-card">
          <pre>{ARCHITECTURE_DIAGRAM}</pre>
        </div>
      </section>

      <section className="case-study-section">
        <div className="section-header">
          <span className="section-tag">Engenharia de Dados</span>
          <h2 className="section-title">
            <Icon name="square-3-stack-3d" className="section-icon" />
            Estrutura das Camadas e Componentes
          </h2>
        </div>

        <div className="skills-grid">
          {ARCHITECTURE_STEPS.map((step) => (
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

      <section className="case-study-section">
        <div className="section-header">
          <span className="section-tag">Tecnologias</span>
          <h2 className="section-title">
            <Icon name="cog-6-tooth" className="section-icon" />
            Stack Tecnológica Completa
          </h2>
        </div>

        <div className="about-card stack-table-wrapper">
          <table className="stack-table">
            <thead>
              <tr>
                <th>Camada / Domínio</th>
                <th>Tecnologias Utilizadas</th>
                <th>Responsabilidade</th>
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
          href="https://github.com/rvanguita/lake-fastf1"
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
