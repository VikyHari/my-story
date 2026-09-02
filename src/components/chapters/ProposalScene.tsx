import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { Button } from "@/components/ui/Button";
import { sound } from "@/lib/sound";

const LINES = [
  "Before you leave...",
  "There is one thing I want you to know.",
  "Out of all the people in this huge world...",
  "I'm really glad I found you.",
];

export function ProposalScene({ onNext }: { onNext: () => void }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => setShowQuestion(true), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 2200);
    return () => clearTimeout(t);
  }, [lineIndex]);

  function choose() {
    sound.celebration();
    onNext();
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl mb-10 select-none"
        aria-hidden="true"
      >
        💗
      </motion.div>

      <div className="min-h-[8rem] flex flex-col items-center justify-center gap-4 max-w-lg">
        {LINES.slice(0, lineIndex).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-2xl sm:text-3xl text-cream text-balance"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <AnimatePresence>
        {showQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-10 flex flex-col items-center gap-8"
          >
            <p className="font-display text-3xl sm:text-4xl text-rose-light text-balance max-w-md">
              {loveStory.proposalQuestion}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" onClick={choose}>
                YES ❤️
              </Button>
              <Button size="lg" variant="ghost" onClick={choose}>
                OF COURSE 🥺
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
