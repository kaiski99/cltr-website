"use client";

import { motion } from "framer-motion";
import { type LGMTheme, type LGMType } from "@/lib/themes";

interface LGMCardProps {
  lgm: LGMType;
  theme: LGMTheme;
  isSelected: boolean;
  isOtherSelected: boolean;
  onSelect: () => void;
  spotsRemaining: number;
}

export function LGMCard({
  lgm,
  theme,
  isSelected,
  isOtherSelected,
  onSelect,
  spotsRemaining,
}: LGMCardProps) {
  return (
    <motion.div
      layout
      variants={{
        idle: { scale: 1, rotateY: 0, opacity: 1 },
        hover: {
          scale: 1.05,
          rotateY: 8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
        selected: {
          scale: 1.08,
          rotateY: 0,
          opacity: 1,
        },
        notSelected: {
          scale: 0.92,
          opacity: 0.3,
          filter: "grayscale(1)",
        },
      }}
      initial="idle"
      animate={isSelected ? "selected" : isOtherSelected ? "notSelected" : "idle"}
      whileHover={!isSelected && !isOtherSelected ? "hover" : undefined}
      className="relative cursor-pointer perspective-1000"
      onClick={!isSelected && !isOtherSelected ? onSelect : undefined}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-2xl"
        style={{ background: theme.colors.glow }}
        animate={{
          opacity: isSelected ? 0.6 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      <div
        className="relative bg-[#111] border-2 rounded-3xl overflow-hidden transition-colors duration-300"
        style={{
          borderColor: isSelected
            ? theme.colors.primary
            : `${theme.colors.primary}30`,
          boxShadow: isSelected
            ? `0 0 60px ${theme.colors.glow}`
            : "none",
        }}
      >
        {/* Header with themed gradient */}
        <div
          className="h-56 flex flex-col items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primary}20, ${theme.colors.secondary}10, transparent)`,
          }}
        >
          <motion.span
            className="text-8xl"
            animate={
              isSelected
                ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            {theme.icon}
          </motion.span>

          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: theme.particles.colors[i % theme.particles.colors.length],
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="p-6">
          <h3 className="text-3xl font-bold mb-1">{theme.name.replace(" LGM", "")}</h3>
          <p
            className="text-sm font-medium mb-4"
            style={{ color: theme.colors.primary }}
          >
            {theme.tagline}
          </p>

          {/* Card list */}
          <div className="space-y-2 mb-6">
            {theme.featuredCards.map((card) => (
              <div
                key={card}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: theme.colors.primary }}
                />
                {card}
              </div>
            ))}
            <div className="text-xs text-gray-600">+ {theme.poolSize - 3} more</div>
          </div>

          {/* Spots remaining */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Spots remaining</span>
              <span style={{ color: theme.colors.primary }}>
                {spotsRemaining}/500
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(spotsRemaining / 500) * 100}%`,
                  background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                }}
              />
            </div>
          </div>

          {/* Choose button */}
          {!isOtherSelected && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-bold text-white transition-all"
              style={{
                background: isSelected
                  ? theme.colors.primary
                  : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
              }}
            >
              {isSelected ? "CHOSEN ✓" : "CHOOSE"}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
