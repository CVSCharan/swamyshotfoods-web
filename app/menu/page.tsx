import { API_URL } from "@/lib/config";

export const dynamic = "force-dynamic";

import { MenuGrid } from "@/components/menu/menu-grid";
import { Sparkles, UtensilsCrossed } from "lucide-react";

interface MenuItem {
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

async function getMenuItems(): Promise<{ items: MenuItem[]; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/menu`, { cache: "no-store" });

    if (!res.ok) {
      return {
        items: [],
        error: `Failed to fetch: ${res.status} ${res.statusText}`,
      };
    }

    const items = await res.json();
    return { items };
  } catch (error) {
    console.error("Error fetching menu:", error);
    return {
      items: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default async function MenuPage() {
  const { items: menuItems, error } = await getMenuItems();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-green-900 text-white py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-green-100 text-sm font-medium">
            <Sparkles className="w-4 h-4 text-saffron-400" />
            <span>Authentic Flavors</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">
            Our Menu
          </h1>

          <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Experience the rich heritage of South Indian cuisine, crafted with
            passion and traditional recipes passed down through generations.
          </p>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100L48 91.7C96 83 192 67 288 58.3C384 50 480 50 576 58.3C672 67 768 83 864 83.3C960 83 1056 67 1152 58.3C1248 50 1344 50 1392 50L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
              fill="#fdfcfb"
            />
          </svg>
        </div>
      </section>

      {/* Menu Grid Section */}
      <section className="py-12 px-4 md:px-6 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-red-100">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-xl text-red-600 font-medium mb-2">
                Unable to load menu items
              </p>
              <p className="text-sm text-neutral-500">{error}</p>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <p className="text-xl text-neutral-600">No menu items found.</p>
            </div>
          ) : (
            <MenuGrid items={menuItems} />
          )}
        </div>
      </section>
    </div>
  );
}
