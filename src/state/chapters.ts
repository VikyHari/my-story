export type ChapterId =
  | "intro"
  | "remember"
  | "playful"
  | "loveMeter"
  | "memories"
  | "gallery"
  | "constellation"
  | "apology"
  | "letter"
  | "kissMachine"
  | "virtualHug"
  | "randomLove"
  | "future"
  | "bucketList"
  | "ifWeWere"
  | "miniGame"
  | "proposal"
  | "celebration"
  | "finalWall"
  | "finalSurprise";

export type Environment = "galaxy" | "heartspace" | "memoryverse" | "horizon" | "starfall" | "quiet";

export interface ChapterMeta {
  id: ChapterId;
  environment: Environment;
  /** whether this chapter counts toward the visible progress indicator */
  countsInProgress: boolean;
}

export const CHAPTER_ORDER: ChapterMeta[] = [
  { id: "intro", environment: "galaxy", countsInProgress: false },
  { id: "remember", environment: "galaxy", countsInProgress: true },
  { id: "playful", environment: "galaxy", countsInProgress: true },
  { id: "loveMeter", environment: "heartspace", countsInProgress: true },
  { id: "memories", environment: "memoryverse", countsInProgress: true },
  { id: "gallery", environment: "memoryverse", countsInProgress: true },
  { id: "constellation", environment: "starfall", countsInProgress: true },
  { id: "apology", environment: "quiet", countsInProgress: true },
  { id: "letter", environment: "quiet", countsInProgress: true },
  { id: "kissMachine", environment: "heartspace", countsInProgress: true },
  { id: "virtualHug", environment: "heartspace", countsInProgress: true },
  { id: "randomLove", environment: "heartspace", countsInProgress: true },
  { id: "future", environment: "horizon", countsInProgress: true },
  { id: "bucketList", environment: "horizon", countsInProgress: true },
  { id: "ifWeWere", environment: "starfall", countsInProgress: true },
  { id: "miniGame", environment: "heartspace", countsInProgress: true },
  { id: "proposal", environment: "quiet", countsInProgress: false },
  { id: "celebration", environment: "starfall", countsInProgress: false },
  { id: "finalWall", environment: "starfall", countsInProgress: false },
  { id: "finalSurprise", environment: "quiet", countsInProgress: false },
];

export const TOTAL_PROGRESS_STEPS = CHAPTER_ORDER.filter((c) => c.countsInProgress).length;

export function progressIndexFor(id: ChapterId): number {
  let count = 0;
  for (const c of CHAPTER_ORDER) {
    if (c.id === id) return c.countsInProgress ? count + 1 : count;
    if (c.countsInProgress) count++;
  }
  return count;
}
