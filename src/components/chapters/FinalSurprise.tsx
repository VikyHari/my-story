import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { HeartParticles } from "@/components/effects/HeartParticles";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/state/ProgressContext";
import { sound } from "@/lib/sound";

const STAGES = ["I love you.", "That's it.", "Actually...", `I REALLY love you. ❤️`];

export function FinalSurprise() {
  const { resetJourney } = useProgress();
  const [stage, setStage] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    sound.heart();
    const timers = STAGES.map((_, i) => window.setTimeout(() => setStage(i + 1), 1600 + i * 1700));
    return () => timers.forEach(clearTimeout);
  }, []);

  const finished = stage >= STAGES.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center bg-midnight-950">
      {finished && <HeartParticles count={40} />}

      <motion.div
        animate={finished ? { scale: [1, 1.15, 1] } : { scale: 1 }}
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

      {finished && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-14">
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
    </div>
  );
}
