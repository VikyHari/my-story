import React, { useEffect, useRef } from "react";
import { useSettings } from "@/state/SettingsContext";

interface TrailDot {
  x: number;
  y: number;
  life: number;
}

/**
 * Subtle glowing cursor + short trail. Desktop only — on touch devices this
 * component renders nothing, since a synthetic cursor there just gets in the way.
 */
export function CursorEffects() {
  const { isMobile, reducedMotion } = useSettings();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trail = useRef<TrailDot[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMove(e: PointerEvent) {
      if (!glow) return;
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.current.length > 14) trail.current.shift();
    }
    window.addEventListener("pointermove", handleMove);

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scale = devicePixelRatio;
      trail.current.forEach((dot, i) => {
        dot.life -= 0.07;
        ctx.beginPath();
        ctx.arc(dot.x * scale, dot.y * scale, (i / trail.current.length) * 4 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 116, 143, ${Math.max(dot.life, 0) * 0.35})`;
        ctx.fill();
      });
      trail.current = trail.current.filter((d) => d.life > 0);
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [isMobile, reducedMotion]);

  if (isMobile || reducedMotion) return null;

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[90]" aria-hidden="true" />
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 z-[91] w-6 h-6 -ml-3 -mt-3 rounded-full mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(232,116,143,0.9) 0%, rgba(232,116,143,0) 70%)",
          transition: "transform 0.05s linear",
        }}
        aria-hidden="true"
      />
    </>
  );
}
