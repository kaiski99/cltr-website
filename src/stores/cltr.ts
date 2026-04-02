import { create } from "zustand";
import { type LGMType } from "@/lib/themes";
import { type RarityTier, rollRarity } from "@/lib/rarity";
import { simulateDraw, type RevealedCard } from "@/lib/contracts";

export interface PreviewCard {
  id: string;
  rarity: RarityTier;
  position: { x: number; y: number };
  opacity: number;
  rotation: number;
}

interface Draw {
  cards: RevealedCard[];
  timestamp: number;
}

interface CLTRState {
  // User state
  wallet: string | null;
  chosenLGM: LGMType | null;
  isWhitelisted: boolean;

  // Draw state
  scrollProgress: number;
  drawAmount: number;
  rareChanceBoost: number;
  popOutCards: PreviewCard[];

  // Reveal state
  revealQueue: RevealedCard[];
  currentRevealIndex: number;
  isDrawing: boolean;
  isRevealing: boolean;

  // Auto-buyback
  autoBuybackTiers: RarityTier[];

  // Collection
  ownedCards: RevealedCard[];
  drawHistory: Draw[];
  totalBuybackEarned: number;

  // Actions
  connectWallet: () => void;
  disconnectWallet: () => void;
  chooseLGM: (lgm: LGMType) => void;
  setScrollProgress: (progress: number) => void;
  executeDraw: () => Promise<RevealedCard[]>;
  keepCard: (cardId: string) => void;
  buybackCard: (cardId: string) => number;
  nextReveal: () => void;
  spawnPopOut: () => void;
  clearReveal: () => void;
}

function randomOrbitPosition(): { x: number; y: number } {
  const angle = Math.random() * Math.PI * 2;
  const distance = 80 + Math.random() * 60;
  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 40,
  };
}

export const useCLTRStore = create<CLTRState>((set, get) => ({
  wallet: null,
  chosenLGM: null,
  isWhitelisted: false,
  scrollProgress: 0,
  drawAmount: 1,
  rareChanceBoost: 0,
  popOutCards: [],
  revealQueue: [],
  currentRevealIndex: 0,
  isDrawing: false,
  isRevealing: false,
  autoBuybackTiers: [],
  ownedCards: [],
  drawHistory: [],
  totalBuybackEarned: 0,

  connectWallet: () => {
    // Mock wallet connection
    const mockAddress =
      "0x" +
      Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");
    set({ wallet: mockAddress });
  },

  disconnectWallet: () => {
    set({ wallet: null, chosenLGM: null, isWhitelisted: false });
  },

  chooseLGM: (lgm) => {
    set({ chosenLGM: lgm, isWhitelisted: true });
  },

  setScrollProgress: (progress) => {
    const drawAmount = Math.ceil(progress * 10) || 1;
    const rareChanceBoost = Math.pow(progress, 1.5) * 50;
    set({ scrollProgress: progress, drawAmount, rareChanceBoost });

    if (Math.random() < progress * 0.15) {
      get().spawnPopOut();
    }
  },

  executeDraw: async () => {
    const { drawAmount, chosenLGM, rareChanceBoost, autoBuybackTiers } = get();
    if (!chosenLGM) return [];

    set({ isDrawing: true });
    const cards = await simulateDraw(chosenLGM, drawAmount, rareChanceBoost);

    const toReveal = cards.filter(
      (c) => !autoBuybackTiers.includes(c.tier)
    );
    const autoBuyback = cards.filter((c) =>
      autoBuybackTiers.includes(c.tier)
    );

    let buybackTotal = 0;
    for (const card of autoBuyback) {
      buybackTotal += card.fmv * 0.9;
    }

    set((state) => ({
      revealQueue: toReveal,
      currentRevealIndex: 0,
      isDrawing: false,
      isRevealing: toReveal.length > 0,
      totalBuybackEarned: state.totalBuybackEarned + buybackTotal,
      drawHistory: [...state.drawHistory, { cards, timestamp: Date.now() }],
    }));

    return toReveal;
  },

  keepCard: (cardId) => {
    const card = get().revealQueue.find((c) => c.id === cardId);
    if (!card) return;
    set((state) => ({
      ownedCards: [...state.ownedCards, card],
      currentRevealIndex: state.currentRevealIndex + 1,
      isRevealing: state.currentRevealIndex + 1 < state.revealQueue.length,
    }));
  },

  buybackCard: (cardId) => {
    const card = get().revealQueue.find((c) => c.id === cardId);
    if (!card) return 0;
    const buybackAmount = Math.round(card.fmv * 0.9);
    set((state) => ({
      totalBuybackEarned: state.totalBuybackEarned + buybackAmount,
      currentRevealIndex: state.currentRevealIndex + 1,
      isRevealing: state.currentRevealIndex + 1 < state.revealQueue.length,
    }));
    return buybackAmount;
  },

  nextReveal: () => {
    set((state) => ({
      currentRevealIndex: state.currentRevealIndex + 1,
      isRevealing: state.currentRevealIndex + 1 < state.revealQueue.length,
    }));
  },

  spawnPopOut: () => {
    const { rareChanceBoost, popOutCards } = get();
    const rarity = rollRarity(rareChanceBoost);
    const newCard: PreviewCard = {
      id: crypto.randomUUID(),
      rarity,
      position: randomOrbitPosition(),
      opacity: 0.7,
      rotation: Math.random() * 360,
    };
    set({ popOutCards: [...popOutCards.slice(-5), newCard] });
    setTimeout(() => {
      set((state) => ({
        popOutCards: state.popOutCards.filter((c) => c.id !== newCard.id),
      }));
    }, 1500);
  },

  clearReveal: () => {
    set({
      revealQueue: [],
      currentRevealIndex: 0,
      isRevealing: false,
    });
  },
}));
