/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    })
    
    // Fix canvas module for Vercel deployment
    if (isServer) {
      config.externals.push('canvas')
    }
    
    return config
  },
}

module.exports = nextConfig
