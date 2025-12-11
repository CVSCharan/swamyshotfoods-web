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
  ingredients: string[];
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
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

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
              <motion.div
                className="relative w-full h-full"
                animate={{
                  rotateY: expandedItemId === item._id ? 180 : 0,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* FRONT SIDE - Menu Item Card */}
                <div
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-100 cursor-pointer h-full flex flex-col"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
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
                      {item.priority < 2 && (
                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded-full border border-saffron-100">
                          <Flame className="w-3 h-3 fill-current" />
                          Popular
                        </span>
                      )}
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

                    {/* Ingredients Preview */}
                    <div className="pt-3 border-t border-neutral-100">
                      <p className="text-xs font-semibold text-neutral-600 mb-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Key Ingredients
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.ingredients
                          .slice(0, 4)
                          .map((ing: string, i: number) => {
                            const colorVariants = [
                              "text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-200",
                              "text-saffron-700 bg-gradient-to-r from-saffron-50 to-saffron-100 border-saffron-200",
                              "text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200",
                            ];
                            const colorClass = colorVariants[i % 3];

                            return (
                              <span
                                key={i}
                                className={`text-xs font-medium ${colorClass} px-3 py-1.5 rounded-full border hover:shadow-md transition-shadow`}
                              >
                                {ing.length > 30
                                  ? ing.substring(0, 30) + "..."
                                  : ing}
                              </span>
                            );
                          })}
                        {item.ingredients.length > 4 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedItemId(
                                expandedItemId === item._id ? null : item._id
                              );
                            }}
                            className="text-xs font-medium text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-full border border-neutral-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300 transition-all cursor-pointer"
                          >
                            +{item.ingredients.length - 4} more
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE - All Ingredients */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedItemId(null);
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-2xl overflow-hidden shadow-lg border-2 border-green-200 p-6 cursor-pointer"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="h-full flex flex-col">
                    <div
                      className="flex items-center justify-between mb-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-neutral-800 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-1">
                          All Ingredients
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedItemId(null);
                        }}
                        className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 hover:bg-neutral-100 rounded-full"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      <div className="flex flex-wrap gap-2">
                        {item.ingredients.map((ing: string, i: number) => {
                          const colorVariants = [
                            "text-green-700 bg-gradient-to-r from-green-50 to-green-100 border-green-200",
                            "text-saffron-700 bg-gradient-to-r from-saffron-50 to-saffron-100 border-saffron-200",
                            "text-blue-700 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200",
                          ];
                          const colorClass = colorVariants[i % 3];

                          return (
                            <span
                              key={i}
                              onClick={(e) => e.stopPropagation()}
                              className={`text-sm font-medium ${colorClass} px-3 py-2 rounded-full border`}
                            >
                              {ing}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      className="mt-4 pt-4 border-t border-neutral-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p className="text-xs text-neutral-500 text-center">
                        Click outside ingredients to flip back
                      </p>
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
