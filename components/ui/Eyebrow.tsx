import { cx } from "@/lib/cx";

/** Kicker editorial: rótulo curto acima de um título, com um fio à esquerda. */
export function Eyebrow({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return <Tag className={cx("eyebrow", className)}>{children}</Tag>;
}
