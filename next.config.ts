import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'admin-digital-vrylxdxz.on-forge.com',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
