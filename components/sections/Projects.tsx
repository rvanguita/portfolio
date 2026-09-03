import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-heading">
      <SectionHeader
        tag="Portfólio de Aplicações"
        title="Projetos"
        id="projetos-heading"
        desc="Casos reais de dados, otimização e machine learning — do desafio à solução."
      />

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </section>
  );
}
