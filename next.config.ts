import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: process.env.NODE_ENV !== 'production',
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost',                           port: '8080', pathname: '/storage/**' },
      { protocol: 'http',  hostname: '127.0.0.1',                           port: '8080', pathname: '/storage/**' },
      { protocol: 'http',  hostname: 'localhost',                           port: '8000', pathname: '/storage/**' },
      { protocol: 'http',  hostname: '127.0.0.1',                           port: '8000', pathname: '/storage/**' },
      { protocol: 'https', hostname: 'admin-digital-vrylxdxz.on-forge.com',              pathname: '/storage/**' },
      { protocol: 'https', hostname: 'www.aisakikh.com',              pathname: '/storage/**' },
    ],
  },
};

export default nextConfig;
