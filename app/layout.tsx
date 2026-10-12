import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppProviders } from "@/features/shared/providers/AppProviders";
import { siteConfig } from "@/features/shared/config/site";
import "@/features/shared/styles/globals.css";

export const metadata: Metadata = {
  title: `Lamborghini Gallardo | ${siteConfig.name}`,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: "#e6e8eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
