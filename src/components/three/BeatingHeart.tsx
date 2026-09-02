import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createHeartGeometry } from "@/components/three/heartGeometry";

export function BeatingHeart({
  position = [0, 0, 0] as [number, number, number],
  baseScale = 0.5,
  color = "#e8748f",
  intensity = 1,
  bpm = 62,
}: {
  position?: [number, number, number];
  baseScale?: number;
  color?: string;
  intensity?: number;
  bpm?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createHeartGeometry(0.62, 0.42), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * (bpm / 60);
    // heartbeat curve: quick double-pulse then rest, approximated with two sine lobes
    const beat = Math.max(Math.sin(t * Math.PI * 2), 0) ** 2 * 0.14 + Math.max(Math.sin(t * Math.PI * 2 - 0.6), 0) ** 3 * 0.08;
    const s = baseScale * (1 + beat * intensity);
    meshRef.current.scale.setScalar(s);
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.3;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} castShadow>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        roughness={0.25}
        metalness={0.15}
      />
    </mesh>
  );
}
