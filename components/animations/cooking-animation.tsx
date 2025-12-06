"use client";

import { motion } from "framer-motion";
import { CookingPot } from "./cooking-pot";
import { ChefHat } from "./chef-hat";
import { FlameAnimation } from "./flame";
import { SpoonFork } from "./spoon-fork";

interface CookingAnimationProps {
  variant?: "pot" | "hat" | "flame" | "utensils" | "all";
  size?: "sm" | "md" | "lg";
}

export function CookingAnimation({
  variant = "all",
  size = "md",
}: CookingAnimationProps) {
  const sizeClasses = {
    sm: "scale-75",
    md: "scale-100",
    lg: "scale-125",
  };

  if (variant === "pot") {
    return (
      <div className={`inline-block ${sizeClasses[size]}`}>
        <CookingPot />
      </div>
    );
  }

  if (variant === "hat") {
    return (
      <div className={`inline-block ${sizeClasses[size]}`}>
        <ChefHat />
      </div>
    );
  }

  if (variant === "flame") {
    return (
      <div className={`inline-block ${sizeClasses[size]}`}>
        <FlameAnimation />
      </div>
    );
  }

  if (variant === "utensils") {
    return (
      <div className={`inline-block ${sizeClasses[size]}`}>
        <SpoonFork />
      </div>
    );
  }

  // "all" variant - show all animations in a row
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 ${sizeClasses[size]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChefHat />
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <CookingPot />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <FlameAnimation />
      </motion.div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      >
        <SpoonFork />
      </motion.div>
    </motion.div>
  );
}
