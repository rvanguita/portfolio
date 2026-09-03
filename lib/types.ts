export interface SkillGroup {
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
  key: string;
  title: string;
  items: Certificate[];
}
