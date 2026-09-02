import { MetricTile } from "@/components/ui/MetricTile";
import { HERO_STATS } from "@/lib/site-stats";

/** Seção "SOBRE MIM & MÉTRICAS" (#sobre) — canal CH1. */
export function About() {
  return (
    <section id="sobre">
      <div className="about-card">
        <div className="about-intro">
          <span className="section-tag">CH1 · Perfil profissional</span>
          <h2>Ciência aplicada para problemas que importam.</h2>
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
          {HERO_STATS.map((stat) => (
            <MetricTile
              key={stat.value}
              value={stat.value}
              label={stat.label}
              trend={stat.trend}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
