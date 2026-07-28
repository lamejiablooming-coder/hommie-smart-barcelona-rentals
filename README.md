# HOMMIE · Smart Barcelona Rentals

Agrega ofertas de alquiler en Barcelona, estima una puntuación de seguridad y
fiabilidad con IA, compara pros y contras y organiza las visitas en un único
calendario.

> **DEMO** · Prototipo académico con datos simulados. No es un servicio real de
> intermediación inmobiliaria: los pisos, perfiles y confirmaciones de visita son
> mock y las puntuaciones de seguridad son orientativas.

## Índice

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Puesta en marcha](#puesta-en-marcha)
- [Variables de entorno](#variables-de-entorno)
- [Comandos](#comandos)
- [API](#api)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Documentación del proyecto](#documentación-del-proyecto)
- [Contexto académico](#contexto-académico)
- [Privacidad y aviso legal](#privacidad-y-aviso-legal)

## Funcionalidades

- **Dashboard** con las ofertas guardadas, próximas visitas y estado del perfil.
- **Analizador de ofertas**: a partir de un texto o una URL devuelve precio,
  barrio, puntuación de seguridad (0–100), pros, contras y resumen.
- **Búsqueda y filtros** por zonas de Barcelona (Gràcia, Eixample Dret,
  Poblenou, El Born, Sarrià, Raval) y presupuesto.
- **Gestor de visitas** colapsable con vistas de día, semana y mes.
- **Perfil** con verificación de identidad, carpeta de documentos protegida y
  preferencias de notificaciones y privacidad.
- **Onboarding** de tres pasos que explica el alcance de la demo.

## Stack

| Capa | Tecnologías |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS 4, motion, lucide-react |
| Backend | Express 4 sobre `tsx`, con Vite como middleware en desarrollo |
| IA | Google Gemini vía `@google/genai`, con fallback local determinista |

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.

## Puesta en marcha

```bash
git clone https://github.com/lamejiablooming-coder/hommie-smart-barcelona-rentals.git
cd hommie-smart-barcelona-rentals
npm install
npm run dev
```

La app queda disponible en <http://localhost:3000>. El puerto está fijado en
`server/index.ts`.

Para revisar los estados de la demo (normal, cargando, vacío, error), el
simulador móvil y el onboarding, abre <http://localhost:3000/?demo=1>. La vista
por defecto es siempre la de usuario final.

## Variables de entorno

Copia la plantilla y rellena solo lo que necesites:

```bash
cp .env.example .env
```

| Variable | Obligatoria | Descripción |
| --- | --- | --- |
| `GEMINI_API_KEY` | No | Clave de Google Gemini para el análisis real de ofertas. Si falta o mantiene el valor de ejemplo, el servidor usa el fallback local. |
| `APP_URL` | No | URL pública donde se sirve la app. |

El archivo `.env` está excluido del control de versiones; nunca lo subas al
repositorio.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Levanta Express con Vite en modo desarrollo. |
| `npm run lint` | Verifica los tipos con `tsc --noEmit`. |
| `npm run build` | Compila el frontend y empaqueta el servidor en `dist/`. |
| `npm start` | Ejecuta el build de producción (`node dist/server.cjs`). |
| `npm run clean` | Elimina los artefactos de build. |

## API

### `POST /api/analyze`

Analiza una oferta de alquiler. Requiere al menos uno de los dos campos.

```json
{
  "text": "Piso reformado en Gràcia, 1350 € al mes, sin ascensor",
  "url": "https://ejemplo.com/oferta/123"
}
```

Respuesta:

```json
{
  "price": 1350,
  "neighborhood": "Gràcia",
  "securityScore": 87,
  "securityReasons": "El precio es coherente con las medias de la zona...",
  "pros": ["Ubicación muy céntrica y bien conectada", "Mucha luz natural"],
  "cons": ["Gastos de comunidad no incluidos", "Finca sin ascensor"],
  "description": "Oportunidad de alquiler en el barrio de Gràcia...",
  "origin": "Idealista"
}
```

Devuelve `400` si no se envía `text` ni `url`. Si la llamada a Gemini falla o no
hay clave configurada, responde `200` con un análisis simulado a partir del
texto recibido, de modo que la demo funciona siempre.

## Estructura del proyecto

```text
src/
├── features/          # UI y datos agrupados por dominio
│   ├── listings/      # Tarjetas, detalle y datos mock de ofertas
│   ├── onboarding/    # Flujo de bienvenida
│   └── profile/       # Espacio personal y verificación
├── shared/            # Tipos compartidos entre funcionalidades
├── App.tsx            # Composición, tabs y estado principal
├── main.tsx           # Entrada de React
└── index.css          # Estilos globales y tokens
server/
└── index.ts           # API de análisis y servidor de la SPA
```

El alias `@/` apunta a `src/`.

## Documentación del proyecto

| Carpeta | Contenido |
| --- | --- |
| `Contexto/` | Design system, decisiones de diseño y entrega académica. |
| `state/` | Estado actual: hecho, pendiente y blockers. |
| `decisions/` | Decisiones fechadas con su razonamiento. |
| `skills/` | Procedimientos reutilizables (desarrollo local, estilo de UI). |
| `gotchas/` | Trampas conocidas del código y su solución. |
| `logs/` | Resúmenes de sesiones de trabajo. |
| `AGENTS.md` | Reglas e invariantes para agentes de IA que toquen el repo. |

El estilo visual sigue el sistema monocromo «Ink & Pencil» descrito en
`Contexto/design.md`.

## Contexto académico

Proyecto de Irene Mejía para Interface School (Wave Europa II, «IA for UXers»).
La Ficha 4D con el norte de producto y el modo de delegación a la IA está en
`Contexto/s03-ficha_4d-hommie.md`.

## Privacidad y aviso legal

- Todos los datos de ofertas, perfiles y documentos son ficticios y viven en el
  cliente; la app no recoge información personal real.
- El copy de la interfaz cita la Ley 12/2023 por el derecho a la vivienda, el
  índice SERPAVI y el RGPD con carácter informativo.
- Las puntuaciones de seguridad no constituyen asesoramiento legal ni garantía
  sobre ninguna oferta.

Repositorio de uso académico: no incluye licencia de distribución abierta.
