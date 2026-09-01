import type { IconName } from "@/components/ui/Icon";

/**
 * Itens do menu de navegação. Cada `id` DEVE existir como `id` de <section> na
 * home (garantido por tests/nav.test.tsx — porte de test_nav_sections_consistency).
 */
export const NAV_ITEMS = [
  { id: "sobre", label: "Sobre", icon: "user" },
  { id: "habilidades", label: "Habilidades", icon: "wrench" },
  { id: "projetos", label: "Projetos", icon: "briefcase" },
  { id: "experiencia", label: "Experiência", icon: "chart-bar" },
  { id: "formacao", label: "Formação", icon: "academic-cap" },
  { id: "certificados", label: "Certificados", icon: "document" },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: IconName;
}>;

export type NavId = (typeof NAV_ITEMS)[number]["id"];
