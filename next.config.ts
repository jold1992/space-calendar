import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ll.thespacedevs.com",
      },
      {
        protocol: "https",
        hostname: "**.thespacedevs.com",
      },
      {
        protocol: "https",
        hostname: "thespacedevs-prod.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "**.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
