# Log comprimido de sesiones — Julio 2026

## S3 (2026-07-16) · Ficha 4D
Definido modo de delegación IA (aumentar; Irene decide flujo/copy/seguridad; IA propone layouts) + norte de producto del Gestor de Visitas (D2–D3) y deploy público (D4). Entrega en `Contexto/s03-ficha_4d-hommie.md`.

## Base app (2026-07-20)
App generada en AI Studio: dashboard, analizador IA, saved, profile, estados demo, design system Ink & Pencil. Exportada al workspace.

## S4 (2026-07-21)
- Análisis explicativo del proyecto + creación de `hommie-guia-visual.html` (guía de aprendizaje standalone, no tocar).
- Levantado localhost:3000.
- SPEC de onboarding → plan por fases → implementación (3 pasos, orden info→cómo→valor decidido por Irene).

## S4b (2026-07-22)
- Rediseño del onboarding: más visual/evocador, énfasis en valor (verificación, no competir por citas), copy legal-safe (Ley 12/2023, SERPAVI, RGPD).
- Resuelto ERR_CONNECTION_REFUSED (server no corriendo).

## S5 (2026-07-23)
- Preguntas de comprensión sobre header y elementos de UI.
- Creado el sistema de memoria persistente: `AGENTS.md`, `Contexto/`, `decisions/`, `state/`, `skills/`, `gotchas/`, `logs/`. Documentado el gotcha Madrid/Barcelona (pendiente de arreglar).
- Unificado design system en `Contexto/design.md` (eliminado `DESIGN_SYSTEM.md`).
- Ficha 4D movida a `Contexto/`; contexto enriquecido con D1–D4 y gaps D3/D4 en estado.

## S6 (2026-07-28)
- Reorganizado el código por dominios en `src/features/`, con tipos en `src/shared/` y backend en `server/`.
- Configurado el alias `@/`, renombrado el paquete y actualizado README y memoria interna.
- Verificados type-check, build, carga local y fallback de `/api/analyze`.

## S7 (2026-07-28) · Arreglado el deploy de Vercel
- Síntoma: la URL pública se veía "rota" (onboarding pasos 1–2 sin foto, tarjetas Eixample/Poblenou y avatar de Perfil vacíos). Causa: las imágenes se referenciaban como `/src/assets/images/...`, ruta que solo sirve el dev server de Vite → 404 en producción. Arreglado importándolas desde `src/assets/images.ts`.
- Segundo fallo detectado de paso: `/api/analyze` daba 404 porque en Vercel no corre `server/index.ts`. Lógica extraída a `server/analyze.ts` y expuesta también por `api/analyze.ts` + `vercel.json`.
- Trampa de ESM: la función crasheaba (500 / FUNCTION_INVOCATION_FAILED) por importar `../server/analyze` sin extensión; con `"type": "module"` Node exige `.js`. Reproducido en local con esbuild antes de re-desplegar.
- D4 cerrado: demo pública verificada (imágenes 200, API 200 con fallback, 400/405 correctos).

## Cómo añadir entradas
Una sección por sesión importante, máx. 5 líneas: qué se hizo, qué se decidió, qué quedó pendiente. Sin transcripciones.
