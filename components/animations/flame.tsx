"use client";

import { motion } from "framer-motion";

export function FlameAnimation() {
  return (
    <svg
      width="60"
      height="80"
      viewBox="0 0 60 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Main Flame */}
      <motion.path
        d="M 30 10 Q 20 25, 25 40 Q 20 50, 25 60 Q 28 70, 30 75 Q 32 70, 35 60 Q 40 50, 35 40 Q 40 25, 30 10 Z"
        fill="url(#flameGradient1)"
        animate={{
          scale: [1, 1.1, 0.95, 1],
          scaleY: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner Flame */}
      <motion.path
        d="M 30 20 Q 25 30, 27 42 Q 25 50, 27 58 Q 29 65, 30 68 Q 31 65, 33 58 Q 35 50, 33 42 Q 35 30, 30 20 Z"
        fill="url(#flameGradient2)"
        animate={{
          scale: [1, 1.15, 0.9, 1],
          scaleY: [1, 1.2, 0.85, 1],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      {/* Core Flame */}
      <motion.path
        d="M 30 30 Q 27 38, 28 48 Q 27 54, 28 58 Q 29 62, 30 64 Q 31 62, 32 58 Q 33 54, 32 48 Q 33 38, 30 30 Z"
        fill="url(#flameGradient3)"
        animate={{
          scale: [1, 1.2, 0.85, 1],
          opacity: [0.9, 1, 0.8, 0.9],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      {/* Flame Sparks */}
      <motion.circle
        cx="20"
        cy="35"
        r="2"
        fill="#fbbf24"
        animate={{
          y: [0, -15, -15],
          x: [0, -5, -10],
          opacity: [1, 1, 0],
          scale: [1, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.circle
        cx="40"
        cy="40"
        r="1.5"
        fill="#fbbf24"
        animate={{
          y: [0, -15, -15],
          x: [0, 5, 10],
          opacity: [1, 1, 0],
          scale: [1, 0.8, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <motion.circle
        cx="30"
        cy="30"
        r="1.5"
        fill="#fef3c7"
        animate={{
          y: [0, -20, -20],
          opacity: [1, 1, 0],
          scale: [1, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1,
        }}
      />

      {/* Gradients */}
      <defs>
        <linearGradient id="flameGradient1" x1="30" y1="10" x2="30" y2="75">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="flameGradient2" x1="30" y1="20" x2="30" y2="68">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="flameGradient3" x1="30" y1="30" x2="30" y2="64">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  );
}
