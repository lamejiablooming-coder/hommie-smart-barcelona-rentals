# Gotchas conocidos — HOMMIE

## 1. Datos mock de MADRID en una app de BARCELONA ✅ RESUELTO (2026-07-23)
Los listings/visitas de `src/features/listings/data.ts` ahora usan Gràcia, Eixample Dret y Poblenou, con direcciones de BCN (Provença, Pujades). `selectedNeighborhoods` inicial en `App.tsx` coincide con los checkboxes de Search ("Gràcia", "Eixample Dret", "Poblenou", "El Born", "Sarrià"), así que los filtros funcionan de verdad.
**Al añadir listings nuevos:** usar exactamente esos nombres de barrio (match por string exacto) o el filtrado los excluirá en silencio. Las tarjetas destacadas de la vista Mes del gestor de visitas siguen hardcodeadas (ver gotcha #2).

## 2. Fechas y horas hardcodeadas
- Vista "Mes" del gestor de visitas: matriz fija de OCTUBRE 2026; los días 12 y 14 abren `flat-2`/`flat-3` con ids escritos a mano (`App.tsx` ~715–780). Si cambian las visitas mock, actualizar también aquí.
- Vista "Semana": el grid de 7 días es un array literal, no se deriva de `visits`.
- Relojes "03:02" (status bar y sidebar) son decorativos.

## 3. Rutas de imágenes `/src/assets/images/...` ✅ RESUELTO (2026-07-28)
Se cumplió el riesgo: en el deploy de Vercel esas rutas daban 404 (Vite solo sirve `/src` en dev) y la app se veía "rota". Ahora las tres imágenes mock se importan desde el barrel `src/assets/images.ts` y Vite las emite hasheadas en `dist/assets/`. Tipos de import de `.jpg` vía `src/vite-env.d.ts`.
**Al añadir imágenes locales:** añadirlas al barrel e importarlas; **nunca** escribir la ruta `/src/...` como string.

## 4. IA con fallback silencioso
Sin `GEMINI_API_KEY` válida, `/api/analyze` **no falla**: responde una simulación local (infiere barrio y precio del texto). Si "la IA responde raro pero siempre igual", es el fallback — mirar el `console.warn` del server. El placeholder `"MY_GEMINI_API_KEY"` también activa el fallback.
La lógica vive en `server/analyze.ts` y la consumen dos entradas: el Express de dev (`server/index.ts`) y la función serverless de Vercel (`api/analyze.ts`). **Tocar solo `analyze.ts`**, o dev y producción se desincronizan.

## 5. Onboarding que "no aparece"
El gate usa `sessionStorage` (clave en `src/features/onboarding/data.ts`). Tras completarlo una vez no vuelve a salir en esa pestaña: usar el botón "Ver onboarding" del sidebar o abrir ventana nueva.

## 6. Ficha 4D: "Feature Selected" no coincide con HOMMIE
En `Contexto/s03-ficha_4d-hommie.md`, el campo **Feature Selected** dice "Registro de glucosa en un toque" (resto de plantilla/bitácora). El contenido D1–D4 (dashboard, citas, calendar, layouts) **sí** es de HOMMIE. **No reescribir la entrega** salvo que Irene lo pida; al planificar features, usar D1–D4 + `Contexto/design.md` §8, no ese título.

## 7. Misceláneos
- `App.tsx` es un monolito de ~1170 líneas: buscar por comentarios `TAB 1..4` y `STATE 1..3`.
- El listing creado por el analizador IA usa 2 URLs de imagen fijas de Google y valores por defecto si el modelo omite campos (`App.tsx` ~153–171).
