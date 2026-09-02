import React, { createContext, useContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import { setSoundEnabled } from "@/lib/sound";

interface SettingsState {
  soundOn: boolean;
  reducedMotionOverride: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  soundOn: false,
  reducedMotionOverride: false,
};

interface SettingsContextValue {
  soundOn: boolean;
  toggleSound: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  isMobile: boolean;
  webglSupported: boolean | null;
  lowPerf: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useLocalStorage<SettingsState>("olu-settings", DEFAULT_SETTINGS);
  const systemReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const webglSupported = useWebGLSupport();

  const reducedMotion = systemReducedMotion || settings.reducedMotionOverride;

  useEffect(() => {
    setSoundEnabled(settings.soundOn);
  }, [settings.soundOn]);

  const value = useMemo<SettingsContextValue>(
    () => ({
      soundOn: settings.soundOn,
      toggleSound: () => setSettings((p) => ({ ...p, soundOn: !p.soundOn })),
      reducedMotion,
      toggleReducedMotion: () => setSettings((p) => ({ ...p, reducedMotionOverride: !p.reducedMotionOverride })),
      isMobile,
      webglSupported,
      lowPerf: isMobile || reducedMotion,
    }),
    [settings, reducedMotion, isMobile, webglSupported, setSettings]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
