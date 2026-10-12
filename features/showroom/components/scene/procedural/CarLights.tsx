import type { BufferGeometry } from "three";
import type { TrimMaterials } from "@/features/showroom/lib/materials";
import type { Vec3Tuple } from "@/features/showroom/types";

type LightBar = {
  id: string;
  kind: "headlight" | "taillight";
  position: Vec3Tuple;
  rotation: Vec3Tuple;
  scale: Vec3Tuple;
};

/** Y-shaped light signatures, mirrored left/right from one definition. */
const HALF_SIGNATURE: readonly Omit<LightBar, "id">[] = [
  { kind: "headlight", position: [0.6, 0.52, 2.24], rotation: [0.2, 0.35, 0], scale: [0.34, 0.025, 0.08] },
  { kind: "headlight", position: [0.46, 0.47, 2.29], rotation: [0.2, 0.35, -0.6], scale: [0.14, 0.02, 0.05] },
  { kind: "taillight", position: [0.62, 0.7, -2.4], rotation: [0, 0, 0.45], scale: [0.36, 0.035, 0.02] },
  { kind: "taillight", position: [0.62, 0.6, -2.4], rotation: [0, 0, -0.45], scale: [0.36, 0.035, 0.02] },
];

const LIGHT_BARS: readonly LightBar[] = HALF_SIGNATURE.flatMap((bar, index) => [
  { ...bar, id: `${bar.kind}-${index}-l` },
  {
    ...bar,
    id: `${bar.kind}-${index}-r`,
    position: [-bar.position[0], bar.position[1], bar.position[2]],
    rotation: [bar.rotation[0], -bar.rotation[1], -bar.rotation[2]],
  },
]);

type CarLightsProps = {
  geometry: BufferGeometry;
  materials: TrimMaterials;
};

export function CarLights({ geometry, materials }: CarLightsProps) {
  return (
    <group name="lights">
      {LIGHT_BARS.map((bar) => (
        <mesh
          key={bar.id}
          geometry={geometry}
          material={materials[bar.kind]}
          position={bar.position}
          rotation={bar.rotation}
          scale={bar.scale}
        />
      ))}
    </group>
  );
}
