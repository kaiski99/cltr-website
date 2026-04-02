"use client";

import { use, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Header } from "@/components/Layout/Header";
import { DrawBar } from "@/components/PullBar/DrawBar";
import { PopOutCard } from "@/components/Capsule/PopOutCard";
import { PackParticles } from "@/components/Capsule/PackParticles";
import { CardReveal } from "@/components/Card/CardReveal";
import { CardGrid } from "@/components/Card/CardGrid";
import { useCLTRStore } from "@/stores/cltr";
import { themes, type LGMType } from "@/lib/themes";

const GachaMachine = dynamic(
  () =>
    import("@/components/Capsule/GachaMachine").then((m) => m.GachaMachine),
  { ssr: false, loading: () => <GachaPlaceholder /> }
);

function GachaPlaceholder() {
  return (
    <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-2 border-white/20 border-t-white rounded-full"
      />
    </div>
  );
}

export default function GachaPage({
  params,
}: {
  params: Promise<{ lgm: string }>;
}) {
  const { lgm: lgmParam } = use(params);
  const lgm = lgmParam as LGMType;
  const theme = themes[lgm];
  const hiddenScrollRef = useRef<HTMLDivElement>(null);

  const {
    wallet,
    connectWallet,
    scrollProgress,
    setScrollProgress,
    drawAmount,
    rareChanceBoost,
    popOutCards,
    isDrawing,
    isRevealing,
    revealQueue,
    currentRevealIndex,
    ownedCards,
    totalBuybackEarned,
    executeDraw,
    keepCard,
    buybackCard,
    chooseLGM,
    chosenLGM,
  } = useCLTRStore();

  useEffect(() => {
    if (!chosenLGM && theme) {
      chooseLGM(lgm);
    }
  }, [chosenLGM, lgm, theme, chooseLGM]);

  // Hidden scroll container drives progress via scroll events
  useEffect(() => {
    const el = hiddenScrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      setScrollProgress(Math.min(Math.max(el.scrollTop / max, 0), 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [setScrollProgress]);

  // Forward wheel events from the visible UI to the hidden scroll driver
  const forwardWheel = useCallback((e: React.WheelEvent) => {
    const el = hiddenScrollRef.current;
    if (!el) return;
    el.scrollTop += e.deltaY;
  }, []);

  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Invalid LGM type.</p>
      </div>
    );
  }

  const totalCost = drawAmount * theme.drawPrice;
  const currentCard =
    isRevealing && revealQueue[currentRevealIndex]
      ? revealQueue[currentRevealIndex]
      : null;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" onWheel={forwardWheel}>
      {/* Header */}
      <Header />

      {/* Stats bar */}
      <div className="shrink-0 bg-black/60 backdrop-blur-md border-b border-white/5 z-30">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{theme.icon}</span>
            <span className="font-bold">{theme.name}</span>
          </div>
          {wallet ? (
            <div className="flex items-center gap-6 text-gray-400">
              <span>
                Draws:{" "}
                <span className="text-white font-bold">
                  {useCLTRStore.getState().drawHistory.length}
                </span>
              </span>
              <span>
                Buyback earned:{" "}
                <span className="text-green-400 font-bold">
                  ${totalBuybackEarned.toFixed(0)}
                </span>
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="text-white font-medium hover:text-gray-300"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Main visual area — capsule stays centered */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${theme.colors.primary}08 0%, transparent 60%)`,
        }}
      >
        {/* Themed particles */}
        <PackParticles theme={theme} scrollProgress={scrollProgress} />

        {/* Gacha machine — always centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="relative w-full max-w-lg">
            <GachaMachine scrollProgress={scrollProgress} theme={theme} />

            {/* Pop-out preview cards */}
            {popOutCards.map((card) => (
              <PopOutCard key={card.id} card={card} />
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
            className="mt-2 text-gray-500 text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to charge</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.div>
          </motion.div>
        </div>

        {/* Collection overlay — shown when there are owned cards */}
        {ownedCards.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 max-h-[30%] overflow-y-auto bg-gradient-to-t from-black via-black/90 to-transparent px-6 pt-8 pb-4">
            <CardGrid cards={ownedCards} />
          </div>
        )}
      </div>

      {/* Draw bar — at bottom */}
      <div className="shrink-0">
        <DrawBar
          scrollProgress={scrollProgress}
          drawAmount={drawAmount}
          rareChanceBoost={rareChanceBoost}
          totalCost={totalCost}
          isDrawing={isDrawing}
          onDraw={executeDraw}
          themeColor={theme.colors.primary}
        />
      </div>

      {/* Hidden scroll driver — invisible, just for scroll tracking */}
      <div
        ref={hiddenScrollRef}
        className="fixed top-0 right-0 w-2 h-full overflow-y-scroll opacity-0 pointer-events-none z-[-1]"
      >
        <div className="h-[500vh]" />
      </div>

      {/* Card reveal overlay */}
      {currentCard && (
        <CardReveal
          card={currentCard}
          onKeep={() => keepCard(currentCard.id)}
          onBuyback={() => buybackCard(currentCard.id)}
          index={currentRevealIndex}
          total={revealQueue.length}
        />
      )}
    </div>
  );
}
