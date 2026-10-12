import type { Vec3Tuple } from "@/features/showroom/types";
import type { TrimMaterials } from "@/features/showroom/lib/materials";
import { CAR_DIMENSIONS, type CarGeometries } from "@/features/showroom/lib/procedural-car-geometry";

export type WheelPlacement = {
  id: string;
  position: Vec3Tuple;
  /** +1 for the left side of the car, -1 for the right; flips the face details outward. */
  side: 1 | -1;
};

type CarWheelProps = {
  placement: WheelPlacement;
  geometries: CarGeometries;
  materials: TrimMaterials;
};

const SPOKE_COUNT = 5;
const SPOKE_ANGLES = Array.from({ length: SPOKE_COUNT }, (_, index) => (index / SPOKE_COUNT) * Math.PI * 2);
const FACE_OFFSET = 0.13;
const SPOKE_REACH = 0.13;
const SIDEWALL_OFFSETS = [CAR_DIMENSIONS.wheelWidth / 2, -CAR_DIMENSIONS.wheelWidth / 2] as const;

export function CarWheel({ placement, geometries, materials }: CarWheelProps) {
  const face = FACE_OFFSET * placement.side;

  return (
    <group position={placement.position}>
      <mesh geometry={geometries.tyre} material={materials.tyre} />
      {SIDEWALL_OFFSETS.map((offset) => (
        <mesh key={offset} geometry={geometries.sidewall} material={materials.tyre} position={[offset, 0, 0]} />
      ))}
      <mesh geometry={geometries.brakeDisc} material={materials.rim} position={[face * 0.4, 0, 0]} />
      <mesh geometry={geometries.caliper} material={materials.caliper} position={[face * 0.6, 0.1, -0.15]} />
      <mesh geometry={geometries.rimRing} material={materials.rim} position={[face, 0, 0]} />
      <mesh geometry={geometries.hub} material={materials.rim} position={[face, 0, 0]} />
      {SPOKE_ANGLES.map((angle) => (
        <group key={angle} rotation={[angle, 0, 0]} position={[face, 0, 0]}>
          <mesh geometry={geometries.spoke} material={materials.rim} position={[0, SPOKE_REACH, 0]} />
        </group>
      ))}
    </group>
  );
}
