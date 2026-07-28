# Estado del proyecto — actualizado 2026-07-28

## Hecho ✅
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
- **D4 · Deploy a URL pública** — verificación de entrega en `Contexto/s03-ficha_4d-hommie.md`. No hecho aún.
- **D3 · Gaps vs Ficha 4D** (parcialmente cubiertos por el Gestor de Visitas):
  - Un click real a Google Calendar (hoy es simulación de sync).
  - Documento descargable con la info del día de la cita (no existe).
  - Evaluar propuestas/agenda de forma explícita (el widget muestra, pero no hay UX de “evaluar”).
- Hora/fechas hardcodeadas: "03:02", "OCTUBRE 2026", días 12/14 vinculados a flat-2/flat-3 a mano.
## Blockers ⛔
- Ninguno técnico. `GEMINI_API_KEY` real no configurada (el fallback cubre la demo).

## Cómo actualizar este archivo
Al cerrar una sesión importante: mover lo terminado a Hecho, añadir lo nuevo a Pendiente, borrar lo obsoleto. Máx. ~40 líneas.
