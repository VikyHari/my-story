import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { onShake } from "@/lib/shakeBus";
import { useSettings } from "@/state/SettingsContext";

/**
 * Wraps its children in a layer that punches/shakes on demand via fireShake().
 * Because the shake is applied as a transform on this wrapper, it establishes a
 * containing block for `position: fixed` descendants — so the 3D background
 * shakes together with the foreground content for a unified full-screen hit.
 */
export function ScreenShake({ children }: { children: React.ReactNode }) {
  const controls = useAnimationControls();
  const { reducedMotion } = useSettings();

  useEffect(() => {
    return onShake((intensity) => {
      if (reducedMotion) return;
      const d = 7 * Math.min(intensity, 2.5);
      controls.start({
        x: [0, -d, d * 0.8, -d * 0.5, d * 0.3, 0],
        y: [0, d * 0.5, -d * 0.4, d * 0.3, -d * 0.2, 0],
        rotate: [0, -d * 0.06, d * 0.06, -d * 0.03, 0, 0],
        transition: { duration: 0.5, ease: "easeOut" },
      });
    });
  }, [controls, reducedMotion]);

  return (
    <motion.div animate={controls} className="w-full h-full">
      {children}
    </motion.div>
  );
}
