"use client";

import { motion } from "framer-motion";

export function ChefHat() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Sparkles around hat */}
      <motion.circle
        cx="15"
        cy="30"
        r="2"
        fill="#fbbf24"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx="85"
        cy="35"
        r="2"
        fill="#fbbf24"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.circle
        cx="50"
        cy="15"
        r="2"
        fill="#fbbf24"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Chef Hat Main Body */}
      <motion.g
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Hat Puffs */}
        <motion.circle
          cx="30"
          cy="40"
          r="15"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx="50"
          cy="30"
          r="18"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.circle
          cx="70"
          cy="40"
          r="15"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="2"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />

        {/* Hat Base/Band */}
        <rect
          x="20"
          y="50"
          width="60"
          height="20"
          rx="3"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="2"
        />

        {/* Hat Band Detail */}
        <rect x="20" y="50" width="60" height="5" fill="#f3f4f6" />
        <rect x="20" y="65" width="60" height="5" fill="#f3f4f6" />

        {/* Fold Lines */}
        <motion.line
          x1="35"
          y1="55"
          x2="35"
          y2="65"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.line
          x1="50"
          y1="55"
          x2="50"
          y2="65"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
        <motion.line
          x1="65"
          y1="55"
          x2="65"
          y2="65"
          stroke="#e5e7eb"
          strokeWidth="1.5"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
      </motion.g>

      {/* Bottom Shadow */}
      <ellipse cx="50" cy="75" rx="35" ry="5" fill="#000000" opacity="0.1" />
    </svg>
  );
}
