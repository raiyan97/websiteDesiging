import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

function Globe() {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
      ref.current.rotation.x += dt * 0.05;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.6, 4]}>
        <MeshDistortMaterial
          color="#3B82F6"
          emissive="#8B5CF6"
          emissiveIntensity={0.45}
          roughness={0.15}
          metalness={0.85}
          distort={0.42}
          speed={1.6}
          wireframe={false}
        />
      </Icosahedron>
      <Icosahedron args={[1.85, 1]}>
        <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={2.2} color="#3B82F6" />
        <pointLight position={[-5, -3, 4]} intensity={1.8} color="#8B5CF6" />
        <Globe />
        <Stars radius={20} depth={40} count={2000} factor={3} fade speed={0.6} />
      </Suspense>
    </Canvas>
  );
}
