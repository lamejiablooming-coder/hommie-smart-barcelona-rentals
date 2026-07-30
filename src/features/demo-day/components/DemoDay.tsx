import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ExternalLink, Home } from "lucide-react";
import { DEMO_DAY_SLIDES } from "@/features/demo-day/data";
import type {
  DemoDayBulletsSlide,
  DemoDayCoverSlide,
  DemoDayDemoSlide,
  DemoDayPairsSlide,
  DemoDaySlide,
} from "@/shared/types";

/**
 * Presentación del Demo Day. Ruta /demo-day, aislada del producto: solo acompaña
 * el discurso oral. La demo real ocurre en la URL viva.
 *
 * Escala tipográfica propia (cuerpo ≥ 24px, títulos ≥ 32px) para que sea legible
 * a 3 metros; paleta, hairlines y labels son los de `Contexto/design.md`.
 */

const FOCUS_RING =
  "focus-visible:[outline:3px_solid_#252525] focus-visible:outline-offset-2";

const TITLE_CLASS =
  "text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[#252525]";
const BODY_CLASS =
  "text-[clamp(1.5rem,2vw,2rem)] leading-[1.4] text-[#252525]";
const LABEL_CLASS =
  "text-[clamp(1.25rem,1.5vw,1.5rem)] font-bold uppercase tracking-widest text-[#252525]";
const META_CLASS =
  "text-[clamp(1.25rem,1.4vw,1.375rem)] font-bold uppercase tracking-widest text-[#8e8e8e]";

const SHELL_CLASS = "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-14";

function CoverSlide({ slide }: { slide: DemoDayCoverSlide }) {
  return (
    <div className="space-y-10 lg:space-y-14">
      <div className="space-y-6">
        <h1 className="space-y-4">
          <span className="block text-[clamp(3rem,9vw,6.5rem)] font-bold uppercase leading-[0.95] tracking-tighter text-[#252525]">
            {slide.brand}
          </span>
          <span className="block max-w-[24ch] text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.15] tracking-tight text-[#252525]">
            {slide.tagline}
          </span>
        </h1>
      </div>

      <div className="border-t border-[#ebebeb] pt-8">
        <p className={META_CLASS}>{slide.urlLabel}</p>
        <a
          href={slide.url}
          target="_blank"
          rel="noreferrer"
          className={`mt-4 inline-flex max-w-full items-center gap-4 border-b-2 border-[#252525] pb-1 text-[clamp(1.375rem,2vw,2rem)] font-medium leading-[1.3] break-all text-[#252525] transition-colors hover:bg-[#252525] hover:text-white ${FOCUS_RING}`}
        >
          <span>{slide.url}</span>
          <ExternalLink className="hidden h-7 w-7 shrink-0 stroke-[1.5] sm:block" />
        </a>
      </div>
    </div>
  );
}

