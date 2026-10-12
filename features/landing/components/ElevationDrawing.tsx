import { formatNumber } from "@/features/shared/lib/format";
import { ELEVATION_DIMENSIONS } from "@/features/landing/data/specs";

/** Side elevation drawn in millimetres (1 SVG unit = 1 mm) so dimension lines are true to scale. */
const MARGIN = 300;
const VIEW_BOX = {
  x: -MARGIN,
  y: -650,
  width: ELEVATION_DIMENSIONS.length + 2 * MARGIN,
  height: ELEVATION_DIMENSIONS.height + 1115,
} as const;
const GROUND_Y = ELEVATION_DIMENSIONS.height;
const WHEEL_RADIUS = 325;
const REAR_AXLE_X = 740;
const FRONT_AXLE_X = REAR_AXLE_X + ELEVATION_DIMENSIONS.wheelbase;

/** Side profile traced from the 3D model's mesh: tail at x = 0, nose at +x, roof at y = 0. */
const SILHOUETTE =
  "M 40 1035 L 0 960 L 0 237 L 440 214 L 1240 90 L 1640 12 L 2200 0 L 2560 23 L 2840 99 L 3280 269 L 3600 308 L 3680 374 L 3880 429 L 4160 560 L 4345 679 L 4345 960 L 4290 1035 Z";

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

        <line x1={-200} x2={ELEVATION_DIMENSIONS.length + 200} y1={GROUND_Y} y2={GROUND_Y} className="stroke-cyc-deep" strokeWidth={6} />
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
