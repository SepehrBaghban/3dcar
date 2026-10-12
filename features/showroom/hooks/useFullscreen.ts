import { useCallback, useSyncExternalStore, type RefObject } from "react";

function subscribe(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

const getIsFullscreen = () => document.fullscreenElement !== null;
const getIsSupported = () => document.fullscreenEnabled;
const getServerSnapshot = () => false;
const noopSubscribe = () => () => undefined;

/** Fullscreen state for a given element. `isSupported` is false on iPhone Safari, so callers can hide the control. */
export function useFullscreen(targetRef: RefObject<HTMLElement | null>) {
  const isFullscreen = useSyncExternalStore(subscribe, getIsFullscreen, getServerSnapshot);
  const isSupported = useSyncExternalStore(noopSubscribe, getIsSupported, getServerSnapshot);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await targetRef.current?.requestFullscreen();
  }, [targetRef]);

  return { isFullscreen, isSupported, toggle };
}
