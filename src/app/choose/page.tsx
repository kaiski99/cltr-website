"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Layout/Header";
import { LGMCard } from "@/components/LGMSelection/LGMCard";
import { ConfirmModal } from "@/components/LGMSelection/ConfirmModal";
import { ChosenAnimation } from "@/components/LGMSelection/ChosenAnimation";
import { useCLTRStore } from "@/stores/cltr";
import { themes, type LGMType } from "@/lib/themes";

const lgmKeys: LGMType[] = ["blaze", "tidal", "forest"];

// Mock remaining spots
const mockSpots: Record<LGMType, number> = {
  blaze: 342,
  tidal: 256,
  forest: 489,
};

export default function ChoosePage() {
  const { wallet, connectWallet, chosenLGM, chooseLGM } = useCLTRStore();
  const [pendingChoice, setPendingChoice] = useState<LGMType | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSelect = (lgm: LGMType) => {
    if (!wallet) {
      connectWallet();
      return;
    }
    setPendingChoice(lgm);
  };

  const handleConfirm = () => {
    if (!pendingChoice) return;
    chooseLGM(pendingChoice);
    setPendingChoice(null);
    setShowCelebration(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Professor Oak intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <div className="text-sm text-gray-500 font-mono mb-4 tracking-wider">
              LIMITED GACHA MACHINE SELECTION
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Choose Your Gacha
            </h1>
            <p className="text-gray-400 text-lg italic">
              &quot;Every trainer remembers their first.&quot;
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Select one of three Limited Gacha Machines. Each contains 2,000
              exclusive graded Pokemon cards you can&apos;t find anywhere else.
            </p>
          </motion.div>

          {/* Wallet gate */}
          {!wallet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="px-8 py-4 bg-white text-black font-bold rounded-xl text-lg"
              >
                Connect Wallet to Choose
              </motion.button>
            </motion.div>
          )}

          {/* LGM Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {lgmKeys.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <LGMCard
                  lgm={key}
                  theme={themes[key]}
                  isSelected={chosenLGM === key}
                  isOtherSelected={chosenLGM !== null && chosenLGM !== key}
                  onSelect={() => handleSelect(key)}
                  spotsRemaining={mockSpots[key]}
                />
              </motion.div>
            ))}
          </div>

          {/* Warning */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-500 mt-8"
          >
            ⚠ Choose wisely — this decision is permanent. Each pack has
            exclusive cards you can&apos;t get elsewhere.
          </motion.p>
        </div>
      </main>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={pendingChoice !== null}
        lgm={pendingChoice}
        theme={pendingChoice ? themes[pendingChoice] : null}
        onConfirm={handleConfirm}
        onCancel={() => setPendingChoice(null)}
      />

      {/* Celebration */}
      <ChosenAnimation
        isVisible={showCelebration}
        theme={chosenLGM ? themes[chosenLGM] : null}
        lgm={chosenLGM}
      />
    </>
  );
}
