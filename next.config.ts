import type { NextConfig } from "next";

import "./src/lib/env";

const nextConfig: NextConfig = {
  typedRoutes: true,

  images: {
    remotePatterns: [new URL("https://yd7-lms.t3.storage.dev/**")],
  },
};

export default nextConfig;
