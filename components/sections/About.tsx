import { MetricTile } from "@/components/ui/MetricTile";
import { Rich } from "@/components/ui/Rich";
import { HERO_STATS } from "@/lib/site-stats";
import { profile } from "@/lib/data/profile";

/** Seção "SOBRE MIM & MÉTRICAS" (#sobre) — canal CH1. */
export function About() {
  return (
    <section id="sobre">
      <div className="about-card">
        <div className="about-intro">
          <span className="section-tag">CH1 · Perfil profissional</span>
          <h2>{profile.aboutHeading}</h2>
        </div>
        <Rich as="p" className="about-copy" html={profile.aboutBio} />

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
