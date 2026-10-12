"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import type { PerspectiveCamera } from "three";
import {
  CAMERA_LIMITS,
  CAMERA_SMOOTH_TIME,
  ENTER_INTERIOR_DISTANCE,
  EXIT_INTERIOR_DISTANCE,
  FOV_EASING,
} from "@/features/showroom/config/camera";
import { VIEWPOINTS } from "@/features/showroom/config/viewpoints";
import { getFramedPosition, getFramingScale } from "@/features/showroom/lib/camera-framing";
import { selectViewMode, useShowroomStore } from "@/features/showroom/store/showroom-store";
import type { ViewMode } from "@/features/showroom/types";

const { ACTION } = CameraControlsImpl;
const FOV_SETTLE_THRESHOLD = 0.05;

type CameraRigProps = {
  prefersReducedMotion: boolean;
};

function applyModeLimits(controls: CameraControlsImpl, mode: ViewMode, framingScale: number) {
  const limits = CAMERA_LIMITS[mode];
  controls.minDistance = limits.minDistance;
  controls.maxDistance = limits.maxDistance * framingScale;
  controls.minPolarAngle = limits.minPolarAngle;
  controls.maxPolarAngle = limits.maxPolarAngle;
  controls.azimuthRotateSpeed = limits.rotateSpeed;
  controls.polarRotateSpeed = limits.rotateSpeed;
}

function configureInput(controls: CameraControlsImpl) {
  controls.smoothTime = CAMERA_SMOOTH_TIME;
  controls.draggingSmoothTime = 0.12;
  controls.dollyToCursor = false;
  controls.mouseButtons.left = ACTION.ROTATE;
  controls.mouseButtons.middle = ACTION.DOLLY;
  controls.mouseButtons.right = ACTION.NONE;
  controls.touches.one = ACTION.TOUCH_ROTATE;
  controls.touches.two = ACTION.TOUCH_DOLLY;
  controls.touches.three = ACTION.NONE;
}

/**
 * Owns all camera behaviour: viewpoint transitions, exterior/interior limits,
 * zoom-to-enter / zoom-to-exit, and a short field-of-view blend between modes.
 * Everything is event driven; the only per-frame work is an O(1) FOV ease that stops when settled.
 */
export function CameraRig({ prefersReducedMotion }: CameraRigProps) {
  const controlsRef = useRef<CameraControlsImpl>(null);
  const isTransitioningRef = useRef(false);
  const lastDistanceRef = useRef(Number.POSITIVE_INFINITY);
  const invalidate = useThree((state) => state.invalidate);
  const getThreeState = useThree((state) => state.get);

  const activeViewpointId = useShowroomStore((state) => state.activeViewpointId);
  const cameraRequestId = useShowroomStore((state) => state.cameraRequestId);
  const isSceneReady = useShowroomStore((state) => state.isSceneReady);
  const isWheelZoomArmed = useShowroomStore((state) => state.isWheelZoomArmed);
  const mode = useShowroomStore(selectViewMode);

  useEffect(() => {
    if (controlsRef.current) configureInput(controlsRef.current);
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) controls.mouseButtons.wheel = isWheelZoomArmed ? ACTION.DOLLY : ACTION.NONE;
  }, [isWheelZoomArmed]);

  // `cameraRequestId` is a dependency on purpose: re-selecting the current viewpoint re-frames the camera.
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || !isSceneReady) return;

    // Aspect is read at navigation time (not subscribed) so mobile URL-bar resizes do not re-trigger transitions.
    const { width, height } = getThreeState().size;
    const viewpoint = VIEWPOINTS[activeViewpointId];
    const framingScale = getFramingScale(viewpoint, width / height);

    applyModeLimits(controls, viewpoint.mode, framingScale);
    isTransitioningRef.current = true;
    void controls.setLookAt(...getFramedPosition(viewpoint, framingScale), ...viewpoint.target, !prefersReducedMotion);
    invalidate();
  }, [activeViewpointId, cameraRequestId, isSceneReady, prefersReducedMotion, invalidate, getThreeState]);

  const handleRest = useCallback(() => {
    isTransitioningRef.current = false;
    lastDistanceRef.current = controlsRef.current?.distance ?? Number.POSITIVE_INFINITY;
  }, []);

  const handleUserControl = useCallback(() => {
    const controls = controlsRef.current;
    if (!controls || isTransitioningRef.current) return;

    // Only a zoom gesture switches modes; orbiting at a close distance must not.
    const { distance } = controls;
    const isZoomingIn = distance < lastDistanceRef.current;
    const isZoomingOut = distance > lastDistanceRef.current;
    lastDistanceRef.current = distance;

    const state = useShowroomStore.getState();
    const currentMode = selectViewMode(state);
    if (currentMode === "exterior" && isZoomingIn && distance < ENTER_INTERIOR_DISTANCE) state.enterInterior();
    else if (currentMode === "interior" && isZoomingOut && distance > EXIT_INTERIOR_DISTANCE) state.exitInterior();
  }, []);

  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera;
    const targetFov = CAMERA_LIMITS[mode].fov;
    const difference = targetFov - camera.fov;
    if (Math.abs(difference) < FOV_SETTLE_THRESHOLD) return;

    camera.fov += difference * (1 - Math.exp(-FOV_EASING * delta));
    camera.updateProjectionMatrix();
    invalidate();
  });

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      regress
      onControl={handleUserControl}
      onRest={handleRest}
    />
  );
}
