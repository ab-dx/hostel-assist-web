/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Matches any domain
      },
      {
        protocol: 'http',
        hostname: '**', // If you want to allow http as well
      },
    ],
  }
};

export default nextConfig;
