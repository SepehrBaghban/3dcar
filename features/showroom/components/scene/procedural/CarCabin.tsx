import type { TrimMaterials } from "@/features/showroom/lib/materials";
import type { CarGeometries } from "@/features/showroom/lib/procedural-car-geometry";

type CarCabinProps = {
  geometries: CarGeometries;
  materials: TrimMaterials;
};

const SEAT_X_POSITIONS = [0.36, -0.36] as const;
const DRIVER_X = SEAT_X_POSITIONS[0];

export function CarCabin({ geometries, materials }: CarCabinProps) {
  return (
    <group name="cabin">
      {SEAT_X_POSITIONS.map((x) => (
        <group key={x} position={[x, 0, -0.3]}>
          <mesh geometry={geometries.seatCushion} material={materials.leather} position={[0, 0.32, 0]} />
          <group position={[0, 0.66, -0.27]} rotation={[-0.22, 0, 0]}>
            <mesh geometry={geometries.seatBack} material={materials.leather} />
            <mesh geometry={geometries.seatStripe} material={materials.stitching} position={[0, 0, 0.065]} />
          </group>
        </group>
      ))}

      <mesh geometry={geometries.dashboard} material={materials.alcantara} position={[0, 0.66, 0.62]} />
      <mesh geometry={geometries.tunnel} material={materials.carbon} position={[0, 0.38, 0.05]} />

      <mesh
        geometry={geometries.clusterScreen}
        material={materials.screen}
        position={[DRIVER_X, 0.8, 0.5]}
        rotation={[0.3, Math.PI, 0]}
      />
      <mesh
        geometry={geometries.centerScreen}
        material={materials.screen}
        position={[0, 0.7, 0.4]}
        rotation={[0.6, Math.PI, 0]}
      />

      <group position={[DRIVER_X, 0.76, 0.22]} rotation={[0.41, 0, 0]}>
        <mesh geometry={geometries.steeringRim} material={materials.alcantara} />
        <mesh geometry={geometries.steeringHub} material={materials.carbon} />
        <mesh
          geometry={geometries.steeringColumn}
          material={materials.carbon}
          position={[0, 0, 0.16]}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}
