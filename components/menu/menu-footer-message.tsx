"use client";

import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";

export function MenuFooterMessage() {
  const config = useStoreConfigStore((state) => state.config);

  if (!config || !config.menuFooterMessage) return null;

  return (
    <div className="mt-12 mb-8 bg-white/80 backdrop-blur-md border border-saffron-200/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-saffron-100 max-w-4xl mx-auto text-center">
      <p className="text-neutral-800 font-medium text-base md:text-lg leading-relaxed whitespace-pre-wrap">
        {config.menuFooterMessage}
      </p>
    </div>
  );
}
