'use client'
import { useEffect } from 'react'

const css = `
  /* ─── RESET ─── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  img  { display: block; max-width: 100%; }
  a    { text-decoration: none; color: inherit; }
  ul   { list-style: none; }

  /* ─── TOKENS ─── */
  :root {
    --bg:     #0b0b0a;
    --bg2:    #0f0f0e;
    --bg3:    #141413;
    --fg:     #ede9e1;
    --muted:  rgba(237,233,225,.42);
    --border: rgba(237,233,225,.09);
    --gold:   #b99460;
  }

  html, body { height: 100%; width: 100%; -webkit-font-smoothing: antialiased; }
  body { background: var(--bg); color: var(--fg); font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }

  /* ─── GRAIN ─── */
  #grain { position: fixed; inset: 0; pointer-events: none; z-index: 600; opacity: .34;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }

  /* ─── CURSOR ─── */
  #c-dot, #c-ring { display: none; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); will-change: left, top; }
  @media (hover: hover) and (pointer: fine) {
    body { cursor: none; }
    #c-dot  { display: block; width: 6px; height: 6px; background: var(--fg); border-radius: 50%; transition: width .2s, height .2s, background .2s, border .2s; }
    #c-ring { display: block; width: 30px; height: 30px; border: 1px solid rgba(237,233,225,.3); border-radius: 50%; z-index: 9998; transition: opacity .25s; }
    body.ch #c-dot  { width: 44px; height: 44px; background: transparent; border: 1px solid rgba(237,233,225,.55); }
    body.ch #c-ring { opacity: 0; }
  }

  /* ─── NAV ─── */
  #nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: center; padding: 28px 52px;
    transition: padding .4s, background .4s, border-color .4s;
    border-bottom: 1px solid transparent;
  }
  #nav.stuck { padding: 14px 52px; background: rgba(11,11,10,.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom-color: var(--border); }
  .nav-links { display: flex; gap: 40px; }
  .nav-links.r { justify-content: flex-end; }
  .nav-links a { font-size: .68rem; letter-spacing: .2em; text-transform: uppercase; color: rgba(237,233,225,.72); transition: color .3s; }
  .nav-links a:hover { color: var(--fg); }
  .nav-logo { font-family: 'Playfair Display', serif; font-size: 1.1rem; letter-spacing: .14em; color: var(--fg); justify-self: center; }
  a.curso-link { color: var(--gold); }
  a.curso-link:hover { background: rgba(185,148,96,.06); font-size: .7rem; }

  #menu-btn { display: none; }
  #mobile-menu { display: none; }

  @media (max-width: 900px) {
    .hs:not(:first-child) { display: none; }
    #hero-bars { display: none !important; }
    .nav-links { display: none; }
    #nav { grid-template-columns: 44px 1fr 44px; padding: 18px 20px; }
    #nav.stuck { padding: 12px 20px; }
    .nav-logo { grid-column: 2; font-size: 1rem; }
    #menu-btn { display: flex; grid-column: 3; justify-self: end; flex-direction: column; justify-content: center; align-items: flex-end; gap: 5px; width: 40px; height: 40px; background: none; border: none; cursor: pointer; padding: 8px 4px; -webkit-tap-highlight-color: transparent; }
    #menu-btn span { display: block; height: 1px; background: rgba(237,233,225,.72); border-radius: 1px; transform-origin: right; transition: width .3s cubic-bezier(.25,.46,.45,.94), transform .3s, opacity .2s, background .2s; }
    #menu-btn span:nth-child(1) { width: 22px; }
    #menu-btn span:nth-child(2) { width: 16px; }
    #menu-btn span:nth-child(3) { width: 22px; }
    #menu-btn.open span:nth-child(1) { width: 20px; transform: rotate(-40deg) translateY(1px); background: var(--gold); }
    #menu-btn.open span:nth-child(2) { width: 0; opacity: 0; }
    #menu-btn.open span:nth-child(3) { width: 20px; transform: rotate(40deg) translateY(-1px); background: var(--gold); }
    #mobile-menu { display: block; position: fixed; top: 0; left: 0; right: 0; z-index: 490; background: rgba(11,11,10,.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(185,148,96,.15); padding: 0 20px; max-height: 0; overflow: hidden; transition: max-height .5s cubic-bezier(.25,.46,.45,.94), padding .5s; }
    #mobile-menu.open { max-height: 440px; padding-top: 80px; padding-bottom: 36px; }
    #mobile-menu nav { display: flex; flex-direction: column; }
    #mobile-menu a { display: flex; align-items: center; justify-content: space-between; font-size: .65rem; letter-spacing: .22em; text-transform: uppercase; color: rgba(237,233,225,.6); padding: 16px 0; border-bottom: 1px solid rgba(237,233,225,.05); opacity: 0; transform: translateY(12px); transition: opacity .4s, transform .4s, color .3s, padding-left .3s; }
    #mobile-menu.open a { opacity: 1; transform: none; }
    #mobile-menu.open a:nth-child(1){transition-delay:.06s} #mobile-menu.open a:nth-child(2){transition-delay:.12s} #mobile-menu.open a:nth-child(3){transition-delay:.18s} #mobile-menu.open a:nth-child(4){transition-delay:.24s} #mobile-menu.open a:nth-child(5){transition-delay:.30s}
    #mobile-menu a:last-child { border-bottom: none; }
    #mobile-menu a:hover { color: var(--fg); padding-left: 6px; }
    #mobile-menu a::after { content: '→'; font-size: .7rem; color: transparent; transition: color .3s, transform .3s; }
    #mobile-menu a:hover::after { color: rgba(185,148,96,.6); transform: translateX(4px); }
    #mobile-menu a.curso-link { color: var(--gold); border: 1px solid rgba(185,148,96,.18); padding: 14px 18px; margin-top: 12px; border-bottom: 1px solid rgba(185,148,96,.18) !important; }
    #mobile-menu a.curso-link:hover { background: rgba(185,148,96,.06); padding-left: 22px; }
    #mobile-menu a.curso-link::after { content: '↗'; color: rgba(185,148,96,.5); }
  }

  /* ═══ FULLPAGE SCROLL ═══ */
  html, body { overflow: hidden; height: calc(var(--vh, 1vh) * 100); }
  #fp-wrap { transition: transform .88s cubic-bezier(.77,0,.175,1); will-change: transform; }
  .fp-sec { height: calc(var(--vh, 1vh) * 100); overflow: hidden; position: relative; }

  #fp-dots { position: fixed; right: 28px; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; gap: 10px; z-index: 300; }
  .fp-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(237,233,225,.22); cursor: pointer; transition: background .4s, height .4s, border-radius .4s; }
  .fp-dot.on { background: var(--gold); height: 20px; border-radius: 3px; }
  @media (max-width: 900px) { #fp-dots { right: 10px; } }

  .d1{transition-delay:.08s} .d2{transition-delay:.18s} .d3{transition-delay:.3s} .d4{transition-delay:.44s}

  .fp-sec .sec-in { opacity: 0; transform: translateY(28px); transition: opacity .7s .2s cubic-bezier(.25,.46,.45,.94), transform .7s .2s cubic-bezier(.25,.46,.45,.94); }
  .fp-sec.visible .sec-in { opacity: 1; transform: none; }
  .fp-sec.visible .sec-in.d1 { transition-delay: .28s; }
  .fp-sec.visible .sec-in.d2 { transition-delay: .40s; }
  .fp-sec.visible .sec-in.d3 { transition-delay: .54s; }
  .fp-sec.visible .sec-in.d4 { transition-delay: .70s; }

  /* ══ HERO ══ */
  #hero { background: #080807; }
  .hs { position: absolute; inset: 0; opacity: 0; transition: opacity 1.4s cubic-bezier(.4,0,.2,1); pointer-events: none; }
  .hs.on { opacity: 1; pointer-events: auto; }
  .hs video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  @media (max-width: 900px) { .hs video { object-position: center top; } }
  #hero-ov { position: absolute; inset: 0; z-index: 2; pointer-events: none; background: linear-gradient(180deg,rgba(11,11,10,.22) 0%,rgba(11,11,10,.02) 45%,rgba(11,11,10,.02) 72%,rgba(11,11,10,.35) 100%); }
  #hero-bars { position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 10; opacity: 0; animation: barfade 1s forwards 1.5s; }
  @keyframes barfade { to { opacity: 1; } }
  .hbar { height: 2px; width: 32px; overflow: hidden; background: rgba(237,233,225,.2); cursor: pointer; transition: width .4s; }
  .hbar.on { width: 52px; }
  .hbar-fill { height: 100%; width: 0; background: var(--gold); transition: none; }
  .hbar.on .hbar-fill { width: 100%; }

  /* ══ ABOUT ══ */
  #about { background: var(--bg2); display: flex; flex-direction: column; overflow: hidden; }

  .mc-banner {
    flex-shrink: 0;
    margin-top: 58px;
    background: linear-gradient(135deg, rgba(185,148,96,.18) 0%, rgba(185,148,96,.06) 50%, rgba(185,148,96,.13) 100%);
    border-top: 1px solid rgba(185,148,96,.38);
    border-bottom: 1px solid rgba(185,148,96,.38);
    border-right: 1px solid rgba(185,148,96,.38);
    border-left: 1px solid rgba(185,148,96,.38);
    position: relative; overflow: hidden;
    box-shadow: 0 2px 32px rgba(185,148,96,.10), inset 0 1px 0 rgba(185,148,96,.2);
  }
  .mc-banner::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 60% 140% at 0% 50%,rgba(185,148,96,.18) 0%,transparent 65%); pointer-events:none; }
  .mc-banner::after  { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 30% 120% at 100% 50%,rgba(185,148,96,.10) 0%,transparent 60%); pointer-events:none; }
  .mc-banner-inner { display:flex; align-items:center; justify-content:space-between; gap:32px; padding:32px 64px; position:relative; z-index:1; }
  .mc-banner-left { display:flex; align-items:center; gap:20px; min-width:0; }
  .mc-banner-tag { font-size:.8rem; letter-spacing:.26em; text-transform:uppercase; color:#080807; background:var(--gold); padding:10px 14px; flex-shrink:0; font-weight:600; box-shadow:0 2px 12px rgba(185,148,96,.35); }
  .mc-banner-div { width:1px; height:44px; background:rgba(185,148,96,.3); flex-shrink:0; }
  .mc-banner-title { font-family:'Playfair Display',serif; font-size:clamp(1.05rem,1.65vw,1.42rem); font-weight:400; color:var(--fg); margin-bottom:5px; line-height:1.2; }
  .mc-banner-title em { font-style:italic; color:var(--gold); }
  .mc-banner-sub { font-size:.58rem; letter-spacing:.1em; color:rgba(237,233,225,.62); display:flex; align-items:center; gap:0; flex-wrap:wrap; }
  .mc-banner-sub span { white-space:nowrap; }
  .mc-banner-sub span+span::before { content:'·'; margin:0 8px; color:rgba(185,148,96,.5); }
  .mc-banner-actions { display:flex; align-items:center; gap:10px; flex-shrink:0; }
  .mc-btn-p { display:inline-flex; align-items:center; gap:8px; padding:11px 26px; background:var(--gold); font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:#080807; font-weight:600; transition:background .3s,box-shadow .3s,transform .2s; white-space:nowrap; box-shadow:0 4px 18px rgba(185,148,96,.3); }
  .mc-btn-p:hover { background:#c9a470; box-shadow:0 8px 28px rgba(185,148,96,.42); transform:translateY(-1px); }
  .mc-btn-p svg { width:11px; flex-shrink:0; }
  .mc-btn-s { display:inline-flex; align-items:center; gap:8px; padding:11px 22px; border:1px solid rgba(185,148,96,.45); font-size:.58rem; letter-spacing:.18em; text-transform:uppercase; color:var(--gold); transition:background .3s,border-color .3s,transform .2s; white-space:nowrap; }
  .mc-btn-s:hover { background:rgba(185,148,96,.09); border-color:rgba(185,148,96,.7); transform:translateY(-1px); }
  .mc-btn-s svg { width:11px; flex-shrink:0; }

  .ab-row { display:flex; align-items:center; justify-content:center; flex:1; min-height:0; gap:0; }
  .ab-inner { display:flex; align-items:center; gap:52px; max-width:820px; width:100%; padding:0 52px; }
  .ab-m { display:flex; align-items:center; justify-content:center; padding:0; flex-shrink:0; }
  .ab-pw { position:relative; width:clamp(150px,16vw,220px); aspect-ratio:1/1; }
  .ab-pw::before { content:''; position:absolute; inset:-10px; border-radius:50%; border:1px solid rgba(185,148,96,.18); animation:rr 20s linear infinite; }
  .ab-pw::after  { content:''; position:absolute; inset:-20px; border-radius:50%; border:1px dashed rgba(185,148,96,.09); animation:rr 32s linear infinite reverse; }
  @keyframes rr { to { transform:rotate(360deg); } }
  .ab-pi { width:100%; height:100%; border-radius:50%; overflow:hidden; border:1px solid rgba(185,148,96,.28); box-shadow:0 0 0 1px rgba(185,148,96,.08),0 28px 72px rgba(0,0,0,.55); position:relative; z-index:1; }
  .ab-pi img { width:100%; height:100%; object-fit:cover; object-position:center top; filter:brightness(.86) contrast(1.03); transition:transform .9s cubic-bezier(.25,.46,.45,.94),filter .9s; }
  .ab-pw:hover .ab-pi img { transform:scale(1.05); filter:brightness(.96); }
  .ab-body { padding:0; display:flex; flex-direction:column; justify-content:center; flex:1; min-width:0; }

  .lbl { display:inline-flex; align-items:center; gap:12px; font-size:.6rem; letter-spacing:.26em; text-transform:uppercase; color:var(--gold); margin-bottom:20px; }
  .lbl::before { content:''; width:24px; height:1px; background:var(--gold); opacity:.5; flex-shrink:0; }
  .disp { font-family:'Playfair Display',serif; font-weight:400; line-height:1.1; letter-spacing:-.01em; color:var(--fg); }
  .disp em { font-style:italic; color:var(--gold); }
  .bt { font-size:.86rem; line-height:1.9; color:var(--muted); }
  .bt strong { color:var(--fg); font-weight:400; }
  .alnk { display:inline-flex; align-items:center; gap:10px; font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; color:var(--fg); border-bottom:1px solid var(--border); padding-bottom:4px; transition:gap .3s,color .3s,border-color .3s; }
  .alnk::after { content:'→'; transition:transform .3s; }
  .alnk:hover { gap:18px; color:var(--gold); border-color:rgba(185,148,96,.4); }
  .alnk:hover::after { transform:translateX(4px); }

  /* ══ WORK ══ */
  #work { background:var(--bg); display:flex; flex-direction:column; overflow:hidden; }
  .wk-hd { flex-shrink:0; display:flex; align-items:flex-end; justify-content:space-between; padding:52px 52px 18px; }
  .wk-hd .disp { font-size:clamp(1.5rem,2.4vw,2.4rem); }
  .rg { flex:1; min-height:0; display:flex; flex-direction:column; gap:6px; padding:0 8px 8px; overflow-y:auto; overflow-x:hidden; scrollbar-width:thin; scrollbar-color:rgba(185,148,96,.25) transparent; }
  .rg::-webkit-scrollbar { width:3px; }
  .rg::-webkit-scrollbar-thumb { background:rgba(185,148,96,.25); border-radius:2px; }
  .rg::-webkit-scrollbar-track { background:transparent; }
  .rr { display:flex; flex-direction:row; gap:6px; flex-shrink:0; }
  .ri { position:relative; overflow:hidden; background:var(--bg3); border:1px solid var(--border); flex-shrink:0; opacity:0; transform:translateY(26px) scale(0.975); transition:border-color .45s,opacity .65s cubic-bezier(.25,.46,.45,.94),transform .65s cubic-bezier(.25,.46,.45,.94); }
  .ri:hover { border-color:rgba(185,148,96,.38); }
  .ri img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; filter:brightness(.72); transition:transform .9s cubic-bezier(.25,.46,.45,.94), filter .9s; }
  .ri:hover img { transform:scale(1.07); filter:brightness(.96); }
  .ri-cap { position:absolute; inset:0; background:linear-gradient(to top,rgba(11,11,10,.92) 0%,rgba(11,11,10,.18) 50%,transparent 100%); display:flex; align-items:flex-end; padding:18px; opacity:0; transition:opacity .4s; }
  .ri:hover .ri-cap { opacity:1; }
  .ri-cap span { font-size:.5rem; letter-spacing:.2em; text-transform:uppercase; color:var(--fg); border:1px solid rgba(237,233,225,.22); padding:4px 13px; background:rgba(11,11,10,.45); backdrop-filter:blur(5px); }
  #work.visible .rg .ri { opacity:1; transform:none; }
  #work.visible .rr.ra .ri:nth-child(1) { transition-delay:.06s; }
  #work.visible .rr.ra .ri:nth-child(2) { transition-delay:.15s; }
  #work.visible .rr.rb .ri:nth-child(1) { transition-delay:.24s; }
  #work.visible .rr.rb .ri:nth-child(2) { transition-delay:.33s; }
  #work.visible .rr.rc .ri:nth-child(1) { transition-delay:.42s; }
  #work.visible .rr.rc .ri:nth-child(2) { transition-delay:.52s; }
  .rr.ra { height: 37vw; }
  .rr.rb { height: 37vw; }
  .rr.rc { height: 28vw; }
  .ri.r1 { flex: 2; }
  .ri.r2 { flex: 1; }
  .ri.r3 { flex: 1; }
  .ri.r4 { flex: 2; }
  .ri.r5 { flex: 1; }
  .ri.r6 { flex: 1; }

  /* ══ SERVICES ══ */
  #services { background:var(--bg2); display:flex; flex-direction:column; align-items:center; justify-content:center; padding-top: 58px; }
  .sv-card-img { position:absolute; inset:0; z-index:0; overflow:hidden; }
  .sv-card-img img { width:100%; height:100%; object-fit:cover; filter:brightness(.14); transition:filter .6s cubic-bezier(.25,.46,.45,.94), transform .6s cubic-bezier(.25,.46,.45,.94); }
  .sv-card:hover .sv-card-img img { filter:brightness(.26); transform:scale(1.06); }
  .sv-card > *:not(.sv-card-img) { position:relative; z-index:1; }

  /* ══ OVETA SECTION ══ */
  #oveta-link { background:var(--bg); display:flex; flex-direction:column; align-items:center; justify-content:center; position:relative; overflow:hidden; text-align:center; padding:0 52px; }
  #oveta-bg { position:absolute; inset:0; z-index:0; }
  #oveta-bg img { width:100%; height:100%; object-fit:cover; filter:brightness(.2); }
  #oveta-ov { position:absolute; inset:0; z-index:1; pointer-events:none; background:linear-gradient(to bottom, rgba(11,11,10,.55) 0%, rgba(11,11,10,.15) 50%, rgba(11,11,10,.65) 100%); }
  .oveta-inner { position:relative; z-index:2; max-width:700px; }
  .oveta-eyebrow { font-size:.58rem; letter-spacing:.26em; text-transform:uppercase; color:var(--gold); margin-bottom:24px; display:flex; align-items:center; justify-content:center; gap:14px; }
  .oveta-eyebrow::before,.oveta-eyebrow::after { content:''; width:24px; height:1px; background:var(--gold); opacity:.6; }
  .oveta-title { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,5.5vw,6rem); font-weight:400; line-height:.95; letter-spacing:-.02em; color:var(--fg); margin-bottom:22px; }
  .oveta-title em { font-style:italic; color:var(--gold); }
  .oveta-sub { font-size:.88rem; line-height:1.85; color:rgba(237,233,225,.55); max-width:500px; margin:0 auto 48px; }
  .oveta-cta { display:inline-flex; align-items:center; gap:14px; padding:16px 40px; border:1px solid rgba(185,148,96,.4); color:var(--gold); font-size:.62rem; letter-spacing:.2em; text-transform:uppercase; transition:all .4s; }
  .oveta-cta:hover { background:rgba(185,148,96,.09); border-color:var(--gold); gap:22px; }
  .oveta-cta::after { content:'↗'; transition:transform .3s; }
  .oveta-cta:hover::after { transform:translate(3px,-3px); }
  .oveta-divider { width:1px; height:44px; background:linear-gradient(to bottom,transparent,rgba(185,148,96,.4),transparent); margin:0 auto 44px; }
  @media (max-width:900px) {
    #oveta-link { padding:0 20px; }
    .oveta-title { font-size:clamp(1.9rem,9vw,3.2rem); }
    .oveta-sub { font-size:.78rem; }
  }
  .sv-hd { flex-shrink:0; width:100%; max-width:1080px; padding:44px 48px 26px; display:flex; align-items:flex-end; justify-content:space-between; gap:32px; }
  .sv-hd .disp { font-size:clamp(2rem,3.2vw,3rem); }
  .sv-hd-sub { font-size:.72rem; letter-spacing:.1em; color:var(--muted); max-width:240px; text-align:right; line-height:1.7; }
  .sv-grid { display:grid; grid-template-columns:repeat(4,1fr); width:100%; max-width:1080px; border-top:1px solid var(--border); }
  .sv-card { padding:32px 28px 28px; border-right:1px solid var(--border); border-bottom:1px solid var(--border); position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; transition:background .4s; }
  .sv-card:last-child { border-right:none; }
  .sv-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.25,.46,.45,.94); }
  .sv-card:hover { background:rgba(237,233,225,.02); }
  .sv-card:hover::before { transform:scaleX(1); }
  .sv-n { font-family:'Playfair Display',serif; font-size:3rem; font-weight:400; color:rgba(237,233,225,.04); line-height:1; margin-bottom:16px; display:block; }
  .sv-title { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:400; line-height:1.25; color:var(--fg); margin-bottom:12px; }
  .sv-title em { font-style:italic; color:var(--gold); }
  .sv-desc { font-size:.78rem; line-height:1.72; color:var(--muted); margin-bottom:14px; }
  .sv-tags { display:flex; flex-wrap:wrap; gap:5px; }
  .sv-tag { font-size:.48rem; letter-spacing:.14em; text-transform:uppercase; color:rgba(185,148,96,.72); border:1px solid rgba(185,148,96,.18); padding:3px 9px; }

  /* ══ TUTORIALS ══ */
  #tutorials { background:var(--bg); display:flex; flex-direction:column; overflow:hidden; align-items:center; justify-content:center; padding-top: 58px; }
  .tut-hd { flex-shrink:0; width:100%; max-width:1080px; padding:44px 48px 26px; display:flex; align-items:flex-end; justify-content:space-between; gap:32px; }
  .tut-hd-l { display:flex; align-items:baseline; gap:20px; }
  .tut-hd-l .disp { font-size:clamp(1.8rem,2.8vw,2.6rem); }
  .tut-hd-l .lbl { margin-bottom:0; }
  .tut-hd-r { display:flex; align-items:center; gap:12px; flex-shrink:0; }
  .tut-desc-text { font-size:.72rem; color:var(--muted); line-height:1.5; max-width:200px; text-align:right; }
  .yt-pill { display:inline-flex; align-items:center; gap:8px; font-size:.54rem; letter-spacing:.15em; text-transform:uppercase; color:var(--fg); background:rgba(255,64,64,.07); border:1px solid rgba(255,64,64,.18); padding:9px 20px; transition:background .3s, border-color .3s; flex-shrink:0; }
  .yt-pill:hover { background:rgba(255,64,64,.13); border-color:rgba(255,64,64,.3); }
  .yt-pill svg { flex-shrink:0; }
  .tut-grid { display:grid; grid-template-columns:repeat(3,1fr); width:100%; max-width:1080px; border-top:1px solid var(--border); }
  .tut-card { position:relative; overflow:hidden; display:flex; flex-direction:column; border-right:1px solid var(--border); transition:background .4s; text-decoration:none; }
  .tut-card:last-child { border-right:none; }
  .tut-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--gold),transparent); transform:scaleX(0); transition:transform .6s cubic-bezier(.25,.46,.45,.94); z-index:2; }
  .tut-card:hover::before { transform:scaleX(1); }
  .tut-card:hover { background:rgba(237,233,225,.015); }
  .tut-thumb { position:relative; overflow:hidden; flex: 0 0 auto; aspect-ratio: 16/9; background:var(--bg3); }
  .tut-thumb img { width:100%; height:100%; object-fit:cover; filter:brightness(.58) saturate(.82); transition:transform .7s cubic-bezier(.25,.46,.45,.94), filter .7s; display:block; }
  .tut-card:hover .tut-thumb img { transform:scale(1.07); filter:brightness(.9) saturate(1.05); }
  .tut-thumb-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(11,11,10,.8) 0%,transparent 55%); pointer-events:none; }
  .tut-play { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
  .tut-pbtn { width:46px; height:46px; border-radius:50%; border:1px solid rgba(237,233,225,.24); background:rgba(8,8,7,.52); backdrop-filter:blur(6px); display:flex; align-items:center; justify-content:center; transition:background .3s, border-color .3s, transform .3s; }
  .tut-card:hover .tut-pbtn { background:var(--gold); border-color:var(--gold); transform:scale(1.08); }
  .tut-pbtn svg { width:13px; margin-left:2px; fill:var(--fg); }
  .tut-num { position:absolute; bottom:10px; left:16px; z-index:2; font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:400; line-height:1; color:rgba(237,233,225,.08); pointer-events:none; user-select:none; }
  .tut-body { flex:1; min-height:0; padding:20px 26px 22px; display:flex; flex-direction:column; justify-content:space-between; border-top:1px solid var(--border); }
  .tut-meta { font-size:.52rem; letter-spacing:.2em; text-transform:uppercase; color:var(--gold); margin-bottom:8px; display:flex; align-items:center; gap:7px; }
  .tut-meta::before { content:''; width:12px; height:1px; background:var(--gold); opacity:.5; flex-shrink:0; }
  .tut-title { font-family:'Playfair Display',serif; font-size:1.08rem; font-weight:400; color:var(--fg); line-height:1.22; margin-bottom:8px; }
  .tut-text { font-size:.76rem; line-height:1.7; color:var(--muted); }
  .tut-arrow { display:inline-flex; align-items:center; gap:7px; font-size:.5rem; letter-spacing:.18em; text-transform:uppercase; color:var(--muted); margin-top:12px; transition:color .3s, gap .3s; }
  .tut-arrow::after { content:'→'; transition:transform .3s; }
  .tut-card:hover .tut-arrow { color:var(--gold); gap:13px; }
  .tut-card:hover .tut-arrow::after { transform:translateX(3px); }
  .tut-soon { border-right:none; background:var(--bg2); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; cursor:default; border-left:1px solid var(--border); }
  .tut-soon-icon { width:44px; height:44px; border:1px solid var(--border); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:var(--muted); }
  .tut-soon-lbl { font-size:.5rem; letter-spacing:.22em; text-transform:uppercase; color:var(--muted); }
  .tut-soon-sub { font-size:.54rem; letter-spacing:.08em; color:rgba(237,233,225,.12); }

  /* CREDENCIALES */
  #creds { flex-shrink:0; border-top:1px solid var(--border); padding:13px 52px; background:var(--bg); display:flex; align-items:center; gap:32px; }
  .creds-lbl { font-size:.54rem; letter-spacing:.24em; text-transform:uppercase; color:var(--gold); white-space:nowrap; }
  .creds-list { display:flex; flex-wrap:wrap; gap:6px; }
  .cred { display:flex; align-items:center; gap:8px; font-size:.57rem; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); border:1px solid var(--border); padding:5px 13px; }
  .cred::before { content:''; width:4px; height:4px; border-radius:50%; background:var(--gold); flex-shrink:0; }

  /* ══ CONTACT ══ */
  #contact { background:var(--bg2); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 52px; position:relative; overflow:hidden; }
  #contact::before { content:''; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:700px; height:700px; background:radial-gradient(circle,rgba(185,148,96,.055) 0%,transparent 65%); pointer-events:none; }
  #contact .lbl { justify-content:center; }
  #contact .lbl::before { display:none; }
  .ct-h { font-size:clamp(3rem,7vw,7.5rem); letter-spacing:-.025em; margin-bottom:48px; }
  .ct-links { display:flex; justify-content:center; flex-wrap:wrap; gap:8px; margin-bottom:40px; }
  .ct-btn { display:inline-flex; align-items:center; gap:10px; padding:13px 30px; border:1px solid var(--border); font-size:.65rem; letter-spacing:.16em; text-transform:uppercase; color:var(--muted); transition:border-color .3s,color .3s,background .3s; }
  .ct-btn:hover { border-color:rgba(237,233,225,.35); color:var(--fg); }
  .ct-btn svg { width:13px; height:13px; fill:currentColor; flex-shrink:0; }
  #footer-line { font-size:.62rem; letter-spacing:.08em; color:rgba(237,233,225,.2); }

  /* ══ MOBILE ══ */
  @media (max-width: 900px) {
    * { -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent; }
    img { -webkit-user-drag: none; user-select: none; }
    .mc-banner { margin-top: 58px; }
    .mc-banner-inner { padding: 14px 18px; flex-direction: column; align-items: flex-start; gap: 12px; }
    .mc-banner-left { flex-direction: column; align-items: flex-start; gap: 8px; min-width: 0; width: 100%; }
    .mc-banner-div { display: none; }
    .mc-banner-tag { font-size: .44rem; padding: 4px 10px; }
    .mc-banner-title { font-size: .95rem; margin-bottom: 2px; white-space: normal; }
    .mc-banner-sub { display: flex; font-size: .52rem; gap: 0; flex-wrap: wrap; }
    .mc-banner-actions { flex-direction: row; gap: 8px; width: 100%; }
    .mc-btn-p { padding: 9px 18px; font-size: .5rem; flex: 1; justify-content: center; }
    .mc-btn-p svg { display: none; }
    .mc-btn-s { padding: 9px 14px; font-size: .5rem; flex: 1; justify-content: center; }
    .mc-btn-s svg { display: none; }
    .ab-row { flex: 1; min-height: 0; display:flex; align-items:center; justify-content:center; }
    .ab-inner { flex-direction: column; align-items: center; gap: 14px; padding: 16px 24px; text-align: center; }
    .ab-m { padding: 0; justify-content: center; }
    .ab-pw { width: clamp(80px, 22vw, 110px); }
    .ab-pw::before, .ab-pw::after { display: none; }
    .ab-body { padding: 0; justify-content: center; align-items: center; }
    .lbl { font-size: .52rem; margin-bottom: 8px; justify-content:center; }
    .lbl::before { display: none; }
    .bt { font-size: .74rem; line-height: 1.6; text-align:center; }
    #about .bt + .bt { display: none; }
    .alnk { font-size: .6rem; margin-top: 12px; }
    .wk-hd { padding: 68px 16px 8px; }
    .wk-hd .disp { font-size: 1.3rem; }
    .rg { display: flex !important; flex-direction: column !important; gap: 4px; padding: 0 4px 4px; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain; touch-action: pan-y; scrollbar-width: none; }
    .rg::-webkit-scrollbar { display: none; }
    .rr { flex-direction: column !important; height: auto !important; gap: 4px; }
    .ri, .ri.r1,.ri.r2,.ri.r3,.ri.r4,.ri.r5,.ri.r6 { width: 100% !important; flex: none !important; height: 0 !important; padding-bottom: 56.25% !important; opacity: 1 !important; transform: none !important; transition: border-color .4s !important; }
    .ri img { pointer-events: none; }
    .ri-cap { display: flex; opacity: 1; background: linear-gradient(to top, rgba(11,11,10,.85) 0%, transparent 50%); }
    .ri-cap span { font-size: .46rem; }
    #services { display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 0; }
    .sv-hd { padding: 16px 18px 10px; flex-direction: column; align-items: flex-start; gap: 6px; }
    .sv-hd .disp { font-size: 1.2rem; }
    .sv-hd-sub { display: none; }
    .sv-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; border-top: none; }
    .sv-card { padding: 14px 14px; border-bottom: 1px solid var(--border); }
    .sv-card:last-child { border-right: none; }
    .sv-n { font-size: 2rem; top: 4px; right: 8px; }
    .sv-title { font-size: .82rem; margin-bottom: 4px; }
    .sv-desc { font-size: .6rem; line-height: 1.45; margin-bottom: 7px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
    .sv-tag { font-size: .42rem; padding: 2px 6px; }
    #tutorials { display: flex; padding-top: 0; }
    .tut-hd { flex-direction: column; align-items: flex-start; gap: 10px; padding: 16px 16px 12px; }
    .tut-hd-l { flex-direction: column; gap: 4px; }
    .tut-hd-l .disp { font-size: 1.2rem; }
    .tut-hd-r { flex-direction: row; gap: 8px; }
    .tut-desc-text { display: none; }
    .tut-grid { grid-template-columns: 1fr 1fr; max-height: none; }
    .tut-card:nth-child(2) { border-right: none; }
    .tut-card:last-child { grid-column: 1 / -1; border-right: none; border-top: 1px solid var(--border); }
    .tut-thumb { flex: 0 0 auto; aspect-ratio: 16/9; height: auto; }
    .tut-body { padding: 8px 10px 10px; }
    .tut-title { font-size: .78rem; margin-bottom: 3px; }
    .tut-text { display: none; }
    .tut-arrow { font-size: .44rem; margin-top: 6px; }
    .tut-soon { min-height: 60px; flex-direction: row; gap: 8px; border-left: none; }
    .tut-soon-icon { width: 28px; height: 28px; font-size: .8rem; flex-shrink: 0; }
    #creds { flex-direction: row; flex-wrap: wrap; gap: 5px; padding: 8px 12px; justify-content: center; }
    .creds-lbl { font-size: .44rem; }
    .cred { font-size: .44rem; padding: 3px 8px; }
    #contact { padding: 0 18px; }
    .ct-h { font-size: clamp(1.9rem, 9vw, 3.5rem); margin-bottom: 20px; }
    .ct-links { margin-bottom: 16px; gap: 6px; }
    .ct-btn { padding: 10px 14px; font-size: .56rem; gap: 6px; }
    #footer-line { font-size: .54rem; }
  }
`

