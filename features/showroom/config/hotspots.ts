import type { Hotspot, HotspotId } from "@/features/showroom/types";

export const HOTSPOTS: Readonly<Record<HotspotId, Hotspot>> = {
  headlights: {
    id: "headlights",
    title: "چراغ‌های جلو",
    description: "چراغ‌های بای‌زنون با نوار LED روشنایی روز، در امتداد خطوط تیز کاپوت.",
    position: [0.6, 0.6, 1.8],
    normal: [0.4, 0.3, 1],
    viewpointId: "front",
  },
  wheels: {
    id: "wheels",
    title: "رینگ و ترمز",
    description: "رینگ‌های ۱۹ اینچی با لاستیک‌های عقب پهن‌تر از جلو و کالیپرهای هشت‌پیستونی در محور جلو.",
    position: [0.93, 0.4, 0.97],
    normal: [1, 0, 0.1],
    viewpointId: "wheel",
  },
  cockpit: {
    id: "cockpit",
    title: "کابین راننده",
    description: "وارد کابین شوید و با کشیدن انگشت یا ماوس، داشبورد و صندلی‌ها را از نگاه راننده ببینید.",
    position: [0, 1.13, 0],
    normal: [0, 1, 0],
    viewpointId: "cockpit",
  },
  engine: {
    id: "engine",
    title: "موتور V10",
    description: "موتور ۵٫۲ لیتری تنفس طبیعی، در میانه‌ی شاسی و پشت سر سرنشینان، زیر شیشه‌ی درب موتور.",
    position: [0, 0.92, -1.3],
    normal: [0, 1, -0.4],
    viewpointId: "rear",
  },
};

export const HOTSPOT_LIST: readonly Hotspot[] = Object.values(HOTSPOTS);
