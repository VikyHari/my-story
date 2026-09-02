import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Home,
  CookingPot,
  PawPrint,
  Trophy,
  Sunset,
  Compass,
  Sprout,
  HeartHandshake,
  X,
  LucideIcon,
} from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { GlassCard } from "@/components/ui/GlassCard";
import { FuturePlan } from "@/types";
import { sound } from "@/lib/sound";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  home: Home,
  cooking: CookingPot,
  paw: PawPrint,
  trophy: Trophy,
  sunset: Sunset,
  compass: Compass,
  sprout: Sprout,
  "heart-handshake": HeartHandshake,
};

export function FutureRoadmap({ onNext }: { onNext: () => void }) {
  const plans = loveStory.futurePlans;
  const [openId, setOpenId] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const open = plans.find((p) => p.id === openId) ?? null;

  function openPlan(p: FuturePlan) {
    sound.pop();
    setOpenId(p.id);
    setSeen((s) => new Set(s).add(p.id));
  }

  return (
    <ChapterScroll className="max-w-4xl mx-auto">
      <ChapterHeading
        eyebrow="Chapter Twelve"
        title="Our Future"
        subtitle="These are the things I hope we experience together."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
        {plans.map((plan, i) => {
          const Icon = ICONS[plan.icon] ?? Globe;
          return (
            <motion.button
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              onClick={() => openPlan(plan)}
              className="text-left"
            >
              <GlassCard className={`p-4 sm:p-5 h-full ${seen.has(plan.id) ? "border-gold/30" : ""}`}>
                <Icon className="w-6 h-6 text-rose-light mb-3" />
                <p className="font-display text-base sm:text-lg text-cream">{plan.title}</p>
              </GlassCard>
            </motion.button>
          );
        })}
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full"
            >
              <GlassCard className="p-8 text-center relative" glow>
                <button
                  onClick={() => setOpenId(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-midnight-300 hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-display text-2xl text-cream mb-3">{open.title}</h3>
                <p className="font-body text-midnight-100">{open.description}</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt hint="I made a list, actually." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
