/**
 * Settings for the production GLB model.
 *
 * Drop an optimized model at `public/models/aventador.glb`. If the file is missing,
 * the viewer falls back to a lightweight procedural car so the page never breaks.
 */
export const MODEL_CONFIG = {
  url: process.env.NEXT_PUBLIC_CAR_MODEL_URL ?? "/models/aventador.glb",
  /** Decoder for Draco-compressed meshes. Self-host under /public/draco/ to remove the CDN dependency. */
  dracoDecoderPath: "https://www.gstatic.com/draco/versioned/decoders/1.5.7/",
  /** Real Aventador length in metres; the model is uniformly scaled to this. */
  targetLength: 4.78,
  /** Extra yaw (radians) so the model's nose points to +Z. Adjust per model. */
  rotationY: 0,
  /** Material names matching this pattern receive the selected paint colour. */
  paintMaterialPattern: /(paint|body|carpaint|exterior)/i,
} as const;
