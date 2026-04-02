"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type LGMTheme } from "@/lib/themes";

/* ─── Tall pill-shaped capsule ─── */
function Capsule({
  scrollProgress,
  theme,
}: {
  scrollProgress: number;
  theme: LGMTheme;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const baseSpeed = 0.3;
  const maxSpeed = 4;
  const speed =
    baseSpeed + Math.pow(scrollProgress, 2) * (maxSpeed - baseSpeed);
  const glowIntensity = 0.4 + scrollProgress * 2.5;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * speed;
    if (scrollProgress > 0.6) {
      const shake = (scrollProgress - 0.6) * 0.015;
      groupRef.current.position.x = Math.sin(Date.now() * 0.012) * shake;
      groupRef.current.position.z = Math.cos(Date.now() * 0.015) * shake;
    } else {
      groupRef.current.position.x *= 0.9;
      groupRef.current.position.z *= 0.9;
    }
  });

  const topCol = useMemo(() => new THREE.Color(theme.gacha.topColor), [theme]);
  const botCol = useMemo(
    () => new THREE.Color(theme.gacha.bottomColor),
    [theme]
  );
  const bandCol = useMemo(
    () => new THREE.Color(theme.gacha.bandColor),
    [theme]
  );

  return (
    <group ref={groupRef}>
      {/* ── Glass dome (top half — tall capsule shape) ── */}
      <mesh position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.7, 0.9, 16, 32]} />
        <meshStandardMaterial
          color={topCol}
          transparent
          opacity={0.25 + scrollProgress * 0.15}
          roughness={0.05}
          metalness={0.2}
          emissive={topCol}
          emissiveIntensity={glowIntensity * 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial
          color={topCol}
          transparent
          opacity={0.12 + scrollProgress * 0.35}
        />
      </mesh>

      {/* Particle mist inside dome */}
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshBasicMaterial
          color={topCol}
          transparent
          opacity={0.06 + scrollProgress * 0.12}
        />
      </mesh>

      {/* ── Main band / seam ring ── */}
      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.07, 12, 48]} />
        <meshStandardMaterial
          color={"#C0C0C0"}
          emissive={topCol}
          emissiveIntensity={glowIntensity * 0.4}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Secondary ring */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.03, 8, 48]} />
        <meshStandardMaterial
          color={"#888"}
          metalness={0.9}
          roughness={0.15}
          emissive={topCol}
          emissiveIntensity={glowIntensity * 0.15}
        />
      </mesh>

      {/* ── Mechanical base ── */}
      {/* Main body */}
      <mesh position={[0, 0.0, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 0.5, 32]} />
        <meshStandardMaterial
          color={"#3a3a3a"}
          metalness={0.85}
          roughness={0.25}
          emissive={botCol}
          emissiveIntensity={glowIntensity * 0.08}
        />
      </mesh>

      {/* Lower mechanical section */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.6, 0.55, 0.35, 32]} />
        <meshStandardMaterial
          color={"#2a2a2a"}
          metalness={0.9}
          roughness={0.2}
          emissive={botCol}
          emissiveIntensity={glowIntensity * 0.05}
        />
      </mesh>

      {/* Pipe details */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <group key={i}>
            {/* Vertical pipes */}
            <mesh
              position={[
                Math.cos(angle) * 0.62,
                0.0,
                Math.sin(angle) * 0.62,
              ]}
            >
              <cylinderGeometry args={[0.035, 0.035, 0.55, 8]} />
              <meshStandardMaterial
                color={"#555"}
                emissive={topCol}
                emissiveIntensity={
                  glowIntensity * 0.2 * (i % 2 === 0 ? 1 : 0.3)
                }
                metalness={0.95}
                roughness={0.1}
              />
            </mesh>
            {/* Pipe joints */}
            <mesh
              position={[
                Math.cos(angle) * 0.62,
                0.2,
                Math.sin(angle) * 0.62,
              ]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color={bandCol}
                emissive={topCol}
                emissiveIntensity={glowIntensity * 0.6 * (i % 2 === 0 ? 1 : 0)}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Circuit rings on base */}
      <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.66, 0.02, 6, 48]} />
        <meshStandardMaterial
          color={"#666"}
          emissive={topCol}
          emissiveIntensity={glowIntensity * 0.3}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Bottom ring */}
      <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.5, 0.05, 8, 32]} />
        <meshStandardMaterial
          color={"#444"}
          metalness={0.85}
          roughness={0.2}
          emissive={botCol}
          emissiveIntensity={glowIntensity * 0.15}
        />
      </mesh>

      {/* Bottom base plate */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.1, 24]} />
        <meshStandardMaterial
          color={"#222"}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbiting cards ─── */
