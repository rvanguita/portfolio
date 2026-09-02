import { Sparkline } from "@/components/ui/Sparkline";

/** "Readout tile" — número em mono + rótulo + sparkline opcional. */
export function MetricTile({
  value,
  label,
  trend,
}: {
  value: string;
  label: string;
  trend?: number[];
}) {
  return (
    <div className="metric-box">
      <div className="metric-number">{value}</div>
      {trend ? <Sparkline data={trend} /> : null}
      <div className="metric-label">{label}</div>
    </div>
  );
}
