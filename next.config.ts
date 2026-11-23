import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Rewrite all non-API, non-static paths to '/' so client-side routing
  // handles URLs like /services, /package, /admin, /contact, etc.
  // This allows direct URL access and page refresh without 404 errors.
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
