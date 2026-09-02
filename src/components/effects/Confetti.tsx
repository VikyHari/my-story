import React, { useEffect, useImperativeHandle, useRef, forwardRef } from "react";

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: "rect" | "heart" | "petal";
  life: number;
}

export interface ConfettiHandle {
  burst: (opts?: { count?: number }) => void;
}

const COLORS = ["#e8748f", "#f6b8c6", "#d8a857", "#faf3ea", "#c93a5c", "#f9e4e8"];

export const Confetti = forwardRef<ConfettiHandle, { className?: string }>(function Confetti(
  { className = "" },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const rafRef = useRef(0);

  useImperativeHandle(ref, () => ({
    burst: ({ count = 140 } = {}) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < count; i++) {
        piecesRef.current.push({
          x: w / 2 + (Math.random() - 0.5) * 120,
          y: h * 0.35,
          vx: (Math.random() - 0.5) * 9,
          vy: Math.random() * -9 - 3,
          size: Math.random() * 8 + 5,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: (["rect", "heart", "petal"] as const)[Math.floor(Math.random() * 3)],
          life: 1,
        });
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    resize();
    window.addEventListener("resize", resize);

    function drawPiece(p: ConfettiPiece) {
      if (!ctx) return;
      const scale = devicePixelRatio;
      ctx.save();
      ctx.translate(p.x * scale, p.y * scale);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      const s = p.size * scale;
      if (p.shape === "rect") {
        ctx.fillRect(-s / 2, -s / 4, s, s / 2);
      } else if (p.shape === "heart") {
        ctx.beginPath();
        ctx.moveTo(0, s * 0.2);
        ctx.bezierCurveTo(-s / 2, -s / 3, -s, s * 0.2, 0, s);
        ctx.bezierCurveTo(s, s * 0.2, s / 2, -s / 3, 0, s * 0.2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, s / 2, s / 3.2, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function tick() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      piecesRef.current = piecesRef.current.filter((p) => p.life > 0);
      for (const p of piecesRef.current) {
        p.vy += 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 0.006;
        drawPiece(p);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full z-[80] ${className}`}
      aria-hidden="true"
    />
  );
});
