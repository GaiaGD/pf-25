import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    prependData: `@import "@/app/styles/shared.scss";`,
  },
};

export default nextConfig;
