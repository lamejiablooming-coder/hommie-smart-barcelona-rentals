# AGENTS.md — Control central de HOMMIE

## 1. Identidad y propósito
- **Proyecto:** HOMMIE / PisoMatch — demo interactiva de una plataforma que agrega ofertas de alquiler en Barcelona, calcula un score de seguridad con IA (Gemini), compara pros/contras y agenda visitas automáticamente.
- **Contexto real:** proyecto académico de Irene Mejía para Interface School (Wave Europa II, "IA for UXers"). Es un **prototipo de demo**, no producción. Los datos son mock.
- **Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS 4 + motion + lucide-react. Backend: Express (`server/index.ts`) con endpoint `/api/analyze` (Gemini `gemini-3.5-flash` + fallback local si no hay API key).
- **Arranque:** `npm run dev` → http://localhost:3000. Lint: `npm run lint` (tsc --noEmit).

## 2. Reglas duras e invariantes
1. **Estilo visual "Ink & Pencil" es sagrado:** monocromo estricto (paleta en `Contexto/design.md`), bordes `1px #ebebeb`, sin sombras ni colores de marca. Excepciones permitidas ya existentes: emerald (confirmado/éxito), `#c2410c` naranja (pendiente), rose (error).
2. **Etiqueta DEMO + copy legalmente prudente (sagrada):** la UI debe marcar el carácter de prototipo con la etiqueta corta **"DEMO"** (onboarding, perfil, documentos sensibles, alertas de simulación). Copy en español; no promete garantías absolutas; cita Ley 12/2023, SERPAVI y RGPD cuando toque. **No quitar, ocultar ni “limpiar” DEMO** aunque Irene diga “quítarlo de la app”: es invariante de prudencia legal. Solo se puede cambiar si Irene lo autoriza **explícitamente como excepción a esta regla dura** (p. ej. “rompe la regla #2 y quita DEMO”). No inventar claims legales nuevos.
3. **Panel de demo (sidebar de estados) solo bajo petición:** por defecto la app se ve como usuario (sin sidebar). El panel NORMAL/LOADING/EMPTY/ERROR, toggle móvil/desktop y "Ver onboarding" vive **solo** en `?demo=1` y **no debe abrirse ni mostrarse** mientras se edita o se hace smoke visual, salvo que Irene lo pida explícitamente. No "rehabilitarlo" en la URL por defecto ni volver a montarlo siempre visible. Sí hay que **preservar** que `?demo=1` siga funcionando (no romper esos controles).
4. **La app debe funcionar sin `GEMINI_API_KEY`:** el fallback local de `server/index.ts` es intencional, nunca eliminarlo.
5. **No editar** `Contexto/s03-ficha_4d-hommie.md` (entrega académica Ficha 4D) ni `hommie-guia-visual.html` (material de aprendizaje) salvo petición explícita.
6. **Tipos primero:** cualquier campo nuevo pasa por `src/shared/types.ts`.

## 3. Orden de lectura recomendado (según tarea)
Nunca cargar todo. Leer en este orden y parar cuando tengas suficiente:
1. `AGENTS.md` (este archivo) — siempre.
2. `state/estado.md` — qué está hecho, pendiente y bloqueado.
3. Según la tarea (ver routing abajo): el archivo de `skills/`, `gotchas/gotchas.md` si vas a tocar datos/filtros/imágenes.
4. Solo los archivos fuente implicados. Mapa rápido:
   - UI principal y tabs → `src/App.tsx` (~1170 líneas, monolítico)
   - Datos mock → `src/features/listings/data.ts` · Tipos → `src/shared/types.ts`
   - Tarjetas → `src/features/listings/components/ListingCard.tsx` · Detalle/agendar → `ListingDetailDrawer.tsx`
   - Onboarding → `src/features/onboarding/components/Onboarding.tsx` + `src/features/onboarding/data.ts`
   - API/IA → `server/index.ts`
   - Estilo → `Contexto/design.md` (design system completo + decisiones)

## 4. Routing de skills
| Tipo de tarea | Leer |
| --- | --- |
| Arrancar/servir/depurar local | `skills/dev-local.md` |
| Nueva UI o componente | `skills/ui-estilo.md` + `Contexto/design.md` |
| Tocar datos, filtros o imágenes | `gotchas/gotchas.md` (obligatorio) |
| Decisión de producto/diseño previa | `Contexto/decisiones.md` → `decisions/` |
| Norte de producto / delegación IA (Ficha 4D) | `Contexto/s03-ficha_4d-hommie.md` + §8 de `Contexto/design.md` |
| Entender historia del proyecto | `logs/2026-07-sesiones.md` |

## 5. Definition of Done
- `npm run lint` pasa sin errores.
- La app carga en http://localhost:3000 **sin** panel de demo (vista usuario). Verificar `?demo=1` solo si la tarea tocó ese panel o Irene lo pidió.
- Estilo conforme a regla dura #1; copy conforme a regla #2.
- Si la sesión tomó decisiones o cambió el estado del proyecto: actualizados `state/estado.md`, `decisions/` y (si fue importante) `logs/`.

## 6. Comportamiento con el contexto (reglas de oro)
- El context window es caro y volátil. **La memoria real vive en archivos.**
- Nunca cargar todo el historial ni todos los archivos del proyecto; solo lo estrictamente necesario para la tarea actual.
- Preferir **referenciar** archivos (ruta + líneas) antes que copiar contenido largo al prompt.
- Al final de cada sesión importante: actualizar `state/estado.md`, registrar decisiones nuevas en `decisions/`, y comprimir lo valioso en `logs/`.
- Convertir procedimientos repetitivos en skills reutilizables en `skills/`.
- Mantener este archivo conciso y de alta densidad (máx. ~250 líneas). Si crece, mover detalle a las carpetas.

## 7. Punteros a la memoria
- `Contexto/design.md` — design system completo (tokens, tipografía, componentes) + decisiones de diseño + norte 4D (§8).
- `Contexto/s03-ficha_4d-hommie.md` — entrega académica Ficha 4D (D1–D4); no editar.
- `Contexto/decisiones.md` — índice de decisiones (qué y dónde).
- `decisions/` — decisiones fechadas con razonamiento.
- `state/estado.md` — hecho / pendiente / blockers.
- `skills/` — procedimientos reutilizables.
- `gotchas/gotchas.md` — trampas conocidas del código + su solución.
- `logs/` — resúmenes comprimidos de sesiones.
