"use client";

import { motion } from "framer-motion";

const links = [
  { label: "Twitter", href: "#" },
  { label: "Discord", href: "#" },
  { label: "Docs", href: "#" },
  { label: "OpenSea", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tight">CLTR Protocol</h3>
            <p className="text-sm text-gray-500 mt-1">
              Phygital Pokemon TCG Collectibles on HyperEVM
            </p>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                whileHover={{ y: -2 }}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} CLTR Protocol. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
