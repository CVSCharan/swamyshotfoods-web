"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Share2,
  UtensilsCrossed,
  Clock,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";
import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { useStoreConfigSSE } from "@/lib/hooks/useStoreConfigSSE";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { Button } from "@/components/ui/button";
import { CookingAnimation } from "@/components/animations";

export default function LandingPage() {
  // Connect to SSE
  useStoreConfigSSE();
  const { config } = useStoreConfigStore();

  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Scroll to top and show splash screen on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Show splash for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect for notice board
  useEffect(() => {
    if (!config?.noticeMessage) return;

    const handleType = () => {
      const fullText = config.noticeMessage;

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, config?.noticeMessage, loopNum, typingSpeed]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Swamy's Hot Foods",
          text: "Check out this amazing vegetarian restaurant in Nellore!",
          url: "https://swamyshotfoods.shop",
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText("https://swamyshotfoods.shop");
    }
  };

  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/dir//Swamy's+Hot+Foods,+Nellore",
      "_blank"
    );
  };

  return (
    <>
      {/* Splash Screen */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-green-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Subtle decorative circles */}
            <div className="absolute top-20 right-20 w-64 h-64 bg-green-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-saffron-200/20 rounded-full blur-3xl" />

            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Glow Effect - Softer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-saffron-300/30 to-green-300/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Image
                src="/logo.png"
                alt="Swamy's Hot Foods"
                width={256}
                height={256}
                className="relative z-10 drop-shadow-2xl w-64 h-64"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        className="min-h-screen bg-neutral-50 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0 : 0.3 }}
      >
        {/* Hero Section */}
        <motion.div
          className="relative bg-gradient-to-br from-white via-neutral-50 to-green-50/30 text-neutral-900 overflow-hidden min-h-[100vh] flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Rich Mesh Gradient Background with Primary/Secondary Colors - Subtle */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.12)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,196,48,0.08)_0%,transparent_60%)]" />
          </div>

          {/* Large Geometric Clip-Path Shapes with Primary/Secondary Colors - Professional */}
          <div
            className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-green-200/60 via-green-300/40 to-transparent"
            style={{
              clipPath: "polygon(100% 0, 100% 65%, 35% 100%, 0 35%, 0 0)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-200/60 via-blue-300/40 to-transparent"
            style={{
              clipPath: "polygon(0 100%, 65% 100%, 100% 65%, 65% 0, 0 35%)",
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-green-300/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-300/20 to-transparent rounded-full blur-3xl" />

          {/* Decorative Corner Elements with Color Variants - Toned Down */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-200/25 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/25 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-300/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-blue-300/20 to-transparent rounded-full blur-3xl" />

          {/* Animated Background Orbs - Subtle */}
          <motion.div
            className="absolute top-10 right-10 w-80 h-80 bg-green-200/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 bg-blue-200/15 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.12, 0.18, 0.12],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center text-center">
            {/* Title with Saffron Gradient */}
            <motion.h1
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-3 tracking-tight mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              <span className="text-saffron-500">Swamy&apos;s Hot Foods</span>
            </motion.h1>

            <motion.p
              className="font-serif text-xl md:text-3xl text-green-600 italic mb-8 md:mb-10 font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3,
              }}
            >
              Pure Vegetarian Delight
            </motion.p>

            {/* Address & Directions - Compact */}
            <motion.div
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 mb-4 max-w-md w-full border border-white/40 shadow-xl shadow-green-900/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.6,
              }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={handleGetDirections}
                  variant="outline"
                  className="mb-3 bg-green-50/50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800 w-full gap-2 h-10 font-semibold transition-all duration-300 text-sm relative overflow-hidden group"
                >
                  {/* Animated background pulse */}
                  <motion.div
                    className="absolute inset-0 bg-green-200/30"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Animated MapPin icon */}
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      rotate: [0, -10, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </motion.div>

                  <span className="relative z-10">Get Directions</span>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
              <p className="text-neutral-600 text-xs leading-relaxed">
                7-1-931, Opp. Nellore railway station, Railway feeders road,
                Nellore - 524001
              </p>
            </motion.div>

            {/* Status Badge - Compact */}
            <motion.div
              className="mb-4 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.7,
              }}
            >
              {config ? (
                <div className="flex flex-col gap-3">
                  {/* Cooking Status */}
                  {config.isCooking ? (
                    <motion.div
                      className="bg-gradient-to-r from-saffron-50 to-orange-50 backdrop-blur-md border-2 border-saffron-400 rounded-2xl py-4 px-5 flex flex-col items-center justify-center gap-3 shadow-lg shadow-saffron-500/20"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <CookingAnimation variant="all" size="sm" />
                      <span className="font-bold text-saffron-700 text-base tracking-wide">
                        Cooking Fresh Food! 🔥
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className={`py-3 px-6 rounded-2xl font-bold text-lg shadow-xl transform transition-all duration-300 ${
                        config.isShopOpen
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/30"
                          : "bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-500 border-2 border-neutral-300"
                      }`}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      {config.isShopOpen
                        ? "🎉 We&apos;re Open Now!"
                        : "😔 Currently Closed"}
                    </motion.div>
                  )}

                  {/* Status Message */}
                  {!config.isHoliday && config.currentStatusMsg && (
                    <motion.div
                      className={`text-xs font-semibold py-1.5 px-4 rounded-full inline-block mx-auto border ${
                        config.currentStatusMsg.includes("Closing")
                          ? "bg-red-50 text-red-600 border-red-200"
                          : "bg-blue-50 text-blue-600 border-blue-200"
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      {config.currentStatusMsg}
                    </motion.div>
                  )}

                  {/* Holiday Message */}
                  {config.isHoliday && (
                    <motion.div
                      className="bg-red-50 border-2 border-red-300 rounded-xl p-3 text-red-700 font-semibold shadow-lg text-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 12,
                      }}
                    >
                      {config.holidayMessage}
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="h-14 bg-neutral-100 rounded-2xl animate-pulse w-56 mx-auto" />
              )}
            </motion.div>

            {/* Action Buttons - Compact with Animated Icons */}
            <motion.div
              className="flex flex-wrap justify-center gap-3 w-full max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8,
              }}
            >
              <motion.a
                href="tel:+919642415385"
                className="flex-1 min-w-[120px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button className="w-full h-12 text-base gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-xl shadow-green-600/30 rounded-2xl font-bold border-2 border-green-500/20 backdrop-blur-sm">
                  <motion.div
                    animate={{
                      rotate: [0, -15, 15, -15, 15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  >
                    <Phone className="w-4 h-4" />
                  </motion.div>
                  Call Us
                </Button>
              </motion.a>

              <motion.div
                className="flex-1 min-w-[120px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={handleShare}
                  className="w-full h-12 text-base gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-600/30 rounded-2xl font-bold border-2 border-blue-500/20 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.div>
                  Share
                </Button>
              </motion.div>

              <motion.div
                className="flex-1 min-w-[120px]"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link href="/menu">
                  <Button className="w-full h-12 text-base gap-2 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold shadow-xl shadow-saffron-600/30 rounded-2xl border-2 border-saffron-400/20 backdrop-blur-sm">
                    <motion.div
                      animate={{
                        y: [0, -4, 0],
                        rotate: [0, -10, 10, -10, 10, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 0.5,
                      }}
                    >
                      <UtensilsCrossed className="w-4 h-4" />
                    </motion.div>
                    Menu
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0 -mb-1">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              className="w-full h-auto block"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0L48 8.3C96 17 192 33 288 41.7C384 50 480 50 576 41.7C672 33 768 17 864 16.7C960 17 1056 33 1152 41.7C1248 50 1344 50 1392 50L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
                fill="#fafaf9"
              />
            </svg>
          </div>
        </motion.div>

        {/* Notice Board */}
        {config?.isNoticeActive && config?.noticeMessage && (
          <div className="bg-saffron-50 border-y border-saffron-200 py-4 overflow-hidden">
            <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-saffron-900">
              <Info className="w-5 h-5 flex-shrink-0 text-saffron-600" />
              <div className="font-mono font-medium text-lg">
                {displayText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        )}

        {/* Working Hours */}
        <div className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                Opening Hours
              </h2>
              <p className="text-neutral-600 text-base md:text-lg">
                Visit us during these times to enjoy authentic South Indian
                cuisine
              </p>
            </motion.div>

            {/* Glassmorphic Card */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
            >
              {/* Animated Gradient Border Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-green-500 via-saffron-500 to-green-500 rounded-3xl blur opacity-20"
                animate={{
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="p-6 md:p-10">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Monday - Saturday */}
                    <motion.div
                      className="flex flex-col items-center justify-center text-center space-y-5"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: 0.3,
                      }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.4,
                        }}
                      >
                        <Clock className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <span className="font-bold text-neutral-500 uppercase tracking-wider text-xs block mb-3">
                          Monday - Saturday
                        </span>
                        <div className="space-y-2">
                          <motion.div
                            className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold text-neutral-800 bg-green-50 rounded-xl py-2.5 px-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 15,
                              delay: 0.5,
                            }}
                          >
                            <motion.span
                              className="w-2 h-2 rounded-full bg-green-500"
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            5:30 AM - 11:00 AM
                          </motion.div>
                          <motion.div
                            className="flex items-center justify-center gap-3 text-base md:text-lg font-semibold text-neutral-800 bg-green-50 rounded-xl py-2.5 px-5"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              stiffness: 150,
                              damping: 15,
                              delay: 0.6,
                            }}
                          >
                            <motion.span
                              className="w-2 h-2 rounded-full bg-green-500"
                              animate={{
                                scale: [1, 1.3, 1],
                                opacity: [1, 0.7, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                              }}
                            />
                            4:30 PM - 9:00 PM
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Vertical Divider */}
                    <div className="hidden md:block absolute left-1/2 top-12 bottom-12 w-px bg-gradient-to-b from-transparent via-neutral-200 to-transparent" />

                    {/* Sunday Holiday */}
                    <motion.div
                      className="flex flex-col items-center justify-center text-center space-y-5 md:border-t-0 border-t border-neutral-100 pt-8 md:pt-0"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: 0.4,
                      }}
                    >
                      <motion.div
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center shadow-lg shadow-red-500/30"
                        initial={{ scale: 0, rotate: 180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.5,
                        }}
                      >
                        <Calendar className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <motion.span
                          className="font-bold text-red-500 text-xl block mb-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            delay: 0.6,
                          }}
                        >
                          Sunday Holiday
                        </motion.span>
                        <motion.p
                          className="text-neutral-500 text-sm max-w-xs mx-auto leading-relaxed"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            delay: 0.7,
                          }}
                        >
                          We take a break on Sundays to recharge and serve you
                          better the rest of the week!
                        </motion.p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* WhatsApp FAB */}
        <WhatsAppFab />
      </motion.div>
    </>
  );
}
