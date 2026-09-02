import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/state/ProgressContext";
import { sound } from "@/lib/sound";
import { useSecret, useLongPress } from "@/components/effects/SecretSurprise";

export function IntroScene({ onNext }: { onNext: () => void }) {
  const { setData } = useProgress();
  const [lineIndex, setLineIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const lines = loveStory.introLines;
  const { reveal } = useSecret("intro-heart-longpress");
  const longPress = useLongPress(() => reveal("You held on. That's kind of exactly what I hoped you'd do. 🥹"));

  useEffect(() => {
    if (lineIndex >= lines.length) {
      const t = setTimeout(() => setShowButton(true), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 1900);
    return () => clearTimeout(t);
  }, [lineIndex, lines.length]);

  function handleEnter() {
    sound.whoosh();
    setData((p) => ({ ...p, hasEnteredUniverse: true }));
    onNext();
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="mb-8 text-5xl select-none cursor-pointer"
        {...longPress}
      >
        💗
      </motion.div>

      <div className="min-h-[9rem] flex flex-col items-center justify-center gap-4">
        {lines.slice(0, lineIndex).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={
              i === lines.length - 1
                ? "font-display text-2xl sm:text-3xl text-rose-light"
                : "font-display text-3xl sm:text-4xl text-cream"
            }
          >
            {line}
          </motion.p>
        ))}
      </div>

      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10"
        >
          <Button size="lg" onClick={handleEnter} className="group">
            <span className="flex items-center gap-2">
              Enter Our Universe
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </span>
          </Button>
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 0.6 : 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-8 text-xs text-midnight-400 font-body tracking-wide"
      >
        best with sound & a few quiet minutes
      </motion.p>
    </div>
  );
}
