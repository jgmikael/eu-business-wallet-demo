/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/eu-business-wallet-demo' : '',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
