# Integración técnica avanzada

Preguntas de arquitectos, responsables de sistemas y equipos de infraestructura sobre cómo ARGOS se conecta, escala y convive con el parque tecnológico real.

## ¿Qué tipos de sistemas puede conectar ARGOS?

Las familias habituales del parque corporativo: bases de datos relacionales y NoSQL, almacenes analíticos, repositorios de ficheros y documentales, servidores de correo, aplicaciones corporativas y ERPs, plataformas de identidad y directorios, y servicios en nube contratados por el cliente. La capa de conectores está diseñada como pasarela extensible: el catálogo de conectores crece con el producto.

## ¿Cómo se conecta ARGOS a mis bases de datos?

Con cuentas dedicadas de solo lectura, creadas por el cliente con los privilegios mínimos, gestionadas de forma centralizada en la pasarela de conectores y rotables según la política del cliente. Cada consulta que ARGOS ejecuta queda registrada, de modo que el equipo de sistemas puede auditar exactamente qué ha leído la herramienta y cuándo.

## ¿Puede inspeccionar documentos y contenido no estructurado?

Sí: la clasificación de datos personales opera también sobre texto libre en repositorios documentales y de ficheros, ejecutando los modelos de reconocimiento en local. El contenido no estructurado es precisamente donde se esconden los datos personales que ningún registro de actividades declara —exportaciones, adjuntos, copias de trabajo— y donde el descubrimiento aporta más valor.

## ¿Se integra con mi directorio y mi plataforma de identidad?

Sí, en dos sentidos: como fuente de verificación —cotejar quién puede acceder a qué frente a los perfiles autorizados es una familia de sondas central— y como mecanismo de autenticación de los usuarios de la propia consola de ARGOS, delegando en el proveedor de identidad corporativo.

## ¿Qué pasa con los servicios SaaS que usa mi organización?

ARGOS los verifica a través de sus APIs con credenciales de solo lectura del propio cliente: inventaría qué datos residen en cada servicio, quién accede y qué flujos existen. La información obtenida permanece en el appliance, dentro del perímetro. Verificar el SaaS es imprescindible: es donde el dato corporativo sale de la vista de sistemas, y donde más flujos sin cobertura contractual afloran.

## ¿Puedo desarrollar conectores propios para aplicaciones a medida?

Sí. La pasarela de conectores expone un marco de desarrollo para que el equipo del cliente o un integrador construya conectores hacia aplicaciones propias, siempre bajo las mismas reglas de la plataforma: solo lectura, credenciales gestionadas, registro de cada operación y evidencias con el formato estándar de la cadena.

## ¿Funciona ARGOS en entornos híbridos, con sistemas locales y en nube?

Sí; es de hecho el escenario más común. El appliance se despliega en el perímetro del cliente y alcanza tanto los sistemas locales como los servicios en nube contratados, construyendo un único inventario y un único grafo de flujos que cruza ambos mundos. Ver el dato saltar del CPD a la nube y viceversa en un mismo grafo es una de las vistas más reveladoras para el DPO.

## ¿Puede desplegarse ARGOS en mi nube privada?

Sí: la alternativa al appliance físico es el despliegue sobre la nube privada o el entorno dedicado del cliente, siempre que cumpla los requisitos de la talla correspondiente, incluida la capacidad de inferencia para el modelo local. El principio no cambia: la infraestructura es del cliente y nada sale de ella.

## ¿Cómo trata ARGOS los sistemas legacy sin APIs modernas?

Con enfoque pragmático y gradual: conectores de base de datos cuando el legado se apoya en motores accesibles, inspección de exportaciones y ficheros de intercambio cuando no, y registro explícito como "no conectable" cuando ninguna vía es viable. Un sistema legado que queda fuera del alcance aparece señalado en los informes: la limitación se documenta, nunca se disimula.

## ¿Cómo maneja redes segmentadas o zonas de alta seguridad?

El despliegue respeta la segmentación del cliente: la pasarela de conectores puede operar con sondas satélite en segmentos aislados que remiten evidencias al núcleo por los canales autorizados, y las zonas que la política del cliente declare inalcanzables se registran como fuera de alcance. ARGOS se adapta a la arquitectura de seguridad existente, no al revés.

