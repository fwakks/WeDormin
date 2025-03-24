// filepath: c:\Yash Dev\WeDormin\frontend\next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ruoncampus.rutgers.edu',
      's3.amazonaws.com',
      'theaggie.org',
      'lh3.googleusercontent.com',
      'thispersondoesnotexist.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig