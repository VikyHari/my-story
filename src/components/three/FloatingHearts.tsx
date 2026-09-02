import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createHeartGeometry } from "@/components/three/heartGeometry";

interface HeartInstanceData {
  position: THREE.Vector3;
  speed: number;
  phase: number;
  scale: number;
}

export function FloatingHearts({ count = 24, spread = 9, color = "#f6b8c6" }: { count?: number; spread?: number; color?: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => createHeartGeometry(0.16, 0.08), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo<HeartInstanceData[]>(
    () =>
      Array.from({ length: count }, () => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread * 2,
          (Math.random() - 0.5) * spread * 1.4,
          (Math.random() - 0.5) * spread
        ),
        speed: Math.random() * 0.15 + 0.05,
        phase: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.6 + 0.5,
      })),
    [count, spread]
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    data.forEach((d, i) => {
      dummy.position.set(
        d.position.x + Math.sin(t * d.speed + d.phase) * 0.4,
        d.position.y + Math.sin(t * d.speed * 1.3 + d.phase) * 0.3 + t * d.speed * 0.05,
        d.position.z
      );
      dummy.rotation.set(0, t * 0.1 + d.phase, Math.sin(t * 0.2 + d.phase) * 0.3);
      dummy.scale.setScalar(d.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.75} />
    </instancedMesh>
  );
}
