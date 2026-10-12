import { Box3, Group, Mesh, MeshPhysicalMaterial, Vector3, type Object3D } from "three";
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
 * Any transmissive material makes three.js render the whole opaque scene a second time, every frame.
 * On small lenses (tail lights, indicators) plain alpha blending looks the same at a fraction of the cost.
 */
function flattenTransmission(material: unknown) {
  if (!(material instanceof MeshPhysicalMaterial) || material.transmission === 0) return;
  material.transmission = 0;
  material.transparent = true;
}

/**
 * One-time preparation of a loaded GLB, run once when the asset arrives (never per frame):
 * - works on a clone of the cached scene: an Object3D has a single parent, so re-parenting the
 *   cached scene itself would empty the previous result (Strict Mode runs useMemo twice and keeps
 *   the first one). The clone shares geometries and materials, so it costs only the node objects.
 * - scales the car to its real length and sits it on the ground at the origin
 * - freezes matrices of static meshes and collects paint materials for cheap recolouring
 * - replaces transmission with alpha blending to avoid an extra render pass
 */
export function prepareCarScene(scene: Object3D): PreparedCar {
  const root = new Group();
  const orientation = new Group();
  orientation.rotation.y = MODEL_CONFIG.rotationY;
  const car = scene.clone();
  orientation.add(car);
  root.add(orientation);
  root.updateMatrixWorld(true);

  const bounds = new Box3().setFromObject(orientation);
  const size = bounds.getSize(new Vector3());
  const center = bounds.getCenter(new Vector3());
  const scale = MODEL_CONFIG.targetLength / Math.max(size.x, size.z);

  root.scale.setScalar(scale);
  root.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);

  const paintMaterials = new Set<PaintableMaterial>();
  car.traverse((node) => {
    node.matrixAutoUpdate = false;
    node.updateMatrix();
    if (!(node instanceof Mesh)) return;

    const materials: unknown[] = Array.isArray(node.material) ? node.material : [node.material];
    for (const material of materials) {
      flattenTransmission(material);
      if (isPaintable(material) && MODEL_CONFIG.paintMaterialPattern.test(material.name)) {
        paintMaterials.add(material);
      }
    }
  });

  return { root, paintMaterials: [...paintMaterials] };
}
