import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allow cross-origin requests from the preview domain
  allowedDevOrigins: [
    "preview-chat-8a9dc547-cb92-4a69-84bd-bfe3f7017694.space-z.ai",
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Images from external domains (if needed for future features)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "z-cdn.chatglm.cn" },
      { protocol: "https", hostname: "z-cdn-media.chatglm.cn" },
    ],
  },
};

export default nextConfig;
