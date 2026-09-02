"use client";

import { useCallback } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";
import type { Project, ProjectCategory } from "@/lib/types";
import { ALL_CATEGORY, useCategoryFilter } from "@/hooks/useCategoryFilter";
import { cx } from "@/lib/cx";

const FILTERS: { value: ProjectCategory | typeof ALL_CATEGORY; label: string }[] =
  [
    { value: "all", label: "Todos os Projetos" },
    { value: "de", label: "Engenharia de Dados & MLOps" },
    { value: "ml", label: "Machine Learning" },
    { value: "opt", label: "Otimização & Pesquisa Operacional" },
    { value: "analytics", label: "Análise Preditiva" },
  ];

const featuredProjects = projects.filter((project) => project.featured);
const otherProjects = projects.filter((project) => !project.featured);

export function Projects() {
  const getCategory = useCallback((project: Project) => project.category, []);
  const { active, setActive, filtered } = useCategoryFilter(
    projects,
    getCategory,
  );

  return (
    <section id="projetos" aria-labelledby="projetos-heading">
      <SectionHeader
        tag="Portfólio de Aplicações"
        title="Projetos em Destaque"
        channel={3}
        id="projetos-heading"
        desc="Casos reais de dados, otimização e machine learning — apresentados do desafio ao impacto."
      />

      <div className="category-filter-nav" role="group" aria-label="Filtrar projetos por categoria">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={cx("filter-btn", active === filter.value && "active")}
            data-category={filter.value}
            aria-pressed={active === filter.value}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {active === ALL_CATEGORY ? (
        <>
          <p className="section-tag projects-group-tag">Em destaque</p>
          <div className="projects-grid projects-grid-featured">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.key} project={project} />
            ))}
          </div>

          <details className="projects-other">
            <summary>Ver todos os projetos ({otherProjects.length})</summary>
            <div className="projects-grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.key} project={project} />
              ))}
            </div>
          </details>
        </>
      ) : (
        <div className="projects-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
