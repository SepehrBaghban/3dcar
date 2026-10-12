import { useState } from "react";
import { QUALITY_PRESETS } from "@/features/showroom/config/quality";
import type { QualityProfile, QualityTier } from "@/features/showroom/types";

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const LOW_END_CORES = 4;
const HIGH_END_CORES = 8;
const LOW_END_MEMORY_GB = 4;

function detectTier(): QualityTier {
  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? LOW_END_CORES;
  const memory = nav.deviceMemory ?? LOW_END_MEMORY_GB;
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (nav.connection?.saveData || cores <= LOW_END_CORES || memory < LOW_END_MEMORY_GB) return "low";
  if (isTouchDevice || cores < HIGH_END_CORES) return "medium";
  return "high";
}

function buildProfile(): QualityProfile {
  const tier = detectTier();
  return {
    tier,
    ...QUALITY_PRESETS[tier],
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

/**
 * Picks rendering settings once per session from cheap device hints.
 * Must only run on the client (the viewer is loaded with `ssr: false`).
 */
export function useQualityProfile(): QualityProfile {
  const [profile] = useState(buildProfile);
  return profile;
}
