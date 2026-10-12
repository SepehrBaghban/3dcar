import type { ViewMode } from "@/features/showroom/types";

type CameraLimits = {
  minDistance: number;
  maxDistance: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  /** Negative values invert dragging, which feels natural when looking around from inside. */
  rotateSpeed: number;
  fov: number;
};

export const CAMERA_LIMITS: Readonly<Record<ViewMode, CameraLimits>> = {
  exterior: {
    minDistance: 2.2,
    maxDistance: 10,
    minPolarAngle: 0.15,
    maxPolarAngle: Math.PI / 2 - 0.04,
    rotateSpeed: 1,
    fov: 38,
  },
  interior: {
    minDistance: 0.02,
    maxDistance: 0.9,
    minPolarAngle: 0.35,
    maxPolarAngle: Math.PI - 0.35,
    rotateSpeed: -0.35,
    fov: 68,
  },
};

/** Zooming closer than this from outside takes the visitor into the cabin. */
export const ENTER_INTERIOR_DISTANCE = 2.6;
/** Zooming further than this from inside steps back out. */
export const EXIT_INTERIOR_DISTANCE = 0.6;

export const CAMERA_SMOOTH_TIME = 0.35;
export const FOV_EASING = 6;
