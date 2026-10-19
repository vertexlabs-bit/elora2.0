import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  agentRules: false,
  experimental: { cpus: 1 },
};

export default nextConfig;
