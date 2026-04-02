"use client";

import { motion } from "framer-motion";
import { rarityTiers } from "@/lib/rarity";

export function RarityTable() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Rarity Tiers
          </h2>
          <p className="text-gray-400 text-lg">
            Each LGM drop contains 2,000 graded cards
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-gray-400">
                <th className="text-left p-4 font-medium">Tier</th>
                <th className="text-right p-4 font-medium">Odds</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">
                  Per Drop
                </th>
                <th className="text-right p-4 font-medium">FMV Range</th>
              </tr>
            </thead>
            <tbody>
              {rarityTiers.map((tier, i) => (
                <motion.tr
                  key={tier.tier}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        tier.tier === "radiant" ? "border-radiant border-2" : ""
                      }`}
                      style={
                        tier.tier !== "radiant"
                          ? { background: tier.color }
                          : undefined
                      }
                    />
                    <span className="font-bold" style={{ color: tier.color }}>
                      {tier.label}
                    </span>
                  </td>
                  <td className="p-4 text-right text-gray-300">
                    {tier.odds}%
                  </td>
                  <td className="p-4 text-right text-gray-400 hidden sm:table-cell">
                    {tier.cardsPerDrop.toLocaleString()}
                  </td>
                  <td className="p-4 text-right text-gray-300">
                    ${tier.fmvMin.toLocaleString()} - $
                    {tier.fmvMax.toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
