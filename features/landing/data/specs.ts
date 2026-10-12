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

/** Published figures for the Aventador LP 700-4 coupé. */
export const SPEC_GROUPS: readonly SpecGroup[] = [
  {
    id: "powertrain",
    title: "پیشرانه",
    items: [
      { label: "حجم موتور V12", value: 6498, unit: "سی‌سی" },
      { label: "قدرت", value: 700, unit: "اسب بخار", note: "در ۸۲۵۰ دور" },
      { label: "گشتاور", value: 690, unit: "نیوتن‌متر", note: "در ۵۵۰۰ دور" },
      { label: "گیربکس", value: 7, unit: "سرعته ISR" },
    ],
  },
  {
    id: "performance",
    title: "عملکرد",
    items: [
      { label: "شتاب صفر تا صد", value: 2.9, unit: "ثانیه" },
      { label: "حداکثر سرعت", value: 350, unit: "کیلومتر بر ساعت" },
      { label: "وزن خشک", value: 1575, unit: "کیلوگرم" },
    ],
  },
  {
    id: "dimensions",
    title: "ابعاد",
    items: [
      { label: "طول", value: 4780, unit: "میلی‌متر" },
      { label: "عرض", value: 2030, unit: "میلی‌متر" },
      { label: "ارتفاع", value: 1136, unit: "میلی‌متر" },
      { label: "فاصله‌ی دو محور", value: 2700, unit: "میلی‌متر" },
    ],
  },
];

export const ELEVATION_DIMENSIONS = {
  length: 4780,
  height: 1136,
  wheelbase: 2700,
} as const;
