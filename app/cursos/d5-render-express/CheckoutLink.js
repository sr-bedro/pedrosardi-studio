'use client'
import { CHECKOUT_URL } from '../../lib/site'

// Única isla de cliente de la página: arma el link al checkout de Hotmart en el momento del clic.
//
// UTM / rastreo (mapeo propuesto; hay que VERIFICARLO con una venta real en Hotmart Analytics):
//   - utm_*  -> se reenvían tal cual (Hotmart los acepta en el checkout).
//   - sck    -> sck entrante, o si no src entrante, o si no utm_source.
//            Según la ayuda de Hotmart, `sck` es el parámetro para links de pago directos (pay.hotmart.com).
//   - src    -> se reenvía solo si viene en la URL (según Hotmart, `src` es para links de afiliado / go.hotmart.com).
//   Ayuda oficial: https://help.hotmart.com/es/article/216441797  y  https://help.hotmart.com/es/article/360002403031
//
// Más adelante se puede evaluar el widget de checkout emergente de Hotmart en lugar de navegar a la misma pestaña.
//
// Meta Pixel (desactivado): si se activa, disparar acá fbq('track', 'InitiateCheckout') junto a click_cta.
function buildCheckoutUrl() {
  const url = new URL(CHECKOUT_URL) // CHECKOUT_URL puede traer o no "?"; searchParams lo resuelve
  const incoming = new URLSearchParams(window.location.search)

  incoming.forEach(function (value, key) {
    if (value && key.indexOf('utm_') === 0) url.searchParams.set(key, value)
  })

  const src = incoming.get('src')
  const sck = incoming.get('sck') || src || incoming.get('utm_source')
  if (sck) url.searchParams.set('sck', sck)
  if (src) url.searchParams.set('src', src)

  return url.toString()
}

export default function CheckoutLink({ location, className, children }) {
  function prepare(e) {
    try {
      e.currentTarget.href = buildCheckoutUrl()
    } catch {
      // Si algo falla se navega igual al CHECKOUT_URL base (el href original)
    }
  }

  function handleClick(e) {
    prepare(e)
    // GA ya está en el layout; el evento se dispara solo si gtag existe
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'click_cta', { cta_location: location, transport_type: 'beacon' })
    }
  }

  return (
    <a
      href={CHECKOUT_URL}
      className={className}
      rel="noopener"
      onClick={handleClick}
      onAuxClick={prepare} // clic del medio / abrir en pestaña nueva también llevan los parámetros
    >
      {children}
    </a>
  )
}
