"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import { cn } from "@/features/shared/lib/cn";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";
import { FullscreenButton } from "./ui/FullscreenButton";
import { HotspotPanel } from "./ui/HotspotPanel";
import { InteractionHint } from "./ui/InteractionHint";
import { LoadingOverlay } from "./ui/LoadingOverlay";
import { PaintPicker } from "./ui/PaintPicker";
import { ViewModeToggle } from "./ui/ViewModeToggle";
import { ViewpointNav } from "./ui/ViewpointNav";

// WebGL never runs on the server; this also keeps three.js out of the initial JS bundle.
const ShowroomCanvas = dynamic(() => import("./scene/ShowroomCanvas"), { ssr: false });

type ShowroomViewerProps = {
  /** Content layered over the top of the stage, e.g. the page headline. */
  headline?: ReactNode;
  /** Large lettering painted on the studio wall behind the car. */
  backdropText?: string;
  className?: string;
};

export function ShowroomViewer({ headline, backdropText, className }: ShowroomViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const setWheelZoomArmed = useShowroomStore((state) => state.setWheelZoomArmed);

  return (
    <div
      ref={stageRef}
      onPointerDown={() => setWheelZoomArmed(true)}
      onPointerLeave={() => setWheelZoomArmed(false)}
      className={cn(
        "relative isolate overflow-hidden bg-cyc",
        "bg-[radial-gradient(120%_80%_at_50%_95%,var(--color-paper)_0%,var(--color-cyc)_45%,var(--color-cyc-deep)_100%)]",
        className,
      )}
    >
      {backdropText ? (
        <span
          aria-hidden
          dir="ltr"
          className="pointer-events-none absolute inset-x-0 top-[34%] -z-0 text-center text-[19vw] leading-none font-black tracking-[-0.04em] text-graphite/[0.06] select-none lg:top-[28%]"
        >
          {backdropText}
        </span>
      ) : null}

      <div className="absolute inset-0 z-10">
        <ShowroomCanvas />
      </div>

      <LoadingOverlay />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 sm:p-6 lg:p-10">
        <div className="pointer-events-auto">{headline}</div>
        <div className="pointer-events-auto">
          <FullscreenButton targetRef={stageRef} />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col gap-3 p-4 sm:p-6 lg:p-10">
        <div className="pointer-events-auto self-start">
          <HotspotPanel />
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="pointer-events-auto flex min-w-0 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <ViewModeToggle />
              <PaintPicker />
            </div>
            <ViewpointNav />
          </div>
          <div className="hidden lg:block">
            <InteractionHint />
          </div>
        </div>
      </div>
    </div>
  );
}
