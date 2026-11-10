// Configuración central de links del sitio.
// Sin 'use client': lo importan tanto componentes de servidor como de cliente.
// Para cambiar un link, se cambia solo acá.

// ── IMUTES (URLs oficiales, sin parámetros)
export const IMUTES_ORIGIN = 'https://www.imutes.online'
export const IMUTES_CURSO = 'https://www.imutes.online/cursos/renderiza-como-un-profesional-curso-de-d5-render-para-sketchup'
export const IMUTES_TALLER = 'https://www.imutes.online/talleres/aprende-d5-render-para-sketchup-desde-0-a-avanzado'

// ── Curso pregrabado de IMUTES (datos verificados en la página pública, 10/11/2026)
// duracion: dato exacto, para stats, chips y totales.
// duracionVenta: para frases de venta (el curso dura menos de 6 horas, nunca decir "más de 6").
export const CURSO_IMUTES = {
  duracion: '5 h 39 min',
  duracionVenta: 'casi 6 horas',
  modulos: 7,
  acceso: '2 años',
  duracionISO: 'PT5H39M', // para timeRequired en el JSON-LD
}

// Pone la primera letra en mayúscula (para usar duracionVenta al empezar una frase).
export const capitalizar = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// ── Sitio y redes
export const SITE_URL = 'https://pedrosardi.studio'
export const WHATSAPP_URL = 'https://wa.me/595974534159'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/pedroesardi/'
export const INSTAGRAM_URL = 'https://www.instagram.com/pedrosardi.studio/'
export const YOUTUBE_URL = 'https://www.youtube.com/@pedrosardi.studio'
export const OVETA_URL = 'https://oveta.studio'
