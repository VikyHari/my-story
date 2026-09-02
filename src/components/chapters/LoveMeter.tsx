import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/state/ProgressContext";
import { sound } from "@/lib/sound";
import { fireScreenBurst } from "@/lib/burstBus";
import { fireShake } from "@/lib/shakeBus";
import { Confetti, ConfettiHandle } from "@/components/effects/Confetti";
import { CosmicZoomOut } from "@/components/effects/CosmicZoomOut";
import { useSettings } from "@/state/SettingsContext";

const STEPS = [0, 20, 50, 100, 200, Infinity];

function messageFor(value: number): string {
  if (value === 0) return "Tap the button whenever you're ready.";
  if (value < 50) return "Just warming up...";
  if (value < 100) return "Okay, this is getting serious.";
  if (value === 100) return "Okay... that's already too much ❤️";
  if (value < 200) return "It's still climbing?";
  if (value === 200) return "Something is clearly broken.";
  return "Yeah. This meter was never designed for us.";
}

export function LoveMeter({ onNext }: { onNext: () => void }) {
  const { data, setData } = useProgress();
  const { isMobile } = useSettings();
  const value = data.loveMeterValue;
  const confettiRef = useRef<ConfettiHandle>(null);
  const [pulse, setPulse] = useState(0);
  const [showCosmic, setShowCosmic] = useState(false);

  const displayValue = useMemo(() => {
    if (value > 200) return "∞";
    return `${value}%`;
  }, [value]);

  const pct = Math.min((value / 200) * 100, 100);

  // grows with the number, but stays inside its own box so it never
  // covers the button or progress bar below it — the "fills the whole
  // screen" drama is delivered by the full-screen burst layer instead,
  // which is pointer-events-none and can never block a click.
  const heartScale = 1 + Math.min(value, 200) / 260 + (value > 200 ? 0.15 : 0);

  function celebrate(nextVal: number) {
    const isBigMoment = nextVal === 100 || nextVal === 200 || nextVal === 999;
    fireScreenBurst({
      emoji: "💗",
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      color: "rgba(232,116,143,0.5)",
      scale: isBigMoment ? 32 : isMobile ? 10 : 14,
      duration: isBigMoment ? 1600 : 550,
    });
    fireShake(isBigMoment ? (nextVal === 999 ? 2.2 : 1.5) : 0.4);
    if (isBigMoment) {
      sound.celebration();
      confettiRef.current?.burst({ count: nextVal === 999 ? 200 : 120 });
    }
  }

  function measure() {
    const current = value;
    const idx = STEPS.findIndex((s) => s > current);
    const nextVal = idx === -1 ? 999 : current >= 200 ? 999 : STEPS[idx];
    const crossingIntoInfinity = nextVal === 999 && current !== 999;

    sound.heart();
    setPulse((p) => p + 1);
    setData((p) => ({ ...p, loveMeterValue: nextVal }));

    if (crossingIntoInfinity) {
      setShowCosmic(true);
    } else {
      celebrate(nextVal);
    }
  }

  const reachedEnd = value >= 200;

  return (
    <ChapterScroll className="relative">
      <Confetti ref={confettiRef} />

      <AnimatePresence>
        {showCosmic && (
          <CosmicZoomOut
            onReachInfinity={() => celebrate(999)}
            onComplete={() => setShowCosmic(false)}
          />
        )}
      </AnimatePresence>

      <ChapterHeading eyebrow="Chapter Three" title="Measure Our Love" subtitle={messageFor(value > 200 ? 999 : value)} />

      <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center mb-10">
        <motion.div
          key={pulse}
          animate={{ scale: heartScale }}
          initial={false}
          transition={{ type: "spring", stiffness: 140, damping: 11 }}
        >
          <Heart
            className="w-40 h-40 sm:w-48 sm:h-48 text-rose fill-rose drop-shadow-[0_0_50px_rgba(232,116,143,0.6)]"
            strokeWidth={1}
          />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-3xl sm:text-4xl text-cream drop-shadow">{displayValue}</span>
        </div>
      </div>

      <div className="w-full max-w-xs h-2 rounded-full bg-white/10 overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-rose to-gold"
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      </div>

      <Button onClick={measure} size="lg">
        {value === 0 ? "Measure Our Love ❤️" : reachedEnd ? "Measure again anyway" : "Measure again"}
      </Button>

      <ContinuePrompt
        visible={reachedEnd}
        hint="Some things really can't be measured."
        onClick={onNext}
        label="Next chapter"
      />
    </ChapterScroll>
  );
}
