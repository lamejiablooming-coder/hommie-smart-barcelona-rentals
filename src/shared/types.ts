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
