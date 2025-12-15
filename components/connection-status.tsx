"use client";

import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { WifiOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ConnectionStatus() {
  const { isConnected, config } = useStoreConfigStore();

  // Only show when disconnected AND we have had initial data
  // (Don't show on first load before connection is established)
  const shouldShow = !isConnected && config !== null;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 shadow-xl max-w-xs"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <WifiOff className="w-5 h-5 text-amber-600 flex-shrink-0" />
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">
                Reconnecting...
              </p>
              <p className="text-xs text-amber-600">
                Live updates temporarily unavailable
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
