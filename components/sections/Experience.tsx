import { SectionHeader } from "@/components/ui/SectionHeader";
import { EduCard } from "@/components/cards/EduCard";
import { experience } from "@/lib/data/timeline";

/** Porte da "EXPERIÊNCIA PROFISSIONAL" (#experiencia). */
export function Experience() {
  return (
    <section id="experiencia">
      <SectionHeader
        tag="Trajetória Profissional"
        title="Experiência Profissional"
        icon="chart-bar"
      />
      <div className="education-timeline">
        {experience.map((entry) => (
          <EduCard key={`${entry.degree}-${entry.year}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
