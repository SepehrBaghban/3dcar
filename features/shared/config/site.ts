export const siteConfig = {
  name: "نمایشگاه سه‌بعدی خودرو",
  studioName: "استودیو نقطه",
  description:
    "نمایش سه‌بعدی و تعاملی خودرو برای نمایشگاه‌های منطقه آزاد؛ بدنه و کابین را از هر زاویه‌ای روی موبایل و دسکتاپ ببینید.",
  locale: "fa-IR",
  contactEmail: "info@noghte.ai",
  navigation: [
    { label: "نمای سه‌بعدی", href: "#showroom" },
    { label: "مشخصات فنی", href: "#specs" },
    { label: "قابلیت‌ها", href: "#capabilities" },
  ],
} as const;

export type NavigationItem = (typeof siteConfig.navigation)[number];
