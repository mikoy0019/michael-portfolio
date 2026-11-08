import type { NextConfig } from "next";

// Static export, served by Cloudflare Workers static assets (see wrangler.jsonc).
// Security headers live in public/_headers and redirects in public/_redirects,
// because `output: "export"` does not support headers() or redirects().
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
