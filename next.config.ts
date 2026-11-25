import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: "standalone" — Cloudflare uses @cloudflare/next-on-pages adapter
  // Vercel handles output automatically without this setting
  async rewrites() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico|logo.png|robots.txt|sites|fleet|blog).*)",
        destination: "/",
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "z-cdn.chatglm.cn" },
      { protocol: "https", hostname: "z-cdn-media.chatglm.cn" },
    ],
  },
};

export default nextConfig;
