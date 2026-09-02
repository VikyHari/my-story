import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { Button } from "@/components/ui/Button";
import { ChapterHeading } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Confetti, ConfettiHandle } from "@/components/effects/Confetti";
import { sound } from "@/lib/sound";
import { fireScreenBurst } from "@/lib/burstBus";
import { fireShake } from "@/lib/shakeBus";
import { useSettings } from "@/state/SettingsContext";

interface Pos {
  x: number;
  y: number;
}

const NO_BOUNDS = { xMin: 12, xMax: 88, yMin: 42, yMax: 86 };

function randomNoPos(avoid?: Pos): Pos {
  let candidate: Pos;
  let tries = 0;
  do {
    candidate = {
      x: NO_BOUNDS.xMin + Math.random() * (NO_BOUNDS.xMax - NO_BOUNDS.xMin),
      y: NO_BOUNDS.yMin + Math.random() * (NO_BOUNDS.yMax - NO_BOUNDS.yMin),
    };
    tries++;
  } while (avoid && tries < 12 && Math.hypot(candidate.x - avoid.x, candidate.y - avoid.y) < 26);
  return candidate;
}

export function PlayfulQuestions({ onNext }: { onNext: () => void }) {
  const questions = loveStory.playfulQuestions;
  const { reducedMotion } = useSettings();
  const confettiRef = useRef<ConfettiHandle>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const lastDodge = useRef(0);

  const [index, setIndex] = useState(0);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noPos, setNoPos] = useState<Pos>({ x: 68, y: 58 });
  const [settled, setSettled] = useState<string | null>(null);
  const [fleeing, setFleeing] = useState(false);

  const current = questions[index];
  const finished = index >= questions.length;
  const maxDodges = current?.noEscalation.prompts.length ?? 0;
  const cornered = dodgeCount >= maxDodges;

  const yesScale = 1 + Math.min(dodgeCount, maxDodges) * 0.22;
  const noScale = cornered ? 1 : Math.max(1 - dodgeCount * 0.16, 0.42);

  function burstAt(el: HTMLElement | null, emoji: string, scale: number, duration: number, color: string) {
    const rect = el?.getBoundingClientRect();
    const origin = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    fireScreenBurst({ emoji, x: origin.x, y: origin.y, scale, duration, color });
  }

  function dodge(el: HTMLElement | null) {
    if (cornered || settled) return;
    const now = performance.now();
    if (now - lastDodge.current < 320) return;
    lastDodge.current = now;

    sound.pop();
    burstAt(el, "💨", 4, 320, "rgba(255,255,255,0.15)");
    if (!reducedMotion) fireShake(0.25);
    setFleeing(true);
    setNoPos((prev) => randomNoPos(prev));
    setDodgeCount((c) => Math.min(c + 1, maxDodges));
    window.setTimeout(() => setFleeing(false), 250);
  }

  function handleNoPointerEnter(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType !== "mouse") return;
    dodge(e.currentTarget);
  }

  function handleNoClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (!cornered) {
      dodge(e.currentTarget);
      return;
    }
    sound.pop();
    setSettled(current.noEscalation.finalResponse);
  }

  function handleYes(e: React.MouseEvent<HTMLButtonElement>) {
    sound.heart();
    burstAt(e.currentTarget, "❤️", 20, 900, "rgba(232,116,143,0.5)");
    fireShake(0.7);
    confettiRef.current?.burst({ count: 70 });
    setSettled(current.yesResponse);
  }

  function next() {
    sound.click();
    setSettled(null);
    setDodgeCount(0);
    setNoPos(randomNoPos());
    setIndex((i) => i + 1);
  }

  const promptText =
    dodgeCount === 0 ? current?.question : current?.noEscalation.prompts[Math.min(dodgeCount, maxDodges) - 1];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Confetti ref={confettiRef} />

      <div className="relative z-10 pt-14 sm:pt-16 px-4">
        <ChapterHeading
          eyebrow="Chapter Two"
          title="Just A Few Honest Questions"
          subtitle={finished ? undefined : "Try to click NO. I dare you 😏"}
        />
      </div>

      {!finished && (
        <div ref={arenaRef} className="absolute inset-0">
          <AnimatePresence mode="wait">
            {!settled ? (
              <motion.p
                key={current.id + dodgeCount}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{ translateX: "-50%" }}
                className="absolute left-1/2 top-[30%] sm:top-[32%] w-[88%] max-w-md text-center font-display text-xl sm:text-2xl text-cream text-balance px-5 py-3 rounded-2xl bg-midnight-950/50 backdrop-blur-sm border border-white/5"
              >
                {promptText}
              </motion.p>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ translateX: "-50%" }}
                className="absolute left-1/2 top-[38%] w-[88%] max-w-md text-center"
              >
                <p className="font-display text-2xl sm:text-3xl text-rose-light text-balance mb-8">{settled}</p>
                <Button size="md" onClick={next}>
                  {index === questions.length - 1 ? "Continue" : "Next question"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {!settled && (
            <>
              <motion.button
                onClick={handleYes}
                animate={{ scale: yesScale }}
                whileHover={reducedMotion ? undefined : { scale: yesScale * 1.06 }}
                whileTap={{ scale: yesScale * 0.92 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                style={{ position: "absolute", left: "50%", top: "78%", translateX: "-50%", translateY: "-50%" }}
                className="rounded-full bg-gradient-to-r from-rose to-wine-700 text-cream shadow-[0_10px_40px_-8px_rgba(232,116,143,0.7)] px-8 py-4 font-body font-semibold flex items-center gap-2 whitespace-nowrap touch-manipulation"
              >
                <Heart className="w-5 h-5" /> YES
              </motion.button>

              <motion.button
                onClick={handleNoClick}
                onPointerEnter={handleNoPointerEnter}
                animate={{
                  left: `${noPos.x}%`,
                  top: `${noPos.y}%`,
                  scale: noScale,
                  rotate: fleeing ? (dodgeCount % 2 === 0 ? -12 : 12) : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ position: "absolute", translateX: "-50%", translateY: "-50%" }}
                className={`rounded-full font-body font-medium whitespace-nowrap touch-manipulation ${
                  cornered
                    ? "bg-white/10 border border-white/20 text-cream px-6 py-3"
                    : "bg-white/5 border border-white/15 text-cream/80 px-6 py-3"
                }`}
              >
                {cornered ? current.noEscalation.finalLabel : "NO 😭"}
              </motion.button>
            </>
          )}
        </div>
      )}

      {finished && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-display text-2xl text-cream px-6"
        >
          Good. All correct answers, technically.
        </motion.p>
      )}

      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8">
        {!finished && (
          <p className="text-xs text-midnight-400 mb-2">
            {index + 1} of {questions.length}
          </p>
        )}
        <ContinuePrompt visible={finished} hint="You haven't seen the best part yet." onClick={onNext} label="Next chapter" />
      </div>
    </div>
  );
}
