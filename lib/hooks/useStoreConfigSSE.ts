"use client";

import { useEffect, useRef, useCallback } from "react";
import { useStoreConfigStore } from "../stores/useStoreConfigStore";
import { API_URL } from "../config";

const SSE_URL = `${API_URL}/store-config/sse`;
const REST_URL = `${API_URL}/store-config`;
const RECONNECT_DELAY = 3000; // 3 seconds
const MAX_RECONNECT_ATTEMPTS = 5;

export const useStoreConfigSSE = () => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const hasInitialDataRef = useRef(false);
  const isMountedRef = useRef(true);

  const { setConfig, setConnected, setError } = useStoreConfigStore();

  // Fetch initial data via REST for immediate display
  const fetchInitialData = useCallback(async () => {
    if (hasInitialDataRef.current || !isMountedRef.current) return;

    try {
      console.log("🔄 Fetching initial store config via REST...");
      const response = await fetch(REST_URL, {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (isMountedRef.current) {
          setConfig(data);
          hasInitialDataRef.current = true;
          console.log("✅ Initial store config loaded via REST");
        }
      } else {
        console.warn("⚠️ REST API returned status:", response.status);
      }
    } catch (err) {
      console.warn("⚠️ Failed to fetch initial config:", err);
      // Don't set error - SSE will handle it
    }
  }, [setConfig]);

  const connect = useCallback(() => {
    // Prevent multiple connections
    if (eventSourceRef.current?.readyState === EventSource.OPEN) {
      console.log("⚠️ SSE already connected, skipping...");
      return;
    }

    // Check if we've exceeded max reconnect attempts
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      console.error(
        "❌ Max reconnect attempts reached. Stopping reconnection."
      );
      setError("Unable to establish real-time connection");
      return;
    }

    try {
      console.log(
        `🔌 Connecting to SSE... (Attempt ${
          reconnectAttemptsRef.current + 1
        }/${MAX_RECONNECT_ATTEMPTS})`
      );
      const eventSource = new EventSource(SSE_URL);
      eventSourceRef.current = eventSource;

      eventSource.onopen = () => {
        if (!isMountedRef.current) return;
        console.log("✅ SSE Connected to Swamy's Hot Foods");
        setConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0; // Reset counter on successful connection
      };

      eventSource.onmessage = (event) => {
        if (!isMountedRef.current) return;
        try {
          const data = JSON.parse(event.data);
          console.log("📦 Store Status Update received via SSE");
          setConfig(data);
          hasInitialDataRef.current = true;

          // Reset reconnect attempts on successful message
          reconnectAttemptsRef.current = 0;
        } catch (err) {
          console.error("❌ Failed to parse SSE data:", err);
          setError("Failed to parse server data");
        }
      };

      eventSource.onerror = (error) => {
        if (!isMountedRef.current) return;

        console.error("❌ SSE Error occurred");
        setConnected(false);

        // Close the connection
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }

        // Increment reconnect attempts
        reconnectAttemptsRef.current++;

        // Attempt to reconnect after delay if under max attempts
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
              console.log(
                `🔄 Attempting to reconnect... (${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`
              );
              connect();
            }
          }, RECONNECT_DELAY);
        } else {
          console.error("❌ Max reconnect attempts reached");
          setError("Unable to maintain real-time connection");
        }
      };
    } catch (err) {
      console.error("❌ Failed to create EventSource:", err);
      setError("Failed to connect to server");
    }
  }, [setConnected, setError, setConfig]);

  const disconnect = useCallback(() => {
    console.log("🔌 Disconnecting SSE...");

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setConnected(false);
      console.log("✅ SSE Disconnected");
    }
  }, [setConnected]);

  useEffect(() => {
    isMountedRef.current = true;

    // Only connect on client side
    if (typeof window !== "undefined") {
      // Fetch initial data immediately for fast display
      fetchInitialData();

      // Then establish SSE connection for real-time updates
      // Small delay to let REST fetch complete first
      const connectTimer = setTimeout(() => {
        if (isMountedRef.current) {
          connect();
        }
      }, 500);

      // Cleanup
      return () => {
        isMountedRef.current = false;
        clearTimeout(connectTimer);
        disconnect();
      };
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [connect, disconnect, fetchInitialData]);

  return { disconnect };
};
