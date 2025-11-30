# SSE Integration Guide: Next.js + Zustand

## Swamy's Hot Foods - Real-time Store Status

This guide shows how to consume the `/api/store-config/sse` endpoint in your Next.js frontend using Zustand for state management.

---

## 📁 Project Structure

```
swamyshotfoods-web/
  lib/
    stores/
      useStoreConfigStore.ts    # Zustand store
    hooks/
      useStoreConfigSSE.ts      # SSE connection hook
  components/
    store-status.tsx            # Store status component (Client Component)
  app/
    page.tsx                    # Homepage (can use the component)
```

---

## 1️⃣ Install Zustand

```bash
npm install zustand
```

---

## 2️⃣ Zustand Store (`lib/stores/useStoreConfigStore.ts`)

```typescript
import { create } from "zustand";

interface StoreConfig {
  isShopOpen: boolean;
  isCooking: boolean;
  isHoliday: boolean;
  holidayMessage: string;
  isNoticeActive: boolean;
  noticeMessage: string;
  description: string;
  currentStatusMsg: string;
}

interface StoreConfigStore {
  config: StoreConfig | null;
  isConnected: boolean;
  error: string | null;

  // Actions
  setConfig: (config: StoreConfig) => void;
  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  config: null,
  isConnected: false,
  error: null,
};

export const useStoreConfigStore = create<StoreConfigStore>((set) => ({
  ...initialState,

  setConfig: (config) => set({ config, error: null }),
  setConnected: (connected) => set({ isConnected: connected }),
  setError: (error) => set({ error, isConnected: false }),
  reset: () => set(initialState),
}));
```

---

## 3️⃣ Environment Variables

Update your `.env` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Your existing `lib/config.ts` already handles this:

```typescript
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
```

---

## 4️⃣ SSE Hook (`lib/hooks/useStoreConfigSSE.ts`)

```typescript
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
          console.log("📦 Store Status Update:", data);
          setConfig(data);
        } catch (err) {
          console.error("❌ Failed to parse SSE data:", err);
          setError("Failed to parse server data");
        }
      };

      eventSource.onerror = (error) => {
        console.error("❌ SSE Error:", error);
        setConnected(false);
        setError("Connection lost. Reconnecting...");

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
```

---

## 5️⃣ Store Status Component (`components/store-status.tsx`)

```typescript
"use client";

import React from "react";
import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { useStoreConfigSSE } from "@/lib/hooks/useStoreConfigSSE";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, Info } from "lucide-react";

export function StoreStatus() {
  // Connect to SSE (auto-connects on mount)
  useStoreConfigSSE();

  // Get data from Zustand store
  const { config, isConnected, error } = useStoreConfigStore();

  if (error) {
    return (
      <Card className="border-error-500 bg-error-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-error-700">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!config) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-neutral-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
            <p>Loading store status...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-heading text-green-900">
            {config.currentStatusMsg}
          </CardTitle>
          <Badge
            className={
              isConnected
                ? "bg-green-500 text-white"
                : "bg-neutral-400 text-white"
            }
          >
            {isConnected ? "🟢 Live" : "🔴 Offline"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg ${
              config.isShopOpen
                ? "bg-green-100 border-2 border-green-500"
                : "bg-neutral-100 border-2 border-neutral-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <div>
                <p className="text-sm text-neutral-600">Shop Status</p>
                <p className="font-semibold text-lg">
                  {config.isShopOpen ? "Open 🟢" : "Closed 🔴"}
                </p>
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${
              config.isCooking
                ? "bg-saffron-100 border-2 border-saffron-500"
                : "bg-neutral-100 border-2 border-neutral-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍🍳</span>
              <div>
                <p className="text-sm text-neutral-600">Kitchen</p>
                <p className="font-semibold text-lg">
                  {config.isCooking ? "Cooking 🔥" : "Not Cooking"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Holiday Banner */}
        {config.isHoliday && (
          <div className="p-4 rounded-lg bg-blue-100 border-2 border-blue-500">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌴</span>
              <div>
                <p className="font-semibold text-blue-900">Holiday</p>
                <p className="text-sm text-blue-700">{config.holidayMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Notice Board */}
        {config.isNoticeActive && (
          <div className="p-4 rounded-lg bg-saffron-100 border-2 border-saffron-500">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-saffron-700" />
              <div>
                <p className="font-semibold text-saffron-900">Notice</p>
                <p className="text-sm text-saffron-700">
                  {config.noticeMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {config.description && (
          <p className="text-neutral-700 text-sm leading-relaxed">
            {config.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 6️⃣ Usage in Homepage (`app/page.tsx`)

Add the store status component to your homepage:

```typescript
import { StoreStatus } from "@/components/store-status";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl mb-8">Swamy's Hot Foods</h1>

          {/* Live Store Status */}
          <StoreStatus />

          {/* Rest of your homepage content */}
        </div>
      </section>
    </div>
  );
}
```

---

## � Styling with Your Design System

The component uses your pure veg color system:

- **Green** (`bg-green-500`) - Shop open, live status
- **Blue** (`bg-blue-500`) - Holiday notices
- **Saffron** (`bg-saffron-500`) - Important notices
- **Neutral** - Closed/inactive states

---

## 🔧 Advanced: Battery Optimization

Add visibility detection to save battery when tab is hidden:

```typescript
// In useStoreConfigSSE.ts, add this useEffect:

useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      disconnect(); // Save battery when tab is hidden
    } else {
      connect(); // Reconnect when tab is visible
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}, []);
```

---

## 🎯 Best Practices for Next.js

### 1. **Client Components**

Always mark SSE components with `"use client"` directive:

```typescript
"use client";
```

### 2. **Environment Variables**

Use `NEXT_PUBLIC_` prefix for client-side variables:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 3. **Server-Side Rendering**

SSE only works on client side. Check for window:

```typescript
if (typeof window !== "undefined") {
  connect();
}
```

### 4. **Error Boundaries**

Wrap in Next.js error boundary:

```typescript
// app/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>SSE Connection Failed</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

---

## 🚀 Production Checklist

- ✅ Use `NEXT_PUBLIC_API_URL` environment variable
- ✅ Implement automatic reconnection (done)
- ✅ Handle visibility changes to save battery
- ✅ Add error boundaries
- ✅ Mark components with `"use client"`
- ✅ Check for `window` before connecting
- ✅ Clean up on unmount (done)
- ✅ Use TypeScript for type safety
- ✅ Test SSR compatibility

---

## 🐛 Debugging

```typescript
// Add to hook for debugging
console.log("EventSource readyState:", eventSource.readyState);
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSED

// Check if running on client
console.log("Is client:", typeof window !== "undefined");
```

---

## 📊 Testing with Next.js

```typescript
// __tests__/store-status.test.tsx
import { render, screen } from "@testing-library/react";
import { StoreStatus } from "@/components/store-status";

// Mock EventSource
global.EventSource = jest.fn(() => ({
  addEventListener: jest.fn(),
  close: jest.fn(),
  readyState: 1,
})) as any;

test("renders store status", () => {
  render(<StoreStatus />);
  expect(screen.getByText(/Loading store status/i)).toBeInTheDocument();
});
```

---

## 🔐 CORS Configuration

Ensure your backend has CORS enabled:

```typescript
// Backend: app.ts
import cors from "cors";

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
```

---

## 🌐 Deployment

### Vercel

Update environment variables in Vercel dashboard:

```
NEXT_PUBLIC_API_URL=https://api.swamyshotfoods.com/api
```

### Production URL

Update `lib/config.ts`:

```typescript
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.swamyshotfoods.com/api"
    : "http://localhost:5001/api");
```

---

## 📝 Summary

This integration provides:

- ✅ Real-time store status updates
- ✅ Automatic reconnection on disconnect
- ✅ Next.js App Router compatibility
- ✅ Pure veg design system integration
- ✅ TypeScript type safety
- ✅ Battery optimization
- ✅ Error handling

Your customers will see live updates about:

- 🟢 Shop open/closed status
- 👨‍🍳 Kitchen cooking status
- 🌴 Holiday announcements
- 📢 Important notices
