import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { BeatingHeart } from "@/components/three/BeatingHeart";
import { FloatingHearts } from "@/components/three/FloatingHearts";
import { HorizonPath } from "@/components/three/HorizonPath";
import { Environment } from "@/state/chapters";
import { useSettings } from "@/state/SettingsContext";

function CameraRig({ warp }: { warp: boolean }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector2(0, 0));
  const warpZ = useRef(6);

  React.useEffect(() => {
    function onMove(e: PointerEvent) {
      target.current.set((e.clientX / window.innerWidth - 0.5) * 2, -(e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.current.x * 0.5, delta * 1.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.current.y * 0.3, delta * 1.2);
    const targetZ = warp ? 2.2 : 6;
    warpZ.current = THREE.MathUtils.lerp(warpZ.current, targetZ, delta * (warp ? 1.4 : 0.8));
    camera.position.z = warpZ.current;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function RotatingStars({ speed = 1, count = 3200 }: { speed?: number; count?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.01 * speed;
  });
  return (
    <group ref={groupRef}>
      <Stars radius={80} depth={50} count={count} factor={3.2} saturation={0} fade speed={0.6 * speed} />
    </group>
  );
}

function SceneContents({ environment, warp, lowPerf }: { environment: Environment; warp: boolean; lowPerf: boolean }) {
  const starCount = lowPerf ? 1200 : 3200;
  const heartCount = lowPerf ? 10 : 22;

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 5]} intensity={1.1} color="#f6b8c6" />
      <pointLight position={[-5, -3, -4]} intensity={0.5} color="#5c0d24" />

      <CameraRig warp={warp} />
      <RotatingStars speed={warp ? 5 : 1} count={starCount} />

      {environment !== "quiet" && (
        <Sparkles count={lowPerf ? 30 : 70} scale={[10, 6, 10]} size={2.4} speed={0.3} color="#f6b8c6" opacity={0.5} />
      )}

      {(environment === "heartspace" || environment === "quiet") && (
        <BeatingHeart baseScale={environment === "heartspace" ? 0.85 : 0.55} intensity={environment === "heartspace" ? 1 : 0.6} />
      )}

      {(environment === "galaxy" || environment === "memoryverse" || environment === "starfall") && (
        <BeatingHeart baseScale={0.35} position={[0, 0, -1.5]} intensity={0.7} />
      )}

      {environment !== "horizon" && environment !== "quiet" && <FloatingHearts count={heartCount} />}

      {environment === "horizon" && <HorizonPath />}

      <fog attach="fog" args={["#0a0510", 6, environment === "horizon" ? 22 : 16]} />
    </>
  );
}

export function SceneBackground({ environment, warp = false }: { environment: Environment; warp?: boolean }) {
  const { lowPerf, webglSupported } = useSettings();

  if (webglSupported === false) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={lowPerf ? [1, 1.3] : [1, 2]}
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: !lowPerf, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
      >
        <color attach="background" args={["#0a0510"]} />
        <Suspense fallback={null}>
          <SceneContents environment={environment} warp={warp} lowPerf={lowPerf} />
        </Suspense>
      </Canvas>
    </div>
  );
}
