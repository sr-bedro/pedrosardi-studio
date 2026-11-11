import HomeClient from './components/HomeClient'
import { INSTRUCTOR_TITULO_CORTO } from './lib/site'

// SEO metadata para la página principal
export const metadata = {
  title: 'Pedro Sardi · Visualización Arquitectónica',
  description: `Renders fotorrealistas y tutorías D5 Render en Paraguay. ${INSTRUCTOR_TITULO_CORTO}. Trabajemos juntos.`,
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeClient />
}
