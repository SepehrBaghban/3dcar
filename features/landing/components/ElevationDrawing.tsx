import { formatNumber } from "@/features/shared/lib/format";
import { ELEVATION_DIMENSIONS } from "@/features/landing/data/specs";

/** Side elevation drawn in millimetres (1 SVG unit = 1 mm) so dimension lines are true to scale. */
const VIEW_BOX = { x: -300, y: -650, width: 5380, height: 2250 } as const;
const GROUND_Y = 1136;
const WHEEL_RADIUS = 340;
const FRONT_AXLE_X = 3740;
const REAR_AXLE_X = FRONT_AXLE_X - ELEVATION_DIMENSIONS.wheelbase;

const SILHOUETTE =
  "M 20 1000 L 0 820 L 0 470 L 140 300 L 790 270 L 1840 0 L 2440 0 L 3340 330 L 4680 620 L 4780 840 L 4700 1000 Z";

type DimensionLineProps = {
  from: number;
  to: number;
  at: number;
  label: string;
  vertical?: boolean;
};

function DimensionLine({ from, to, at, label, vertical = false }: DimensionLineProps) {
  const mid = (from + to) / 2;
  const line = vertical ? { x1: at, y1: from, x2: at, y2: to } : { x1: from, y1: at, x2: to, y2: at };
  const text = vertical ? { x: at - 90, y: mid } : { x: mid, y: at - 70 };

  return (
    <g className="text-steel">
      <line {...line} stroke="currentColor" strokeWidth={8} markerStart="url(#tick)" markerEnd="url(#tick)" />
      <text
        {...text}
        fill="currentColor"
        fontSize={120}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={vertical ? `rotate(-90 ${text.x} ${text.y})` : undefined}
      >
        {label}
      </text>
    </g>
  );
}

export function ElevationDrawing() {
  const { length, height, wheelbase } = ELEVATION_DIMENSIONS;

  return (
    <figure className="w-full">
      <svg
        viewBox={`${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`}
        className="h-auto w-full text-steel"
        role="img"
        aria-label={`نمای جانبی با طول ${formatNumber(length)}، ارتفاع ${formatNumber(height)} و فاصله‌ی دو محور ${formatNumber(wheelbase)} میلی‌متر`}
      >
        <defs>
          <marker id="tick" viewBox="-4 -40 8 80" markerWidth={4} markerHeight={40} markerUnits="userSpaceOnUse" orient="auto">
            <line x1={0} y1={-40} x2={0} y2={40} stroke="currentColor" strokeWidth={8} />
          </marker>
        </defs>

        <line x1={-200} x2={4980} y1={GROUND_Y} y2={GROUND_Y} className="stroke-cyc-deep" strokeWidth={6} />
        <path d={SILHOUETTE} className="fill-cyc stroke-graphite" strokeWidth={14} strokeLinejoin="round" />
        {[REAR_AXLE_X, FRONT_AXLE_X].map((x) => (
          <g key={x}>
            <circle cx={x} cy={GROUND_Y - WHEEL_RADIUS} r={WHEEL_RADIUS} className="fill-paper stroke-graphite" strokeWidth={14} />
            <circle cx={x} cy={GROUND_Y - WHEEL_RADIUS} r={WHEEL_RADIUS * 0.62} className="fill-none stroke-giallo" strokeWidth={14} />
          </g>
        ))}

        <DimensionLine from={0} to={length} at={-420} label={formatNumber(length)} />
        <DimensionLine from={REAR_AXLE_X} to={FRONT_AXLE_X} at={GROUND_Y + 260} label={formatNumber(wheelbase)} />
        <DimensionLine from={0} to={height} at={-160} label={formatNumber(height)} vertical />
      </svg>
      <figcaption className="mt-3 text-xs text-steel">اندازه‌ها به میلی‌متر، با مقیاس واقعی</figcaption>
    </figure>
  );
}
