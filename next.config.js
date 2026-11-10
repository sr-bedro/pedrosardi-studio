/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  compress: true,

  // Cache de 1 hora con revalidación para /assets: los archivos conservan su nombre
  // al reemplazarse (ej. el certificado), así que un cache "immutable" de 1 año los dejaría desactualizados.
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
