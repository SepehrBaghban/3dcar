"use client";

import type { ReactNode } from "react";
import type { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import { createLayeredRtlCache } from "@/features/shared/lib/emotion";
import { muiTheme } from "@/features/shared/theme/mui-theme";

let detachedCache: EmotionCache | undefined;

/** One cache shared by every detached root, created lazily on the client. */
function getDetachedCache(): EmotionCache {
  detachedCache ??= createLayeredRtlCache("muidetached");
  return detachedCache;
}

type DetachedRootProvidersProps = {
  children: ReactNode;
};

/**
 * Re-provides MUI context for React roots created outside the app tree (e.g. drei `<Html>`),
 * which do not inherit context. Keeps MUI styles inside the `mui` CSS layer so Tailwind still wins.
 */
export function DetachedRootProviders({ children }: DetachedRootProvidersProps) {
  return (
    <CacheProvider value={getDetachedCache()}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
