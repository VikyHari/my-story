import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { useProgress } from "@/state/ProgressContext";
import { sound } from "@/lib/sound";

export function BucketList({ onNext }: { onNext: () => void }) {
  const items = loveStory.bucketList;
  const { data, setData } = useProgress();
  const checked = new Set(data.bucketChecked);

  function toggle(id: string) {
    sound.pop();
    setData((p) => {
      const set = new Set(p.bucketChecked);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...p, bucketChecked: Array.from(set) };
    });
  }

  const count = checked.size;

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter Thirteen" title="Things I Want To Do With You" />

      <ul className="w-full max-w-md space-y-3">
        {items.map((item, i) => {
          const isChecked = checked.has(item.id);
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                onClick={() => toggle(item.id)}
                className={`relative w-full flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  isChecked
                    ? "border-rose/40 bg-rose/10"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-colors ${
                    isChecked ? "bg-rose border-rose" : "border-white/30"
                  }`}
                >
                  {isChecked && <Check className="w-4 h-4 text-cream" strokeWidth={3} />}
                </span>
                <span className={`font-body text-sm sm:text-base ${isChecked ? "text-cream" : "text-midnight-100"}`}>
                  {item.emoji} {item.label}
                </span>

                <AnimatePresence>
                  {isChecked && (
                    <motion.span
                      key="burst"
                      initial={{ opacity: 1, scale: 0.6 }}
                      animate={{ opacity: 0, scale: 1.8, y: -20 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute right-4 text-lg pointer-events-none"
                    >
                      💗
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </ul>

      <p className="text-xs text-midnight-400 mt-6">
        {count} / {items.length} checked off — no rush.
      </p>

      <ContinuePrompt hint="One more game before it gets serious again." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
