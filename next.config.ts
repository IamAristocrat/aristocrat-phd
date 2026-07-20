import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    tsconfigPath: process.env.HOSTINGER_BUILD === "1" ? "tsconfig.hostinger.json" : "tsconfig.json",
  },
};

export default nextConfig;
