# Estado del proyecto — actualizado 2026-07-30

## Hecho ✅
- **Presentación Demo Day (2026-07-30):** ruta aislada `/demo-day` (6 diapositivas, flechas ← →, design system Ink & Pencil, sin tocar el flujo principal). Montaje por path en `src/main.tsx`; contenido en `src/features/demo-day/`. Local: http://localhost:3000/demo-day.
- **CTA "Ver todas las opciones" (2026-07-29):** ya no redirige a Search. Simula una búsqueda (spinner ~1s) y muestra en su sitio el aviso "Hoy no hay más opciones" con las opciones ya vistas y los filtros activos; se resetea al cambiar presupuesto/barrios/tipo. Solo se renderiza si hay resultados. PR #2 mergeado en `main`.
- **Nav adaptativa (2026-07-29):** en desktop (`@3xl/app`) los tabs suben a una barra horizontal bajo el header (Dashboard, Search, Saved; Profile se accede por el avatar) y la barra inferior se oculta. En móvil sigue igual: 4 tabs abajo. Fuente única `MAIN_TABS` en `src/App.tsx`.
- **Escala responsive de desktop (2026-07-29):** tipografía, avatar y espaciados crecen con container queries `@3xl/app`/`@5xl/app`; hero "3 nuevas opciones" ocupa el ancho; contenido centrado a máx. 1440px; grid de tarjetas por contenedor (1 / 2 / 3 columnas). Móvil intacto. Foto de Gràcia regenerada con más nitidez (`*_hq.jpg`).
- **D4 · Deploy público funcionando:** https://hommie-smart-rentals-barcelona.vercel.app (Vercel, auto-deploy desde `main`). Verificado: imágenes 200, `/api/analyze` 200 con fallback.
- Imágenes mock arregladas en producción: importadas desde `src/assets/images.ts` (antes rutas `/src/assets/...` que daban 404 en Vercel). Gotcha #3 resuelto.
- Vista por defecto = app a pantalla completa (usuario). Panel de demo (sidebar + simulador) solo con `?demo=1`.
- Perfil rediseñado como espacio personal (`src/features/profile/components/ProfileTab.tsx` + `src/features/profile/data.ts`): hero persona, verificación (badge + señales), carpeta de documentos protegida, configuración (Calendar, notificaciones, RGPD). Presupuesto movido a Search.
- Datos mock alineados a Barcelona (Gràcia, Eixample Dret, Poblenou); filtros de zonas en Search funcionan de verdad (gotcha #1 resuelto).
- App demo completa: 4 tabs (Dashboard, Search/IA, Saved, Profile), 4 estados demo (normal/loading/empty/error), simulador móvil 375px / desktop.
- Gestor de Visitas colapsable con 3 vistas (día/semana/mes).
- Analizador de ofertas con Gemini + fallback local sin API key.
- Onboarding de 3 pasos, visual, legal-safe, con gate por sessionStorage.
- Design system documentado y unificado en `Contexto/design.md` (2026-07-23; `DESIGN_SYSTEM.md` eliminado) + guía visual de aprendizaje (`hommie-guia-visual.html`).
- Sistema de memoria persistente (este conjunto de carpetas).
- Código organizado por funcionalidades en `src/features/`, tipos compartidos en
  `src/shared/` y backend en `server/`. Alias `@/` configurado desde `src/`.
- Paquete renombrado a `hommie-smart-barcelona-rentals` y README actualizado.

## Pendiente 🔜
- Título de la pestaña en `index.html` sigue siendo "My Google AI Studio App" (heredado de AI Studio); debería decir Hommie.
- **D3 · Gaps vs Ficha 4D** (parcialmente cubiertos por el Gestor de Visitas):
  - Un click real a Google Calendar (hoy es simulación de sync).
  - Documento descargable con la info del día de la cita (no existe).
  - Evaluar propuestas/agenda de forma explícita (el widget muestra, pero no hay UX de “evaluar”).
- Hora/fechas hardcodeadas: "03:02", "OCTUBRE 2026", días 12/14 vinculados a flat-2/flat-3 a mano.
## Blockers ⛔
- Ninguno técnico. `GEMINI_API_KEY` real no configurada (el fallback cubre la demo).

## Cómo actualizar este archivo
Al cerrar una sesión importante: mover lo terminado a Hecho, añadir lo nuevo a Pendiente, borrar lo obsoleto. Máx. ~40 líneas.
