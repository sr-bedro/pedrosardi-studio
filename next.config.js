/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  compress: true,

  // Usa browserslist para el compilador SWC — elimina JS antiguo innecesario
  experimental: {
    browsersListForSwc: true,
  },

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