function BulletsSlide({ slide }: { slide: DemoDayBulletsSlide }) {
  return (
    <div className="space-y-10 lg:space-y-14">
      <h2 className={`${TITLE_CLASS} max-w-[30ch]`}>{slide.title}</h2>
      <ul className="border-t border-[#ebebeb]">
        {slide.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-6 border-b border-[#ebebeb] py-7 lg:gap-8 lg:py-9"
          >
            <span
              aria-hidden="true"
              className="mt-[0.6em] h-[3px] w-8 shrink-0 bg-[#252525] lg:w-12"
            />
            <p className={`${BODY_CLASS} max-w-[42ch]`}>{bullet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DemoSlide({ slide }: { slide: DemoDayDemoSlide }) {
  return (
    <div className="space-y-8 lg:space-y-10">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <h2 className={TITLE_CLASS}>{slide.title}</h2>
        <span className="border border-[#ebebeb] px-3 py-1.5 text-[clamp(1rem,1.2vw,1.125rem)] font-bold uppercase tracking-widest text-[#252525]">
          {slide.demoLabel}
        </span>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-14">
        <div className="space-y-8">
          <a
            href={slide.url}
            target="_blank"
            rel="noreferrer"
            className={`flex flex-col gap-2 bg-[#252525] px-8 py-6 text-white transition-colors hover:bg-black lg:px-10 lg:py-8 ${FOCUS_RING}`}
          >
            <span className="flex items-center gap-5">
              <span className="text-[clamp(1.5rem,2.4vw,2.25rem)] font-bold uppercase tracking-widest">
                {slide.ctaLabel}
              </span>
              <ExternalLink className="h-8 w-8 shrink-0 stroke-[2] lg:h-9 lg:w-9" />
            </span>
            <span className="text-[clamp(1.25rem,1.5vw,1.5rem)] leading-[1.3] font-normal break-all text-white">
              {slide.url}
            </span>
          </a>

          <div className="space-y-2">
            <h3 className={META_CLASS}>{slide.offCameraLabel}</h3>
            <p className={`${BODY_CLASS} max-w-[44ch]`}>{slide.offCamera}</p>
            <p className="pt-2 text-[clamp(1.125rem,1.3vw,1.25rem)] leading-[1.4] text-[#252525]">
              {slide.demoNote}
            </p>
          </div>
        </div>

        <ul className="grid gap-0 border-t border-[#ebebeb] sm:grid-cols-2 sm:gap-x-10 xl:grid-cols-1 xl:gap-x-0">
          {slide.screens.map((screen) => (
            <li
              key={screen.id}
              className="flex gap-5 border-b border-[#ebebeb] py-4 lg:py-5"
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#ebebeb] text-[1.25rem] font-bold tracking-widest text-[#252525]"
              >
                {screen.index}
              </span>
              <div className="min-w-0 space-y-1">
                <h3 className="text-[clamp(1.5rem,1.9vw,1.875rem)] font-bold leading-[1.2] tracking-tight text-[#252525]">
                  {screen.label}
                </h3>
                <p className="text-[clamp(1.5rem,1.6vw,1.625rem)] leading-[1.35] text-[#252525]">
                  {screen.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PairsSlide({ slide }: { slide: DemoDayPairsSlide }) {
  return (
    <div className="space-y-10 lg:space-y-12">
      <h2 className={`${TITLE_CLASS} max-w-[30ch]`}>{slide.title}</h2>
      <ul className="border-t border-[#ebebeb]">
        {slide.pairs.map((pair) => {
          const isHighlight = pair.id === slide.highlightId;
          return (
            <li
              key={pair.id}
              className={`grid gap-x-10 gap-y-2 border-b border-[#ebebeb] py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] lg:py-7 ${
                isHighlight ? "border-l-[3px] border-l-[#252525] pl-5 lg:pl-8" : ""
              }`}
            >
              <h3 className={LABEL_CLASS}>{pair.label}</h3>
              <p className={BODY_CLASS}>{pair.value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SlideBody({ slide }: { slide: DemoDaySlide }) {
  switch (slide.kind) {
    case "cover":
      return <CoverSlide slide={slide} />;
    case "bullets":
      return <BulletsSlide slide={slide} />;
    case "demo":
      return <DemoSlide slide={slide} />;
    case "pairs":
      return <PairsSlide slide={slide} />;
  }
}

export default function DemoDay() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const total = DEMO_DAY_SLIDES.length;
  const lastIndex = total - 1;
  const slide = DEMO_DAY_SLIDES[index];

  const goTo = useCallback(
    (target: number) => {
      setIndex((current) => {
        const next = Math.min(Math.max(target, 0), DEMO_DAY_SLIDES.length - 1);
        return next === current ? current : next;
      });
    },
    [],
  );

  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, DEMO_DAY_SLIDES.length - 1)), []);
  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      // No secuestrar el teclado si algún día hay un campo de texto en foco.
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
          event.preventDefault();
          goNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          goPrev();
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(DEMO_DAY_SLIDES.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, goTo]);

  const slideNumber = String(index + 1).padStart(2, "0");

  return (
    <div
      lang="es"
      className="flex h-dvh flex-col overflow-hidden bg-white font-sans text-[#252525] antialiased"
    >
      <header className="shrink-0 border-b border-[#ebebeb] bg-white">
        <div
          className={`${SHELL_CLASS} flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-5 lg:py-6`}
        >
          <div className="flex items-center gap-3">
            <Home className="h-7 w-7 stroke-[1.5] text-[#252525]" />
            <span className="text-[clamp(1.25rem,1.6vw,1.5rem)] font-bold uppercase tracking-tighter text-[#252525]">
              Hommie
            </span>
            <span className="border-l border-[#ebebeb] pl-3 text-[clamp(1.125rem,1.3vw,1.25rem)] font-bold uppercase tracking-widest text-[#252525]">
              Demo Day
            </span>
          </div>
          <p className={META_CLASS}>
            <span className="text-[#252525]">{slideNumber}</span> / {String(total).padStart(2, "0")}
          </p>
        </div>

        <nav aria-label="Diapositivas" className={`${SHELL_CLASS} pb-4`}>
          <ul className="flex flex-wrap gap-2 lg:gap-3">
            {DEMO_DAY_SLIDES.map((item, i) => {
              const isCurrent = i === index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isCurrent ? "true" : undefined}
                    className={`flex items-center gap-2 border px-3 py-2 text-[1.125rem] font-bold uppercase tracking-widest transition-colors lg:px-4 ${FOCUS_RING} ${
                      isCurrent
                        ? "border-[#252525] bg-[#252525] text-white"
                        : "border-[#ebebeb] bg-white text-[#252525] hover:border-[#252525]"
                    }`}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="hidden lg:inline">{item.navLabel}</span>
                    <span className="sr-only lg:hidden">{item.navLabel}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        <div
          className={`${SHELL_CLASS} flex flex-1 flex-col justify-center py-10 lg:py-12`}
        >
          {/* La `key` remonta la diapositiva y dispara la entrada. Sin animación de
              salida a propósito: nada puede quedarse esperando y el cambio es
              inmediato aunque se pulsen las flechas muy rápido. */}
          <motion.article
            key={slide.id}
            aria-labelledby={`demo-day-nav-${slide.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <p
              id={`demo-day-nav-${slide.id}`}
              className={`${META_CLASS} mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 lg:mb-8`}
            >
              <span>{slide.navLabel}</span>
              {slide.timing && (
                <span className="border-l border-[#ebebeb] pl-4 text-[#252525]">
                  {slide.timing}
                </span>
              )}
            </p>
            <SlideBody slide={slide} />
          </motion.article>
        </div>
      </main>

      <p aria-live="polite" className="sr-only">
        Diapositiva {index + 1} de {total}: {slide.navLabel}
      </p>

      <footer className="shrink-0 border-t border-[#ebebeb] bg-white">
        <div
          className={`${SHELL_CLASS} flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between lg:py-6`}
        >
          <p className={`${META_CLASS} order-2 hidden sm:order-1 sm:block`}>
            Usa las flechas ← → del teclado
          </p>
          <div className="order-1 flex gap-3 sm:order-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className={`flex flex-1 items-center justify-center gap-3 border border-[#ebebeb] bg-white px-6 py-4 text-[clamp(1.125rem,1.3vw,1.25rem)] font-bold uppercase tracking-widest text-[#252525] transition-colors hover:border-[#252525] disabled:cursor-not-allowed disabled:text-[#8e8e8e] disabled:hover:border-[#ebebeb] sm:flex-none ${FOCUS_RING}`}
            >
              <ArrowLeft className="h-6 w-6 stroke-[2]" />
              <span>Atrás</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={index === lastIndex}
              className={`flex flex-1 items-center justify-center gap-3 border border-[#252525] bg-[#252525] px-6 py-4 text-[clamp(1.125rem,1.3vw,1.25rem)] font-bold uppercase tracking-widest text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:border-[#ebebeb] disabled:bg-white disabled:text-[#8e8e8e] sm:flex-none ${FOCUS_RING}`}
            >
              <span>Siguiente</span>
              <ArrowRight className="h-6 w-6 stroke-[2]" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
