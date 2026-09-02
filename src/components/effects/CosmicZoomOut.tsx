import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSettings } from "@/state/SettingsContext";
import { RealMap } from "@/components/effects/RealMap";
import { loveStory } from "@/config/loveStory";

interface Stage {
  label: string;
  sub?: string;
  render: () => React.ReactNode;
}

function Dot({ size = 10, glow = 20, pulse = false }: { size?: number; glow?: number; pulse?: boolean }) {
  return (
    <div className="absolute left-1/2 top-1/2" style={{ transform: "translate(-50%,-50%)" }}>
      {pulse && (
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border-2 border-rose"
          style={{ width: size, height: size, transform: "translate(-50%,-50%)" }}
          animate={{ scale: [1, 3.2], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div
        className="relative rounded-full bg-rose"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${glow}px ${glow / 2.5}px rgba(232,116,143,0.85)`,
        }}
      />
    </div>
  );
}

function Stars({ count, seedOffset = 0 }: { count: number; seedOffset?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = i + seedOffset;
        return {
          left: (s * 37) % 100,
          top: (s * 53) % 100,
          size: (s % 3) + 1,
          delay: (s % 10) * 0.2,
        };
      }),
    [count, seedOffset]
  );
  return (
    <>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        />
      ))}
    </>
  );
}

function EarthGlobe() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="rounded-full"
        style={{
          width: "42vmin",
          height: "42vmin",
          background:
            "radial-gradient(circle at 35% 30%, #6fc7d8 0%, #2f7f9e 35%, #14324a 70%, #0a1a28 100%)",
          boxShadow: "0 0 120px 20px rgba(80,180,210,0.35)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(circle at 60% 65%, rgba(140,200,120,0.5), transparent 30%), radial-gradient(circle at 30% 70%, rgba(140,200,120,0.4), transparent 25%)",
          }}
        />
      </div>
    </div>
  );
}

function SolarSystem() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ width: "1px", height: "1px" }}>
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "7vmin",
            height: "7vmin",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, #ffe9b0, #e8a857)",
            boxShadow: "0 0 80px 20px rgba(232,168,87,0.55)",
          }}
        />
        {[22, 34, 46].map((r) => (
          <div
            key={r}
            className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
            style={{ width: `${r}vmin`, height: `${r}vmin`, transform: "translate(-50%,-50%)" }}
          />
        ))}
        <div
          className="absolute rounded-full bg-sky-300"
          style={{
            width: 10,
            height: 10,
            left: "calc(50% + 23vmin)",
            top: "50%",
            transform: "translate(-50%,-50%)",
            boxShadow: "0 0 14px 4px rgba(120,180,255,0.7)",
          }}
        />
      </div>
    </div>
  );
}

function Galaxy() {
  const arms = [0, 60, 120, 180, 240, 300];
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ width: "1px", height: "1px" }}>
        <div
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: "5vmin",
            height: "5vmin",
            transform: "translate(-50%,-50%)",
            background: "radial-gradient(circle, #fff, #f6b8c6)",
            boxShadow: "0 0 100px 30px rgba(246,184,198,0.55)",
          }}
        />
        {arms.map((deg) => (
          <div
            key={deg}
            className="absolute left-1/2 top-1/2 rounded-full opacity-60"
            style={{
              width: "68vmin",
              height: "10vmin",
              transform: `translate(-50%,-50%) rotate(${deg}deg)`,
              background: "linear-gradient(90deg, transparent, rgba(232,116,143,0.35), transparent)",
              filter: "blur(10px)",
            }}
          />
        ))}
        <Dot size={4} glow={8} />
      </div>
    </div>
  );
}

function InfinitySymbol() {
  return (
    <svg viewBox="0 0 200 100" className="w-56 sm:w-72" style={{ filter: "drop-shadow(0 0 24px rgba(232,116,143,0.7))" }}>
      <path
        d="M50,50 C50,25 75,25 100,50 C125,75 150,75 150,50 C150,25 125,25 100,50 C75,75 50,75 50,50 Z"
        fill="none"
        stroke="url(#infGrad)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e8748f" />
          <stop offset="50%" stopColor="#f6b8c6" />
          <stop offset="100%" stopColor="#d8a857" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const { lat, lng, label: mapLabel } = loveStory.mapLocation;

const STAGES: Stage[] = [
  { label: "Right here.", sub: mapLabel, render: () => <RealMap lat={lat} lng={lng} zoom={16} markerLabel={mapLabel} /> },
  { label: "This street. This city.", render: () => <RealMap lat={lat} lng={lng} zoom={11} /> },
  { label: "This state. This country.", render: () => <RealMap lat={lat} lng={lng} zoom={5} /> },
  { label: "This planet.", render: () => <EarthGlobe /> },
  { label: "This solar system.", render: () => <SolarSystem /> },
  { label: "This galaxy. One of billions.", render: () => <Galaxy /> },
];

/**
 * A full-screen cinematic "camera pull-back" — zooms out from a local grid,
 * through country, planet, solar system and galaxy, out into the dark void
 * where only an infinity symbol remains. Used for the Love Meter's ∞ moment.
 */
export function CosmicZoomOut({
  onReachInfinity,
  onComplete,
}: {
  onReachInfinity?: () => void;
  onComplete: () => void;
}) {
  const { reducedMotion } = useSettings();
  const [stage, setStage] = useState(0);
  const finalStage = STAGES.length;
  const stageDuration = reducedMotion ? 1 : 1150;

  useEffect(() => {
    if (reducedMotion) {
      onReachInfinity?.();
      const t = setTimeout(onComplete, 1400);
      return () => clearTimeout(t);
    }
    if (stage >= finalStage) {
      onReachInfinity?.();
      return;
    }
    const t = setTimeout(() => setStage((s) => s + 1), stageDuration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, reducedMotion]);

  function skip() {
    if (stage >= finalStage) {
      onComplete();
    } else {
      setStage(finalStage);
    }
  }

  const atVoid = stage >= finalStage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={skip}
      className="fixed inset-0 z-[96] bg-black overflow-hidden cursor-pointer select-none"
    >
      <Stars count={reducedMotion ? 20 : 60} seedOffset={stage * 7} />

      {/* no mode="wait" here on purpose — the outgoing and incoming stage
          animate in parallel so one dissolves into the next with no black
          gap between them, reading as one continuous pull-back. */}
      <AnimatePresence>
        {!atVoid ? (
          <motion.div
            key={stage}
            initial={{ opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.8 }}
            transition={{ duration: reducedMotion ? 0.2 : 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {STAGES[stage].render()}
          </motion.div>
        ) : (
          <motion.div
            key="void"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <InfinitySymbol />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

      <motion.p
        key={atVoid ? "void-label" : stage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ translateX: "-50%" }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 text-center px-6 w-full"
      >
        <span className="font-display text-xl sm:text-2xl text-cream text-balance">
          {atVoid ? "Yeah. This meter was never designed for us." : STAGES[stage].label}
        </span>
        {!atVoid && STAGES[stage].sub && (
          <span className="block text-sm text-midnight-300 mt-1">{STAGES[stage].sub}</span>
        )}
      </motion.p>

      {atVoid && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-midnight-400"
        >
          tap anywhere to continue
        </motion.p>
      )}
    </motion.div>
  );
}
