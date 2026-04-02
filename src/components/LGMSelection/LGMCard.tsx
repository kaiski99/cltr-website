"use client";

import { motion } from "framer-motion";
import { type LGMTheme, type LGMType } from "@/lib/themes";

interface LGMCardProps {
  lgm: LGMType;
  theme: LGMTheme;
  isSelected: boolean;
  isOtherSelected: boolean;
  onSelect: () => void;
}

/* Pixel-art style icons as SVG-like spans */
const pixelIcons: Record<LGMType, string> = {
  blaze: "🔥",
  tidal: "💧",
  forest: "🌿",
};

export function LGMCard({
  lgm,
  theme,
  isSelected,
  isOtherSelected,
  onSelect,
}: LGMCardProps) {
  return (
    <motion.div
      layout
      variants={{
        idle: { scale: 1, opacity: 1, y: 0 },
        hover: {
          scale: 1.06,
          y: -8,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
        selected: { scale: 1.08, opacity: 1, y: -4 },
        notSelected: { scale: 0.88, opacity: 0.25, filter: "grayscale(0.8)" },
      }}
      initial="idle"
      animate={
        isSelected ? "selected" : isOtherSelected ? "notSelected" : "idle"
      }
      whileHover={!isSelected && !isOtherSelected ? "hover" : undefined}
      className="relative cursor-pointer flex flex-col items-center"
      onClick={!isSelected && !isOtherSelected ? onSelect : undefined}
    >
      {/* Pixel icon floating above */}
      <motion.div
        className="text-4xl md:text-5xl mb-3 relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          filter: `drop-shadow(0 0 12px ${theme.colors.primary})`,
          imageRendering: "pixelated",
        }}
      >
        {pixelIcons[lgm]}
      </motion.div>

      {/* Mini capsule machine */}
      <div className="relative">
        {/* Glow behind capsule */}
        <motion.div
          className="absolute -inset-4 rounded-2xl blur-2xl"
          style={{ background: theme.colors.glow }}
          animate={{
            opacity: isSelected ? 0.7 : isOtherSelected ? 0 : 0.3,
          }}
        />

        {/* Capsule body */}
        <div
          className="relative w-28 h-40 md:w-32 md:h-44 rounded-xl overflow-hidden border"
          style={{
            borderColor: `${theme.colors.primary}60`,
            boxShadow: isSelected
              ? `0 0 40px ${theme.colors.glow}, inset 0 0 20px ${theme.colors.glow}`
              : `0 0 15px ${theme.colors.primary}20`,
          }}
        >
          {/* Glass dome top */}
          <div
            className="h-[45%] relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primary}15, ${theme.colors.primary}30, ${theme.colors.primary}10)`,
            }}
          >
            {/* Inner dome highlight */}
            <div
              className="absolute inset-2 rounded-full opacity-40"
              style={{
                background: `radial-gradient(circle at 40% 30%, ${theme.colors.primary}60, transparent 70%)`,
              }}
            />
            {/* Dome top cap */}
            <div
              className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                background: theme.colors.primary,
                boxShadow: `0 0 10px ${theme.colors.primary}`,
              }}
            />
          </div>

          {/* Metal band with name */}
          <div
            className="h-[20%] flex items-center justify-center relative"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primary}90, ${theme.colors.primary}70)`,
              boxShadow: `inset 0 1px 0 ${theme.colors.primary}AA, inset 0 -1px 0 ${theme.colors.primary}40`,
            }}
          >
            <span className="text-xs md:text-sm font-black tracking-wider text-white drop-shadow-lg">
              {theme.name.replace(" LGM", "").toUpperCase()}
            </span>
          </div>

          {/* Mechanical base */}
          <div
            className="h-[35%] relative"
            style={{
              background: `linear-gradient(180deg, #2a2a2a, #1a1a1a)`,
            }}
          >
            {/* Pipe details */}
            <div className="absolute inset-x-2 top-1 flex justify-between">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-6 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${theme.colors.primary}60, ${theme.colors.primary}10)`,
                    boxShadow:
                      i % 2 === 0
                        ? `0 0 4px ${theme.colors.primary}40`
                        : "none",
                  }}
                />
              ))}
            </div>
            {/* Circuit ring */}
            <div
              className="absolute bottom-2 left-2 right-2 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${theme.colors.primary}40, transparent)`,
              }}
            />
          </div>
        </div>

        {/* Platform glow bar */}
        <div
          className="mx-auto mt-1 h-1 w-3/4 rounded-full"
          style={{
            background: theme.colors.primary,
            boxShadow: `0 0 12px ${theme.colors.primary}, 0 2px 8px ${theme.colors.primary}80`,
          }}
        />
      </div>

      {/* Choose button */}
      {!isOtherSelected && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="mt-4 px-6 py-2 rounded-md font-bold text-sm text-white tracking-wider border"
          style={{
            background: isSelected
              ? theme.colors.primary
              : `linear-gradient(135deg, ${theme.colors.primary}CC, ${theme.colors.primary})`,
            borderColor: `${theme.colors.primary}80`,
            boxShadow: `0 0 15px ${theme.colors.primary}30`,
          }}
        >
          {isSelected ? "CHOSEN ✓" : "CHOOSE"}
        </motion.button>
      )}
    </motion.div>
  );
}
