import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No output: "standalone" — Cloudflare uses @cloudflare/next-on-pages adapter
  // Vercel handles output automatically without this setting
  async rewrites() {
    return [
      {
        source: "/((?!api|_next/static|_next/image|favicon.ico|logo.png|robots.txt|sitemap.xml|manifest.json|llms.txt|sites|fleet|blog).*)",
        destination: "/",
      },
    ];
  },
  // Security headers — improve SEO trust score and protect users
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Cache static assets aggressively for performance
        source: "/(_next/static|sites|fleet|blog|logo.png)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Compress responses
  compress: true,
  // Powered-by header removed for security
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      { protocol: "https", hostname: "z-cdn.chatglm.cn" },
      { protocol: "https", hostname: "z-cdn-media.chatglm.cn" },
    ],
  },
};

export default nextConfig;
