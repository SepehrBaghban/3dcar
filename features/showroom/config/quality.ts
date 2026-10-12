import type { QualityProfile, QualityTier } from "@/features/showroom/types";

type TierSettings = Omit<QualityProfile, "tier" | "prefersReducedMotion">;

export const QUALITY_PRESETS: Readonly<Record<QualityTier, TierSettings>> = {
  low: {
    dpr: [0.75, 1.25],
    antialias: false,
    usePhysicalPaint: false,
    environmentResolution: 64,
    shadowMapResolution: 256,
  },
  medium: {
    dpr: [1, 1.6],
    antialias: true,
    usePhysicalPaint: true,
    environmentResolution: 128,
    shadowMapResolution: 512,
  },
  high: {
    dpr: [1, 2],
    antialias: true,
    usePhysicalPaint: true,
    environmentResolution: 256,
    shadowMapResolution: 1024,
  },
};

/** Resolution floor while the camera is moving; restored once it rests. */
export const PERFORMANCE_REGRESS_FLOOR = 0.6;
