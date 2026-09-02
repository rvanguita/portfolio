"use client";

import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const VIEW_W = 2400;
const VIEW_H = 46;
const LOOP = 1200; // largura que se repete (casa com translateX(-50%))

/** Onda periódica em [0, VIEW_W] com período LOOP — emenda sem costura. */
function wavePath(cycles: number, amp: number, phase: number, mid: number): string {
  const pts: string[] = [];
  for (let x = 0; x <= VIEW_W; x += 8) {
    const t = (x / LOOP) * cycles * Math.PI * 2 + phase;
    const y = mid + Math.sin(t) * amp + Math.sin(t * 2.3) * amp * 0.28;
    pts.push(`${x},${y.toFixed(2)}`);
  }
  return `M${pts.join(" L")}`;
}

/**
 * Assinatura visual "Telemetria": faixa de onda ambiente sob a navbar.
 * Decorativa (aria-hidden). Sem movimento quando o SO pede menos animação.
 */
export function HeroSignature() {
  const still = usePrefersReducedMotion();
  const primary = wavePath(4, 9, 0, VIEW_H / 2);
  const secondary = wavePath(7, 5, 1.4, VIEW_H / 2);

  return (
    <div className="hero-signature" aria-hidden="true">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        focusable="false"
      >
        <g className={still ? undefined : "trace-scroll"}>
          <path
            d={secondary}
            fill="none"
            stroke="var(--trace-2)"
            strokeOpacity="0.35"
            strokeWidth="1.25"
          />
          <path
            d={primary}
            fill="none"
            stroke="var(--trace-1)"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
}
