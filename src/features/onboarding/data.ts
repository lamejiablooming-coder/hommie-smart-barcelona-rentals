import { OnboardingStep } from "@/shared/types";

/** Mock copy — visual scenes, legal-safe claims (Ley 12/2023, SERPAVI, RGPD). */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "info",
    eyebrow: "Paso 1 de 3 · Tu hogar",
    title: "Empieza por cómo quieres vivir",
    body: "Imagina tu próximo piso en Barcelona: cuánto puedes pagar, en qué barrios te ves (Gràcia, Eixample, Poblenou…) y en qué momento de vida estás. Eso es todo lo que Hommie necesita para empezar a trabajar por ti.",
    demoLabel: "DEMO",
    imageUrl: "/src/assets/images/loft_interior_clean_1784493968497.jpg",
    moments: [
      {
        icon: "home",
        label: "Tu ritmo de vida",
        detail: "Presupuesto y tipo de piso que encajan contigo",
      },
      {
        icon: "map",
        label: "Tu mapa de barrio",
        detail: "Las calles donde te imaginas las llaves en la mano",
      },
    ],
  },
  {
    id: "how",
    eyebrow: "Paso 2 de 3 · El camino",
    title: "Tú eliges; Hommie organiza el camino",
    body: "Lo de siempre en España: Idealista a las 7, WhatsApp al agente, Fotocasa a la vez… y el piso se alquila mientras respondes. Hommie junta ese caos en un solo camino: miras, visitas y avanzas sin perder el hilo.",
    demoLabel: "DEMO",
    imageUrl: "/src/assets/images/eixample_penthouse_interior_1784582356140.jpg",
    moments: [
      {
        icon: "eye",
        label: "Miras ofertas que ya encajan",
        detail: "Filtradas por tu perfil, listas para sentir el espacio",
      },
      {
        icon: "calendar",
        label: "Reservas la visita",
        detail: "Hommie coordina el hueco y prepara tu carpeta cuando toque",
      },
    ],
  },
  {
    id: "value",
    eyebrow: "Paso 3 de 3 · Lo que ganas",
    title: "Valor de verdad: menos riesgo, más casa",
    body: "Mientras busques a través de Hommie, el proceso deja de ser una carrera injusta. Verificamos, ordenamos visitas y cuidamos tu documentación —con la ley de vivienda y tu consentimiento como límite.",
    demoLabel: "DEMO",
    moments: [
      {
        icon: "shield",
        label: "Verificación de anunciantes",
        detail: "Auditamos perfiles y señales de riesgo. No es un seguro absoluto: es control serio de quién entra.",
      },
      {
        icon: "calendar",
        label: "Sin guerra de citas",
        detail: "En visitas Hommie, el piso se compromete a decidir solo cuando cierre la ronda completa.",
      },
      {
        icon: "scale",
        label: "Precios alineados a la norma",
        detail: "Contrastamos con el índice oficial en zonas tensionadas (como Barcelona). No topamos toda España a ciegas.",
      },
      {
        icon: "file",
        label: "Documentación en buenas manos",
        detail: "Preparamos y enviamos solo lo necesario, contigo al mando (RGPD · DEMO).",
      },
    ],
    closingLine: "Parte de la solución al alquiler — no del ruido.",
  },
];

export const ONBOARDING_STORAGE_KEY = "hommie_onboarding_done";
