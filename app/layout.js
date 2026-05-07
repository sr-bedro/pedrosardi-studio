import Script from 'next/script'
import './globals.css'

export const metadata = {
  title: 'Pedro Sardi · Visualización Arquitectónica',
  description: 'Pedro Sardi — Visualizador arquitectónico y tutor verificado de D5 Render.',
  keywords: 'renders arquitectónicos paraguay, visualizador arquitectónico paraguay, tutor d5 render, curso d5 render español',
  authors: [{ name: 'Pedro Sardi' }],
  openGraph: {
    title: 'Pedro Sardi · Visualización Arquitectónica',
    description: 'Renders fotorrealistas y tutorías D5 Render.',
    url: 'https://pedrosardi.studio',
    siteName: 'Pedro Sardi Studio',
    locale: 'es_PY',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=optional"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NRK5LP0V9Z" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
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
