import { SectionHeader } from "@/components/ui/SectionHeader";
import { EduCard } from "@/components/cards/EduCard";
import { education } from "@/lib/data/timeline";

/** Porte da "FORMAÇÃO ACADÊMICA" (#formacao). */
export function Education() {
  return (
    <section id="formacao">
      <SectionHeader
        tag="Trajetória Acadêmica"
        title="Formação Acadêmica"
        channel={5}
      />
      <div className="education-timeline">
        {education.map((entry) => (
          <EduCard key={`${entry.degree}-${entry.year}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}