export default function HomeClient() {
  useEffect(() => {
    // ── iOS SAFARI VH FIX
    function setVh() {
      var vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', vh + 'px')
    }
    setVh()
    window.addEventListener('orientationchange', function() { setTimeout(setVh, 300) })

    var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    window.matchMedia('(hover: hover) and (pointer: fine)').addEventListener('change', function() {
      location.reload() })
      
    // ── MOBILE VIDEO SWAP
    if (!hasMouse) {
      // Poster mobile
      var v0 = document.getElementById('hero-vid-0')
      if (v0) {
      var mp = v0.getAttribute('data-mobile-poster')
      if (mp) v0.setAttribute('poster', mp)
      }
      var heroVid0 = document.getElementById('hero-vid-0')
      if (heroVid0) { var mSrc0 = heroVid0.querySelector('source'); if (mSrc0) { mSrc0.src = '/assets/hero-mobile.mp4'; heroVid0.load(); heroVid0.play().catch(function(){}) } }
      var heroVid1 = document.getElementById('hero-vid-1')
      if (heroVid1) { var mSrc1 = heroVid1.querySelector('source'); if (mSrc1) { mSrc1.src = '/assets/Hero-2-mobile.mp4'; heroVid1.load() } }
      var heroVid2 = document.getElementById('hero-vid-2')
      if (heroVid2) { var mSrc2 = heroVid2.querySelector('source'); if (mSrc2) { mSrc2.src = '/assets/Hero-3-mobile.mp4'; heroVid2.load() } }
    }

    // ── CURSOR
    if (hasMouse) {
      var dot = document.getElementById('c-dot'), ring = document.getElementById('c-ring')
      var mx=0,my=0,rx=0,ry=0
      document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';},{passive:true})
      ;(function tick(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick)})()
      document.querySelectorAll('a,button,[role="button"]').forEach(function(el){
        el.addEventListener('mouseenter',function(){document.body.classList.add('ch')})
        el.addEventListener('mouseleave',function(){document.body.classList.remove('ch')})
      })
    }

    // ── NAV STICKY (always stuck)
    document.getElementById('nav').classList.add('stuck')

    // ── MOBILE MENU
    var menuBtn=document.getElementById('menu-btn'), mobileMenu=document.getElementById('mobile-menu')
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click',function(){
        var isOpen=mobileMenu.classList.toggle('open')
        menuBtn.classList.toggle('open',isOpen)
        menuBtn.setAttribute('aria-expanded',isOpen)
      })
    }

    // ── FULLPAGE SCROLL
    var fpWrap = document.getElementById('fp-wrap')
    var fpSecs = [].slice.call(document.querySelectorAll('.fp-sec'))
    var fpDots = [].slice.call(document.querySelectorAll('.fp-dot'))
    var cur = 0, busy = false
    var wheelAcc = 0, edgeCount = 0, lastEdgeDir = 0
    var EDGE_COUNT_NEEDED = 3

    function goSec(n, rgPos) {
      if (busy) return
      n = Math.max(0, Math.min(fpSecs.length - 1, n))
      if (n === cur) return
      busy = true
      fpSecs[cur].classList.remove('visible')
      cur = n
      fpWrap.style.transform = 'translateY(-' + (cur * 100) + 'vh)'
      fpWrap.style.transform = 'translateY(calc(' + cur + ' * calc(var(--vh, 1vh) * -100)))'
      fpDots.forEach(function(d,i){ d.classList.toggle('on', i===cur) })
      setTimeout(function(){
        fpSecs[cur].classList.add('visible')
        var rg = fpSecs[cur].querySelector('.rg')
        if (rg) { rg.scrollTop = rgPos === 'bottom' ? rg.scrollHeight : 0 }
        busy = false
        wheelAcc = 0; edgeCount = 0; lastEdgeDir = 0
      }, 900)
    }

    fpSecs[0].classList.add('visible')

    // wheel
    window.addEventListener('wheel', function(e) {
      e.preventDefault()
      var rg = document.querySelector('.rg')
      if (rg && fpSecs[cur].id === 'work') {
        var scrollable = rg.scrollHeight > rg.clientHeight + 2
        var atTop = rg.scrollTop <= 2
        var atBottom = rg.scrollTop >= rg.scrollHeight - rg.clientHeight - 2
        var goingDown = e.deltaY > 0
        var goingUp = e.deltaY < 0
        if (!scrollable) {
          wheelAcc += e.deltaY
          if (Math.abs(wheelAcc) >= 60) { var dir = wheelAcc > 0 ? 1 : -1; wheelAcc = 0; goSec(cur+dir, dir>0?'top':'bottom') }
          return
        }
        if (goingDown && !atBottom) { rg.scrollTop += e.deltaY; edgeCount=0; lastEdgeDir=0; return }
        if (goingUp && !atTop) { rg.scrollTop += e.deltaY; edgeCount=0; lastEdgeDir=0; return }
        var curDir = goingDown ? 1 : -1
        if (curDir !== lastEdgeDir) { edgeCount=0; lastEdgeDir=curDir }
        edgeCount++
        if (edgeCount >= EDGE_COUNT_NEEDED) { edgeCount=0; lastEdgeDir=0; wheelAcc=0; goSec(cur+curDir, curDir>0?'top':'bottom') }
        return
      }
      edgeCount=0
      wheelAcc += e.deltaY
      if (Math.abs(wheelAcc) < 60 && e.deltaMode === 0) return
      var dir2 = wheelAcc > 0 ? 1 : -1; wheelAcc=0
      var workIdx = fpSecs.findIndex(function(s){ return s.id==='work' })
      var rgPos2 = (cur+dir2===workIdx) ? (dir2>0?'top':'bottom') : null
      goSec(cur+dir2, rgPos2)
    }, { passive: false })

    // keyboard
    document.addEventListener('keydown',function(e){
      if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return
      if(e.key==='ArrowDown'||e.key==='PageDown'){e.preventDefault();goSec(cur+1)}
      if(e.key==='ArrowUp'||e.key==='PageUp'){e.preventDefault();goSec(cur-1)}
    })

    // dots
    fpDots.forEach(function(d){ d.addEventListener('click',function(){ goSec(parseInt(d.getAttribute('data-i'))) }) })

    // touch swipe
    var ty=0, txStart=0, tMoving=false
    document.addEventListener('touchstart',function(e){ ty=e.touches[0].clientY; txStart=e.touches[0].clientX; tMoving=false },{passive:true})
    document.addEventListener('touchmove',function(){ tMoving=true },{passive:true})
    document.addEventListener('touchend',function(e){
      if(!tMoving) return
      var rg=document.querySelector('.rg')
      if(rg && fpSecs[cur].id==='work'){
        var atBottom=(rg.scrollTop+rg.clientHeight>=rg.scrollHeight-20)
        var atTop=(rg.scrollTop<=4)
        var dY=ty-e.changedTouches[0].clientY
        if(dY>0&&!atBottom) return
        if(dY<0&&!atTop) return
      }
      var diffY=ty-e.changedTouches[0].clientY
      var diffX=txStart-e.changedTouches[0].clientX
      if(Math.abs(diffX)>Math.abs(diffY)*1.2) return
      if(Math.abs(diffY)<48) return
      var swipeDir=diffY>0?1:-1
      var workIdx2=fpSecs.findIndex(function(s){return s.id==='work'})
      var rgPos3=(cur+swipeDir===workIdx2)?(swipeDir>0?'top':'bottom'):null
      goSec(cur+swipeDir, rgPos3)
    },{passive:true})

    // anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var id=a.getAttribute('href').slice(1)
        var idx=fpSecs.findIndex(function(s){return s.id===id})
        if(idx>=0){e.preventDefault();goSec(idx)}
      })
    })

    // mobile menu anchor links — close menu on click
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click',function(){
          mobileMenu.classList.remove('open')
          menuBtn.classList.remove('open')
          menuBtn.setAttribute('aria-expanded','false')
        })
      })
    }

    // ── VIDEO CAROUSEL
    var slides=[].slice.call(document.querySelectorAll('.hs'))
    var bars=[].slice.call(document.querySelectorAll('.hbar'))
    var vidCur=0, vidTimer=null, INTERVAL=8000

    function startFill(i){
      bars.forEach(function(b){var f=b.querySelector('.hbar-fill');f.style.transition='none';f.style.width='0%'})
      requestAnimationFrame(function(){requestAnimationFrame(function(){
        var f=bars[i].querySelector('.hbar-fill')
        f.style.transition='width '+INTERVAL+'ms linear';f.style.width='100%'
      })})
    }
    function goVid(n){
      var total=slides.length,next=((n%total)+total)%total
      if(next===vidCur) return
      slides[vidCur].classList.remove('on');bars[vidCur].classList.remove('on')
      var oldV=slides[vidCur].querySelector('video')
      if(oldV){oldV.pause();(function(v){setTimeout(function(){v.currentTime=0},1500)})(oldV)}
      vidCur=next
      slides[vidCur].classList.add('on');bars[vidCur].classList.add('on')
      var newV=slides[vidCur].querySelector('video');if(newV) newV.play().catch(function(){})
      startFill(vidCur);clearInterval(vidTimer)
      vidTimer=setInterval(function(){goVid(vidCur+1)},INTERVAL)
    }
    startFill(0)
    vidTimer=setInterval(function(){goVid(vidCur+1)},INTERVAL)
    bars.forEach(function(b,i){b.addEventListener('click',function(){goVid(i)})})
    var hx=0, heroEl=document.getElementById('hero')
    if(heroEl){
      heroEl.addEventListener('touchstart',function(e){hx=e.touches[0].clientX},{passive:true})
      heroEl.addEventListener('touchend',function(e){var diff=hx-e.changedTouches[0].clientX;if(Math.abs(diff)>50) goVid(vidCur+(diff>0?1:-1))},{passive:true})
    }

    return () => { clearInterval(vidTimer) }
  }, [])

  return (
    <>
      <style>{css}</style>

      <div id="grain" aria-hidden="true"></div>
      <div id="c-dot" aria-hidden="true"></div>
      <div id="c-ring" aria-hidden="true"></div>

      {/* DOTS NAV */}
      <nav id="fp-dots" aria-label="Ir a sección">
        <div className="fp-dot on" data-i="0" title="Hero"></div>
        <div className="fp-dot"    data-i="1" title="Sobre mí"></div>
        <div className="fp-dot"    data-i="2" title="Portafolio"></div>
        <div className="fp-dot"    data-i="3" title="Servicios"></div>
        <div className="fp-dot"    data-i="4" title="OVETA"></div>
        <div className="fp-dot"    data-i="5" title="Tutoriales"></div>
        <div className="fp-dot"    data-i="6" title="Contacto"></div>
      </nav>

      {/* NAV */}
      <nav id="nav">
        <ul className="nav-links">
          <li><a href="#about">Sobre mí</a></li>
          <li><a href="#work">Trabajos</a></li>
          <li><a href="/curso-d5render" className="curso-link">Curso D5 Render</a></li>
        </ul>
        <a href="#hero" className="nav-logo">Pedro Sardi</a>
        <ul className="nav-links r">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <button id="menu-btn" aria-label="Abrir menú" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div id="mobile-menu" role="dialog" aria-label="Navegación">
        <nav>
          <a href="#about">Sobre mí</a>
          <a href="#work">Trabajos</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
          <a href="/curso-d5render" className="curso-link">Curso D5 Render</a>
        </nav>
      </div>

      {/* FULLPAGE WRAPPER */}
      <div id="fp-wrap">

        {/* 0: HERO */}
        <section className="fp-sec visible" id="hero">
          <div className="hs on" data-i="0">
            <video id="hero-vid-0" autoPlay muted loop playsInline preload="metadata" poster="/assets/hero-poster.webp" data-mobile-poster="/assets/hero-mobile-poster.webp">
              <source src="/assets/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hs" data-i="1">
            <video id="hero-vid-1" muted loop playsInline preload="none">
              <source src="/assets/Hero-2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="hs" data-i="2">
            <video id="hero-vid-2" muted loop playsInline preload="none">
              <source src="/assets/Hero-3.mp4" type="video/mp4" />
            </video>
          </div>
          <div id="hero-bars" aria-label="Seleccionar video">
            <div className="hbar on" data-i="0"><div className="hbar-fill"></div></div>
            <div className="hbar"    data-i="1"><div className="hbar-fill"></div></div>
            <div className="hbar"    data-i="2"><div className="hbar-fill"></div></div>
          </div>
          <div id="hero-ov" aria-hidden="true"></div>
          <div id="hero-line" aria-hidden="true"></div>
        </section>

        {/* 1: ABOUT */}
        <section className="fp-sec" id="about">
          <div className="mc-banner sec-in">
            <div className="mc-banner-inner">
              <div className="mc-banner-left">
                <span className="mc-banner-tag">Nuevo</span>
                <div className="mc-banner-div"></div>
                <div>
                  <p className="mc-banner-title">Masterclass <em>D5 Render</em> disponible</p>
                  <p className="mc-banner-sub">
                    <span>+6 horas de contenido</span>
                    <span>En español</span>
                    <span>Tutor verificado</span>
                    <span>Imutes</span>
                  </p>
                </div>
              </div>
              <div className="mc-banner-actions">
                <a href="http://www.imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup"
                   target="_blank" rel="noopener" className="mc-btn-p">
                  Adquirir
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </a>
                <a href="/curso-d5render" className="mc-btn-s">
                  Ver más
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="ab-row">
            <div className="ab-inner">
              <div className="ab-m sec-in a-l">
                <div className="ab-pw">
                  <div className="ab-pi">
                    <img src="/assets/about.webp" alt="Pedro Sardi" loading="lazy" onError={(e)=>{e.currentTarget.style.display='none'}} />
                  </div>
                </div>
              </div>
              <div className="ab-body">
                <p className="lbl sec-in d1">Sobre mí</p>
                <p className="bt sec-in d2" style={{marginBottom:'14px'}}>Soy <strong>Pedro Sardi</strong>, visualizador arquitectónico y <strong>tutor verificado de D5 Render</strong> con base en Paraguay. Trabajo con estudios y arquitectos para transformar planos en imágenes fotorrealistas que comunican el espacio antes de que exista.</p>
                <p className="bt sec-in d3" style={{marginBottom:'28px'}}>Cada proyecto es una colaboración entre técnica y narrativa visual. No entrego renders — entrego el primer encuentro de tu cliente con su futuro espacio.</p>
                <a href="#contact" className="alnk sec-in d4">Trabajemos juntos</a>
              </div>
            </div>
          </div>
        </section>

        {/* 2: WORK */}
        <section className="fp-sec" id="work">
          <div className="wk-hd">
            <div className="sec-in">
              <p className="lbl">Portafolio</p>
              <h2 className="disp">Renders <em>recientes.</em></h2>
            </div>
          </div>
          <div className="rg">
            <div className="rr ra">
              <div className="ri r1"><img src="/assets/renders/render-1.webp" alt="Interior residencial" loading="lazy" draggable="false" /><div className="ri-cap"><span>Residencial · Interior</span></div></div>
              <div className="ri r2"><img src="/assets/renders/render-2.webp" alt="Interior living" loading="lazy" draggable="false" /><div className="ri-cap"><span>Residencial · Exterior</span></div></div>
            </div>
            <div className="rr rb">
              <div className="ri r3"><img src="/assets/renders/render-3.webp" alt="Interior dormitorio" loading="lazy" draggable="false" /><div className="ri-cap"><span>Oficina</span></div></div>
              <div className="ri r4"><img src="/assets/renders/render-4.webp" alt="Exterior comercial" loading="lazy" draggable="false" /><div className="ri-cap"><span>Residencial · Exterior</span></div></div>
            </div>
            <div className="rr rc">
              <div className="ri r5"><img src="/assets/renders/render-5.webp" alt="Interior cocina" loading="lazy" draggable="false" /><div className="ri-cap"><span>Residencial · Exterior</span></div></div>
              <div className="ri r6"><img src="/assets/renders/render-6.webp" alt="Exterior nocturno" loading="lazy" draggable="false" /><div className="ri-cap"><span>Residencial · Interior</span></div></div>
            </div>
          </div>
        </section>

        {/* 3: SERVICES */}
        <section className="fp-sec" id="services">
          <div className="sv-hd">
            <p className="lbl sec-in">Servicios</p>
            <h2 className="disp sec-in d1">Lo que <em>ofrezco.</em></h2>
          </div>
          <div className="sv-grid">
            <div className="sv-card sec-in d1"><div className="sv-card-img"><img src="/assets/renders/render-1.webp" alt="" aria-hidden="true" /></div><span className="sv-n" aria-hidden="true">01</span><div><h3 className="sv-title">Renders<br /><em>Arquitectónicos</em></h3><p className="sv-desc">Imágenes fotorrealistas de proyectos residenciales, comerciales y de hospitalidad. Desde el archivo SKP hasta la imagen final lista para presentar a inversores y clientes.</p></div><div className="sv-tags"><span className="sv-tag">D5 Render</span><span className="sv-tag">SketchUp</span><span className="sv-tag">Exterior</span><span className="sv-tag">Interior</span></div></div>
            <div className="sv-card sec-in d2"><div className="sv-card-img"><img src="/assets/renders/render-4.webp" alt="" aria-hidden="true" /></div><span className="sv-n" aria-hidden="true">02</span><div><h3 className="sv-title">Tutorías<br /><em>D5 Render</em></h3><p className="sv-desc">Clases personalizadas 1 a 1 para arquitectos y diseñadores. Tutor verificado. En español, adaptadas a tu proyecto real.</p></div><div className="sv-tags"><span className="sv-tag">1 a 1</span><span className="sv-tag">Online</span><span className="sv-tag">Verificado</span><span className="sv-tag">Español</span></div></div>
            <div className="sv-card sec-in d3"><div className="sv-card-img"><img src="/assets/renders/render-2.webp" alt="" aria-hidden="true" /></div><span className="sv-n" aria-hidden="true">03</span><div><h3 className="sv-title">Masterclass<br /><em>Completa</em></h3><p className="sv-desc">Curso completo de D5 Render en formato grabado. Más de 18 horas de contenido estructurado. Disponible en IMUTES con dos años de acceso.</p></div><div className="sv-tags"><span className="sv-tag">18+ horas</span><span className="sv-tag">IMUTES</span></div></div>
            <div className="sv-card sec-in d4"><div className="sv-card-img"><img src="/assets/renders/render-6.webp" alt="" aria-hidden="true" /></div><span className="sv-n" aria-hidden="true">04</span><div><h3 className="sv-title">Tutoriales<br /><em>YouTube</em></h3><p className="sv-desc">Tips cortos y concretos sobre D5 Render. Sin relleno, directo al flujo de trabajo real. Canal @pedrosardi.studio.</p></div><div className="sv-tags"><span className="sv-tag">Gratis</span><span className="sv-tag">Español</span><span className="sv-tag">@pedrosardi.studio</span></div></div>
          </div>
        </section>

        {/* 4: OVETA */}
        <section className="fp-sec" id="oveta-link">
          <div id="oveta-bg"><img src="/assets/renders/render-5.webp" alt="" aria-hidden="true" /></div>
          <div id="oveta-ov" aria-hidden="true"></div>
          <div className="oveta-inner">
            <p className="oveta-eyebrow sec-in">De la visualización a la construcción</p>
            <div className="oveta-divider sec-in d1"></div>
            <h2 className="oveta-title sec-in d2">
              ¿Tu proyecto necesita<br />más que <em>renders?</em>
            </h2>
            <p className="oveta-sub sec-in d3">
              OVETA se encarga de todo — desde la imagen digital hasta la obra terminada. Renders fotorrealistas, dirección de proyectos y construcción en Paraguay.
            </p>
            <a href="https://oveta.studio" target="_blank" rel="noopener" className="oveta-cta sec-in d4">
              Conocer OVETA
            </a>
          </div>
        </section>

        {/* 5: TUTORIALS */}
        <section className="fp-sec" id="tutorials">
          <div className="tut-hd">
            <div className="tut-hd-l sec-in">
              <p className="lbl">Canal YouTube</p>
              <h2 className="disp">Tutoriales <em>recientes.</em></h2>
            </div>
            <div className="tut-hd-r sec-in d2">
              <p className="tut-desc-text">Tips semanales de D5 Render en español. Directo al grano, sin relleno.</p>
              <a href="https://www.youtube.com/@pedrosardi.studio" target="_blank" rel="noopener" className="yt-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path fill="#ff4040" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z"/><polygon fill="#fff" points="9.6,15.6 15.8,12 9.6,8.4"/></svg>
                @pedrosardi.studio
              </a>
            </div>
          </div>
          <div className="tut-grid">
            <a className="tut-card sec-in d1" href="https://www.youtube.com/shorts/McpoEDsRD-4" target="_blank" rel="noopener">
              <div className="tut-thumb">
                <img src="/assets/thumb-1.webp" alt="Proyección de video D5 Render" loading="lazy" />
                <div className="tut-thumb-ov"></div>
                <div className="tut-play"><div className="tut-pbtn"><svg viewBox="0 0 16 16"><polygon points="3,2 14,8 3,14"/></svg></div></div>
                <span className="tut-num" aria-hidden="true">01</span>
              </div>
              <div className="tut-body">
                <div>
                  <p className="tut-meta">D5 Render · Iluminación</p>
                  <h3 className="tut-title">Proyección de Video</h3>
                  <p className="tut-text">Efecto de proyector de luz, dos formas de hacer.</p>
                </div>
                <span className="tut-arrow">Ver en YouTube</span>
              </div>
            </a>
            <a className="tut-card sec-in d2" href="https://www.youtube.com/shorts/w1UTPTPCJ08" target="_blank" rel="noopener">
              <div className="tut-thumb">
                <img src="/assets/thumb-2.webp" alt="Secciones D5 Render" loading="lazy" />
                <div className="tut-thumb-ov"></div>
                <div className="tut-play"><div className="tut-pbtn"><svg viewBox="0 0 16 16"><polygon points="3,2 14,8 3,14"/></svg></div></div>
                <span className="tut-num" aria-hidden="true">02</span>
              </div>
              <div className="tut-body">
                <div>
                  <p className="tut-meta">D5 Render · Herramientas</p>
                  <h3 className="tut-title">Herramienta de Secciones</h3>
                  <p className="tut-text">Como usar la herramienta de corte en D5 Render.</p>
                </div>
                <span className="tut-arrow">Ver en YouTube</span>
              </div>
            </a>
            <div className="tut-card tut-soon sec-in d3">
              <div className="tut-soon-icon">+</div>
              <span className="tut-soon-lbl">Próximo tutorial</span>
              <p className="tut-soon-sub">Próximamente</p>
            </div>
          </div>
          <div id="creds">
            <span className="creds-lbl">Credenciales</span>
            <div className="creds-list">
              <div className="cred">D5 Render — Tutor Verificado</div>
              <div className="cred">Imutes Academy — Instructor</div>
              <div className="cred">D5 Render Masterclass — 6+ horas</div>
            </div>
          </div>
        </section>

        {/* 5: CONTACT */}
        <section className="fp-sec" id="contact">
          <p className="lbl sec-in">Contacto</p>
          <h2 className="disp ct-h sec-in d1">Trabajemos<br /><em>juntos.</em></h2>
          <div className="ct-links sec-in d2">
            <a href="https://wa.me/595974534159" target="_blank" rel="noopener" className="ct-btn">
              <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/pedroesardi/" target="_blank" rel="noopener" className="ct-btn">
              <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.instagram.com/pedrosardi.studio/" target="_blank" rel="noopener" className="ct-btn">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
            <a href="https://www.youtube.com/@arqoveta" target="_blank" rel="noopener" className="ct-btn">
              <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zm-14 7.4V10.4l6.2 3.2-6.2 3z"/></svg>
              YouTube
            </a>
            <a href="/cv" className="ct-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              Ver CV
            </a>
          </div>
          <p id="footer-line" className="sec-in d3">© 2025 pedrosardi.studio · Caacupé, Paraguay</p>
        </section>

      </div>
    </>
  )
}
