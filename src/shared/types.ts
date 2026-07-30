export interface Listing {
  id: string;
  price: number;
  neighborhood: string;
  origin: string;
  imageUrl: string;
  securityScore: number;
  securityReasons: string;
  pros: string[];
  cons: string[];
  description: string;
  isSaved: boolean;
  type: "Ático" | "Loft" | "Piso" | "Estudio";
  size: number;
  rooms: number;
}

export interface Visit {
  id: string;
  listingId: string;
  listingTitle: string;
  neighborhood: string;
  date: string; // e.g. "12 OCT"
  time: string; // e.g. "17:30"
  status: "Confirmado" | "Pendiente";
  agent: string;
}

export type AppState = "NORMAL" | "LOADING" | "EMPTY" | "ERROR";

export type Tab = "DASHBOARD" | "SEARCH" | "SAVED" | "PROFILE";

export interface OnboardingMoment {
  icon: "home" | "map" | "eye" | "calendar" | "shield" | "scale" | "file" | "heart";
  label: string;
  detail: string;
}

export interface OnboardingStep {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  demoLabel: string;
  imageUrl?: string;
  moments: OnboardingMoment[];
  closingLine?: string;
}

export type VerificationStatus = "verified" | "pending";

export type LifeStage =
  | "Estudiante Universitario"
  | "Joven Profesional"
  | "Pareja Conviviente"
  | "Familia con Hijos";

export interface VerificationSignal {
  id: string;
  label: string;
  detail: string;
  done: boolean;
}

export interface UserProfile {
  displayName: string;
  email: string;
  avatarUrl: string;
  contextLine: string;
  lifeStage: LifeStage;
  verificationStatus: VerificationStatus;
  verificationSignals: VerificationSignal[];
  verificationNote: string;
  demoLabel: string;
}

export type DocumentKind = "identity" | "income" | "employment" | "visit";

export interface ManagedDocument {
  id: string;
  title: string;
  subtitle: string;
  kind: DocumentKind;
  protected: boolean;
  managedByHommie: boolean;
  updatedLabel: string;
}

export interface AppSettings {
  calendarConnected: boolean;
  calendarEmail: string;
  notifyNewMatches: boolean;
  notifyVisitReminders: boolean;
  rgpdConsent: boolean;
}

// --- Demo Day (ruta /demo-day, aislada del producto) ---

/** Par etiqueta/valor de las secciones de decisiones, verificación y cierre. */
export interface DemoDayPair {
  id: string;
  label: string;
  value: string;
}

/** Pantalla del producto que se recorre en la demo en vivo. */
export interface DemoDayScreen {
  id: string;
  index: string;
  label: string;
  detail: string;
}

interface DemoDaySlideBase {
  id: string;
  /** Nombre corto para la navegación de diapositivas. */
  navLabel: string;
  /** Tramo hablado, p. ej. "0:00–0:30". Ausente en la portada. */
  timing?: string;
}

export interface DemoDayCoverSlide extends DemoDaySlideBase {
  kind: "cover";
  brand: string;
  tagline: string;
  urlLabel: string;
  url: string;
}

export interface DemoDayBulletsSlide extends DemoDaySlideBase {
  kind: "bullets";
  title: string;
  bullets: string[];
}

export interface DemoDayDemoSlide extends DemoDaySlideBase {
  kind: "demo";
  title: string;
  ctaLabel: string;
  url: string;
  screens: DemoDayScreen[];
  offCameraLabel: string;
  offCamera: string;
  demoLabel: string;
  demoNote: string;
}

export interface DemoDayPairsSlide extends DemoDaySlideBase {
  kind: "pairs";
  title: string;
  pairs: DemoDayPair[];
  /** Par que se destaca como conclusión de la sección. */
  highlightId?: string;
}

export type DemoDaySlide =
  | DemoDayCoverSlide
  | DemoDayBulletsSlide
  | DemoDayDemoSlide
  | DemoDayPairsSlide;
