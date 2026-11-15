# ARGOS · proxy de chat con IA (Cloudflare Worker)

Recibe las preguntas del chat de argos.softwareinabox.eu, añade la base de conocimiento (`/kb/*.md`) y consulta el modelo de Anthropic. Devuelve la respuesta en streaming con el mismo protocolo que el antiguo `api/chat.php`.

- `POST /chat` · `{messages, idioma}` → `text/event-stream` (`{"t"}`, `{"fin"}`, `{"error"}`)
- `GET /salud` → estado y si la clave está configurada (nunca la muestra)

Configuración en Cloudflare → Workers → argos-chat → Settings → Variables and Secrets:
- `ANTHROPIC_API_KEY` (secreto, obligatorio)
- `MODEL` (opcional, por defecto `claude-haiku-5-5`)
- `LIMITE_DIA` (opcional, preguntas por visitante y día, por defecto 30)

Solo acepta peticiones desde https://argos.softwareinabox.eu.
