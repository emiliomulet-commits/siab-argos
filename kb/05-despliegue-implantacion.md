# Despliegue e implantación

ARGOS se entrega como appliance sobre el Servidor Cognitivo en tres tallas de configuración, y su implantación sigue un proceso ordenado que no interfiere con la operación del cliente.

## ¿Qué hardware necesita ARGOS?

ARGOS se distribuye sobre el Servidor Cognitivo (COGNITIV), la plataforma de IA soberana on-premise que Software in a Box distribuye con Lenovo sobre la base ThinkSystem SR675 V3. Se ofrece en tres tallas de configuración, dimensionadas según el volumen de sistemas a verificar, el tamaño del inventario de datos y la intensidad de las campañas de reto.

## ¿Puedo desplegar ARGOS sobre mi propio hardware?

Sí, sobre hardware equivalente del cliente que cumpla los requisitos de la talla correspondiente, incluida la capacidad de inferencia local para el modelo de lenguaje. La especificación técnica de producto detalla los requisitos de cada talla.

## ¿Cómo es el proceso de implantación?

En fases ordenadas: instalación del appliance y alta de conectores de solo lectura; inventario inicial de sistemas; clasificación de datos personales y construcción del grafo de lineaje; contraste con el registro de actividades declarado; y, a partir de ahí, campañas de reto sobre los controles priorizados. El cliente ve valor desde la primera fase, con el inventario y el RoPA diferencial, antes incluso de la primera campaña.

## ¿Qué accesos necesita ARGOS a mis sistemas?

Credenciales de solo lectura sobre los sistemas incluidos en el alcance: bases de datos, repositorios de ficheros, aplicaciones corporativas y plataformas de identidad. La pasarela de conectores gestiona esas credenciales de forma centralizada y auditada, y nunca solicita permisos de escritura o administración.

## ¿Afecta ARGOS al rendimiento de los sistemas en producción?

Las sondas están diseñadas para ser ligeras y ejecutarse de forma controlada, con ventanas de ejecución y límites de intensidad configurables por sistema. La organización decide cuándo y con qué agresividad se ejecuta cada campaña.

## ¿La verificación es continua o bajo demanda?

Ambas. ARGOS opera por campañas: pueden programarse de forma recurrente (verificación continua de los controles críticos), lanzarse bajo demanda (antes de una auditoría, tras un cambio de sistemas) o combinarse. Cada campaña queda registrada con su alcance, su catálogo y sus resultados.

## ¿Qué equipo necesito por mi parte?

Un interlocutor de sistemas para el alta de conectores y un responsable de cumplimiento (habitualmente el DPO) que revise hallazgos y priorice remediaciones. ARGOS automatiza la recogida y evaluación; las decisiones siguen siendo del equipo del cliente.

## ¿Qué pasa con los sujetos sintéticos después de las pruebas?

Al cierre de cada campaña, ARGOS elimina todos los sujetos sintéticos introducidos y ejecuta una verificación de borrado sobre ellos mismos, aplicándose el mismo estándar que exige a los sistemas del cliente. El ciclo completo queda registrado en la cadena de evidencias.

## ¿Cómo se despliega en organizaciones con varios centros o sedes?

El alcance se modela por sistemas y dominios de datos, no por ubicaciones físicas, de modo que un único despliegue puede cubrir varias sedes conectadas. Para grupos con perímetros de red separados, pueden operarse varios appliances con catálogos y perfiles normativos coherentes.

## ¿Qué mantenimiento requiere?

Actualizaciones del software y del catálogo normativo mediante paquetes firmados que el cliente aplica en sentido único, sin conexión de retorno. La capa de operación incluye la monitorización del propio appliance, las copias de seguridad de la cadena de evidencias y los procedimientos de recuperación.
