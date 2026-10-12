"use client";

import Chip from "@mui/material/Chip";
import { cn } from "@/features/shared/lib/cn";
import {
  EXTERIOR_VIEWPOINT_IDS,
  INTERIOR_VIEWPOINT_IDS,
  VIEWPOINTS,
} from "@/features/showroom/config/viewpoints";
import { selectViewMode, useShowroomStore } from "@/features/showroom/store/showroom-store";

export function ViewpointNav() {
  const mode = useShowroomStore(selectViewMode);
  const activeViewpointId = useShowroomStore((state) => state.activeViewpointId);
  const goToViewpoint = useShowroomStore((state) => state.goToViewpoint);
  const viewpointIds = mode === "exterior" ? EXTERIOR_VIEWPOINT_IDS : INTERIOR_VIEWPOINT_IDS;

  return (
    <nav aria-label="زاویه‌های دید" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
      {viewpointIds.map((id) => {
        const isActive = id === activeViewpointId;
        return (
          <Chip
            key={id}
            label={VIEWPOINTS[id].label}
            onClick={() => goToViewpoint(id)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "h-8 shrink-0 rounded-full px-1 text-[13px] font-medium backdrop-blur transition-colors",
              isActive
                ? "bg-graphite text-paper hover:bg-graphite"
                : "bg-paper/80 text-graphite ring-1 ring-graphite/10 hover:bg-paper",
            )}
          />
        );
      })}
    </nav>
  );
}
