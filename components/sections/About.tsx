import { Icon } from "@/components/ui/Icon";

const METRICS = [
  {
    number: "10x",
    label:
      "Redução no tempo computacional com heurística validada no mestrado (mesma qualidade do método Cônico clássico)",
  },
  {
    number: "Ph.D.",
    label:
      "Doutorado em Eng. Elétrica pela UNICAMP com foco em Otimização",
  },
  {
    number: "20+",
    label:
      "Certificações e Especializações Internacionais em Data Science",
  },
];

/** Porte da seção "SOBRE MIM & MÉTRICAS" (#sobre). */
export function About() {
  return (
    <section id="sobre">
      <div className="about-card">
        <div className="about-intro">
          <span className="section-tag">Perfil profissional</span>
          <h2>
            <Icon name="user" className="about-icon" />
            Ciência aplicada para problemas que importam.
          </h2>
        </div>
        <p className="about-copy">
          Profissional com{" "}
          <strong>Doutorado em Engenharia Elétrica pela UNICAMP</strong> e sólida
          experiência em <strong>modelagem preditiva</strong>,{" "}
          <strong>machine learning</strong> e{" "}
          <strong>engenharia de features</strong>, transformando dados brutos em
          insights acionáveis para otimização de processos e tomada de decisão.
          No doutorado, aplicou a metaheurística de <strong>Busca Tabu</strong> e
          métodos de apoio à decisão ao planejamento de expansão de sistemas de
          distribuição de energia elétrica; seu background em Engenharia Elétrica
          confere uma visão analítica diferenciada para desafios em Big Data e
          Ciência de Dados.
        </p>

        <div className="about-metrics">
          {METRICS.map((metric) => (
            <div className="metric-box" key={metric.number}>
              <div className="metric-number">{metric.number}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
