import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Button } from "@/components/ui/Button";
import { sound } from "@/lib/sound";

export function VirtualHug({ onNext }: { onNext: () => void }) {
  const [hugging, setHugging] = useState(false);
  const [textStage, setTextStage] = useState(0);

  function startHug() {
    sound.heart();
    setHugging(true);
    window.setTimeout(() => setTextStage(1), 1400);
    window.setTimeout(() => setTextStage(2), 3200);
  }

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter Ten" title="Give Me A Hug" />

      <div className="relative w-full max-w-xs h-40 flex items-center justify-center mb-8">
        <AnimatePresence>
          {hugging && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.6, 2.2, 2.6] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.4 }}
              className="absolute inset-0 rounded-full bg-rose/30 blur-2xl"
            />
          )}
        </AnimatePresence>

        <motion.span
          animate={hugging ? { x: 18 } : { x: -6 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="text-6xl select-none"
        >
          🧑
        </motion.span>
        <motion.span
          animate={hugging ? { x: -18 } : { x: 6 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="text-6xl select-none -ml-2"
        >
          🧑
        </motion.span>

        {hugging &&
          Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], y: -60 - i * 6, x: (i - 2) * 14, scale: 1 }}
              transition={{ duration: 2.2, delay: i * 0.25, repeat: Infinity, repeatDelay: 0.6 }}
              className="absolute text-lg"
            >
              💗
            </motion.span>
          ))}
      </div>

      {!hugging ? (
        <Button onClick={startHug} size="lg">
          Give me a hug 🤗
        </Button>
      ) : (
        <div className="min-h-[4rem] text-center">
          <AnimatePresence mode="wait">
            {textStage === 0 && (
              <motion.p key="0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-midnight-200">
                Okay... stay here for a second.
              </motion.p>
            )}
            {textStage === 1 && (
              <motion.p key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-rose-light italic">
                I wish I could actually hug you right now.
              </motion.p>
            )}
            {textStage >= 2 && (
              <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="font-display text-xl text-cream mb-6">Feeling it? Good.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <ContinuePrompt visible={textStage >= 2} hint="One more thing before we keep going." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
