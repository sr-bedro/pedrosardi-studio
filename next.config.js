/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,

  // Optimiza headers para assets estáticos
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Compresión automática
  compress: true,
}

module.exports = nextConfig
