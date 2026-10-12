"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import ButtonBase from "@mui/material/ButtonBase";
import { Vector3 } from "three";
import { HOTSPOT_LIST } from "@/features/showroom/config/hotspots";
import { cn } from "@/features/shared/lib/cn";
import { DetachedRootProviders } from "@/features/shared/providers/DetachedRootProviders";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";
import type { Hotspot } from "@/features/showroom/types";

const toCamera = new Vector3();

type HotspotMarkerProps = {
  hotspot: Hotspot;
  isActive: boolean;
};

function HotspotMarker({ hotspot, isActive }: HotspotMarkerProps) {
  const openHotspot = useShowroomStore((state) => state.openHotspot);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFacingRef = useRef(true);
  const position = useMemo(() => new Vector3(...hotspot.position), [hotspot.position]);
  const normal = useMemo(() => new Vector3(...hotspot.normal).normalize(), [hotspot.normal]);

  // O(1) back-face test instead of raycast occlusion; touches the DOM only when visibility flips.
  useFrame(({ camera }) => {
    const isFacing = toCamera.subVectors(camera.position, position).dot(normal) > 0;
    if (isFacing === isFacingRef.current || !wrapperRef.current) return;
    isFacingRef.current = isFacing;
    wrapperRef.current.dataset.hidden = String(!isFacing);
  });

  return (
    <Html position={hotspot.position} center zIndexRange={[20, 0]}>
      <DetachedRootProviders>
        <div
        ref={wrapperRef}
        className="transition-opacity duration-300 data-[hidden=true]:pointer-events-none data-[hidden=true]:opacity-0"
      >
        <ButtonBase
          aria-label={hotspot.title}
          onClick={() => openHotspot(hotspot.id, hotspot.viewpointId)}
          className={cn(
            "group relative grid size-9 place-items-center rounded-full",
            "bg-paper/85 shadow-[0_2px_12px_rgba(28,32,40,0.25)] ring-1 ring-graphite/10 backdrop-blur",
            isActive && "ring-2 ring-giallo",
          )}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-giallo/40 [animation-duration:2.4s] motion-reduce:hidden" />
          <span className="relative size-2.5 rounded-full bg-giallo" />
          <span className="pointer-events-none absolute top-full mt-2 rounded-md bg-graphite px-2 py-1 text-xs whitespace-nowrap text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {hotspot.title}
          </span>
        </ButtonBase>
        </div>
      </DetachedRootProviders>
    </Html>
  );
}

/** Clickable points of interest on the exterior. Hidden in the cabin. */
export function Hotspots() {
  const activeHotspotId = useShowroomStore((state) => state.activeHotspotId);

  return (
    <group name="hotspots">
      {HOTSPOT_LIST.map((hotspot) => (
        <HotspotMarker key={hotspot.id} hotspot={hotspot} isActive={hotspot.id === activeHotspotId} />
      ))}
    </group>
  );
}
