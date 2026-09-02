type KissListener = (origin: { x: number; y: number }) => void;

const listeners = new Set<KissListener>();

export function fireKiss(origin?: { x: number; y: number }) {
  const point = origin ?? { x: window.innerWidth / 2, y: window.innerHeight - 80 };
  listeners.forEach((fn) => fn(point));
}

export function onKiss(fn: KissListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
