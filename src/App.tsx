import React from "react";
import { ProgressProvider } from "@/state/ProgressContext";
import { SettingsProvider } from "@/state/SettingsContext";
import { ChapterManager } from "@/components/layout/ChapterManager";
import { ProgressIndicator } from "@/components/layout/ProgressIndicator";
import { SettingsBar } from "@/components/layout/SettingsBar";
import { FlyingKissLayer } from "@/components/effects/FlyingKiss";
import { CursorEffects } from "@/components/effects/CursorEffects";
import { ScreenShake } from "@/components/effects/ScreenShake";
import { FullScreenBurstLayer } from "@/components/effects/FullScreenBurst";
import { SecretToastLayer, SecretHotspot, KeyboardSecret } from "@/components/effects/SecretSurprise";

export default function App() {
  return (
    <SettingsProvider>
      <ProgressProvider>
        <div className="relative w-full h-[100dvh] text-cream font-body overflow-hidden">
          <ScreenShake>
            <ChapterManager />
          </ScreenShake>
          <FullScreenBurstLayer />
          <SettingsBar />
          <ProgressIndicator />
          <FlyingKissLayer />
          <CursorEffects />
          <SecretToastLayer />

          <KeyboardSecret
            keyName="l"
            id="secret-key-l"
            message="You found the hidden 'L' key. L is for love, obviously. ❤️"
          />
          <div className="fixed bottom-3 left-3 z-40">
            <SecretHotspot
              id="corner-heart"
              message="A tiny hidden heart, just for you. There are more hiding around here."
            />
          </div>
        </div>
      </ProgressProvider>
    </SettingsProvider>
  );
}
