/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {hostname: 'localhost'},
      {hostname: 'gravatar.com'}
    ]
  }
}

module.exports = nextConfig
