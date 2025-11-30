"use client";

import { useEffect, useRef } from "react";
import { useStoreConfigStore } from "../stores/useStoreConfigStore";
import { API_URL } from "../config";

const SSE_URL = `${API_URL}/store-config/sse`;
const RECONNECT_DELAY = 3000; // 3 seconds

export const useStoreConfigSSE = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setConfig, setConnected, setError } = useStoreConfigStore();

  const connect = () => {
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
        } catch (err) {
          console.error("❌ Failed to parse SSE data:", err);
          setError("Failed to parse server data");
        }
      };

      eventSource.onerror = (error) => {
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
  };

  const disconnect = () => {
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
  };

  useEffect(() => {
    // Only connect on client side
    if (typeof window !== "undefined") {
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, []);

  return { disconnect };
};
