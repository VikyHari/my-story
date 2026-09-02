/**
 * Tiny synthesized sound-effect engine.
 * No audio files required — every effect is generated on the fly
 * with the Web Audio API, so sound effects never depend on assets
 * being present. Background music (optional) is handled separately
 * by <MusicPlayer />.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctx) ctx = new AudioCtx();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface Tone {
  freq: number;
  duration: number;
  type?: OscillatorType;
  delay?: number;
  gain?: number;
}

function playTone({ freq, duration, type = "sine", delay = 0, gain = 0.08 }: Tone) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const start = audio.currentTime + delay;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

let enabled = true;
export function setSoundEnabled(value: boolean) {
  enabled = value;
}

function guarded(fn: () => void) {
  if (!enabled) return;
  try {
    fn();
  } catch {
    // audio can fail silently (autoplay policy, no context) — never block the UI
  }
}

export const sound = {
  click: () => guarded(() => playTone({ freq: 620, duration: 0.09, type: "sine", gain: 0.06 })),
  pop: () =>
    guarded(() => {
      playTone({ freq: 500, duration: 0.12, type: "triangle", gain: 0.07 });
      playTone({ freq: 760, duration: 0.1, delay: 0.04, type: "triangle", gain: 0.05 });
    }),
  heart: () =>
    guarded(() => {
      playTone({ freq: 440, duration: 0.18, type: "sine", gain: 0.06 });
      playTone({ freq: 660, duration: 0.22, delay: 0.06, type: "sine", gain: 0.05 });
    }),
  kiss: () =>
    guarded(() => {
      playTone({ freq: 900, duration: 0.08, type: "sine", gain: 0.05 });
      playTone({ freq: 1200, duration: 0.1, delay: 0.05, type: "sine", gain: 0.04 });
    }),
  chime: () =>
    guarded(() => {
      [523.25, 659.25, 783.99].forEach((freq, i) =>
        playTone({ freq, duration: 0.5, delay: i * 0.09, type: "sine", gain: 0.05 })
      );
    }),
  whoosh: () => guarded(() => playTone({ freq: 220, duration: 0.3, type: "sawtooth", gain: 0.03 })),
  success: () =>
    guarded(() => {
      [392, 523.25, 659.25, 783.99].forEach((freq, i) =>
        playTone({ freq, duration: 0.35, delay: i * 0.08, type: "sine", gain: 0.06 })
      );
    }),
  celebration: () =>
    guarded(() => {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) =>
        playTone({ freq, duration: 0.6, delay: i * 0.1, type: "sine", gain: 0.06 })
      );
    }),
};
