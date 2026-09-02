import React, { useRef } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { useSettings } from "@/state/SettingsContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  playSound?: boolean;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-rose to-wine-700 text-cream shadow-[0_8px_30px_-8px_rgba(232,116,143,0.6)] hover:shadow-[0_10px_40px_-6px_rgba(232,116,143,0.8)]",
  ghost: "bg-white/5 text-cream border border-white/15 hover:bg-white/10 backdrop-blur-sm",
  outline: "bg-transparent text-rose-light border border-rose/50 hover:bg-rose/10",
};

const sizeClasses: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  magnetic = true,
  playSound = true,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { isMobile } = useSettings();

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (!magnetic || isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (playSound) sound.click();
    onClick?.(e);
  }

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`rounded-full font-body font-medium tracking-wide transition-shadow duration-300 ease-out select-none touch-manipulation ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
