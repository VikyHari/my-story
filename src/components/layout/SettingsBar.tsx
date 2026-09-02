import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Accessibility, Settings2, X } from "lucide-react";
import { useSettings } from "@/state/SettingsContext";
import { MusicPlayer } from "@/components/audio/MusicPlayer";

export function SettingsBar() {
  const { soundOn, toggleSound, reducedMotion, toggleReducedMotion } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-start gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
        aria-expanded={open}
        className="w-10 h-10 rounded-full border border-white/10 bg-midnight-900/60 backdrop-blur-md flex items-center justify-center text-cream/80 hover:text-cream hover:bg-midnight-900/80 transition-colors"
      >
        {open ? <X className="w-4 h-4" /> : <Settings2 className="w-4 h-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            className="rounded-2xl border border-white/10 bg-midnight-900/85 backdrop-blur-xl px-4 py-3 flex flex-col gap-2 min-w-[190px] shadow-xl"
          >
            <button
              onClick={toggleSound}
              className="flex items-center justify-between gap-3 text-sm text-cream/90 hover:text-cream"
            >
              <span className="flex items-center gap-2">
                {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Sound
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${soundOn ? "bg-rose/30 text-rose-light" : "bg-white/10 text-midnight-300"}`}>
                {soundOn ? "ON" : "OFF"}
              </span>
            </button>

            <button
              onClick={toggleReducedMotion}
              className="flex items-center justify-between gap-3 text-sm text-cream/90 hover:text-cream"
            >
              <span className="flex items-center gap-2">
                <Accessibility className="w-4 h-4" />
                Reduced motion
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  reducedMotion ? "bg-rose/30 text-rose-light" : "bg-white/10 text-midnight-300"
                }`}
              >
                {reducedMotion ? "ON" : "OFF"}
              </span>
            </button>

            <div className="h-px bg-white/10 my-1" />
            <MusicPlayer compact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
