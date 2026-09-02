export interface ScreenBurstPayload {
  emoji: string;
  /** origin point in viewport pixels */
  x: number;
  y: number;
  /** radial wash color, e.g. "rgba(232,116,143,0.5)" */
  color?: string;
  /** how large the emoji grows relative to its start size */
  scale?: number;
  /** total lifetime in ms */
  duration?: number;
}

type BurstListener = (payload: ScreenBurstPayload) => void;

const listeners = new Set<BurstListener>();

export function fireScreenBurst(payload: ScreenBurstPayload) {
  listeners.forEach((fn) => fn(payload));
}

export function onScreenBurst(fn: BurstListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
