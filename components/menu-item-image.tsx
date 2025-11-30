"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface MenuItemImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function MenuItemImage({ src, alt, className }: MenuItemImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center bg-neutral-100 text-neutral-400",
          className
        )}
      >
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs font-medium">No Image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        onError={() => setError(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
