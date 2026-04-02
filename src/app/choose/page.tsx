"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Layout/Header";
import { LGMCard } from "@/components/LGMSelection/LGMCard";
import { ConfirmModal } from "@/components/LGMSelection/ConfirmModal";
import { ChosenAnimation } from "@/components/LGMSelection/ChosenAnimation";
import { useCLTRStore } from "@/stores/cltr";
import { themes, type LGMType } from "@/lib/themes";

const lgmKeys: LGMType[] = ["blaze", "tidal", "forest"];

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

      <main className="min-h-screen bg-[#060a08] relative overflow-hidden flex flex-col">
        {/* Background circuit pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,197,94,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,197,94,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Colored fog / mist behind capsules */}
        <div
          className="absolute top-[30%] left-[10%] w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{ background: themes.blaze.colors.primary }}
        />
        <div
          className="absolute top-[25%] left-[40%] w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{ background: themes.tidal.colors.primary }}
        />
        <div
          className="absolute top-[30%] right-[10%] w-72 h-72 rounded-full blur-[100px] opacity-15"
          style={{ background: themes.forest.colors.primary }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center pt-24 md:pt-28 px-4">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
              CLTR
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              Starter Selection Lab
            </h1>
          </motion.div>

          {/* Wallet gate */}
          {!wallet && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="px-6 py-3 bg-white text-black font-bold rounded-lg text-sm"
              >
                Connect Wallet to Choose
              </motion.button>
            </motion.div>
          )}

          {/* Platform + Capsules */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Dark tech platform */}
            <div className="relative bg-[#0c0f0d] border border-white/[0.06] rounded-2xl p-6 md:p-10">
              {/* Platform inner glow edges */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                {/* Top edge glow */}
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/10" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10" />
              </div>

              {/* The 3 capsule machines */}
              <div className="flex items-end justify-center gap-6 md:gap-10">
                {lgmKeys.map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.12 }}
                  >
                    <LGMCard
                      lgm={key}
                      theme={themes[key]}
                      isSelected={chosenLGM === key}
                      isOtherSelected={
                        chosenLGM !== null && chosenLGM !== key
                      }
                      onSelect={() => handleSelect(key)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Platform base glow */}
              <div className="mt-4 mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          </motion.div>

          {/* Retro RPG dialog box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 md:mt-10 w-full max-w-md"
          >
            <div className="relative bg-white border-[3px] border-black rounded-sm px-5 py-4">
              {/* Double border effect */}
              <div className="absolute inset-[3px] border border-black/20 rounded-sm pointer-events-none" />

              <DialogTypewriter
                text="Every journey begins with a choice... Choose wisely, Trainer."
              />

              {/* Blinking cursor triangle */}
              <motion.div
                className="absolute bottom-3 right-4 text-black text-xs"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ▼
              </motion.div>
            </div>
          </motion.div>

          {/* Warning text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-gray-500 mt-5 mb-8 max-w-sm leading-relaxed"
          >
            ⚠ This decision is permanent. Each gacha contains 2,000 exclusive
            graded Pokemon cards you can&apos;t find anywhere else.
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

/* ── Typewriter text component ── */
function DialogTypewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p
      className="text-black text-sm md:text-base leading-relaxed min-h-[3em]"
      style={{ fontFamily: "monospace" }}
    >
      {displayedText}
    </p>
  );
}
