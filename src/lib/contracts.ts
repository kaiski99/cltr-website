// Placeholder for Web3 contract interactions
// In production, these would interact with HyperEVM smart contracts

import { type LGMType } from "./themes";
import { rollRarity, rollFMV, type RarityTier } from "./rarity";

export interface RevealedCard {
  id: string;
  name: string;
  tier: RarityTier;
  fmv: number;
  grade: string;
  imageUrl: string;
}

// Tier-specific card pools per LGM
const cardPools: Record<LGMType, Record<RarityTier, string[]>> = {
  blaze: {
    bronze: [
      "Charmander",
      "Vulpix",
      "Growlithe",
      "Ponyta",
      "Magmar",
      "Flareon",
      "Cyndaquil",
      "Slugma",
      "Torchic",
      "Numel",
      "Chimchar",
      "Magby",
      "Litwick",
      "Fletchling",
      "Salandit",
      "Scorbunny",
      "Sizzlipede",
      "Rolycoly",
      "Larvesta",
      "Heatmor",
    ],
    silver: [
      "Charmeleon V",
      "Ninetales EX",
      "Rapidash V",
      "Magmortar EX",
      "Quilava VSTAR",
      "Torkoal V",
      "Combusken EX",
      "Magcargo V",
      "Monferno EX",
      "Lampent V",
      "Talonflame EX",
      "Salazzle V",
      "Cinderace V",
      "Centiskorch EX",
      "Coalossal V",
    ],
    gold: [
      "Arcanine EX",
      "Blaziken VSTAR",
      "Typhlosion V",
      "Infernape EX",
      "Chandelure VMAX",
      "Volcarona V",
      "Heatran EX",
      "Entei V",
      "Darmanitan VSTAR",
      "Cinderace VMAX",
    ],
    platinum: [
      "Reshiram GX",
      "Ho-Oh VSTAR",
      "Salamence VMAX",
      "Dragonite V",
      "Moltres VMAX",
      "Victini VSTAR",
    ],
    diamond: [
      "Charizard VMAX",
      "Rayquaza VSTAR",
      "Charizard GX (Shiny)",
    ],
    radiant: ["Charizard Illustrator"],
  },
  tidal: {
    bronze: [
      "Squirtle",
      "Psyduck",
      "Poliwag",
      "Tentacool",
      "Seel",
      "Shellder",
      "Horsea",
      "Staryu",
      "Totodile",
      "Marill",
      "Mudkip",
      "Lotad",
      "Corphish",
      "Feebas",
      "Piplup",
      "Buizel",
      "Shellos",
      "Oshawott",
      "Tympole",
      "Froakie",
    ],
    silver: [
      "Wartortle V",
      "Golduck EX",
      "Poliwhirl V",
      "Tentacruel EX",
      "Dewgong V",
      "Cloyster EX",
      "Seadra V",
      "Starmie EX",
      "Croconaw V",
      "Azumarill EX",
      "Marshtomp V",
      "Lombre EX",
      "Crawdaunt V",
      "Prinplup EX",
      "Floatzel V",
    ],
    gold: [
      "Gyarados EX",
      "Lapras V",
      "Greninja EX",
      "Empoleon VSTAR",
      "Swampert VMAX",
      "Kingdra V",
      "Milotic EX",
      "Wailord V",
      "Jellicent VSTAR",
      "Toxapex VMAX",
    ],
    platinum: [
      "Suicune VSTAR",
      "Kyogre GX",
      "Palkia VSTAR",
      "Articuno VMAX",
      "Lugia V",
      "Manaphy VSTAR",
    ],
    diamond: [
      "Blastoise VMAX",
      "Gyarados VMAX (Shiny)",
      "Kyogre VMAX",
    ],
    radiant: ["Blastoise Illustrator"],
  },
  forest: {
    bronze: [
      "Bulbasaur",
      "Oddish",
      "Bellsprout",
      "Exeggcute",
      "Tangela",
      "Chikorita",
      "Hoppip",
      "Sunkern",
      "Treecko",
      "Seedot",
      "Shroomish",
      "Roselia",
      "Turtwig",
      "Budew",
      "Cherubi",
      "Snivy",
      "Cottonee",
      "Chespin",
      "Rowlet",
      "Grookey",
    ],
    silver: [
      "Ivysaur V",
      "Gloom EX",
      "Weepinbell V",
      "Exeggutor EX",
      "Bayleef V",
      "Skiploom EX",
      "Sunflora V",
      "Grovyle EX",
      "Nuzleaf V",
      "Breloom EX",
      "Roselia V",
      "Grotle EX",
      "Servine V",
      "Whimsicott EX",
      "Quilladin V",
    ],
    gold: [
      "Sceptile EX",
      "Leafeon V",
      "Decidueye EX",
      "Torterra VSTAR",
      "Serperior VMAX",
      "Roserade V",
      "Lurantis EX",
      "Tsareena VSTAR",
      "Rillaboom VMAX",
      "Gogoat V",
    ],
    platinum: [
      "Celebi VSTAR",
      "Shaymin GX",
      "Virizion VSTAR",
      "Zarude V",
      "Tapu Bulu VMAX",
      "Kartana VSTAR",
    ],
    diamond: [
      "Venusaur VMAX",
      "Sceptile VMAX (Shiny)",
      "Celebi VMAX",
    ],
    radiant: ["Venusaur Illustrator"],
  },
};

const grades: Record<RarityTier, string[]> = {
  bronze: ["PSA 7", "PSA 8", "CGC 8", "BGS 8", "PSA 7.5", "CGC 7.5"],
  silver: ["PSA 8", "PSA 8.5", "CGC 8.5", "BGS 8.5", "PSA 9", "CGC 9"],
  gold: ["PSA 9", "CGC 9", "BGS 9", "PSA 9.5", "CGC 9.5"],
  platinum: ["PSA 9.5", "CGC 9.5", "BGS 9.5", "PSA 10"],
  diamond: ["PSA 10", "CGC 10", "BGS 10", "BGS Black Label 10"],
  radiant: ["PSA 10", "CGC Pristine 10", "BGS Black Label 10"],
};

export async function simulateDraw(
  lgm: LGMType,
  drawCount: number,
  rareBoost: number
): Promise<RevealedCard[]> {
  await new Promise((r) => setTimeout(r, 800));

  const pool = cardPools[lgm];
  const cards: RevealedCard[] = [];

  for (let i = 0; i < drawCount; i++) {
    const tier = rollRarity(rareBoost);
    const tierPool = pool[tier];
    const tierGrades = grades[tier];
    const name = tierPool[Math.floor(Math.random() * tierPool.length)];
    const grade = tierGrades[Math.floor(Math.random() * tierGrades.length)];
    const fmv = rollFMV(tier);

    cards.push({
      id: crypto.randomUUID(),
      name,
      tier,
      fmv,
      grade,
      imageUrl: `/cards/${lgm}-placeholder.png`,
    });
  }

  return cards;
}
