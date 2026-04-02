"use client";

import { themes, type LGMType, type LGMTheme } from "@/lib/themes";

export function usePackTheme(lgm: LGMType | null): LGMTheme | null {
  if (!lgm) return null;
  return themes[lgm] ?? null;
}
