import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Heart,
  Home,
  MapPin,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { ONBOARDING_STEPS } from "@/features/onboarding/data";
import type { OnboardingMoment } from "@/shared/types";

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

const MOMENT_ICONS: Record<OnboardingMoment["icon"], LucideIcon> = {
  home: Home,
  map: MapPin,
  eye: Eye,
  calendar: Calendar,
  shield: ShieldCheck,
  scale: Scale,
  file: FileText,
  heart: Heart,
};

export default function Onboarding({ onComplete, onSkip }: OnboardingProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const step = ONBOARDING_STEPS[stepIndex];
  const isLast = stepIndex === ONBOARDING_STEPS.length - 1;
  const isFirst = stepIndex === 0;
  const isValueSlide = step.id === "value";

  const handleNext = () => {
    if (isLast) {
      onComplete();
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (isFirst) return;
    setStepIndex((i) => i - 1);
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#ffffff]">
      <header className="px-6 py-4 border-b border-[#ebebeb] flex justify-between items-center bg-white shrink-0">
        <div className="flex items-center gap-2">
          <Home className="w-5 h-5 text-[#252525] stroke-[1.5]" />
          <span className="font-bold tracking-tighter text-sm uppercase text-[#252525]">
            HOMMIE
          </span>
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8] hover:text-[#252525] transition-colors"
        >
          Saltar
        </button>
      </header>

      <div className="flex-grow overflow-y-auto hide-scrollbar flex flex-col min-h-0">
        <div className="px-6 pt-5 shrink-0">
          <div className="flex items-center gap-2 mb-4">
            {ONBOARDING_STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                disabled={i > stepIndex}
                onClick={() => {
                  if (i < stepIndex) setStepIndex(i);
                }}
                className={`h-0.5 flex-1 transition-colors ${
                  i <= stepIndex ? "bg-[#252525]" : "bg-[#ebebeb]"
                } ${i < stepIndex ? "cursor-pointer hover:opacity-70" : "cursor-default"}`}
                aria-label={
                  i < stepIndex
                    ? `Volver al paso ${i + 1}`
                    : `Paso ${i + 1}`
                }
              />
            ))}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8]">
            {stepIndex + 1} / {ONBOARDING_STEPS.length}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-grow flex flex-col"
          >
            {step.imageUrl && (
              <div className="mt-4 mx-0 aspect-[16/10] overflow-hidden bg-[#f1edec] border-y border-[#ebebeb] shrink-0">
                <img
                  src={step.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="px-6 py-5 space-y-4 flex-grow flex flex-col">
              <span className="inline-block self-start text-[9px] font-mono font-bold uppercase tracking-widest text-[#252525] border border-[#ebebeb] px-2 py-1 bg-[#ffffff]">
                {step.demoLabel}
              </span>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8]">
                  {step.eyebrow}
                </p>
                <h2 className="text-[15px] font-bold leading-[1.2] tracking-tight text-[#252525]">
                  {step.title}
                </h2>
                <p className="text-[15px] leading-[1.5] text-[#8e8e8e] font-normal">
                  {step.body}
                </p>
              </div>

              <div
                className={`space-y-0 border border-[#ebebeb] ${
                  isValueSlide ? "mt-1" : "mt-2"
                }`}
              >
                {step.moments.map((moment) => {
                  const Icon = MOMENT_ICONS[moment.icon];
                  return (
                    <div
                      key={moment.label}
                      className="flex gap-3 px-4 py-3.5 border-b border-[#ebebeb] last:border-b-0"
                    >
                      <div className="w-9 h-9 shrink-0 border border-[#ebebeb] flex items-center justify-center bg-[#ffffff]">
                        <Icon className="w-4 h-4 text-[#252525] stroke-[1.5]" />
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-[15px] font-medium leading-[1.4] text-[#252525]">
                          {moment.label}
                        </p>
                        <p className="text-[12px] leading-[1.4] text-[#8e8e8e]">
                          {moment.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {step.closingLine && (
                <p className="text-[12px] font-medium leading-[1.4] text-[#252525] border-l border-[#252525] pl-3 pt-1">
                  {step.closingLine}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="shrink-0 border-t border-[#ebebeb] px-6 py-4 bg-white space-y-2">
        <div className="flex gap-2">
          {!isFirst && (
            <button
              type="button"
              onClick={handleBack}
              className="flex-1 border border-[#ebebeb] bg-white text-[#252525] py-3 text-xs font-bold uppercase tracking-widest hover:border-[#252525] transition-all flex items-center justify-center gap-2 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Atrás</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className={`${isFirst ? "w-full" : "flex-1"} bg-[#252525] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 rounded-lg`}
          >
            <span>{isLast ? "Empezar" : "Siguiente"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {!isLast && (
          <button
            type="button"
            onClick={onSkip}
            className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-[#a8a8a8] hover:text-[#252525] transition-colors"
          >
            Saltar introducción
          </button>
        )}
      </div>
    </div>
  );
}
