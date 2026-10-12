import createCache, { type EmotionCache } from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

/** Stylis pipeline that mirrors MUI styles for the RTL layout. */
export const RTL_STYLIS_PLUGINS = [prefixer, rtlPlugin];

const LAYER_STATEMENT = /^@layer\s/;

/**
 * Emotion cache whose rules are wrapped in `@layer mui`, so Tailwind utilities override MUI.
 * Styles are appended to <head>, after Tailwind's layer-order statement, which keeps the order intact.
 */
export function createLayeredRtlCache(key: string): EmotionCache {
  const cache = createCache({ key, stylisPlugins: RTL_STYLIS_PLUGINS });
  const insert = cache.insert;

  cache.insert = (selector, serialized, sheet, shouldCache) => {
    if (!LAYER_STATEMENT.test(serialized.styles)) {
      serialized.styles = `@layer mui {${serialized.styles}}`;
    }
    return insert(selector, serialized, sheet, shouldCache);
  };

  return cache;
}
