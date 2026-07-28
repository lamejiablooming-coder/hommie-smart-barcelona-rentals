import { spanishProfessionalAvatar } from "@/assets/images";
import {
  AppSettings,
  LifeStage,
  ManagedDocument,
  UserProfile,
} from "@/shared/types";

export const LIFE_STAGES: LifeStage[] = [
  "Estudiante Universitario",
  "Joven Profesional",
  "Pareja Conviviente",
  "Familia con Hijos",
];

export const INITIAL_USER_PROFILE: UserProfile = {
  displayName: "Irene Mejía",
  email: "lamejiablooming@gmail.com",
  avatarUrl: spanishProfessionalAvatar,
  contextLine: "Joven profesional buscando piso en Barcelona — Gràcia, Eixample, Poblenou…",
  lifeStage: "Joven Profesional",
  verificationStatus: "verified",
  verificationSignals: [
    {
      id: "id",
      label: "Identidad revisada",
      detail: "Documento contrastado en DEMO. No es un certificado oficial.",
      done: true,
    },
    {
      id: "income",
      label: "Señales de ingresos",
      detail: "Nóminas recientes listas para compartir solo cuando tú digas.",
      done: true,
    },
    {
      id: "rgpd",
      label: "Consentimiento RGPD",
      detail: "Tú mandas qué se envía y a quién.",
      done: true,
    },
  ],
  verificationNote:
    "Quienes alquilan ven un perfil con señales de confianza — no una garantía absoluta. Hommie ordena y verifica; la decisión final es tuya y del anunciante.",
  demoLabel: "DEMO",
};

export const INITIAL_MANAGED_DOCUMENTS: ManagedDocument[] = [
  {
    id: "doc-dni",
    title: "DNI / NIE",
    subtitle: "Identidad protegida · solo se comparte con tu OK",
    kind: "identity",
    protected: true,
    managedByHommie: true,
    updatedLabel: "Actualizado · DEMO",
  },
  {
    id: "doc-payslips",
    title: "Nóminas (3 meses)",
    subtitle: "Ingresos · carpeta cifrada · DEMO",
    kind: "income",
    protected: true,
    managedByHommie: true,
    updatedLabel: "Listas para visita",
  },
  {
    id: "doc-vida-laboral",
    title: "Vida laboral",
    subtitle: "Historial · Hommie la prepara contigo",
    kind: "employment",
    protected: true,
    managedByHommie: true,
    updatedLabel: "En carpeta",
  },
  {
    id: "doc-visit-brief",
    title: "Ficha del día de visita",
    subtitle: "Resumen del piso + checklist · se genera al agendar",
    kind: "visit",
    protected: true,
    managedByHommie: true,
    updatedLabel: "Se crea al confirmar cita",
  },
];

export const INITIAL_APP_SETTINGS: AppSettings = {
  calendarConnected: true,
  calendarEmail: "lamejiablooming@gmail.com",
  notifyNewMatches: true,
  notifyVisitReminders: true,
  rgpdConsent: true,
};
