/* ══════════════════════════════════════════════════════════════
   ARGOS · proxy de chat con IA · Cloudflare Worker
   Software in a Box · argos.softwareinabox.eu

   Configuración en Cloudflare (Settings → Variables and Secrets):
     ANTHROPIC_API_KEY  (secreto, obligatorio)  clave de la API de Anthropic
     MODEL              (texto, opcional)       por defecto claude-haiku-5-5
     LIMITE_DIA         (texto, opcional)       preguntas por visitante y día, por defecto 30
   Opcional: enlazar un KV namespace con el nombre LIMITES para que el
   límite diario sea exacto entre servidores de Cloudflare.

   Protocolo hacia el navegador (igual que el antiguo api/chat.php):
     POST /chat  {messages:[{role,content}], idioma:"es"|"en"}
     respuesta text/event-stream con líneas  data: {"t":"..."} · {"fin":true} · {"error":"..."}
   ══════════════════════════════════════════════════════════════ */

const ORIGENES = ['https://argos.softwareinabox.eu', 'http://localhost:8103'];
const KB_BASE = 'https://argos.softwareinabox.eu/kb/';
const KB_FILES = ['00-indice.md', '01-que-es-argos.md', '02-marco-normativo.md', '03-arquitectura-tecnologia.md',
  '04-soberania-seguridad.md', '05-despliegue-implantacion.md', '06-sectores-casos-uso.md', '07-certificaciones.md',
  '08-comercial-licenciamiento.md', '09-preguntas-dpo-ciso.md', '10-ecosistema-empresa.md', '11-operacion-campanas.md',
  '12-profundizacion-normativa.md', '13-integracion-tecnica.md', '14-preguntas-sectoriales.md', '15-objeciones-comparativas.md'];

const DIAGRAMAS = `B01-P02 = La brecha entre cumplimiento declarado y efectivo
B01-P03 = El motor de retos: verificación activa
B01-P04 = El sujeto sintético
B01-P08 = Los entregables de ARGOS
B01-P10 = Por qué ahora: la ventana regulatoria
B03-P01 = Arquitectura de siete capas (C0-C6)
B03-P02 = La IA propone, el motor dispone
B02-P02 = La cadena de trazabilidad normativa
B03-P08 = Verificación del borrado efectivo
B04-P06-07 = De la evidencia a la credencial verificable
B04-P02 = Nada sale del perímetro
B05-P01 = Tres tallas del Servidor Cognitivo
B05-P03 = Proceso de implantación
B11-P01 = El ciclo de una campaña de verificación
B11-P07 = Remediación verificada
B02-P01 = El mapa normativo que cubre ARGOS
B12-P04 = El calendario del EHDS
B12-P06-07 = Sistemas de IA de alto riesgo
B12-P19 = El solapamiento entre normas
B12-P17 = Una brecha de datos: 72 horas
B15-P01 = ARGOS y su plataforma GRC
B06-P03 = Sectores donde aplica ARGOS
B07-P01 = Certificaciones que persigue ARGOS
B06-P07 = ARGOS y los espacios de datos federados
B15-P07 = El retorno de la inversión`;

let KB_CACHE = null, KB_TIME = 0;          // caché en memoria del isolate
const memLimites = new Map();               // límite aproximado si no hay KV

function cors(origin) {
  const ok = ORIGENES.includes(origin) ? origin : ORIGENES[0];
  return { 'Access-Control-Allow-Origin': ok, 'Access-Control-Allow-Methods': 'POST, OPTIONS',
           'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400', 'Vary': 'Origin' };
}
function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(origin) } });
}

async function cargarKB() {
  if (KB_CACHE && Date.now() - KB_TIME < 3600_000) return KB_CACHE;
  const partes = await Promise.all(KB_FILES.map(async f => {
    const r = await fetch(KB_BASE + f, { cf: { cacheTtl: 3600, cacheEverything: true } });
    return r.ok ? `\n\n===== ${f} =====\n` + (await r.text()) : '';
  }));
  KB_CACHE = partes.join(''); KB_TIME = Date.now();
  return KB_CACHE;
}

