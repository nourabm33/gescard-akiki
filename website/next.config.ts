import type { NextConfig } from "next";

// Static export for GitHub Pages ("Deploy from a branch", main, / root).
// Served from the custom domain https://gescardakiki.com (root CNAME), so the base path is "".
// scripts/export.mjs pins NEXT_PUBLIC_BASE_PATH and NEXT_PUBLIC_SITE_URL for production.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
