import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheHandler: require.resolve("./cache-handler.js"),
  cacheMaxMemorySize: 25,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/episodes",
        permanent: true,
      },
    ];
  },
  images: {
    qualities: [75, 80, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rickandmortyapi.com",
        pathname: "/api/character/avatar/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
