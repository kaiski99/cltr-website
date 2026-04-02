"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    week: "Week 1",
    title: "Whitelist",
    description: "Choose your LGM allegiance. 500 spots per pack.",
    active: true,
  },
  {
    week: "Week 2",
    title: "Gacha Live",
    description: "Draw from your chosen LGM. Keep or buyback at 90% FMV.",
    active: false,
  },
  {
    week: "Week 3",
    title: "Physical Ships",
    description: "Kept cards ship from Le Freeport insured custody.",
    active: false,
  },
  {
    week: "Week 4+",
    title: "Secondary Market",
    description: "Trade NFTs on OpenSea. Physical redemption available.",
    active: false,
  },
];

export function Roadmap() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Roadmap
          </h2>
          <p className="text-gray-400 text-lg">
            From whitelist to physical delivery
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-12">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-16"
              >
                {/* Dot */}
                <div
                  className={`absolute left-4 top-1 w-5 h-5 rounded-full border-2 ${
                    milestone.active
                      ? "bg-white border-white"
                      : "bg-transparent border-gray-600"
                  }`}
                />

                <div className="text-xs text-gray-500 font-mono mb-1">
                  {milestone.week}
                </div>
                <h3
                  className={`text-xl font-bold mb-1 ${
                    milestone.active ? "text-white" : "text-gray-400"
                  }`}
                >
                  {milestone.title}
                </h3>
                <p className="text-gray-500 text-sm">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
