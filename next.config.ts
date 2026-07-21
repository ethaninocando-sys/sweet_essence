import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local product/hero imagery lives in /public/assets. No remote loaders needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
