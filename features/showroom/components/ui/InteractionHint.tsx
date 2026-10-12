"use client";

import { selectViewMode, useShowroomStore } from "@/features/showroom/store/showroom-store";
import type { ViewMode } from "@/features/showroom/types";

const HINTS: Readonly<Record<ViewMode, readonly string[]>> = {
  exterior: ["برای چرخیدن دور خودرو بکشید", "برای ورود به کابین نزدیک شوید"],
  interior: ["برای نگاه به اطراف بکشید", "برای خروج از کابین دور شوید"],
};

export function InteractionHint() {
  const mode = useShowroomStore(selectViewMode);
  const isWheelZoomArmed = useShowroomStore((state) => state.isWheelZoomArmed);

  return (
    <ul className="space-y-0.5 text-xs leading-5 text-steel">
      {HINTS[mode].map((hint) => (
        <li key={hint}>{hint}</li>
      ))}
      {!isWheelZoomArmed ? (
        <li className="hidden pointer-fine:block">برای زوم با اسکرول، ابتدا روی صحنه کلیک کنید</li>
      ) : null}
    </ul>
  );
}
