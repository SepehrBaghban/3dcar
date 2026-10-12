import { MathUtils } from "three";
import type { Vec3Tuple, Viewpoint } from "@/features/showroom/types";

/** Viewpoints are authored for a landscape stage; narrower screens pull the camera back proportionally. */
const REFERENCE_ASPECT = 1.6;
const MAX_FRAMING_SCALE = 2.4;

export function getFramingScale(viewpoint: Viewpoint, aspect: number): number {
  if (viewpoint.mode === "interior") return 1;
  return MathUtils.clamp(REFERENCE_ASPECT / aspect, 1, MAX_FRAMING_SCALE);
}

/** Moves the camera along its line of sight so the same composition fits the current aspect ratio. */
export function getFramedPosition(viewpoint: Viewpoint, scale: number): Vec3Tuple {
  const [px, py, pz] = viewpoint.position;
  const [tx, ty, tz] = viewpoint.target;
  return [tx + (px - tx) * scale, ty + (py - ty) * scale, tz + (pz - tz) * scale];
}
