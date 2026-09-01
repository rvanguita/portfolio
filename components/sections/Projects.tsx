"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";
import type { Project, ProjectCategory } from "@/lib/types";
import { ALL_CATEGORY, useCategoryFilter } from "@/hooks/useCategoryFilter";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/cx";

const MotionProjectCard = motion.create(ProjectCard);

const FILTERS: { value: ProjectCategory | typeof ALL_CATEGORY; label: string }[] =
  [
    { value: "all", label: "Todos os Projetos" },
    { value: "de", label: "Engenharia de Dados & MLOps" },
    { value: "ml", label: "Machine Learning" },
    { value: "opt", label: "Otimização & Pesquisa Operacional" },
    { value: "analytics", label: "Análise Preditiva" },
  ];

export function Projects() {
  const getCategory = useCallback((project: Project) => project.category, []);
  const { active, setActive, filtered } = useCategoryFilter(
    projects,
    getCategory,
  );
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="projetos">
      <SectionHeader
        tag="Portfólio de Aplicações"
        title="Projetos em Destaque"
        icon="briefcase"
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

      <div className="projects-grid">
        {reduceMotion ? (
          filtered.map((project) => (
            <ProjectCard key={project.key} project={project} />
          ))
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <MotionProjectCard
                key={project.key}
                project={project}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
