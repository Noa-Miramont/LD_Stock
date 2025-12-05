import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper routing in production
  trailingSlash: false,
};

export default nextConfig;
