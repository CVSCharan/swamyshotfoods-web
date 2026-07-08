"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MenuItemImage } from "@/components/menu-item-image";
import {
  Search,
  UtensilsCrossed,
  Clock,
  Flame,
  Grid3x3,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";
import { Button } from "../ui/button";
import { useMenuItems } from "@/lib/hooks/useMenuItems";

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
  ingredients: string;
  allergens?: string[];
  dietaryLabels: string[];
  priority: number;
  imgSrc: string;
  morningSpecial?: boolean;
  eveningSpecial?: boolean;
  dosaSpecial?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
}

// Helper function to get time slot for an item
function getTimeSlot(item: MenuItem): string {
  const hasMorning =
    item.morningTimings !== null && item.morningTimings !== undefined;
  const hasEvening =
    item.eveningTimings !== null && item.eveningTimings !== undefined;

  if (hasMorning && hasEvening) return "All Day";
  if (hasMorning) return "Morning";
  if (hasEvening) return "Evening";
  return "Anytime";
}

// Helper function to format timing display
function formatTimings(item: MenuItem): string {
  const parts: string[] = [];
  if (item.morningTimings) {
    parts.push(
      `${item.morningTimings.startTime}-${item.morningTimings.endTime}`
    );
  }
  if (item.eveningTimings) {
    parts.push(
      `${item.eveningTimings.startTime}-${item.eveningTimings.endTime}`
    );
  }
  return parts.join(" & ") || "Anytime";
}

export function MenuGrid({ items: initialItems }: MenuGridProps) {
  const [timeSlotFilter, setTimeSlotFilter] = useState("All");
  const { menuItems } = useMenuItems(initialItems);

  // Use the live menu items from the SSE stream, fall back to initial SSR data if empty
  const activeItems = menuItems.length > 0 ? menuItems : initialItems;

  // Console log all menu items
  console.log("📋 Active Menu Items:", activeItems);
  console.log("📊 Total Items Count:", activeItems.length);

  // Extract unique time slots
  const timeSlots = [
    "All",
    ...Array.from(new Set(activeItems.map((i) => getTimeSlot(i)))).sort(),
  ];

  // Better display names for filters
  const getDisplayName = (slot: string) => {
    const nameMap: Record<string, string> = {
      All: "View All",
      "All Day": "Breakfast & Dinner",
      Morning: "Breakfast",
      Evening: "Dinner",
      Anytime: "Anytime",
    };
    return nameMap[slot] || slot;
  };

  // Icons for each filter
  const getFilterIcon = (slot: string) => {
    const iconMap: Record<string, any> = {
      All: Grid3x3,
      "All Day": Sun,
      Morning: Coffee,
      Evening: Moon,
      Anytime: Clock,
    };
    return iconMap[slot] || Clock;
  };

  const filteredItems = activeItems.filter((item) => {
    return timeSlotFilter === "All" || getTimeSlot(item) === timeSlotFilter;
  });

  // Console log filtered items
  console.log("🔍 Time Slot Filter:", timeSlotFilter);
  console.log("✅ Filtered Items:", filteredItems);
  console.log("📈 Filtered Count:", filteredItems.length);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Island Style Filter */}
      <div className="sticky top-24 z-30 flex justify-center px-4">
        <div className="bg-gradient-to-br from-white via-green-50/40 to-white backdrop-blur-xl p-3 md:p-4 rounded-full border-2 border-green-100 shadow-xl max-w-fit">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {timeSlots.map((slot) => {
              const Icon = getFilterIcon(slot);
              return (
                <Button
                  key={slot}
                  onClick={() => setTimeSlotFilter(slot)}
                  className={`px-3 md:px-4 py-2 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap ${
                    timeSlotFilter === slot
                      ? "bg-green-600 text-white shadow-lg scale-105"
                      : "bg-white/80 text-neutral-700 hover:bg-green-50 hover:text-green-700 border border-neutral-200 hover:border-green-400 hover:scale-105"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">
                    {getDisplayName(slot)}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group h-full"
              style={{ perspective: "1000px" }}
            >
              <motion.div className="relative w-full h-full">
                <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 border border-neutral-100 h-full flex flex-col group/card">
                  {/* Image Section */}
                  <div className="relative h-[240px] overflow-hidden bg-neutral-50">
                    <motion.div
                      className="relative h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <MenuItemImage src={item.imgSrc} alt={item.name} />
                    </motion.div>
                    
                    {/* Floating Badges Top Right */}
                    <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
                      {item.priority < 2 && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-orange-700 bg-orange-50/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-orange-200/50">
                          <Flame className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                      {item.morningSpecial && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-sky-200/50">
                          <Sun className="w-3 h-3" />
                          Morning Special
                        </span>
                      )}
                      {item.eveningSpecial && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-indigo-200/50">
                          <Moon className="w-3 h-3" />
                          Evening Special
                        </span>
                      )}
                      {item.dosaSpecial && (
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-rose-700 bg-rose-50/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-rose-200/50">
                          <Flame className="w-3 h-3" />
                          Dosa Special
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    {/* Header: Title and Price */}
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h3 className="font-heading text-2xl font-bold text-neutral-900 leading-tight group-hover/card:text-green-700 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <p className="text-2xl font-bold text-green-700 tabular-nums shrink-0 tracking-tight">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Description */}
                    {item.desc && (
                      <p className="text-sm text-neutral-500 leading-relaxed mb-6 whitespace-pre-wrap">
                        {item.desc.trim()}
                      </p>
                    )}

                    {/* Dietary & Allergens */}
                    {(item.dietaryLabels?.length > 0 || item.allergens?.length > 0) && (
                      <div className="flex flex-wrap items-center gap-2 mb-6">
                        {item.dietaryLabels?.map((label, i) => (
                          <span key={`diet-${i}`} className="text-[10px] font-semibold text-green-700 uppercase tracking-wider bg-green-50 border border-green-100/50 px-2.5 py-1 rounded-md">
                            {label}
                          </span>
                        ))}
                        {item.allergens?.map((allergen, i) => (
                          <span key={`allergen-${i}`} className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-md">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer: Ingredients */}
                    <div className="mt-auto">
                      {item.ingredients && (
                        <div className="pt-4 border-t border-neutral-100">
                          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                            Key Ingredients
                          </p>
                          <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                            {item.ingredients}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>


              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900">
            No items found
          </h3>
          <p className="text-neutral-500">Try adjusting your filter</p>
        </div>
      )}
    </div>
  );
}
