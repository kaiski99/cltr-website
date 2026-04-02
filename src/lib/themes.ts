export type LGMType = "blaze" | "tidal" | "forest";

export interface LGMTheme {
  name: string;
  tagline: string;
  icon: string;
  poolSize: number;
  drawPrice: number;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  gacha: {
    topColor: string;
    bottomColor: string;
    bandColor: string;
  };
  particles: {
    type: "fire" | "bubbles" | "leaves";
    colors: string[];
  };
  featuredCards: string[];
  radiantCard: string;
}

export const themes: Record<LGMType, LGMTheme> = {
  blaze: {
    name: "Blaze LGM",
    tagline: "Fire & Dragon",
    icon: "🔥",
    poolSize: 2000,
    drawPrice: 100,
    colors: {
      primary: "#E8593C",
      secondary: "#FF8C00",
      accent: "#FFD700",
      glow: "rgba(232, 89, 60, 0.5)",
    },
    gacha: {
      topColor: "#E8593C",
      bottomColor: "#FF6B35",
      bandColor: "#8B0000",
    },
    particles: {
      type: "fire",
      colors: ["#FF4500", "#FF6B35", "#FFD700"],
    },
    featuredCards: ["Charizard VMAX", "Dragonite V", "Arcanine EX"],
    radiantCard: "Charizard Illustrator",
  },
  tidal: {
    name: "Tidal LGM",
    tagline: "Water & Ice",
    icon: "💧",
    poolSize: 2000,
    drawPrice: 100,
    colors: {
      primary: "#3B82F6",
      secondary: "#06B6D4",
      accent: "#67E8F9",
      glow: "rgba(59, 130, 246, 0.5)",
    },
    gacha: {
      topColor: "#3B82F6",
      bottomColor: "#0EA5E9",
      bandColor: "#1E3A5F",
    },
    particles: {
      type: "bubbles",
      colors: ["#60A5FA", "#67E8F9", "#FFFFFF"],
    },
    featuredCards: ["Blastoise VMAX", "Gyarados EX", "Lapras V"],
    radiantCard: "Blastoise Illustrator",
  },
  forest: {
    name: "Forest LGM",
    tagline: "Grass & Nature",
    icon: "🌿",
    poolSize: 2000,
    drawPrice: 100,
    colors: {
      primary: "#22C55E",
      secondary: "#84CC16",
      accent: "#BEF264",
      glow: "rgba(34, 197, 94, 0.5)",
    },
    gacha: {
      topColor: "#22C55E",
      bottomColor: "#4ADE80",
      bandColor: "#14532D",
    },
    particles: {
      type: "leaves",
      colors: ["#22C55E", "#84CC16", "#BEF264"],
    },
    featuredCards: ["Venusaur VMAX", "Sceptile EX", "Leafeon V"],
    radiantCard: "Venusaur Illustrator",
  },
};
