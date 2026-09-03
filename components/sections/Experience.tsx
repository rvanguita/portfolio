import { SectionHeader } from "@/components/ui/SectionHeader";
import { EduCard } from "@/components/cards/EduCard";
import { experience } from "@/lib/data/timeline";

/** Porte da "EXPERIÊNCIA PROFISSIONAL" (#experiencia). */
export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-heading">
      <SectionHeader
        tag="Trajetória Profissional"
        title="Experiência Profissional"
        id="experiencia-heading"
      />
      <div className="education-timeline">
        {experience.map((entry) => (
          <EduCard key={`${entry.degree}-${entry.year}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
