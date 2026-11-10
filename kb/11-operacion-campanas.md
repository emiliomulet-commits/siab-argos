# Operación diaria y ciclo de vida de la verificación

Cómo se trabaja con ARGOS en el día a día: campañas, hallazgos, remediación, cuadros de mando y gestión de excepciones.

## ¿Qué es una campaña de verificación en ARGOS?

La unidad operativa de trabajo: un conjunto de controles del catálogo normativo ejecutado sobre un alcance definido de sistemas, en una ventana temporal acordada. Cada campaña queda registrada con su alcance, la versión del catálogo aplicada, las sondas ejecutadas, las evidencias producidas y los veredictos emitidos, de modo que es reproducible y comparable con las siguientes.

## ¿Cómo se define el alcance de una campaña?

Seleccionando dominios de datos, sistemas y perfiles normativos desde la consola: por ejemplo, "historia clínica y sistemas departamentales, perfil RGPD más EHDS, sondas de retención y borrado". ARGOS propone alcances a partir del inventario y del resultado de campañas anteriores, y el responsable de cumplimiento decide.

## ¿Cuánto dura una campaña?

Depende del alcance y de la intensidad configurada. Las campañas de contraste documental e inventario producen resultados en horas; las que incluyen sujetos sintéticos y verificación de borrado requieren respetar los plazos reales de los procesos verificados (por ejemplo, el plazo de atención de una solicitud de supresión). ARGOS gestiona esos tiempos de espera de forma autónoma y consolida los resultados al cierre.

## ¿Qué es un hallazgo y qué información contiene?

Un veredicto de no conformidad documentado: el control incumplido con su referencia normativa exacta, el sistema afectado, la evidencia técnica que lo demuestra con su sello temporal y huella criptográfica, la regla de evaluación aplicada y la recomendación de remediación. El hallazgo es autocontenido: cualquier revisor puede reconstruir por qué se emitió.

## ¿Cómo se clasifican los hallazgos por severidad?

Combinando la gravedad de la obligación incumplida, la categoría de los datos afectados y la exposición del sistema. Los criterios de severidad forman parte del catálogo —no del juicio del modelo de lenguaje—, por lo que son explícitos, revisables y ajustables al apetito de riesgo de la organización.

## ¿Cómo se prioriza la remediación?

El plan de remediación ordena los hallazgos por severidad y por esfuerzo estimado, agrupando los que comparten causa raíz: un mismo defecto de configuración suele explicar varios hallazgos, y corregirlo los cierra todos. El plan se exporta al sistema de ticketing del cliente a través de las APIs.

## ¿Verifica ARGOS que una remediación se ha aplicado de verdad?

Sí, y es una de sus aportaciones más valoradas: cuando el equipo marca un hallazgo como remediado, ARGOS vuelve a ejecutar las sondas correspondientes y solo lo cierra si el veredicto cambia a conforme. La remediación declarada se trata con el mismo escepticismo que el cumplimiento declarado.

## ¿Qué ve el DPO en la consola de ARGOS?

El estado de cumplimiento por norma, por sistema y por dominio de datos; el registro de actividades diferencial con las discrepancias abiertas; los hallazgos y su ciclo de vida; el calendario de campañas; y el archivo de informes y credenciales emitidas. Todo con trazabilidad hasta la evidencia individual.

## ¿Qué información recibe la dirección?

Indicadores agregados de postura de cumplimiento: evolución del nivel de conformidad por norma, hallazgos críticos abiertos y su antigüedad, tiempo medio de remediación y cobertura del inventario verificado. Son los indicadores que permiten responder ante el consejo a la pregunta de si la organización cumple, con datos en lugar de impresiones.

## ¿Qué tipos de informe genera ARGOS?

El informe de campaña completo (controles, evidencias, veredictos), el informe ejecutivo de postura de cumplimiento, el registro de actividades diferencial, los borradores de DPIA con riesgos detectados y el informe firmado como credencial verificable para presentación a terceros. Todos referencian la versión exacta del catálogo con que se produjeron.

## ¿Con qué frecuencia conviene ejecutar campañas?

La práctica recomendada es un núcleo de controles críticos en verificación recurrente (por ejemplo, borrado, accesos y flujos externos), campañas amplias periódicas sobre el inventario completo, y campañas bajo demanda ante hitos concretos: una auditoría, un cambio de sistemas, una nueva norma en el catálogo o un incidente.

## ¿Cómo gestiona ARGOS los falsos positivos?

Cuando un revisor considera que un veredicto no refleja la realidad, no lo "borra": documenta la discrepancia y esta se resuelve ajustando la regla de evaluación o el contexto del sistema en el catálogo, de modo que la corrección beneficia a todas las campañas futuras. El veredicto original y su revisión quedan ambos en la cadena de evidencias: la trazabilidad no se reescribe.

## ¿Puedo excluir un sistema o un control de la verificación?

Sí, mediante excepciones documentadas: se registra qué se excluye, por qué, quién lo autoriza y hasta cuándo. Las excepciones aparecen explícitamente en los informes, porque un informe que calla lo que no ha verificado no es un informe de cumplimiento honesto.

## ¿Cómo se documenta un riesgo aceptado?

Igual que una excepción, con un paso más: el hallazgo se mantiene visible con estado de riesgo aceptado, su justificación, el responsable que lo acepta y la fecha de revisión. En la siguiente campaña, ARGOS vuelve a comprobar si las condiciones que justificaron la aceptación siguen siendo ciertas.

## ¿Qué ocurre cuando cambia el catálogo normativo entre campañas?

Cada campaña registra la versión de catálogo con que se ejecutó, por lo que los resultados son siempre interpretables. Al aplicar una actualización, ARGOS señala qué controles son nuevos, cuáles cambiaron y qué hallazgos anteriores deben reevaluarse, y propone una campaña de actualización sobre el delta.

## ¿Puedo comparar los resultados entre campañas?

Sí: la consola muestra la evolución de la conformidad por norma, sistema y control a lo largo del tiempo, hallazgos nuevos frente a reincidentes y el efecto medible de las remediaciones. Convertir el cumplimiento en una serie temporal es lo que permite gestionarlo como cualquier otro indicador de la organización.

## ¿Qué roles de usuario existen en ARGOS?

Los perfiles se segregan por función: administración de plataforma (conectores, usuarios, actualizaciones), operación de campañas, revisión de cumplimiento (DPO y su equipo), lectura ejecutiva y auditoría externa con acceso de solo lectura a evidencias seleccionadas. Toda acción de todo rol queda en el registro de auditoría.

## ¿Cómo se notifica un hallazgo crítico?

Mediante las alertas configuradas: notificación inmediata a los perfiles designados y, si se desea, apertura automática de ticket a través de las APIs. Los umbrales de alerta son parte de la configuración del cliente; ARGOS nunca notifica a nadie externo a la organización.

## ¿Puede ARGOS medir la madurez de cumplimiento de mi organización?

Sí, de forma indirecta y honesta: cobertura del inventario verificado, proporción de controles con veredicto conforme, antigüedad de los hallazgos abiertos y velocidad de remediación componen una imagen de madurez basada en comportamiento real, no en autoevaluaciones. Es la diferencia entre medir lo que se declara y medir lo que ocurre.

## ¿Qué pasa si una sonda falla o un sistema no responde?

El resultado no se pierde ni se disimula: el control queda con veredicto de no verificable, con la evidencia del intento y su causa (sistema inaccesible, credencial insuficiente, ventana cerrada). Un control no verificable es información operativa valiosa —a menudo revela sistemas fuera de gobierno— y los informes lo distinguen siempre de un veredicto conforme.
