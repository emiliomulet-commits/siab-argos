# Presentaciones animadas de ARGOS

Cada infografía de la base gráfica (D01–D25) puede tener una versión animada en `presentaciones/dNN/`.

- `?modo=web`: arranca sola al verse y se reproduce de corrido (para incrustar en la web).
- Sin parámetro: modo presentación, escena a escena (→, espacio o clic avanza; ← retrocede; 1–7 salta; F pantalla completa; H oculta los controles).
- Con «reducir movimiento» activado en el dispositivo se muestra el diagrama completo, sin animación.

Animación con GSAP (`assets/gsap.min.js`, licencia estándar gratuita de GSAP). Iconos de línea de Lucide (licencia ISC) redibujados con el estilo de ARGOS.
El emblema de la UE se usa de forma informativa, sin sugerir vínculo ni aval de la UE (condiciones de uso por terceros de la Comisión Europea).

Generado con `build_d01.py`, `build_d02.py`, `build_d03.py`, `build_d04.py` y `build_d05.py` (fuera del repositorio). D01, D02, D03, D04 y D05 publicadas el 17/11/2026, pendientes de aprobación; no están enlazadas desde la web ni indexadas. Locución: ElevenLabs, voz Martín Osborne (`?modo=video`).
En D04, W3C VC y Gaia-X aparecen como etiquetas de texto, no como logotipos.
D05 con locución (`?modo=video`) y MP4. Fechas de D05 comprobadas: Reglamento (UE) 2026/1744 (alto riesgo IA, 2 dic 2027) y Reglamento (UE) 2025/327, art. 105 (EHDS).
Generado con `build_d01.py` (fuera del repositorio). Piloto D01 publicado el 17/11/2026, pendiente de aprobación; no está enlazado desde la web ni indexado.

## D06–D25 (motor genérico)

`assets/motor.js` anima el diagrama fijo de `/diagramas/` escena a escena (cámara, texto que se escribe, flechas que se dibujan, recuadros que se iluminan). Cada carpeta `dNN/` lleva `index.html` (escenas y tiempos), `voz.mp3` (locución ElevenLabs, voz Martin Osborne, modelo v4) y `argos-dNN.mp4` (1080p). Modos: presentación (por defecto), `?modo=web` (sin sonido) y `?modo=video` (con locución).
D03 y D04 con locución sincronizada (`add_voice.py`, fuera del repositorio) y MP4 desde el 17/11/2026.
D04 enlazada desde el visor de la web y con botón opcional «Activar locución» en `?modo=web` (como D01 y D05).
D02 y D03 con modo incrustado (`?embed=1`) y botón «Activar locución». Revisión del 17/11/2026: las 25 presentaciones cargan sin errores en los tres modos; enlazadas desde la web (visor y tarjetas, botón «Ver animación»).

## /normativa/ · Normativa europea en 4 minutos (22/11/2026)

Seis presentaciones animadas en español (RGPD y LOPDGDD, EHDS, Reglamento de IA, NIS2, Data Act y DGA, ENS e ISO 27001/27701), cada una con su página indexable en `/normativa/<norma>/`: reproductor ARGOS (se carga al pulsar), capítulos con enlace (`#t=segundos`), datos clave, transcripción completa, preguntas frecuentes, fuentes oficiales y código para incrustar. El reproductor está en `presentacion/` (con `noindex` y canonical a la página) y acepta `?t=` y el mensaje `{argosSeek: segundos}`.
Generadas con `build.py` y `norms.py` (fuera del repositorio): transcripción con faster-whisper, pósteres con el modo render. Sitemap propio en `/normativa/sitemap.xml` (enlazado desde robots.txt), catálogo en `presentaciones.json`, feed RSS y `llms-full.txt` con las transcripciones. Subtítulos `.vtt` para YouTube en cada carpeta.

## Normativa en 4 minutos en otros idiomas (22/11/2026)

Las mismas seis normas en alemán, francés, francés de Bélgica, italiano, neerlandés, neerlandés de Bélgica, portugués y danés, con la situación de cada país y su esquema nacional (C5, SecNumCloud, CyFun, ACN, BIO, QNRCS, ISO para el Estado danés) en lugar del ENS. Rutas: `/de/vorschriften/`, `/fr/reglementation/`, `/fr-be/reglementation/`, `/it/normativa/`, `/nl/regelgeving/`, `/nl-be/regelgeving/`, `/pt/normas/`, `/da/regler/`, cada una con índice, seis páginas, `feed.xml` y `llms-full.txt`.
Cada reproductor (`presentacion/`, `noindex` con canonical a la página) solo lleva su locución y música (`banda.mp3`, 96 kbps), `cfg.json` y `cues.json`; los clips, GSAP y el mapa (`/normativa/media/europe-intl.json`) se comparten con las versiones en español para no duplicar peso.
Todas las versiones están enlazadas entre sí con hreflang (x-default: español) y en `/normativa/sitemap.xml`. `presentaciones.json` incluye el campo `lang`. Las portadas de idioma enlazan sus normas con `i18n/normativa_links.py`, que hay que volver a ejecutar después de `i18n/build.py`.
Generado con `gen_web.py`, `web_i18n.py` y `post_web.py` (fuera del repositorio). Locución ElevenLabs; revisión por hablantes nativos recomendada.
