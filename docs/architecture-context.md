# Web App Implementation Context & Architecture

## Overview
This repository (`swamyshotfoods-web`) is the Customer-Facing Next.js Application. It consumes data from the API and provides an SEO-friendly, fast, and real-time experience for end-users.

## Key Technologies
- **Next.js (App Router)**: React framework with Server Components and SSR.
- **Tailwind CSS**: Styling and UI design.
- **Zustand**: Global client-side state management.
- **Server-Sent Events (SSE)**: Real-time updates.

## System Architecture

### 1. Hybrid Rendering (SSR + Client Components)
- **Server-Side Fetching**: Pages like `/menu` use strict Server Components fetching (`fetch(..., { cache: 'no-store' })`). This ensures search engines see the full text (Menu items, footer messages) immediately on load.
- **Client-Side Live Updates**: Real-time features (like "Shop is Open" or "Cooking Active" badges) use Client Components and `useStoreConfigSSE.ts`. 

### 2. Global State & SSE Synchronization
- **`useStoreConfigSSE.ts`**: Connects to the API's `/api/store-config/sse` endpoint.
- **Zustand (`useStoreConfigStore.ts`)**: Holds the current store configuration globally.
- **Hydration Flow**: The app typically fetches static/SSR data on initial load. The SSE hook immediately takes over on the client-side to keep badges and messages synced without refreshing the page.

### 3. Error Handling & Fallbacks
- **API URL Fallback**: `lib/config.ts` handles `API_URL`. It falls back to `https://api.swamyshotfoods.in/api` if Vercel drops runtime variables.
- **Error Boundaries**: If Server Components fail to fetch from the API, they render graceful error UI components instead of crashing the app.

## Context Retrieval for AI Assistants
- **Styling**: Relies heavily on Tailwind gradients, `backdrop-blur`, and semantic colors (e.g., `saffron-500`).
- **Data Caching**: Next.js Router Cache can sometimes make Server-Fetched data appear stale during client-side navigation. For highly dynamic text, wrapping it in a Client Component that reads from Zustand (SSE) is the best practice.

### Mobile Optimization & Background Lifecycle
- **SSE Connection Management**: Both `useStoreConfigSSE` and `useMenuItems` hooks utilize the Page Visibility API (`document.hidden`). Connections and fetches automatically pause or refresh when the browser tab transitions between background and active states. This prevents endless reconnection loops and fixes issues where users see stale data after resuming the app hours later on a mobile device.
- **PWA / Service Worker (Serwist)**: Implemented using `@serwist/next`. Caches static assets, handles network fallbacks, and manages auto-updating via `sw.ts`. `app/manifest.ts` dynamically generates the web app manifest referencing the synced brand colors from `globals.css`.

### Known UI/UX Patterns & Fixes
- **Button asChild with Next Link**: When wrapping Next.js `<Link>` with Shadcn UI's `<Button asChild>`, animation wrappers like `motion.div` must be placed inside the `Link` (or wrap the `Button`), but not between them, to prevent click interception and hydration mismatch.
- **Badge Overflow**: Features like "Morning Special" or "Evening Special" on menu items use `shrink-0` and `whitespace-nowrap` within flex containers to prevent crushing/wrapping when item names are too long.
- **Themed Call-to-Action**: "Explore Menu" strictly utilizes the `green` palette, while secondary "Visit Us Today" actions use the `blue` palette for visual hierarchy.
