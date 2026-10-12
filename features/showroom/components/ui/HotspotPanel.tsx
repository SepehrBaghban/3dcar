"use client";

import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { HOTSPOTS } from "@/features/showroom/config/hotspots";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";

/** Details for the selected hotspot. Rendered as a live region so screen readers announce it. */
export function HotspotPanel() {
  const activeHotspotId = useShowroomStore((state) => state.activeHotspotId);
  const closeHotspot = useShowroomStore((state) => state.closeHotspot);

  if (!activeHotspotId) return null;
  const hotspot = HOTSPOTS[activeHotspotId];

  return (
    <aside
      aria-live="polite"
      className="w-full max-w-sm rounded-2xl bg-paper/92 p-4 shadow-[0_12px_40px_-12px_rgba(28,32,40,0.35)] ring-1 ring-graphite/10 backdrop-blur"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-graphite">{hotspot.title}</h3>
        <IconButton aria-label="بستن توضیحات" size="small" onClick={closeHotspot} className="-mt-1 -me-1 text-steel">
          <Close fontSize="small" />
        </IconButton>
      </div>
      <p className="mt-1 text-sm leading-7 text-steel">{hotspot.description}</p>
    </aside>
  );
}
