import type { ElementType } from "react";

/**
 * Renderiza texto com HTML inline simples (<strong>, <code>) vindo dos módulos
 * de dados em lib/data/*. O conteúdo é do próprio repositório (não é entrada de
 * usuário), então a injeção é segura — é o mesmo que o Liquid fazia com `{{ }}`.
 */
export function Rich({
  html,
  as: Tag = "span",
  className,
}: {
  html: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
