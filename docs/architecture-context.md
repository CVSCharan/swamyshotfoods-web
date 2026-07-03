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
