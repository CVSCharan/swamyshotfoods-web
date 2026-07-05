"use client";

import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { motion, AnimatePresence } from "framer-motion";

export function MenuHeaderMessage() {
  const { config } = useStoreConfigStore();

  const message = config?.menuHeaderMessage;

  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 mt-4 bg-white/80 backdrop-blur-md border border-green-200/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-green-100 max-w-4xl mx-auto text-center"
      >
        <p className="text-neutral-800 font-medium text-base md:text-lg leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
