import React, { useEffect, useRef } from "react";
import { useSettings } from "@/state/SettingsContext";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  opacity: number;
  hue: number;
}

/**
 * Ambient floating heart particles rendered on a full-screen canvas.
 * Intentionally sparse — this is atmosphere, not a heart blizzard.
 */
export function HeartParticles({
  count = 18,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reducedMotion, lowPerf } = useSettings();
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    const scale = devicePixelRatio;

    const total = lowPerf ? Math.round(count * 0.5) : count;
    const particles: Particle[] = Array.from({ length: total }, () => spawn());

    function spawn(): Particle {
      return {
        x: Math.random() * width,
        y: height + Math.random() * height * 0.5,
        size: (Math.random() * 10 + 8) * scale,
        speed: (Math.random() * 0.35 + 0.15) * scale,
        drift: (Math.random() - 0.5) * 0.4 * scale,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.35 + 0.15,
        hue: Math.random() > 0.5 ? 340 : 350,
      };
    }

    function drawHeart(p: Particle) {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(Math.sin(p.angle) * 0.25);
      ctx.scale(p.size / 20, p.size / 20);
      ctx.beginPath();
      ctx.moveTo(0, 4);
      ctx.bezierCurveTo(-10, -6, -20, 4, 0, 18);
      ctx.bezierCurveTo(20, 4, 10, -6, 0, 4);
      ctx.closePath();
      ctx.fillStyle = `hsla(${p.hue}, 70%, 72%, ${p.opacity})`;
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift + (mouse.current.active ? (mouse.current.x - p.x) * 0.0004 : 0);
        p.angle += 0.01;
        if (p.y < -40) Object.assign(p, spawn(), { y: height + 20 });
        drawHeart(p);
      }
      raf = requestAnimationFrame(tick);
    }

    function handleResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function handlePointer(e: PointerEvent) {
      mouse.current = { x: e.clientX * scale, y: e.clientY * scale, active: true };
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointer, { passive: true });

    if (!reducedMotion) {
      raf = requestAnimationFrame(tick);
    } else {
      // static single frame for reduced-motion users
      for (const p of particles) drawHeart(p);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, [count, reducedMotion, lowPerf]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
