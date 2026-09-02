import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CHAPTER_ORDER, ChapterId } from "@/state/chapters";

interface StoryData {
  kissCount: number;
  loveMeterValue: number;
  bucketChecked: string[];
  secretsFound: string[];
  hasEnteredUniverse: boolean;
}

const DEFAULT_DATA: StoryData = {
  kissCount: 0,
  loveMeterValue: 0,
  bucketChecked: [],
  secretsFound: [],
  hasEnteredUniverse: false,
};

interface ProgressState {
  chapterIndex: number;
  furthestIndex: number;
}

const DEFAULT_PROGRESS: ProgressState = { chapterIndex: 0, furthestIndex: 0 };

interface ProgressContextValue {
  currentChapter: ChapterId;
  chapterIndex: number;
  furthestIndex: number;
  goNext: () => void;
  goToChapter: (id: ChapterId) => void;
  goToIndex: (index: number) => void;
  data: StoryData;
  setData: (updater: (prev: StoryData) => StoryData) => void;
  resetJourney: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useLocalStorage<ProgressState>("olu-progress", DEFAULT_PROGRESS);
  const [data, setDataRaw] = useLocalStorage<StoryData>("olu-data", DEFAULT_DATA);

  // If a previous visit ran all the way to the very last chapter, a fresh
  // page load should replay the whole story from the beginning rather than
  // reopening on the final screen forever. Only checked once, right at
  // mount, so navigating to the last chapter during a normal visit is
  // unaffected — this only fires on an actual reload/reopen.
  useEffect(() => {
    if (progress.chapterIndex >= CHAPTER_ORDER.length - 1) {
      setProgress(DEFAULT_PROGRESS);
      setDataRaw(DEFAULT_DATA);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clampedIndex = Math.min(Math.max(progress.chapterIndex, 0), CHAPTER_ORDER.length - 1);
  const currentChapter = CHAPTER_ORDER[clampedIndex].id;

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), CHAPTER_ORDER.length - 1);
      setProgress((prev) => ({
        chapterIndex: clamped,
        furthestIndex: Math.max(prev.furthestIndex, clamped),
      }));
    },
    [setProgress]
  );

  const goNext = useCallback(() => {
    goToIndex(clampedIndex + 1);
  }, [clampedIndex, goToIndex]);

  const goToChapter = useCallback(
    (id: ChapterId) => {
      const index = CHAPTER_ORDER.findIndex((c) => c.id === id);
      if (index >= 0) goToIndex(index);
    },
    [goToIndex]
  );

  const setData = useCallback(
    (updater: (prev: StoryData) => StoryData) => setDataRaw(updater),
    [setDataRaw]
  );

  const resetJourney = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    setDataRaw(DEFAULT_DATA);
  }, [setProgress, setDataRaw]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      currentChapter,
      chapterIndex: clampedIndex,
      furthestIndex: progress.furthestIndex,
      goNext,
      goToChapter,
      goToIndex,
      data,
      setData,
      resetJourney,
    }),
    [currentChapter, clampedIndex, progress.furthestIndex, goNext, goToChapter, goToIndex, data, setData, resetJourney]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
