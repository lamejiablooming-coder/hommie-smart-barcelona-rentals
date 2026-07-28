# HOMMIE · Smart Barcelona Rentals

Prototipo académico que agrega ofertas de alquiler en Barcelona, analiza
señales de seguridad, compara pros y contras y simula la gestión de visitas.

## Desarrollo local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

La app estará disponible en <http://localhost:3000>. `GEMINI_API_KEY` es
opcional: sin ella, el servidor usa el fallback local de la demo.

## Comandos

- `npm run dev`: inicia Express y Vite.
- `npm run lint`: comprueba los tipos sin generar archivos.
- `npm run build`: genera el frontend y empaqueta el servidor.
- `npm start`: ejecuta el build de producción.

## Estructura

```text
src/
├── features/       # UI y datos agrupados por dominio
│   ├── listings/
│   ├── onboarding/
│   └── profile/
├── shared/         # Tipos compartidos entre funcionalidades
├── App.tsx         # Composición y estado principal
├── main.tsx        # Entrada de React
└── index.css       # Estilos globales
server/
└── index.ts        # API de análisis y servidor de la SPA
```

La documentación y memoria del proyecto se mantienen en `Contexto/`,
`state/`, `decisions/`, `logs/`, `skills/` y `gotchas/`.
