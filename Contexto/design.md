# Design System + Decisiones de diseño — HOMMIE

**Documento único y normativo de diseño.** (Unifica el antiguo `DESIGN_SYSTEM.md`, ya eliminado, con las decisiones y su porqué.)

Basado en el estilo **"Ink & Pencil Gallery"** (Dul Zorigoo — Style Reference), adaptado a Hommie: minimalista, editorial, alto contraste, monocromo, donde la estructura se dibuja con líneas finas (`1px`) en lugar de rellenos o elevaciones.

---

## 1. Principios de marca

1. **Disciplina monocromática:** sin acentos cromáticos de marca. El color visual lo aportan las fotografías y el contenido.
   - *Excepción acotada (decisión 2026-07-20, ya en producción de la demo):* colores **semánticos de estado** — emerald (confirmado/éxito/sync), `#c2410c` naranja (pendiente), rose (error). No añadir ningún otro color.
2. **Integridad de línea estructural:** la estructura se define con hairlines `1px` (`#ebebeb`), nunca con sombras ni elevaciones.
3. **Tipografía primero:** escalas pequeñas y densas, muy escaneables; jerarquía por whitespace, ritmo y proporción.
4. **Simplicidad arquitectónica:** imágenes edge-to-edge sin redondear, aspect ratios naturales, contenedores interactivos mínimos.

**Razón de la elección:** registro editorial/galerístico que diferencia a HOMMIE de portales inmobiliarios saturados de color y fuerza jerarquía por tipografía y espacio.

---

## 2. Paleta de color

| Token | Variable CSS | Hex | Rol |
| :--- | :--- | :--- | :--- |
| **Paper White** | `--color-paper-white` | `#ffffff` | Fondo de página, tarjetas, estados vacíos |
| **Pencil Gray** | `--color-pencil-gray` | `#ebebeb` | Bordes hairline, divisores, bordes secundarios |
| **Graphite** | `--color-graphite` | `#a8a8a8` | Captions de imagen, labels secundarios, timestamps, estados pasivos |
| **Smoke** | `--color-smoke` | `#8e8e8e` | Texto de ayuda, descriptores de baja jerarquía, iconos inactivos |
| **Ink Black** | `--color-ink-black` | `#252525` | Texto principal, botones, headers, estados activos |

Semánticos permitidos (solo estado): emerald = confirmado/éxito · `#c2410c` = pendiente · rose = error.

---

## 3. Tipografía y escala

**Inter** (sans-serif) para todo el UI, registro neo-grotesco editorial.

| Rol | Tamaño | Line height | Peso | Detalles |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Title** | `15px` | `1.2` | `500` / `700` | Título de header y secciones, labels uppercase |
| **Body** | `15px` | `1.5` | `400` | Párrafos, descripciones |
| **Body Medium** | `15px` | `1.5` | `500` | Ítems de lista, precios, métricas clave |
| **Caption** | `12px` | `1.4` | `400` | Subtítulos, ubicaciones secundarias, tags |
| **Label Sm** | `12px` | `1.4` | `500` / `600` | Botones compactos, filtros, tags interactivos |
| **Micro Metadata** | `10px` | `1.2` | `500` | Subtítulos uppercase, badges de timestamp |

### Escala en desktop (decisión 2026-07-29)
La tabla anterior es la escala **móvil**. En desktop la misma escala resultaba ilegible, así que a partir de `@3xl/app` (contenedor ≥ 768px) crece: cápsula de visitas `12 → 18/20px`, precio de tarjeta `15 → 24px`, pros/contras y captions `12 → 15px`, chips y CTA `12 → 14px`, labels de nav `10 → 13px`, avatar del header `32 → 64/72px`.

Hero "RESUMEN DE HOY": número `96 → 144 → 176px`, frase `15 → 24 → 32px` con `flex-1` (sin `max-w-xs`) para que ocupe el ancho. Es el elemento de mayor jerarquía, seguido de la cápsula de visitas agendadas.

**Regla:** usar **container queries** (`@3xl/app:`, `@5xl/app:`) y no `md:`/`lg:`, para que el simulador de 375px de `?demo=1` siga viéndose como móvil dentro de una ventana ancha.

Ancho: el contenido se centra en `max-w-[1440px]` con padding `24 → 40 → 56px`. El tope no es solo de legibilidad — mantiene las tarjetas en ~416px CSS, por debajo del ancho nativo (896–1024px) de las fotos mock, que si no se ven blandas en pantallas grandes.

