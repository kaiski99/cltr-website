"use client";

import { motion, AnimatePresence } from "framer-motion";
import { type LGMTheme, type LGMType } from "@/lib/themes";

interface ConfirmModalProps {
  isOpen: boolean;
  lgm: LGMType | null;
  theme: LGMTheme | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  theme,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!theme) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onCancel}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="bg-[#111] border-2 rounded-3xl max-w-md w-full p-8 text-center relative overflow-hidden"
              style={{ borderColor: `${theme.colors.primary}40` }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `radial-gradient(circle at center, ${theme.colors.primary}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  {theme.icon}
                </motion.div>

                <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>
                <p className="text-gray-400 mb-2">
                  You&apos;re about to choose the{" "}
                  <span
                    className="font-bold"
                    style={{ color: theme.colors.primary }}
                  >
                    {theme.name}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  This decision is <span className="text-red-400 font-bold">permanent</span>.
                  You cannot switch to another LGM.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-colors font-medium"
                  >
                    Go Back
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onConfirm}
                    className="flex-1 py-3 rounded-xl font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    }}
                  >
                    I Choose {theme.name.replace(" LGM", "")}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
