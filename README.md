# ARGOS · argos.softwareinabox.eu

Web y asistente del producto **ARGOS** (agente de cumplimiento verificado RGPD · EHDS · Reglamento de IA), una de las líneas de **Software in a Box** (https://www.softwareinabox.eu).

- Publicación: GitHub Pages (rama `main`) con dominio `argos.softwareinabox.eu`, detrás de Cloudflare.
- El asistente responde en el navegador con la base de 194 preguntas y respuestas y los 25 diagramas.
- La capa de IA generativa y los formularios necesitan un servidor. En esta versión estática `window.ARGOS_API = false`: las preguntas fuera de la base invitan a pedir demo y los formularios abren el correo. Para activarla, publicar un proxy (p. ej. Cloudflare Worker en `/api/`) y poner `ARGOS_API = true`.
