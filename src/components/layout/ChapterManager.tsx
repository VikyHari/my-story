import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@/state/ProgressContext";
import { useSettings } from "@/state/SettingsContext";
import { CHAPTER_ORDER, ChapterId } from "@/state/chapters";
import { Background } from "@/components/layout/Background";

import { IntroScene } from "@/components/chapters/IntroScene";
import { DoYouRememberGame } from "@/components/chapters/DoYouRememberGame";
import { PlayfulQuestions } from "@/components/chapters/PlayfulQuestions";
import { LoveMeter } from "@/components/chapters/LoveMeter";
import { MemoryTimeline } from "@/components/chapters/MemoryTimeline";
import { PhotoGallery } from "@/components/chapters/PhotoGallery";
import { LoveConstellation } from "@/components/chapters/LoveConstellation";
import { ApologySection } from "@/components/chapters/ApologySection";
import { LoveLetter } from "@/components/chapters/LoveLetter";
import { KissMachine } from "@/components/chapters/KissMachine";
import { VirtualHug } from "@/components/chapters/VirtualHug";
import { RandomLoveMessage } from "@/components/chapters/RandomLoveMessage";
import { FutureRoadmap } from "@/components/chapters/FutureRoadmap";
import { BucketList } from "@/components/chapters/BucketList";
import { IfWeWereGame } from "@/components/chapters/IfWeWereGame";
import { MiniGameCatchHearts } from "@/components/chapters/MiniGameCatchHearts";
import { ProposalScene } from "@/components/chapters/ProposalScene";
import { Celebration } from "@/components/chapters/Celebration";
import { FinalMemoryWall } from "@/components/chapters/FinalMemoryWall";
import { FinalSurprise } from "@/components/chapters/FinalSurprise";

const CHAPTER_COMPONENTS: Record<ChapterId, React.ComponentType<{ onNext: () => void }>> = {
  intro: IntroScene,
  remember: DoYouRememberGame,
  playful: PlayfulQuestions,
  loveMeter: LoveMeter,
  memories: MemoryTimeline,
  gallery: PhotoGallery,
  constellation: LoveConstellation,
  apology: ApologySection,
  letter: LoveLetter,
  kissMachine: KissMachine,
  virtualHug: VirtualHug,
  randomLove: RandomLoveMessage,
  future: FutureRoadmap,
  bucketList: BucketList,
  ifWeWere: IfWeWereGame,
  miniGame: MiniGameCatchHearts,
  proposal: ProposalScene,
  celebration: Celebration,
  finalWall: FinalMemoryWall,
  finalSurprise: FinalSurprise,
};

export function ChapterManager() {
  const { currentChapter, goNext } = useProgress();
  const { reducedMotion } = useSettings();
  const [warp, setWarp] = useState(false);

  const meta = CHAPTER_ORDER.find((c) => c.id === currentChapter)!;
  const Component = CHAPTER_COMPONENTS[currentChapter];

  const handleNext =
    currentChapter === "intro"
      ? () => {
          setWarp(true);
          window.setTimeout(() => {
            goNext();
            window.setTimeout(() => setWarp(false), 200);
          }, reducedMotion ? 150 : 1300);
        }
      : goNext;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <Background environment={meta.environment} warp={warp} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: "blur(10px)" }}
          transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Component onNext={handleNext} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
