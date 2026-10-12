type ClassValue = string | false | null | undefined;

/** Joins truthy class names. Tiny on purpose: no runtime dependency for a one-liner. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
