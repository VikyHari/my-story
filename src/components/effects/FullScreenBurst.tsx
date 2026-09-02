import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { onScreenBurst, ScreenBurstPayload } from "@/lib/burstBus";
import { useSettings } from "@/state/SettingsContext";

interface ActiveBurst extends ScreenBurstPayload {
  id: number;
}

let counter = 0;

/**
 * Mount once near the root. Any component can call fireScreenBurst() from
 * lib/burstBus to make an emoji zoom from a point and swallow the whole
 * screen for a moment, with a matching color wash behind it.
 */
export function FullScreenBurstLayer() {
  const [bursts, setBursts] = useState<ActiveBurst[]>([]);
  const { reducedMotion } = useSettings();

  useEffect(() => {
    return onScreenBurst((payload) => {
      const id = counter++;
      const duration = reducedMotion ? 260 : payload.duration ?? 850;
      setBursts((prev) => [...prev, { ...payload, id, duration }]);
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== id));
      }, duration + 80);
    });
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[78] overflow-hidden">
      <AnimatePresence>
        {bursts.map((b) => {
          const seconds = (b.duration ?? 850) / 1000;
          const maxScale = reducedMotion ? Math.min(b.scale ?? 16, 4) : b.scale ?? 16;
          return (
            <React.Fragment key={b.id}>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: seconds, times: [0, 0.35, 1], ease: "easeOut" }}
                style={{
                  background: `radial-gradient(circle at ${b.x}px ${b.y}px, ${
                    b.color ?? "rgba(232,116,143,0.5)"
                  }, transparent 62%)`,
                }}
              />
              <motion.div
                className="absolute text-[4rem] sm:text-[5rem] select-none leading-none"
                style={{ left: b.x, top: b.y, translateX: "-50%", translateY: "-50%" }}
                initial={{ scale: 0.35, opacity: 0, rotate: -8 }}
                animate={{ scale: [0.35, maxScale, maxScale * 1.05], opacity: [0, 1, 0], rotate: [-8, 4, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: seconds, ease: [0.16, 1, 0.3, 1] }}
              >
                {b.emoji}
              </motion.div>
            </React.Fragment>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
