import type { NextConfig } from "next";

// Allow the Figma Make preview origin to load dev-only chunks (dev server only).
const figmaHost = process.env.FIGMA && process.env.FIGMA_PUBLIC_URL
  ? new URL(process.env.FIGMA_PUBLIC_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(figmaHost ? { allowedDevOrigins: [figmaHost] } : {}),
};

export default nextConfig;
