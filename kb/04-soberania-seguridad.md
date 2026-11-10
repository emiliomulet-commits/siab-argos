# Soberanía, seguridad y confidencialidad

ARGOS trata la información más sensible que existe sobre una organización: el mapa completo de sus datos y sus debilidades de cumplimiento. Por eso el diseño parte de un principio innegociable: nada sale del perímetro del cliente.

## ¿Dónde se instala ARGOS?

Íntegramente on-premise o en la nube privada del cliente. No existe modalidad SaaS: el mapa de datos, los hallazgos y las evidencias de una organización no deben residir en la nube de un proveedor.

## ¿Sale algún dato del perímetro de mi organización?

No. Ningún dato, metadato ni evidencia sale del perímetro. Las actualizaciones del catálogo normativo se distribuyen como paquetes firmados en sentido único, sin telemetría de retorno. El proveedor no ve, ni puede ver, los resultados de las verificaciones.

## ¿El modelo de inteligencia artificial también es local?

Sí. El modelo de lenguaje se ejecuta localmente sobre la infraestructura del Servidor Cognitivo que distribuye Software in a Box, o sobre hardware equivalente del cliente. Ninguna consulta al modelo viaja a servicios externos.

## ¿ARGOS es un encargado del tratamiento?

No, y esa es una diferencia jurídica importante. ARGOS no es un nuevo encargado al que haya que transferir datos: es software que el propio responsable ejecuta en su infraestructura. Esto simplifica la base jurídica del despliegue, elimina la necesidad de cláusulas de transferencia internacional y permite auditar sistemas que, por su sensibilidad, nunca podrían conectarse a un servicio externo.

## ¿Puede ARGOS modificar o dañar mis sistemas?

No. Todos los conectores de ARGOS a los sistemas del cliente son de solo lectura por diseño. Las únicas escrituras que realiza el módulo de reto son la introducción controlada de sujetos sintéticos por los canales de entrada habituales, y esas identidades se eliminan y se verifica su borrado al cierre de cada campaña.

## ¿Cómo se protege la integridad de las evidencias?

Cada evidencia se registra en una cadena de huellas criptográficas de solo escritura (append-only, SHA-256), de modo que cualquier alteración posterior es detectable. La cadena de custodia de cada evidencia —qué sonda la produjo, cuándo, sobre qué sistema y contra qué versión del catálogo— queda registrada de extremo a extremo.

## ¿Qué es la credencial verificable del informe?

Al concluir la verificación, el informe se firma como credencial verificable (W3C Verifiable Credential) que contiene la huella raíz de la cadena de evidencias, el identificador del catálogo normativo utilizado, su versión y el perfil aplicado. El mecanismo reutiliza el marco de confianza Gaia-X: notarización, atestación y emisión de credenciales.

## ¿Quién puede verificar esa credencial y qué ve exactamente?

El cliente decide a quién la presenta. Un auditor puede verificar que las evidencias no han cambiado; un socio de espacio de datos puede exigirla como condición de acceso; una autoridad de control puede comprobar la integridad del expediente. En ningún caso es necesario exponer las evidencias mismas: la credencial demuestra integridad sin revelar contenido.

## ¿ARGOS cumple consigo mismo la normativa que verifica?

Sí, por diseño. Aunque ARGOS no encaja en las categorías de alto riesgo del anexo III del Reglamento de IA, asume voluntariamente las obligaciones de los artículos 12 (registro de eventos), 13 (transparencia) y 14 (supervisión humana). Además, la última fase del programa de ingeniería es la auto-verificación: ARGOS ejecuta sus propias sondas sobre sí mismo y emite su propio informe de conformidad.

## ¿Cómo se controla el acceso a la consola de ARGOS?

Mediante la capa de seguridad de plataforma: autenticación robusta, control de acceso por roles, registro de auditoría de todas las acciones y segregación entre los perfiles de operación, revisión y administración. El acceso a hallazgos y evidencias queda trazado con el mismo rigor que ARGOS exige a los sistemas que verifica.
