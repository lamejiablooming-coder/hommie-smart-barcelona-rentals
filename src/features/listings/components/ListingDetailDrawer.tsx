import React, { useState } from "react";
import { Listing, Visit } from "@/shared/types";
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ArrowRight,
  Download,
  Share2,
  FileText,
  Check,
  Copy,
  ExternalLink,
  Eye,
  CalendarDays
} from "lucide-react";

interface ListingDetailDrawerProps {
  listing: Listing;
  onClose: () => void;
  onBookVisit: (visit: Visit) => void;
  existingVisits: Visit[];
}

const WEEKDAYS = [
  { day: "Lun", num: "12", dateStr: "12 OCT" },
  { day: "Mar", num: "13", dateStr: "13 OCT" },
  { day: "Mié", num: "14", dateStr: "14 OCT" },
  { day: "Jue", num: "15", dateStr: "15 OCT" },
  { day: "Vie", num: "16", dateStr: "16 OCT" },
  { day: "Sáb", num: "17", dateStr: "17 OCT" },
  { day: "Dom", num: "18", dateStr: "18 OCT" },
];

const TIME_SLOTS = [
  "09:00 - 09:45",
  "11:30 - 12:15",
  "16:00 - 16:45",
  "18:30 - 19:15",
];

export default function ListingDetailDrawer({
  listing,
  onClose,
  onBookVisit,
  existingVisits,
}: ListingDetailDrawerProps) {
  const [selectedDay, setSelectedDay] = useState(WEEKDAYS[2]); // Default Wednesday
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [copied, setCopied] = useState(false);
  const [showInfoPreview, setShowInfoPreview] = useState(false);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    dni: true,
    contrato: true,
    nominas: false,
    laboral: false,
    renta: false,
    carta: false,
  });

  const DOCUMENTS_LIST = [
    { id: "dni", label: "DNI o NIE vigente (por ambas caras)" },
    { id: "contrato", label: "Contrato de trabajo indefinido" },
    { id: "nominas", label: "Las 3 últimas nóminas salariales" },
    { id: "laboral", label: "Vida laboral actualizada (Seguridad Social)" },
    { id: "renta", label: "Declaración de la Renta / IRPF" },
    { id: "carta", label: "Carta de recomendación de tu casero anterior" }
  ];

  const confirmedVisit = existingVisits.find(
    (v) => v.listingId === listing.id && v.status === "Confirmado"
  );

  const activeConfirmedVisit = confirmedVisit || (isSuccess ? {
    id: `visit-new`,
    listingId: listing.id,
    listingTitle: `${listing.type} en ${listing.neighborhood}`,
    neighborhood: listing.neighborhood,
    date: selectedDay.dateStr,
    time: selectedSlot || "Hora acordada",
    status: "Confirmado",
    agent: "Agente Hommie"
  } : null);

  const toggleDoc = (id: string) => {
    setCheckedDocs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownloadSummary = (visitToUse: any) => {
    const text = `=========================================
HOMMIE - INFORME Y RESUMEN DE VISITA
=========================================

📍 INMUEBLE DETALLES:
-----------------------------------------
• Tipo: ${listing.type}
• Ubicación: ${listing.neighborhood}
• Precio: ${listing.price} €/mes
• Tamaño: ${listing.size} m²
• Habitaciones: ${listing.rooms}
• Portal origen: ${listing.origin}
• Hommie Safety Score: ${listing.securityScore}%

📋 ANÁLISIS DE SEGURIDAD (SAFETY SCORE):
-----------------------------------------
"${listing.securityReasons}"

🟢 PUNTOS FUERTES (PROS):
${listing.pros.map((p) => ` - [✓] ${p}`).join("\n")}

🔴 PUNTOS A CONSIDERAR (CONTRAS):
${listing.cons.map((c) => ` - [✗] ${c}`).join("\n")}

-----------------------------------------
📅 DETALLES DE TU VISITA EN CALENDARIO
-----------------------------------------
• Fecha: ${visitToUse?.date || "No programada"}
• Hora: ${visitToUse?.time || "No programada"}
• Agente de acompañamiento: ${visitToUse?.agent || "Por asignar"}
• Estado de Sincronización: VINCULADO CORRECTAMENTE CON GOOGLE CALENDAR
• Cuenta de sincronización: lamejiablooming@gmail.com

-----------------------------------------
📁 DOCUMENTACIÓN COMPLETA REQUERIDA
-----------------------------------------
Te recomendamos preparar y llevar estos documentos impresos y en PDF para ser el primero en aplicar si el piso te convence:
${DOCUMENTS_LIST.map((doc) => ` [${checkedDocs[doc.id] ? "X" : " "}] ${doc.label}`).join("\n")}

=========================================
¡Mucha suerte en tu visita!
El equipo de Hommie
ayuda@hommie.es | https://hommie.es
=========================================`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hommie-resumen-visita-${listing.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShareSummary = (visitToUse: any) => {
    const summaryText = `¡Hola! Mira los detalles de mi visita con Hommie:
🏠 ${listing.type} en ${listing.neighborhood} (${listing.price}€/mes)
📅 Cita: ${visitToUse?.date} a las ${visitToUse?.time} con el agente ${visitToUse?.agent}
✅ Sincronizado en mi Google Calendar (lamejiablooming@gmail.com)
🛡️ Hommie Safety Score: ${listing.securityScore}% (Fiabilidad garantizada)`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) {
      setErrorMessage("Por favor, selecciona una hora para la visita.");
      return;
    }
    if (!userName.trim() || !userPhone.trim()) {
      setErrorMessage("Por favor, completa tus datos de contacto.");
      return;
    }

    // Book it!
    const newVisit: Visit = {
      id: `visit-${Date.now()}`,
      listingId: listing.id,
      listingTitle: `${listing.type} en ${listing.neighborhood}`,
      neighborhood: listing.neighborhood,
      date: selectedDay.dateStr,
      time: selectedSlot,
      status: "Confirmado",
      agent: ["Marc Sala", "Elena Bosch", "Sofía Alarcón", "Daniel Cruz"][Math.floor(Math.random() * 4)],
    };

    onBookVisit(newVisit);
    setIsSuccess(true);
    setErrorMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs transition-opacity">
      {/* Drawer Overlay backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative w-full max-w-lg h-full bg-[#ffffff] shadow-2xl flex flex-col z-10 overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#ffffff] border-b border-[#ebebeb] px-6 py-4 flex justify-between items-center z-20">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="font-bold uppercase text-xs tracking-wider text-[#252525]">ANÁLISIS DE SEGURIDAD</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#ebebeb] transition-colors rounded"
            aria-label="Cerrar detalles"
          >
            <X className="w-5 h-5 text-[#252525]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-grow pb-24">
          
          {/* Main Visual Image & Info */}
          <div className="space-y-4">
            <div className="aspect-[16/10] overflow-hidden bg-[#f1edec] border border-[#ebebeb]">
              <img
                src={listing.imageUrl}
                alt="Detalle"
                className="w-full h-full object-cover grayscale-[0.05]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-[#252525]">
                  {listing.price.toLocaleString("es-ES")} € <span className="text-sm font-normal text-[#8e8e8e]">/ mes</span>
                </h3>
                <p className="text-xs text-[#a8a8a8] font-bold tracking-wide uppercase mt-1">
                  {listing.type} • {listing.neighborhood} • {listing.size} m² • {listing.rooms} hab.
                </p>
              </div>
              <div className="bg-[#252525] text-white text-[11px] font-bold uppercase tracking-widest px-2.5 py-1">
                {listing.origin}
              </div>
            </div>
          </div>

          {/* Separation line */}
          <hr className="border-[#ebebeb]" />

          {/* Safety Verification Section */}
          {(() => {
            const isPositive = listing.securityScore >= 80;
            const accentColor = isPositive ? "text-emerald-600" : "text-[#c2410c]";
            const barBgColor = isPositive ? "bg-emerald-600" : "bg-[#c2410c]";
            const blockBgColor = isPositive ? "bg-[#f4fbf7]" : "bg-[#fdf8f8]";
            
            return (
              <div className={`space-y-4 border border-[#ebebeb] p-5 ${blockBgColor}`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#252525]">Hommie Safety Score</span>
                  <span className={`text-2xl font-black ${accentColor}`}>{listing.securityScore}%</span>
                </div>

                {/* Score Bar */}
                <div className="w-full h-1.5 bg-[#ebebeb] overflow-hidden">
                  <div
                    className={`h-full transition-all duration-1000 ${barBgColor}`}
                    style={{ width: `${listing.securityScore}%` }}
                  />
                </div>

                <p className="text-xs text-[#252525] leading-relaxed italic bg-white p-3 border border-[#ebebeb]">
                  "{listing.securityReasons}"
                </p>

                {/* Verification checklist */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-[#252525]">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${accentColor}`} />
                    <span>Propietario verificado en Registro de Propiedad</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#252525]">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${accentColor}`} />
                    <span>Sin duplicados ni reportes de fraude en Barcelona</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#252525]">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${accentColor}`} />
                    <span>Alineado con el índice oficial de alquiler de Cataluña</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#252525]">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${accentColor}`} />
                    <span>Cédula de habitabilidad vigente inspeccionada</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Pros & Cons detail columns */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-[#ebebeb] p-3 space-y-2 bg-[#ffffff]">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block">✓ Pros</span>
              <ul className="space-y-1.5">
                {listing.pros.map((pro, i) => (
                  <li key={i} className="text-xs text-[#252525] leading-snug">
                    • {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#ebebeb] p-3 space-y-2 bg-[#ffffff]">
              <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">✗ Contras</span>
              <ul className="space-y-1.5">
                {listing.cons.map((con, i) => (
                  <li key={i} className="text-xs text-[#8e8e8e] leading-snug">
                    • {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="border-[#ebebeb]" />

          {/* Schedular / Booking section / Google Calendar Integration */}
          {activeConfirmedVisit ? (
            <div className="border border-emerald-600 bg-[#f4fbf7] p-5 space-y-5 rounded-none">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">VISITA CONFIRMADA</span>
                  </div>
                  <h4 className="text-sm font-black text-[#252525]">Esta cita ya está agendada</h4>
                </div>
                
                {/* Google Calendar Badge */}
                <div className="flex items-center gap-1 bg-white border border-emerald-200 px-2 py-1 text-[9px] font-mono font-bold text-emerald-800 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>GOOGLE CALENDAR</span>
                </div>
              </div>

              {/* Visit card info */}
              <div className="bg-white border border-[#ebebeb] p-3 space-y-2 text-xs text-[#252525]">
                <div className="flex justify-between border-b border-[#f1edec] pb-1.5">
                  <span className="text-[#8e8e8e]">Fecha y hora:</span>
                  <span className="font-bold flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5 text-[#252525]" />
                    {activeConfirmedVisit.date} a las {activeConfirmedVisit.time}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#f1edec] pb-1.5">
                  <span className="text-[#8e8e8e]">Agente Hommie:</span>
                  <span className="font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    {activeConfirmedVisit.agent}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8e8e]">Cuenta vinculada:</span>
                  <span className="font-mono font-medium text-emerald-700 bg-emerald-50/50 px-1">
                    lamejiablooming@gmail.com
                  </span>
                </div>
              </div>

              {/* Preparation Checklist */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#252525] uppercase tracking-wider block">
                  📁 DOCUMENTACIÓN REQUERIDA (Preparar para la visita)
                </span>
                <p className="text-[11px] text-[#8e8e8e] leading-snug">
                  Marca los documentos que ya tienes listos. Te recomendamos llevarlos impresos o en una carpeta digital compartida:
                </p>
                
                <div className="space-y-2">
                  {DOCUMENTS_LIST.map((doc) => (
                    <label
                      key={doc.id}
                      className="flex items-start gap-2.5 p-2 bg-white border border-[#ebebeb] hover:border-[#a8a8a8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={checkedDocs[doc.id] || false}
                        onChange={() => toggleDoc(doc.id)}
                        className="mt-0.5 accent-emerald-600 rounded-none w-3.5 h-3.5"
                      />
                      <span className={`text-xs text-[#252525] select-none ${checkedDocs[doc.id] ? 'line-through text-[#a8a8a8]' : ''}`}>
                        {doc.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quick Action Toolbar */}
              <div className="space-y-2 pt-2 border-t border-[#ebebeb]">
                <span className="text-[10px] font-bold text-[#252525] uppercase tracking-wider block">
                  ⚡ ACCIONES DE LA VISITA
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {/* Download Button */}
                  <button
                    onClick={() => handleDownloadSummary(activeConfirmedVisit)}
                    className="flex flex-col items-center justify-center gap-1.5 p-2 border border-[#252525] bg-[#252525] text-white hover:bg-black transition-colors"
                    title="Descargar resumen"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Descargar</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShareSummary(activeConfirmedVisit)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-2 border transition-colors ${
                      copied
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-[#ebebeb] bg-white text-[#252525] hover:bg-slate-50"
                    }`}
                    title="Compartir info de visita"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      {copied ? "Copiado" : "Compartir"}
                    </span>
                  </button>

                  {/* View Info Button */}
                  <button
                    onClick={() => setShowInfoPreview(!showInfoPreview)}
                    className={`flex flex-col items-center justify-center gap-1.5 p-2 border transition-colors ${
                      showInfoPreview
                        ? "border-[#252525] bg-[#252525]/5 text-[#252525]"
                        : "border-[#ebebeb] bg-white text-[#252525] hover:bg-slate-50"
                    }`}
                    title="Ver resumen completo"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      {showInfoPreview ? "Ocultar" : "Ver Info"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Expandable Info Preview Section */}
              {showInfoPreview && (
                <div className="border border-[#ebebeb] bg-white p-4 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#f1edec] pb-1.5">
                    <span className="text-[10px] font-bold text-[#252525] uppercase tracking-wider">RESUMEN DEL INMUEBLE</span>
                    <button 
                      onClick={() => setShowInfoPreview(false)}
                      className="text-xs text-[#8e8e8e] hover:text-[#252525]"
                    >
                      Cerrar
                    </button>
                  </div>
                  
                  <div className="space-y-3 text-xs leading-relaxed text-[#252525]">
                    <div>
                      <h5 className="font-bold text-[#252525] mb-1">📍 Inmueble y Seguridad</h5>
                      <p className="bg-[#fcfcfc] border border-[#ebebeb] p-2 text-[11px]">
                        <strong>{listing.type} en {listing.neighborhood}</strong> ({listing.price} €/mes)<br />
                        Seguridad Hommie Score: <strong>{listing.securityScore}%</strong> ({listing.securityReasons})
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-[#252525] mb-1">🔍 Pros y Contras Analizados</h5>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="bg-emerald-50/50 border border-emerald-100 p-2 text-emerald-800">
                          <strong className="block text-[10px] text-emerald-900 uppercase">Pros:</strong>
                          {listing.pros.map((p, idx) => (
                            <div key={idx}>• {p}</div>
                          ))}
                        </div>
                        <div className="bg-rose-50/50 border border-rose-100 p-2 text-rose-800">
                          <strong className="block text-[10px] text-rose-900 uppercase">Contras:</strong>
                          {listing.cons.map((c, idx) => (
                            <div key={idx}>• {c}</div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-[#252525] mb-1">📝 Estado de Preparación</h5>
                      <div className="bg-[#fcfcfc] border border-[#ebebeb] p-2 text-[11px] space-y-1">
                        {DOCUMENTS_LIST.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-1.5">
                            <span className={checkedDocs[doc.id] ? "text-emerald-600 font-bold" : "text-[#8e8e8e]"}>
                              {checkedDocs[doc.id] ? "✓" : "☐"}
                            </span>
                            <span className={checkedDocs[doc.id] ? "text-[#a8a8a8] line-through" : ""}>
                              {doc.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#252525]" />
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#252525]">AGENDAR VISITA AUTÓNOMA</h4>
              </div>
              
              <p className="text-xs text-[#8e8e8e] leading-relaxed">
                Selecciona uno de los huecos coordinados automáticamente con la agenda del propietario. Hommie reservará el turno por ti de inmediato.
              </p>

              <form onSubmit={handleBook} className="space-y-4">
                {/* Day selector carousel */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#ebebeb]">
                  {WEEKDAYS.map((wk, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => {
                        setSelectedDay(wk);
                        setSelectedSlot(null);
                      }}
                      className={`flex flex-col items-center p-2 border min-w-[56px] transition-all ${
                        selectedDay.num === wk.num
                          ? "border-[#252525] bg-[#252525] text-white"
                          : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#8e8e8e]"
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase">{wk.day}</span>
                      <span className="text-sm font-bold">{wk.num}</span>
                    </button>
                  ))}
                </div>

                {/* Slots selection */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-wider block">Horas disponibles para {selectedDay.dateStr}</span>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map((slot, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSelectedSlot(slot)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 border text-xs font-medium transition-all ${
                          selectedSlot === slot
                            ? "border-[#252525] bg-[#252525] text-white"
                            : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525] bg-white"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact data */}
                <div className="space-y-3 border-t border-[#ebebeb] pt-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#252525] uppercase tracking-wider block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Marc Alarcón"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ebebeb] text-xs focus:outline-none focus:border-[#252525] bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#252525] uppercase tracking-wider block mb-1">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. +34 600 123 456"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-[#ebebeb] text-xs focus:outline-none focus:border-[#252525] bg-white"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-600 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* Action button */}
                <button
                  type="submit"
                  className="w-full bg-[#252525] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-black active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <span>Reservar turno de visita</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
