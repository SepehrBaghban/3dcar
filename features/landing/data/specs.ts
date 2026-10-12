export type SpecItem = {
  label: string;
  value: number;
  unit: string;
  /** Optional qualifier shown after the unit, e.g. the rpm at which power peaks. */
  note?: string;
};

export type SpecGroup = {
  id: string;
  title: string;
  items: readonly SpecItem[];
};

/** Published figures for the Gallardo LP 560-4 coupé. */
export const SPEC_GROUPS: readonly SpecGroup[] = [
  {
    id: "powertrain",
    title: "پیشرانه",
    items: [
      { label: "حجم موتور V10", value: 5204, unit: "سی‌سی" },
      { label: "قدرت", value: 560, unit: "اسب بخار", note: "در ۸۰۰۰ دور" },
      { label: "گشتاور", value: 540, unit: "نیوتن‌متر", note: "در ۶۵۰۰ دور" },
      { label: "گیربکس", value: 6, unit: "سرعته e-gear" },
    ],
  },
  {
    id: "performance",
    title: "عملکرد",
    items: [
      { label: "شتاب صفر تا صد", value: 3.7, unit: "ثانیه" },
      { label: "حداکثر سرعت", value: 325, unit: "کیلومتر بر ساعت" },
      { label: "وزن خشک", value: 1410, unit: "کیلوگرم" },
    ],
  },
  {
    id: "dimensions",
    title: "ابعاد",
    items: [
      { label: "طول", value: 4345, unit: "میلی‌متر" },
      { label: "عرض", value: 1900, unit: "میلی‌متر" },
      { label: "ارتفاع", value: 1165, unit: "میلی‌متر" },
      { label: "فاصله‌ی دو محور", value: 2560, unit: "میلی‌متر" },
    ],
  },
];

export const ELEVATION_DIMENSIONS = {
  length: 4345,
  height: 1165,
  wheelbase: 2560,
} as const;