---

## 4. Spacing y bordes

- **Unidad base:** `4px`.
- **Denso:** `8px`, `12px`, `16px` (`--spacing-8/12/16`).
- **Salto lógico:** `32px` (`--spacing-32`) entre secciones.
- **Border radius:** `0px` en fotografías, screenshots y tarjetas primarias; `8px` (`--radius-lg`) solo en botones de acción, links y selects.

---

## 5. Componentes core

### Navigation header
Fondo `#ffffff`, borde inferior `1px #ebebeb`. Logo `HOMMIE` en `15px` bold uppercase + icono de casa minimalista. Avatar redondo `w-8 h-8` con contorno `#ebebeb`.

### Gestor de Visitas (widget del Dashboard)
- **Decisión:** cápsula colapsable estilo notificación ("Hommie te ha agendado nuevas visitas") que expande a **3 vistas**: Día (tarjetas tipo notificación), Semana (grid de 7 días + lista), Mes (matriz calendario).
- **Razón:** ahorrar espacio vertical en móvil y demostrar 3 propuestas de layout exploradas con IA (ficha D1: la IA propone layouts, Irene decide). Evolución de las propuestas iniciales Fila/Línea/Cinta.

### Grid de tarjetas de propiedades
Ratio `4:5`, hover con escala `1.05`, captions en graphite (`#a8a8a8`), micro-indicadores check/uncheck. CTA centrado `VER TODAS LAS OPCIONES` con borde `#ebebeb` y tracking ancho.

---

## 6. Layout de la demo
- **Vista por defecto (edición y uso):** solo la app de producto, a pantalla completa — sin sidebar de estados. URL: `/`.
- **Panel de demo bajo petición:** sidebar editorial (320px: NORMAL/LOADING/EMPTY/ERROR, viewport móvil/desktop, onboarding) + workspace con simulador iPhone 375×812 o desktop. URL: `/?demo=1`. Es herramienta de presentación, no parte del producto. **No abrirla ni mostrarla al editar** salvo petición explícita de Irene; sí preservar que `?demo=1` siga intacto.
- **App móvil:** 4 tabs inferiores — Dashboard, Search (analizador IA), Saved, Profile.

---

## 7. Onboarding (3 pasos)
- **Orden decidido por Irene:** info → cómo → valor (`src/features/onboarding/data.ts`).
- **Tono:** visual y evocador, no "lista de la compra"; cada slide conecta con imaginar tu casa. Énfasis en el valor diferencial: verificación de perfiles, no pelearse por citas, coordinación de agenda.
- **Restricción (sagrada):** copy legalmente prudente (Ley 12/2023, SERPAVI, RGPD) **y** etiqueta visible **"DEMO"** en onboarding/perfil/zonas sensibles. No eliminar DEMO sin autorización explícita como excepción a la regla dura #2 de `AGENTS.md`.
- **Gate:** se muestra una vez por sesión de navegador (`sessionStorage`, clave en `src/features/onboarding/data.ts`); reabrible desde el panel de demo.

---

## 8. Ficha 4D — producto y delegación (fuente: `Contexto/s03-ficha_4d-hommie.md`)

Entrega académica S3 (entregada 2026-07-16). **No editar el archivo** salvo petición explícita.

### D1 · Quién decide qué
- **Mode:** aumentar. Irene define flujo y prioridades del dashboard; cierra copy y alcance (D4).
- **Ai Does:** propone layouts y microcopy; acelera exploración de UI.
- **No Delegate:** criterios de seguridad que guían al usuario — deben pasar por persona/filtro, no por la IA sola.
- **Transparencia (D4):** en demo decir qué generó la IA (layouts) y qué retuvo Irene (tono, DoD, datos fuera).

### D2–D3 · Norte de producto (Gestor de Visitas)
- **Process:** brief del usuario → match con mercado → revisar agenda del usuario → agendar → notificar.
- **Product:** calendario visible de próximas citas ya gestionadas, con resumen; el usuario debe poder evaluar propuestas y agenda. Ideal: un click a su calendar + documento descargable con la info del día de la cita.
- **Performance demo (orientativo):** flujo de registro/agendado completo <15s en móvil; cero campos obligatorios además del valor esencial.
- **Éxito (D3):** que la persona elija apoyarse en la app y la siga usando.

### D4 · Deploy
Deploy a URL pública = verificación de entrega. Estado: pendiente (ver `state/estado.md`).
