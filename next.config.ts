import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  agentRules: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "radix-ui"],
  },
};

export default nextConfig;
