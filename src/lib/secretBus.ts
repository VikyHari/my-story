type SecretListener = (message: string) => void;

const listeners = new Set<SecretListener>();

export function announceSecret(message: string) {
  listeners.forEach((fn) => fn(message));
}

export function onSecret(fn: SecretListener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
