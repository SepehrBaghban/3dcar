import { Color, DoubleSide, MeshPhysicalMaterial, MeshStandardMaterial, type Material } from "three";

export type PaintableMaterial = MeshStandardMaterial | MeshPhysicalMaterial;

/** Clear-coated car paint. Falls back to the cheaper standard material on low-end devices. */
export function createPaintMaterial(color: string, usePhysical: boolean): PaintableMaterial {
  if (!usePhysical) {
    return new MeshStandardMaterial({ color, metalness: 0.55, roughness: 0.32 });
  }
  return new MeshPhysicalMaterial({
    color,
    metalness: 0.6,
    roughness: 0.38,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });
}

/** Static trim materials, created once per scene and shared by every mesh that needs them. */
export function createTrimMaterials() {
  return {
    carbon: new MeshStandardMaterial({ color: "#15171b", metalness: 0.3, roughness: 0.55 }),
    glass: new MeshStandardMaterial({
      color: "#0d1117",
      metalness: 0.9,
      roughness: 0.05,
      transparent: true,
      opacity: 0.38,
      side: DoubleSide,
      depthWrite: false,
    }),
    tyre: new MeshStandardMaterial({ color: "#121316", roughness: 0.9, side: DoubleSide }),
    rim: new MeshStandardMaterial({ color: "#2b2e34", metalness: 0.9, roughness: 0.25 }),
    caliper: new MeshStandardMaterial({ color: "#e8ad0c", metalness: 0.2, roughness: 0.4 }),
    leather: new MeshStandardMaterial({ color: "#2a2420", roughness: 0.7 }),
    stitching: new MeshStandardMaterial({ color: "#8a6a2e", roughness: 0.6 }),
    alcantara: new MeshStandardMaterial({ color: "#1d1f23", roughness: 0.95 }),
    headlight: new MeshStandardMaterial({ color: "#ffffff", emissive: "#e9f2ff", emissiveIntensity: 2.2 }),
    taillight: new MeshStandardMaterial({ color: "#3a0505", emissive: "#ff2a1a", emissiveIntensity: 1.6 }),
    screen: new MeshStandardMaterial({ color: "#050608", emissive: "#2fb8ff", emissiveIntensity: 0.55 }),
  };
}

export type TrimMaterials = ReturnType<typeof createTrimMaterials>;

/** Applies a colour to every paint material. Cost is O(k) for k paint materials, not O(meshes). */
export function applyPaintColor(materials: readonly PaintableMaterial[], color: string) {
  const target = new Color(color);
  for (const material of materials) material.color.copy(target);
}

export function disposeMaterials(materials: Record<string, Material>) {
  for (const material of Object.values(materials)) material.dispose();
}
