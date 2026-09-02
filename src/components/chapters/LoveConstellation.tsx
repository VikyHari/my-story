import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { LoveReason } from "@/types";
import { sound } from "@/lib/sound";

interface StarPos {
  reason: LoveReason;
  x: number;
  y: number;
}

function seededPositions(reasons: LoveReason[]): StarPos[] {
  // deterministic pseudo-random scatter so layout doesn't jump between renders
  return reasons.map((reason, i) => {
    const seed = (i * 137.5) % 360;
    const radiusX = 42 + ((i * 53) % 40);
    const radiusY = 38 + ((i * 71) % 42);
    const angle = (seed * Math.PI) / 180;
    const x = 50 + Math.cos(angle) * (radiusX / 2);
    const y = 50 + Math.sin(angle) * (radiusY / 2);
    return { reason, x: Math.min(Math.max(x, 6), 94), y: Math.min(Math.max(y, 6), 90) };
  });
}

export function LoveConstellation({ onNext }: { onNext: () => void }) {
  const reasons = loveStory.reasonsILoveYou;
  const positions = useMemo(() => seededPositions(reasons), [reasons]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);
  const open = reasons.find((r) => r.id === openId) ?? null;

  function openStar(reason: LoveReason) {
    sound.chime();
    setFound((s) => new Set(s).add(reason.id));
    setOpenId(reason.id);
  }

  const allFound = found.size >= reasons.length;

  return (
    <ChapterScroll className="max-w-4xl mx-auto">
      <ChapterHeading
        eyebrow="Chapter Six"
        title="Things I Love About You"
        subtitle="A whole sky of reasons. Tap a star."
      />

      <div className="relative w-full max-w-3xl aspect-[4/3] sm:aspect-[16/9] rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          {positions.slice(1).map((p, i) => {
            const prev = positions[i];
            return (
              <line
                key={p.reason.id}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${p.x}%`}
                y2={`${p.y}%`}
                stroke="rgba(246,184,198,0.15)"
                strokeWidth={1}
              />
            );
          })}
        </svg>

        {positions.map(({ reason, x, y }, i) => (
          <motion.button
            key={reason.id}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 10) * 0.06, type: "spring", stiffness: 260, damping: 16 }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 1.2 }}
            onClick={() => openStar(reason)}
            aria-label={reason.title}
            className="absolute flex flex-col items-center touch-manipulation"
            style={{ left: `${x}%`, top: `${y}%`, translateX: "-50%", translateY: "-50%" }}
          >
            <Star
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                found.has(reason.id) ? "text-gold fill-gold" : "text-rose-light/70"
              } animate-twinkle`}
            />
            <span className="hidden sm:block text-[10px] text-midnight-300 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100">
              {reason.title}
            </span>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-midnight-400 mt-4">
        {found.size} / {reasons.length} stars discovered
      </p>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-xl"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full rounded-3xl border border-gold/30 bg-midnight-900/95 backdrop-blur-xl p-8 text-center relative"
            >
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="absolute top-4 right-4 text-midnight-300 hover:text-cream"
              >
                <X className="w-5 h-5" />
              </button>
              <Star className="w-8 h-8 text-gold fill-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl text-cream mb-3">{open.title}</h3>
              <p className="font-body text-midnight-100">{open.message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt
        hint={allFound ? "There's something I need to say next." : "Find them all, or move on whenever."}
        onClick={onNext}
        label="Next chapter"
      />
    </ChapterScroll>
  );
}
