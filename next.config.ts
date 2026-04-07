import type { NextConfig } from "next";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPage = repoName.length > 0 && !repoName.endsWith(".github.io");
const basePath =
  process.env.NODE_ENV === "production" && isProjectPage ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
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
