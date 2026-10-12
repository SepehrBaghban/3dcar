"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { MODEL_CONFIG } from "@/features/showroom/config/model";
import { usePaintSync } from "@/features/showroom/hooks/usePaintSync";
import { prepareCarScene } from "@/features/showroom/lib/prepare-car-scene";

type GltfCarProps = {
  onReady: () => void;
};

/** Production model: loaded from a Meshopt-compressed GLB, normalized once, recoloured on demand. */
export function GltfCar({ onReady }: GltfCarProps) {
  const { scene } = useGLTF(MODEL_CONFIG.url, false, true);
  const { root, paintMaterials } = useMemo(() => prepareCarScene(scene), [scene]);

  usePaintSync(paintMaterials);
  useEffect(onReady, [onReady]);

  return <primitive object={root} />;
}
