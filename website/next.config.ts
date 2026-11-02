import type { NextConfig } from "next";

// Static export for GitHub Pages ("Deploy from a branch", main, / root).
// NEXT_PUBLIC_BASE_PATH is "/gescard-akiki" for https://nourabm33.github.io/gescard-akiki/
// and "" for local development or a custom domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
