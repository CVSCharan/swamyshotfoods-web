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
  timings: string;
  ingredients: string;
  priority: number;
  imgSrc: string;
}

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  const [filter, setFilter] = useState("All");

  // Console log all menu items
  console.log("📋 All Menu Items:", items);
  console.log("📊 Total Items Count:", items.length);

  // Extract unique timings for categories, plus "All"
  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.timings).filter(Boolean))),
  ];

  const filteredItems = items.filter((item) => {
    return filter === "All" || item.timings === filter;
  });

  // Console log filtered items
  console.log("🔍 Current Filter:", filter);
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
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-20 z-30 bg-neutral-50/95 backdrop-blur-sm p-4 rounded-2xl border border-neutral-200 shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-green-600 text-white shadow-md scale-105"
                  : "bg-white text-neutral-600 hover:bg-green-50 hover:text-green-700 border border-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
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
                {item.timings && (
                  <div className="absolute bottom-8 left-4 z-20 flex items-center gap-1.5 text-white/90 text-xs font-medium bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    <Clock className="w-3 h-3" />
                    {item.timings}
                  </div>
                )}
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

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients
                      .split(",")
                      .slice(0, 3)
                      .map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] text-neutral-400 bg-neutral-50 px-2 py-1 rounded-md"
                        >
                          {ing.trim()}
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
