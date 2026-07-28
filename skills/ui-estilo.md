# Skill: crear UI en el estilo HOMMIE

Checklist para cualquier componente nuevo (referencia completa: `Contexto/design.md`):

1. **Colores:** solo `#ffffff`, `#ebebeb`, `#a8a8a8`, `#8e8e8e`, `#252525` (clases Tailwind arbitrarias `text-[#252525]` etc., patrón ya usado en todo el código). Semánticos permitidos: emerald (ok), `#c2410c` (pendiente), rose (error).
2. **Bordes, no sombras:** `border border-[#ebebeb]`; hover interactivo → `hover:border-[#252525]`. Radius 0 en tarjetas/fotos; `rounded-md/lg` solo en botones pequeños.
3. **Labels:** `text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8]`. Cuerpo: `text-xs text-[#8e8e8e] leading-relaxed`. Títulos de sección: `text-xs font-bold uppercase tracking-widest text-[#252525]`.
4. **Botón primario:** fondo `#252525`, texto blanco, uppercase, `tracking-widest`, `hover:bg-black`. Secundario: borde `#ebebeb`, fondo blanco.
5. **Iconos:** lucide-react, `w-3.5/w-5`, `stroke-[1.5]` (activo `stroke-[2.5]`).
6. **Animación:** motion/react — `AnimatePresence` + fade/slide sutil (`opacity`, `y: 10`, duración 0.2–0.25s), como los tabs de `App.tsx`.
7. **Estructura:** los tabs viven inline en `src/App.tsx`; cada dominio agrupa componentes y datos en `src/features/<dominio>/`; los tipos compartidos viven en `src/shared/types.ts`. Usar imports con el alias `@/`.
8. **Copy:** español, tono editorial profesional, claims prudentes + etiqueta **DEMO** donde marque simulación (ver regla dura #2 de `AGENTS.md`; no quitarla sin excepción explícita).
