"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type LGMTheme } from "@/lib/themes";

interface CapsuleProps {
  scrollProgress: number;
  theme: LGMTheme;
}

function Capsule({ scrollProgress, theme }: CapsuleProps) {
  const meshRef = useRef<THREE.Group>(null);

  const baseSpeed = 0.5;
  const maxSpeed = 5;
  const speed =
    baseSpeed + Math.pow(scrollProgress, 2) * (maxSpeed - baseSpeed);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * speed;

    if (scrollProgress > 0.6) {
      const shake = (scrollProgress - 0.6) * 0.02;
      meshRef.current.position.x = Math.sin(Date.now() * 0.01) * shake;
      meshRef.current.position.z = Math.cos(Date.now() * 0.013) * shake;
    } else {
      meshRef.current.position.x = 0;
      meshRef.current.position.z = 0;
    }
  });

  const topColor = new THREE.Color(theme.gacha.topColor);
  const bottomColor = new THREE.Color(theme.gacha.bottomColor);
  const bandColor = new THREE.Color(theme.gacha.bandColor);
  const glowIntensity = 0.5 + scrollProgress * 2;

  return (
    <group ref={meshRef}>
      {/* Top dome */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={topColor}
          transparent
          opacity={0.35 + scrollProgress * 0.2}
          roughness={0.15}
          metalness={0.3}
          emissive={topColor}
          emissiveIntensity={glowIntensity * 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Band / seam line */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 8, 48]} />
        <meshStandardMaterial
          color={bandColor}
          emissive={topColor}
          emissiveIntensity={glowIntensity * 0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry
          args={[1, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]}
        />
        <meshStandardMaterial
          color={bottomColor}
          metalness={0.7}
          roughness={0.25}
          emissive={bottomColor}
          emissiveIntensity={glowIntensity * 0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          color={topColor}
          transparent
          opacity={0.1 + scrollProgress * 0.25}
        />
      </mesh>

      {/* Pipe details on base */}
      {[0, 1, 2, 3].map((i) => {
        const angle = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.75,
              0.15,
              Math.sin(angle) * 0.75,
            ]}
            rotation={[0, angle, Math.PI / 6]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.35, 8]} />
            <meshStandardMaterial
              color={bandColor}
              emissive={topColor}
              emissiveIntensity={
                glowIntensity * 0.3 * (i % 2 === 0 ? 1 : 0.4)
              }
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        );
      })}

      {/* Base ring */}
      <mesh position={[0, -0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.6, 0.06, 8, 32]} />
        <meshStandardMaterial
          color={bandColor}
          metalness={0.8}
          roughness={0.2}
          emissive={bottomColor}
          emissiveIntensity={glowIntensity * 0.2}
        />
      </mesh>
    </group>
  );
}

interface GachaMachineProps {
  scrollProgress: number;
  theme: LGMTheme;
}

export function GachaMachine({ scrollProgress, theme }: GachaMachineProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <GachaFallback theme={theme} scrollProgress={scrollProgress} />;
  }

  return (
    <div className="w-full h-[300px] md:h-[380px]">
      <Canvas
        camera={{ position: [0, 0.3, 4.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setHasError(true);
          });
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight
          position={[2, 3, 2]}
          intensity={1.5}
          color={theme.colors.primary}
        />
        <pointLight
          position={[-2, -1, 2]}
          intensity={0.8}
          color={theme.colors.secondary}
        />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />
        <Capsule scrollProgress={scrollProgress} theme={theme} />
      </Canvas>
    </div>
  );
}

/** CSS-only fallback if WebGL fails */
function GachaFallback({
  theme,
  scrollProgress,
}: {
  theme: LGMTheme;
  scrollProgress: number;
}) {
  const speed = 2 + scrollProgress * 8;
  const glow = 10 + scrollProgress * 40;

  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <div
        className="relative w-48 h-48 rounded-full"
        style={{
          animation: `spin ${speed}s linear infinite`,
          boxShadow: `0 0 ${glow}px ${theme.colors.glow}, inset 0 0 ${glow / 2}px ${theme.colors.glow}`,
        }}
      >
        {/* Top half */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primary}80 0%, ${theme.colors.primary}20 50%, ${theme.gacha.bottomColor}60 50%, ${theme.gacha.bottomColor}90 100%)`,
          }}
        />
        {/* Band */}
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2"
          style={{
            background: theme.gacha.bandColor,
            boxShadow: `0 0 ${glow / 2}px ${theme.colors.primary}`,
          }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center text-5xl">
          {theme.icon}
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
