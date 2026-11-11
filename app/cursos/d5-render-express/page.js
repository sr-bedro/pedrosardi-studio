import Image from 'next/image'
import { Outfit } from 'next/font/google'
import CheckoutLink from './CheckoutLink'
import {
  SITE_URL,
  CHECKOUT_URL,
  IMUTES_CURSO,
  IMUTES_SKETCHUP,
  CURSO_EXPRESS,
  INSTRUCTOR_TITULO,
  enFrase,
} from '../../lib/site'
import s from './page.module.css'

// Outfit solo en esta página (no está en el layout). Autoalojada por next/font.
const outfit = Outfit({ subsets: ['latin'], weight: ['400', '700'], display: 'swap' })

const { clases, minutos, garantiaDias, precioTexto } = CURSO_EXPRESS

const TITLE = 'Curso D5 Render express: tu primer render en 60 min | Pedro Sardi'
const DESCRIPTION = `Curso express en español: pasá de SketchUp a un render fotorrealista con D5 Render. ${clases} clases, modelo incluido y garantía de ${garantiaDias} días. US$ ${precioTexto}.`
const OG_IMAGE = `${SITE_URL}/curso-d5-express/portada-og.jpg`

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CURSO_EXPRESS.ruta },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${CURSO_EXPRESS.ruta}`,
    siteName: 'Pedro Sardi Studio',
    locale: 'es_PY',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Render de un interior con sala y cocina integrada, resuelto en D5 Render' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

// viewport-fit=cover para que env(safe-area-inset-bottom) funcione en la barra fija de iPhone
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0B0F',
}

// JSON-LD: solo datos reales, sin rating ni reseñas
const courseSchema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: CURSO_EXPRESS.nombre,
  description: DESCRIPTION,
  url: `${SITE_URL}${CURSO_EXPRESS.ruta}`,
  image: OG_IMAGE,
  inLanguage: 'es',
  provider: { '@type': 'Organization', name: 'Pedro Sardi Studio', url: SITE_URL },
  instructor: { '@type': 'Person', name: 'Pedro Sardi', url: SITE_URL, jobTitle: INSTRUCTOR_TITULO },
  offers: {
    '@type': 'Offer',
    price: CURSO_EXPRESS.precio.toFixed(2),
    priceCurrency: CURSO_EXPRESS.moneda,
    availability: 'https://schema.org/InStock',
    url: CHECKOUT_URL,
  },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online' },
}

// Temario (título · duración). Suman 66 min 21 s.
const LECCIONES = [
  { t: 'Descargas y preparación del modelo', d: '2:58' },
  { t: 'Tus primeros pasos en D5', d: '6:50' },
  { t: 'Materiales realistas para toda la escena', d: '20:33' },
  { t: 'Materiales aleatorios para dar variedad', d: '3:20' },
  { t: 'Iluminación para un ambiente cálido y creíble', d: '12:15' },
  { t: 'Exportación e importación de objetos', d: '3:59' },
  { t: 'Retoques finales, con un toque rápido de Photoshop (opcional)', d: '5:10' },
  { t: 'Renders finales y postprocesado, listos para presentar', d: '11:16' },
]

const REQUISITOS_URL = 'https://www.d5render.com/es/specs'

export default function Page() {
  return (
    <div className={`${outfit.className} ${s.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, '\\u003c') }}
      />

      <header className={s.container}>
        <div className={s.brand}>Pedro Sardi</div>
      </header>

      <main>
        {/* 1. HERO */}
        <section className={`${s.container} ${s.hero}`}>
          <p className={s.eyebrow}>Curso express · D5 Render</p>
          <h1 className={s.h1}>
            Tu primer render fotorrealista en <span className={s.hl}>60 minutos</span>
          </h1>
          <p className={s.heroSub}>
            Pasá de tu modelo de SketchUp a un render de interior realista con D5 Render, siguiendo el mismo flujo que uso con clientes reales.
          </p>
          <p className={s.heroMeta}>{clases} clases cortas · {minutos} minutos en total</p>

          <div className={s.heroImg}>
            <Image
              src="/curso-d5-express/render-final.webp"
              alt="Render final del curso: sala con sofá claro y cocina integrada con muebles de madera, resuelta en D5 Render."
              width={1600}
              height={900}
              sizes="(min-width: 1120px) 1040px, calc(100vw - 40px)"
              preload
            />
          </div>

          <div className={s.heroCta}>
            <CheckoutLink location="hero" className={s.cta}>Quiero el curso</CheckoutLink>
            <p className={s.price}>Pago único US$ {precioTexto} · Garantía de {garantiaDias} días</p>
          </div>
        </section>

        {/* 2. QUÉ VAS A LOGRAR */}
        <section className={`${s.section} ${s.alt}`} aria-labelledby="lograr">
          <div className={`${s.container} ${s.split}`}>
            <div>
              <p className={s.eyebrow}>Resultado</p>
              <h2 id="lograr" className={s.h2}>Lo que vas a lograr</h2>
              <p className={s.lead}>Al terminar las {clases} clases vas a haber resuelto una escena interior de punta a punta.</p>
              <ul className={s.checks}>
                <li>Preparar tu escena de SketchUp en D5 y arrancar sin vueltas.</li>
                <li>Aplicar materiales realistas en toda la escena.</li>
                <li>Sumar variedad con materiales aleatorios para que nada se vea repetido.</li>
                <li>Iluminar un ambiente cálido y creíble, y sacar renders finales listos para presentar.</li>
              </ul>
            </div>
            <div className={s.photo}>
              <Image
                src="/curso-d5-express/cocina.webp"
                alt="Render del comedor y la cocina: mesa con sillas tapizadas, muebles de madera, luces colgantes y plantas."
                width={1400}
                height={788}
                sizes="(min-width: 768px) 520px, calc(100vw - 40px)"
              />
            </div>
          </div>
        </section>

        {/* 3. TEMARIO */}
        <section className={s.section} aria-labelledby="temario">
          <div className={`${s.container} ${s.split} ${s.splitReverse}`}>
            <div className={`${s.photo} ${s.photoTall}`}>
              <Image
                src="/curso-d5-express/cocina-detalle.webp"
                alt="Detalle de la cocina del render: muebles altos de madera, mesada oscura, grifo, tetera y licuadora, y piso de madera."
                width={1100}
                height={1467}
                sizes="(min-width: 768px) 480px, calc(100vw - 40px)"
              />
            </div>
            <div>
              <p className={s.eyebrow}>Temario</p>
              <h2 id="temario" className={s.h2}>{clases} clases, {minutos} minutos</h2>
              <p className={s.lead}>Clases cortas, en el orden en que se trabaja.</p>
              <ol className={s.lessons}>
                {LECCIONES.map(function (l, i) {
                  return (
                    <li className={s.lesson} key={i}>
                      <span className={s.lessonN}>{i + 1}</span>
                      <span>{l.t}</span>
                      <span className={s.lessonD}>{l.d}</span>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* 4. QUÉ INCLUYE / QUÉ NECESITÁS */}
        <section className={`${s.section} ${s.alt}`} aria-labelledby="incluye">
          <div className={s.container}>
            <p className={s.eyebrow}>Todo en un solo pago</p>
            <h2 id="incluye" className={s.h2}>Qué incluye y qué necesitás</h2>
            <div className={s.cols}>
              <div className={s.card}>
                <h3>Qué incluye</h3>
                <ul className={s.dots}>
                  <li>{clases} clases en video ({minutos} minutos en total).</li>
                  <li>El modelo .skp de la escena, para practicar con el mismo archivo.</li>
                  <li>Acceso desde cualquier dispositivo, en el Área de Miembros de Hotmart.</li>
                </ul>
              </div>
              <div className={s.card}>
                <h3>Qué necesitás</h3>
                <ul className={s.dots}>
                  <li>SketchUp 2026.</li>
                  <li>D5 Render 3.1.1.</li>
                  <li>Una PC compatible con D5 (<a href={REQUISITOS_URL} target="_blank" rel="noopener noreferrer">requisitos oficiales</a>).</li>
                  <li>Photoshop es opcional: se usa de forma leve en una clase y podés seguir el curso sin él.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PARA QUIÉN ES / PARA QUIÉN NO ES */}
        <section className={s.section} aria-labelledby="paraquien">
          <div className={s.container}>
            <p className={s.eyebrow}>Antes de comprar</p>
            <h2 id="paraquien" className={s.h2}>¿Es para vos?</h2>
            <div className={s.cols}>
              <div className={s.card}>
                <h3>Es para vos si…</h3>
                <ul className={s.dots}>
                  <li>Ya usás SketchUp y querés renders más profesionales.</li>
                  <li>Sos arquitecto, estudiante o modelador 3D.</li>
                  <li>Querés dejar de perder semanas probando configuraciones.</li>
                </ul>
              </div>
              <div className={s.card}>
                <h3>No es para vos si…</h3>
                <ul className={`${s.dots} ${s.nos}`}>
                  <li>Nunca usaste SketchUp.</li>
                  <li>Buscás algo avanzado: animación, post-producción avanzada o exteriores.</li>
                </ul>
                <div className={s.more}>
                  <p>Para empezar desde cero o ir más a fondo, en IMUTES tenés:</p>
                  <ul className={s.moreLinks}>
                    <li>
                      <a href={IMUTES_SKETCHUP} target="_blank" rel="noopener">
                        Curso completo de SketchUp <span aria-hidden="true">→</span>
                      </a>
                    </li>
                    <li>
                      <a href={IMUTES_CURSO} target="_blank" rel="noopener">
                        Masterclass completa de D5 Render, con exteriores y animación <span aria-hidden="true">→</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. QUIÉN TE ENSEÑA */}
        <section className={`${s.section} ${s.alt}`} aria-labelledby="instructor">
          <div className={`${s.container} ${s.teacher}`}>
            <div>
              <p className={s.eyebrow}>Instructor</p>
              <h2 id="instructor" className={s.h2}>Quién te enseña</h2>
              <div className={s.who}>
                <Image
                  className={s.avatar}
                  src="/assets/about.webp"
                  alt="Pedro Sardi"
                  width={800}
                  height={800}
                  sizes="88px"
                />
                <div>
                  <p className={s.whoName}>Pedro Sardi</p>
                  <span className={s.badge}>{INSTRUCTOR_TITULO}</span>
                </div>
              </div>
              <div className={s.teacherText}>
                <p>
                  Soy Pedro Sardi, {enFrase(INSTRUCTOR_TITULO)} y visualizador arquitectónico. Soy cofundador de OVETA, un estudio de visualización para inmobiliarias, desarrolladoras y arquitectos en Paraguay.
                </p>
                <p>En este curso te enseño el flujo que uso con clientes reales.</p>
              </div>
            </div>
            <figure className={s.seal}>
              <Image
                src="/assets/certificado-d5-2026.webp"
                alt="Certificado de D5 Inc. que acredita a Pedro Sardi como instructor certificado de D5 Render"
                width={1200}
                height={1697}
                sizes="240px"
              />
              <figcaption className={s.sealCap}>D5 Certified Instructor, emitido por D5 Inc.</figcaption>
            </figure>
          </div>
        </section>

        {/* 7. GARANTÍA */}
        <section className={s.section} aria-labelledby="garantia">
          <div className={s.container}>
            <div className={s.guarantee}>
              <h2 id="garantia" className={s.h2} style={{ margin: 0 }}>Garantía de {garantiaDias} días</h2>
              <p>Tenés {garantiaDias} días desde la compra para pedir el reembolso, directamente desde Hotmart. El pago y el reembolso los gestiona Hotmart.</p>
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className={`${s.section} ${s.alt}`} aria-labelledby="faq">
          <div className={s.container}>
            <p className={s.eyebrow}>Dudas frecuentes</p>
            <h2 id="faq" className={s.h2}>Preguntas frecuentes</h2>
            <div className={s.faq}>
              <details>
                <summary>¿Qué PC necesito?</summary>
                <p className={s.answer}><a href={REQUISITOS_URL} target="_blank" rel="noopener noreferrer">Mirá los requisitos oficiales de D5 Render</a></p>
              </details>
              <details>
                <summary>¿Qué versiones de SketchUp y D5 necesito?</summary>
                <p className={s.answer}>El curso usa SketchUp 2026 y D5 Render 3.1.1.</p>
              </details>
              <details>
                <summary>¿Cómo accedo al curso?</summary>
                <p className={s.answer}>Desde el Área de Miembros de Hotmart, en cualquier dispositivo. Hotmart gestiona el acceso y los pagos.</p>
              </details>
              <details>
                <summary>¿Sirve si nunca usé SketchUp?</summary>
                <p className={s.answer}>No. El curso parte de un modelo ya hecho en SketchUp y asume que sabés manejarlo. Si nunca lo usaste, conviene aprender lo básico primero.</p>
              </details>
              <details>
                <summary>¿Necesito Photoshop?</summary>
                <p className={s.answer}>No es obligatorio. En una clase se usa de forma leve para un retoque rápido, y podés seguir el curso sin él.</p>
              </details>
              <details>
                <summary>¿Qué no incluye?</summary>
                <p className={s.answer}>No cubre animación, post-producción avanzada ni exteriores: la escena del curso es un interior.</p>
              </details>
              <details>
                <summary>¿Cómo pido el reembolso?</summary>
                <p className={s.answer}>Dentro de los {garantiaDias} días desde la compra, desde Hotmart. Hotmart gestiona el pago y el reembolso.</p>
              </details>
            </div>
          </div>
        </section>

        {/* 9. CTA FINAL */}
        <section className={`${s.container} ${s.final}`} aria-labelledby="final">
          <h2 id="final" className={s.h2}>Empezá hoy tu primer render fotorrealista.</h2>
          <p className={s.lead}>{clases} clases, {minutos} minutos, el modelo .skp incluido y garantía de {garantiaDias} días.</p>
          <CheckoutLink location="final" className={s.cta}>Quiero el curso</CheckoutLink>
          <p className={s.price}>Pago único US$ {precioTexto}</p>
        </section>
      </main>

      {/* Footer mínimo (sin enlaces de navegación) */}
      <footer className={s.container}>
        <div className={s.footer}>
          <p>© pedrosardi.studio · Consultas y soporte: a través de Hotmart</p>
        </div>
      </footer>

      {/* 10. Barra CTA fija (solo mobile) */}
      <div className={s.sticky}>
        <div className={s.stickyPrice}>
          <strong>US$ {precioTexto}</strong>
          <span>Pago único</span>
        </div>
        <CheckoutLink location="sticky" className={s.cta}>Quiero el curso</CheckoutLink>
      </div>
    </div>
  )
}
