/** "Readout tile" — número em mono + rótulo. */
export function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-box">
      <div className="metric-number">{value}</div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
