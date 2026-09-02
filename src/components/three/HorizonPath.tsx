import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function HorizonPath({ color = "#e8748f" }: { color?: string }) {
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const mat = lineRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.6 + Math.sin(clock.getElapsedTime() * 1.4) * 0.2;
  });

  return (
    <group position={[0, -2.4, 0]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <mesh receiveShadow>
        <planeGeometry args={[26, 40, 1, 1]} />
        <meshStandardMaterial color="#120a1c" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh ref={lineRef} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.12, 40]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}
