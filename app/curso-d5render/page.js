import CursoClient from '../components/CursoClient'

export const metadata = {
  title: 'Masterclass D5 Render · Pedro Sardi — Tutor Verificado',
  description: 'Curso completo de D5 Render en español. Más de 18 horas de contenido por Pedro Sardi, tutor verificado. Desde cero hasta el render final profesional.',
  keywords: 'curso d5 render español, masterclass d5 render, tutor d5 render verificado, aprender d5 render, curso renders arquitectónicos paraguay',
  openGraph: {
    title: 'Masterclass D5 Render · Pedro Sardi — Tutor Verificado',
    description: 'Desde cero hasta el render final. +18 horas. Tutor verificado.',
    url: 'https://pedrosardi.studio/curso-d5render',
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Masterclass D5 Render',
  description: 'Curso completo de D5 Render en español. Más de 18 horas de contenido estructurado desde cero hasta el render profesional final. Incluye módulos de interiores, exteriores y animaciones.',
  url: 'https://pedrosardi.studio/curso-d5render',
  inLanguage: 'es',
  educationalLevel: 'Beginner to Intermediate',
  teaches: ['D5 Render', 'Renders arquitectónicos', 'Iluminación 3D', 'Materiales PBR', 'Animaciones arquitectónicas'],
  timeRequired: 'PT18H',
  provider: {
    '@type': 'Organization',
    name: 'IMUTES',
    url: 'https://www.imutes.online',
  },
  instructor: {
    '@type': 'Person',
    name: 'Pedro Sardi',
    url: 'https://pedrosardi.studio',
    jobTitle: 'Tutor Verificado D5 Render',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: 'https://www.imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CursoClient />
    </>
  )
}
