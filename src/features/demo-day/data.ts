import type { DemoDaySlide } from "@/shared/types";

/** URL viva del prototipo. La demo real ocurre aquí, no en estas diapositivas. */
export const DEMO_DAY_LIVE_URL =
  "https://hommie-smart-rentals-barcelona.vercel.app/";

export const DEMO_DAY_SLIDES: DemoDaySlide[] = [
  {
    id: "portada",
    kind: "cover",
    navLabel: "Portada",
    brand: "Hommie",
    tagline: "Agente para agendar y filtrar tu próximo hogar en Barcelona",
    urlLabel: "Demo en vivo",
    url: DEMO_DAY_LIVE_URL,
  },
  {
    id: "problema",
    kind: "bullets",
    navLabel: "Problema",
    timing: "0:00–0:30",
    title: "Buscar piso en Barcelona es agotador y consume todo tu tiempo",
    bullets: [
      "Filtrar, escribir mensajes, agendar visitas sin saber si son seguras",
      "Necesitas un agente que haga esto por ti cada mañana",
    ],
  },
  {
    id: "demo",
    kind: "demo",
    navLabel: "Demo en vivo",
    timing: "0:30–2:30",
    title: "Demo en vivo",
    ctaLabel: "Abre la demo en vivo",
    url: DEMO_DAY_LIVE_URL,
    screens: [
      {
        id: "onboarding",
        index: "01",
        label: "Onboarding",
        detail: "En 3 pasos entiende el valor y qué datos necesita",
      },
      {
        id: "dashboard",
        index: "02",
        label: "Dashboard",
        detail: "Resumen agenda agente y nuevas ofertas con pros/contras",
      },
      {
        id: "pdp",
        index: "03",
        label: "PDP",
        detail: "Detalle del piso, información para la visita y decisión",
      },
      {
        id: "descargable",
        index: "04",
        label: "Descargable",
        detail: "Documento resumido para llevar antes de la visita",
      },
    ],
    offCameraLabel: "Fuera de cámara",
    offCamera:
      "Mapa de búsquedas, perfil, onboarding completo, filtros avanzados",
    demoLabel: "DEMO",
    demoNote: "Prototipo académico con datos mock, no producción",
  },
  {
    id: "decisiones",
    kind: "pairs",
    navLabel: "Decisiones",
    timing: "2:30–4:30",
    title: "Decisiones: qué delegué y qué retuve",
    pairs: [
      {
        id: "delegue",
        label: "Delegué a IA",
        value:
          "Exploración de layouts y borradores de microcopy (modo aumentado)",
      },
      {
        id: "retuvo-copy",
        label: "Retuvo",
        value: "Voz final del copy para que sea cercana y coherente",
      },
      {
        id: "retuvo-flujos",
        label: "Retuvo",
        value: "Organización de flujos y criterio de diseño",
      },
      {
        id: "por-que",
        label: "Por qué",
        value:
          "La comunicación no se negocia; en caso real necesita verificación humana de fiabilidad",
      },
    ],
    highlightId: "por-que",
  },
  {
    id: "verificacion",
    kind: "pairs",
    navLabel: "Verificación",
    timing: "2:30–4:30",
    title: "Verificación y transparencia",
    pairs: [
      {
        id: "herramientas",
        label: "Herramientas",
        value: "stitch (layouts), AI Studio (flujos), Cursor (código)",
      },
      {
        id: "verifico",
        label: "Verificó en",
        value: "2 dispositivos, flujo principal, layout, calidad imágenes",
      },
      {
        id: "hallazgo",
        label: "Hallazgo grave",
        value:
          "Imágenes locales no cargaban en Vercel (rutas /src/assets/ solo en desarrollo)",
      },
      {
        id: "correccion",
        label: "Corrección",
        value: "Redirigir a URLs externas",
      },
      {
        id: "datos",
        label: "Datos entrada",
        value: "Brief + design.md + benchmarks, sin datos reales",
      },
    ],
  },
  {
    id: "cierre",
    kind: "pairs",
    navLabel: "Cierre",
    timing: "4:30–5:00",
    title: "Cierre: postmortem y aprendizaje",
    pairs: [
      {
        id: "pense",
        label: "Pensé que sería",
        value: "Diseño funcional y estética coherente",
      },
      {
        id: "resulto",
        label: "Resultó serlo",
        value: "Mantener responsive en móvil sin romper nada",
      },
      {
        id: "reiniciara",
        label: "Si reiniciara",
        value: "Benchmark primero, design.md sin divagar",
      },
      {
        id: "aprendizaje",
        label: "Aprendizaje #1",
        value:
          "Revisar tu trabajo desde muchos ángulos diferentes, no solo una vez",
      },
    ],
    highlightId: "aprendizaje",
  },
];