function OrbitingCards({
  scrollProgress,
  theme,
}: {
  scrollProgress: number;
  theme: LGMTheme;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const cardCount = 6;

  useFrame((state) => {
    if (!groupRef.current) return;
    const speed = 0.3 + scrollProgress * 0.8;
    groupRef.current.rotation.y = state.clock.elapsedTime * speed;
  });

  const col = useMemo(() => new THREE.Color(theme.colors.primary), [theme]);

  return (
    <group ref={groupRef} position={[0, 0.6, 0]}>
      {Array.from({ length: cardCount }).map((_, i) => {
        const angle = (i / cardCount) * Math.PI * 2;
        const radius = 1.3 + Math.sin(i * 1.5) * 0.15;
        const yOff = Math.sin(i * 2.1) * 0.3;
        const visible = scrollProgress > 0.1 + i * 0.08;

        return (
          <group
            key={i}
            position={[
              Math.cos(angle) * radius,
              yOff,
              Math.sin(angle) * radius,
            ]}
            rotation={[0.2, -angle + Math.PI / 2, 0.15 * Math.sin(i)]}
          >
            <mesh visible={visible}>
              <planeGeometry args={[0.28, 0.4]} />
              <meshBasicMaterial
                color={col}
                transparent
                opacity={visible ? 0.15 + scrollProgress * 0.3 : 0}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Card border */}
            <mesh visible={visible} position={[0, 0, -0.001]}>
              <planeGeometry args={[0.3, 0.42]} />
              <meshBasicMaterial
                color={col}
                transparent
                opacity={visible ? 0.3 + scrollProgress * 0.4 : 0}
                side={THREE.DoubleSide}
                wireframe
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ─── Orbiting glow ring ─── */
function GlowRing({
  scrollProgress,
  theme,
}: {
  scrollProgress: number;
  theme: LGMTheme;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color(theme.colors.primary), [theme]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.5;
  });

  return (
    <mesh
      ref={ref}
      position={[0, 0.5, 0]}
      rotation={[Math.PI / 2.5, 0, 0]}
    >
      <torusGeometry args={[1.4, 0.008, 8, 64]} />
      <meshBasicMaterial
        color={col}
        transparent
        opacity={scrollProgress * 0.5}
      />
    </mesh>
  );
}

/* ─── Main export ─── */
export function GachaMachine({
  scrollProgress,
  theme,
}: {
  scrollProgress: number;
  theme: LGMTheme;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <GachaFallback theme={theme} scrollProgress={scrollProgress} />;
  }

  return (
    <div className="w-full h-[380px] md:h-[460px]">
      <Canvas
        camera={{ position: [0, 0.6, 4.0], fov: 38 }}
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
        <ambientLight intensity={0.25} />
        <pointLight
          position={[2, 4, 2]}
          intensity={2}
          color={theme.colors.primary}
          distance={12}
        />
        <pointLight
          position={[-2, -1, 3]}
          intensity={1}
          color={theme.colors.secondary}
          distance={10}
        />
        <pointLight
          position={[0, 2, -2]}
          intensity={0.5}
          color={"#ffffff"}
          distance={8}
        />
        <directionalLight position={[0, 5, 5]} intensity={0.15} />

        <Capsule scrollProgress={scrollProgress} theme={theme} />
        <OrbitingCards scrollProgress={scrollProgress} theme={theme} />
        <GlowRing scrollProgress={scrollProgress} theme={theme} />
      </Canvas>
    </div>
  );
}

/* ─── CSS fallback ─── */
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
    <div className="w-full h-[380px] md:h-[460px] flex items-center justify-center">
      <div
        className="relative w-36 h-52 rounded-full"
        style={{
          animation: `spin ${speed}s linear infinite`,
          boxShadow: `0 0 ${glow}px ${theme.colors.glow}, inset 0 0 ${glow / 2}px ${theme.colors.glow}`,
          background: `linear-gradient(180deg, ${theme.colors.primary}60 0%, ${theme.colors.primary}20 45%, #3a3a3a 45%, #222 100%)`,
        }}
      >
        <div
          className="absolute left-0 right-0 top-[44%] h-2 rounded-full"
          style={{
            background: "#C0C0C0",
            boxShadow: `0 0 ${glow / 2}px ${theme.colors.primary}`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          {theme.icon}
        </div>
      </div>
    </div>
  );
}
