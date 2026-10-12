import { create } from "zustand";
import { DEFAULT_PAINT_ID } from "@/features/showroom/config/paints";
import {
  DEFAULT_EXTERIOR_VIEWPOINT,
  DEFAULT_INTERIOR_VIEWPOINT,
  VIEWPOINTS,
} from "@/features/showroom/config/viewpoints";
import type { HotspotId, PaintId, ViewMode, ViewpointId } from "@/features/showroom/types";

type ShowroomState = {
  activeViewpointId: ViewpointId;
  /** Increments on every navigation, so re-selecting the same viewpoint still re-frames the camera. */
  cameraRequestId: number;
  paintId: PaintId;
  activeHotspotId: HotspotId | null;
  isSceneReady: boolean;
  /** Wheel-zoom is armed only after the visitor engages the viewer, so page scrolling never gets hijacked. */
  isWheelZoomArmed: boolean;
};

type ShowroomActions = {
  goToViewpoint: (id: ViewpointId) => void;
  enterInterior: () => void;
  exitInterior: () => void;
  setPaint: (id: PaintId) => void;
  openHotspot: (id: HotspotId, viewpointId: ViewpointId) => void;
  closeHotspot: () => void;
  markSceneReady: () => void;
  setWheelZoomArmed: (isArmed: boolean) => void;
};

export type ShowroomStore = ShowroomState & ShowroomActions;

export const useShowroomStore = create<ShowroomStore>()((set) => {
  const navigate = (viewpointId: ViewpointId, hotspotId: HotspotId | null = null) =>
    set((state) => ({
      activeViewpointId: viewpointId,
      activeHotspotId: hotspotId,
      cameraRequestId: state.cameraRequestId + 1,
    }));

  return {
    activeViewpointId: DEFAULT_EXTERIOR_VIEWPOINT,
    cameraRequestId: 0,
    paintId: DEFAULT_PAINT_ID,
    activeHotspotId: null,
    isSceneReady: false,
    isWheelZoomArmed: false,

    goToViewpoint: (id) => navigate(id),
    enterInterior: () => navigate(DEFAULT_INTERIOR_VIEWPOINT),
    exitInterior: () => navigate(DEFAULT_EXTERIOR_VIEWPOINT),
    openHotspot: (id, viewpointId) => navigate(viewpointId, id),
    closeHotspot: () => set({ activeHotspotId: null }),
    setPaint: (id) => set({ paintId: id }),
    markSceneReady: () => set({ isSceneReady: true }),
    setWheelZoomArmed: (isArmed) => set({ isWheelZoomArmed: isArmed }),
  };
});

/** Derived selector: O(1) lookup, no extra state to keep in sync. */
export const selectViewMode = (state: ShowroomState): ViewMode => VIEWPOINTS[state.activeViewpointId].mode;
