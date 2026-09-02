import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { ChapterHeading, ChapterScroll } from "@/components/ui/ChapterFrame";
import { ContinuePrompt } from "@/components/ui/ContinuePrompt";
import { PhotoItem } from "@/types";
import { sound } from "@/lib/sound";
import { useSecret } from "@/components/effects/SecretSurprise";

function Polaroid({ photo, onOpen }: { photo: PhotoItem; onOpen: () => void }) {
  const { reveal } = useSecret(`photo-triple-${photo.id}`);
  const clickCount = useRef(0);
  const clickTimer = useRef<number | null>(null);

  function handleClick() {
    onOpen();
    clickCount.current += 1;
    if (clickTimer.current) window.clearTimeout(clickTimer.current);
    if (clickCount.current >= 3) {
      reveal("You found this by clicking the same photo three times. I love how much you notice. 👀");
      clickCount.current = 0;
      return;
    }
    clickTimer.current = window.setTimeout(() => (clickCount.current = 0), 1500);
  }

  return (
    <motion.div
      drag
      dragElastic={0.6}
      dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
      whileDrag={{ scale: 1.05, zIndex: 20, cursor: "grabbing" }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      initial={{ rotate: photo.rotation ?? 0, opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotation ?? 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className="bg-cream rounded-sm p-3 pb-10 shadow-[0_18px_35px_-10px_rgba(0,0,0,0.6)] cursor-grab select-none w-40 sm:w-48"
      onClick={handleClick}
    >
      <div className="aspect-[4/5] w-full bg-gradient-to-br from-wine-700 via-rose to-gold/60 rounded-sm overflow-hidden flex items-center justify-center">
        {photo.src ? (
          <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <Heart className="w-8 h-8 text-cream/70" />
        )}
      </div>
      <p className="text-midnight-800 font-hand text-lg text-center mt-2 truncate">{photo.caption}</p>
    </motion.div>
  );
}

export function PhotoGallery({ onNext }: { onNext: () => void }) {
  const photos = loveStory.photos;
  const [openId, setOpenId] = useState<string | null>(null);
  const open = photos.find((p) => p.id === openId) ?? null;

  return (
    <ChapterScroll className="max-w-3xl mx-auto">
      <ChapterHeading eyebrow="Chapter Five" title="Photo Wall" subtitle="Drag them around. They don't mind." />

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 py-4">
        {photos.map((photo) => (
          <Polaroid
            key={photo.id}
            photo={photo}
            onOpen={() => {
              sound.pop();
              setOpenId(photo.id);
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-midnight-950/85 backdrop-blur-xl"
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-cream rounded-md p-4 pb-12 max-w-sm w-full relative"
            >
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-midnight-900 text-cream flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-wine-700 via-rose to-gold/60 rounded-sm overflow-hidden flex items-center justify-center">
                {open.src ? (
                  <img src={open.src} alt={open.caption} className="w-full h-full object-cover" />
                ) : (
                  <Heart className="w-12 h-12 text-cream/70" />
                )}
              </div>
              <p className="text-midnight-800 font-hand text-2xl text-center mt-3">{open.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContinuePrompt hint="There's a whole sky of reasons next." onClick={onNext} label="Next chapter" />
    </ChapterScroll>
  );
}
