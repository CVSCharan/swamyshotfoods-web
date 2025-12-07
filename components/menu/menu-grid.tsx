"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MenuItemImage } from "@/components/menu-item-image";
import { Search, UtensilsCrossed, Clock, Flame } from "lucide-react";

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
  const [dietaryFilter, setDietaryFilter] = useState("All");

  // Console log all menu items
  console.log("📋 All Menu Items:", items);
  console.log("📊 Total Items Count:", items.length);

  // Extract unique time slots
  const timeSlots = [
    "All",
    ...Array.from(new Set(items.map((i) => getTimeSlot(i)))).sort(),
  ];

  // Extract unique dietary labels
  const dietaryOptions = [
    "All",
    ...Array.from(new Set(items.flatMap((i) => i.dietaryLabels || []))).sort(),
  ];

  const filteredItems = items.filter((item) => {
    const timeSlotMatch =
      timeSlotFilter === "All" || getTimeSlot(item) === timeSlotFilter;
    const dietaryMatch =
      dietaryFilter === "All" ||
      (item.dietaryLabels &&
        item.dietaryLabels.includes(dietaryFilter.toLowerCase()));
    return timeSlotMatch && dietaryMatch;
  });

  // Console log filtered items
  console.log("🔍 Time Slot Filter:", timeSlotFilter);
  console.log("🥗 Dietary Filter:", dietaryFilter);
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
      {/* Controls */}
      <div className="flex flex-col gap-4 sticky top-20 z-30 bg-neutral-50/95 backdrop-blur-sm p-4 rounded-2xl border border-neutral-200 shadow-sm">
        {/* Time Slot Filter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
            Time Slot
          </label>
          <div className="flex flex-wrap gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTimeSlotFilter(slot)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  timeSlotFilter === slot
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : "bg-white text-neutral-600 hover:bg-green-50 hover:text-green-700 border border-neutral-200"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filter */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">
            Dietary Preference
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <button
                key={option}
                onClick={() => setDietaryFilter(option)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  dietaryFilter === option
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : "bg-white text-neutral-600 hover:bg-green-50 hover:text-green-700 border border-neutral-200"
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
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
              variants={itemAnim}
              layout
              initial="hidden"
              animate="show"
              exit="hidden"
              className="group relative bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container with Cool Clip-Path */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* The Cool Clip Path Effect */}
                <motion.div
                  className="relative h-full w-full"
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <MenuItemImage src={item.imgSrc} alt={item.name} />
                </motion.div>

                {/* Floating Price Tag */}
                <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-green-100">
                  <span className="font-heading font-bold text-green-700">
                    ₹{item.price}
                  </span>
                </div>

                {/* Timing Badge */}
                <div className="absolute bottom-8 left-4 z-20 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <Clock className="w-3 h-3" />
                  {formatTimings(item)}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-xl font-bold text-neutral-800 group-hover:text-green-700 transition-colors">
                    {item.name}
                  </h3>
                  {item.priority < 2 && (
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-saffron-600 bg-saffron-50 px-2 py-0.5 rounded-full border border-saffron-100">
                      <Flame className="w-3 h-3 fill-current" />
                      Popular
                    </span>
                  )}
                </div>

                <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.desc}
                </p>

                {/* Dietary Labels */}
                {item.dietaryLabels && item.dietaryLabels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.dietaryLabels.map((label, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold uppercase tracking-wide text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}

                {/* Allergen Warning */}
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

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients
                      .slice(0, 3)
                      .map((ing: string, i: number) => (
                        <span
                          key={i}
                          className="text-[10px] text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md"
                        >
                          {ing}
                        </span>
                      ))}
                  </div>

                  <button className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300 group-hover:scale-110">
                    <UtensilsCrossed className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
