"use client";

import { motion } from "framer-motion";

export function SpoonFork() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block"
    >
      {/* Spoon */}
      <motion.g
        animate={{
          rotate: [0, -10, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "35px 50px" }}
      >
        {/* Spoon Bowl */}
        <ellipse
          cx="35"
          cy="30"
          rx="12"
          ry="15"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <ellipse cx="35" cy="28" rx="8" ry="10" fill="#e2e8f0" />

        {/* Spoon Handle */}
        <rect
          x="32"
          y="42"
          width="6"
          height="45"
          rx="3"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Shine on spoon */}
        <motion.ellipse
          cx="32"
          cy="26"
          rx="4"
          ry="6"
          fill="#ffffff"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.g>

      {/* Fork */}
      <motion.g
        animate={{
          rotate: [0, 10, 0],
          x: [0, 3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        style={{ transformOrigin: "65px 50px" }}
      >
        {/* Fork Prongs */}
        <rect
          x="56"
          y="20"
          width="4"
          height="25"
          rx="2"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <rect
          x="63"
          y="20"
          width="4"
          height="25"
          rx="2"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <rect
          x="70"
          y="20"
          width="4"
          height="25"
          rx="2"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* Fork Base */}
        <path
          d="M 54 42 L 54 48 Q 54 50, 56 50 L 74 50 Q 76 50, 76 48 L 76 42 Z"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Fork Handle */}
        <rect
          x="62"
          y="48"
          width="6"
          height="40"
          rx="3"
          fill="#cbd5e1"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Shine on fork */}
        <motion.rect
          x="64"
          y="22"
          width="2"
          height="15"
          rx="1"
          fill="#ffffff"
          opacity="0.6"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.g>

      {/* Sparkles */}
      <motion.circle
        cx="25"
        cy="20"
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
        cx="75"
        cy="25"
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
    </svg>
  );
}
