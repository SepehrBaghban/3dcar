"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

type StudioEnvironmentProps = {
  environmentResolution: number;
  shadowResolution: number;
  /** The contact shadow is baked once, so it must wait until the car is in the scene. */
  isCarReady: boolean;
};

/**
 * Photo-studio lighting made of procedural light panels: no HDR download, and both the
 * environment map and the contact shadow are rendered exactly once (`frames={1}`).
 */
export function StudioEnvironment({ environmentResolution, shadowResolution, isCarReady }: StudioEnvironmentProps) {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#9aa3ad", 0.6]} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />

      <Environment resolution={environmentResolution} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-6, 2, 0]} rotation-y={Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[6, 2, 0]} rotation-y={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="ring" intensity={2} position={[0, 3, 7]} scale={3} />
        <Lightformer form="rect" color="#c9ced5" intensity={0.6} position={[0, -1, 0]} rotation-x={-Math.PI / 2} scale={[20, 20, 1]} />
      </Environment>

      {isCarReady ? (
        <ContactShadows
          frames={1}
          position={[0, 0.001, 0]}
          scale={9}
          far={1.6}
          blur={2.4}
          opacity={0.62}
          resolution={shadowResolution}
          color="#1c2028"
        />
      ) : null}
    </>
  );
}
