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
  Sun,
  Moon,
  Flame
} from "lucide-react";
import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { useStoreConfigSSE } from "@/lib/hooks/useStoreConfigSSE";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { ConnectionStatus } from "@/components/connection-status";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const { config } = useStoreConfigStore();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Swamy's Hot Foods",
          text: "Check out this amazing vegetarian restaurant in Nellore!",
          url: "https://www.swamyshotfoods.in/",
        });
      } catch (error) {
        console.error("Error sharing", error);
      }
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText("https://www.swamyshotfoods.in/");
    }
  };

  const handleGetDirections = () => {
    window.open("https://www.google.com/maps/dir//Swamy's+Hot+Foods,+Nellore", "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative z-10 w-48 h-48 md:w-64 md:h-64"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-saffron-500/20 rounded-full blur-2xl animate-pulse" />
              <Image
                src="/logo.png"
                alt="Swamy's Hot Foods"
                width={256}
                height={256}
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl brightness-110"
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-neutral-50 pb-content-safe"
        initial={{ opacity: 0 }}
        animate={{ opacity: showSplash ? 0 : 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0 : 0.2 }}
      >
        {/* HERO SECTION */}
        <section className="relative min-h-[100dvh] flex flex-col justify-center items-center pt-8 pb-8 sm:pt-24 sm:pb-32 overflow-hidden bg-white text-neutral-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-100 via-transparent to-transparent pointer-events-none" />

          {/* Floating Animated Icons */}
          <motion.div 
            animate={{ y: [-15, 15, -15], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-[20%] left-[5%] md:left-[15%] text-green-100 pointer-events-none"
          >
            <UtensilsCrossed className="w-16 h-16 md:w-32 md:h-32" />
          </motion.div>
          <motion.div 
            animate={{ y: [15, -15, 15], rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[5%] md:right-[15%] text-saffron-100 pointer-events-none"
          >
            <MapPin className="w-16 h-16 md:w-32 md:h-32" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[30%] right-[10%] md:right-[20%] text-orange-100 pointer-events-none"
          >
            <Flame className="w-12 h-12 md:w-24 md:h-24" />
          </motion.div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-2 sm:gap-6 mt-2 sm:mt-10">
            {/* Status & Owner Badge */}
            <motion.div 
              className="flex flex-col items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <AnimatePresence>
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-1 bg-gradient-to-tr from-saffron-400 to-green-500 shadow-xl">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-white flex items-center justify-center">
                        <img 
                          src={config?.ownerAvatarUrl || "/logo.png"} 
                          alt="Owner Profile" 
                          className={`w-full h-full ${config?.ownerAvatarUrl ? 'object-cover' : 'object-contain p-2'}`} 
                        />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white rounded-full shadow-md animate-pulse"></div>
                  </div>
              </AnimatePresence>
              
              {config ? (
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  {(!config.isCooking || config.isShopOpen) && (
                    <div className={`px-4 py-1.5 sm:px-8 sm:py-3 rounded-full shadow-xl flex items-center gap-2 sm:gap-3 transition-all transform hover:scale-105 ${
                      config.isShopOpen 
                        ? 'bg-green-500 text-white shadow-green-500/30'
                        : 'bg-rose-500 text-white shadow-rose-500/30'
                    }`}>
                      <div className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        {config.isShopOpen ? (
                          <>
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                          </>
                        ) : (
                          <span className="relative inline-flex rounded-full h-full w-full bg-white"></span>
                        )}
                      </div>
                      <span className="font-heading text-xs sm:text-base font-black uppercase tracking-wider drop-shadow-sm">
                        {config.isShopOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  )}
                  {config.isCooking && (
                    config.cookingImageUrl ? (
                      <div className="flex flex-col items-center gap-2 mt-1 sm:mt-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-saffron-200 shadow-xl bg-white">
                           <img src={config.cookingImageUrl} alt="Cooking in progress" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-saffron-50 text-saffron-700 text-[10px] sm:text-xs font-bold border border-saffron-200 shadow-sm">
                          <Flame className="w-3 h-3 fill-saffron-500" /> Cooking Fresh Batch!
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-saffron-50 text-saffron-700 text-xs sm:text-sm font-bold border border-saffron-200 shadow-sm mt-1 sm:mt-0">
                        <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-saffron-500" /> Cooking Fresh Batch!
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="h-6 w-24 sm:h-8 sm:w-32 bg-neutral-100 rounded-full animate-pulse" />
              )}
            </motion.div>

            {/* Typography */}
            <div className="space-y-1 sm:space-y-6 max-w-4xl mx-auto relative z-10 w-full">
              <motion.h1 
                className="font-heading text-[2.5rem] leading-[1] sm:text-6xl md:text-7xl lg:text-[6rem] font-black tracking-tight sm:leading-[1.1] py-1 sm:py-4 flex flex-col items-center justify-center w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-saffron-500 to-orange-600 drop-shadow-lg pb-1 sm:pb-2 px-2 sm:px-4 w-max">
                  Swamy's
                </span>
                <span className="text-neutral-900 drop-shadow-sm w-max">
                  Hot Foods
                </span>
              </motion.h1>
              
              <motion.p 
                className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl text-neutral-500 italic font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                Pure Vegetarian Delight
              </motion.p>
            </div>

            {/* Actions */}
            <motion.div 
              className="flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-4 w-full max-w-4xl mt-2 sm:mt-4 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, type: "spring" }}
            >
              <Link href="/menu" className="flex-1 min-w-[140px] sm:w-auto sm:flex-none">
                <Button size="lg" className="group w-full h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-lg font-bold rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-600/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <motion.span 
                    animate={{ rotate: [0, 15, -15, 0] }} 
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="mr-2 sm:mr-3"
                  >
                    <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                  Menu
                </Button>
              </Link>
              
              <a href="tel:+919642415385" className="flex-1 min-w-[140px] sm:w-auto sm:flex-none">
                <Button size="lg" className="group w-full h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-lg font-bold rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-orange-400">
                  <motion.span 
                    animate={{ rotate: [0, -10, 10, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mr-2 sm:mr-3"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                  Call Us
                </Button>
              </a>

              <Button size="lg" onClick={handleShare} className="w-full sm:w-auto h-12 sm:h-14 px-4 sm:px-8 text-sm sm:text-lg font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <motion.span 
                    animate={{ y: [0, -6, 0] }} 
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="mr-2 sm:mr-3"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.span>
                  Share
              </Button>
            </motion.div>

            {/* Store Details (Address) */}
            <motion.div 
              className="w-full max-w-2xl mt-3 sm:mt-8 px-2 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, type: "spring" }}
            >
              <div className="bg-white/80 backdrop-blur-md border border-neutral-200/60 p-3 sm:p-6 rounded-3xl shadow-xl shadow-neutral-200/40 flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
                  <h3 className="font-bold text-base sm:text-lg text-neutral-800">Visit Us</h3>
                </div>
                <p className="text-xs sm:text-base text-neutral-600 leading-snug sm:leading-relaxed mb-3 sm:mb-4 max-w-lg px-2">
                  7-1-931, Opp. Nellore Railway station West entrance, Railway feeders road, Nellore - 524001
                </p>
                <Button onClick={handleGetDirections} variant="outline" className="group w-full sm:w-auto rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-100 font-semibold h-10 sm:h-12 px-8 shadow-sm hover:shadow-md transition-all gap-2 text-sm sm:text-base">
                  <motion.span
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5"/>
                  </motion.span>
                  Get Directions
                </Button>
              </div>
            </motion.div>

            {/* Notice Board Floating Banner */}
            <AnimatePresence>
              {config?.isNoticeActive && config?.noticeMessage && (
                <motion.div 
                  className="w-full max-w-3xl mt-12 relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="bg-white border border-neutral-100 p-6 sm:p-8 rounded-[2rem] shadow-xl shadow-neutral-200/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 text-left">
                    <div className="absolute top-0 left-0 w-2 h-full bg-saffron-500"></div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10">
                      <div className="bg-saffron-50 p-4 rounded-2xl shrink-0">
                        <Info className="w-8 h-8 text-saffron-500" />
                      </div>
                      <div className="flex-1 text-left w-full">
                        <h4 className="text-xs font-black text-saffron-500 uppercase tracking-[0.2em] mb-2">Notice Board</h4>
                        <p className="text-neutral-800 font-bold text-base sm:text-lg leading-relaxed break-words whitespace-pre-wrap">
                          {config.noticeMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              className="w-full h-auto block"
              preserveAspectRatio="none"
            >
              <path
                d="M0 100L48 91.7C96 83 192 67 288 58.3C384 50 480 50 576 58.3C672 67 768 83 864 83.3C960 83 1056 67 1152 58.3C1248 50 1344 50 1392 50L1440 50V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z"
                fill="#fdfcfb"
              />
            </svg>
          </div>
        </section>

        {/* WORKING HOURS SECTION */}
        <section className="py-20 px-6 bg-[#fdfcfb] relative z-10 -mt-10">
          <div className="max-w-4xl mx-auto">
            {/* Working Hours Card */}
            <motion.div 
              className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                <Clock className="w-64 h-64 -mt-10 -mr-10" />
              </div>
              
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-neutral-900 mb-10 flex items-center gap-4">
                <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><Clock className="w-8 h-8" /></div>
                Working Hours
              </h2>

              <div className="space-y-6 relative z-10">
                <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                  <h3 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-6">Monday - Saturday</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100/50 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-saffron-500" />
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Morning</p>
                      </div>
                      <p className="font-bold text-neutral-800 text-[0.95rem] whitespace-nowrap">5:30 AM - 11:00 AM</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100/50 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Moon className="w-5 h-5 text-blue-500" />
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Evening</p>
                      </div>
                      <p className="font-bold text-neutral-800 text-[0.95rem] whitespace-nowrap">4:30 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50/50 p-6 sm:p-8 rounded-3xl border border-red-100 flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl text-red-500 shadow-sm">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-600 text-xl">Sunday Holiday</h3>
                    <p className="text-red-500/80 text-sm font-semibold mt-1">We take a break to rest and prep!</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* WhatsApp FAB */}
        <WhatsAppFab />

        {/* Connection Status Indicator */}
        <ConnectionStatus />
      </motion.div>
    </>
  );
}
