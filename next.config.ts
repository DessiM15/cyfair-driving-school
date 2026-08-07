import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
  },
  async redirects() {
    return [
      // Preserve inbound links from the legacy site's footer structure.
      { source: "/about-us/contact-us", destination: "/contact-us", permanent: true },
      { source: "/about-us/meet-the-team", destination: "/meet-the-team", permanent: true },
      { source: "/about-us/reviews", destination: "/reviews", permanent: true },
      { source: "/about-us/careers", destination: "/careers", permanent: true },
      { source: "/about-us/privacy", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
