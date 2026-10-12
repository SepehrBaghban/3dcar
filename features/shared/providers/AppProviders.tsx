"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { RTL_STYLIS_PLUGINS } from "@/features/shared/lib/emotion";
import { muiTheme } from "@/features/shared/theme/mui-theme";

const RTL_CACHE_OPTIONS = {
  key: "muirtl",
  stylisPlugins: RTL_STYLIS_PLUGINS,
  enableCssLayer: true,
};

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <AppRouterCacheProvider options={RTL_CACHE_OPTIONS}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
