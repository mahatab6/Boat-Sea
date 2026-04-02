import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

// async rewrites() {
//     return [
//       {
//         source: "/api/auth/:path*",
//         destination: `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/:path*`,
//       },
//     ];
//   },
};

export default nextConfig;
