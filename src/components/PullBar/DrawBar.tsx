"use client";

import { motion } from "framer-motion";

interface DrawBarProps {
  scrollProgress: number;
  drawAmount: number;
  rareChanceBoost: number;
  totalCost: number;
  isDrawing: boolean;
  onDraw: () => void;
  themeColor?: string;
}

export function DrawBar({
  scrollProgress,
  drawAmount,
  rareChanceBoost,
  totalCost,
  isDrawing,
  onDraw,
  themeColor = "#E8593C",
}: DrawBarProps) {
  const amountPct = scrollProgress * 100;
  const rarePct = rareChanceBoost * 2;

  return (
    <div className="bg-[#0d0d0d]/95 backdrop-blur-xl border-t border-white/[0.06] px-5 py-4 z-40">
      <div className="max-w-3xl mx-auto flex items-center gap-5">
        {/* Left: sliders */}
        <div className="flex-1 space-y-3">
          {/* Draw amount slider */}
          <div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-[10px] tracking-[0.15em] text-gray-500 uppercase">
                Draw Amount:
              </span>
              <span className="text-sm font-bold text-white">
                {drawAmount} CARDS
              </span>
            </div>
            <div className="relative h-2 bg-white/[0.06] rounded-full overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${themeColor}, #ff4444)`,
                }}
                animate={{ width: `${amountPct}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              {/* Thumb */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#0d0d0d] shadow-lg"
                animate={{ left: `${amountPct}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ marginLeft: -7 }}
              />
            </div>
          </div>

          {/* Rare chance slider */}
          <div>
            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-[10px] tracking-[0.15em] text-gray-500 uppercase">
                Rare Chance:
              </span>
              <span
                className="text-sm font-bold"
                style={{ color: "#F59E0B" }}
              >
                +{rareChanceBoost.toFixed(0)}%
              </span>
            </div>
            <div className="relative h-2 bg-white/[0.06] rounded-full overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #EF4444)",
                }}
                animate={{ width: `${rarePct}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#0d0d0d] shadow-lg"
                animate={{ left: `${rarePct}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ marginLeft: -7 }}
              />
            </div>
          </div>
        </div>

        {/* Right: price + button */}
        <div className="shrink-0 flex flex-col items-center gap-1.5">
          <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            ${totalCost}
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onDraw}
            disabled={isDrawing}
            className="px-6 py-2.5 rounded-lg font-bold text-sm text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, ${themeColor}, #ff4444)`,
              boxShadow: `0 4px 20px ${themeColor}40`,
            }}
          >
            {isDrawing ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ◎
                </motion.span>
                Drawing...
              </span>
            ) : (
              `DRAW ${drawAmount} CARDS`
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
