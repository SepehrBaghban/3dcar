"use client";

import LinearProgress from "@mui/material/LinearProgress";
import { useProgress } from "@react-three/drei";
import { formatNumber } from "@/features/shared/lib/format";
import { cn } from "@/features/shared/lib/cn";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";

/** Shows download progress of the 3D assets and fades out once the car is on stage. */
export function LoadingOverlay() {
  const isSceneReady = useShowroomStore((state) => state.isSceneReady);
  const { progress } = useProgress();
  const roundedProgress = Math.round(progress);

  return (
    <div
      aria-hidden={isSceneReady}
      className={cn(
        "pointer-events-none absolute inset-0 z-30 grid place-items-center transition-opacity duration-700",
        isSceneReady ? "opacity-0" : "opacity-100",
      )}
    >
      <div role="status" className="w-56 text-center">
        <p className="mb-3 text-sm font-medium text-steel">آماده‌سازی خودرو در استودیو</p>
        <LinearProgress
          variant={roundedProgress > 0 ? "determinate" : "indeterminate"}
          value={roundedProgress}
          aria-label="پیشرفت بارگذاری"
          className="h-1 rounded-full bg-cyc-deep [&_.MuiLinearProgress-bar]:bg-graphite"
        />
        <p className="mt-2 text-xs text-steel tabular-nums">{formatNumber(roundedProgress)}٪</p>
      </div>
    </div>
  );
}
