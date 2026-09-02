import React from "react";
import { Heart } from "lucide-react";
import { useProgress } from "@/state/ProgressContext";
import { CHAPTER_ORDER, TOTAL_PROGRESS_STEPS, progressIndexFor } from "@/state/chapters";

export function ProgressIndicator() {
  const { currentChapter } = useProgress();
  const meta = CHAPTER_ORDER.find((c) => c.id === currentChapter);
  if (!meta?.countsInProgress) return null;

  const step = progressIndexFor(currentChapter);
  const pct = Math.min((step / TOTAL_PROGRESS_STEPS) * 100, 100);

  return (
    <div
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 rounded-full border border-white/10 bg-midnight-900/60 backdrop-blur-md px-3 py-1.5"
      aria-label={`Progress: chapter ${step} of ${TOTAL_PROGRESS_STEPS}`}
    >
      <span className="relative w-4 h-4 shrink-0">
        <Heart className="absolute inset-0 w-4 h-4 text-white/20" />
        <span className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(${100 - pct}% 0 0 0)` }}>
          <Heart className="w-4 h-4 text-rose fill-rose" />
        </span>
      </span>
      <span className="text-xs font-body text-midnight-100 tabular-nums">
        {step} / {TOTAL_PROGRESS_STEPS}
      </span>
    </div>
  );
}
