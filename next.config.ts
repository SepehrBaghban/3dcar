import type { NextConfig } from "next";

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake icon/component barrels so only the imported modules are bundled.
    optimizePackageImports: ["@mui/material", "@mui/icons-material", "@react-three/drei"],
  },
  async headers() {
    return [
      {
        // 3D assets are large and rarely change; let browsers and CDNs keep them.
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${ONE_WEEK_IN_SECONDS}, stale-while-revalidate=${ONE_WEEK_IN_SECONDS}`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
