# Índice de decisiones — HOMMIE

Formato: una línea por decisión. Detalle y razonamiento en el archivo indicado.

| Fecha | Decisión | Detalle en |
| --- | --- | --- |
| 2026-07-16 | Modo de delegación IA + norte producto visitas (D1–D4) | `Contexto/s03-ficha_4d-hommie.md` · resumen en `Contexto/design.md` §8 |
| 2026-07-20 | Estilo visual "Ink & Pencil" monocromo con excepciones semánticas | `Contexto/design.md` |
| 2026-07-20 | Demo con panel de control (4 estados + viewport móvil/desktop) | `Contexto/design.md` |
| 2026-07-20 | `/api/analyze` con Gemini + fallback local obligatorio sin API key | `decisions/2026-07.md` |
| 2026-07-21 | Onboarding 3 pasos, orden info → cómo → valor | `decisions/2026-07.md` |
| 2026-07-22 | Onboarding visual/evocador + copy legal-safe (Ley 12/2023, SERPAVI, RGPD) | `decisions/2026-07.md` |
| 2026-07-22 | Gate de onboarding por sessionStorage, reabrible desde panel demo | `Contexto/design.md` |
| 2026-07-23 | Sistema de memoria persistente (AGENTS.md + carpetas) | `decisions/2026-07.md` |
| 2026-07-23 | `DESIGN_SYSTEM.md` eliminado; documento único de diseño en `Contexto/design.md` | `decisions/2026-07.md` |
| 2026-07-23 | Ficha 4D reubicada a `Contexto/`; gaps D3/D4 reflejados en estado | `decisions/2026-07.md` |
| 2026-07-23 | Profile = persona (verificación, carpeta docs, ajustes); presupuesto a Search; datos Madrid→BCN | `decisions/2026-07.md` |
| 2026-07-23 | Panel de estados (`?demo=1`) solo bajo petición al editar; default = vista usuario | `decisions/2026-07.md` |
| 2026-07-23 | Etiqueta DEMO restaurada; regla #2 reforzada (no quitar sin excepción explícita) | `decisions/2026-07.md` |
| 2026-07-28 | Deploy Vercel: imágenes importadas (no rutas `/src/...`) y `/api/analyze` como función serverless | `decisions/2026-07.md` |

**Regla:** cada decisión nueva se añade aquí (1 línea) y se detalla en `decisions/AAAA-MM.md`.
