/**
 * Settings for the production GLB model.
 *
 * The model is optimized with glTF-Transform (Meshopt geometry + WebP textures, see README).
 * Meshopt's decoder ships with three.js, so loading needs no external decoder CDN.
 * If the file is missing, the viewer falls back to a lightweight procedural car so the page never breaks.
 */
export const MODEL_CONFIG = {
  url: process.env.NEXT_PUBLIC_CAR_MODEL_URL ?? "/models/lamborghini-gallardo.glb",
  /** Real Gallardo LP560-4 length in metres; the model is uniformly scaled to this. */
  targetLength: 4.345,
  /** Extra yaw (radians) so the model's nose points to +Z. Adjust per model. */
  rotationY: 0,
  /**
   * Material names matching this pattern receive the selected paint colour.
   * Anchored on purpose: this model also has `paint_sec`, the gloss-black trim that must stay black.
   */
  paintMaterialPattern: /^paint$/i,
} as const;
