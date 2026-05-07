'use client'
import { useEffect } from 'react'
import Link from 'next/link'

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  img { display: block; max-width: 100%; }
  a   { text-decoration: none; color: inherit; }
  ul  { list-style: none; }

  :root {
    --bg:       #080807;
    --bg2:      #0d0d0c;
    --bg3:      #131312;
    --fg:       #ede9e1;
    --muted:    rgba(237,233,225,.44);
    --border:   rgba(237,233,225,.08);
    --gold:     #b99460;
    --gold-dim: rgba(185,148,96,.18);
  }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  body { background: var(--bg); color: var(--fg); font-family: 'DM Sans', sans-serif; font-weight: 300; overflow-x: hidden; }

  #grain { position: fixed; inset: 0; pointer-events: none; z-index: 500; opacity: .28;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); }

  #c-dot, #c-ring { display: none; position: fixed; pointer-events: none; z-index: 9999; transform: translate(-50%,-50%); will-change: left, top; }
  @media (hover: hover) and (pointer: fine) {
    body { cursor: none; }
    #c-dot  { display: block; width: 6px; height: 6px; background: var(--fg); border-radius: 50%; z-index: 9999; transition: width .2s, height .2s, background .2s, border .2s; }
    #c-ring { display: block; width: 30px; height: 30px; border: 1px solid rgba(237,233,225,.3); border-radius: 50%; z-index: 9998; transition: opacity .25s; }
    body.ch #c-dot  { width: 44px; height: 44px; background: transparent; border: 1px solid rgba(237,233,225,.55); }
    body.ch #c-ring { opacity: 0; }
  }

  .a { opacity: 0; transform: translateY(44px); transition: opacity .95s cubic-bezier(.25,.46,.45,.94), transform .95s cubic-bezier(.25,.46,.45,.94); }
  .a-l { opacity: 0; transform: translateX(-44px); transition: opacity .95s cubic-bezier(.25,.46,.45,.94), transform .95s cubic-bezier(.25,.46,.45,.94); }
  .a-r { opacity: 0; transform: translateX(44px);  transition: opacity .95s cubic-bezier(.25,.46,.45,.94), transform .95s cubic-bezier(.25,.46,.45,.94); }
  .a.in, .a-l.in, .a-r.in { opacity: 1; transform: none; }
  .d1{transition-delay:.08s} .d2{transition-delay:.18s} .d3{transition-delay:.3s} .d4{transition-delay:.44s} .d5{transition-delay:.6s}

  #scroll-progress { position: fixed; top: 0; left: 0; height: 2px; z-index: 9999; background: var(--gold); width: 0%; transition: width .1s linear; pointer-events: none; }

  #nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; display: flex; align-items: center; justify-content: space-between; padding: 28px 52px; transition: padding .4s, background .4s, border-color .4s; border-bottom: 1px solid transparent; }
  #nav.stuck { padding: 16px 52px; background: rgba(8,8,7,.96); backdrop-filter: blur(16px); border-bottom-color: var(--border); }
  .nav-brand { font-family: 'Playfair Display', serif; font-size: .95rem; letter-spacing: .14em; color: var(--fg); }
  .nav-brand span { color: var(--gold); }
  .nav-back { display: inline-flex; align-items: center; gap: 9px; padding: 8px 16px 8px 12px; border: 1px solid rgba(237,233,225,.1); background: rgba(237,233,225,.04); font-size: .58rem; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); transition: color .3s, border-color .3s, background .3s; backdrop-filter: blur(6px); }
  .nav-back:hover { color: var(--fg); border-color: rgba(237,233,225,.28); background: rgba(237,233,225,.07); }
  .nav-back svg { width: 14px; height: 14px; flex-shrink: 0; transition: transform .3s; }
  .nav-back:hover svg { transform: translateX(-3px); }
  .nav-cta { display: inline-flex; align-items: center; gap: 8px; padding: 9px 22px; background: var(--gold); font-size: .58rem; letter-spacing: .16em; text-transform: uppercase; color: #080807; font-weight: 500; transition: background .3s, box-shadow .3s; }
  .nav-cta:hover { background: #c9a470; box-shadow: 0 6px 20px rgba(185,148,96,.25); }

  #hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 100px; position: relative; overflow: hidden; }
  #hero-bg-vid { position: absolute; inset: -20% 0 -20%; width: 100%; height: 140%; object-fit: cover; object-position: center; opacity: .45; pointer-events: none; will-change: transform; }
  #hero-bg-ov { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse 90% 75% at 50% 50%, rgba(8,8,7,.3) 0%, rgba(8,8,7,.65) 100%), linear-gradient(180deg, rgba(8,8,7,.45) 0%, transparent 22%, transparent 78%, rgba(8,8,7,.55) 100%); }
  #hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(237,233,225,.02) 1px,transparent 1px), linear-gradient(90deg,rgba(237,233,225,.02) 1px,transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse 90% 80% at 50% 50%,transparent 40%,black 100%); }
  .hero-content { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; }
  .hero-badge { display: inline-flex; align-items: center; gap: 10px; font-size: .58rem; letter-spacing: .24em; text-transform: uppercase; color: var(--gold); border: 1px solid var(--gold-dim); padding: 8px 20px; margin-bottom: 36px; animation: fi .8s forwards; }
  .hero-badge::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--gold); animation:pulse 2s ease-in-out infinite; }
  @keyframes pulse { 0%,100%{opacity:.4;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
  .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3rem,9vw,8.5rem); font-weight: 400; line-height: 1; letter-spacing: -.02em; color: var(--fg); animation: fi .9s .12s both; }
  .hero-title em { font-style: italic; color: var(--gold); display: block; }
  .hero-sub { font-size: clamp(.85rem,1.8vw,1.05rem); line-height: 1.8; color: var(--muted); max-width: 520px; margin: 32px auto 0; animation: fi .9s .24s both; }
  .hero-div { width: 1px; height: 56px; background: linear-gradient(to bottom,transparent,rgba(185,148,96,.4),transparent); margin: 48px auto; animation: fi .9s .32s both; }
  .cta-wrap { display: flex; flex-direction: column; align-items: center; gap: 16px; animation: fi .9s .4s both; }
  .btn-primary { display: inline-flex; align-items: center; gap: 14px; padding: 18px 44px; background: var(--gold); color: #080807; font-size: .72rem; font-weight: 500; letter-spacing: .18em; text-transform: uppercase; transition: background .3s, transform .3s, box-shadow .3s; }
  .btn-primary:hover { background: #c9a470; transform: translateY(-2px); box-shadow: 0 16px 48px rgba(185,148,96,.28); }
  .btn-primary svg { width: 14px; height: 14px; transition: transform .3s; }
  .btn-primary:hover svg { transform: translateX(3px); }
  .cta-note { font-size: .62rem; letter-spacing: .14em; text-transform: uppercase; color: rgba(237,233,225,.3); }
  .cta-note strong { color: rgba(237,233,225,.55); font-weight: 400; }
  @keyframes fi { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:none; } }

  .hero-preview { position: relative; z-index: 2; margin-top: 72px; width: 100%; max-width: 900px; animation: fi .9s .6s both; }
  .hero-preview-frame { position: relative; border: 1px solid rgba(185,148,96,.28); box-shadow: 0 0 0 1px rgba(185,148,96,.08), 0 40px 100px rgba(0,0,0,.7), 0 0 80px rgba(185,148,96,.1); }
  .hero-preview-label { position: absolute; top: -1px; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; gap: 8px; padding: 5px 18px; background: var(--bg); border: 1px solid rgba(185,148,96,.28); border-top: none; font-size: .48rem; letter-spacing: .22em; text-transform: uppercase; color: var(--gold); white-space: nowrap; z-index: 2; }
  .hero-preview-label::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .hero-preview-vid { display: block; width: 100%; aspect-ratio: 16/9; object-fit: cover; object-position: center; filter: brightness(.82) saturate(1.08); }
  .hero-preview-ov { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(to top, rgba(8,8,7,.55) 0%, transparent 35%); }
  .hero-preview::before, .hero-preview::after { content: ''; position: absolute; top: 50%; width: 1px; height: 60%; transform: translateY(-50%); background: linear-gradient(to bottom, transparent, rgba(185,148,96,.2), transparent); }
  .hero-preview::before { left: -28px; }
  .hero-preview::after  { right: -28px; }

  #stats { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg2); display: grid; grid-template-columns: repeat(4,1fr); }
  .stat { padding: 44px 28px; text-align: center; border-right: 1px solid var(--border); position: relative; overflow: hidden; transition: background .4s; }
  .stat:last-child { border-right: none; }
  .stat::after { content:''; position:absolute; top:0;left:0;right:0; height:1px; background:var(--gold); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(.25,.46,.45,.94); }
  .stat:hover { background: rgba(237,233,225,.015); }
  .stat:hover::after { transform: scaleX(1); }
  .stat-n { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem,4vw,3.2rem); font-weight: 400; color: var(--gold); line-height: 1; margin-bottom: 9px; }
  .stat-n em { font-style: normal; font-size: .55em; }
  .stat-l { font-size: .58rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }

  #cert-section { background: var(--bg); }
  .cert-wrap { display: grid; grid-template-columns: 1fr 1fr; }
  .cert-display { background: var(--bg2); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 72px 64px; border-right: 1px solid var(--border); gap: 24px; }
  .cert-eyebrow { font-size: .6rem; letter-spacing: .26em; text-transform: uppercase; color: var(--gold); align-self: flex-start; display: flex; align-items: center; gap: 12px; }
  .cert-eyebrow::before { content:''; width:22px; height:1px; background:var(--gold); opacity:.5; }
  .cert-frame { position: relative; max-width: 480px; width: 100%; }
  .cert-frame::before { content: ''; position: absolute; inset: -28px; background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(185,148,96,.18) 0%, transparent 70%); pointer-events: none; z-index: 0; }
  .cert-frame::after { content: ''; position: absolute; inset: -6px; border: 1px solid rgba(185,148,96,.2); z-index: 1; pointer-events: none; }
  .cert-img-box { position: relative; z-index: 2; border: 1px solid rgba(185,148,96,.35); box-shadow: 0 0 0 1px rgba(185,148,96,.1), 0 24px 64px rgba(0,0,0,.65), 0 0 80px rgba(185,148,96,.08); overflow: hidden; background: var(--bg3); transform: rotate(-0.4deg); transition: transform .5s cubic-bezier(.25,.46,.45,.94), box-shadow .5s; }
  .cert-img-box:hover { transform: rotate(0deg) scale(1.012); box-shadow: 0 0 0 1px rgba(185,148,96,.2), 0 32px 80px rgba(0,0,0,.6), 0 0 120px rgba(185,148,96,.14); }
  .cert-img-box img { width: 100%; height: auto; display: block; filter: brightness(.94) contrast(1.06) saturate(1.05); transition: filter .4s; }
  .cert-img-box:hover img { filter: brightness(1) contrast(1.06) saturate(1.05); }
  .cert-seal { position: absolute; bottom: 16px; right: 16px; width: 48px; height: 48px; background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(185,148,96,.4); animation: sp 3s ease-in-out infinite; }
  @keyframes sp { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(180deg)} }
  .cert-seal svg { width: 22px; fill: #080807; }
  .cert-verified-badge { display: inline-flex; align-items: center; gap: 10px; font-size: .58rem; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); background: rgba(185,148,96,.08); border: 1px solid rgba(185,148,96,.24); padding: 8px 18px; }
  .cert-verified-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .cert-creds { padding: 72px 52px; display: flex; flex-direction: column; justify-content: center; gap: 0; }
  .cert-cred-item { display: flex; gap: 20px; align-items: flex-start; padding: 28px 0; border-bottom: 1px solid var(--border); }
  .cert-cred-item:last-child { border-bottom: none; }
  .cert-cred-icon { width: 36px; height: 36px; flex-shrink: 0; border: 1px solid rgba(185,148,96,.28); display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: .8rem; margin-top: 2px; }
  .cert-cred-text h4 { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 400; color: var(--fg); margin-bottom: 6px; }
  .cert-cred-text p { font-size: .8rem; line-height: 1.72; color: var(--muted); }

  #about { display: grid; grid-template-columns: 1fr 1fr; background: var(--bg2); }
  .about-img { background: var(--bg3); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 52px; border-right: 1px solid var(--border); gap: 24px; min-height: 500px; }
  .about-img-circle { width: clamp(200px, 28vw, 320px); border-radius: 50%; overflow: hidden; border: 1px solid rgba(185,148,96,.28); box-shadow: 0 0 0 1px rgba(185,148,96,.08), 0 24px 72px rgba(0,0,0,.6); }
  .about-img-circle img { width: 100%; height: 100%; object-fit: cover; object-position: center top; filter: brightness(.86); display: block; }
  .about-verified { display: inline-flex; align-items: center; gap: 10px; font-size: .58rem; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); background: rgba(185,148,96,.07); border: 1px solid rgba(185,148,96,.2); padding: 7px 16px; }
  .av-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); animation: pulse 2s ease-in-out infinite; }
  .about-body { padding: 72px 52px; display: flex; flex-direction: column; justify-content: center; }
  .lbl { display: inline-flex; align-items: center; gap: 12px; font-size: .6rem; letter-spacing: .26em; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
  .lbl::before { content:''; width:24px; height:1px; background:var(--gold); opacity:.5; flex-shrink:0; }
  .disp { font-family: 'Playfair Display', serif; font-weight: 400; line-height: 1.1; letter-spacing: -.01em; color: var(--fg); }
  .disp em { font-style: italic; color: var(--gold); }
  .bt { font-size: .86rem; line-height: 1.9; color: var(--muted); }
  .bt strong { color: var(--fg); font-weight: 400; }

  #modulos { background: var(--bg); padding: 100px 52px; }
  .mod-hd { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; align-items: end; margin-bottom: 52px; }
  .mod-list { border-top: 1px solid var(--border); }
  .mod-item { display: grid; grid-template-columns: 100px 1fr auto; gap: 22px; align-items: center; padding: 24px 0; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; transition: background .35s; }
  .mod-item::before { content:''; position:absolute; left:0; top:0; bottom:0; width:1px; background:var(--gold); transform:scaleY(0); transform-origin:bottom; transition:transform .5s cubic-bezier(.25,.46,.45,.94); }
  .mod-item:hover { background:rgba(237,233,225,.012); }
  .mod-item:hover::before { transform:scaleY(1); }
  .mod-thumb { width:100px; height:64px; overflow:hidden; border:1px solid var(--border); position:relative; z-index:1; background:var(--bg3); transition:border-color .4s; flex-shrink:0; }
  .mod-item:hover .mod-thumb { border-color: rgba(185,148,96,.3); }
  .mod-thumb img, .mod-thumb video { width:100%; height:100%; object-fit:cover; filter:brightness(.75); transition:filter .4s, transform .5s cubic-bezier(.25,.46,.45,.94); display:block; }
  .mod-item:hover .mod-thumb img { filter:brightness(1); transform:scale(1.06); }
  .mod-thumb-ph { width:100%; height:100%; background:linear-gradient(135deg,#1a1a18,#111110); display:flex; align-items:center; justify-content:center; }
  .mod-thumb-ph span { font-family:'Playfair Display',serif; font-size:1.3rem; color:rgba(185,148,96,.18); }
  .mod-body { position:relative; z-index:1; }
  .mod-name { font-family:'Playfair Display',serif; font-size:1rem; font-weight:400; color:var(--fg); line-height:1.3; margin-bottom:4px; }
  .mod-name em { font-style:italic; color:var(--gold); }
  .mod-desc { font-size:.74rem; line-height:1.7; color:var(--muted); }
  .mod-meta { display:flex; flex-direction:column; align-items:flex-end; gap:5px; position:relative; z-index:1; flex-shrink:0; }
  .mod-dur { font-size:.62rem; letter-spacing:.1em; color:var(--muted); white-space:nowrap; }
  .mod-status { font-size:.48rem; letter-spacing:.18em; text-transform:uppercase; padding:3px 8px; white-space:nowrap; }
  .mod-status.done { color:rgba(185,148,96,.9); border:1px solid rgba(185,148,96,.25); background:rgba(185,148,96,.06); }
  .mod-total { display:flex; align-items:center; justify-content:space-between; padding:20px 0 0; }
  .mod-total-label { font-size:.6rem; letter-spacing:.2em; text-transform:uppercase; color:var(--muted); display:flex; align-items:center; gap:10px; }
  .mod-total-label::before { content:''; width:22px; height:1px; background:var(--gold); opacity:.5; }
  .mod-total-val { font-family:'Playfair Display',serif; font-size:1.2rem; color:var(--gold); }
  .mod-total-note { font-size:.58rem; letter-spacing:.12em; color:rgba(237,233,225,.22); margin-top:3px; text-align:right; }

  #previews { background: var(--bg); padding: 100px 52px; }
  .prev-hd { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 52px; }
  .prev-hd .disp { font-size: clamp(1.9rem,3vw,2.8rem); }
  .prev-hd-r { max-width: 340px; }
  .prev-hd-r p { font-size: .84rem; line-height: 1.85; color: var(--muted); }
  .prev-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; }
  .prev-card { background: var(--bg3); border: 1px solid var(--border); overflow: hidden; cursor: pointer; transition: border-color .3s, transform .4s cubic-bezier(.25,.46,.45,.94), box-shadow .4s; }
  .prev-card:hover { border-color: rgba(185,148,96,.28); transform: translateY(-4px); box-shadow: 0 20px 52px rgba(0,0,0,.44); }
  .prev-thumb { aspect-ratio: 16/9; position: relative; overflow: hidden; background: #0d0d0c; }
  .prev-thumb img { width:100%; height:100%; object-fit:cover; filter:brightness(.75); transition:transform .5s,filter .5s; }
  .prev-card:hover .prev-thumb img { transform:scale(1.05); filter:brightness(.9); }
  .prev-play { position:absolute;inset:0;display:flex;align-items:center;justify-content:center; }
  .prev-pbtn { width:52px;height:52px;border-radius:50%;border:1px solid rgba(237,233,225,.3);display:flex;align-items:center;justify-content:center;background:rgba(8,8,7,.5);transition:background .3s,border-color .3s,transform .3s; }
  .prev-card:hover .prev-pbtn { background:var(--gold);border-color:var(--gold);transform:scale(1.08); }
  .prev-pbtn svg { width:15px;margin-left:3px;fill:var(--fg); }
  .prev-badge { position:absolute;top:12px;left:12px;font-size:.46rem;letter-spacing:.2em;text-transform:uppercase;color:#080807;background:var(--gold);padding:3px 9px; }
  .prev-body { padding: 20px 22px 24px; }
  .prev-meta { font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:7px; }
  .prev-title { font-family:'Playfair Display',serif;font-size:1rem;font-weight:400;color:var(--fg);line-height:1.3;margin-bottom:7px; }
  .prev-desc { font-size:.74rem;line-height:1.7;color:var(--muted); }
  .prev-soon { background:var(--bg2);border:1px dashed rgba(237,233,225,.07);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;min-height:200px;cursor:default; }
  .prev-soon .sc { width:42px;height:42px;border:1px solid var(--border);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:var(--muted); }
  .prev-soon span { font-size:.56rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted); }

  #video-modal { display:none; position:fixed; inset:0; z-index:9000; background:rgba(8,8,7,.94); backdrop-filter:blur(12px); align-items:center; justify-content:center; padding:24px; }
  #video-modal.open { display:flex; }
  .vm-inner { position:relative; width:100%; max-width:900px; animation:vi .3s cubic-bezier(.25,.46,.45,.94); }
  @keyframes vi { from{opacity:0;transform:scale(.96) translateY(16px)} to{opacity:1;transform:none} }
  .vm-close { position:absolute;top:-44px;right:0;background:none;border:none;cursor:pointer;font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);display:flex;align-items:center;gap:8px;transition:color .3s; }
  .vm-close:hover { color:var(--fg); }
  .vm-close::after { content:'×';font-size:1.4rem;line-height:1; }
  .vm-ratio { position:relative;width:100%;padding-bottom:56.25%;background:#000; }
  .vm-ratio iframe { position:absolute;inset:0;width:100%;height:100%;border:none; }

  #audience { background: var(--bg2); padding: 100px 52px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .aud-hd .disp { font-size: clamp(2rem,4vw,3.4rem); }
  .aud-item { display:flex;gap:22px;align-items:flex-start;padding:22px 0;border-bottom:1px solid var(--border); }
  .aud-item:first-child { padding-top:0; }
  .aud-item:last-child { border-bottom:none; }
  .aud-icon { width:36px;height:36px;flex-shrink:0;border:1px solid var(--gold-dim);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:.85rem;margin-top:2px; }
  .aud-text h4 { font-family:'Playfair Display',serif;font-size:1rem;font-weight:400;color:var(--fg);margin-bottom:5px; }
  .aud-text p { font-size:.78rem;line-height:1.72;color:var(--muted); }

  #cta-final { background:var(--bg);padding:130px 52px;text-align:center;position:relative;overflow:hidden; }
  #cta-final::before { content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;background:radial-gradient(circle,rgba(185,148,96,.06) 0%,transparent 65%);pointer-events:none; }
  .cta-title { font-family:'Playfair Display',serif;font-size:clamp(2.8rem,7vw,7rem);font-weight:400;line-height:1;letter-spacing:-.02em;color:var(--fg);margin-bottom:20px;position:relative;z-index:1; }
  .cta-title em { font-style:italic;color:var(--gold); }
  .cta-sub { font-size:.9rem;line-height:1.8;color:var(--muted);max-width:460px;margin:0 auto 52px;position:relative;z-index:1; }
  .cta-actions { display:flex;flex-direction:column;align-items:center;gap:18px;position:relative;z-index:1; }

  #footer { padding:26px 52px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:var(--bg2); }
  .fl { font-family:'Playfair Display',serif;font-size:.9rem;letter-spacing:.12em;color:var(--muted); }
  #footer p { font-size:.62rem;letter-spacing:.08em;color:rgba(237,233,225,.22); }
  .footer-link { font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);border-bottom:1px solid var(--border);padding-bottom:2px;transition:color .3s,border-color .3s; }
  .footer-link:hover { color:var(--fg);border-color:rgba(237,233,225,.3); }

  @media (max-width: 900px) {
    #nav { padding: 18px 20px; }
    #nav.stuck { padding: 12px 20px; }
    .nav-cta { padding: 8px 16px; font-size: .55rem; }
    #hero { padding: 100px 20px 60px; }
    #hero-bg-vid { display: none; }
    .hero-preview { margin-top: 40px; }
    .hero-preview::before, .hero-preview::after { display: none; }
    #stats { grid-template-columns: 1fr 1fr; }
    .stat { padding: 28px 16px; }
    .stat:nth-child(2) { border-right: none; }
    .stat:nth-child(3) { border-top: 1px solid var(--border); border-right: 1px solid var(--border); }
    .stat:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
    .cert-wrap { grid-template-columns: 1fr; }
    .cert-display { padding: 52px 24px; border-right: none; border-bottom: 1px solid var(--border); }
    .cert-creds { padding: 44px 24px; }
    #about { grid-template-columns: 1fr; }
    .about-img { min-height: 320px; border-right: none; border-bottom: 1px solid var(--border); padding: 40px 24px; }
    .about-img-circle { width: clamp(180px, 55vw, 260px); }
    .about-body { padding: 48px 24px; }
    #modulos { padding: 64px 24px; }
    .mod-hd { grid-template-columns: 1fr; gap: 20px; }
    .mod-item { grid-template-columns: 64px 1fr; gap: 14px; }
    .mod-thumb { width: 64px; height: 42px; }
    .mod-meta { display: none; }
    #previews { padding: 64px 24px; }
    .prev-hd { flex-direction: column; gap: 18px; align-items: flex-start; }
    .prev-grid { grid-template-columns: 1fr; }
    #audience { grid-template-columns: 1fr; gap: 36px; padding: 64px 24px; }
    #cta-final { padding: 80px 24px; }
    .cta-title { font-size: clamp(2.4rem,10vw,4rem); }
    #footer { flex-direction: column; gap: 12px; text-align: center; padding: 22px; }
  }
`

export default function CursoClient() {
  useEffect(() => {
    var hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    // CURSOR
    if (hasMouse) {
      var dot = document.getElementById('c-dot'), ring = document.getElementById('c-ring')
      var mx=0,my=0,rx=0,ry=0
      document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';},{passive:true})
      ;(function tick(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(tick)})()
      document.querySelectorAll('a, button').forEach(function(el){
        el.addEventListener('mouseenter',function(){document.body.classList.add('ch')})
        el.addEventListener('mouseleave',function(){document.body.classList.remove('ch')})
      })
    }

    // NAV STICKY
    var nav = document.getElementById('nav')
    var progressBar = document.getElementById('scroll-progress')
    window.addEventListener('scroll', function() {
      nav.classList.toggle('stuck', window.scrollY > 40)
      var docH = document.documentElement.scrollHeight - window.innerHeight
      progressBar.style.width = (docH > 0 ? (window.scrollY/docH)*100 : 0) + '%'
    }, { passive: true })

    // SCROLL REVEAL
    var rvObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target) }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' })
    document.querySelectorAll('.a, .a-l, .a-r').forEach(function(el) { rvObs.observe(el) })

    // PARALLAX HERO
    var heroBg = document.getElementById('hero-bg-vid')
    if (heroBg) {
      window.addEventListener('scroll', function() {
        heroBg.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)'
      }, { passive: true })
    }

    // MODAL VIDEO
    var modal = document.getElementById('video-modal')
    var iframe = document.getElementById('modal-iframe')
    var btnClose = document.getElementById('modal-close')
    document.querySelectorAll('.prev-card').forEach(function(card) {
      card.addEventListener('click', function() {
        var ytId = card.getAttribute('data-yt')
        if (!ytId) return
        iframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0'
        modal.classList.add('open')
        document.body.style.overflow = 'hidden'
      })
    })
    function closeModal() { modal.classList.remove('open'); iframe.src = ''; document.body.style.overflow = '' }
    btnClose.addEventListener('click', closeModal)
    modal.addEventListener('click', function(e) { if (e.target === modal) closeModal() })
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeModal() })
  }, [])

  return (
    <>
      <style>{css}</style>
      <div id="grain" aria-hidden="true"></div>
      <div id="scroll-progress" aria-hidden="true"></div>
      <div id="c-dot" aria-hidden="true"></div>
      <div id="c-ring" aria-hidden="true"></div>

      {/* MODAL */}
      <div id="video-modal" role="dialog" aria-modal="true">
        <div className="vm-inner">
          <button className="vm-close" id="modal-close" aria-label="Cerrar video">Cerrar</button>
          <div className="vm-ratio">
            <iframe id="modal-iframe" src="" title="Vista previa" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav id="nav">
        <Link href="/" className="nav-back">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M10 3L5 8l5 5"/></svg>
          Portfolio
        </Link>
        <span className="nav-brand">Pedro <span>Sardi</span></span>
        <a href="http://www.imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup" target="_blank" rel="noopener" className="nav-cta">Adquirir curso</a>
      </nav>

      {/* HERO */}
      <section id="hero">
        <video id="hero-bg-vid" autoPlay muted loop playsInline preload="none" poster="/assets/hero-poster.jpg">
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div id="hero-bg-ov" aria-hidden="true"></div>
        <div id="hero-grid" aria-hidden="true"></div>
        <div className="hero-content">
          <div className="hero-badge"><span>Tutor Verificado D5 Render · En español</span></div>
          <h1 className="hero-title">Masterclass<em>D5 Render</em></h1>
          <p className="hero-sub">Desde cero hasta el render final. Más de 18 horas de contenido estructurado, con clases bonus que se siguen sumando.</p>
          <div className="hero-div"></div>
          <div className="cta-wrap">
            <a href="http://www.imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup" target="_blank" rel="noopener" className="btn-primary">
              Adquirir en Imutes
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
            <p className="cta-note">Disponible en <strong>IMUTES</strong> · Acceso por 2 años</p>
          </div>
        </div>
        <div className="hero-preview">
          <div className="hero-preview-frame">
            <span className="hero-preview-label">Vista del curso</span>
            <video className="hero-preview-vid" autoPlay muted loop playsInline preload="none">
              <source src="/assets/hero.mp4" type="video/mp4" />
            </video>
            <div className="hero-preview-ov"></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div id="stats">
        <div className="stat a"><div className="stat-n">18<em>h+</em></div><div className="stat-l">Horas de contenido</div></div>
        <div className="stat a d1"><div className="stat-n">6</div><div className="stat-l">Módulos + bonus</div></div>
        <div className="stat a d2"><div className="stat-n">100<em>%</em></div><div className="stat-l">En español</div></div>
        <div className="stat a d3"><div className="stat-n">2<em>años</em></div><div className="stat-l">Acceso al curso</div></div>
      </div>

      {/* CERTIFICADO */}
      <section id="cert-section">
        <div className="cert-wrap">
          <div className="cert-display a-l">
            <span className="cert-eyebrow">Certificado oficial</span>
            <div className="cert-frame">
              <div className="cert-img-box">
                <img src="/assets/certificado-d5.webp" alt="Certificado Tutor Verificado D5 Render — Pedro Sardi" loading="lazy" />
                <div className="cert-seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                </div>
              </div>
            </div>
            <div className="cert-verified-badge">
              <div className="cert-verified-dot"></div>
              <span>Tutor Verificado D5 Render</span>
            </div>
          </div>
          <div className="cert-creds">
            <div className="cert-cred-item a d1"><div className="cert-cred-icon">✓</div><div className="cert-cred-text"><h4>Tutor Verificado D5 Render</h4><p>Una de las pocas personas en Latinoamérica con esta certificación oficial directa de D5 Render.</p></div></div>
            <div className="cert-cred-item a d2"><div className="cert-cred-icon">✦</div><div className="cert-cred-text"><h4>Instructor en IMUTES</h4><p>Plataforma de cursos con miles de estudiantes en Paraguay y toda la región hispanohablante.</p></div></div>
            <div className="cert-cred-item a d3"><div className="cert-cred-icon">▶</div><div className="cert-cred-text"><h4>Canal @pedrosardi.studio en YouTube</h4><p>Tutoriales cortos y concretos sobre D5 Render en español, sin relleno.</p></div></div>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section id="about">
        <div className="about-img a-l">
          <div className="about-img-circle">
            <img src="/assets/about.webp" alt="Pedro Sardi — Instructor" loading="lazy" />
          </div>
          <div className="about-verified"><div className="av-dot"></div><span>Tutor Verificado D5 Render</span></div>
        </div>
        <div className="about-body">
          <p className="lbl a">El instructor</p>
          <h2 className="disp a d1" style={{fontSize:'clamp(2rem,3.5vw,3rem)',marginBottom:'24px'}}>Pedro <em>Sardi</em></h2>
          <p className="bt a d2" style={{marginBottom:'16px'}}>Soy <strong>visualizador arquitectónico y tutor verificado de D5 Render</strong>, con base en Paraguay. Trabajo con estudios de toda Latinoamérica transformando modelos en imágenes fotorrealistas.</p>
          <p className="bt a d3" style={{marginBottom:'16px'}}>Como <strong>Instructor en IMUTES</strong>, diseñé esta masterclass para que cualquier arquitecto o diseñador pueda dominar D5 Render con un flujo de trabajo claro y profesional.</p>
          <p className="bt a d4">Sin teoría innecesaria. Solo lo que realmente usás en proyectos reales.</p>
        </div>
      </section>

      {/* MÓDULOS */}
      <section id="modulos">
        <div className="mod-hd">
          <div><p className="lbl a">Temario completo</p><h2 className="disp a d1">Lo que<br /><em>vas a aprender.</em></h2></div>
          <p className="bt a d2" style={{maxWidth:'380px'}}>Un recorrido completo por D5 Render con proyectos reales. Las clases se van actualizando ⏳</p>
        </div>
        <div className="mod-list">
          {[
            {n:'00', img:null, name:'Primeros', em:'Pasos', desc:'Instalación, interfaz y configuración inicial. Todo lo que necesitás para arrancar.', dur:'20 min'},
            {n:'01', img:'/assets/mod-01.webp', name:'Primer', em:'Render', desc:'Tu primera imagen fotorrealista desde cero. Flujo de trabajo completo de inicio a fin.', dur:'38 min'},
            {n:'02', img:'/assets/mod-02.webp', name:'Escena', em:'Interior', desc:'Iluminación artificial, materiales PBR, cámaras y composición.', dur:'1h 47 min'},
            {n:'03', img:'/assets/mod-03.webp', name:'Escena Exterior', em:'Frontal', desc:'Entorno, vegetación, iluminación natural y cielo HDRI para renders exteriores de alto impacto.', dur:'1h 29 min'},
            {n:'04', img:null, name:'Escena Exterior', em:'Trasera', desc:'Segunda perspectiva exterior: ángulos complementarios, distintas condiciones de luz y entorno ampliado.', dur:'40 min'},
            {n:'05', img:null, name:'Animaciones', em:'y Cierre', desc:'Recorridos animados, exportación de video y presentación final profesional del proyecto.', dur:'1h'},
          ].map(function(m,i){return (
            <div className={'mod-item a' + (i>0?' d'+Math.min(i,4):'')} key={m.n}>
              <div className="mod-thumb">
                {m.img
                  ? <img src={m.img} alt={m.name+' '+m.em} loading="lazy" />
                  : <div className="mod-thumb-ph"><span>{m.n}</span></div>
                }
              </div>
              <div className="mod-body">
                <p className="mod-name">{m.name} <em>{m.em}</em></p>
                <p className="mod-desc">{m.desc}</p>
              </div>
              <div className="mod-meta">
                <span className="mod-dur">{m.dur}</span>
                <span className="mod-status done">✓ Disponible</span>
              </div>
            </div>
          )})}
        </div>
        <div className="mod-total a">
          <span className="mod-total-label">Total del curso</span>
          <div><div className="mod-total-val">6h+</div><div className="mod-total-note">y creciendo con clases bonus</div></div>
        </div>
      </section>

      {/* PREVIEWS */}
      <section id="previews">
        <div className="prev-hd">
          <div className="a"><p className="lbl">Vista previa</p><h2 className="disp">Mirá antes<br />de <em>comprar.</em></h2></div>
          <div className="prev-hd-r a d2"><p>Fragmentos reales del curso para que veas el estilo, el ritmo y la calidad del contenido antes de decidir.</p></div>
        </div>
        <div className="prev-grid">
          <div className="prev-card a d1" data-yt="u8fzui1hCwE">
            <div className="prev-thumb"><img src="https://img.youtube.com/vi/u8fzui1hCwE/maxresdefault.jpg" alt="Vista previa 1" loading="lazy" /><div className="prev-play"><div className="prev-pbtn"><svg viewBox="0 0 16 16"><polygon points="3,2 14,8 3,14"/></svg></div></div><span className="prev-badge">Vista previa</span></div>
            <div className="prev-body"><p className="prev-meta">D5 Render · Fragmento</p><h3 className="prev-title">Imagen a 3D</h3><p className="prev-desc">Como usar la herramienta de creación de modelo 3D.</p></div>
          </div>
          <div className="prev-card a d2" data-yt="8oe03kbtUXg">
            <div className="prev-thumb"><img src="https://img.youtube.com/vi/8oe03kbtUXg/maxresdefault.jpg" alt="Vista previa 2" loading="lazy" /><div className="prev-play"><div className="prev-pbtn"><svg viewBox="0 0 16 16"><polygon points="3,2 14,8 3,14"/></svg></div></div><span className="prev-badge">Vista previa</span></div>
            <div className="prev-body"><p className="prev-meta">D5 Render · Fragmento</p><h3 className="prev-title">Herramienta de pincel</h3><p className="prev-desc">Herramienta muy útil para dar detalles en la escena.</p></div>
          </div>
          <div className="prev-soon a d3"><div className="sc">+</div><span>Más previews pronto</span></div>
        </div>
      </section>

      {/* PARA QUIÉN */}
      <section id="audience">
        <div className="aud-hd"><p className="lbl a">¿Para quién?</p><h2 className="disp a d1" style={{fontSize:'clamp(2rem,4vw,3.4rem)'}}>Este curso<br />es para <em>vos</em><br />si sos…</h2></div>
        <div>
          <div className="aud-item a"><div className="aud-icon">✦</div><div className="aud-text"><h4>Arquitecto o diseñador de interiores</h4><p>Que quiere dejar de depender de renders externalizados y tener control total sobre la imagen de tu proyecto.</p></div></div>
          <div className="aud-item a d1"><div className="aud-icon">✦</div><div className="aud-text"><h4>Estudiante de arquitectura</h4><p>Que quiere incorporar visualización fotorrealista a sus entregas y diferenciarse desde el primer trabajo.</p></div></div>
          <div className="aud-item a d2"><div className="aud-icon">✦</div><div className="aud-text"><h4>Usuario de SketchUp o Revit</h4><p>Que ya modela bien pero quiere llevar sus presentaciones a otro nivel con D5 Render de forma rápida.</p></div></div>
          <div className="aud-item a d3"><div className="aud-icon">✦</div><div className="aud-text"><h4>Alguien que intentó aprender solo</h4><p>Y se perdió entre tutoriales en inglés, workflows confusos y resultados que no convencen a los clientes.</p></div></div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final">
        <h2 className="cta-title a">Empezá<br />a rendir<br /><em>diferente.</em></h2>
        <p className="cta-sub a d1">Más de 18 horas de masterclass con clases bonus que se siguen sumando. Dos años de acceso en IMUTES.</p>
        <div className="cta-actions a d2">
          <a href="http://www.imutes.online/cursos/renderiza-como-un-profesional-curso-completo-de-d5-render-para-sketchup" target="_blank" rel="noopener" className="btn-primary">
            Adquirir en IMUTES
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </a>
          <p style={{fontSize:'.58rem',letterSpacing:'.16em',textTransform:'uppercase',color:'rgba(237,233,225,.22)'}}>Serás redirigido a Imutes para completar la compra</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer">
        <span className="fl">Pedro Sardi</span>
        <p>© 2025 pedrosardi.studio · Paraguay</p>
        <Link href="/" className="footer-link">← Volver al sitio</Link>
      </footer>
    </>
  )
}
