import CvClient from '../components/CvClient'
import { SITE_URL, INSTRUCTOR_TITULO, enFrase } from '../lib/site'

export const metadata = {
  title: 'CV · Pedro Sardi — Visualizador Arquitectónico',
  description: `Perfil profesional de Pedro Sardi: visualizador arquitectónico, ${enFrase(INSTRUCTOR_TITULO)} y cofundador de OVETA. Stack, trayectoria y credenciales.`,
  keywords: 'pedro sardi cv, pedro sardi portfolio, visualizador arquitectónico paraguay, tutor d5 render paraguay, instructor d5 render, instructor certificado d5 render',
  openGraph: {
    title: 'CV · Pedro Sardi',
    description: `Visualizador arquitectónico e ${enFrase(INSTRUCTOR_TITULO)}. Paraguay.`,
    url: `${SITE_URL}/cv`,
  },
}

export default function Page() {
  return <CvClient />
}
