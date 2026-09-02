import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillCard } from "@/components/cards/SkillCard";
import { skills } from "@/lib/data/skills";

/** Porte da "MATRIZ DE HABILIDADES" (#habilidades). */
export function Skills() {
  return (
    <section id="habilidades" aria-labelledby="habilidades-heading">
      <SectionHeader
        tag="Competências"
        title="Matriz de Habilidades Técnicas"
        channel={2}
        id="habilidades-heading"
        desc="Uma combinação de profundidade técnica e visão de negócio para transformar dados em produtos e decisões melhores."
      />
      <div className="skills-grid">
        {skills.map((group) => (
          <SkillCard
            key={group.title}
            icon={group.icon}
            title={group.title}
            tags={group.tags}
            domain={group.domain}
          />
        ))}
      </div>
    </section>
  );
}
