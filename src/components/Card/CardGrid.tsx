"use client";

import { motion } from "framer-motion";
import { type RevealedCard } from "@/lib/contracts";
import { getTierColor } from "@/lib/rarity";

interface CardGridProps {
  cards: RevealedCard[];
}

export function CardGrid({ cards }: CardGridProps) {
  if (cards.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-gray-300">
        Your Collection ({cards.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((card, i) => {
          const color = getTierColor(card.tier);
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-[#111] border rounded-xl overflow-hidden"
              style={{ borderColor: `${color}30` }}
            >
              <div
                className="h-24 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${color}15, transparent)`,
                }}
              >
                <span className="text-2xl">🃏</span>
              </div>
              <div className="p-3">
                <div
                  className="text-xs font-medium mb-1"
                  style={{ color }}
                >
                  {card.tier.toUpperCase()}
                </div>
                <div className="text-sm font-bold truncate">{card.name}</div>
                <div className="text-xs text-gray-500">{card.grade}</div>
                <div className="text-sm text-green-400 font-bold mt-1">
                  ${card.fmv}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
