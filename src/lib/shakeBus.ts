type ShakeListener = (intensity: number) => void;

const listeners = new Set<ShakeListener>();

export function fireShake(intensity = 1) {
  listeners.forEach((fn) => fn(intensity));
}

export function onShake(fn: ShakeListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
