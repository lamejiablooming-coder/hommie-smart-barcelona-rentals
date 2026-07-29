import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { spanishProfessionalAvatar } from "@/assets/images";
import {
  INITIAL_LISTINGS,
  INITIAL_VISITS,
  VISIT_TIPS,
} from "@/features/listings/data";
import { Listing, Visit, AppState, Tab } from "@/shared/types";
import ListingCard from "@/features/listings/components/ListingCard";
import ListingDetailDrawer from "@/features/listings/components/ListingDetailDrawer";
import Onboarding from "@/features/onboarding/components/Onboarding";
import ProfileTab from "@/features/profile/components/ProfileTab";
import { ONBOARDING_STORAGE_KEY } from "@/features/onboarding/data";
import {
  Search,
  Bookmark,
  User,
  LayoutDashboard,
  Calendar,
  Sparkles,
  RefreshCw,
  Sliders,
  AlertCircle,
  Clock,
  MapPin,
  ShieldAlert,
  Plus,
  Send,
  Trash2,
  Check,
  CheckCircle,
  Home,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  List,
  GitCommit,
  Layers,
  Columns3,
  MessageSquare,
} from "lucide-react";

export default function App() {
  // Application State
  const [appState, setAppState] = useState<AppState>("NORMAL");
  const [activeTab, setActiveTab] = useState<Tab>("DASHBOARD");
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Search & Filter States (Profile preferences)
  const [budget, setBudget] = useState<number>(2200);
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>([
    "Gràcia",
    "Eixample Dret",
    "Poblenou",
  ]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "Piso",
    "Ático",
    "Loft",
  ]);
  const [lifeStage, setLifeStage] = useState<string>("Joven Profesional");

  // Custom Analyzer form state
  const [analyzerUrl, setAnalyzerUrl] = useState("");
  const [analyzerText, setAnalyzerText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzerSuccess, setAnalyzerSuccess] = useState(false);

  // Demo shell: only with ?demo=1 (default = vista usuario a pantalla completa)
  const [showDemoPanel] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("demo") === "1";
  });

  // Device frame toggle (solo relevante con panel de demo)
  const [isSimulatorMode, setIsSimulatorMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("demo") === "1";
  });

  // Onboarding gate (once per browser session; reopenable from demo panel)
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof sessionStorage === "undefined") return true;
    return sessionStorage.getItem(ONBOARDING_STORAGE_KEY) !== "1";
  });

  const finishOnboarding = () => {
    try {
      sessionStorage.setItem(ONBOARDING_STORAGE_KEY, "1");
    } catch {
      /* ignore storage errors in demo */
    }
    setShowOnboarding(false);
    setActiveTab("DASHBOARD");
  };

  const reopenOnboarding = () => {
    try {
      sessionStorage.removeItem(ONBOARDING_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setShowOnboarding(true);
  };

  // Layout proposals state for the selected visits component
  const [visitViewStyle, setVisitViewStyle] = useState<"day" | "week" | "month">("day");
  const [isVisitsExpanded, setIsVisitsExpanded] = useState<boolean>(false);

  // Filter listings based on current filters & active state
  const filteredListings = listings.filter((l) => {
    if (appState === "EMPTY") return false;
    
    const matchesBudget = l.price <= budget;
    const matchesNeighborhood =
      selectedNeighborhoods.length === 0 ||
      selectedNeighborhoods.includes(l.neighborhood);
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(l.type);

    return matchesBudget && matchesNeighborhood && matchesType;
  });

  // Handle saving listing
  const handleToggleSave = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isSaved: !l.isSaved } : l))
    );
  };

  // Handle booking visit
  const handleBookVisit = (newVisit: Visit) => {
    setVisits((prev) => [newVisit, ...prev]);
  };

  // Handle AI analysis using the server-side API route
  const handleAIAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!analyzerUrl && !analyzerText) return;

    setIsAnalyzing(true);
    setAnalyzerSuccess(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: analyzerUrl,
          text: analyzerText,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en el análisis de la oferta.");
      }

      const parsedNewListing = await response.json();
      
      // Construct listing object
      const fullNewListing: Listing = {
        id: `flat-ai-${Date.now()}`,
        price: parsedNewListing.price || 1500,
        neighborhood: parsedNewListing.neighborhood || "Gràcia",
        origin: parsedNewListing.origin || "Idealista",
        imageUrl: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAVxDv9NJN2GFwhrrMVG_-pu18-STW8yKk1nYbUMYiVgyRJvfO8UvSg5bseVOlRGX_RJlY6elAaLkK090tPME3xf9BasqMZuU-pcgqc4rNCOPcck5ev2QrCkPy0a3jb3qaEUzuJSV3pLN7dQSpymnWtOMlohPANFmCADL9hS7oZX9S7k-dTmaDvwdHE_Ph8s9cG7-nypb1mTuPr56PdlDoepYMv6DQPjpLqsnyodLkI6DU-vC-YiJTppJWI-WZ_pexYkmWqojfU7s8",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBzSJ7pnyGYOlb5hbTPJkX9aO8z3ur-_vkVvFIPdmU2gEw6-j2BRLSGsDtPvNp7-ZeUpYvK46hVD25o9bk7FtCKgnjA1TXnA3Yf83fYgJf5hK_gsUrKAGQ3LxHrvneNRNHKUTCLp3YRjIaEfiQGpb7n0JVuF0uNYZEX1WRz-xMvsJaOB6pMQM-RnBSG2NKwFFpBDNPvHzXqCU1NcV5j4s33ove1WtcLkfIqG3NWq4Z6Q66KQf0hE4I3vYYK1Hspo6KH3A2bgivRCGg"
        ][Math.floor(Math.random() * 2)],
        securityScore: parsedNewListing.securityScore || 85,
        securityReasons: parsedNewListing.securityReasons || "Analizado de manera segura por la IA de Hommie.",
        pros: parsedNewListing.pros || ["Luminoso", "Bien ubicado"],
        cons: parsedNewListing.cons || ["Sin parking", "Fianza alta"],
        description: parsedNewListing.description || "Oferta analizada de forma automática.",
        isSaved: false,
        type: "Piso",
        size: 70,
        rooms: 2,
      };

      setListings((prev) => [fullNewListing, ...prev]);
      setAnalyzerSuccess(true);
      setAnalyzerUrl("");
      setAnalyzerText("");
      
      // Auto switch back to dashboard to see it
      setTimeout(() => {
        setActiveTab("DASHBOARD");
        setAnalyzerSuccess(false);
      }, 1500);

    } catch (error) {
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Toggle list selection helpers
  const toggleNeighborhood = (name: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const toggleType = (name: string) => {
    setSelectedTypes((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <div
      className={`min-h-screen bg-[#ffffff] text-[#252525] font-sans antialiased flex flex-col ${
        showDemoPanel ? "xl:flex-row border-t-2 border-[#252525]" : ""
      }`}
    >
      
      {/* 1. Left Editorial Sidebar Panel — solo con ?demo=1 */}
      {showDemoPanel && (
      <aside className="w-full xl:w-[320px] bg-[#ffffff] border-b xl:border-b-0 xl:border-r border-[#ebebeb] p-6 flex flex-col justify-between space-y-8 flex-shrink-0">
        
        <div className="space-y-6">
          {/* Hommie branding with high alignment to 'Ink & Pencil Gallery' */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#252525] flex items-center justify-center text-white font-black text-[10px] tracking-tighter">H</div>
            <span className="font-bold tracking-widest text-sm uppercase text-[#252525]">HOMMIE / PisoMatch</span>
          </div>

          <hr className="border-[#ebebeb]" />

          {/* Subtitle / Bio */}
          <div className="space-y-2">
            <h1 className="text-xs font-bold uppercase tracking-widest text-[#a8a8a8]">Misión Inmobiliaria</h1>
            <p className="text-xs text-[#252525] leading-relaxed">
              Agregamos las principales ofertas de Barcelona en Gràcia, Eixample, El Born y Poblenou. Estudiamos la seguridad registral, el control de precios, generamos análisis de pros y contras con IA y agendamos visitas coordinadas automáticamente.
            </p>
          </div>

          {/* Profile card aligned to Google User email */}
          <div className="border border-[#ebebeb] p-4 space-y-2.5 bg-neutral-50/50">
            <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-wider block">Usuario Activo</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#ebebeb]">
                <img
                  src={spanishProfessionalAvatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#252525] truncate">lamejiablooming@gmail.com</p>
                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Google Calendar Sincronizado
                </p>
              </div>
            </div>
          </div>

          {/* User preferences summary */}
          <div className="space-y-2 border border-[#ebebeb] p-4 bg-white text-xs">
            <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-wider block">Perfil de Recomendación</span>
            <p className="text-[#252525]"><strong>Momento de vida:</strong> {lifeStage}</p>
            <p className="text-[#252525]"><strong>Presupuesto máx:</strong> {budget} €/mes</p>
            <p className="text-[#252525]"><strong>Barrios:</strong> {selectedNeighborhoods.join(", ") || "Todos"}</p>
          </div>
        </div>

        {/* State and Mode Controllers */}
        <div className="space-y-4 pt-6 border-t border-[#ebebeb]">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-widest block">CONTROL DE ESTADOS DE DEMO</span>
            <p className="text-[11px] text-[#8e8e8e]">Inspecciona todos los flujos solicitados en el prompt:</p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => { setAppState("NORMAL"); setListings(INITIAL_LISTINGS); }}
              className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border text-center transition-all ${
                appState === "NORMAL"
                  ? "border-[#252525] bg-[#252525] text-white"
                  : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525]"
              }`}
            >
              🟢 Normal
            </button>
            <button
              onClick={() => setAppState("LOADING")}
              className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border text-center transition-all ${
                appState === "LOADING"
                  ? "border-[#252525] bg-[#252525] text-white"
                  : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525]"
              }`}
            >
              🟡 Cargando
            </button>
            <button
              onClick={() => setAppState("EMPTY")}
              className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border text-center transition-all ${
                appState === "EMPTY"
                  ? "border-[#252525] bg-[#252525] text-white"
                  : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525]"
              }`}
            >
              ⚪ Vacío
            </button>
            <button
              onClick={() => setAppState("ERROR")}
              className={`py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border text-center transition-all ${
                appState === "ERROR"
                  ? "border-[#252525] bg-[#252525] text-white"
                  : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525]"
              }`}
            >
              🔴 Error
            </button>
          </div>

          <button
            type="button"
            onClick={reopenOnboarding}
            className={`w-full py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border text-center transition-all ${
              showOnboarding
                ? "border-[#252525] bg-[#252525] text-white"
                : "border-[#ebebeb] hover:border-[#a8a8a8] text-[#252525]"
            }`}
          >
            Ver onboarding
          </button>

          {/* Viewport switch controls */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-widest block">MODO DE VISUALIZACIÓN</span>
            <div className="flex border border-[#ebebeb]">
              <button
                onClick={() => setIsSimulatorMode(true)}
                className={`flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider ${
                  isSimulatorMode ? "bg-[#252525] text-white" : "hover:bg-neutral-50 text-[#8e8e8e]"
                }`}
              >
                📱 Móvil 1:1 (375px)
              </button>
              <button
                onClick={() => setIsSimulatorMode(false)}
                className={`flex-1 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider ${
                  !isSimulatorMode ? "bg-[#252525] text-white" : "hover:bg-neutral-50 text-[#8e8e8e]"
                }`}
              >
                🖥️ Desktop Completo
              </button>
            </div>
          </div>

          {/* live location stamp from the style guide */}
          <div className="text-[10px] text-[#a8a8a8] font-mono flex justify-between pt-2">
            <span>BARCELONA 03:02</span>
            <span>Estilo Editorial Dul Zorigoo</span>
          </div>

        </div>
      </aside>
      )}

      {/* 2. Interactive Main Workspace / Mobile Simulator Panel */}
      <section
        className={
          showDemoPanel
            ? "flex-grow bg-[#fafafa] flex items-center justify-center p-4 xl:p-8 overflow-x-hidden min-h-[750px]"
            : "flex-grow flex flex-col overflow-x-hidden min-h-screen"
        }
      >
        
        {/* Conditional Wrap: Is it a simulated mobile frame or an expanded responsive desktop panel? */}
        {/*
          `@container/app`: la escala tipográfica de dentro responde al ancho de ESTE
          contenedor, no del viewport. Así el simulador de 375px sigue viéndose como
          móvil aunque la ventana sea de escritorio.
        */}
        <div
          className={
            showDemoPanel
              ? `@container/app transition-all duration-500 bg-[#ffffff] border border-[#ebebeb] ${
                  isSimulatorMode
                    ? "w-[375px] h-[812px] flex flex-col relative overflow-hidden shadow-2xl rounded-3xl"
                    : "w-full max-w-5xl h-full min-h-[780px] flex flex-col"
                }`
              : "@container/app w-full min-h-screen flex flex-col bg-[#ffffff]"
          }
        >
          
          {/* Simulated Smartphone Status Bar (Visible only in Simulator Mode) */}
          {isSimulatorMode && (
            <div className="bg-[#ffffff] px-6 pt-3 pb-1 flex justify-between items-center text-[11px] font-bold text-[#252525] border-b border-[#f5f5f5] select-none shrink-0">
              <span>03:02</span>
              {/* Notch */}
              <div className="w-24 h-4 bg-black rounded-b-xl absolute top-0 left-1/2 transform -translate-x-1/2 z-30" />
              <div className="flex items-center gap-1 text-[9px]">
                <span>5G</span>
                <span className="w-4 h-2.5 bg-[#252525] rounded-xs inline-block"></span>
              </div>
            </div>
          )}

          {showOnboarding ? (
            <div className="flex-grow min-h-0 flex flex-col">
              <Onboarding onComplete={finishOnboarding} onSkip={finishOnboarding} />
            </div>
          ) : (
          <>
          {/* A. Top App Header */}
          <header className="px-6 py-4 @3xl/app:px-10 @3xl/app:py-6 @5xl/app:px-14 border-b border-[#ebebeb] flex justify-between items-center bg-white shrink-0">
            <div className="flex items-center gap-2 @3xl/app:gap-3">
              <Home className="w-5 h-5 @3xl/app:w-7 @3xl/app:h-7 text-[#252525] stroke-[1.5]" />
              <span className="font-bold tracking-tighter text-sm @3xl/app:text-xl uppercase text-[#252525]">HOMMIE</span>
            </div>

            {/* Profile sync state */}
            <div className="flex items-center gap-2 @3xl/app:gap-4">
              <span className="hidden @3xl/app:block text-right text-base @5xl/app:text-lg font-bold text-[#252525] leading-tight">
                Irene
                <span className="block text-[11px] @5xl/app:text-xs font-medium uppercase tracking-widest text-[#a8a8a8]">{lifeStage}</span>
              </span>
              <button
                onClick={() => setActiveTab("PROFILE")}
                aria-label="Ir a tu perfil"
                className="w-8 h-8 @3xl/app:w-16 @3xl/app:h-16 @5xl/app:w-[72px] @5xl/app:h-[72px] rounded-full overflow-hidden border border-[#ebebeb] hover:border-[#252525] transition-colors shrink-0"
              >
                <img
                  src={spanishProfessionalAvatar}
                  alt="Tu foto de perfil"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          </header>

          {/* B. Core Content Area (Scrollable viewport)
              El contenido se centra con un ancho máximo (~1200px) para que en desktop
              las líneas de texto no se hagan ilegibles y las fotos no se escalen por
              encima de su resolución nativa (896–1024px de ancho). */}
          <div className="flex-grow overflow-y-auto bg-white hide-scrollbar relative">
          <div className="w-full max-w-[1440px] mx-auto p-6 @3xl/app:px-10 @3xl/app:py-8 @5xl/app:px-14 space-y-6 @3xl/app:space-y-8">
            
            {/* -------------------- STATE 1: ERROR STATE -------------------- */}
            {appState === "ERROR" ? (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-4 py-12">
                <ShieldAlert className="w-12 h-12 text-rose-500 stroke-[1.5]" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#252525]">Fallo de Sincronización</h3>
                  <p className="text-xs text-[#8e8e8e] max-w-[240px] leading-relaxed mx-auto">
                    No pudimos actualizar las ofertas en tiempo real de Idealista ni Fotocasa. Comprueba tu conexión a Internet o inténtalo en 5 minutos.
                  </p>
                </div>
                <button
                  onClick={() => { setAppState("NORMAL"); setListings(INITIAL_LISTINGS); }}
                  className="border border-[#252525] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#ffffff] bg-[#252525] hover:bg-black transition-colors"
                >
                  Reintentar sincronizar
                </button>
              </div>
            ) : appState === "LOADING" ? (
              
              /* -------------------- STATE 2: LOADING SKELETON -------------------- */
              <div className="space-y-6 py-4">
                {/* Hero card loading */}
                <div className="border border-[#ebebeb] p-5 space-y-4 animate-pulse">
                  <div className="h-3 bg-[#ebebeb] w-1/4 rounded"></div>
                  <div className="h-10 bg-[#ebebeb] w-1/2 rounded"></div>
                  <div className="h-4 bg-[#ebebeb] w-3/4 rounded"></div>
                </div>

                {/* Filter chips loading */}
                <div className="flex gap-2">
                  <div className="h-8 bg-[#ebebeb] w-20 rounded-md animate-pulse"></div>
                  <div className="h-8 bg-[#ebebeb] w-20 rounded-md animate-pulse"></div>
                  <div className="h-8 bg-[#ebebeb] w-20 rounded-md animate-pulse"></div>
                </div>

                {/* Card listings loading */}
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="border border-[#ebebeb] bg-white animate-pulse">
                      <div className="aspect-[4/3] bg-[#f1edec] w-full"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-[#ebebeb] w-1/3"></div>
                        <div className="h-3 bg-[#ebebeb] w-1/2"></div>
                        <div className="h-3 bg-[#ebebeb] w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            ) : (

              /* -------------------- STATE 3: FULLY INTERACTIVE APP -------------------- */
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  
                  {/* TAB 1: DASHBOARD VIEW */}
                  {activeTab === "DASHBOARD" && (
                    <>
                      {/* Gestor de Visitas - Space Optimized Expandable Widget */}
                      <div className="border border-[#ebebeb] bg-white transition-all duration-300 overflow-hidden">
                        {/* Interactive compact header bar (acts as a premium notification capsule when collapsed) */}
                        <div 
                          onClick={() => setIsVisitsExpanded(!isVisitsExpanded)}
                          className="p-3 @3xl/app:p-5 flex items-center justify-between gap-3 @3xl/app:gap-5 cursor-pointer select-none hover:bg-[#fdfdfd] transition-colors"
                        >
                          <div className="flex items-center gap-2.5 @3xl/app:gap-4 min-w-0 flex-1">
                            {/* Premium Minimalist notification circle */}
                            <div className="relative shrink-0 flex items-center justify-center w-7 h-7 @3xl/app:w-11 @3xl/app:h-11 bg-[#252525] text-white border border-[#252525]">
                              <MessageSquare className="w-3.5 h-3.5 @3xl/app:w-5 @3xl/app:h-5" />
                              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 @3xl/app:w-2.5 @3xl/app:h-2.5 rounded-full bg-[#c2410c] border border-white animate-pulse"></span>
                            </div>
                            
                            <div className="min-w-0 flex-1">
                              <p className="text-xs @3xl/app:text-lg @5xl/app:text-xl font-bold text-[#252525] leading-tight">
                                Hommie te ha agendado nuevas visitas
                              </p>
                              <p className="text-[10px] @3xl/app:text-sm italic text-neutral-500 mt-0.5 @3xl/app:mt-1">
                                {visits.length} visitas programadas
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 @3xl/app:gap-3 shrink-0">
                            <span className={`hidden sm:inline-block text-[8px] @3xl/app:text-[11px] font-mono font-bold uppercase px-2 py-0.5 @3xl/app:px-3 @3xl/app:py-1.5 border ${
                              visits[0]?.status === "Confirmado"
                                ? "text-white bg-[#252525] border-[#252525]"
                                : "text-[#c2410c] bg-[#fff7ed] border-[#ffedd5]"
                            }`}>
                              {visits[0]?.status === "Confirmado" ? "Confirmada" : "Pendiente"}
                            </span>
                            <div className="p-1 @3xl/app:p-2 text-[#252525] bg-neutral-50 hover:bg-neutral-100 border border-[#ebebeb] transition-colors">
                              {isVisitsExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5 @3xl/app:w-5 @3xl/app:h-5" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 @3xl/app:w-5 @3xl/app:h-5" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Detailed Views, visible only when expanded */}
                        <AnimatePresence initial={false}>
                          {isVisitsExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="border-t border-[#ebebeb]"
                            >
                              <div className="p-3.5 @3xl/app:px-5 @3xl/app:py-4 bg-[#fcfcfc] border-b border-[#ebebeb] flex items-center justify-between gap-3">
                                <span className="text-[9px] @3xl/app:text-[11px] font-extrabold text-[#a8a8a8] uppercase tracking-widest">
                                  Organizar Visitas Por:
                                </span>
                                
                                {/* Style Proposals Selector (Using Icons with descriptive titles) */}
                                <div className="flex items-center gap-0.5 bg-[#fdf8f8] p-0.5 border border-[#ebebeb] shrink-0">
                                  {[
                                    { id: "day", icon: Clock, label: "Vista de Día" },
                                    { id: "week", icon: Calendar, label: "Vista Semanal" },
                                    { id: "month", icon: Layers, label: "Vista Mensual" },
                                  ].map(({ id, icon: IconComponent, label }) => (
                                    <button
                                      key={id}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setVisitViewStyle(id as any);
                                      }}
                                      title={label}
                                      className={`p-1.5 @3xl/app:p-2.5 transition-all ${
                                        visitViewStyle === id
                                          ? "bg-[#252525] text-white"
                                          : "text-[#a8a8a8] hover:text-[#252525] hover:bg-white"
                                      }`}
                                      aria-label={label}
                                    >
                                      <IconComponent className="w-3.5 h-3.5 @3xl/app:w-[18px] @3xl/app:h-[18px]" />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div className="p-3.5 @3xl/app:p-5 bg-white space-y-3.5">
                                {/* Proposal 1: Día (WhatsApp / iOS Calendar Notification Style) */}
                                {visitViewStyle === "day" && (
                                  <div className="space-y-3">
                                    {visits.map((visit) => (
                                      <div
                                        key={visit.id}
                                        onClick={() => {
                                          const matched = listings.find(l => l.id === visit.listingId);
                                          if (matched) setSelectedListing(matched);
                                        }}
                                        className="border border-[#ebebeb] bg-white transition-all duration-200 cursor-pointer group hover:border-[#252525] flex flex-col justify-between"
                                      >
                                        {/* Top Notification Bar header */}
                                        <div className="px-3 py-1.5 @3xl/app:px-4 @3xl/app:py-2.5 bg-[#fdf8f8] border-b border-[#ebebeb] flex items-center justify-between gap-2">
                                          <span className="text-[8px] @3xl/app:text-[10px] font-mono font-bold tracking-widest text-[#a8a8a8] uppercase flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${visit.status === "Confirmado" ? "bg-emerald-600 animate-pulse" : "bg-[#c2410c]"}`}></span>
                                            {visit.status === "Confirmado" ? "NOTIFICACIÓN CALENDARIO" : "AVISO PENDIENTE AGENTE"}
                                          </span>
                                          <span className="text-[9px] @3xl/app:text-[11px] font-bold text-[#252525] bg-white px-1.5 py-0.5 @3xl/app:px-2.5 @3xl/app:py-1 border border-[#ebebeb] uppercase tracking-wider">
                                            {visit.date}
                                          </span>
                                        </div>

                                        {/* Main notification body (with zero text overlap and beautiful layout) */}
                                        <div className="p-3.5 @3xl/app:p-5 space-y-2 @3xl/app:space-y-3">
                                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                            <div className="space-y-0.5">
                                              <span className="text-[9px] @3xl/app:text-[11px] text-[#a8a8a8] uppercase tracking-wider font-bold">Hora Programada</span>
                                              <span className="text-sm @3xl/app:text-xl font-extrabold text-[#252525] block tracking-tight">
                                                {visit.time} h — {visit.neighborhood}
                                              </span>
                                            </div>
                                            <div className="sm:text-right space-y-0.5">
                                              <span className="text-[9px] @3xl/app:text-[11px] text-[#a8a8a8] uppercase tracking-wider font-bold block">Tu Agente Hommie</span>
                                              <span className="text-xs @3xl/app:text-base font-bold text-[#252525] block">{visit.agent || "Asignando..."}</span>
                                            </div>
                                          </div>

                                          <div className="border-t border-[#f5f5f5] pt-2 mt-1">
                                            <span className="text-[9px] @3xl/app:text-[11px] text-[#a8a8a8] uppercase tracking-wider font-bold block mb-0.5">Propiedad</span>
                                            <p className="text-xs @3xl/app:text-base font-bold text-[#252525] leading-relaxed group-hover:underline break-words">
                                              {visit.listingTitle}
                                            </p>
                                          </div>
                                        </div>

                                        {/* Bottom actionable bar */}
                                        <div className="px-3 py-2 @3xl/app:px-5 @3xl/app:py-3 flex items-center justify-between text-[9px] @3xl/app:text-[11px] font-bold border-t border-dotted border-[#ebebeb] bg-[#fcfcfc]">
                                          <span className={visit.status === "Confirmado" ? "text-emerald-700" : "text-[#c2410c]"}>
                                            {visit.status === "Confirmado" ? "✓ Horario confirmado" : "◷ Coordinando agenda"}
                                          </span>
                                          <span className="text-[#252525] underline uppercase tracking-wider flex items-center gap-0.5 group-hover:no-underline transition-all">
                                            Ver detalles <ChevronRight className="w-2.5 h-2.5 @3xl/app:w-3.5 @3xl/app:h-3.5" />
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* Proposal 2: Semana (Timeline Semanal) */}
                                {visitViewStyle === "week" && (
                                  <div className="space-y-3.5">
                                    {/* The 7-Day Weekly Header Grid */}
                                    <div className="grid grid-cols-7 gap-1 text-center bg-[#fdf8f8] border border-[#ebebeb] p-1.5">
                                      {[
                                        { label: "Lu", date: "12", hasVisit: true, active: true, status: "Confirmado" },
                                        { label: "Ma", date: "13", hasVisit: false },
                                        { label: "Mi", date: "14", hasVisit: true, status: "Pendiente" },
                                        { label: "Ju", date: "15", hasVisit: false },
                                        { label: "Vi", date: "16", hasVisit: false },
                                        { label: "Sá", date: "17", hasVisit: false },
                                        { label: "Do", date: "18", hasVisit: false },
                                      ].map((day, idx) => (
                                        <div
                                          key={idx}
                                          className={`py-1.5 flex flex-col items-center justify-center border transition-all ${
                                            day.hasVisit
                                              ? day.status === "Confirmado"
                                                ? "border-emerald-600 bg-emerald-50/50 text-[#252525] font-bold"
                                                : "border-[#c2410c] bg-orange-50/50 text-[#252525] font-bold"
                                              : "border-transparent text-[#a8a8a8]"
                                          }`}
                                        >
                                          <span className="text-[8px] font-bold uppercase leading-none">{day.label}</span>
                                          <span className="text-[11px] font-extrabold leading-none mt-1">{day.date}</span>
                                          {day.hasVisit && (
                                            <span className={`w-1 h-1 rounded-full mt-1 animate-pulse ${
                                              day.status === "Confirmado" ? "bg-emerald-600" : "bg-[#c2410c]"
                                            }`}></span>
                                          )}
                                        </div>
                                      ))}
                                    </div>

                                    {/* Weekly listing of visits with full information and zero overlapping */}
                                    <div className="space-y-2">
                                      {visits.map((visit) => (
                                        <div
                                          key={visit.id}
                                          onClick={() => {
                                            const matched = listings.find(l => l.id === visit.listingId);
                                            if (matched) setSelectedListing(matched);
                                          }}
                                          className="border border-[#ebebeb] p-3 bg-white hover:border-[#252525] transition-all duration-200 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                                        >
                                          <div className="flex items-center gap-3 min-w-0">
                                            <div className="text-center border border-[#ebebeb] bg-[#fdf8f8] p-1.5 shrink-0 min-w-[40px]">
                                              <p className="text-[7px] font-extrabold text-[#a8a8a8] leading-none uppercase">OCT</p>
                                              <p className="text-xs font-black text-[#252525] mt-1 leading-none">{visit.date.split(" ")[0]}</p>
                                            </div>
                                            <div className="min-w-0 space-y-0.5">
                                              <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-bold text-[#252525] bg-neutral-100 px-1 py-0.5">{visit.time} h</span>
                                                <span className="text-[10px] text-[#a8a8a8] font-semibold">{visit.neighborhood}</span>
                                              </div>
                                              <p className="text-xs font-bold text-[#252525] truncate group-hover:underline">{visit.listingTitle}</p>
                                            </div>
                                          </div>
                                          
                                          <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                                            <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider border ${
                                              visit.status === "Confirmado"
                                                ? "text-white bg-[#252525] border-[#252525]"
                                                : "text-[#c2410c] bg-[#fff7ed] border-[#ffedd5]"
                                            }`}>
                                              {visit.status === "Confirmado" ? "Confirmada" : "Pendiente"}
                                            </span>
                                            <ChevronRight className="w-3.5 h-3.5 text-[#a8a8a8] group-hover:text-[#252525] transition-colors" />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Proposal 3: Mes (Matriz Mensual Interactiva) */}
                                {visitViewStyle === "month" && (
                                  <div className="space-y-3.5">
                                    <div className="border border-[#ebebeb] p-3 bg-[#fdf8f8] space-y-2.5">
                                      <div className="flex items-center justify-between border-b border-[#ebebeb] pb-1.5">
                                        <span className="text-[10px] font-extrabold text-[#252525] tracking-widest uppercase">OCTUBRE 2026</span>
                                        <span className="text-[8px] font-mono text-[#a8a8a8] uppercase font-bold">2 Visitas planificadas</span>
                                      </div>

                                      {/* Calendar Matrix layout */}
                                      <div className="grid grid-cols-7 gap-1 text-center">
                                        {/* Weekday names */}
                                        {["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map((dName) => (
                                          <span key={dName} className="text-[8px] font-bold text-[#a8a8a8] uppercase pb-1">{dName}</span>
                                        ))}

                                        {/* October 2026 starts on Thursday 1st */}
                                        {Array.from({ length: 3 }).map((_, i) => (
                                          <div key={`empty-${i}`} className="p-1"></div>
                                        ))}

                                        {/* Day cells */}
                                        {Array.from({ length: 31 }).map((_, idx) => {
                                          const dNum = idx + 1;
                                          const is12 = dNum === 12;
                                          const is14 = dNum === 14;
                                          const isScheduled = is12 || is14;
                                          const status = is12 ? "Confirmado" : is14 ? "Pendiente" : null;
                                          
                                          return (
                                            <div
                                              key={dNum}
                                              onClick={() => {
                                                if (is12) {
                                                  const matched = listings.find(l => l.id === "flat-2");
                                                  if (matched) setSelectedListing(matched);
                                                } else if (is14) {
                                                  const matched = listings.find(l => l.id === "flat-3");
                                                  if (matched) setSelectedListing(matched);
                                                }
                                              }}
                                              className={`p-1 text-[10px] font-bold border transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                                                isScheduled
                                                  ? status === "Confirmado"
                                                    ? "border-emerald-600 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                                                    : "border-[#c2410c] bg-orange-50 text-[#c2410c] hover:bg-orange-100"
                                                  : "border-transparent text-[#252525] hover:bg-white"
                                              }`}
                                            >
                                              <span>{dNum}</span>
                                              {isScheduled && (
                                                <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                                                  status === "Confirmado" ? "bg-emerald-600" : "bg-[#c2410c]"
                                                }`}></span>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>

                                    {/* Month Agenda recap */}
                                    <div className="border border-dashed border-[#ebebeb] p-3 bg-white space-y-2">
                                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#a8a8a8] block">Agenda Destacada del Mes</span>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <div
                                          onClick={() => {
                                            const m = listings.find(l => l.id === "flat-2");
                                            if (m) setSelectedListing(m);
                                          }}
                                          className="border border-[#ebebeb] p-2 hover:border-[#252525] transition-colors cursor-pointer bg-[#f0fdf4]/60 border-emerald-100 flex flex-col justify-between"
                                        >
                                          <span className="text-[8px] font-bold text-emerald-800 uppercase">LUN 12 OCT (17:30 h) — Confirmada</span>
                                          <p className="text-[10px] font-bold text-[#252525] truncate mt-0.5">Carrer de Provença, 214</p>
                                        </div>
                                        <div
                                          onClick={() => {
                                            const m = listings.find(l => l.id === "flat-3");
                                            if (m) setSelectedListing(m);
                                          }}
                                          className="border border-[#ebebeb] p-2 hover:border-[#252525] transition-colors cursor-pointer bg-[#fff7ed]/60 border-orange-100 flex flex-col justify-between"
                                        >
                                          <span className="text-[8px] font-bold text-[#c2410c] uppercase">MIÉ 14 OCT (11:00 h) — Pendiente</span>
                                          <p className="text-[10px] font-bold text-[#252525] truncate mt-0.5">Carrer de Pujades, 98</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Hero Summary Section (Frameless, identical to mockup)
                          En desktop ocupa todo el ancho: el número crece y el texto pasa
                          a flex-1 para acompañarlo en lugar de quedarse en una columna. */}
                      <div className="mt-4 mb-6 @3xl/app:mt-8 @3xl/app:mb-10 space-y-1 @3xl/app:space-y-3">
                        <h2 className="text-xs @3xl/app:text-sm font-bold uppercase tracking-widest text-[#a8a8a8]">RESUMEN DE HOY</h2>
                        <div className="flex items-baseline gap-3 @3xl/app:gap-8 @5xl/app:gap-10">
                          <span className="text-8xl @3xl/app:text-[9rem] @5xl/app:text-[11rem] leading-[0.85] font-extrabold tracking-tighter text-[#252525]">
                            {filteredListings.length}
                          </span>
                          <p className="text-[15px] @3xl/app:text-2xl @5xl/app:text-[32px] font-medium text-[#252525] max-w-xs @3xl/app:max-w-none @3xl/app:flex-1 leading-tight @3xl/app:leading-[1.2] @3xl/app:tracking-tight">
                            Nuevas opciones encontradas basadas en tus preferencias
                          </p>
                        </div>
                      </div>

                      {/* Filters Row (Identical to mockup) */}
                      <div className="mb-8 flex gap-2 @3xl/app:gap-3 overflow-x-auto hide-scrollbar pb-2">
                        <button
                          onClick={() => setActiveTab("PROFILE")}
                          className="border border-[#ebebeb] px-4 py-2 @3xl/app:px-6 @3xl/app:py-3 bg-white text-xs @3xl/app:text-sm font-semibold hover:opacity-75 transition-opacity whitespace-nowrap text-[#252525]"
                        >
                          Presupuesto
                        </button>
                        <button
                          onClick={() => setActiveTab("PROFILE")}
                          className="border border-[#ebebeb] px-4 py-2 @3xl/app:px-6 @3xl/app:py-3 bg-white text-xs @3xl/app:text-sm font-semibold hover:opacity-75 transition-opacity whitespace-nowrap text-[#252525]"
                        >
                          Barrio
                        </button>
                        <button
                          onClick={() => setActiveTab("PROFILE")}
                          className="border border-[#ebebeb] px-4 py-2 @3xl/app:px-6 @3xl/app:py-3 bg-white text-xs @3xl/app:text-sm font-semibold hover:opacity-75 transition-opacity whitespace-nowrap text-[#252525]"
                        >
                          Tipo
                        </button>
                        <button
                          onClick={() => setActiveTab("PROFILE")}
                          className="border border-[#ebebeb] px-4 py-2 @3xl/app:px-6 @3xl/app:py-3 bg-[#252525] text-white text-xs @3xl/app:text-sm font-bold flex items-center gap-1.5 @3xl/app:gap-2 hover:opacity-90 transition-opacity whitespace-nowrap uppercase tracking-widest"
                        >
                          <Sliders className="w-3.5 h-3.5 @3xl/app:w-4 @3xl/app:h-4 text-white" />
                          <span>FILTROS</span>
                        </button>
                      </div>

                      {/* Property Cards Layout */}
                      {filteredListings.length === 0 ? (
                        /* Empty State Case for particular search combination */
                        <div className="border border-[#ebebeb] p-8 text-center space-y-4">
                          <AlertCircle className="w-10 h-10 text-[#a8a8a8] mx-auto stroke-[1.5]" />
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">Sin opciones hoy</h3>
                            <p className="text-xs text-[#8e8e8e] max-w-[240px] leading-relaxed mx-auto">
                              No hay nuevos pisos en {selectedNeighborhoods.join(", ") || "estas zonas"} por menos de {budget}€ hoy. Relaja tus filtros en la pestaña Search para ver más.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-8 @3xl/app:gap-10 grid-cols-1 @2xl/app:grid-cols-2 @5xl/app:grid-cols-3">
                          {filteredListings.map((listing) => (
                            <ListingCard
                              key={listing.id}
                              listing={listing}
                              onSelect={(l) => setSelectedListing(l)}
                              onToggleSave={handleToggleSave}
                            />
                          ))}
                        </div>
                      )}

                      {/* Call to Action */}
                      <div className="mt-8 mb-8 flex justify-center">
                        <button
                          onClick={() => setActiveTab("SEARCH")}
                          className="border border-[#ebebeb] px-6 py-3 @3xl/app:px-10 @3xl/app:py-4 font-medium text-xs @3xl/app:text-sm tracking-[0.2em] text-[#252525] bg-white hover:bg-[#252525] hover:text-white transition-all duration-300 uppercase"
                        >
                          VER TODAS LAS OPCIONES
                        </button>
                      </div>



                    </>
                  )}

                  {/* TAB 2: AI SEARCH & ANALYZER VIEW */}
                  {activeTab === "SEARCH" && (
                    <div className="space-y-6">
                      
                      {/* AI Search Title */}
                      <div className="space-y-1">
                        <h2 className="text-xs @3xl/app:text-sm font-bold uppercase tracking-widest text-[#252525]">BÚSQUEDA Y ANÁLISIS POR IA</h2>
                        <p className="text-xs @3xl/app:text-[15px] text-[#8e8e8e] @3xl/app:max-w-2xl">Pega cualquier oferta encontrada en internet para auditarla de inmediato con Hommie.</p>
                      </div>

                      {/* AI URL Input Form */}
                      <form onSubmit={handleAIAnalyze} className="border border-[#ebebeb] p-5 bg-white space-y-4">
                        
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>AUDITORÍA REGISTRAL POR INTELIGENCIA ARTIFICIAL</span>
                          </span>
                          <p className="text-[11px] text-[#8e8e8e] leading-relaxed">
                            Nuestra IA de Hommie se conecta con el Registro de Propiedad simulado para verificar la legitimidad del anunciante y calcula si el precio viola el control de precios vigente.
                          </p>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#252525] block mb-1">Enlace / URL de la oferta</label>
                            <input
                              type="url"
                              placeholder="Ej. https://www.idealista.com/inmueble/9981234"
                              value={analyzerUrl}
                              onChange={(e) => setAnalyzerUrl(e.target.value)}
                              className="w-full px-3 py-2 border border-[#ebebeb] text-xs focus:outline-none focus:border-[#252525] bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-[#252525] block mb-1">Detalles o Texto de la Oferta (Opcional)</label>
                            <textarea
                              rows={3}
                              placeholder="Pega el texto de descripción del piso, precio, etc. Ej: Alquilo ático en Gràcia con fianza de 3 meses, sin ascensor por 1400€..."
                              value={analyzerText}
                              onChange={(e) => setAnalyzerText(e.target.value)}
                              className="w-full px-3 py-2 border border-[#ebebeb] text-xs focus:outline-none focus:border-[#252525] bg-white resize-none"
                            />
                          </div>
                        </div>

                        {analyzerSuccess ? (
                          <div className="bg-emerald-50 border border-emerald-600 p-3 flex items-center gap-2.5 text-xs text-emerald-800">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                            <span>¡Oferta auditada con éxito! La hemos añadido a tu Dashboard con un Score de seguridad. Redirigiendo...</span>
                          </div>
                        ) : (
                          <button
                            type="submit"
                            disabled={isAnalyzing || (!analyzerUrl && !analyzerText)}
                            className="w-full bg-[#252525] text-white py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                          >
                            {isAnalyzing ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>HOMMIE ANALIZANDO REGISTROS...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4" />
                                <span>AUDITAR OFERTA CON IA</span>
                              </>
                            )}
                          </button>
                        )}
                      </form>

                      {/* Manual listing search by criteria */}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold text-[#a8a8a8] uppercase tracking-wider block">Búsqueda Tradicional de Barcelona</span>

                        <div className="border border-[#ebebeb] p-4 bg-white space-y-2">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-[#252525]">
                            <span>Presupuesto Máximo Mensual</span>
                            <span>{budget} €</span>
                          </div>
                          <input
                            type="range"
                            min={1000}
                            max={3500}
                            step={50}
                            value={budget}
                            onChange={(e) => setBudget(parseInt(e.target.value, 10))}
                            className="w-full accent-[#252525]"
                          />
                          <div className="flex justify-between text-[10px] text-[#a8a8a8]">
                            <span>1.000 €</span>
                            <span>3.500 €</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-[#ebebeb] p-4 bg-white space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525]">Zonas Seleccionadas</h4>
                            <div className="space-y-1.5 text-xs">
                              {["Gràcia", "Eixample Dret", "Poblenou", "El Born", "Sarrià"].map((name) => (
                                <label key={name} className="flex items-center gap-2 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={selectedNeighborhoods.includes(name)}
                                    onChange={() => toggleNeighborhood(name)}
                                    className="rounded border-[#ebebeb] text-[#252525] focus:ring-0"
                                  />
                                  <span>{name}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="border border-[#ebebeb] p-4 bg-white space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-[#252525]">Tipología</h4>
                            <div className="space-y-1.5 text-xs">
                              {["Piso", "Ático", "Loft", "Estudio"].map((name) => (
                                <label key={name} className="flex items-center gap-2 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(name)}
                                    onChange={() => toggleType(name)}
                                    className="rounded border-[#ebebeb] text-[#252525] focus:ring-0"
                                  />
                                  <span>{name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 3: SAVED / BOOKMARKED VIEW */}
                  {activeTab === "SAVED" && (
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h2 className="text-xs @3xl/app:text-sm font-bold uppercase tracking-widest text-[#252525]">Ofertas Guardadas</h2>
                        <p className="text-xs @3xl/app:text-[15px] text-[#8e8e8e]">Colección de pisos en Barcelona pre-seleccionados por ti.</p>
                      </div>

                      {listings.filter((l) => l.isSaved).length === 0 ? (
                        <div className="border border-[#ebebeb] p-12 text-center space-y-4">
                          <Bookmark className="w-12 h-12 text-[#a8a8a8] mx-auto stroke-[1.5]" />
                          <div className="space-y-1">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#252525]">No hay guardados</h3>
                            <p className="text-xs text-[#8e8e8e] max-w-[240px] leading-relaxed mx-auto">
                              Pulsa el icono de marcador en las tarjetas del Dashboard para guardar las mejores opciones aquí.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="grid gap-6 @3xl/app:gap-10 grid-cols-1 @2xl/app:grid-cols-2 @5xl/app:grid-cols-3">
                          {listings
                            .filter((l) => l.isSaved)
                            .map((listing) => (
                              <ListingCard
                                key={listing.id}
                                listing={listing}
                                onSelect={(l) => setSelectedListing(l)}
                                onToggleSave={handleToggleSave}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: PROFILE — identidad, verificación, documentos, ajustes */}
                  {activeTab === "PROFILE" && (
                    <ProfileTab
                      lifeStage={lifeStage}
                      onLifeStageChange={setLifeStage}
                      onGoToSearch={() => setActiveTab("SEARCH")}
                      showDemoExtras={showDemoPanel}
                      onReopenOnboarding={reopenOnboarding}
                    />
                  )}

                </motion.div>
              </AnimatePresence>
            )}

          </div>
          </div>

          {/* C. Bottom App Tab Navigation Bar */}
          <nav className="bg-white border-t border-[#ebebeb] px-4 py-2 flex justify-around items-center select-none shrink-0 z-10">
            {/* Tab 1: Dashboard */}
            <button
              onClick={() => setActiveTab("DASHBOARD")}
              className={`flex flex-col items-center gap-1 py-1 px-3 @3xl/app:gap-1.5 @3xl/app:py-2 @3xl/app:px-5 text-xs font-medium transition-all ${
                activeTab === "DASHBOARD" ? "text-[#252525] scale-105" : "text-[#a8a8a8] hover:text-[#252525]"
              }`}
            >
              <LayoutDashboard className={`w-5 h-5 @3xl/app:w-6 @3xl/app:h-6 ${activeTab === "DASHBOARD" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] @3xl/app:text-[13px] font-semibold tracking-tight">Dashboard</span>
            </button>

            {/* Tab 2: AI Search */}
            <button
              onClick={() => setActiveTab("SEARCH")}
              className={`flex flex-col items-center gap-1 py-1 px-3 @3xl/app:gap-1.5 @3xl/app:py-2 @3xl/app:px-5 text-xs font-medium transition-all ${
                activeTab === "SEARCH" ? "text-[#252525] scale-105" : "text-[#a8a8a8] hover:text-[#252525]"
              }`}
            >
              <Search className={`w-5 h-5 @3xl/app:w-6 @3xl/app:h-6 ${activeTab === "SEARCH" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] @3xl/app:text-[13px] font-semibold tracking-tight">Search</span>
            </button>

            {/* Tab 3: Saved */}
            <button
              onClick={() => setActiveTab("SAVED")}
              className={`flex flex-col items-center gap-1 py-1 px-3 @3xl/app:gap-1.5 @3xl/app:py-2 @3xl/app:px-5 text-xs font-medium transition-all ${
                activeTab === "SAVED" ? "text-[#252525] scale-105" : "text-[#a8a8a8] hover:text-[#252525]"
              }`}
            >
              <Bookmark className={`w-5 h-5 @3xl/app:w-6 @3xl/app:h-6 ${activeTab === "SAVED" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] @3xl/app:text-[13px] font-semibold tracking-tight">Saved</span>
            </button>

            {/* Tab 4: Profile */}
            <button
              onClick={() => setActiveTab("PROFILE")}
              className={`flex flex-col items-center gap-1 py-1 px-3 @3xl/app:gap-1.5 @3xl/app:py-2 @3xl/app:px-5 text-xs font-medium transition-all ${
                activeTab === "PROFILE" ? "text-[#252525] scale-105" : "text-[#a8a8a8] hover:text-[#252525]"
              }`}
            >
              <User className={`w-5 h-5 @3xl/app:w-6 @3xl/app:h-6 ${activeTab === "PROFILE" ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className="text-[10px] @3xl/app:text-[13px] font-semibold tracking-tight">Profile</span>
            </button>
          </nav>
          </>
          )}

        </div>
      </section>

      {/* 3. Global Slide-over Drawer / Details analysis modal */}
      {selectedListing && (
        <ListingDetailDrawer
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onBookVisit={handleBookVisit}
          existingVisits={visits}
        />
      )}

    </div>
  );
}
