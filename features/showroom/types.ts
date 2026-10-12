/** A point in normalized car space: metres, origin at ground centre, +Z towards the nose, +X towards the driver (LHD). */
export type Vec3Tuple = readonly [x: number, y: number, z: number];

export type ViewMode = "exterior" | "interior";

export type ViewpointId = "overview" | "front" | "side" | "rear" | "wheel" | "cockpit" | "passenger";

export type Viewpoint = {
  id: ViewpointId;
  label: string;
  mode: ViewMode;
  position: Vec3Tuple;
  target: Vec3Tuple;
};

export type HotspotId = "headlights" | "wheels" | "cockpit" | "engine";

export type Hotspot = {
  id: HotspotId;
  title: string;
  description: string;
  position: Vec3Tuple;
  /** Outward direction of the surface; the marker hides when the camera is behind it (cheap occlusion). */
  normal: Vec3Tuple;
  viewpointId: ViewpointId;
};

export type PaintId = "giallo" | "arancio" | "verde" | "blu" | "bianco" | "nero";

export type Paint = {
  id: PaintId;
  label: string;
  color: string;
};

export type QualityTier = "low" | "medium" | "high";

export type QualityProfile = {
  tier: QualityTier;
  dpr: [min: number, max: number];
  antialias: boolean;
  usePhysicalPaint: boolean;
  environmentResolution: number;
  shadowMapResolution: number;
  prefersReducedMotion: boolean;
};
