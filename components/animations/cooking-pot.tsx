"use client";

import { motion } from "framer-motion";

export function CookingPot() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Steam 1 */}
      <motion.path
        d="M35 20 Q 35 10, 30 5"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          pathLength: [0, 1, 1],
          y: [0, -5, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Steam 2 */}
      <motion.path
        d="M50 20 Q 50 10, 50 5"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          pathLength: [0, 1, 1],
          y: [0, -5, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Steam 3 */}
      <motion.path
        d="M65 20 Q 65 10, 70 5"
        stroke="#94a3b8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          pathLength: [0, 1, 1],
          y: [0, -5, -10],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />

      {/* Pot Lid */}
      <motion.g
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Lid Handle */}
        <ellipse cx="50" cy="22" rx="8" ry="4" fill="#f59e0b" />
        <rect x="46" y="20" width="8" height="6" rx="2" fill="#f59e0b" />

        {/* Lid Top */}
        <ellipse cx="50" cy="28" rx="25" ry="6" fill="#fbbf24" />
        <path d="M 25 28 Q 50 35, 75 28" fill="#f59e0b" opacity="0.6" />
      </motion.g>

      {/* Pot Body */}
      <motion.g
        animate={{
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Main Pot */}
        <path
          d="M 20 35 L 20 70 Q 20 80, 30 80 L 70 80 Q 80 80, 80 70 L 80 35 Z"
          fill="#dc2626"
        />

        {/* Pot Shine */}
        <path
          d="M 25 40 L 25 70 Q 25 75, 30 75 L 35 75"
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
          opacity="0.5"
        />

        {/* Pot Handles */}
        <path
          d="M 15 45 Q 10 45, 10 50 Q 10 55, 15 55"
          stroke="#b91c1c"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 85 45 Q 90 45, 90 50 Q 90 55, 85 55"
          stroke="#b91c1c"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Bubbles inside pot (visible through steam) */}
      <motion.circle
        cx="40"
        cy="55"
        r="3"
        fill="#fbbf24"
        opacity="0.6"
        animate={{
          y: [0, -15, -15],
          opacity: [0.6, 0.6, 0],
          scale: [1, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="2.5"
        fill="#fbbf24"
        opacity="0.6"
        animate={{
          y: [0, -15, -15],
          opacity: [0.6, 0.6, 0],
          scale: [1, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <motion.circle
        cx="50"
        cy="65"
        r="2"
        fill="#fbbf24"
        opacity="0.6"
        animate={{
          y: [0, -15, -15],
          opacity: [0.6, 0.6, 0],
          scale: [1, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1,
        }}
      />
    </svg>
  );
}
