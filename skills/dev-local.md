# Skill: desarrollo local

## Arrancar
```bash
npm install        # solo la primera vez
npm run dev        # tsx server/index.ts → Express + Vite middleware en http://localhost:3000
```
- Puerto fijo: **3000** (definido en `server/index.ts`). Si da ERR_CONNECTION_REFUSED, el server no está corriendo: relanzar `npm run dev` y esperar el log "Server running on port 3000".
- **Mientras se edita:** trabajar y verificar en http://localhost:3000 (vista usuario, sin sidebar). **No** abrir `?demo=1` salvo que Irene lo pida o la tarea sea arreglar ese panel.
- Panel de demo (estados / móvil / onboarding), solo bajo petición: http://localhost:3000/?demo=1
- No hace falta `.env`: sin `GEMINI_API_KEY` el analizador usa el fallback local.

## Verificar antes de dar por terminado
```bash
npm run lint       # tsc --noEmit, debe salir limpio
```
Smoke test por defecto (vista usuario): cambiar de tab, abrir una tarjeta (drawer), agendar una visita, revisar Perfil.
Solo si Irene pidió el panel o se tocó `?demo=1`: los 4 botones de estado, "Ver onboarding" y toggle móvil/desktop.

## Build de producción
```bash
npm run build      # vite build + esbuild server → dist/
npm start          # node dist/server.cjs
```
