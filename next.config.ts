import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
      {
        // AnN add/fix: PokéSprite icons for evolution chain on 10/13/2025
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/msikma/pokesprite/master/pokemon-gen8/**",
      },
    ],
  },
};

export default nextConfig;
