import { cx } from "@/lib/cx";

/** Rótulo de canal do sistema "Telemetria": `CHn · TÍTULO` com ponto de sinal. */
export function ChannelLabel({
  channel,
  children,
  className,
  as: Tag = "span",
}: {
  channel: number | string;
  children: React.ReactNode;
  className?: string;
  as?: "span" | "div" | "p";
}) {
  return (
    <Tag className={cx("channel-label", className)}>
      CH{channel} · {children}
    </Tag>
  );
}
