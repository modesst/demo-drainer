import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/demo-drainer',
  // Ensure that links and static assets are correctly prefixed
  trailingSlash: true, 
};

export default nextConfig;
