"use client";

import { motion } from "framer-motion";
import { type PreviewCard } from "@/stores/cltr";
import { getTierColor } from "@/lib/rarity";

interface PopOutCardProps {
  card: PreviewCard;
}

const glowColors: Record<string, string> = {
  bronze: "#9CA3AF",
  silver: "#D1D5DB",
  gold: "#3B82F6",
  platinum: "#F59E0B",
  diamond: "#F59E0B",
  radiant: "#EF4444",
};

const rarityIcons: Record<string, string> = {
  bronze: "✦",
  silver: "✦",
  gold: "✦✦",
  platinum: "✦✦✦",
  diamond: "💎",
  radiant: "🌟",
};

export function PopOutCard({ card }: PopOutCardProps) {
  const color = getTierColor(card.rarity);
  const glow = glowColors[card.rarity] || "#9CA3AF";

  return (
    <motion.div
      initial={{
        scale: 0,
        opacity: 0,
        x: 0,
        y: 0,
      }}
      animate={{
        scale: [0, 1.2, 1, 0.8],
        opacity: [0, 0.8, 0.7, 0],
        x: card.position.x,
        y: card.position.y,
        rotate: card.rotation,
      }}
      transition={{
        duration: 1.5,
        ease: "easeOut",
      }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        filter: `drop-shadow(0 0 20px ${glow})`,
      }}
    >
      <div
        className="w-14 h-20 rounded-lg bg-black/60 backdrop-blur-md border-2 flex items-center justify-center"
        style={{ borderColor: color }}
      >
        <span className="text-xl">{rarityIcons[card.rarity] || "✦"}</span>
      </div>
    </motion.div>
  );
}
