import type { IconName } from "@/components/ui/Icon";

/** Categoria de projeto — deve casar com um botão de filtro em <Projects>. */
export type ProjectCategory = "de" | "ml" | "opt" | "analytics";

/** Categoria (key) de um grupo de certificados — casa com um filtro em <Certificates>. */
export type CertCategory = "ds-python" | "math-ml" | "biz-stats";

export interface SkillGroup {
  icon: IconName;
  title: string;
  tags: string[];
}

export interface ProjectHighlight {
  label: string;
  /** Pode conter HTML inline simples (<strong>). Renderizado via <Rich>. */
  text: string;
}

export interface ProjectAction {
  label: string;
  /** URL absoluta (http...) → link externo; caminho iniciando com "/" → rota interna. */
  url: string;
  primary?: boolean;
}

export interface Project {
  key: string;
  category: ProjectCategory;
  badgeIcon: IconName;
  badgeLabel: string;
  title: string;
  challenge: string;
  highlights: ProjectHighlight[];
  techTags: string[];
  actions: ProjectAction[];
}

export interface TimelineEntry {
  degree: string;
  year: string;
  institution: string;
  description?: string;
}

export interface Certificate {
  title: string;
  tag: string;
  /** Caminho do PDF em /public (sem basePath). Ver asset() em lib/base-path.ts. */
  path: string;
}

export interface CertificateGroup {
  key: CertCategory;
  icon: IconName;
  title: string;
  items: Certificate[];
}

export interface ArchitectureStep {
  icon: IconName;
  title: string;
  /** HTML inline (<code>, <strong>). Renderizado via <Rich>. */
  description: string;
  tags: string[];
}
