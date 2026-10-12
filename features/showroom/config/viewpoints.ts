import type { Viewpoint, ViewpointId } from "@/features/showroom/types";

/**
 * Camera stations in normalized car space (see `Vec3Tuple`).
 * Interior stations place the target at the occupant's eye; the camera sits a few
 * centimetres behind it so orbiting turns into a natural "look around".
 */
export const VIEWPOINTS: Readonly<Record<ViewpointId, Viewpoint>> = {
  overview: {
    id: "overview",
    label: "نمای کلی",
    mode: "exterior",
    position: [4.6, 1.7, 4.9],
    target: [0, 0.5, 0],
  },
  front: {
    id: "front",
    label: "جلو",
    mode: "exterior",
    position: [1.4, 0.85, 5.4],
    target: [0, 0.5, 0.8],
  },
  side: {
    id: "side",
    label: "پروفایل",
    mode: "exterior",
    position: [6.2, 0.95, 0],
    target: [0, 0.55, 0],
  },
  rear: {
    id: "rear",
    label: "عقب",
    mode: "exterior",
    position: [-2.4, 1.9, -5.4],
    target: [0, 0.65, -0.9],
  },
  wheel: {
    id: "wheel",
    label: "رینگ و ترمز",
    mode: "exterior",
    position: [3.2, 0.7, 2.6],
    target: [0.85, 0.36, 0.97],
  },
  cockpit: {
    id: "cockpit",
    label: "صندلی راننده",
    mode: "interior",
    position: [0.32, 0.94, 0.07],
    target: [0.32, 0.92, 0.12],
  },
  passenger: {
    id: "passenger",
    label: "صندلی سرنشین",
    mode: "interior",
    position: [-0.32, 0.94, 0.07],
    target: [-0.3, 0.92, 0.12],
  },
};

export const EXTERIOR_VIEWPOINT_IDS: readonly ViewpointId[] = ["overview", "front", "side", "rear", "wheel"];
export const INTERIOR_VIEWPOINT_IDS: readonly ViewpointId[] = ["cockpit", "passenger"];

export const DEFAULT_EXTERIOR_VIEWPOINT: ViewpointId = "overview";
export const DEFAULT_INTERIOR_VIEWPOINT: ViewpointId = "cockpit";

/** Where the camera starts before the intro fly-in. */
export const INTRO_CAMERA_POSITION = [9, 3.2, 9] as const;
