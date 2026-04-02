"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type LGMTheme } from "@/lib/themes";
import Link from "next/link";

interface ChosenAnimationProps {
  isVisible: boolean;
  theme: LGMTheme | null;
  lgm: string | null;
}

export function ChosenAnimation({ isVisible, theme, lgm }: ChosenAnimationProps) {
  if (!theme || !lgm) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        >
          {/* Burst particles */}
          {[...Array(20)].map((_, i) => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 150 + Math.random() * 200;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background:
                    theme.particles.colors[i % theme.particles.colors.length],
                }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: [0, 1.5, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.2 + Math.random() * 0.3,
                  ease: "easeOut",
                }}
              />
            );
          })}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
            className="text-center z-10"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-8xl mb-6"
            >
              {theme.icon}
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-bold mb-2"
            >
              Welcome to{" "}
              <span style={{ color: theme.colors.primary }}>
                {theme.name}
              </span>
              !
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-400 mb-8"
            >
              Your gacha adventure awaits
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <Link href={`/gacha/${lgm}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl font-bold text-white text-lg"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    boxShadow: `0 0 40px ${theme.colors.glow}`,
                  }}
                >
                  Enter the Gacha
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
