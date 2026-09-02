import React, { Suspense, lazy } from "react";
import { FallbackBackground } from "@/components/three/FallbackBackground";
import { Environment } from "@/state/chapters";
import { useSettings } from "@/state/SettingsContext";

const SceneBackground = lazy(() =>
  import("@/components/three/SceneBackground").then((m) => ({ default: m.SceneBackground }))
);

export function Background({ environment, warp = false }: { environment: Environment; warp?: boolean }) {
  const { webglSupported } = useSettings();

  if (webglSupported === false) return <FallbackBackground />;
  if (webglSupported === null) return <div className="fixed inset-0 -z-10 bg-midnight-950" />;

  return (
    <Suspense fallback={<FallbackBackground />}>
      <SceneBackground environment={environment} warp={warp} />
    </Suspense>
  );
}
