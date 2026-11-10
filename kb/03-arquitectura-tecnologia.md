# Arquitectura y tecnología

ARGOS se organiza en siete capas funcionales y se rige por un principio de diseño central: la IA propone, el motor dispone. El programa de ingeniería completo comprende 100 componentes (ARG-001 a ARG-100) desarrollados en diez fases.

## ¿Cómo está estructurada la arquitectura de ARGOS?

En siete capas (C0 a C6): evidencia y confianza (registro criptográfico y credenciales); catálogo normativo (OSCAL, ODRL); descubrimiento y clasificación (inventario de sistemas y localización de datos personales); orquestación agéntica (planificación de campañas con LLM local); módulo de reto (sujetos sintéticos y siete familias de sondas); motor de evaluación (políticas deterministas); e informes y remediación.

## ¿Qué significa "la IA propone, el motor dispone"?

Es el principio rector de todo el diseño. El modelo de lenguaje planifica campañas, interpreta contexto y redacta informes, pero nunca decide un veredicto de conformidad. Los veredictos los emite exclusivamente un motor de políticas determinista (OPA/Rego) que evalúa evidencias técnicas contra reglas explícitas y auditables. Esto elimina el riesgo de que una "alucinación" del modelo se convierta en una conclusión jurídica.

## ¿Qué es el motor de retos?

El módulo que ejecuta pruebas activas sobre los sistemas del cliente mediante siete familias de sondas: introducción y seguimiento de sujetos sintéticos, ejercicio de derechos de prueba (acceso, supresión), verificación de borrado efectivo, contraste de retención, verificación de cifrado y controles de acceso, detección de flujos y lineaje, y comprobación de trazabilidad. Cada sonda produce evidencias con sello temporal que alimentan el motor de evaluación.

## ¿Qué tecnologías de base utiliza ARGOS?

Componentes de código abierto consolidados, integrados en un producto coherente: OpenMetadata para el inventario y catálogo de datos; Presidio y GLiNER para la detección y clasificación de datos personales; LangGraph y una pasarela MCP (Model Context Protocol) para la orquestación agéntica; OPA/Rego como motor de políticas; Auditree para la recogida de evidencias; y Eclipse XFSC junto con credenciales verificables W3C para el marco de confianza Gaia-X.

## ¿Cómo descubre ARGOS dónde están los datos personales?

Primero inventaría los sistemas mediante conectores de solo lectura (bases de datos, repositorios de ficheros, aplicaciones corporativas). Después clasifica su contenido con modelos de reconocimiento de datos personales que se ejecutan localmente, y construye un grafo de inventario y lineaje que muestra qué datos existen, dónde residen y por dónde fluyen.

## ¿Qué es el RoPA diferencial?

El registro de actividades de tratamiento que ARGOS genera desde el catálogo técnico real y coteja con el registro declarado por la organización. Las diferencias —tratamientos no declarados, sistemas no inventariados, flujos no documentados— afloran de forma automática, convirtiendo un documento estático que se desactualiza en un contraste continuo con la realidad.

## ¿Genera ARGOS evaluaciones de impacto (DPIA)?

Genera borradores de DPIA con los riesgos efectivamente detectados en los sistemas, que el DPO revisa y completa. El borrador parte de evidencia técnica real —no de plantillas genéricas—, lo que reduce drásticamente el trabajo de elaboración y aumenta la calidad del análisis.

## ¿Cómo verifica ARGOS que un borrado se ha producido realmente?

Ejercita una solicitud de supresión sobre un sujeto sintético y, transcurrido el plazo, vuelve a inspeccionar cada repositorio donde ese sujeto había aparecido: bases de datos primarias, réplicas, índices de búsqueda, exportaciones y copias. Si el dato persiste en cualquiera de ellos, el motor de evaluación emite un veredicto de no conformidad con la evidencia exacta de dónde sigue existiendo.

## ¿Qué son los 100 componentes de ARGOS?

El programa de ingeniería completo del producto: 100 componentes (ARG-001 a ARG-100) organizados en diez fases de desarrollo, desde los cimientos de plataforma y los conectores de solo lectura hasta la ontología normativa, el motor de retos, la IA local, la evidencia y credencial, la consola y APIs, la seguridad de plataforma y la operación y despliegue. La fase final incluye la auto-verificación: ARGOS verifica a ARGOS con sus propias sondas.

## ¿Ofrece ARGOS APIs de integración?

Sí. La consola de administración se apoya en APIs que permiten integrar los resultados con las herramientas del cliente: sistemas de ticketing para la remediación, cuadros de mando de riesgo, SIEM y plataformas GRC existentes. ARGOS complementa esas plataformas aportándoles la evidencia activa de la que carecen.
