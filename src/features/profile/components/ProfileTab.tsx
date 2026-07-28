import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  FileText,
  Briefcase,
  IdCard,
  CalendarDays,
  ChevronRight,
  Check,
  Bell,
  Scale,
  Eye,
} from "lucide-react";
import { AppSettings, ManagedDocument, UserProfile } from "@/shared/types";
import {
  INITIAL_APP_SETTINGS,
  INITIAL_MANAGED_DOCUMENTS,
  INITIAL_USER_PROFILE,
  LIFE_STAGES,
} from "@/features/profile/data";

interface ProfileTabProps {
  lifeStage: string;
  onLifeStageChange: (stage: string) => void;
  onGoToSearch: () => void;
  showDemoExtras?: boolean;
  onReopenOnboarding?: () => void;
}

function docIcon(kind: ManagedDocument["kind"]) {
  switch (kind) {
    case "identity":
      return IdCard;
    case "income":
      return FileText;
    case "employment":
      return Briefcase;
    case "visit":
      return CalendarDays;
    default:
      return FileText;
  }
}

export default function ProfileTab({
  lifeStage,
  onLifeStageChange,
  onGoToSearch,
  showDemoExtras = false,
  onReopenOnboarding,
}: ProfileTabProps) {
  const [profile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [documents] = useState<ManagedDocument[]>(INITIAL_MANAGED_DOCUMENTS);
  const [settings, setSettings] = useState<AppSettings>(INITIAL_APP_SETTINGS);

  const isVerified = profile.verificationStatus === "verified";

  const handleDocAction = (doc: ManagedDocument, action: "view" | "prepare") => {
    if (action === "view") {
      alert(
        `DEMO · Vista protegida\n\n«${doc.title}» permanece cifrado. Hommie solo lo muestra o envía cuando tú lo autorices.`
      );
      return;
    }
    alert(
      `DEMO · Hommie prepara «${doc.title}» para la próxima visita.\n\nNo se envía nada al anunciante sin tu confirmación (RGPD).`
    );
  };

  const toggleSetting = (key: keyof Pick<AppSettings, "notifyNewMatches" | "notifyVisitReminders" | "rgpdConsent">) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#252525]">
          Tu perfil
        </h2>
        <p className="text-xs text-[#8e8e8e] leading-relaxed">
          Así te ven quienes alquilan. Hommie humaniza el proceso: confianza, papeles en orden y tú al mando.
        </p>
      </div>

      {/* 1. Hero persona */}
      <section className="border border-[#ebebeb] bg-white overflow-hidden">
        <div className="relative h-28 bg-[#f5f5f5] border-b border-[#ebebeb]">
          <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_20%_40%,#ebebeb_0%,transparent_55%),radial-gradient(circle_at_80%_20%,#e8e8e8_0%,transparent_50%)]" />
        </div>
        <div className="px-5 pb-5 -mt-10 relative space-y-4">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-white shrink-0">
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 pb-1 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-[#252525] tracking-tight truncate">
                  {profile.displayName}
                </h3>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    Verificado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#c2410c] bg-orange-50 border border-orange-200 px-2 py-0.5">
                    <ShieldAlert className="w-3 h-3" />
                    Pendiente
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#8e8e8e] truncate mt-0.5">{profile.email}</p>
            </div>
          </div>

          <p className="text-xs text-[#252525] leading-relaxed">{profile.contextLine}</p>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#a8a8a8] block">
              Momento de vida
            </span>
            <div className="flex flex-wrap gap-1.5">
              {LIFE_STAGES.map((stage) => {
                const active = lifeStage === stage;
                return (
                  <button
                    type="button"
                    key={stage}
                    onClick={() => onLifeStageChange(stage)}
                    className={`px-2.5 py-1.5 text-[11px] font-medium border transition-all ${
                      active
                        ? "border-[#252525] bg-[#252525] text-white"
                        : "border-[#ebebeb] text-[#252525] hover:border-[#a8a8a8] bg-white"
                    }`}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToSearch}
            className="w-full flex items-center justify-between gap-2 border border-[#ebebeb] px-3 py-2.5 text-xs text-[#252525] hover:border-[#252525] transition-all bg-white"
          >
            <span className="font-medium">Criterios de búsqueda (zonas, tipología, IA)</span>
            <ChevronRight className="w-4 h-4 text-[#a8a8a8] shrink-0" />
          </button>
        </div>
      </section>

      {/* 2. Verificación */}
      <section className="border border-[#ebebeb] bg-white p-5 space-y-4">
        <div className="space-y-2">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8] block">
              Frente a quien alquila
            </span>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">
              Estado de verificación
            </h3>
          </div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#a8a8a8] border border-[#ebebeb] px-2 py-1 max-w-full">
            {profile.demoLabel}
          </span>
        </div>

        <div
          className={`flex items-center gap-3 border p-3 ${
            isVerified
              ? "border-emerald-200 bg-emerald-50/60"
              : "border-orange-200 bg-orange-50/50"
          }`}
        >
          {isVerified ? (
            <ShieldCheck className="w-8 h-8 text-emerald-600 stroke-[1.5] shrink-0" />
          ) : (
            <ShieldAlert className="w-8 h-8 text-[#c2410c] stroke-[1.5] shrink-0" />
          )}
          <div className="min-w-0">
            <p
              className={`text-xs font-bold uppercase tracking-wider ${
                isVerified ? "text-emerald-800" : "text-[#c2410c]"
              }`}
            >
              {isVerified ? "Perfil con señales de confianza" : "Verificación pendiente"}
            </p>
            <p className="text-[11px] text-[#8e8e8e] mt-0.5 leading-relaxed">
              {isVerified
                ? "Los agentes ven que Hommie ha revisado tus señales básicas."
                : "Completa los pasos para que tu perfil inspire más confianza."}
            </p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {profile.verificationSignals.map((signal) => (
            <li key={signal.id} className="flex gap-3 items-start">
              <span
                className={`mt-0.5 w-5 h-5 flex items-center justify-center border shrink-0 ${
                  signal.done
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-[#ebebeb] text-[#a8a8a8]"
                }`}
              >
                {signal.done ? <Check className="w-3 h-3" /> : null}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#252525]">{signal.label}</p>
                <p className="text-[11px] text-[#8e8e8e] leading-relaxed">{signal.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-[11px] text-[#8e8e8e] leading-relaxed border-t border-[#ebebeb] pt-3">
          {profile.verificationNote}
        </p>
      </section>

      {/* 3. Carpeta documentos */}
      <section className="border border-[#ebebeb] bg-white p-5 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#252525] stroke-[1.5]" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">
              Carpeta protegida
            </h3>
          </div>
          <p className="text-xs text-[#8e8e8e] leading-relaxed">
            Hommie custodia y prepara tus papeles por ti. Nada sale de aquí sin tu permiso (RGPD · DEMO).
          </p>
        </div>

        <ul className="divide-y divide-[#ebebeb] border border-[#ebebeb]">
          {documents.map((doc) => {
            const Icon = docIcon(doc.kind);
            return (
              <li key={doc.id} className="p-3 space-y-2.5 bg-white">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 border border-[#ebebeb] flex items-center justify-center shrink-0 bg-[#fafafa]">
                    <Icon className="w-4 h-4 text-[#252525] stroke-[1.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-xs font-bold text-[#252525]">{doc.title}</p>
                      {doc.protected && (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8e8e8e] border border-[#ebebeb] px-1.5 py-0.5 inline-flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          Protegido
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8e8e8e] mt-0.5">{doc.subtitle}</p>
                    <p className="text-[10px] text-[#a8a8a8] mt-1 uppercase tracking-wider font-medium">
                      {doc.managedByHommie ? "Gestionado por Hommie · " : ""}
                      {doc.updatedLabel}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 pl-12">
                  <button
                    type="button"
                    onClick={() => handleDocAction(doc, "view")}
                    className="flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider border border-[#ebebeb] text-[#252525] hover:border-[#252525] transition-all inline-flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    Ver
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDocAction(doc, "prepare")}
                    className="flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-[#252525] text-white hover:bg-black transition-all"
                  >
                    Preparar visita
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 4. Configuración */}
      <section className="border border-[#ebebeb] bg-white p-5 space-y-5">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">
            Configuración de la app
          </h3>
          <p className="text-xs text-[#8e8e8e]">Ajustes · DEMO — sin backend real.</p>
        </div>

        {/* Calendar */}
        <div className="border border-[#ebebeb] p-4 space-y-3 bg-[#fdf8f8]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                settings.calendarConnected ? "bg-emerald-500" : "bg-[#a8a8a8]"
              }`}
            />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#252525]">
              {settings.calendarConnected ? "Google Calendar activo" : "Google Calendar desvinculado"}
            </span>
          </div>
          <p className="text-xs text-[#8e8e8e] leading-relaxed">
            Las visitas agendadas se reflejan en la cuenta vinculada. Simulación de sincronización.
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {settings.calendarConnected && (
              <span className="text-xs font-semibold text-[#252525] bg-white border border-[#ebebeb] px-3 py-1.5 rounded-md">
                {settings.calendarEmail}
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                const next = !settings.calendarConnected;
                setSettings((prev) => ({ ...prev, calendarConnected: next }));
                alert(
                  next
                    ? "DEMO · Has vinculado Google Calendar de forma segura."
                    : "DEMO · Has desvinculado tu cuenta de Google Calendar."
                );
              }}
              className="text-xs text-[#8e8e8e] hover:text-[#252525] uppercase tracking-widest font-bold px-2"
            >
              {settings.calendarConnected ? "Desvincular" : "Vincular"}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-[#252525] stroke-[1.5]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#252525]">
              Notificaciones
            </span>
          </div>
          {(
            [
              {
                key: "notifyNewMatches" as const,
                label: "Nuevos pisos que encajan",
                detail: "Aviso cuando Hommie encuentra ofertas alineadas",
              },
              {
                key: "notifyVisitReminders" as const,
                label: "Recordatorios de visita",
                detail: "El día anterior y una hora antes",
              },
            ] as const
          ).map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between gap-3 cursor-pointer select-none border border-[#ebebeb] p-3 hover:border-[#a8a8a8] transition-all"
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#252525]">{item.label}</p>
                <p className="text-[11px] text-[#8e8e8e]">{item.detail}</p>
              </div>
              <input
                type="checkbox"
                checked={settings[item.key]}
                onChange={() => toggleSetting(item.key)}
                className="rounded border-[#ebebeb] text-[#252525] focus:ring-0 shrink-0"
              />
            </label>
          ))}
        </div>

        {/* RGPD */}
        <div className="space-y-3 border-t border-[#ebebeb] pt-4">
          <div className="flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-[#252525] stroke-[1.5]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#252525]">
              Privacidad · RGPD
            </span>
          </div>
          <p className="text-[11px] text-[#8e8e8e] leading-relaxed">
            Hommie prepara y envía solo lo necesario, contigo al mando. Consentimiento DEMO — no sustituye un aviso legal real.
          </p>
          <label className="flex items-center justify-between gap-3 cursor-pointer select-none border border-[#ebebeb] p-3">
            <span className="text-xs font-semibold text-[#252525]">
              Autorizo a Hommie a gestionar mi carpeta (DEMO)
            </span>
            <input
              type="checkbox"
              checked={settings.rgpdConsent}
              onChange={() => toggleSetting("rgpdConsent")}
              className="rounded border-[#ebebeb] text-[#252525] focus:ring-0 shrink-0"
            />
          </label>
        </div>

        {showDemoExtras && onReopenOnboarding && (
          <button
            type="button"
            onClick={onReopenOnboarding}
            className="w-full py-2 text-[10px] font-bold uppercase tracking-wider border border-[#ebebeb] text-[#8e8e8e] hover:border-[#252525] hover:text-[#252525] transition-all"
          >
            Volver a la introducción
          </button>
        )}
      </section>
    </div>
  );
}
