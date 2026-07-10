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
  ChefHat,
  Leaf,
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
  popular?: boolean;
  chefSpecial?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
}

// Helper function to format HH:MM to 12-hour AM/PM
function formatTo12Hour(timeStr: string): string {
  if (!timeStr) return "";
  if (timeStr.toLowerCase().includes("am") || timeStr.toLowerCase().includes("pm")) {
    return timeStr.toUpperCase();
  }
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;

  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  if (isNaN(hour) || isNaN(minute)) return timeStr;

  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const minuteFormatted = minute < 10 ? `0${minute}` : minute;

  return `${hour12}:${minuteFormatted} ${ampm}`;
}

// Helper function to get time slot for an item
function getTimeSlot(item: MenuItem): string {
  const hasMorning = !!(
    item.morningTimings &&
    item.morningTimings.startTime?.trim() &&
    item.morningTimings.endTime?.trim()
  );
  const hasEvening = !!(
    item.eveningTimings &&
    item.eveningTimings.startTime?.trim() &&
    item.eveningTimings.endTime?.trim()
  );

  if (hasMorning && hasEvening) return "All Day";
  if (hasMorning) return "Morning";
  if (hasEvening) return "Evening";
  return "Anytime";
}

// Helper function to format timing display
function formatTimings(item: MenuItem): string {
  const parts: string[] = [];
  if (item.morningTimings && item.morningTimings.startTime?.trim() && item.morningTimings.endTime?.trim()) {
    parts.push(
      `${formatTo12Hour(item.morningTimings.startTime)}-${formatTo12Hour(item.morningTimings.endTime)}`
    );
  }
  if (item.eveningTimings && item.eveningTimings.startTime?.trim() && item.eveningTimings.endTime?.trim()) {
    parts.push(
      `${formatTo12Hour(item.eveningTimings.startTime)}-${formatTo12Hour(item.eveningTimings.endTime)}`
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
                {/* FRONT SIDE - Menu Item Card */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-200 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden rounded-t-2xl bg-neutral-50">
                    <motion.div
                      className="relative h-full w-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <MenuItemImage src={item.imgSrc} alt={item.name} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex-1 pr-2">
                        <h3 className="font-heading text-lg md:text-xl font-bold text-neutral-900 leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <div className="shrink-0">
                        <p className="text-xl md:text-2xl font-bold text-neutral-900 tabular-nums tracking-tight">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-neutral-500 text-[11px] font-medium mb-3">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {formatTimings(item)}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.popular && (
                        <span className="whitespace-nowrap flex items-center text-[10px] font-semibold uppercase tracking-wider text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded-sm border border-saffron-100 shrink-0">
                          Popular
                        </span>
                      )}
                      {item.chefSpecial && (
                        <span className="whitespace-nowrap flex items-center text-[10px] font-semibold uppercase tracking-wider text-violet-700 bg-violet-50 px-2 py-0.5 rounded-sm border border-violet-100 shrink-0">
                          Chef Special
                        </span>
                      )}
                      {item.morningSpecial && (
                        <span className="whitespace-nowrap flex items-center text-[10px] font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-100 shrink-0">
                          Morning Special
                        </span>
                      )}
                      {item.eveningSpecial && (
                        <span className="flex items-center text-[10px] font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm border border-indigo-100 shrink-0">
                          Evening Special
                        </span>
                      )}
                      {item.dosaSpecial && (
                        <span className="flex items-center text-[10px] font-semibold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-100 shrink-0">
                          Dosa Special
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                          Allergens
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-sm"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.dietaryLabels && item.dietaryLabels.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                          Dietary Preferences
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.dietaryLabels.map((label, i) => {
                            return (
                              <span
                                key={i}
                                className="text-[10px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-sm"
                              >
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Ingredients Preview */}
                    {item.ingredients && item.ingredients.trim() && (
                      <div className="pt-4 mt-auto">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 border-t border-neutral-100 pt-4">
                          Key Ingredients
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {item.ingredients}
                        </p>
                      </div>
                    )}
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
