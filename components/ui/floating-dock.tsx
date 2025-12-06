"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export interface FloatingDockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

export function FloatingDock({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-end gap-4 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-2xl",
        className
      )}
    >
      {items.map((item) => (
        <FloatingDockIcon key={item.title} {...item} />
      ))}
    </div>
  );
}

function FloatingDockIcon({ title, icon, href }: FloatingDockItem) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(Infinity);
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseEnter={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
        className="aspect-square w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center relative hover:bg-white/20 transition-colors"
      >
        <div className="text-white/90">{icon}</div>
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-900 border border-neutral-700 text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

export function FloatingDockMobile({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-around gap-2 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 px-4 py-3 shadow-2xl w-full max-w-sm",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <div className="text-white/90">{item.icon}</div>
          <span className="text-white/80 text-xs font-medium">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
