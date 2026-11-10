import CursoClient from '../components/CursoClient'
import { IMUTES_ORIGIN, IMUTES_CURSO, SITE_URL, CURSO_IMUTES, capitalizar } from '../lib/site'

export const metadata = {
  title: 'Masterclass D5 Render · Pedro Sardi — Tutor Verificado',
  description: `Curso completo de D5 Render en español. ${capitalizar(CURSO_IMUTES.duracionVenta)} de clases paso a paso por Pedro Sardi, tutor verificado. Desde cero hasta el render final profesional.`,
  keywords: 'curso d5 render español, masterclass d5 render, tutor d5 render verificado, aprender d5 render, curso renders arquitectónicos paraguay',
  openGraph: {
    title: 'Masterclass D5 Render · Pedro Sardi — Tutor Verificado',
    description: `Desde cero hasta el render final. ${capitalizar(CURSO_IMUTES.duracionVenta)} de clases. Tutor verificado.`,
    url: `${SITE_URL}/curso-d5render`,
  },
}

const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Masterclass D5 Render',
  description: `Curso completo de D5 Render en español. ${capitalizar(CURSO_IMUTES.duracionVenta)} de clases estructuradas desde cero hasta el render profesional final. Incluye módulos de interiores, exteriores y animaciones.`,
  url: `${SITE_URL}/curso-d5render`,
  inLanguage: 'es',
  educationalLevel: 'Beginner to Intermediate',
  teaches: ['D5 Render', 'Renders arquitectónicos', 'Iluminación 3D', 'Materiales PBR', 'Animaciones arquitectónicas'],
  timeRequired: CURSO_IMUTES.duracionISO,
  provider: {
    '@type': 'Organization',
    name: 'IMUTES',
    url: IMUTES_ORIGIN,
  },
  instructor: {
    '@type': 'Person',
    name: 'Pedro Sardi',
    url: SITE_URL,
    jobTitle: 'Tutor Verificado D5 Render',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    url: IMUTES_CURSO,
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
