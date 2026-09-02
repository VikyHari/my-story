import React from "react";
import { motion } from "framer-motion";
import { loveStory } from "@/config/loveStory";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { useProgress } from "@/state/ProgressContext";
import { ChapterId } from "@/state/chapters";
import { sound } from "@/lib/sound";

const REVISIT: { id: ChapterId; label: string; emoji: string }[] = [
  { id: "memories", label: "Memories", emoji: "🕯️" },
  { id: "letter", label: "Love Letter", emoji: "💌" },
  { id: "constellation", label: "Reasons", emoji: "⭐" },
  { id: "apology", label: "Apology", emoji: "🕊️" },
  { id: "future", label: "Future", emoji: "🌄" },
  { id: "proposal", label: "Proposal", emoji: "💍" },
];

export function FinalMemoryWall({ onNext }: { onNext: () => void }) {
  const { goToChapter } = useProgress();
  const memories = loveStory.memories;

  return (
    <ChapterScroll className="max-w-4xl mx-auto">
      <ChapterHeading eyebrow="One Last Look" title="Our story isn't finished..." subtitle="This is just the beginning." />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10 w-full">
        {memories.slice(0, 10).map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <GlassCard className="p-3 text-center h-full">
              <p className="text-2xl mb-1">{m.emoji}</p>
              <p className="text-[11px] font-body text-midnight-200 truncate">{m.title}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <p className="text-midnight-300 font-body text-sm mb-4">Want to revisit anything?</p>
      <div className="flex flex-wrap justify-center gap-3 mb-4 max-w-lg">
        {REVISIT.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              sound.click();
              goToChapter(r.id);
            }}
            className="rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] px-4 py-2 text-sm font-body text-cream/90 flex items-center gap-2"
          >
            <span>{r.emoji}</span> {r.label}
          </button>
        ))}
      </div>

      <ContinuePrompt hint="One last thing..." onClick={onNext} label="Continue" />
    </ChapterScroll>
  );
}
