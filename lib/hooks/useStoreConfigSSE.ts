"use client";

import { useEffect, useState } from "react";
import { useRef, useCallback } from "react";
import { useStoreConfigStore } from "../stores/useStoreConfigStore";
import { API_URL } from "../config";

const SSE_URL = `${API_URL}/store-config/sse`;
const REST_URL = `${API_URL}/store-config`;
const RECONNECT_DELAY = 3000; // 3 seconds

export const useStoreConfigSSE = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasInitialDataRef = useRef(false);
  const { setConfig, setConnected, setError } = useStoreConfigStore();

  // Fetch initial data via REST for immediate display
  const fetchInitialData = useCallback(async () => {
    if (hasInitialDataRef.current) return;

    try {
      const response = await fetch(REST_URL, { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
        hasInitialDataRef.current = true;
        console.log("✅ Initial store config loaded via REST");
      }
    } catch (err) {
      console.warn("⚠️ Failed to fetch initial config:", err);
      // Don't set error - SSE will handle it
    }
  }, [setConfig]);

  const connect = useCallback(() => {
    // Prevent multiple connections
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      return;
    }

    try {
      const eventSource = new EventSource(SSE_URL);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        console.log("✅ SSE Connected to Swamy's Hot Foods");
        setConnected(true);
        setError(null);
      };

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          // console.log("📦 Store Status Update:", data);
          setConfig(data);
          hasInitialDataRef.current = true;
        } catch (err) {
          console.error("❌ Failed to parse SSE data:", err);
          setError("Failed to parse server data");
        }
      };

      eventSource.onerror = () => {
        // console.error("❌ SSE Error:", error);
        setConnected(false);
        // Don't set error visible to user for simple disconnects, just reconnect

        // Close the connection
        eventSource.close();

        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log("🔄 Attempting to reconnect...");
          connect();
        }, RECONNECT_DELAY);
      };
    } catch (err) {
      console.error("❌ Failed to create EventSource:", err);
      setError("Failed to connect to server");
    }
  }, [setConnected, setError, setConfig]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setConnected(false);
      console.log("🔌 SSE Disconnected");
    }
  }, [setConnected]);

  useEffect(() => {
    // Only connect on client side
    if (typeof window !== "undefined") {
      // Fetch initial data immediately for fast display
      fetchInitialData();
      // Then establish SSE connection for real-time updates
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [connect, disconnect, fetchInitialData]);

  return { disconnect };
};