## ¿Qué requisitos de red tiene el appliance?

Conectividad interna hacia los sistemas del alcance por los puertos que cada conector requiera, y ningún requisito de salida a Internet: las actualizaciones llegan como paquetes firmados que el cliente introduce por su procedimiento habitual. La ausencia de conexión saliente no es una limitación a tolerar sino una propiedad verificable del producto.

## ¿Cómo escala ARGOS cuando hay miles de sistemas y terabytes de datos?

Con inventario incremental, muestreo estratificado configurable en la clasificación y campañas por dominios: no es necesario clasificar cada byte para tener un mapa fiable, y los controles críticos se verifican de forma exhaustiva donde importa. Las tallas del Servidor Cognitivo dimensionan la capacidad de clasificación e inferencia según el volumen del parque.

## ¿El inventario se reconstruye entero en cada campaña?

No: tras la construcción inicial, el inventario se mantiene de forma incremental detectando altas, bajas y cambios en los sistemas y en los esquemas de datos. Los cambios de inventario son en sí mismos una señal de cumplimiento: un sistema nuevo sin responsable ni tratamiento declarado es un hallazgo antes incluso de clasificar su contenido.

## ¿Necesito GPU? ¿Qué rendimiento tiene la IA local?

La capacidad de inferencia está incluida en el dimensionamiento de las tres tallas del Servidor Cognitivo, calculadas para los modelos de clasificación y el modelo de lenguaje que ARGOS ejecuta en local. En despliegues sobre hardware propio, la especificación técnica detalla los requisitos equivalentes por talla; el rendimiento condiciona la velocidad de clasificación, nunca la validez de los veredictos, que son deterministas.

## ¿Cuántas campañas pueden ejecutarse en paralelo?

Varias, con planificación de recursos por el orquestador: campañas de contraste documental conviven con campañas de sondas activas, y los límites de intensidad por sistema se respetan de forma global para que dos campañas no sumen carga sobre el mismo sistema productivo. La concurrencia efectiva depende de la talla y de las ventanas configuradas.

## ¿Cómo clasifica ARGOS datos personales en texto libre?

Con una cadena de reconocimiento local que combina detección de entidades y patrones (sobre la base de Presidio y GLiNER) con el contexto del repositorio: no es lo mismo un nombre en una tabla de clientes que en una plantilla de ejemplo. Cada clasificación conserva su nivel de confianza y su procedencia, y alimenta el grafo de inventario sin copiar el contenido clasificado.

## ¿Funciona en varios idiomas?

Sí: los modelos de clasificación operan en español y en los principales idiomas europeos, y el catálogo normativo es independiente del idioma de los datos. En organizaciones multinacionales, el mismo despliegue clasifica repositorios en varios idiomas bajo un único perfil normativo.

## ¿Cómo se controlan los falsos positivos de clasificación?

Con umbrales de confianza configurables, revisión humana de las clases dudosas desde la consola y retroalimentación al contexto del catálogo: una corrección validada (por ejemplo, "este campo es un identificador interno, no un documento de identidad") se aplica a todo el inventario y persiste en campañas futuras. La clasificación mejora con el uso sin que ningún dato salga del perímetro.

## ¿Qué formatos de exportación e integración ofrece ARGOS?

APIs para hallazgos, remediaciones e indicadores; remisión de eventos al SIEM; apertura de tickets en las herramientas ITSM del cliente; exportación del catálogo y los resultados en OSCAL; y las credenciales verificables W3C para presentación a terceros. Los formatos estándar son deliberados: los resultados de ARGOS deben poder viajar sin depender de ARGOS.

## ¿Cómo convive ARGOS con mi plataforma GRC ya implantada?

Como su fuente de evidencia activa: la plataforma GRC conserva el gobierno de riesgos, políticas y flujos de trabajo, y ARGOS le entrega por API lo que ninguna GRC produce por sí misma —veredictos con evidencia técnica del comportamiento real del dato—. La integración habitual mapea los controles de la GRC contra los del catálogo de ARGOS para que cada evidencia alimente el control correspondiente.
