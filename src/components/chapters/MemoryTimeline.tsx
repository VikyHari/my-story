import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Memory } from "@/types";
import { sound } from "@/lib/sound";

const CATEGORY_LABEL: Record<Memory["category"], string> = {
  "first-meeting": "First Meeting",
  "first-conversation": "First Conversation",
  "first-date": "First Date",
  "first-photo": "First Photo",
  funny: "Funniest Moment",
  trip: "Best Trip",
  favorite: "Favorite Memory",
  difficult: "Difficult Moment",
  achievement: "Achievement",
  recent: "Recent Memory",
};

export function MemoryTimeline({ onNext }: { onNext: () => void }) {
  const memories = loveStory.memories;
  const [openId, setOpenId] = useState<string | null>(null);
  const open = memories.find((m) => m.id === openId) ?? null;
  const [seen, setSeen] = useState<Set<string>>(new Set());

  function openMemory(m: Memory) {
    sound.pop();
    setOpenId(m.id);
    setSeen((s) => new Set(s).add(m.id));
  }

  const allSeen = seen.size >= memories.length;

  return (
    <ChapterScroll className="max-w-4xl mx-auto">
      <ChapterHeading eyebrow="Chapter Four" title="Our Memory Lane" subtitle="Tap a memory to relive it." />

      <div className="relative w-full">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose/40 to-transparent hidden sm:block" />
        <div className="flex flex-col gap-6 sm:gap-10">
          {memories.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className={`flex ${i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}
            >
              <GlassCard
                className={`w-full sm:w-[calc(50%-2rem)] p-5 cursor-pointer relative ${
                  seen.has(m.id) ? "border-rose/30" : ""
                }`}
                whileHover={{ y: -4 }}
                onClick={() => openMemory(m)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{m.emoji}</span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-rose-light/70">{CATEGORY_LABEL[m.category]}</p>
                    <p className="font-display text-lg text-cream">{m.title}</p>
                  </div>
                </div>
                <p className="text-xs text-midnight-300">{m.date}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <GlassCard className="p-8 text-center relative" glow>
                <button
                  onClick={() => setOpenId(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-midnight-300 hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-5xl mb-4">{open.emoji}</div>
                <p className="text-[11px] uppercase tracking-wider text-rose-light/70 mb-1">{CATEGORY_LABEL[open.category]}</p>
                <h3 className="font-display text-2xl text-cream mb-1">{open.title}</h3>
                <p className="text-xs text-midnight-400 mb-4">{open.date}</p>
                <p className="font-body text-midnight-100 leading-relaxed">{open.description}</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt
        visible={allSeen}
        hint="There's more waiting for you."
        onClick={onNext}
        label="Next chapter"
      />
      {!allSeen && (
        <p className="text-xs text-midnight-400 mt-8">
          {seen.size} / {memories.length} memories revisited
        </p>
      )}
    </ChapterScroll>
  );
}
