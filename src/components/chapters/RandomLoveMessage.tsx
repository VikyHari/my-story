import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { Button } from "@/components/ui/Button";
import { sound } from "@/lib/sound";

export function RandomLoveMessage({ onNext }: { onNext: () => void }) {
  const messages = loveStory.loveMessages;
  const [message, setMessage] = useState<string | null>(null);
  const [taps, setTaps] = useState(0);
  const [lastIndex, setLastIndex] = useState(-1);

  function tap() {
    sound.pop();
    let idx = Math.floor(Math.random() * messages.length);
    if (messages.length > 1 && idx === lastIndex) idx = (idx + 1) % messages.length;
    setLastIndex(idx);
    setMessage(messages[idx]);
    setTaps((t) => t + 1);
  }

  return (
    <ChapterScroll>
      <ChapterHeading eyebrow="Chapter Eleven" title="Whenever You Need A Reminder" subtitle="Tap it whenever. I mean it." />

      <div className="min-h-[6rem] flex items-center justify-center max-w-md mb-8 px-4">
        <AnimatePresence mode="wait">
          {message && (
            <motion.p
              key={message}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-display text-2xl sm:text-3xl text-cream text-center text-balance"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <Button onClick={tap} size="lg">
        <span className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Tap for a reminder
        </span>
      </Button>

      <ContinuePrompt visible={taps >= 3} hint="Let's talk about what's next." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
