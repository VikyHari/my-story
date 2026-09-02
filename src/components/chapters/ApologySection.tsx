import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ChapterScroll } from "@/components/ui/ChapterFrame";
import { sound } from "@/lib/sound";

export function ApologySection({ onNext }: { onNext: () => void }) {
  const apologies = loveStory.apologies;
  const [index, setIndex] = useState(0);
  const [revealedFinal, setRevealedFinal] = useState(false);

  const current = apologies[index];
  const isLast = index === apologies.length - 1;

  function next() {
    sound.click();
    if (isLast) {
      setRevealedFinal(true);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <ChapterScroll>
      <div className="text-center mb-10 px-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="text-rose-light/70 tracking-[0.3em] text-xs uppercase mb-4"
        >
          Chapter Seven
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl sm:text-4xl text-cream"
        >
          I'm sorry
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-midnight-300 mt-4 max-w-md mx-auto font-body italic"
        >
          There are some things I wish I had done differently.
        </motion.p>
      </div>

      <div className="w-full max-w-lg">
        <AnimatePresence mode="wait">
          {!revealedFinal ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-6 sm:p-8">
                <h3 className="font-display text-xl text-rose-light mb-5">{current.title}</h3>
                <dl className="space-y-4 text-left">
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-midnight-400 mb-1">What happened</dt>
                    <dd className="font-body text-cream/90">{current.whatHappened}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-midnight-400 mb-1">What I should have done</dt>
                    <dd className="font-body text-cream/90">{current.whatIShouldHaveDone}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-midnight-400 mb-1">What I learned</dt>
                    <dd className="font-body text-cream/90">{current.whatILearned}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-wider text-midnight-400 mb-1">What I'll do differently</dt>
                    <dd className="font-body text-cream/90">{current.whatIWillDo}</dd>
                  </div>
                </dl>
                <div className="mt-7 text-center">
                  <Button size="sm" onClick={next}>
                    {isLast ? "..." : "Next"}
                  </Button>
                </div>
              </GlassCard>
              <p className="text-center text-xs text-midnight-400 mt-4">
                {index + 1} of {apologies.length}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="font-display text-2xl sm:text-3xl text-cream leading-relaxed text-balance">
                I can't change the past.
                <br />
                But I can be better from here.
              </p>
              <div className="mt-8">
                <Button size="lg" onClick={onNext}>
                  Can I try again? ❤️
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ChapterScroll>
  );
}
