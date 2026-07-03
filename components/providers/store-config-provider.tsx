"use client";

import { useEffect, useRef } from "react";
import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { useStoreConfigSSE } from "@/lib/hooks/useStoreConfigSSE";

interface StoreConfigProviderProps {
  initialConfig: any;
  children: React.ReactNode;
}

export function StoreConfigProvider({
  initialConfig,
  children,
}: StoreConfigProviderProps) {
  const setConfig = useStoreConfigStore((state) => state.setConfig);
  const isInitialized = useRef(false);

  // Set the SSR initial config immediately (before hydration finishes if possible, or on mount)
  if (!isInitialized.current && initialConfig) {
    setConfig(initialConfig);
    isInitialized.current = true;
  }

  // Activate global SSE listening
  // useStoreConfigSSE handles connecting on mount and disconnecting on unmount
  useStoreConfigSSE();

  return <>{children}</>;
}
