"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCLTRStore } from "@/stores/cltr";
import { themes } from "@/lib/themes";

export function Header() {
  const { wallet, connectWallet, disconnectWallet, chosenLGM } =
    useCLTRStore();

  const theme = chosenLGM ? themes[chosenLGM] : null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <motion.span
            className="text-2xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            CLTR
          </motion.span>
          {theme && (
            <span
              className="text-xs px-2 py-1 rounded-full border"
              style={{
                borderColor: theme.colors.primary,
                color: theme.colors.primary,
              }}
            >
              {theme.icon} {theme.name}
            </span>
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/choose" className="hover:text-white transition-colors">
            Choose LGM
          </Link>
          {chosenLGM && (
            <Link
              href={`/gacha/${chosenLGM}`}
              className="hover:text-white transition-colors"
              style={{ color: theme?.colors.primary }}
            >
              My Gacha
            </Link>
          )}
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={wallet ? disconnectWallet : connectWallet}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            wallet
              ? "bg-white/10 text-white hover:bg-white/20"
              : "bg-white text-black hover:bg-gray-200"
          }`}
        >
          {wallet
            ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
            : "Connect Wallet"}
        </motion.button>
      </div>
    </header>
  );
}
