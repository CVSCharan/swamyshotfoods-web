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
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    <motion.div
                      className="relative h-full w-full"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <MenuItemImage src={item.imgSrc} alt={item.name} />
                    </motion.div>

                    <div className="absolute bottom-8 left-4 z-20 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <Clock className="w-3 h-3" />
                      {formatTimings(item)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-neutral-800 group-hover:text-green-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-3xl font-extrabold text-secondary mt-1 tabular-nums tracking-tight">
                          ₹{item.price}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
                        {item.popular && (
                          <motion.span 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                            className="whitespace-nowrap flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-saffron-200 shadow-[0_2px_10px_-3px_rgba(245,158,11,0.2)] shrink-0"
                          >
                            <Flame className="w-3 h-3 fill-current shrink-0" />
                            Popular
                          </motion.span>
                        )}
                        {item.chefSpecial && (
                          <motion.span 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                            className="whitespace-nowrap flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-violet-200 shadow-[0_2px_10px_-3px_rgba(139,92,246,0.2)] shrink-0"
                          >
                            <ChefHat className="w-3 h-3 fill-current shrink-0" />
                            Chef Special
                          </motion.span>
                        )}
                        {item.morningSpecial && (
                          <span className="whitespace-nowrap flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-600 bg-sky-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-sky-200 shrink-0">
                            <Sun className="w-3 h-3 fill-current shrink-0" />
                            Morning Special
                          </span>
                        )}
                        {item.eveningSpecial && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-indigo-200">
                            <Moon className="w-3 h-3 fill-current" />
                            Evening Special
                          </span>
                        )}
                        {item.dosaSpecial && (
                          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-rose-200">
                            <Flame className="w-3 h-3 fill-current" />
                            Dosa Special
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {item.desc}
                    </p>

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-[10px] font-semibold text-amber-800 uppercase tracking-wide mb-1">
                          Allergens
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.dietaryLabels && item.dietaryLabels.length > 0 && (
                      <div className="mb-3 p-2 bg-green-50/40 backdrop-blur-sm border border-green-100 rounded-lg shadow-sm">
                        <p className="text-[10px] font-semibold text-green-800 uppercase tracking-wide mb-1">
                          Dietary Preferences
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.dietaryLabels.map((label, i) => {
                            const isVeg = label.toLowerCase() === 'vegetarian' || label.toLowerCase() === 'vegan';
                            return (
                              <span
                                key={i}
                                className="text-[10px] font-medium text-green-700 bg-white/80 border border-green-200/60 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm"
                              >
                                {isVeg && <Leaf className="w-2.5 h-2.5 text-green-600" />}
                                {label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Ingredients Preview */}
                    {item.ingredients && item.ingredients.trim() && (
                      <div className="pt-3 border-t border-neutral-100 mt-auto">
                        <p className="text-xs font-semibold text-neutral-600 mb-2 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                          Key Ingredients
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-xs font-medium text-green-700 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200 px-3 py-1.5 rounded-3xl hover:shadow-md transition-shadow">
                            {item.ingredients}
                          </span>
                        </div>
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
