import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Désactiver le préchargement des pages pour éviter les erreurs 404
  experimental: {
    optimizePackageImports: ['lenis'],
  },
};

export default nextConfig;
