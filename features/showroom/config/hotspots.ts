import type { Hotspot, HotspotId } from "@/features/showroom/types";

export const HOTSPOTS: Readonly<Record<HotspotId, Hotspot>> = {
  headlights: {
    id: "headlights",
    title: "چراغ‌های جلو",
    description: "چراغ‌های تمام LED با امضای نوری Y شکل، در امتداد خط تیز کاپوت.",
    position: [0.68, 0.6, 2.05],
    normal: [0.4, 0.3, 1],
    viewpointId: "front",
  },
  wheels: {
    id: "wheels",
    title: "رینگ و ترمز سرامیکی",
    description: "رینگ‌های عقب پهن‌تر از جلو، با دیسک‌های کربن‌سرامیک و کالیپرهای شش‌پیستونی در محور جلو.",
    position: [1.02, 0.42, 1.35],
    normal: [1, 0, 0.1],
    viewpointId: "wheel",
  },
  cockpit: {
    id: "cockpit",
    title: "کابین راننده",
    description: "وارد کابین شوید و با کشیدن انگشت یا ماوس، داشبورد و صندلی‌ها را از نگاه راننده ببینید.",
    position: [0, 1.2, -0.25],
    normal: [0, 1, 0],
    viewpointId: "cockpit",
  },
  engine: {
    id: "engine",
    title: "موتور V12",
    description: "موتور ۶٫۵ لیتری تنفس طبیعی، در میانه‌ی شاسی و درست پشت سر سرنشینان.",
    position: [0, 1.05, -1.45],
    normal: [0, 1, -0.4],
    viewpointId: "rear",
  },
};

export const HOTSPOT_LIST: readonly Hotspot[] = Object.values(HOTSPOTS);
