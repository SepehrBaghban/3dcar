import type { Paint, PaintId } from "@/features/showroom/types";

export const PAINTS: Readonly<Record<PaintId, Paint>> = {
  giallo: { id: "giallo", label: "زرد", color: "#e8ad0c" },
  arancio: { id: "arancio", label: "نارنجی", color: "#e2560f" },
  verde: { id: "verde", label: "سبز", color: "#4f9a1f" },
  blu: { id: "blu", label: "آبی", color: "#1f4fa8" },
  bianco: { id: "bianco", label: "سفید", color: "#e9ebee" },
  nero: { id: "nero", label: "مشکی", color: "#16181c" },
};

export const PAINT_LIST: readonly Paint[] = Object.values(PAINTS);

export const DEFAULT_PAINT_ID: PaintId = "giallo";
