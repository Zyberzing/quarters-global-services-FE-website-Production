import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Added Cloudinary domain
        port: "",
        pathname: "/**", // allows all paths under this domain
      },
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",       // 🔥 ⬅️ Added for driver image
        port: "",
        pathname: "/**",            // allow all images from this path
      },
       {
        // ✅ ADD THIS FOR COUNTRY FLAGS
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
