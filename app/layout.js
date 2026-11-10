import Script from 'next/script'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { SITE_URL, LINKEDIN_URL, INSTAGRAM_URL, YOUTUBE_URL, OVETA_URL, INSTRUCTOR_TITULO, INSTRUCTOR_IMUTES, enFrase } from './lib/site'

// Fuentes autoalojadas por next/font: el navegador ya no pide nada a Google Fonts.
// Solo se cargan los pesos y estilos que el sitio usa de verdad (los mismos que cargaba el <link> anterior):
//   Playfair Display: 400 normal e italic  ·  DM Sans: 300, 400 y 500.
// No se usa la fuente variable completa a propósito: el peso 600 de la Home (etiqueta "Nuevo" y botón "Adquirir")
// se sigue renderizando igual que antes.
// preload: false -> no se precargan en todas las rutas (p. ej. /cursos/d5-render-express usa Outfit y no las necesita);
// el navegador las descarga solo en las páginas que las usan.
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  preload: false,
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  preload: false,
})

export const metadata = {
  title: 'Pedro Sardi · Visualización Arquitectónica',
  description: `Pedro Sardi — Visualizador arquitectónico e ${enFrase(INSTRUCTOR_TITULO)}. Paraguay.`,
  keywords: 'renders arquitectónicos paraguay, visualizador arquitectónico paraguay, tutor d5 render, instructor d5 render, instructor certificado d5 render, curso d5 render español',
  authors: [{ name: 'Pedro Sardi' }],
  openGraph: {
    title: 'Pedro Sardi · Visualización Arquitectónica',
    description: 'Renders fotorrealistas y tutorías D5 Render. Basado en Paraguay.',
    url: SITE_URL,
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
  url: SITE_URL,
  image: `${SITE_URL}/assets/about.webp`,
  jobTitle: ['Visualizador arquitectónico', INSTRUCTOR_TITULO],
  description: `Visualizador arquitectónico e ${enFrase(INSTRUCTOR_TITULO)} con base en Paraguay. ${INSTRUCTOR_IMUTES}. Cofundador de OVETA.`,
  nationality: 'PY',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PY',
  },
  knowsAbout: ['D5 Render', 'SketchUp', 'Visualización Arquitectónica', 'Renders 3D', 'V-Ray', 'Corona Renderer', '3ds Max'],
  sameAs: [
    LINKEDIN_URL,
    INSTAGRAM_URL,
    YOUTUBE_URL,
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'OVETA',
    url: OVETA_URL,
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pedro Sardi Studio',
  url: SITE_URL,
  description: `Portfolio y servicios de Pedro Sardi — Visualizador arquitectónico e ${enFrase(INSTRUCTOR_TITULO)} en Paraguay.`,
  author: { '@type': 'Person', name: 'Pedro Sardi' },
  inLanguage: 'es',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfair.variable} ${dmSans.variable}`}>
      <head>
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
