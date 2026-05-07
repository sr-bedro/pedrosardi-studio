import CvClient from '../components/CvClient'

export const metadata = {
  title: 'CV · Pedro Sardi — Visualizador Arquitectónico',
  description: 'Perfil profesional de Pedro Sardi. Visualizador arquitectónico, tutor verificado D5 Render e instructor. Stack completo, proyectos y credenciales.',
  keywords: 'pedro sardi cv, pedro sardi portfolio, visualizador arquitectónico paraguay, tutor d5 render paraguay',
  openGraph: {
    title: 'CV · Pedro Sardi',
    description: 'Visualizador arquitectónico y tutor verificado D5 Render. Caacupé, Paraguay.',
    url: 'https://pedrosardi.studio/cv',
  },
}

export default function Page() {
  return <CvClient />
}
