import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { useProgress } from "@/state/ProgressContext";
import { fireKiss } from "@/lib/kissBus";
import { fireScreenBurst } from "@/lib/burstBus";
import { fireShake } from "@/lib/shakeBus";
import { sound } from "@/lib/sound";
import { Confetti, ConfettiHandle } from "@/components/effects/Confetti";
import { useSettings } from "@/state/SettingsContext";

const MILESTONES: [number, string][] = [
  [10, "Okay that's cute."],
  [50, "You're getting spoiled."],
  [100, "Still not enough."],
  [500, "Fine. Infinite kisses. 💋❤️"],
];

function milestoneMessage(count: number): string | null {
  let msg: string | null = null;
  for (const [threshold, m] of MILESTONES) {
    if (count >= threshold) msg = m;
  }
  return msg;
}

function milestoneHit(count: number): boolean {
  return MILESTONES.some(([t]) => t === count);
}

const KISS_EMOJIS = ["💋", "💋", "💋", "😘"];

export function KissMachine({ onNext }: { onNext: () => void }) {
  const { data, setData } = useProgress();
  const btnRef = useRef<HTMLButtonElement>(null);
  const confettiRef = useRef<ConfettiHandle>(null);
  const { reducedMotion, isMobile } = useSettings();
  const count = data.kissCount;
  const [pop, setPop] = useState(0);
  const [milestoneFlash, setMilestoneFlash] = useState<string | null>(null);

  // the button itself grows "big big big" the more she gets kissed, capped so it stays tappable
  const growth = Math.min(count, 60);
  const buttonScale = 1 + growth * 0.028;

  function send() {
    sound.kiss();
    const rect = btnRef.current?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight - 80 };

    fireKiss(origin);
    setPop((p) => p + 1);

    const nextCount = count + 1;
    const isMilestone = milestoneHit(nextCount);

    // every tap plants a big kiss mark that briefly swallows the screen
    fireScreenBurst({
      emoji: KISS_EMOJIS[Math.floor(Math.random() * KISS_EMOJIS.length)],
      x: origin.x,
      y: origin.y,
      color: "rgba(232,116,143,0.5)",
      scale: isMilestone ? 30 : isMobile ? 12 : 16,
      duration: isMilestone ? 1500 : 650,
    });
    fireShake(isMilestone ? 1.8 : 0.5);

    if (isMilestone) {
      sound.celebration();
      confettiRef.current?.burst({ count: 140 });
      setMilestoneFlash(milestoneMessage(nextCount));
      window.setTimeout(() => setMilestoneFlash(null), 2200);
    }

    setData((p) => ({ ...p, kissCount: p.kissCount + 1 }));
  }

  const message = milestoneMessage(count);

  return (
    <ChapterScroll className="relative">
      <Confetti ref={confettiRef} />
      <ChapterHeading eyebrow="Chapter Nine" title="Sending You Kisses..." subtitle="Tap it. Watch it take over the screen." />

      <motion.button
        ref={btnRef}
        onClick={send}
        animate={{ scale: buttonScale }}
        whileTap={{ scale: buttonScale * 0.8, rotate: -10 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="text-7xl sm:text-8xl select-none mb-8 drop-shadow-[0_0_40px_rgba(232,116,143,0.6)]"
        aria-label="Send kiss"
      >
        <motion.span
          key={pop}
          initial={reducedMotion ? false : { scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="inline-block"
        >
          💋
        </motion.span>
      </motion.button>

      <p className="font-body text-midnight-200 text-sm mb-1">Kisses sent</p>
      <motion.p
        key={count}
        initial={{ scale: 1.4, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-display text-4xl text-cream mb-4 tabular-nums"
      >
        {count}
      </motion.p>

      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-light font-body italic mb-6"
        >
          {message}
        </motion.p>
      )}

      <AnimatePresence>
        {milestoneFlash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="fixed inset-0 z-[79] flex items-center justify-center pointer-events-none px-6"
          >
            <p className="font-display text-4xl sm:text-6xl text-center text-cream drop-shadow-[0_0_30px_rgba(232,116,143,0.8)] text-balance">
              {milestoneFlash}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt visible={count >= 5} hint="Come here for a second." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
