/**
 * Mini-plot inline (SVG) a partir de uma lista de valores. A linha é o dado; a
 * grade horizontal fraca é só a moldura de eixo (não carrega informação).
 * Decorativo — `aria-hidden`.
 */
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
  // linhas de grade: base + dois traços a 1/3 e 2/3 da altura útil
  const grid = [1, height / 3 + 1, (2 * height) / 3 + 1].map((y) =>
    (height - y).toFixed(1),
  );

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className="sparkline-grid" stroke="currentColor" strokeWidth="0.5">
        {grid.map((y) => (
          <line key={y} x1="0" x2={width} y1={y} y2={y} />
        ))}
      </g>
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
