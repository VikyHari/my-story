import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  glow?: boolean;
}

export function GlassCard({ children, className = "", glow = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] ${
        glow ? "shadow-[0_0_60px_-10px_rgba(232,116,143,0.35)]" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
