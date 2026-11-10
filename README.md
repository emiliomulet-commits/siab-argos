# ARGOS · argos.softwareinabox.eu

Web y asistente del producto **ARGOS** (agente de cumplimiento verificado RGPD · EHDS · Reglamento de IA), una de las líneas de **Software in a Box** (https://www.softwareinabox.eu).

- Publicación: GitHub Pages (rama `main`) con dominio `argos.softwareinabox.eu`, detrás de Cloudflare.
- El asistente responde en el navegador con la base de 194 preguntas y respuestas y los 25 diagramas.
- La capa de IA generativa y los formularios necesitan un servidor. En esta versión estática `window.ARGOS_API = false`: las preguntas fuera de la base invitan a pedir demo y los formularios abren el correo. Para activarla, publicar un proxy (p. ej. Cloudflare Worker en `/api/`) y poner `ARGOS_API = true`.

## Idiomas
El español es la fuente (páginas de la raíz). Las versiones `/en/`, `/fr/`, `/de/`, `/nl/`, `/pt/` e `/it/` se generan con `i18n/build.py` a partir de `i18n/<idioma>.json`, y el mismo script añade hreflang, canonical, selector de idioma y `sitemap.xml`. Tras editar una página en español: `python3 i18n/build.py extract`, traducir los textos nuevos y `python3 i18n/build.py build`. No editar a mano las carpetas de idioma.
