import { siteConfig } from "@/features/shared/config/site";

const numberFormatter = new Intl.NumberFormat(siteConfig.locale, { maximumFractionDigits: 1 });

/** Formats a number with Persian digits and locale-aware grouping. */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}
