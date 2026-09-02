import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { HeartParticles } from "@/components/effects/HeartParticles";
import { GrowingRose } from "@/components/effects/GrowingRose";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/state/ProgressContext";
import { sound } from "@/lib/sound";

const STAGES = ["I love you.", "That's it.", "Actually...", `I REALLY love you. ❤️`];

type Phase = "lines" | "rose" | "ending";

export function FinalSurprise() {
  const { resetJourney } = useProgress();
  const [stage, setStage] = useState(0);
  const [phase, setPhase] = useState<Phase>("lines");
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    sound.heart();
    const timers = STAGES.map((_, i) => window.setTimeout(() => setStage(i + 1), 1600 + i * 1700));
    return () => timers.forEach(clearTimeout);
  }, []);

  const linesFinished = stage >= STAGES.length;

  useEffect(() => {
    if (linesFinished && phase === "lines") {
      const t = window.setTimeout(() => setPhase("rose"), 1400);
      return () => clearTimeout(t);
    }
  }, [linesFinished, phase]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-midnight-950">
      {phase === "ending" && <HeartParticles count={40} />}

      <AnimatePresence mode="wait">
        {phase === "lines" && (
          <motion.div key="lines" exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center">
            <motion.div
              animate={linesFinished ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-8 select-none"
            >
              💗
            </motion.div>

            <div className="min-h-[4rem]">
              {STAGES.slice(0, stage).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: i === stage - 1 ? 1 : 0.35, y: 0 }}
                  transition={{ duration: 0.9 }}
                  className={
                    i === STAGES.length - 1
                      ? "font-display text-3xl sm:text-4xl text-rose-light"
                      : "font-display text-2xl sm:text-3xl text-cream"
                  }
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "rose" && (
          <motion.div
            key="rose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GrowingRose
              dedicationTitle={loveStory.roseDedicationTitle}
              dedicationMessage={loveStory.roseDedicationMessage}
              onComplete={() => setPhase("ending")}
            />
          </motion.div>
        )}

        {phase === "ending" && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="font-hand text-3xl text-gold mb-8">{loveStory.finalSignature}</p>
            {!confirmReset ? (
              <Button variant="ghost" size="sm" onClick={() => setConfirmReset(true)}>
                Relive our universe 🔁
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-midnight-400">Start the whole journey over from the beginning?</p>
                <div className="flex gap-3">
                  <Button size="sm" onClick={resetJourney}>
                    Yes, restart
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmReset(false)}>
                    Never mind
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
