import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Pedro Sardi · Visualización Arquitectónica',
  description: 'Pedro Sardi — Visualizador arquitectónico y tutor verificado de D5 Render. Caacupé, Paraguay.',
  keywords: 'renders arquitectónicos paraguay, visualizador arquitectónico paraguay, tutor d5 render, curso d5 render español',
  authors: [{ name: 'Pedro Sardi' }],
  openGraph: {
    title: 'Pedro Sardi · Visualización Arquitectónica',
    description: 'Renders fotorrealistas y tutorías D5 Render. Basado en Paraguay.',
    url: 'https://pedrosardi.studio',
    siteName: 'Pedro Sardi Studio',
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Pedro Sardi',
  url: 'https://pedrosardi.studio',
  image: 'https://pedrosardi.studio/assets/about.webp',
  jobTitle: 'Visualizador Arquitectónico y Tutor Verificado D5 Render',
  description: 'Visualizador arquitectónico y tutor verificado de D5 Render con base en Paraguay. Instructor en IMUTES. Co-fundador de OVETA.',
  nationality: 'PY',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PY',
    addressLocality: 'Caacupé',
    addressRegion: 'Cordillera',
  },
  knowsAbout: ['D5 Render', 'SketchUp', 'Visualización Arquitectónica', 'Renders 3D', 'V-Ray', 'Corona Renderer', '3ds Max'],
  sameAs: [
    'https://www.linkedin.com/in/pedroesardi/',
    'https://www.instagram.com/pedrosardi.studio/',
    'https://www.youtube.com/@pedrosardi.studio',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'OVETA',
    url: 'https://oveta.studio',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pedro Sardi Studio',
  url: 'https://pedrosardi.studio',
  description: 'Portfolio y servicios de Pedro Sardi — Visualizador arquitectónico y tutor verificado D5 Render en Paraguay.',
  author: { '@type': 'Person', name: 'Pedro Sardi' },
  inLanguage: 'es',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* display=swap → texto visible inmediatamente, mejora LCP */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        {/* lazyOnload → GTM carga después de que la página ya es usable, mejora TBT */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NRK5LP0V9Z"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NRK5LP0V9Z');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
