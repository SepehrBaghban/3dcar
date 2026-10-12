"use client";

import { Suspense } from "react";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";
import { GltfCar } from "./GltfCar";
import { ModelErrorBoundary } from "./ModelErrorBoundary";
import { ProceduralCar } from "./ProceduralCar";

type CarModelProps = {
  usePhysicalPaint: boolean;
};

/** Loads the production GLB; while it streams, or if it is missing, nothing breaks. */
export function CarModel({ usePhysicalPaint }: CarModelProps) {
  const markSceneReady = useShowroomStore((state) => state.markSceneReady);
  const fallbackCar = <ProceduralCar usePhysicalPaint={usePhysicalPaint} onReady={markSceneReady} />;

  return (
    <ModelErrorBoundary fallback={fallbackCar}>
      <Suspense fallback={null}>
        <GltfCar onReady={markSceneReady} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
