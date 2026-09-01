import { cx } from "@/lib/cx";

/** Chip de texto reutilizável (tech-tag nos projetos, skill-pill nas habilidades). */
export function Tag({
  children,
  variant = "tech",
  className,
}: {
  children: string;
  variant?: "tech" | "pill";
  className?: string;
}) {
  const base = variant === "pill" ? "skill-pill" : "tech-tag";
  return <span className={cx(base, className)}>{children}</span>;
}
