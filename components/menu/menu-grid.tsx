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

export function MenuGrid({ items }: MenuGridProps) {
  const [timeSlotFilter, setTimeSlotFilter] = useState("All");

  // Console log all menu items
  console.log("📋 All Menu Items:", items);
  console.log("📊 Total Items Count:", items.length);

  // Extract unique time slots
  const timeSlots = [
    "All",
    ...Array.from(new Set(items.map((i) => getTimeSlot(i)))).sort(),
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

  const filteredItems = items.filter((item) => {
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

      {/* Grid / List */}
      <motion.div
        className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8"
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
                <div className="bg-white md:rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:shadow-lg hover:shadow-2xl transition-all duration-300 border-y md:border border-neutral-100 h-full flex flex-col -mx-4 md:mx-0">
                  {/* Image */}
                  <div className="relative h-64 md:h-56 overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                    <motion.div
                      className="relative h-full w-full"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <MenuItemImage src={item.imgSrc} alt={item.name} />
                    </motion.div>

                    <div className="absolute bottom-6 left-4 z-20 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
                      <Clock className="w-3 h-3" />
                      {formatTimings(item)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-5 flex-1 flex flex-col -mt-4 relative z-20 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl md:text-xl font-bold text-neutral-800 group-hover:text-green-700 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-3xl md:text-2xl font-extrabold text-secondary mt-1 tabular-nums tracking-tight">
                          ₹{item.price}
                        </p>
                      </div>
                      {item.priority < 2 && (
                        <span className="flex items-center gap-1 text-[10px] md:text-[10px] font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2.5 py-1 rounded-full border border-saffron-100 shadow-sm mt-1">
                          <Flame className="w-3.5 h-3.5 fill-current" />
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-sm md:text-sm text-neutral-600 mb-5 line-clamp-2 md:line-clamp-3">
                      {item.desc}
                    </p>

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-4 p-2.5 bg-amber-50/50 border border-amber-100 rounded-xl">
                        <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1.5">
                          Allergens
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.allergens.map((allergen, i) => (
                            <span
                              key={i}
                              className="text-[10px] text-amber-700 bg-amber-100/50 px-2 py-0.5 rounded-md font-semibold"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ingredients Preview */}
                    <div className="pt-4 border-t border-neutral-100 mt-auto">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-sm shadow-green-500/50"></span>
                        Key Ingredients
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="text-xs font-semibold text-green-700 bg-gradient-to-r from-green-50 to-green-100/50 border border-green-200/60 px-3 py-1.5 rounded-3xl">
                          {item.ingredients}
                        </span>
                      </div>
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
