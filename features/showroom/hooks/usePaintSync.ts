import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PAINTS } from "@/features/showroom/config/paints";
import { applyPaintColor, type PaintableMaterial } from "@/features/showroom/lib/materials";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";

/** Keeps the given paint materials in sync with the selected colour and requests a single redraw. */
export function usePaintSync(materials: readonly PaintableMaterial[]) {
  const paintId = useShowroomStore((state) => state.paintId);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    applyPaintColor(materials, PAINTS[paintId].color);
    invalidate();
  }, [materials, paintId, invalidate]);
}
