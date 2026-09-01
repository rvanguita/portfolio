import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/**
 * Componente composto (padrão da skill: "Compound Components").
 * O visual vem das classes já existentes no CSS (`about-card`, etc.) — passe-as
 * via `className`. `Card.Header` / `Card.Body` ficam disponíveis para novas
 * composições sem quebrar a folha de estilo atual.
 */
interface CardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

function Card({ children, className, as: Tag = "div" }: CardProps) {
  return <Tag className={cx(className)}>{children}</Tag>;
}

function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("card-header", className)}>{children}</div>;
}

function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cx("card-body", className)}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

export { Card };
