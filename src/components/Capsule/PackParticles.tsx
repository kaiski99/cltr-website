"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { type LGMTheme } from "@/lib/themes";

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

interface PackParticlesProps {
  theme: LGMTheme;
  scrollProgress: number;
}

export function PackParticles({ theme, scrollProgress }: PackParticlesProps) {
  const maxParticles = 60;
  const particleCount = Math.floor(15 + scrollProgress * (maxParticles - 15));

  const particles = useMemo(() => {
    return Array.from({ length: maxParticles }, (_, i) => ({
      color: theme.particles.colors[i % theme.particles.colors.length],
      // Vary sizes — some tiny embers, some larger
      size: 1.5 + seededRandom(i) * 5,
      startX: seededRandom(i + 100) * 100,
      duration: 2 + seededRandom(i + 200) * 5,
      delay: seededRandom(i + 300) * 3,
      offsetX: (seededRandom(i + 400) - 0.5) * 120,
      sinOffset: Math.sin(i * 0.5) * 60,
      // Some are streak-shaped (embers)
      isStreak: seededRandom(i + 500) > 0.6,
      rotation: seededRandom(i + 600) * 360,
    }));
  }, [theme.particles.colors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.slice(0, particleCount).map((p, i) => {
        if (theme.particles.type === "fire") {
          // Fire embers — mix of round dots and elongated streaks
          if (p.isStreak) {
            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: p.size * 0.5,
                  height: p.size * 2.5,
                  background: `linear-gradient(to top, ${p.color}, transparent)`,
                  borderRadius: "50%",
                  left: `${p.startX}%`,
                  bottom: "-3%",
                  transform: `rotate(${p.rotation}deg)`,
                }}
                animate={{
                  y: [0, -700],
                  x: [0, p.offsetX * 0.5],
                  opacity: [0, 0.9, 0.7, 0],
                  scale: [0.3, 1, 0.6, 0],
                }}
                transition={{
                  duration: p.duration * 0.8,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            );
          }
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                left: `${p.startX}%`,
                bottom: "-3%",
              }}
              animate={{
                y: [0, -650],
                x: [0, p.offsetX],
                opacity: [0, 0.85, 0.5, 0],
                scale: [0.4, 1, 0.3],
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
              className="absolute rounded-full"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                border: `1px solid ${p.color}50`,
                background: `${p.color}10`,
                boxShadow: `0 0 ${p.size}px ${p.color}30`,
                left: `${p.startX}%`,
                bottom: "-3%",
              }}
              animate={{
                y: [0, -600],
                x: [0, p.sinOffset * 0.5],
                opacity: [0, 0.5, 0.3, 0],
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
              boxShadow: `0 0 ${p.size}px ${p.color}40`,
              borderRadius: "50% 0 50% 0",
              left: `${p.startX}%`,
              top: "-3%",
            }}
            animate={{
              y: [0, 650],
              x: [0, p.sinOffset],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.4, 0],
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
