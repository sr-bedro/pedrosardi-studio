/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  compress: true,

  // Cache de 1 año para assets estáticos
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
}

module.exports = nextConfig
