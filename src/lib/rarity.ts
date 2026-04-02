export type RarityTier =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "diamond"
  | "radiant";

export interface RarityInfo {
  tier: RarityTier;
  odds: number;
  cardsPerDrop: number;
  fmvMin: number;
  fmvMax: number;
  color: string;
  glowColor: string;
  label: string;
}

export const rarityTiers: RarityInfo[] = [
  {
    tier: "bronze",
    odds: 74.7,
    cardsPerDrop: 1494,
    fmvMin: 70,
    fmvMax: 95,
    color: "#9CA3AF",
    glowColor: "rgba(156, 163, 175, 0.5)",
    label: "Bronze",
  },
  {
    tier: "silver",
    odds: 18.7,
    cardsPerDrop: 374,
    fmvMin: 95,
    fmvMax: 130,
    color: "#D1D5DB",
    glowColor: "rgba(209, 213, 219, 0.5)",
    label: "Silver",
  },
  {
    tier: "gold",
    odds: 4.7,
    cardsPerDrop: 94,
    fmvMin: 130,
    fmvMax: 250,
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.5)",
    label: "Gold",
  },
  {
    tier: "platinum",
    odds: 1.55,
    cardsPerDrop: 31,
    fmvMin: 250,
    fmvMax: 800,
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.5)",
    label: "Platinum",
  },
  {
    tier: "diamond",
    odds: 0.3,
    cardsPerDrop: 6,
    fmvMin: 800,
    fmvMax: 4000,
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.5)",
    label: "Diamond",
  },
  {
    tier: "radiant",
    odds: 0.05,
    cardsPerDrop: 1,
    fmvMin: 4000,
    fmvMax: 12000,
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.5)",
    label: "Radiant",
  },
];

export function getTierColor(tier: RarityTier): string {
  return rarityTiers.find((r) => r.tier === tier)?.color ?? "#9CA3AF";
}

export function getTierGlowColor(tier: RarityTier): string {
  const colors: Record<RarityTier, string> = {
    bronze: "#9CA3AF",
    silver: "#D1D5DB",
    gold: "#3B82F6",
    platinum: "#F59E0B",
    diamond: "#F59E0B",
    radiant: "rainbow",
  };
  return colors[tier];
}

export function rollRarity(rareChanceBoost: number): RarityTier {
  const roll = Math.random() * 100;
  const boost = rareChanceBoost / 50;

  if (roll < 0.05 * (1 + boost * 2)) return "radiant";
  if (roll < 0.35 * (1 + boost * 1.5)) return "diamond";
  if (roll < 1.9 * (1 + boost * 1.2)) return "platinum";
  if (roll < 6.6 * (1 + boost)) return "gold";
  if (roll < 25.3 * (1 + boost * 0.5)) return "silver";
  return "bronze";
}

export function rollFMV(tier: RarityTier): number {
  const info = rarityTiers.find((r) => r.tier === tier)!;
  return Math.round(
    info.fmvMin + Math.random() * (info.fmvMax - info.fmvMin)
  );
}
