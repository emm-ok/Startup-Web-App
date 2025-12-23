import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: '*'
      }
    ]
  },
  cacheComponents: true,

  devIndicators: {
    position: "bottom-right",
  }
};

export default nextConfig;
