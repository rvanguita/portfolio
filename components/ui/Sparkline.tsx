/** Mini-gráfico inline (SVG) a partir de uma lista de valores. Decorativo. */
export function Sparkline({
  data,
  className = "sparkline",
  width = 96,
  height = 22,
}: {
  data: number[];
  className?: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * stepX;
      const y = height - ((v - min) / span) * (height - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const peakIndex = data.indexOf(max);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        className="peak"
        cx={(peakIndex * stepX).toFixed(1)}
        cy={(height - 1 - ((max - min) / span) * (height - 2)).toFixed(1)}
        r="1.6"
        fill="currentColor"
      />
    </svg>
  );
}
