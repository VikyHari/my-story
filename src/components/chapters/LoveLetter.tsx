import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Button } from "@/components/ui/Button";
import { sound } from "@/lib/sound";
import { useSettings } from "@/state/SettingsContext";

export function LoveLetter({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState(false);
  const { reducedMotion } = useSettings();

  function open() {
    sound.success();
    setOpened(true);
  }

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter Eight" title="A Letter For You" />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 h-44 sm:w-72 sm:h-48 bg-gradient-to-br from-cream to-blush rounded-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center mb-8"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-wine-700 to-rose"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 60%)" }}
              />
              <Mail className="w-10 h-10 text-wine-700 z-10" />
            </motion.div>
            <Button onClick={open} size="lg">
              Open this...
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.9, rotateX: -30 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-xl"
          >
            <div
              className="relative rounded-md p-8 sm:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
              style={{
                background:
                  "repeating-linear-gradient(180deg, #faf3ea, #faf3ea 27px, #f0e5d8 28px), radial-gradient(circle at 90% 10%, rgba(200,150,100,0.08), transparent 40%)",
              }}
            >
              <div className="space-y-3 sm:space-y-4">
                {loveStory.letter.map((p, i) => (
                  <motion.p
                    key={i}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : 0.3 + i * 0.35, duration: 0.6 }}
                    className="font-hand text-midnight-800 text-2xl sm:text-3xl leading-snug"
                  >
                    {p.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt visible={opened} hint="Okay, something more playful now." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
