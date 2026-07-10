"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  desc: string;
  timingTemplate?: string;
  morningTimings?: {
    startTime: string;
    endTime: string;
  };
  eveningTimings?: {
    startTime: string;
    endTime: string;
  };
  ingredients: string;
  allergens?: string[];
  dietaryLabels: string[];
  priority: number;
  imgSrc: string;
  morningSpecial?: boolean;
  eveningSpecial?: boolean;
  dosaSpecial?: boolean;
  popular?: boolean;
  chefSpecial?: boolean;
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    _id: "1",
    name: "Idli (2 Pcs)",
    price: 40,
    desc: "Soft and fluffy steamed rice cakes served with chutney and sambar.",
    morningTimings: { startTime: "08:00", endTime: "12:00" },
    ingredients: "Rice, Urad Dal",
    dietaryLabels: ["vegetarian", "vegan", "gluten-free"],
    priority: 1,
    imgSrc: "/images/idli.jpg",
  },
  {
    _id: "2",
    name: "Ghee Roast Dosa",
    price: 60,
    desc: "Crispy crepe made from fermented batter, roasted with ghee.",
    eveningTimings: { startTime: "17:45", endTime: "21:30" },
    ingredients: "Rice, Urad Dal, Ghee",
    dietaryLabels: ["vegetarian"],
    priority: 2,
    imgSrc: "/images/dosa.jpg",
  },
  {
    _id: "3",
    name: "Vada (2 Pcs)",
    price: 50,
    desc: "Crispy deep-fried savory donuts made from lentil batter.",
    morningTimings: { startTime: "08:00", endTime: "12:00" },
    ingredients: "Urad Dal, Spices",
    dietaryLabels: ["vegetarian", "vegan"],
    priority: 3,
    imgSrc: "/images/vada.jpg",
  },
  {
    _id: "4",
    name: "Pongal",
    price: 55,
    desc: "Comforting rice and lentil dish seasoned with black pepper, cumin, and ghee.",
    morningTimings: { startTime: "08:00", endTime: "12:00" },
    ingredients: "Rice, Moong Dal, Ghee",
    dietaryLabels: ["vegetarian"],
    priority: 4,
    imgSrc: "/images/pongal.jpg",
  },
  {
    _id: "5",
    name: "Poori (2 Pcs)",
    price: 70,
    desc: "Deep-fried bread served with potato masala.",
    morningTimings: { startTime: "08:00", endTime: "12:00" },
    ingredients: "Wheat Flour",
    allergens: ["Gluten"],
    dietaryLabels: ["vegetarian"],
    priority: 5,
    imgSrc: "/images/poori.jpg",
  },
  {
    _id: "6",
    name: "Pesarattu",
    price: 65,
    desc: "Whole green gram lentil crepe served with ginger chutney.",
    eveningTimings: { startTime: "17:45", endTime: "21:30" },
    ingredients: "Green Gram, Ginger, Spices",
    dietaryLabels: ["vegetarian", "vegan", "gluten-free"],
    priority: 6,
    imgSrc: "/images/pesarattu.jpg",
  },
];

export function useMenuItems(initialData?: MenuItem[]) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let isComponentMounted = true;

    async function fetchMenuItems() {
      if (!isComponentMounted) return;
      setLoading(true);
      try {
        // Use no-store to ensure we always get the latest menu items from the admin panel
        const res = await fetch(`${API_URL}/menu`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const items = await res.json();
        if (isComponentMounted) {
          setMenuItems(items);
          setError(null);
          console.log("✅ Menu items loaded successfully");
        }
      } catch (err) {
        if (isComponentMounted) {
          console.warn("⚠️ API fetch failed, using mock data:", err);
          setMenuItems(MOCK_MENU_ITEMS);
          setError(null); // Clear error since we have fallback
        }
      } finally {
        if (isComponentMounted) setLoading(false);
      }
    }

    function connectSSE() {
      if (eventSource?.readyState === EventSource.OPEN) return;

      try {
        console.log("🔌 Connecting to Menu SSE...");
        eventSource = new EventSource(`${API_URL}/menu/sse`);

        eventSource.onopen = () => {
          console.log("✅ Menu SSE Connected");
        };

        eventSource.onmessage = (event) => {
          if (!isComponentMounted) return;
          try {
            const data = JSON.parse(event.data);
            console.log("📦 Menu Status Update received via SSE");
            setMenuItems(data);
          } catch (err) {
            console.error("❌ Failed to parse Menu SSE data:", err);
          }
        };

        eventSource.onerror = () => {
          console.error("❌ Menu SSE Error occurred");
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }

          // Attempt to reconnect after delay
          reconnectTimeout = setTimeout(() => {
            if (isComponentMounted) {
              connectSSE();
            }
          }, 3000);
        };
      } catch (err) {
        console.error("❌ Failed to create EventSource for Menu:", err);
      }
    }

    function disconnectSSE() {
      console.log("🔌 Disconnecting Menu SSE...");
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
      if (eventSource) {
        eventSource.close();
        eventSource = null;
      }
    }

    // Initial fetch
    fetchMenuItems();

    // Start SSE Connection after short delay
    const connectTimer = setTimeout(() => {
      if (isComponentMounted) connectSSE();
    }, 500);

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("🙉 Tab became visible, resuming Menu SSE connection...");
        connectSSE();
        fetchMenuItems(); // fallback fetch to be safe
      } else {
        console.log("🙈 Tab hidden, pausing Menu SSE connection...");
        disconnectSSE();
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      isComponentMounted = false;
      clearTimeout(connectTimer);
      disconnectSSE();
      if (typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      }
    };
  }, []);

  return { menuItems, loading, error };
}
