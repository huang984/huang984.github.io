/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/{repository-name}' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/{repository-name}' : '',
}

module.exports = nextConfig

