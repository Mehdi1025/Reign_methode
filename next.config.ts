import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: import.meta.dirname,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
