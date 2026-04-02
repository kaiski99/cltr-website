"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type RevealedCard } from "@/lib/contracts";
import { getTierColor } from "@/lib/rarity";

interface CardRevealProps {
  card: RevealedCard;
  onKeep: () => void;
  onBuyback: () => void;
  index: number;
  total: number;
}

const tierBorderClasses: Record<string, string> = {
  bronze: "border-gray-400",
  silver: "border-gray-300",
  gold: "border-yellow-500",
  platinum: "border-purple-500",
  diamond: "border-blue-400",
  radiant: "border-radiant",
};

export function CardReveal({
  card,
  onKeep,
  onBuyback,
  index,
  total,
}: CardRevealProps) {
  const buybackAmount = Math.round(card.fmv * 0.9);
  const tierColor = getTierColor(card.tier);
  const borderClass = tierBorderClasses[card.tier] || "border-gray-400";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={card.id}
        initial={{ rotateY: 180, opacity: 0, scale: 0.8 }}
        animate={{ rotateY: 0, opacity: 1, scale: 1 }}
        exit={{ x: -300, opacity: 0, scale: 0.5 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center">
          {/* Tier badge */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg font-bold mb-4 flex items-center gap-2"
            style={{ color: tierColor }}
          >
            ✦ {card.tier.toUpperCase()} TIER ✦
          </motion.div>

          {/* Card */}
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className={`w-64 h-96 rounded-2xl border-4 ${borderClass} bg-[#111] overflow-hidden relative`}
            style={{
              boxShadow: `0 0 40px ${tierColor}40`,
            }}
          >
            {/* Card image area */}
            <div
              className="h-3/5 flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${tierColor}15, ${tierColor}05)`,
              }}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">🃏</div>
                <div className="text-xs text-gray-500">{card.grade}</div>
              </div>

              {/* Rarity glow */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle, ${tierColor}, transparent 70%)`,
                }}
              />
            </div>

            <div className="p-4 text-center">
              <h3 className="font-bold text-lg">{card.name}</h3>
              <p className="text-sm text-gray-400">{card.grade}</p>
              <p className="text-xl font-bold text-green-400 mt-2">
                FMV: ${card.fmv.toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 mt-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onKeep}
              className="px-8 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold text-white transition-colors"
            >
              KEEP
              <span className="block text-sm opacity-75 font-normal">
                Mint NFT
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBuyback}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-white transition-colors"
            >
              BUYBACK
              <span className="block text-sm opacity-75 font-normal">
                ${buybackAmount}
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 mt-4 text-sm"
          >
            Card {index + 1} of {total}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
