import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { caseStudyMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "Estudo de caso da FastF1 Data Platform: ingestão de dados de Fórmula 1, arquitetura Raw/Bronze/Silver com Delta Lake, orquestração no Airflow, MLOps com MLflow, API FastAPI e painel Streamlit.";

export const metadata = caseStudyMetadata({
  slug: "lake-fastf1",
  title: "FastF1 Data Platform — Data Lakehouse & MLOps para Fórmula 1",
  description: DESCRIPTION,
});

const REPO = "https://github.com/rvanguita/lake-fastf1";

export default function LakeFastF1Page() {
  return (
    <article className="wrap doc">
      <Link href="/#projetos" className="backlink">
        ← Projetos
      </Link>

      <h1>FastF1 Data Platform</h1>
      <hr className="sig" aria-hidden="true" />

      <p className="lead">
        Transformar dados de corridas de Fórmula 1 numa base confiável para
        análise e previsão. A plataforma combina um <strong>Data Lakehouse</strong>,
        práticas de <strong>MLOps</strong> e interfaces analíticas num fluxo
        ponta a ponta.
      </p>

      <p>
        A ingestão usa a biblioteca <strong>FastF1</strong> para extrair
        corridas, treinos livres, classificações e telemetria, gravando os dados
        brutos particionados em Parquet.
      </p>

      <p>
        Uma DAG semanal do <strong>Apache Airflow</strong> consolida esses dados
        em tabelas <strong>Delta Lake</strong>: a camada Bronze com versionamento
        ACID e a camada Silver curada, com estatísticas agregadas de pilotos,
        construtores e histórico de voltas; ao final, um espelho em MySQL. Cópias
        são arquivadas no AWS S3 por uma CLI dedicada.
      </p>

      <p>
        Um modelo de machine learning para predição de campeonatos é treinado
        com Scikit-Learn e rastreado no <strong>MLflow</strong>, servido por uma
        API <strong>FastAPI</strong> de baixa latência e explorado num painel{" "}
        <strong>Streamlit</strong>. Todo o ambiente roda em contêineres Docker.
      </p>

      <p className="tech">
        Tecnologias: FastF1 · Delta Lake · PySpark · Apache Airflow ·
        Scikit-Learn · MLflow · FastAPI · Streamlit · Docker · AWS S3
      </p>

      <p className="repo">
        <ExternalLink href={REPO}>Repositório no GitHub ↗</ExternalLink>
      </p>
    </article>
  );
}
