import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useProgress } from "@/state/ProgressContext";
import { announceSecret, onSecret } from "@/lib/secretBus";
import { sound } from "@/lib/sound";

export function useSecret(id: string) {
  const { data, setData } = useProgress();
  const found = data.secretsFound.includes(id);

  function reveal(message: string) {
    if (data.secretsFound.includes(id)) return;
    setData((prev) => ({ ...prev, secretsFound: [...prev.secretsFound, id] }));
    sound.chime();
    announceSecret(message);
  }

  return { found, reveal };
}

/** A near-invisible clickable hotspot that reveals a secret when found. */
export function SecretHotspot({
  id,
  message,
  className = "",
  children,
}: {
  id: string;
  message: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const { found, reveal } = useSecret(id);
  return (
    <button
      type="button"
      aria-label="???"
      onClick={() => reveal(message)}
      className={`outline-none focus-visible:ring-2 focus-visible:ring-rose/60 rounded-full ${
        found ? "opacity-60" : "opacity-30 hover:opacity-70"
      } transition-opacity duration-500 ${className}`}
    >
      {children ?? <span className="text-lg">✨</span>}
    </button>
  );
}

/** Reveals a secret on a specific keypress, anywhere on the site. */
export function KeyboardSecret({ keyName, id, message }: { keyName: string; id: string; message: string }) {
  const { reveal } = useSecret(id);
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key.toLowerCase() === keyName.toLowerCase()) reveal(message);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [keyName, message]);
  return null;
}

export function useLongPress(onLongPress: () => void, ms = 700) {
  const [timer, setTimer] = useState<number | null>(null);
  const start = () => setTimer(window.setTimeout(onLongPress, ms));
  const clear = () => {
    if (timer) window.clearTimeout(timer);
    setTimer(null);
  };
  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
}

export function SecretToastLayer() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    return onSecret((message) => {
      setToast(message);
      window.setTimeout(() => setToast(null), 3600);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 sm:top-6 z-[95] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex items-center gap-2 rounded-full border border-gold/40 bg-midnight-900/90 backdrop-blur-xl px-5 py-3 shadow-[0_10px_40px_-10px_rgba(216,168,87,0.5)] max-w-sm"
          >
            <Sparkles className="w-4 h-4 text-gold shrink-0" />
            <div className="text-left">
              <p className="text-gold text-xs font-semibold tracking-wide uppercase">Secret discovered!</p>
              <p className="text-cream text-sm font-body">{toast}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
