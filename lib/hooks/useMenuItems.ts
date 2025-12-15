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
  ingredients: string[];
  allergens?: string[];
  dietaryLabels: string[];
  priority: number;
  imgSrc: string;
}

const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    _id: "1",
    name: "Idli (2 Pcs)",
    price: 40,
    desc: "Soft and fluffy steamed rice cakes served with chutney and sambar.",
    morningTimings: { startTime: "08:00", endTime: "12:00" },
    ingredients: ["Rice", "Urad Dal"],
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
    ingredients: ["Rice", "Urad Dal", "Ghee"],
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
    ingredients: ["Urad Dal", "Spices"],
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
    ingredients: ["Rice", "Moong Dal", "Ghee"],
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
    ingredients: ["Wheat Flour"],
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
    ingredients: ["Green Gram", "Ginger", "Spices"],
    dietaryLabels: ["vegetarian", "vegan", "gluten-free"],
    priority: 6,
    imgSrc: "/images/pesarattu.jpg",
  },
];

export function useMenuItems() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        // Use force-cache for better performance since menu rarely changes
        const res = await fetch(`${API_URL}/menu`, {
          cache: "force-cache",
          // @ts-ignore - Next.js specific option
          next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const items = await res.json();
        setMenuItems(items);
        setError(null);
        console.log("✅ Menu items loaded successfully");
      } catch (err) {
        console.warn("⚠️ API fetch failed, using mock data:", err);
        setMenuItems(MOCK_MENU_ITEMS);
        setError(null); // Clear error since we have fallback
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  return { menuItems, loading, error };
}
