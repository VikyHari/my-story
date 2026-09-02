import React from "react";
import { Music, Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useMusic } from "@/state/MusicContext";

export function MusicPlayer({ compact = false }: { compact?: boolean }) {
  const { tracks, currentTrack, playing, volume, toggle, next, prev, setVolume } = useMusic();

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

  return (
    <div className={compact ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      <div className="flex items-center justify-between gap-2 text-sm text-cream/90">
        <span className="flex items-center gap-2 truncate">
          <Music className="w-4 h-4 shrink-0" />
          <span className="truncate max-w-[110px]">{playing ? "Music: ON" : "Music: OFF"}</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tracks.length > 1 && (
          <button onClick={prev} aria-label="Previous track" className="p-1 text-midnight-300 hover:text-cream">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
          className="p-1.5 rounded-full bg-rose/20 hover:bg-rose/30 text-rose-light"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
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
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="w-16 accent-rose ml-1"
        />
      </div>
      {currentTrack?.title && (
        <p className="text-[11px] text-midnight-400 truncate max-w-[160px]">
          {currentTrack.title}
          {currentTrack.artist ? ` — ${currentTrack.artist}` : ""}
        </p>
      )}
    </div>
  );
}
