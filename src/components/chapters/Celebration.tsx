import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { Confetti, ConfettiHandle } from "@/components/effects/Confetti";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { fireKiss } from "@/lib/kissBus";
import { sound } from "@/lib/sound";

const LINES = ["Then let's keep choosing each other. ❤️", "Today.", "Tomorrow.", "And in all the ordinary little moments in between."];

export function Celebration({ onNext }: { onNext: () => void }) {
  const confettiRef = useRef<ConfettiHandle>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    sound.celebration();
    confettiRef.current?.burst({ count: 160 });
    const kissTimers: number[] = [];
    for (let i = 0; i < 6; i++) {
      kissTimers.push(
        window.setTimeout(() => {
          fireKiss({
            x: Math.random() * window.innerWidth,
            y: window.innerHeight * (0.6 + Math.random() * 0.3),
          });
        }, i * 350)
      );
    }
    const burstAgain = window.setTimeout(() => confettiRef.current?.burst({ count: 80 }), 1400);
    return () => {
      kissTimers.forEach(clearTimeout);
      clearTimeout(burstAgain);
    };
  }, []);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => setShowSignature(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 1700);
    return () => clearTimeout(t);
  }, [lineIndex]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <Confetti ref={confettiRef} />

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl mb-8 select-none"
        aria-hidden="true"
      >
        💞
      </motion.div>

      <div className="flex flex-col items-center gap-3 max-w-lg min-h-[8rem]">
        {LINES.slice(0, lineIndex).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={i === 0 ? "font-display text-2xl sm:text-3xl text-cream" : "font-body text-lg text-rose-light"}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {showSignature && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-hand text-4xl text-gold mt-8"
        >
          {loveStory.finalSignature}
        </motion.p>
      )}

      <ContinuePrompt visible={showSignature} hint="Our story isn't finished..." onClick={onNext} label="See everything" />
    </div>
  );
}
