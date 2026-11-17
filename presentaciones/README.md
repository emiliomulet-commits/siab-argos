# Presentaciones animadas de ARGOS

Cada infografía de la base gráfica (D01–D25) puede tener una versión animada en `presentaciones/dNN/`.

- `?modo=web`: arranca sola al verse y se reproduce de corrido (para incrustar en la web).
- Sin parámetro: modo presentación, escena a escena (→, espacio o clic avanza; ← retrocede; 1–7 salta; F pantalla completa; H oculta los controles).
- Con «reducir movimiento» activado en el dispositivo se muestra el diagrama completo, sin animación.

Animación con GSAP (`assets/gsap.min.js`, licencia estándar gratuita de GSAP). Iconos de línea de Lucide (licencia ISC) redibujados con el estilo de ARGOS.
El emblema de la UE se usa de forma informativa, sin sugerir vínculo ni aval de la UE (condiciones de uso por terceros de la Comisión Europea).

Generado con `build_d01.py` (fuera del repositorio). Piloto D01 publicado el 17/11/2026, pendiente de aprobación; no está enlazado desde la web ni indexado.

## D06–D25 (motor genérico)

`assets/motor.js` anima el diagrama fijo de `/diagramas/` escena a escena (cámara, texto que se escribe, flechas que se dibujan, recuadros que se iluminan). Cada carpeta `dNN/` lleva `index.html` (escenas y tiempos), `voz.mp3` (locución ElevenLabs, voz Martin Osborne, modelo v4) y `argos-dNN.mp4` (1080p). Modos: presentación (por defecto), `?modo=web` (sin sonido) y `?modo=video` (con locución).
