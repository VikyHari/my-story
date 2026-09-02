import React, { useMemo } from "react";

/** Pure-CSS starfield + drifting hearts, shown when WebGL is unavailable. */
export function FallbackBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    []
  );

  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: Math.random() * 6 + 8,
        size: Math.random() * 14 + 10,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-midnight-950 via-midnight-900 to-wine-950">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-cream animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-rose-light/40 animate-float-slow"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ❤
        </span>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(232,116,143,0.12),transparent_60%)]" />
    </div>
  );
}
