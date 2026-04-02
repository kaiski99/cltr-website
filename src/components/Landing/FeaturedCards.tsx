"use client";

import { motion } from "framer-motion";
import { rarityTiers } from "@/lib/rarity";

const featuredCards = [
  // Diamond
  {
    name: "Charizard VMAX",
    tier: "diamond" as const,
    fmv: 2400,
    grade: "PSA 10",
    lgm: "Blaze",
    color: "#E8593C",
  },
  // Platinum
  {
    name: "Suicune VSTAR",
    tier: "platinum" as const,
    fmv: 580,
    grade: "PSA 10",
    lgm: "Tidal",
    color: "#3B82F6",
  },
  // Gold
  {
    name: "Arcanine EX",
    tier: "gold" as const,
    fmv: 195,
    grade: "PSA 9",
    lgm: "Blaze",
    color: "#E8593C",
  },
  {
    name: "Greninja EX",
    tier: "gold" as const,
    fmv: 210,
    grade: "CGC 9.5",
    lgm: "Tidal",
    color: "#3B82F6",
  },
  {
    name: "Sceptile EX",
    tier: "gold" as const,
    fmv: 155,
    grade: "PSA 9",
    lgm: "Forest",
    color: "#22C55E",
  },
  // Silver
  {
    name: "Ninetales EX",
    tier: "silver" as const,
    fmv: 115,
    grade: "PSA 9",
    lgm: "Blaze",
    color: "#E8593C",
  },
  {
    name: "Starmie EX",
    tier: "silver" as const,
    fmv: 105,
    grade: "CGC 9",
    lgm: "Tidal",
    color: "#3B82F6",
  },
  {
    name: "Breloom EX",
    tier: "silver" as const,
    fmv: 98,
    grade: "BGS 8.5",
    lgm: "Forest",
    color: "#22C55E",
  },
  // Bronze
  {
    name: "Growlithe",
    tier: "bronze" as const,
    fmv: 82,
    grade: "PSA 8",
    lgm: "Blaze",
    color: "#E8593C",
  },
  {
    name: "Horsea",
    tier: "bronze" as const,
    fmv: 75,
    grade: "PSA 8",
    lgm: "Tidal",
    color: "#3B82F6",
  },
];

export function FeaturedCards() {
  return (
    <section className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured Cards
          </h2>
          <p className="text-gray-400 text-lg">
            PSA/CGC/BGS graded. Insured custody at Le Freeport.
          </p>
        </motion.div>

        {/* Scrolling carousel */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {featuredCards.map((card, i) => {
            const tierInfo = rarityTiers.find((r) => r.tier === card.tier);
            return (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="snap-center shrink-0 w-64"
              >
                <div
                  className="bg-[#111] border rounded-2xl overflow-hidden"
                  style={{ borderColor: `${tierInfo?.color}40` }}
                >
                  {/* Card image placeholder */}
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${card.color}20, ${card.color}05)`,
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🃏</div>
                      <div className="text-xs text-gray-500">{card.grade}</div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: tierInfo?.color }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: tierInfo?.color }}
                      >
                        {tierInfo?.label}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg">{card.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-green-400 font-bold">
                        ${card.fmv.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">{card.lgm}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
