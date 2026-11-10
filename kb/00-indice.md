# Base de conocimiento ARGOS — Índice y guía de uso

Base de conocimiento para el asistente conversacional de ARGOS, orientada a nuevos usuarios y usuarios potenciales. Versión 2.0 — septiembre 2026. Total: 194 pares pregunta-respuesta (94 base + 100 del programa de enriquecimiento en 5 fases, completado).

## Estructura

1. `01-que-es-argos.md` — Qué es ARGOS y propuesta de valor (12 preguntas)
2. `02-marco-normativo.md` — Marco normativo cubierto (10 preguntas)
3. `03-arquitectura-tecnologia.md` — Arquitectura y tecnología (10 preguntas)
4. `04-soberania-seguridad.md` — Soberanía, seguridad y confidencialidad (10 preguntas)
5. `05-despliegue-implantacion.md` — Despliegue e implantación (10 preguntas)
6. `06-sectores-casos-uso.md` — Sectores y casos de uso (8 preguntas)
7. `07-certificaciones.md` — Certificaciones y confianza (8 preguntas)
8. `08-comercial-licenciamiento.md` — Aspectos comerciales y licenciamiento (9 preguntas)
9. `09-preguntas-dpo-ciso.md` — Preguntas técnicas y jurídicas de DPO y CISO (10 preguntas)
10. `10-ecosistema-empresa.md` — Ecosistema, quién está detrás y hoja de ruta (7 preguntas)
11. `11-operacion-campanas.md` — Operación diaria y ciclo de vida de la verificación (20 preguntas) *(Fase 1 de enriquecimiento)*
12. `12-profundizacion-normativa.md` — Profundización normativa: EHDS, Reglamento de IA, NIS2, Data Act y DGA (20 preguntas) *(Fase 2 de enriquecimiento)*
13. `13-integracion-tecnica.md` — Integración técnica avanzada (20 preguntas) *(Fase 3 de enriquecimiento)*
14. `14-preguntas-sectoriales.md` — Preguntas sectoriales, dos por sector (20 preguntas) *(Fase 4 de enriquecimiento)*
15. `15-objeciones-comparativas.md` — Objeciones comerciales y comparativas (20 preguntas) *(Fase 5 de enriquecimiento)*

## Guía de uso para el chatbot (RAG)

- Cada archivo comienza con un párrafo de contexto del bloque; cada pregunta (`##`) con su respuesta forma una unidad autocontenida. Recomendación de troceado (chunking): un chunk por pareja pregunta-respuesta, con el título del bloque como metadato.
- Las respuestas están redactadas en el tono de la voz de producto: profesional, directo, sin promesas no documentadas.
- Datos que el chatbot NO debe inventar: precios concretos, plazos de entrega comprometidos, nombres de clientes, resultados de certificaciones aún no obtenidas. Ante estas preguntas, remitir a los canales de contacto.
- Mensajes clave transversales que conviene reforzar en cualquier respuesta: (1) verificación activa frente a cumplimiento documental; (2) nada sale del perímetro del cliente; (3) la IA propone, el motor dispone; (4) el informe es una credencial verificable Gaia-X.

## Mantenimiento

Actualizar cuando cambien: el estado de las certificaciones, el calendario regulatorio (EHDS, Reglamento de IA), las tallas del Servidor Cognitivo, el modelo comercial o la lista de sectores con casos de uso publicados.
