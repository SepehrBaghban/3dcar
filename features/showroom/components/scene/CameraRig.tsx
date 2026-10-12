"use client";

import { useCallback, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls, CameraControlsImpl } from "@react-three/drei";
import type { PerspectiveCamera } from "three";
import {
  AUTO_ROTATE,
  CAMERA_LIMITS,
  CAMERA_SMOOTH_TIME,
  ENTER_INTERIOR_DISTANCE,
  EXIT_INTERIOR_DISTANCE,
  FOV_EASING,
} from "@/features/showroom/config/camera";
import { DEFAULT_EXTERIOR_VIEWPOINT, VIEWPOINTS } from "@/features/showroom/config/viewpoints";
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
 * zoom-to-enter / zoom-to-exit, a short field-of-view blend between modes, and an idle turntable spin.
 * Everything is event driven; per-frame work is O(1): a FOV ease that stops when settled, and the spin,
 * which keeps frames coming only while it runs.
 */
export function CameraRig({ prefersReducedMotion }: CameraRigProps) {
  const controlsRef = useRef<CameraControlsImpl>(null);
  const isTransitioningRef = useRef(false);
  const lastDistanceRef = useRef(Number.POSITIVE_INFINITY);
  const lastInteractionAtRef = useRef(Number.NEGATIVE_INFINITY);
  const resumeTimerRef = useRef<number | undefined>(undefined);
  const isAutoRotatingRef = useRef(false);
  const invalidate = useThree((state) => state.invalidate);
  const regress = useThree((state) => state.performance.regress);
  const getThreeState = useThree((state) => state.get);

  const activeViewpointId = useShowroomStore((state) => state.activeViewpointId);
  const cameraRequestId = useShowroomStore((state) => state.cameraRequestId);
  const isSceneReady = useShowroomStore((state) => state.isSceneReady);
  const isWheelZoomArmed = useShowroomStore((state) => state.isWheelZoomArmed);
  const mode = useShowroomStore(selectViewMode);
  const canAutoRotate = isSceneReady && !prefersReducedMotion && activeViewpointId === DEFAULT_EXTERIOR_VIEWPOINT;

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

  useEffect(() => () => window.clearTimeout(resumeTimerRef.current), []);

  /** Pauses the spin; a single delayed frame then lets `useFrame` pick it up again once the visitor is idle. */
  const pauseAutoRotate = useCallback(() => {
    lastInteractionAtRef.current = performance.now();
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(invalidate, AUTO_ROTATE.resumeDelayMs);
  }, [invalidate]);

  // Lower the resolution while the camera moves, but not for the slow spin, which would otherwise look soft all the time.
  const handleUpdate = useCallback(() => {
    if (!isAutoRotatingRef.current) regress();
  }, [regress]);

  const handleRest = useCallback(() => {
    isTransitioningRef.current = false;
    lastDistanceRef.current = controlsRef.current?.distance ?? Number.POSITIVE_INFINITY;
    invalidate();
  }, [invalidate]);

  const handleUserControl = useCallback(() => {
    pauseAutoRotate();
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
  }, [pauseAutoRotate]);

  useFrame((state, delta) => {
    const camera = state.camera as PerspectiveCamera;
    const difference = CAMERA_LIMITS[mode].fov - camera.fov;
    if (Math.abs(difference) >= FOV_SETTLE_THRESHOLD) {
      camera.fov += difference * (1 - Math.exp(-FOV_EASING * delta));
      camera.updateProjectionMatrix();
      invalidate();
    }

    const isIdle = performance.now() - lastInteractionAtRef.current >= AUTO_ROTATE.resumeDelayMs;
    isAutoRotatingRef.current = canAutoRotate && isIdle && !isTransitioningRef.current;
    if (!isAutoRotatingRef.current) return;

    void controlsRef.current?.rotate(AUTO_ROTATE.speed * Math.min(delta, AUTO_ROTATE.maxFrameDelta), 0, false);
    invalidate();
  });

  return (
    <CameraControls
      ref={controlsRef}
      makeDefault
      onControlStart={pauseAutoRotate}
      onControl={handleUserControl}
      onControlEnd={pauseAutoRotate}
      onUpdate={handleUpdate}
      onRest={handleRest}
    />
  );
}
