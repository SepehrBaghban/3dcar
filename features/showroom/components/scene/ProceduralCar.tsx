"use client";

import { useEffect, useMemo } from "react";
import { PAINTS } from "@/features/showroom/config/paints";
import { usePaintSync } from "@/features/showroom/hooks/usePaintSync";
import { createPaintMaterial, createTrimMaterials, disposeMaterials } from "@/features/showroom/lib/materials";
import {
  CAR_DIMENSIONS,
  createCarGeometries,
  disposeGeometries,
} from "@/features/showroom/lib/procedural-car-geometry";
import { useShowroomStore } from "@/features/showroom/store/showroom-store";
import { CarCabin } from "./procedural/CarCabin";
import { CarLights } from "./procedural/CarLights";
import { CarWheel, type WheelPlacement } from "./procedural/CarWheel";

type ProceduralCarProps = {
  usePhysicalPaint: boolean;
  onReady: () => void;
};

const { wheelbaseHalf, wheelTrackHalf, wheelCenterY } = CAR_DIMENSIONS;

const WHEEL_PLACEMENTS: readonly WheelPlacement[] = [
  { id: "front-left", position: [wheelTrackHalf, wheelCenterY, wheelbaseHalf], side: 1 },
  { id: "front-right", position: [-wheelTrackHalf, wheelCenterY, wheelbaseHalf], side: -1 },
  { id: "rear-left", position: [wheelTrackHalf, wheelCenterY, -wheelbaseHalf], side: 1 },
  { id: "rear-right", position: [-wheelTrackHalf, wheelCenterY, -wheelbaseHalf], side: -1 },
];

/** Fallback car used until a production GLB is provided. Geometries and materials are shared and disposed on unmount. */
export function ProceduralCar({ usePhysicalPaint, onReady }: ProceduralCarProps) {
  const geometries = useMemo(() => createCarGeometries(), []);
  const trim = useMemo(() => createTrimMaterials(), []);
  const paint = useMemo(
    // Initial colour only; later changes go through usePaintSync without recreating the material.
    () => createPaintMaterial(PAINTS[useShowroomStore.getState().paintId].color, usePhysicalPaint),
    [usePhysicalPaint],
  );
  const paintMaterials = useMemo(() => [paint], [paint]);

  usePaintSync(paintMaterials);
  useEffect(onReady, [onReady]);

  useEffect(() => () => disposeGeometries(geometries), [geometries]);
  useEffect(() => () => disposeMaterials(trim), [trim]);
  useEffect(() => () => paint.dispose(), [paint]);

  return (
    <group name="procedural-car">
      <mesh geometry={geometries.nose} material={paint} />
      <mesh geometry={geometries.tail} material={paint} />
      <mesh geometry={geometries.doorLeft} material={paint} />
      <mesh geometry={geometries.doorRight} material={paint} />
      <mesh geometry={geometries.roof} material={paint} position={[0, 1.135, -0.34]} />
      <mesh geometry={geometries.floor} material={trim.carbon} position={[0, 0.2, 0.1]} />
      <mesh geometry={geometries.splitter} material={trim.carbon} position={[0, 0.13, 2.25]} />
      <mesh geometry={geometries.diffuser} material={trim.carbon} position={[0, 0.22, -2.36]} />

      <mesh geometry={geometries.windshield} material={trim.glass} renderOrder={1} />
      <mesh geometry={geometries.windowLeft} material={trim.glass} renderOrder={1} />
      <mesh geometry={geometries.windowRight} material={trim.glass} renderOrder={1} />

      {WHEEL_PLACEMENTS.map((placement) => (
        <CarWheel key={placement.id} placement={placement} geometries={geometries} materials={trim} />
      ))}

      <CarLights geometry={geometries.lightBar} materials={trim} />
      <CarCabin geometries={geometries} materials={trim} />
    </group>
  );
}
