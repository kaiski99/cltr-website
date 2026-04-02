"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "DRAW",
    description: "Spin the Limited Gacha Machine. Scroll to control how many cards you draw and your rare chance boost.",
    icon: "🎰",
  },
  {
    number: "02",
    title: "REVEAL",
    description: "Each card is revealed one by one. PSA/CGC/BGS graded Pokemon cards with real Fair Market Value.",
    icon: "✨",
  },
  {
    number: "03",
    title: "KEEP or BUYBACK",
    description: "Keep your card as an ERC-721 NFT backed by the physical card, or instantly buyback at 90% FMV.",
    icon: "💎",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three simple steps to owning graded Pokemon cards on-chain
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 h-full hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300">
                <div className="text-5xl mb-6">{step.icon}</div>
                <div className="text-xs text-gray-500 font-mono mb-2">
                  STEP {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector arrow (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 text-gray-600 text-2xl">
                  &rarr;
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Value prop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="text-green-400 font-bold">1.11x</span>
            <span className="text-gray-300">Expected Value per draw</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
