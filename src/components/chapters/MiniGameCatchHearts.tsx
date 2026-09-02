import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Confetti, ConfettiHandle } from "@/components/effects/Confetti";
import { sound } from "@/lib/sound";
import { fireScreenBurst } from "@/lib/burstBus";
import { useSettings } from "@/state/SettingsContext";

interface FloatingHeart {
  id: number;
  left: number;
  duration: number;
  size: number;
  sway: number;
  emoji: string;
}

const GOAL = 5;
let counter = 0;

const EMOJIS = ["💗", "💖", "💕", "💓"];

export function MiniGameCatchHearts({ onNext }: { onNext: () => void }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [caught, setCaught] = useState(0);
  const { reducedMotion, isMobile } = useSettings();
  const areaRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<ConfettiHandle>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (caught >= GOAL) {
      if (!doneRef.current) {
        doneRef.current = true;
        sound.celebration();
        confettiRef.current?.burst({ count: 90 });
      }
      return;
    }
    const interval = setInterval(() => {
      setHearts((prev) => {
        if (prev.length >= 8) return prev;
        const id = counter++;
        return [
          ...prev,
          {
            id,
            left: Math.random() * 78 + 6,
            duration: Math.random() * 2.5 + (reducedMotion ? 8 : 4.5),
            size: Math.random() * 1.4 + 2.2,
            sway: (Math.random() - 0.5) * 40,
            emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          },
        ];
      });
    }, 550);
    return () => clearInterval(interval);
  }, [caught, reducedMotion]);

  function catchHeart(id: number, e: React.MouseEvent<HTMLButtonElement>) {
    if (doneRef.current) return;
    sound.pop();
    const rect = e.currentTarget.getBoundingClientRect();
    fireScreenBurst({
      emoji: "💗",
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      color: "rgba(232,116,143,0.35)",
      scale: isMobile ? 6 : 8,
      duration: 420,
    });
    setHearts((prev) => prev.filter((h) => h.id !== id));
    setCaught((c) => Math.min(c + 1, GOAL));
  }

  function expireHeart(id: number) {
    setHearts((prev) => prev.filter((h) => h.id !== id));
  }

  return (
    <ChapterScroll>
      <ChapterHeading
        eyebrow="Chapter Fifteen"
        title="Catch The Hearts"
        subtitle={caught < GOAL ? `Catch ${GOAL - caught} more before they float away.` : "Got them all ❤️"}
      />

      <div
        ref={areaRef}
        className="relative w-full max-w-md h-72 sm:h-80 rounded-3xl border border-white/10 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(232,116,143,0.14), transparent 55%), radial-gradient(circle at 75% 80%, rgba(216,168,87,0.1), transparent 50%), linear-gradient(180deg, rgba(23,16,37,0.9), rgba(10,5,16,0.95))",
        }}
      >
        {!reducedMotion &&
          Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white/70 animate-twinkle"
              style={{
                left: `${(i * 43) % 100}%`,
                top: `${(i * 29) % 100}%`,
                width: (i % 3) + 1,
                height: (i % 3) + 1,
                animationDelay: `${(i % 6) * 0.3}s`,
              }}
            />
          ))}

        <Confetti ref={confettiRef} />

        <AnimatePresence>
          {hearts.map((h) => (
            <motion.button
              key={h.id}
              initial={{ bottom: "-12%", opacity: 0, x: 0 }}
              animate={{
                bottom: "112%",
                opacity: [0, 1, 1, 0],
                x: reducedMotion ? 0 : [0, h.sway, -h.sway, 0],
              }}
              exit={{ opacity: 0, scale: 1.6, transition: { duration: 0.25 } }}
              transition={{ duration: h.duration, ease: "linear" }}
              onAnimationComplete={() => expireHeart(h.id)}
              onClick={(e) => catchHeart(h.id, e)}
              className="absolute touch-manipulation select-none leading-none drop-shadow-[0_0_10px_rgba(232,116,143,0.6)]"
              style={{ left: `${h.left}%`, fontSize: `${h.size}rem` }}
              aria-label="Catch heart"
            >
              {h.emoji}
            </motion.button>
          ))}
        </AnimatePresence>

        <div className="absolute top-3 right-4 text-xs text-midnight-200 font-body tabular-nums bg-midnight-950/50 rounded-full px-2.5 py-1 backdrop-blur-sm">
          {caught} / {GOAL} caught
        </div>
      </div>

      <ContinuePrompt visible={caught >= GOAL} hint="Almost there. One more moment." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
