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
