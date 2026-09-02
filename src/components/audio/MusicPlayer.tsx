import React, { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { loveStory } from "@/config/loveStory";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface MusicState {
  trackIndex: number;
  playing: boolean;
  volume: number;
}

const DEFAULT_STATE: MusicState = { trackIndex: 0, playing: false, volume: 0.5 };

export function MusicPlayer({ compact = false }: { compact?: boolean }) {
  const tracks = loveStory.musicTracks;
  const [state, setState] = useLocalStorage<MusicState>("olu-music", DEFAULT_STATE);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current || tracks.length === 0) return;
    if (state.playing) {
      audioRef.current.play().catch(() => setState((p) => ({ ...p, playing: false })));
    } else {
      audioRef.current.pause();
    }
  }, [state.playing, state.trackIndex, tracks.length]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = state.volume;
  }, [state.volume]);

  // Gracefully disable the entire feature when no tracks are configured.
  if (tracks.length === 0) {
    if (!compact) return null;
    return (
      <div className="flex items-center gap-2 text-xs text-midnight-400 font-body">
        <Music className="w-4 h-4" />
        <span>Music: no tracks added yet</span>
      </div>
    );
  }

  const track = tracks[state.trackIndex];

  function togglePlay() {
    setState((p) => ({ ...p, playing: !p.playing }));
  }

  function next() {
    setState((p) => ({ ...p, trackIndex: (p.trackIndex + 1) % tracks.length, playing: true }));
  }

  function prev() {
    setState((p) => ({ ...p, trackIndex: (p.trackIndex - 1 + tracks.length) % tracks.length, playing: true }));
  }

  return (
    <div className={compact ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      <audio
        ref={audioRef}
        src={track.src}
        loop={tracks.length === 1}
        onEnded={() => tracks.length > 1 && next()}
      />
      <div className="flex items-center justify-between gap-2 text-sm text-cream/90">
        <span className="flex items-center gap-2 truncate">
          <Music className="w-4 h-4 shrink-0" />
          <span className="truncate max-w-[110px]">
            {state.playing ? "Music: ON" : "Music: OFF"}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tracks.length > 1 && (
          <button onClick={prev} aria-label="Previous track" className="p-1 text-midnight-300 hover:text-cream">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={togglePlay}
          aria-label={state.playing ? "Pause music" : "Play music"}
          className="p-1.5 rounded-full bg-rose/20 hover:bg-rose/30 text-rose-light"
        >
          {state.playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        {tracks.length > 1 && (
          <button onClick={next} aria-label="Next track" className="p-1 text-midnight-300 hover:text-cream">
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={state.volume}
          onChange={(e) => setState((p) => ({ ...p, volume: Number(e.target.value) }))}
          aria-label="Volume"
          className="w-16 accent-rose ml-1"
        />
      </div>
      {track.title && <p className="text-[11px] text-midnight-400 truncate max-w-[160px]">{track.title}{track.artist ? ` — ${track.artist}` : ""}</p>}
    </div>
  );
}
