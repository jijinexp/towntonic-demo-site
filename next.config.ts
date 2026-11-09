import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export: `next build` writes plain HTML/CSS/JS to ./out, which
  // Cloudflare serves as static assets (see wrangler.jsonc). Nothing on the site
  // needs a server.
  output: "export",
  // There's no image server on static hosting, so next/image serves the files as-is.
  images: { unoptimized: true },
};

export default nextConfig;
