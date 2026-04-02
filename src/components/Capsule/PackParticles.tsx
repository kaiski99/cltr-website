"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type LGMTheme } from "@/lib/themes";

interface PackParticlesProps {
  theme: LGMTheme;
  scrollProgress: number;
}

// Deterministic pseudo-random based on seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export function PackParticles({ theme, scrollProgress }: PackParticlesProps) {
  const particleCount = Math.floor(8 + scrollProgress * 20);

  // Pre-compute stable particle configs
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      color: theme.particles.colors[i % theme.particles.colors.length],
      size: 2 + seededRandom(i) * 4,
      startX: seededRandom(i + 100) * 100,
      duration: 3 + seededRandom(i + 200) * 4,
      delay: seededRandom(i + 300) * 2,
      offsetX: (seededRandom(i + 400) - 0.5) * 100,
      sinOffset: Math.sin(i * 0.5) * 80,
    }));
  }, [theme.particles.colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.slice(0, particleCount).map((p, i) => {
        if (theme.particles.type === "fire") {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: `${p.startX}%`,
                bottom: "-5%",
              }}
              animate={{
                y: [0, -600],
                x: [0, p.offsetX],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        }

        if (theme.particles.type === "bubbles") {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                borderColor: p.color,
                left: `${p.startX}%`,
                bottom: "-5%",
              }}
              animate={{
                y: [0, -500],
                x: [0, p.sinOffset * 0.5],
                opacity: [0, 0.5, 0],
                scale: [0.3, 1.2, 0.8],
              }}
              transition={{
                duration: p.duration * 1.3,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        }

        // Leaves
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: p.size * 1.5,
              height: p.size,
              background: p.color,
              borderRadius: "50% 0 50% 0",
              left: `${p.startX}%`,
              top: "-5%",
            }}
            animate={{
              y: [0, 600],
              x: [0, p.sinOffset],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration * 1.5,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
