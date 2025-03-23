/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'ruoncampus.rutgers.edu',
      's3.amazonaws.com'
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ]
  },
}

export default nextConfig