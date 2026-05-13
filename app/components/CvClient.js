'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  img { display: block; max-width: 100%; }
  a { text-decoration: none; color: inherit; }

  :root {
    --bg:     #080807;
    --bg2:    #0d0d0c;
    --bg3:    #131312;
    --fg:     #ede9e1;
    --muted:  rgba(237,233,225,.44);
    --border: rgba(237,233,225,.08);
    --gold:   #b99460;
    --gdim:   rgba(185,148,96,.14);
  }

  html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--fg); font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }

  #grain { position: fixed; inset: 0; pointer-events: none; z-index: 500; opacity: .26;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }

  #c-dot, #c-ring { display:none; position:fixed; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); }
  @media (hover:hover) and (pointer:fine) {
    body { cursor: none; }
    #c-dot  { display:block; width:6px; height:6px; background:var(--fg); border-radius:50%; transition:width .2s,height .2s,background .2s,border .2s; }
    #c-ring { display:block; width:30px; height:30px; border:1px solid rgba(237,233,225,.3); border-radius:50%; z-index:9998; transition:opacity .25s; }
    body.ch #c-dot  { width:44px; height:44px; background:transparent; border:1px solid rgba(237,233,225,.55); }
    body.ch #c-ring { opacity:0; }
  }

  .a { opacity:0; transform:translateY(32px); transition:opacity .85s cubic-bezier(.25,.46,.45,.94), transform .85s cubic-bezier(.25,.46,.45,.94); }
  .a-l { opacity:0; transform:translateX(-32px); transition:opacity .85s cubic-bezier(.25,.46,.45,.94), transform .85s cubic-bezier(.25,.46,.45,.94); }
  .a.in, .a-l.in { opacity:1; transform:none; }
  .d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.32s} .d4{transition-delay:.46s} .d5{transition-delay:.62s}

  #scroll-prog { position:fixed; top:0; left:0; height:2px; background:var(--gold); width:0%; z-index:9999; transition:width .1s linear; pointer-events:none; }

  /* NAV */
  #nav { position:fixed; top:0; left:0; right:0; z-index:200; display:flex; align-items:center; justify-content:space-between; padding:18px 52px; background:rgba(8,8,7,.96); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); }
  .nav-brand { font-family:'Playfair Display',serif; font-size:.95rem; letter-spacing:.14em; color:var(--fg); }
  .nav-brand span { color:var(--gold); }
  .nav-back { display:inline-flex; align-items:center; gap:9px; padding:8px 16px 8px 12px; border:1px solid rgba(237,233,225,.1); font-size:.58rem; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); transition:color .3s, border-color .3s; }
  .nav-back:hover { color:var(--fg); border-color:rgba(237,233,225,.28); }
  .nav-back svg { width:13px; transition:transform .3s; }
  .nav-back:hover svg { transform:translateX(-3px); }
  .nav-pill { display:inline-flex; align-items:center; gap:7px; padding:8px 16px; border:1px solid var(--gdim); font-size:.56rem; letter-spacing:.16em; text-transform:uppercase; color:var(--gold); transition:background .3s, border-color .3s; }
  .nav-pill:hover { background:var(--gdim); border-color:rgba(185,148,96,.32); }
  .nav-pill::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--gold); animation:pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }

  /* HERO — centrado */
  #hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 52px 64px;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .hero-glow { position:absolute; inset:0; pointer-events:none; background:radial-gradient(ellipse 70% 60% at 50% 40%, rgba(185,148,96,.055) 0%, transparent 65%); }
  .hero-grid { position:absolute; inset:0; pointer-events:none; background-image:linear-gradient(rgba(237,233,225,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(237,233,225,.018) 1px,transparent 1px); background-size:72px 72px; }
  .hero-inner { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; max-width:900px; margin:0 auto; }
  .hero-tag { display:inline-flex; align-items:center; gap:10px; font-size:.58rem; letter-spacing:.22em; text-transform:uppercase; color:var(--gold); border:1px solid rgba(185,148,96,.22); padding:6px 16px; margin-bottom:28px; }
  .hero-tag::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--gold); }
  .hero-name { font-family:'Playfair Display',serif; font-size:clamp(5rem,11vw,12rem); font-weight:400; line-height:.9; letter-spacing:-.025em; color:var(--fg); margin-bottom:8px; }
  .hero-name em { font-style:italic; color:rgba(237,233,225,.3); display:block; }
  .hero-role { font-size:clamp(.85rem,1.5vw,1rem); color:var(--muted); letter-spacing:.04em; line-height:1.7; margin-bottom:48px; }
  .hero-photo-wrap { position:relative; width:clamp(160px,18vw,240px); margin:0 auto 48px; }
  .hero-photo-wrap::before { content:''; position:absolute; inset:-10px; border:1px solid rgba(185,148,96,.18); pointer-events:none; transition:all .5s; }
  .hero-photo-wrap:hover::before { inset:-16px; border-color:rgba(185,148,96,.38); }
  .hero-photo-wrap img { width:100%; aspect-ratio:3/4; object-fit:cover; object-position:center top; filter:grayscale(10%) brightness(.88); display:block; transition:filter .6s; }
  .hero-photo-wrap:hover img { filter:grayscale(0) brightness(.96); }
  .hero-stats { display:flex; gap:48px; justify-content:center; margin-bottom:44px; }
  .hs { text-align:center; }
  .hs-n { font-family:'Playfair Display',serif; font-size:2.2rem; font-weight:400; color:var(--gold); line-height:1; display:block; }
  .hs-l { font-size:.52rem; letter-spacing:.14em; text-transform:uppercase; color:var(--muted); }
  .hero-actions { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; }
  .btn-gold { display:inline-flex; align-items:center; gap:10px; padding:13px 28px; background:var(--gold); color:#080807; font-size:.6rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; transition:background .3s, transform .3s, box-shadow .3s; }
  .btn-gold:hover { background:#c9a470; transform:translateY(-2px); box-shadow:0 12px 36px rgba(185,148,96,.25); }
  .btn-ghost { display:inline-flex; align-items:center; gap:10px; padding:12px 28px; border:1px solid var(--border); color:var(--muted); font-size:.6rem; letter-spacing:.18em; text-transform:uppercase; transition:color .3s, border-color .3s; }
  .btn-ghost:hover { color:var(--fg); border-color:rgba(237,233,225,.28); }

  /* COMMONS */
  .sec { padding:96px 52px; }
  .sec-alt { background:var(--bg2); }
  .container { max-width:1100px; margin:0 auto; }
  .divider { height:1px; background:var(--border); margin:0 52px; }
  .lbl { display:inline-flex; align-items:center; gap:12px; font-size:.58rem; letter-spacing:.26em; text-transform:uppercase; color:var(--gold); margin-bottom:16px; }
  .lbl::before { content:''; width:22px; height:1px; background:var(--gold); opacity:.5; }
  .sec-title { font-family:'Playfair Display',serif; font-size:clamp(2rem,3.5vw,3.2rem); font-weight:400; line-height:1.08; color:var(--fg); margin-bottom:52px; }
  .sec-title em { font-style:italic; color:var(--gold); }
  .tag { display:inline-block; font-size:.46rem; letter-spacing:.14em; text-transform:uppercase; color:var(--gold); background:var(--gdim); border:1px solid rgba(185,148,96,.22); padding:3px 9px; }

  /* STACK — 3 categorías */
  .stack-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border-top:1px solid var(--border); border-left:1px solid var(--border); }
  .stack-cat { border-right:1px solid var(--border); border-bottom:1px solid var(--border); padding:32px 28px; position:relative; overflow:hidden; transition:background .4s; }
  .stack-cat::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.25,.46,.45,.94); }
  .stack-cat:hover { background:rgba(237,233,225,.015); }
  .stack-cat:hover::before { transform:scaleX(1); }
  .stack-cat-title { font-family:'Playfair Display',serif; font-size:1rem; font-weight:400; color:var(--fg); margin-bottom:4px; }
  .stack-cat-title em { font-style:italic; color:var(--gold); }
  .stack-cat-sub { font-size:.55rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:20px; }
  .stack-items { display:flex; flex-direction:column; gap:10px; }
  .stack-item { display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .stack-name { font-size:.78rem; color:var(--fg); }
  .stack-bar { height:2px; width:72px; background:var(--border); position:relative; flex-shrink:0; }
  .stack-bar-fill { position:absolute; left:0; top:0; bottom:0; background:var(--gold); width:0; transition:width 1.2s cubic-bezier(.25,.46,.45,.94); }

  /* TIMELINE */
  .timeline { display:flex; flex-direction:column; }
  .tl-item { display:grid; grid-template-columns:120px 1fr; gap:40px; padding:32px 0; border-bottom:1px solid var(--border); position:relative; }
  .tl-item:last-child { border-bottom:none; }
  .tl-item::before { content:''; position:absolute; left:120px; top:42px; transform:translateX(-50%); width:7px; height:7px; border-radius:50%; background:var(--border); border:1px solid rgba(185,148,96,.2); transition:background .3s; }
  .tl-item:hover::before { background:var(--gold); border-color:var(--gold); }
  .tl-date { font-family:'Playfair Display',serif; font-size:.95rem; color:var(--gold); padding-top:4px; font-style:italic; }
  .tl-body h3 { font-family:'Playfair Display',serif; font-size:1.2rem; font-weight:400; color:var(--fg); margin-bottom:6px; }
  .tl-body h3 em { font-style:italic; color:var(--gold); }
  .tl-body p { font-size:.82rem; line-height:1.8; color:var(--muted); margin-bottom:12px; }
  .tl-tags { display:flex; flex-wrap:wrap; gap:6px; }

  /* PROYECTOS */
  .proj-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; }
  .proj-item { position:relative; overflow:hidden; background:var(--bg3); border:1px solid var(--border); transition:border-color .4s; }
  .proj-item:hover { border-color:rgba(185,148,96,.32); }
  .proj-img { width:100%; aspect-ratio:16/10; object-fit:cover; filter:brightness(.72) grayscale(12%); transition:transform .7s cubic-bezier(.25,.46,.45,.94), filter .7s; display:block; }
  .proj-item:hover .proj-img { transform:scale(1.05); filter:brightness(.92) grayscale(0); }
  .proj-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(8,8,7,.88) 0%, transparent 55%); opacity:0; transition:opacity .4s; display:flex; align-items:flex-end; padding:22px; }
  .proj-item:hover .proj-overlay { opacity:1; }
  .proj-cat { font-size:.5rem; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); display:block; margin-bottom:4px; }
  .proj-title { font-family:'Playfair Display',serif; font-size:1.05rem; color:var(--fg); }

  /* CREDENCIALES */
  .cred-list { display:flex; flex-direction:column; border-top:1px solid var(--border); }
  .cred-item { display:flex; align-items:center; justify-content:space-between; padding:24px 0; border-bottom:1px solid var(--border); gap:24px; }
  .cred-item:last-child { border-bottom:none; }
  .cred-icon { width:40px; height:40px; flex-shrink:0; border:1px solid var(--gdim); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:.9rem; }
  .cred-body h4 { font-family:'Playfair Display',serif; font-size:1.05rem; font-weight:400; color:var(--fg); margin-bottom:4px; }
  .cred-body p { font-size:.76rem; color:var(--muted); line-height:1.6; }
  .cred-badge { flex-shrink:0; }

  /* IDIOMAS */
  .lang-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-top:1px solid var(--border); border-left:1px solid var(--border); }
  .lang-item { border-right:1px solid var(--border); border-bottom:1px solid var(--border); padding:28px 24px; }
  .lang-name { font-family:'Playfair Display',serif; font-size:1.2rem; color:var(--fg); margin-bottom:4px; }
  .lang-level { font-size:.56rem; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-bottom:14px; }
  .lang-bar { height:1px; background:var(--border); }
  .lang-bar-fill { height:100%; background:var(--gold); width:0; transition:width 1.4s cubic-bezier(.25,.46,.45,.94); }

  /* CONTACTO */
  .contact-row { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
  .contact-tagline { font-family:'Playfair Display',serif; font-size:clamp(2.8rem,5vw,5rem); font-weight:400; line-height:1.02; color:var(--fg); margin-top:12px; }
  .contact-tagline em { font-style:italic; color:rgba(237,233,225,.22); }
  .cl { display:flex; flex-direction:column; }
  .cl-item { display:flex; align-items:center; justify-content:space-between; padding:18px 0; border-bottom:1px solid var(--border); color:var(--fg); transition:all .3s; }
  .cl-item:last-child { border-bottom:none; }
  .cl-item:hover { color:var(--gold); padding-left:8px; }
  .cl-name { font-size:.9rem; font-weight:400; margin-bottom:2px; }
  .cl-sub { font-size:.68rem; color:var(--muted); }
  .cl-arr { font-size:1.2rem; color:var(--muted); transition:transform .3s, color .3s; }
  .cl-item:hover .cl-arr { transform:translate(4px,-4px); color:var(--gold); }

  /* FOOTER */
  .cv-footer { padding:22px 52px; border-top:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; }
  .cv-footer-logo { font-family:'Playfair Display',serif; font-size:.85rem; letter-spacing:.14em; color:rgba(237,233,225,.3); }
  .cv-footer p { font-size:.58rem; letter-spacing:.06em; color:rgba(237,233,225,.18); }

  /* MOBILE */
  @media (max-width: 900px) {
    #nav { padding: 14px 20px; }
    #hero { padding: 90px 20px 48px; }
    .hero-name { font-size: clamp(4rem,14vw,7rem); }
    .hero-stats { gap: 28px; }
    .sec { padding: 64px 20px; }
    .divider { margin: 0 20px; }
    .stack-grid { grid-template-columns: 1fr; }
    .tl-item { grid-template-columns: 72px 1fr; gap: 20px; }
    .tl-item::before { left: 72px; }
    .proj-grid { grid-template-columns: 1fr; }
    .lang-grid { grid-template-columns: 1fr 1fr; }
    .contact-row { grid-template-columns: 1fr; gap: 40px; }
    .cv-footer { flex-direction: column; gap: 10px; text-align: center; padding: 20px; }
  }
`

const stack = [
  {
    title: 'Visualización', em: '& 3D', sub: 'Render arquitectónico',
    items: [
      {name:'D5 Render', pct:98},
      {name:'SketchUp', pct:96},
      {name:'V-Ray', pct:82},
      {name:'Corona Render', pct:72},
      {name:'3ds Max', pct:70},
      {name:'Blender', pct:55},
      {name:'Unreal Engine', pct:40},
    ]
  },
  {
    title: 'Post', em: 'Producción', sub: 'Edición y compositing',
    items: [
      {name:'Photoshop', pct:88},
      {name:'DaVinci Resolve', pct:80},
      {name:'Lightroom', pct:72},
    ]
  },
  {
    title: 'CAD &', em: 'Técnico', sub: 'Diseño y electrónica',
    items: [
      {name:'AutoCAD', pct:62},
      {name:'Arduino', pct:78},
      {name:'Domótica', pct:80},
    ]
  },
]

const langs = [
  {name:'Español', level:'Nativo', pct:100},
  {name:'Inglés', level:'Técnico / Intermedio', pct:62},
  {name:'Portugués', level:'En progreso', pct:28},
  {name:'Alemán', level:'En progreso', pct:14},
]

export default function CvClient() {
  useEffect(() => {
    var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (hasMouse) {
      var dot = document.getElementById('c-dot'), ring = document.getElementById('c-ring')
      var mx = window.innerWidth/2, my = window.innerHeight/2, rx = mx, ry = my
      document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';},{passive:true})
      ;(function tick(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick)})()
      document.querySelectorAll('a, button').forEach(function(el){
        el.addEventListener('mouseenter',function(){document.body.classList.add('ch')})
        el.addEventListener('mouseleave',function(){document.body.classList.remove('ch')})
      })
    }

    var prog = document.getElementById('scroll-prog')
    window.addEventListener('scroll',function(){
      var docH = document.documentElement.scrollHeight - window.innerHeight
      prog.style.width = (docH>0?(window.scrollY/docH)*100:0) + '%'
    },{passive:true})

    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return
        e.target.classList.add('in')
        e.target.querySelectorAll('.stack-bar-fill[data-w]').forEach(function(b){ b.style.width = b.getAttribute('data-w') + '%' })
        e.target.querySelectorAll('.lang-bar-fill[data-w]').forEach(function(b){ b.style.width = b.getAttribute('data-w') + '%' })
        obs.unobserve(e.target)
      })
    },{threshold:0.08})
    document.querySelectorAll('.a, .a-l').forEach(function(el){obs.observe(el)})
  },[])

  return (
    <>
      <style>{css}</style>
      <div id="grain" aria-hidden="true"></div>
      <div id="scroll-prog" aria-hidden="true"></div>
      <div id="c-dot" aria-hidden="true"></div>
      <div id="c-ring" aria-hidden="true"></div>

      {/* NAV */}
      <nav id="nav">
        <Link href="/" className="nav-back">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M10 3L5 8l5 5"/></svg>
          Inicio
        </Link>
        <span className="nav-brand">Pedro <span>Sardi</span></span>
        <a href="https://wa.me/595974534159" target="_blank" rel="noopener" className="nav-pill">Contactar</a>
      </nav>

      {/* HERO — centrado */}
      <section id="hero">
        <div className="hero-glow" aria-hidden="true"></div>
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-tag">Disponible para proyectos</div>
          <h1 className="hero-name">
            Pedro<em>Sardi.</em>
          </h1>
          <p className="hero-role">
            Visualizador arquitectónico &amp; Tutor verificado D5 Render<br />
            Paraguay · Trabajo con toda Latinoamérica
          </p>
          <div className="hero-photo-wrap">
            <img src="/assets/about.webp" alt="Pedro Sardi" />
          </div>
          <div className="hero-stats">
            <div className="hs"><span className="hs-n">18+</span><span className="hs-l">hrs de curso</span></div>
            <div className="hs"><span className="hs-n">4K</span><span className="hs-l">renders</span></div>
            <div className="hs"><span className="hs-n">360°</span><span className="hs-l">tours virtuales</span></div>
          </div>
          <div className="hero-actions">
            <a href="https://wa.me/595974534159" target="_blank" rel="noopener" className="btn-gold">Contactar por WhatsApp</a>
            <a href="#proyectos" className="btn-ghost">Ver trabajos</a>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* STACK */}
      <section className="sec" id="stack">
        <div className="container">
          <div className="a"><div className="lbl">Stack técnico</div><h2 className="sec-title">Herramientas que <em>domino.</em></h2></div>
          <div className="stack-grid">
            {stack.map(function(cat,ci){return (
              <div className={'stack-cat a' + (ci>0?' d'+ci:'')} key={cat.title}>
                <h3 className="stack-cat-title">{cat.title} <em>{cat.em}</em></h3>
                <p className="stack-cat-sub">{cat.sub}</p>
                <div className="stack-items">
                  {cat.items.map(function(item){return (
                    <div className="stack-item" key={item.name}>
                      <span className="stack-name">{item.name}</span>
                      <div className="stack-bar">
                        <div className="stack-bar-fill" data-w={item.pct} style={{width:0}}></div>
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* TRAYECTORIA */}
      <section className="sec sec-alt" id="trayectoria">
        <div className="container">
          <div className="a"><div className="lbl">Trayectoria</div><h2 className="sec-title">El camino <em>recorrido.</em></h2></div>
          <div className="timeline">
            {[
              {
                date:'2025',
                title:'Tutor Verificado', em:'D5 Render',
                desc:'Certificación oficial directa de D5 Render. Una de las pocas personas en Latinoamérica con esta distinción. Lanzamiento de la Masterclass en IMUTES con más de 18 horas de contenido.',
                tags:['D5 Render','Tutor Verificado','IMUTES','Masterclass']
              },
              {
                date:'2024',
                title:'OVETA', em:'',
                desc:'Fundación de OVETA junto a Cristina Vargas. Estudio de visualización arquitectónica y construcción.',
                tags:['Renders 3D','Cursos','Tutorías','Construcción']
              },
              {
                date:'2020',
                title:'Giro', em:'profesional',
                desc:'Camino autodidacta en visualización arquitectónica. Dominio progresivo de SketchUp, V-Ray, D5 Render, 3ds Max y herramientas de post-producción.',
                tags:['SketchUp','V-Ray','D5 Render','Autodidacta']
              },
              {
                date:'En proceso',
                title:'Ingeniería', em:'& Controles Industriales',
                desc:'Profundizando en controles industriales y automatización para integrar soluciones innovadoras en los proyectos de OVETA — combinando arquitectura, domótica y tecnología.',
                tags:['Automatización','Domótica','OVETA','Innovación']
              },
              {
                date:'2014',
                title:'Técnico en', em:'Electrónica',
                desc:'Egresado como técnico en electrónica. Conocimientos en domótica, conexiones eléctricas, programación con Arduino y sistemas de automatización básica.',
                tags:['Electrónica','Arduino','Domótica','Automatización']
              },
            ].map(function(item,i){return (
              <div className={'tl-item a' + (i>0?' d'+Math.min(i,4):'')} key={item.date}>
                <div className="tl-date">{item.date}</div>
                <div className="tl-body">
                  <h3>{item.title} <em>{item.em}</em></h3>
                  <p>{item.desc}</p>
                  <div className="tl-tags">{item.tags.map(function(t){return <span key={t} className="tag">{t}</span>})}</div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* PROYECTOS */}
      <section className="sec" id="proyectos">
        <div className="container">
          <div className="a"><div className="lbl">Proyectos</div><h2 className="sec-title">Trabajos <em>recientes.</em></h2></div>
          <div className="proj-grid">
            {[
              {src:'/assets/renders/render-1.webp', cat:'Residencial · Interior', title:'Interior residencial'},
              {src:'/assets/renders/render-2.webp', cat:'Residencial · Exterior', title:'Exterior residencial'},
              {src:'/assets/renders/render-3.webp', cat:'Oficina', title:'Interior oficinas'},
              {src:'/assets/renders/render-4.webp', cat:'Residencial · Exterior', title:'Exterior comercial'},
              {src:'/assets/renders/render-5.webp', cat:'Residencial · Exterior', title:'Exterior diurno'},
              {src:'/assets/renders/render-6.webp', cat:'Residencial · Interior', title:'Interior nocturno'},
            ].map(function(p,i){return (
              <div className={'proj-item a' + (i>0?' d'+Math.min(i,4):'')} key={p.title}>
                <img src={p.src} alt={p.title} className="proj-img" loading="lazy" />
                <div className="proj-overlay">
                  <div><span className="proj-cat">{p.cat}</span><span className="proj-title">{p.title}</span></div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* CREDENCIALES */}
      <section className="sec sec-alt" id="credenciales">
        <div className="container">
          <div className="a"><div className="lbl">Credenciales</div><h2 className="sec-title">Formación y <em>certificaciones.</em></h2></div>
          <div className="cred-list">
            {[
              {icon:'✓', title:'Tutor Verificado D5 Render', desc:'Certificación oficial directa de D5 Render. Una de las pocas personas en Latinoamérica con esta distinción.', badge:'Verificado'},
              {icon:'✦', title:'Instructor — IMUTES', desc:'Plataforma de cursos con estudiantes en Paraguay y toda la región hispanohablante. Masterclass D5 Render de 18+ horas.', badge:'18+ hrs'},
              {icon:'◈', title:'OVETA — Fundador', desc:'Fundado junto a Cristina Vargas. Estudio de visualización y construcción.', badge:'Co-fundador'},
              {icon:'▲', title:'Técnico en Electrónica — 2014', desc:'Domótica, conexiones eléctricas básicas, programación y automatización de sistemas.', badge:'Egresado 2014'},
            ].map(function(c,i){return (
              <div className={'cred-item a' + (i>0?' d'+Math.min(i,4):'')} key={c.title}>
                <div className="cred-icon">{c.icon}</div>
                <div className="cred-body">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
                <div className="cred-badge"><span className="tag">{c.badge}</span></div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* IDIOMAS */}
      <section className="sec" id="idiomas">
        <div className="container">
          <div className="a"><div className="lbl">Idiomas</div><h2 className="sec-title">Comunicación <em>global.</em></h2></div>
          <div className="lang-grid">
            {langs.map(function(l,i){return (
              <div className={'lang-item a' + (i>0?' d'+Math.min(i,4):'')} key={l.name}>
                <div className="lang-name">{l.name}</div>
                <div className="lang-level">{l.level}</div>
                <div className="lang-bar">
                  <div className="lang-bar-fill" data-w={l.pct} style={{width:0}}></div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* CONTACTO */}
      <section className="sec sec-alt" id="contacto">
        <div className="container">
          <div className="contact-row">
            <div className="a">
              <div className="lbl">Contacto</div>
              <h2 className="contact-tagline">Trabajemos<br /><em>juntos.</em></h2>
            </div>
            <div className="cl a d2">
              {[
                {label:'WhatsApp', sub:'+595 974 534 159', href:'https://wa.me/595974534159'},
                {label:'LinkedIn', sub:'pedroesardi', href:'https://www.linkedin.com/in/pedroesardi/'},
                {label:'Instagram', sub:'@pedrosardi.studio', href:'https://www.instagram.com/pedrosardi.studio/'},
                {label:'YouTube', sub:'@pedrosardi.studio', href:'https://www.youtube.com/@pedrosardi.studio'},
                {label:'IMUTES', sub:'Masterclass D5 Render — 18+ horas', href:'https://imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup/?afiliado=d5-render'},
                {label:'OVETA', sub:'oveta.studio', href:'https://oveta.studio'},
              ].map(function(l){return (
                <a key={l.label} href={l.href} target="_blank" rel="noopener" className="cl-item">
                  <div><div className="cl-name">{l.label}</div><div className="cl-sub">{l.sub}</div></div>
                  <span className="cl-arr">↗</span>
                </a>
              )})}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cv-footer">
        <span className="cv-footer-logo">Pedro Sardi</span>
        <p>© 2025 pedrosardi.studio</p>
        <Link href="/" style={{fontSize:'.58rem',letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(237,233,225,.3)',borderBottom:'1px solid rgba(237,233,225,.1)',paddingBottom:'2px'}}>← Volver al inicio</Link>
      </footer>
    </>
  )
}
