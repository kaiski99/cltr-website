"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { themes, type LGMType } from "@/lib/themes";

const lgmKeys: LGMType[] = ["blaze", "tidal", "forest"];

export function LGMShowcase() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Choose Your Allegiance
          </h2>
          <p className="text-gray-400 text-lg">
            3 Limited Gacha Machines. 2,000 graded cards each. Choose wisely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {lgmKeys.map((key, i) => {
            const theme = themes[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
                className="relative group cursor-pointer"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: theme.colors.glow }}
                />

                <div
                  className="relative bg-[#111] border rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: `${theme.colors.primary}20`,
                  }}
                >
                  {/* Gradient header */}
                  <div
                    className="h-48 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}10)`,
                    }}
                  >
                    <span className="text-7xl">{theme.icon}</span>

                    {/* Floating particles placeholder */}
                    <div
                      className="absolute top-4 right-4 w-3 h-3 rounded-full glow-pulse"
                      style={{ background: theme.colors.primary }}
                    />
                    <div
                      className="absolute bottom-8 left-6 w-2 h-2 rounded-full glow-pulse"
                      style={{
                        background: theme.colors.secondary,
                        animationDelay: "0.5s",
                      }}
                    />
                    <div
                      className="absolute top-12 left-12 w-2 h-2 rounded-full glow-pulse"
                      style={{
                        background: theme.colors.accent,
                        animationDelay: "1s",
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1">{theme.name}</h3>
                    <p
                      className="text-sm mb-4"
                      style={{ color: theme.colors.primary }}
                    >
                      {theme.tagline}
                    </p>

                    <div className="space-y-2 mb-6">
                      {theme.featuredCards.map((card) => (
                        <div
                          key={card}
                          className="flex items-center gap-2 text-sm text-gray-400"
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: theme.colors.primary }}
                          />
                          {card}
                        </div>
                      ))}
                      <div className="text-xs text-gray-600">
                        + {theme.poolSize - 3} more cards
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{theme.poolSize.toLocaleString()} cards</span>
                      <span>${theme.drawPrice}/draw</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/choose">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-100 transition-colors"
            >
              Get Whitelisted
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
