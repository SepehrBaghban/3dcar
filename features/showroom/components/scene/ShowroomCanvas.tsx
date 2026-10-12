"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { PERFORMANCE_REGRESS_FLOOR } from "@/features/showroom/config/quality";
import { INTRO_CAMERA_POSITION } from "@/features/showroom/config/viewpoints";
import { CAMERA_LIMITS } from "@/features/showroom/config/camera";
import { useQualityProfile } from "@/features/showroom/hooks/useQualityProfile";
import { selectViewMode, useShowroomStore } from "@/features/showroom/store/showroom-store";
import { CameraRig } from "./CameraRig";
import { CarModel } from "./CarModel";
import { Hotspots } from "./Hotspots";
import { StudioEnvironment } from "./StudioEnvironment";

/**
 * The WebGL canvas. Rendering is on demand: frames are drawn only while something
 * changes (camera motion, paint swap), so an idle viewer costs ~0% GPU.
 */
export default function ShowroomCanvas() {
  const quality = useQualityProfile();
  const isSceneReady = useShowroomStore((state) => state.isSceneReady);
  const isExterior = useShowroomStore((state) => selectViewMode(state) === "exterior");

  return (
    <Canvas
      frameloop="demand"
      dpr={quality.dpr}
      performance={{ min: PERFORMANCE_REGRESS_FLOOR }}
      camera={{ position: [...INTRO_CAMERA_POSITION], fov: CAMERA_LIMITS.exterior.fov, near: 0.01, far: 60 }}
      gl={{
        antialias: quality.antialias,
        alpha: true,
        stencil: false,
        powerPreference: quality.tier === "high" ? "high-performance" : "default",
        toneMapping: ACESFilmicToneMapping,
        outputColorSpace: SRGBColorSpace,
      }}
      className="touch-none"
    >
      <AdaptiveDpr />
      <StudioEnvironment
        environmentResolution={quality.environmentResolution}
        shadowResolution={quality.shadowMapResolution}
        isCarReady={isSceneReady}
      />
      <CarModel usePhysicalPaint={quality.usePhysicalPaint} />
      {isSceneReady && isExterior ? <Hotspots /> : null}
      <CameraRig prefersReducedMotion={quality.prefersReducedMotion} />
    </Canvas>
  );
}
