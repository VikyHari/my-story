import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onKiss } from "@/lib/kissBus";
import { sound } from "@/lib/sound";
import { useSettings } from "@/state/SettingsContext";

interface KissInstance {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  midX: number;
  rotate: number;
  scale: number;
}

let counter = 0;

/**
 * Mount this once near the root. Any component can trigger a kiss via
 * fireKiss({ x, y }) from lib/kissBus — no prop drilling required.
 */
export function FlyingKissLayer() {
  const [kisses, setKisses] = useState<KissInstance[]>([]);
  const { reducedMotion } = useSettings();
  const targetRef = useRef({ x: typeof window !== "undefined" ? window.innerWidth / 2 : 0, y: 140 });

  useEffect(() => {
    return onKiss((origin) => {
      const id = counter++;
      const endX = targetRef.current.x + (Math.random() - 0.5) * 60;
      const endY = targetRef.current.y + (Math.random() - 0.5) * 40;
      const instance: KissInstance = {
        id,
        startX: origin.x,
        startY: origin.y,
        endX,
        endY,
        midX: origin.x + (Math.random() - 0.5) * 200,
        rotate: (Math.random() - 0.5) * 60,
        scale: Math.random() * 0.5 + 0.9,
      };
      setKisses((prev) => [...prev, instance]);
      sound.kiss();
      window.setTimeout(() => {
        setKisses((prev) => prev.filter((k) => k.id !== id));
      }, reducedMotion ? 50 : 1300);
    });
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {kisses.map((k) => (
          <motion.div
            key={k.id}
            initial={{ x: k.startX, y: k.startY, opacity: 0, scale: 0.4, rotate: 0 }}
            animate={{
              x: [k.startX, k.midX, k.endX],
              y: [k.startY, k.startY - 220, k.endY],
              opacity: [0, 1, 1, 0],
              scale: [0.4, k.scale, 0.6],
              rotate: [0, k.rotate, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-2xl sm:text-3xl select-none"
            style={{ left: 0, top: 0 }}
          >
            💋
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
