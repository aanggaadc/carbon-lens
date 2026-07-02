import type { StageImpact } from "@/types/product";
import { formatGWP } from "@/lib/format";

interface ImpactChartProps {
  stages: StageImpact[];
  height?: number;
}

const BAR_WIDTH = 34;
const GAP = 14;
const TOP_PAD = 22;
const LABEL_H = 34;

/**
 * A minimal server-rendered SVG bar chart: one bar per declared
 * lifecycle stage, positive values rising from the baseline, Module D
 * (typically a carbon credit) rendered in clay below it.
 */
export function ImpactChart({ stages, height = 180 }: ImpactChartProps) {
  const declared = stages.filter((s) => s.value !== null);
  if (declared.length === 0) {
    return <p className="text-sm text-ink-muted">No declared GWPt values to chart.</p>;
  }

  const maxAbs = Math.max(...declared.map((s) => Math.abs(s.value ?? 0)), 1);
  const plotHeight = height - TOP_PAD - LABEL_H;
  // Fixed baseline: positive stages rise above it, Module D (usually
  // negative — a credit) drops into a smaller band below it.
  const posBandTop = TOP_PAD;
  const posBandHeight = plotHeight * 0.78;
  const negBandTop = posBandTop + posBandHeight;
  const negBandHeight = plotHeight * 0.22;

  const width = declared.length * (BAR_WIDTH + GAP) + GAP;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{ maxWidth: width, height: "auto" }}
      role="img"
      aria-label="GWPt by lifecycle stage"
    >
      <line
        x1={0}
        y1={negBandTop}
        x2={width}
        y2={negBandTop}
        stroke="var(--rule)"
        strokeWidth={1}
      />
      {declared.map((s, i) => {
        const x = GAP + i * (BAR_WIDTH + GAP);
        const value = s.value ?? 0;
        const isNeg = value < 0;
        const magnitude = Math.abs(value) / maxAbs;
        const barH = isNeg ? magnitude * negBandHeight : magnitude * posBandHeight;
        const y = isNeg ? negBandTop : posBandTop + posBandHeight - barH;
        const color = s.stage === "D" ? "var(--clay)" : "var(--teal)";

        return (
          <g key={s.stage}>
            <rect x={x} y={y} width={BAR_WIDTH} height={Math.max(barH, 1.5)} rx={2} fill={color} opacity={0.85} />
            <text
              x={x + BAR_WIDTH / 2}
              y={isNeg ? y + barH + 12 : y - 5}
              textAnchor="middle"
              className="font-mono"
              fontSize="9.5"
              fill="var(--ink)"
            >
              {formatGWP(value)}
            </text>
            <text
              x={x + BAR_WIDTH / 2}
              y={height - LABEL_H + 16}
              textAnchor="middle"
              className="font-mono"
              fontSize="10"
              fill="var(--ink-muted)"
            >
              {s.stage}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
