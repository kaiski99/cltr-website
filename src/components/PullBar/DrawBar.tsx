"use client";

import { motion } from "framer-motion";

interface DrawBarProps {
  scrollProgress: number;
  drawAmount: number;
  rareChanceBoost: number;
  totalCost: number;
  isDrawing: boolean;
  onDraw: () => void;
}

export function DrawBar({
  scrollProgress,
  drawAmount,
  rareChanceBoost,
  totalCost,
  isDrawing,
  onDraw,
}: DrawBarProps) {
  return (
    <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 md:p-6 z-40">
      <div className="max-w-3xl mx-auto">
        {/* Draw Amount Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-400 text-xs tracking-wider">
              DRAW AMOUNT
            </span>
            <span className="text-white font-bold">{drawAmount} cards</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              animate={{ width: `${scrollProgress * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Rare Chance Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-gray-400 text-xs tracking-wider">
              RARE CHANCE
            </span>
            <span className="text-yellow-400 font-bold">
              +{rareChanceBoost.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-300 rounded-full"
              animate={{ width: `${rareChanceBoost * 2}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>base</span>
            <span>+50%</span>
          </div>
        </div>

        {/* Cost & Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-xs tracking-wider">
              TOTAL COST
            </span>
            <div className="text-2xl font-bold text-white">${totalCost}</div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDraw}
            disabled={isDrawing}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold text-lg text-white shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDrawing ? (
              <span className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
