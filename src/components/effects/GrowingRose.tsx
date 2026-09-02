import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "@/state/SettingsContext";

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * A seed planted in soil grows roots, a stem, leaves, a bud, then blooms into
 * a rose — followed by a two-line dedication. Self-contained: runs its own
 * timeline and calls onComplete once the dedication has had time to be read.
 */
export function GrowingRose({
  dedicationTitle,
  dedicationMessage,
  onComplete,
}: {
  dedicationTitle: string;
  dedicationMessage: string;
  onComplete?: () => void;
}) {
  const { reducedMotion } = useSettings();
  // 0 seed, 1 roots, 2 stem+leaves, 3 bud, 4 bloom
  const [stage, setStage] = useState(0);
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    const timers: number[] = [];
    if (reducedMotion) {
      setStage(4);
      timers.push(window.setTimeout(() => setTextStage(1), 250));
      timers.push(window.setTimeout(() => setTextStage(2), 800));
      timers.push(window.setTimeout(() => onComplete?.(), 2200));
      return () => timers.forEach(clearTimeout);
    }
    const stepDurations = [700, 1200, 1500, 700, 1300];
    let elapsed = 0;
    for (let i = 1; i <= 4; i++) {
      elapsed += stepDurations[i - 1];
      timers.push(window.setTimeout(() => setStage(i), elapsed));
    }
    elapsed += stepDurations[4];
    timers.push(window.setTimeout(() => setTextStage(1), elapsed));
    elapsed += 900;
    timers.push(window.setTimeout(() => setTextStage(2), elapsed));
    elapsed += 2800;
    timers.push(window.setTimeout(() => onComplete?.(), elapsed));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  const rootsVisible = stage >= 1;
  const stemVisible = stage >= 2;
  const budVisible = stage >= 3;
  const bloomVisible = stage >= 4;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 240" className="w-44 sm:w-56 h-auto overflow-visible">
        <defs>
          <radialGradient id="rose-soil" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#3a2a1d" />
            <stop offset="100%" stopColor="#1c1209" />
          </radialGradient>
          <linearGradient id="rose-petal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f6b8c6" />
            <stop offset="100%" stopColor="#c93a5c" />
          </linearGradient>
        </defs>

        <ellipse cx="100" cy="206" rx="70" ry="14" fill="url(#rose-soil)" />

        {stage === 0 && (
          <motion.ellipse
            cx="100"
            cy="196"
            rx="5"
            ry="4"
            fill="#8a5a34"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {rootsVisible && (
          <g stroke="#5c3d24" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.85}>
            {["M100,198 Q82,210 68,224", "M100,198 Q100,214 100,227", "M100,198 Q118,210 132,224"].map(
              (d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
                />
              )
            )}
          </g>
        )}

        {stemVisible && (
          <motion.path
            d="M100,196 C97,160 103,115 100,76"
            stroke="#3f7d4a"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        )}

        {stemVisible && (
          <>
            <motion.path
              d="M99,155 C80,150 70,160 66,174 C86,176 98,168 99,155 Z"
              fill="#4a8f57"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5, ease: "backOut" }}
              style={{ transformOrigin: "99px 163px" }}
            />
            <motion.path
              d="M101,120 C120,114 132,122 137,136 C116,140 103,133 101,120 Z"
              fill="#3f7d4a"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.5, ease: "backOut" }}
              style={{ transformOrigin: "101px 128px" }}
            />
          </>
        )}

        {budVisible && !bloomVisible && (
          <motion.ellipse
            cx="100"
            cy="74"
            rx="8"
            ry="11"
            fill="#6a9d5f"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          />
        )}

        {bloomVisible && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ filter: "drop-shadow(0 0 14px rgba(232,116,143,0.65))" }}
          >
            {PETAL_ANGLES.map((deg, i) => (
              <motion.path
                key={deg}
                d="M100,74 C108,66 112,54 100,46 C88,54 92,66 100,74 Z"
                fill="url(#rose-petal)"
                initial={{ scale: 0, rotate: deg, opacity: 0 }}
                animate={{ scale: 1, rotate: deg, opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: "backOut" }}
                style={{ transformOrigin: "100px 74px" }}
              />
            ))}
            <motion.circle
              cx="100"
              cy="70"
              r="6"
              fill="#e8748f"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            />
          </motion.g>
        )}
      </svg>

      <div className="min-h-[5.5rem] text-center px-6 mt-1">
        {textStage >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-2xl sm:text-3xl text-cream"
          >
            {dedicationTitle}
          </motion.p>
        )}
        {textStage >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-body text-rose-light text-base sm:text-lg mt-3 max-w-xs sm:max-w-sm mx-auto text-balance"
          >
            {dedicationMessage}
          </motion.p>
        )}
      </div>
    </div>
  );
}
