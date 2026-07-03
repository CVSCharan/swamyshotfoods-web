"use client";

import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { motion, AnimatePresence } from "framer-motion";

export function MenuFooterMessage() {
  const { config } = useStoreConfigStore();

  const message = config?.menuFooterMessage || "Placeholder Menu Footer Message: This is where your custom footer text from the admin panel will appear. For example: Packing charges Rs. 10 Extra.";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 mb-8 bg-white/80 backdrop-blur-md border border-saffron-200/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-saffron-100 max-w-4xl mx-auto text-center"
      >
        <p className="text-neutral-800 font-medium text-base md:text-lg leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