async function dentroDeLimite(env, ip) {
  const limite = parseInt(env.LIMITE_DIA || '30', 10);
  const dia = new Date().toISOString().slice(0, 10);
  const clave = `l:${dia}:${ip}`;
  if (env.LIMITES) {
    const n = parseInt((await env.LIMITES.get(clave)) || '0', 10);
    if (n >= limite) return false;
    await env.LIMITES.put(clave, String(n + 1), { expirationTtl: 90000 });
    return true;
  }
  const n = memLimites.get(clave) || 0;
  if (n >= limite) return false;
  memLimites.set(clave, n + 1);
  if (memLimites.size > 5000) memLimites.clear();
  return true;
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(origin) });
    if (url.pathname === '/salud') return json({ ok: true, modelo: env.MODEL || 'claude-haiku-5-5', clave: !!env.ANTHROPIC_API_KEY }, 200, origin);
    if (url.pathname !== '/chat' || request.method !== 'POST') return json({ error: 'No encontrado' }, 404, origin);
    if (!ORIGENES.includes(origin)) return json({ error: 'Origen no permitido' }, 403, origin);
    if (!env.ANTHROPIC_API_KEY) return json({ error: 'El asistente aún no está configurado.' }, 500, origin);

    let cuerpo;
    try { cuerpo = await request.json(); } catch { return json({ error: 'Petición no válida' }, 400, origin); }
    const idioma = cuerpo.idioma === 'en' ? 'en' : 'es';
    const limpios = (Array.isArray(cuerpo.messages) ? cuerpo.messages : []).slice(-12)
      .map(m => ({ role: m && m.role === 'assistant' ? 'assistant' : 'user', content: String((m && m.content) || '').trim().slice(0, 2000) }))
      .filter(m => m.content);
    while (limpios.length && limpios[0].role !== 'user') limpios.shift();
    if (!limpios.length || limpios[limpios.length - 1].role !== 'user') return json({ error: 'Petición sin pregunta' }, 400, origin);

    const ip = request.headers.get('CF-Connecting-IP') || 'anon';
    if (!(await dentroDeLimite(env, ip))) {
      return json({ error: idioma === 'en'
        ? 'Daily question limit reached. Please come back tomorrow or write to emilio.mulet@softwareinabox.eu.'
        : 'Ha alcanzado el límite diario de preguntas. Vuelva mañana o escriba a emilio.mulet@softwareinabox.eu.' }, 429, origin);
    }

    const kb = await cargarKB();
    const reglaIdioma = idioma === 'en'
      ? 'Answer ALWAYS in English (the knowledge base is in Spanish: translate faithfully, never literally).'
      : 'Responde SIEMPRE en español.';
    const instrucciones = `Eres el asistente de la web de ARGOS, el agente de IA de cumplimiento normativo de datos (RGPD, EHDS, Reglamento de IA, NIS2, Data Act) de Software in a Box, en argos.softwareinabox.eu. ${reglaIdioma} Rigor técnico-jurídico y tono profesional sobrio. Máximo 5 frases por respuesta. Fundamenta cada respuesta EXCLUSIVAMENTE en la base de conocimiento adjunta; si algo no está en ella, dilo con honestidad y sugiere escribir a emilio.mulet@softwareinabox.eu. Nunca inventes cifras, fechas, precios, clientes ni características. No des asesoramiento jurídico personalizado: explica cómo ayuda ARGOS y remite al equipo para casos concretos. No pidas ni almacenes datos personales. Si te preguntan por otros temas ajenos a ARGOS, cumplimiento normativo o Software in a Box, indica amablemente que solo puedes hablar de ARGOS.
Al final de tu respuesta añade, cada una en su línea, estas etiquetas:
[FUENTE: nombre-del-archivo.md] — el archivo de la base que fundamenta la respuesta (uno o dos como máximo). Obligatoria si usaste la base.
[DIAGRAMA: clave] — solo si corresponde claramente a uno de los diagramas listados abajo (una sola clave, la más pertinente).
[SEGUIR: pregunta uno | pregunta dos] — dos preguntas de seguimiento breves y naturales, en el idioma de la conversación.
Claves de diagrama válidas (nunca inventes otras):
${DIAGRAMAS}`;

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: env.MODEL || 'claude-haiku-5-5', max_tokens: 900, stream: true,
        system: [
          { type: 'text', text: instrucciones },
          { type: 'text', text: 'BASE DE CONOCIMIENTO ARGOS:\n' + kb, cache_control: { type: 'ephemeral' } }
        ],
        messages: limpios
      })
    });
    if (!resp.ok || !resp.body) {
      let detalle = 'HTTP ' + resp.status;
      try { const j = await resp.json(); detalle = (j.error && j.error.message) || detalle; } catch {}
      console.log('anthropic_error', resp.status, detalle);
      return json({ error: (idioma === 'en' ? 'The assistant is not available right now. ' : 'El asistente no está disponible en este momento. ')
        + (idioma === 'en' ? 'Please try again later.' : 'Inténtelo más tarde.') }, 502, origin);
    }

    const enc = new TextEncoder(), dec = new TextDecoder();
    const { readable, writable } = new TransformStream();
    const w = writable.getWriter();
    const emitir = o => w.write(enc.encode('data: ' + JSON.stringify(o) + '\n\n'));
    ctx.waitUntil((async () => {
      const lector = resp.body.getReader(); let buf = '', hubo = false;
      try {
        while (true) {
          const { done, value } = await lector.read(); if (done) break;
          buf += dec.decode(value, { stream: true });
          let p;
          while ((p = buf.indexOf('\n')) !== -1) {
            const linea = buf.slice(0, p).trim(); buf = buf.slice(p + 1);
            if (!linea.startsWith('data:')) continue;
            let j; try { j = JSON.parse(linea.slice(5)); } catch { continue; }
            if (j.type === 'content_block_delta' && j.delta && j.delta.text) { hubo = true; await emitir({ t: j.delta.text }); }
            else if (j.type === 'error') { await emitir({ error: idioma === 'en' ? 'The assistant was interrupted. Please try again.' : 'El asistente se interrumpió. Inténtelo de nuevo.' }); }
          }
        }
        await emitir(hubo ? { fin: true } : { error: idioma === 'en' ? 'No answer received.' : 'No se recibió respuesta.' });
      } catch (e) {
        await emitir({ error: idioma === 'en' ? 'Connection lost.' : 'Se perdió la conexión.' });
      } finally { await w.close(); }
    })());
    return new Response(readable, { headers: { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache', ...cors(origin) } });
  }
};
