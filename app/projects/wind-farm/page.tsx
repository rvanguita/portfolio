import Link from "next/link";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { caseStudyMetadata } from "@/lib/metadata";

const DESCRIPTION =
  "Estudo de caso: previsão da geração de quatro turbinas eólicas onshore ao longo de um ano com XGBRegressor, validação temporal por janela expansível e interpretabilidade via SHAP. Dataset público do Zenodo; erro de previsão baixo e bom ajuste.";

export const metadata = caseStudyMetadata({
  slug: "wind-farm",
  title:
    "Modelagem da Geração de Energia Eólica — XGBoost, janela expansível e SHAP",
  description: DESCRIPTION,
});

const REPO = "https://github.com/rvanguita/wind-farm";

export default function WindFarmPage() {
  return (
    <article className="wrap doc">
      <Link href="/#projetos" className="backlink">
        ← Projetos
      </Link>

      <h1>Modelagem da Geração de Energia Eólica</h1>
      <hr className="sig" aria-hidden="true" />

      <p className="lead">
        Prever a geração de energia de quatro turbinas eólicas ao longo de um
        ano. A curva de potência de uma turbina é <strong>não linear</strong>, o
        que descarta modelos lineares; e, por ser uma{" "}
        <strong>série temporal</strong>, a validação cruzada tradicional também
        não se aplica — removeria o viés sazonal de alguns meses.
      </p>

      <p>
        Os dados vêm do repositório público do <strong>Zenodo</strong>: séries
        amostradas a cada 10 minutos de seis turbinas (WT1–WT6) e três mastros
        meteorológicos. Foram modeladas as turbinas onshore WT3 e WT4, com cinco
        variáveis ambientais — velocidade e direção do vento, densidade do ar,
        intensidade de turbulência e cisalhamento vertical. A análise
        exploratória (heatmap de correlação, boxplots por mês) mostra relação
        forte entre potência, velocidade do vento e mês do ano.
      </p>

      <p>
        Como a curva de potência é não linear, um modelo baseado em árvores leva
        vantagem: o <strong>XGBRegressor</strong> constrói árvores em sequência,
        cada uma corrigindo os resíduos da anterior. A validação usa{" "}
        <strong>janela expansível</strong> (expanding window), preservando a
        ordem cronológica e o viés sazonal dos meses.
      </p>

      <p>
        A análise <strong>SHAP</strong> quantifica a contribuição de cada
        variável na previsão — a velocidade do vento é a mais relevante. O
        modelo alcançou erro de previsão baixo e bom ajuste.
      </p>

      <p className="tech">
        Tecnologias: Python · XGBoost · SHAP · Pandas · Matplotlib
      </p>

      <p className="repo">
        <ExternalLink href={REPO}>Repositório no GitHub ↗</ExternalLink>
      </p>
    </article>
  );
}
