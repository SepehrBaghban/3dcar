import { Box3, Group, Mesh, Vector3, type Object3D } from "three";
import { MODEL_CONFIG } from "@/features/showroom/config/model";
import type { PaintableMaterial } from "@/features/showroom/lib/materials";

export type PreparedCar = {
  root: Group;
  paintMaterials: PaintableMaterial[];
};

function isPaintable(material: unknown): material is PaintableMaterial {
  return typeof material === "object" && material !== null && "color" in material && "isMeshStandardMaterial" in material;
}

/**
 * One-time preparation of a loaded GLB, run once when the asset arrives (never per frame):
 * - wraps the cached scene in fresh groups, so it is idempotent under React Strict Mode
 * - scales the car to its real length and sits it on the ground at the origin
 * - freezes matrices of static meshes and collects paint materials for cheap recolouring
 */
export function prepareCarScene(scene: Object3D): PreparedCar {
  const root = new Group();
  const orientation = new Group();
  orientation.rotation.y = MODEL_CONFIG.rotationY;
  orientation.add(scene);
  root.add(orientation);
  root.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(orientation);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const scale = MODEL_CONFIG.targetLength / Math.max(size.x, size.z);

  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);

  const paintMaterials = new Set<PaintableMaterial>();
  scene.traverse((node) => {
    node.matrixAutoUpdate = false;
    node.updateMatrix();
    if (!(node instanceof Mesh)) return;

    const materials: unknown[] = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      if (isPaintable(material) && MODEL_CONFIG.paintMaterialPattern.test(material.name)) {
        paintMaterials.add(material);
      }
    }
  });

  return { root, paintMaterials: [...paintMaterials] };
}
