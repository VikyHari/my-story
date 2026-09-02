import React from "react";
import { motion } from "framer-motion";

export function ChapterHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-8 sm:mb-12 px-4">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-light/80 tracking-[0.3em] text-xs sm:text-sm uppercase font-body mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-3xl sm:text-5xl text-cream text-balance"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-midnight-200 mt-3 font-body text-sm sm:text-base max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

export function ChapterScroll({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative z-10 w-full h-full overflow-y-auto overscroll-contain px-4 sm:px-6 py-16 sm:py-20 flex flex-col items-center ${className}`}
    >
      {children}
    </div>
  );
}
