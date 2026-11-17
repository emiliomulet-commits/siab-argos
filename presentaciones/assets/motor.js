/* ARGOS · motor de diagramas animados (D06–D25).
   Toma el diagrama fijo incrustado en #cam y lo revela escena a escena: la cámara se acerca a cada zona,
   los textos se escriben, las flechas se dibujan y los recuadros se iluminan. Las escenas siguen los
   tiempos de la locución, de modo que la versión web, la de presentación y la de vídeo comparten ritmo.
   window.ANIM = {escenas:[{r:[x,y,w,h]|null, t:inicio_s, n:"nombre"}], fin:segundos_de_audio, audio:"voz.mp3"} */
(function(){
const st = document.createElement("style");
st.textContent = "#voz-btn{position:fixed;top:14px;right:16px;z-index:5;font:600 14px 'Hanken Grotesk',system-ui,sans-serif;color:#fff;background:rgba(11,31,58,.82);border:1px solid #C9A227;border-radius:999px;padding:9px 16px;cursor:pointer;transition:background .2s}#voz-btn:hover,#voz-btn:focus-visible{background:#C9A227;color:#0B1F3A;outline:none}#voz-btn[hidden]{display:none}body.embed #voz-btn{top:8px;right:8px;padding:6px 12px;font-size:12.5px}@media(max-width:760px){#voz-btn{top:8px;right:8px;padding:7px 12px;font-size:13px}}";
document.head.appendChild(st);
const A = window.ANIM, $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
const q = new URLSearchParams(location.search);
const VOZ = q.get("modo") === "video", WEB = q.get("modo") === "web" || VOZ;
document.body.classList.add(VOZ ? "video" : WEB ? "web" : "pres");
if(q.get("embed")) document.body.classList.add("embed");
if(VOZ) $("#start span").textContent = "▶ Ver con locución (sonido activado)";
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const svg = $("#stage"), cam = $("#cam"), W = 1600, H = 1000;
const E = A.escenas, N = E.length, FIN = A.fin, OUT = 2.6;

/* ---------- cámara */
const C = {x:W/2, y:H/2, s:1};
const applyCam = () => cam.setAttribute("transform", `translate(${W/2 - C.x*C.s} ${H/2 - C.y*C.s}) scale(${C.s})`);
applyCam();
function encuadre(r){
  if(!r) return {x:W/2, y:H/2, s:1};
  const [x, y, w, h] = r, s = Math.max(1, Math.min(1.75, W/(w + 120), H/(h + 120)));
  let cx = x + w/2, cy = y + h/2;                        // que el encuadre no se salga del lienzo
  cx = Math.min(W - W/(2*s), Math.max(W/(2*s), cx)); cy = Math.min(H - H/(2*s), Math.max(H/(2*s), cy));
  return {x:cx, y:cy, s};
}

/* ---------- inventario de elementos y reparto por escenas */
const root = cam.getScreenCTM().inverse();
function caja(el){
  const b = el.getBBox(), m = root.multiply(el.getScreenCTM());
  const pts = [[b.x, b.y], [b.x + b.width, b.y], [b.x, b.y + b.height], [b.x + b.width, b.y + b.height]].map(([x, y]) => [m.a*x + m.c*y + m.e, m.b*x + m.d*y + m.f]);
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  return {x:Math.min(...xs), y:Math.min(...ys), w:Math.max(...xs) - Math.min(...xs), h:Math.max(...ys) - Math.min(...ys), m};
}
const dentro = (r, x, y) => r && x >= r[0] && x <= r[0] + r[2] && y >= r[1] && y <= r[1] + r[3];
function escenaDe(x, y){                                 // la región más pequeña que contiene el punto
  let k = -1, area = Infinity;
  E.forEach((e, i) => { if(dentro(e.r, x, y) && e.r[2]*e.r[3] < area){ k = i; area = e.r[2]*e.r[3]; } });
  return k < 0 ? N - 1 : k;
}
const trazo = el => { const f = el.getAttribute("fill") || getComputedStyle(el).fill; return /^(line|polyline)$/.test(el.tagName) || (el.tagName === "path" && (f === "none" || f === "transparent")); };
const items = [];
$$("#cam rect, #cam circle, #cam ellipse, #cam text, #cam path, #cam line, #cam polyline, #cam polygon, #cam image, #cam use").forEach(el => {
  if(el.closest("defs, marker, clipPath, pattern, mask")) return;
  if(el.parentElement.closest("text")) return;
  const b = caja(el); if(b.w*b.h > W*H*.8 || b.w*b.h === 0 && b.w + b.h === 0) return;   // fondos: siempre visibles
  let k;
  if(trazo(el)){
    let L = 0; try{ L = el.getTotalLength(); }catch(e){}
    const ends = L ? [el.getPointAtLength(0), el.getPointAtLength(L)].map(p => [b.m.a*p.x + b.m.c*p.y + b.m.e, b.m.b*p.x + b.m.d*p.y + b.m.f]) : [];
    const ks = ends.map(([x, y]) => escenaDe(x, y)).filter(i => i < N - 1);
    k = ks.length ? Math.max(...ks) : escenaDe(b.x + b.w/2, b.y + b.h/2);
    items.push({el, k, b, tipo:"trazo", L});
  } else {
    k = escenaDe(b.x + b.w/2, b.y + b.h/2);
    const tipo = el.tagName === "text" ? (el.children.length || (el.textContent || "").length > 140 ? "fundido" : "texto") : "forma";
    items.push({el, k, b, tipo});
  }
});

/* ---------- estado inicial */
items.forEach(it => {
  const el = it.el; it.op = +(el.getAttribute("opacity") || 1);
  if(it.tipo === "texto"){ it.full = el.textContent; el.textContent = ""; }
  if(it.tipo === "trazo" && it.L){ el.style.strokeDasharray = it.L; el.style.strokeDashoffset = it.L; }
  gsap.set(el, {opacity:0});
});
const glowL = document.createElementNS("http://www.w3.org/2000/svg", "g"); cam.appendChild(glowL);
function brillo(b){
  const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  r.setAttribute("x", b.x - 5); r.setAttribute("y", b.y - 5); r.setAttribute("width", b.w + 10); r.setAttribute("height", b.h + 10);
  r.setAttribute("rx", 14); r.setAttribute("fill", "none"); r.setAttribute("stroke", "#C9A227"); r.setAttribute("stroke-width", 5); r.setAttribute("opacity", 0);
  glowL.appendChild(r); return r;
}

/* ---------- línea de tiempo: cada escena empieza cuando la voz la nombra */
const tl = gsap.timeline({paused:true});
E.forEach((e, k) => {
  const t0 = e.t, t1 = k + 1 < N ? E[k + 1].t : FIN, dur = Math.max(1.2, t1 - t0);
  tl.addLabel("s" + (k + 1), t0);
  const f = encuadre(k === 0 || k === N - 1 ? null : e.r);
  tl.to(C, {x:f.x, y:f.y, s:f.s, duration:Math.min(1.1, dur*.3), ease:"power3.inOut", onUpdate:applyCam}, t0);
  const mine = items.filter(it => it.k === k).sort((a, b) => (a.b.y - b.b.y) || (a.b.x - b.b.x));
  const ini = t0 + (k === 0 ? .1 : .35), span = Math.max(.6, Math.min(dur*.62, mine.length*.12 + .8)) ;
  mine.forEach((it, i) => {
    const at = ini + (mine.length > 1 ? span*i/(mine.length - 1)*.8 : 0), el = it.el;
    if(it.tipo === "texto"){
      const o = {n:0}, full = it.full;
      tl.set(el, {opacity:it.op}, at).to(o, {n:full.length, duration:Math.min(.9, .2 + full.length*.018), ease:"none", onUpdate:() => { el.textContent = full.slice(0, Math.round(o.n)); }}, at);
    } else if(it.tipo === "trazo"){
      tl.set(el, {opacity:it.op}, at);
      if(it.L) tl.to(el, {strokeDashoffset:0, duration:.55, ease:"power2.out"}, at);
    } else {
      const big = it.b.w*it.b.h > 6000 && !el.hasAttribute("transform");
      if(big) tl.fromTo(el, {opacity:0, scale:.96, svgOrigin:`${it.b.x + it.b.w/2} ${it.b.y + it.b.h/2}`}, {opacity:it.op, scale:1, duration:.4, ease:"back.out(1.6)"}, at);
      else tl.to(el, {opacity:it.op, duration:.3}, at);
    }
  });
  /* los recuadros principales de la escena se encienden */
  if(k > 0 && k < N - 1){
    const caj = mine.filter(it => it.tipo === "forma" && /rect|polygon|path/.test(it.el.tagName) && it.b.w*it.b.h > 20000)
                    .sort((a, b) => b.b.w*b.b.h - a.b.w*a.b.h).slice(0, 3);
    caj.forEach((it, i) => { const g = brillo(it.b), at = ini + span*.85 + i*.18;
      tl.to(g, {opacity:1, duration:.25}, at).to(g, {opacity:0, duration:.6}, at + .55); });
  }
});
/* cierre: plano general y marca */
tl.to("#outro", {opacity:1, duration:.6}, FIN + .2).fromTo("#outMark", {scale:.7, svgOrigin:"800 420"}, {scale:1, duration:.6, ease:"back.out(2)"}, FIN + .2)
  .to("#outro", {opacity:0, duration:.6}, FIN + OUT - .6).addLabel("end", FIN + OUT);

/* ---------- controles (iguales que en D01) */
const SC = E.map(e => e.n);
const labels = SC.map((_, i) => tl.labels["s" + (i + 1)]).concat(tl.labels.end);
const sc = $("#scenes");
SC.forEach((n, i) => { const b = document.createElement("button"); b.innerHTML = `<b>${i + 1}</b><span>${n}</span><i></i>`; b.title = `${i + 1} · ${n}`; b.onclick = () => go(i); sc.appendChild(b); });
const sbtn = $$(".scenes button");
const cur = () => { const t = tl.time(); let k = 0; labels.forEach((l, i) => { if(i < N && t >= l - .001) k = i; }); return k; };
let seg = null, vozOn = () => false;
function paint(){
  const t = tl.time(), k = cur();
  sbtn.forEach((b, i) => { b.classList.toggle("on", i === k); const a = labels[i], z = labels[i + 1]; b.querySelector("i").style.width = (t >= z ? 100 : t <= a ? 0 : (t - a)/(z - a)*100) + "%"; });
  $("#pi").setAttribute("d", tl.isActive() || (seg && seg.isActive()) || vozOn() ? "M7 5h4v14H7zM13 5h4v14h-4z" : "M8 5v14l11-7z");
  document.body.classList.toggle("at-start", t < .01);
}
gsap.ticker.add(paint);
function stopSeg(){ if(seg){ seg.kill(); seg = null; } }
function go(i){
  stopSeg(); tl.pause(); i = Math.max(0, Math.min(N - 1, i));
  tl.seek(labels[i], false);
  if(WEB){ tl.play(); return; }
  seg = tl.tweenFromTo(labels[i], labels[i + 1], {ease:"none"});
}
function next(){
  if(seg && seg.isActive()){ const k = cur(); stopSeg(); tl.seek(labels[k + 1], false); return; }
  const t = tl.time(), k = cur();
  if(t >= labels[N] - .01) return;
  go(t - labels[k] < .02 ? k : k + 1);
}
function prev(){
  if(seg && seg.isActive()){ go(cur()); return; }
  const t = tl.time(), k = cur(); go(t - labels[k] < .02 ? k - 1 : k);
}
function toggle(){
  if(WEB){ if(tl.time() >= tl.duration() - .01){ go(0); return; } tl.paused() ? tl.play() : tl.pause(); return; }
  if(seg && seg.isActive()){ seg.pause(); return; }
  if(seg && seg.paused() && seg.progress() < 1){ seg.resume(); return; }
  next();
}
$("#play").onclick = toggle; $("#next").onclick = next; $("#prev").onclick = prev; $("#replay").onclick = () => go(0);
const fs = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {});
$("#fs").onclick = fs;
document.addEventListener("keydown", e => {
  if(e.target.closest && e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
  if(["ArrowRight", "PageDown", " "].includes(e.key)){ e.preventDefault(); next(); }
  else if(["ArrowLeft", "PageUp"].includes(e.key)){ e.preventDefault(); prev(); }
  else if(e.key === "f" || e.key === "F") fs();
  else if(e.key === "h" || e.key === "H") document.body.classList.toggle("ui-off");
  else if(e.key === "Home") go(0);
  else if(/^[1-9]$/.test(e.key) && +e.key <= N) go(+e.key - 1);
});
if(!WEB) $("#wrap").addEventListener("click", next);

/* ---------- modo vídeo: la locución marca el tiempo */
let vozActiva = false, au = null;
function enableVoz(){
  if(vozActiva) return; vozActiva = true;
  au = new Audio(A.audio); au.preload = "auto";
  let endAt = null, run = false;
  const clock = () => endAt !== null ? au.duration + (performance.now() - endAt)/1000 : au.currentTime;
  au.onended = () => { endAt = performance.now(); };
  vozOn = () => run;
  gsap.ticker.add(() => { if(!run) return; const t = Math.min(clock(), tl.duration()); tl.seek(t, false); if(t >= tl.duration() - .001){ run = false; endAt = null; } });
  const from = a => { tl.pause(); stopSeg(); endAt = null; au.currentTime = Math.min(a, FIN); tl.seek(a, false); };
  const play = () => { au.play().catch(() => {}); run = true; };
  const tg = () => { if(run){ au.pause(); run = false; return; } if(tl.time() >= tl.duration() - .01 || endAt !== null) from(0); play(); };
  $("#play").onclick = tg; $("#start span").onclick = tg; $("#replay").onclick = () => { from(0); play(); };
  $("#next").onclick = () => { const k = cur(); if(k + 1 < N){ from(labels[k + 1]); play(); } };
  $("#prev").onclick = () => { const k = cur(); from(labels[Math.max(0, k - (tl.time() - labels[k] < 1 ? 1 : 0))]); play(); };
  sbtn.forEach((b, i) => b.onclick = () => { from(labels[i]); play(); });
  $("#wrap").addEventListener("click", tg);
  document.addEventListener("keydown", e => {
    if(e.key === " "){ e.preventDefault(); e.stopImmediatePropagation(); tg(); }
    else if(e.key === "ArrowRight"){ e.stopImmediatePropagation(); $("#next").onclick(); }
    else if(e.key === "ArrowLeft"){ e.stopImmediatePropagation(); $("#prev").onclick(); }
    else if(/^[1-9]$/.test(e.key) && +e.key <= N){ e.stopImmediatePropagation(); sbtn[+e.key - 1].onclick(); }
  }, true);
  return {from, play};
}
if(VOZ && !reduced) enableVoz();

/* modo web: botón opcional de locución (arranca en silencio) */
const vb = document.createElement("button");
vb.id = "voz-btn"; vb.type = "button"; vb.hidden = true; vb.setAttribute("aria-pressed", "false"); document.body.appendChild(vb);
if(WEB && !VOZ && !q.get("render")){
  vb.hidden = false;
  const pinta = () => { const on = vozActiva && !au.muted; vb.textContent = on ? "🔇 Silenciar" : "🔊 Activar locución"; vb.setAttribute("aria-pressed", on); };
  vb.onclick = e => {
    e.stopPropagation();
    if(!vozActiva){ document.body.classList.remove("reduced"); tl.pause(); const v = enableVoz(); v.from(0); v.play(); }
    else au.muted = !au.muted;
    pinta();
  };
  pinta();
}

if(reduced){
  document.body.classList.add("reduced");
  tl.seek(FIN, false);
  $("#rm-play").onclick = () => { document.body.classList.remove("reduced"); go(0); if(!WEB) tl.play(); };
} else if(WEB && !VOZ){
  const io = new IntersectionObserver(es => es.forEach(en => { if(vozActiva) return; if(en.isIntersecting && tl.time() === 0) tl.play(); else if(!en.isIntersecting) tl.pause(); }), {threshold:.4});
  io.observe(svg);
}
let idleT; document.addEventListener("mousemove", () => { document.body.classList.remove("idle"); clearTimeout(idleT); idleT = setTimeout(() => { if(document.fullscreenElement) document.body.classList.add("idle"); }, 2500); });
window.MOTOR = {tl, items, a2t:a => a, cam:C, applyCam};
})();
