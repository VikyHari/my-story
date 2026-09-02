import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { sound } from "@/lib/sound";

export function IfWeWereGame({ onNext }: { onNext: () => void }) {
  const questions = loveStory.ifWeWere;
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = questions[index];
  const finished = index >= questions.length;

  function flip() {
    sound.pop();
    setFlipped(true);
  }

  function next() {
    sound.click();
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter Fourteen" title='The "If We Were..." Game' subtitle="My answer's already locked in." />

      <div className="w-full max-w-md" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, rotateY: -12 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 12 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 text-center min-h-[12rem] flex flex-col justify-center" glow>
                {!flipped ? (
                  <>
                    <p className="font-display text-xl sm:text-2xl text-cream mb-6 text-balance">{current.prompt}</p>
                    <Button size="sm" onClick={flip}>
                      Reveal my answer
                    </Button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-[11px] uppercase tracking-wider text-midnight-400 mb-2">My answer</p>
                    <p className="font-hand text-3xl text-rose-light mb-6">{current.myAnswer}</p>
                    <Button size="sm" onClick={next}>
                      {index === questions.length - 1 ? "Continue" : "Next"}
                    </Button>
                  </motion.div>
                )}
              </GlassCard>
              <p className="text-center text-xs text-midnight-400 mt-4">
                {index + 1} of {questions.length}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="done"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-display text-2xl text-cream"
            >
              Your turn to answer those, someday.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <ContinuePrompt visible={finished} hint="One quick game before it gets serious again." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
