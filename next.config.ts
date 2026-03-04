import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.trthaber.com" },
      { protocol: "https", hostname: "img.donanimhaber.com" },
      { protocol: "https", hostname: "i.haberglobal.com.tr" },
      { protocol: "https", hostname: "cdn-images-1.medium.com" },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
