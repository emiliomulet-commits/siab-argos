# Marco normativo cubierto

ARGOS cubre el paquete normativo europeo de datos de forma integrada, con un catálogo normativo estructurado que traduce cada norma en obligaciones, controles y pruebas ejecutables.

## ¿Qué normas verifica ARGOS?

El paquete normativo europeo de datos completo: el RGPD y la LOPDGDD española, el Reglamento del Espacio Europeo de Datos de Salud (EHDS, Reglamento (UE) 2025/327), el Reglamento de Inteligencia Artificial (Reglamento (UE) 2024/1689), la Directiva NIS2, el Data Act y el Data Governance Act. Incorpora además marcos de seguridad de referencia como el Esquema Nacional de Seguridad (RD 311/2022) e ISO 27001/27701.

## ¿Cómo convierte ARGOS una norma jurídica en una prueba técnica?

Mediante la cadena de trazabilidad norma → obligación → control → evidencia → veredicto. Cada artículo se descompone en obligaciones concretas; cada obligación se traduce en uno o varios controles ejecutables; cada control produce evidencias técnicas; y sobre esas evidencias el motor de políticas emite un veredicto determinista. Por ejemplo, el principio de limitación del plazo de conservación del artículo 5.1.e del RGPD se descompone en controles que contrastan la retención declarada con los registros que realmente existen en cada repositorio.

## ¿Qué es el EHDS y por qué es tan relevante?

El Espacio Europeo de Datos de Salud (Reglamento (UE) 2025/327) está en vigor desde el 26 de marzo de 2025, con aplicación general a partir del 26 de marzo de 2027 y obligaciones escalonadas hasta 2035. Impone a los sistemas sanitarios obligaciones de interoperabilidad, acceso primario y secundario a datos de salud y gobernanza que van mucho más allá del RGPD. ARGOS incluye un perfil EHDS sanitario como vertical de lanzamiento, alineado con ese calendario.

## ¿Qué verifica ARGOS del Reglamento de IA?

Verifica las obligaciones aplicables a los sistemas de IA que la organización utiliza: registro de eventos, transparencia, supervisión humana, gestión de riesgos y documentación técnica, con especial atención a los sistemas de alto riesgo del anexo III, cuyas obligaciones serán exigibles desde el 2 de diciembre de 2027 (Reglamento (UE) 2026/1744). Además, ARGOS aplica sobre sí mismo esas mismas obligaciones de forma voluntaria.

## ¿Cubre ARGOS la normativa española?

Sí. Además de la LOPDGDD, ARGOS incorpora el Esquema Nacional de Seguridad, de obligado cumplimiento para el sector público español y sus proveedores, y los criterios de la AEPD. El catálogo normativo está diseñado para incorporar perfiles nacionales y sectoriales adicionales.

## ¿Cómo se mantiene actualizado el catálogo normativo?

El catálogo se distribuye como paquetes firmados, en sentido único y sin telemetría de retorno, de modo que la actualización no compromete la soberanía del despliegue. Cada informe registra el identificador y la versión exacta del catálogo utilizado, lo que permite saber siempre contra qué versión de la norma se verificó cada evidencia.

## ¿En qué formatos se expresa el catálogo normativo?

En estándares abiertos: OSCAL (Open Security Controls Assessment Language, del NIST) para catálogos de controles y perfiles, y ODRL (Open Digital Rights Language, del W3C) para políticas de uso de datos. Esto hace el catálogo auditable, interoperable y extensible por terceros cualificados.

## ¿Puedo añadir normativa propia, sectorial o contractual?

Sí. La arquitectura del catálogo permite definir perfiles adicionales: políticas internas, requisitos contractuales con clientes, códigos de conducta sectoriales o normativa de otros ámbitos. Una vez expresados como obligaciones y controles, el motor de retos y el motor de evaluación los tratan igual que al resto del catálogo.

## ¿Sirve ARGOS fuera de España?

El paquete normativo cubierto es de ámbito europeo, por lo que ARGOS es aplicable en cualquier Estado miembro. Los perfiles nacionales (como el ENS o la LOPDGDD en España) se gestionan como capas adicionales del catálogo, replicables para otras jurisdicciones.

## ¿Verifica ARGOS las transferencias internacionales de datos?

Sí. ARGOS construye el grafo de lineaje de los datos y detecta flujos hacia destinos fuera del Espacio Económico Europeo, cotejándolos con los instrumentos de transferencia registrados. También coteja los flujos hacia encargados del tratamiento con los contratos de encargo registrados y alerta de cualquier flujo sin cobertura contractual.
