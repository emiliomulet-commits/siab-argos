# Preguntas técnicas y jurídicas de DPO y CISO

Las preguntas que plantean los responsables de cumplimiento y seguridad antes de autorizar el despliegue de ARGOS.

## ¿Qué base jurídica necesito para desplegar ARGOS?

ARGOS es software que el responsable ejecuta en su propia infraestructura para cumplir sus obligaciones legales de responsabilidad proactiva (artículos 5.2, 24 y 32 del RGPD). No hay comunicación de datos a terceros ni nuevo encargado del tratamiento, lo que simplifica notablemente el análisis: el tratamiento que realiza ARGOS es un tratamiento interno del propio responsable con finalidad de verificación del cumplimiento.

## ¿El uso de sujetos sintéticos plantea algún problema de protección de datos?

No: los sujetos sintéticos son identidades ficticias que no corresponden a ninguna persona real, por lo que su tratamiento no afecta a ningún interesado. Es precisamente lo que permite probar el comportamiento real de los sistemas —propagación, acceso, borrado— sin generar riesgo para personas reales.

## ¿ARGOS accede a datos personales reales de mi organización?

Sí, en la fase de descubrimiento y clasificación: para localizar y clasificar los datos, los conectores de solo lectura inspeccionan los repositorios reales. Ese procesamiento ocurre íntegramente dentro del perímetro, con el modelo ejecutándose en local, aplicando minimización (se conservan clasificaciones y huellas, no copias masivas de contenido) y quedando el propio acceso de ARGOS registrado y auditado.

## ¿Debo hacer una DPIA antes de desplegar ARGOS?

Es una decisión del DPO según sus criterios de riesgo. La documentación de ARGOS facilita el análisis: descripción del tratamiento, flujos (ninguno externo), medidas de seguridad y garantías. En la práctica, muchos DPO documentan el despliegue como medida de garantía dentro de su marco de responsabilidad proactiva, y ARGOS les devuelve el favor generando borradores de DPIA para el resto de tratamientos.

## ¿Qué ocurre cuando ARGOS detecta un incumplimiento?

El hallazgo queda registrado con su evidencia y su veredicto, se incorpora al plan de remediación priorizado y se notifica a los perfiles internos configurados. ARGOS no comunica nada a ninguna autoridad ni a ningún tercero: la gestión del hallazgo —incluida la eventual notificación de una brecha— es siempre una decisión del responsable.

## ¿Las evidencias de ARGOS tienen valor ante la AEPD o ante un auditor?

Las evidencias se producen con sello temporal, cadena de custodia criptográfica y regla de evaluación explícita, y el informe se firma como credencial verificable. Eso las hace técnicamente íntegras y trazables, que es lo máximo que puede ofrecer una herramienta: su valoración corresponde a la autoridad o al auditor, que puede verificar por sí mismo que no han sido alteradas.

## Si un veredicto de ARGOS es erróneo, ¿quién responde?

ARGOS es una herramienta de apoyo bajo supervisión humana: los veredictos son deterministas y auditables (cada uno referencia la regla y la evidencia exactas), y las decisiones con efectos jurídicos las toma siempre el equipo de cumplimiento. Esa arquitectura —la IA propone, el motor dispone, el humano decide— está pensada precisamente para que el error sea detectable y corregible antes de producir consecuencias.

## ¿Cómo ejercita ARGOS los derechos de prueba sin perturbar a mi organización?

Las solicitudes de acceso o supresión de prueba se realizan sobre sujetos sintéticos y por los canales configurados, con identificación interna que permite a los equipos gestores saber que se trata de una verificación cuando así se decida. La organización elige entre pruebas anunciadas (verifican el circuito técnico) y no anunciadas (verifican además el proceso organizativo).

## ¿Cómo se integra ARGOS con mi SIEM y mis herramientas de seguridad?

A través de sus APIs: los hallazgos pueden remitirse al SIEM, las remediaciones al sistema de ticketing y los indicadores al cuadro de mando de riesgo. El CISO obtiene una fuente de señal nueva —el comportamiento real del dato frente a la norma— que ninguna herramienta de seguridad perimetral proporciona.

## ¿Qué garantías tengo de que ARGOS no es una puerta de entrada de riesgo?

Las mismas que ARGOS exige a los demás: conectores de solo lectura, sin conexión saliente, actualizaciones firmadas unidireccionales, plataforma endurecida conforme a ENS categoría alta e ISO 27001, registro de auditoría completo y auto-verificación (ARGOS ejecuta sus propias sondas sobre sí mismo). La superficie de exposición es la de un sistema interno más, y notablemente menor que la de cualquier alternativa en nube.
