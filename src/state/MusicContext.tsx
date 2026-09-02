import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { loveStory } from "@/config/loveStory";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MusicTrack } from "@/types";

interface MusicState {
  trackIndex: number;
  playing: boolean;
  volume: number;
}

const DEFAULT_STATE: MusicState = { trackIndex: 0, playing: true, volume: 0.5 };

interface MusicContextValue {
  tracks: MusicTrack[];
  currentTrack: MusicTrack | null;
  playing: boolean;
  volume: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

/**
 * Owns the single persistent <audio> element for the whole session, mounted
 * once at the app root — it survives chapter changes and settings-panel
 * open/close, so background music keeps playing continuously from the moment
 * the page loads until the very last chapter, looping (or cycling through
 * the playlist) for as long as the visit lasts.
 *
 * Browsers never allow audible autoplay before any interaction, on any
 * site — there's no way around that. The closest real equivalent: the track
 * starts playing muted the instant it can (right at load, no click needed),
 * then unmutes itself on the very first tap/click/keypress anywhere on the
 * page — so by the time she can hear anything, the music is already
 * mid-playback rather than starting fresh.
 */
export function MusicProvider({ children }: { children: React.ReactNode }) {
  const tracks = loveStory.musicTracks;
  const [state, setState] = useLocalStorage<MusicState>("olu-music", DEFAULT_STATE);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || tracks.length === 0) return;
    if (state.playing) {
      el.muted = muted;
      el.play().catch(() => {
        if (!el.muted) {
          // an unmuted attempt got blocked (e.g. fresh reload, no gesture
          // yet this load) — fall back to silent autoplay and wait for the
          // next interaction to unmute, same as on first load.
          el.muted = true;
          setMuted(true);
          el.play().catch(() => setState((p) => ({ ...p, playing: false })));
        } else {
          setState((p) => ({ ...p, playing: false }));
        }
      });
    } else {
      el.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.playing, state.trackIndex, tracks.length, muted]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume;
  }, [state.volume]);

  // The very first tap/click/keypress anywhere unmutes — it doesn't need to
  // land on any particular button, just the first interaction with the page.
  useEffect(() => {
    if (tracks.length === 0) return;
    function unmuteOnFirstGesture() {
      setMuted(false);
    }
    window.addEventListener("pointerdown", unmuteOnFirstGesture, { once: true, capture: true });
    window.addEventListener("keydown", unmuteOnFirstGesture, { once: true, capture: true });
    return () => {
      window.removeEventListener("pointerdown", unmuteOnFirstGesture, true);
      window.removeEventListener("keydown", unmuteOnFirstGesture, true);
    };
  }, [tracks.length]);

  const track = tracks[state.trackIndex] ?? null;

  function play() {
    if (tracks.length === 0) return;
    setState((p) => ({ ...p, playing: true }));
  }
  function pause() {
    setState((p) => ({ ...p, playing: false }));
  }
  function toggle() {
    setState((p) => ({ ...p, playing: !p.playing }));
  }
  function next() {
    setState((p) => ({ ...p, trackIndex: (p.trackIndex + 1) % tracks.length, playing: true }));
  }
  function prev() {
    setState((p) => ({ ...p, trackIndex: (p.trackIndex - 1 + tracks.length) % tracks.length, playing: true }));
  }
  function setVolume(v: number) {
    setState((p) => ({ ...p, volume: v }));
  }

  const value = useMemo<MusicContextValue>(
    () => ({ tracks, currentTrack: track, playing: state.playing, volume: state.volume, play, pause, toggle, next, prev, setVolume }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tracks, track, state.playing, state.volume]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {track && (
        <audio
          ref={audioRef}
          src={track.src}
          loop={tracks.length === 1}
          muted
          onEnded={() => tracks.length > 1 && next()}
        />
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
