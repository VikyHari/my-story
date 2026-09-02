import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { sound } from "@/lib/sound";

export function DoYouRememberGame({ onNext }: { onNext: () => void }) {
  const questions = loveStory.rememberQuestions;
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);

  const current = questions[index];
  const isLast = index === questions.length - 1;
  const finished = index >= questions.length;

  function choose(response: string) {
    sound.pop();
    setResponse(response);
  }

  function advanceQuestion() {
    sound.click();
    setResponse(null);
    setIndex((i) => i + 1);
  }

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter One" title="Do you remember?" subtitle="No pressure. This is just for fun." />

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassCard className="p-6 sm:p-8 text-center" glow>
                <p className="font-display text-xl sm:text-2xl text-cream mb-6 text-balance">{current.question}</p>

                {!response ? (
                  <div className="flex flex-wrap justify-center gap-3">
                    {current.options.map((opt) => (
                      <Button key={opt.label} variant="outline" size="sm" onClick={() => choose(opt.response)}>
                        {opt.emoji} {opt.label}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-5"
                  >
                    <p className="text-rose-light font-body text-base">{response}</p>
                    <Button size="sm" onClick={advanceQuestion}>
                      {isLast ? "That's all of them" : "Next question"}
                    </Button>
                  </motion.div>
                )}
              </GlassCard>
              <p className="text-center text-xs text-midnight-400 mt-4">
                {index + 1} of {questions.length}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <p className="font-display text-2xl text-cream mb-2">However much you remembered...</p>
              <p className="text-midnight-200 font-body">I remember all of it. Every version of us.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ContinuePrompt visible={finished} hint="Okay... I have another question." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
