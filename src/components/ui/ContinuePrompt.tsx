import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContinuePrompt({
  hint,
  label = "Continue",
  onClick,
  visible = true,
}: {
  hint?: string;
  label?: string;
  onClick: () => void;
  visible?: boolean;
}) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-10 sm:mt-14 flex flex-col items-center gap-3 pb-8"
    >
      {hint && <p className="text-midnight-300 text-sm italic font-body text-center max-w-xs">{hint}</p>}
      <Button variant="ghost" onClick={onClick} className="group">
        <span className="flex items-center gap-2">
          {label}
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </span>
      </Button>
    </motion.div>
  );
}
