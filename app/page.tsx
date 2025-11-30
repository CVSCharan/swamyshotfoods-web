"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Share2,
  UtensilsCrossed,
  Clock,
  Calendar,
  MapPin,
  Info,
  Flame,
} from "lucide-react";
import { useStoreConfigStore } from "@/lib/stores/useStoreConfigStore";
import { useStoreConfigSSE } from "@/lib/hooks/useStoreConfigSSE";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { WhatsAppFab } from "@/components/landing/whatsapp-fab";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  // Connect to SSE
  useStoreConfigSSE();
  const { config } = useStoreConfigStore();

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

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
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-neutral-900 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          {/* Placeholder for background image - using a gradient for now */}
          <div className="w-full h-full bg-gradient-to-br from-green-900 to-black"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-4 md:mb-8 relative group">
            <Image
              src="/logo.png"
              alt="Swamy's Hot Foods"
              width={280}
              height={280}
              className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300 w-52 h-52 md:w-64 md:h-64"
              priority
            />
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-6xl font-bold mb-2 text-white drop-shadow-lg leading-tight">
            Swamy's Hot Foods
          </h1>
          <p className="font-serif text-lg md:text-2xl text-saffron-400 italic mb-6 md:mb-8">
            Pure Vegetarian Delight
          </p>

          {/* Address & Directions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 max-w-lg w-full border border-white/10">
            <Button
              onClick={handleGetDirections}
              variant="outline"
              className="mb-4 bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white w-full gap-2"
            >
              <MapPin className="w-4 h-4" /> Get Directions
            </Button>
            <p className="text-neutral-200 text-sm leading-relaxed">
              7-1-931, Opp. road of Nellore railway station west entrance,
              <br />
              Railway feeders road, Nellore - 524001.
            </p>
          </div>

          {/* Status Badge */}
          <div className="mb-10 w-full max-w-md">
            {config ? (
              <div className="flex flex-col gap-4">
                {/* Cooking Status */}
                {config.isCooking ? (
                  <div className="bg-saffron-500/20 backdrop-blur-md border border-saffron-500/50 rounded-full py-2 px-6 flex items-center justify-center gap-3 animate-pulse">
                    <Flame className="w-6 h-6 text-saffron-500 animate-bounce" />
                    <span className="font-bold text-saffron-400 text-lg tracking-wide">
                      Cooking..!!
                    </span>
                  </div>
                ) : (
                  <div
                    className={`py-3 px-8 rounded-full font-bold text-lg shadow-lg transform transition-all duration-300 ${
                      config.isShopOpen
                        ? "bg-green-500 text-white scale-105"
                        : "bg-neutral-700 text-neutral-300"
                    }`}
                  >
                    {config.isShopOpen
                      ? "We are Open! 😊"
                      : "Sorry, We're Closed Now. 😔"}
                  </div>
                )}

                {/* Status Message */}
                {!config.isHoliday && config.currentStatusMsg && (
                  <div
                    className={`text-sm font-medium py-1 px-4 rounded-full inline-block mx-auto ${
                      config.currentStatusMsg.includes("Closing")
                        ? "bg-red-500/20 text-red-200 animate-pulse"
                        : "bg-blue-500/20 text-blue-200"
                    }`}
                  >
                    {config.currentStatusMsg}
                  </div>
                )}

                {/* Holiday Message */}
                {config.isHoliday && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
                    {config.holidayMessage}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-12 bg-white/10 rounded-full animate-pulse w-48 mx-auto"></div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
            <a href="tel:+919642415385" className="flex-1 min-w-[140px]">
              <Button className="w-full h-14 text-lg gap-2 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-900/20 rounded-xl">
                <Phone className="w-5 h-5 animate-pulse" /> Call Us
              </Button>
            </a>

            <Button
              onClick={handleShare}
              className="flex-1 min-w-[140px] h-14 text-lg gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 rounded-xl"
            >
              <Share2 className="w-5 h-5" /> Share
            </Button>

            <Link href="/menu" className="flex-1 min-w-[140px]">
              <Button className="w-full h-14 text-lg gap-2 bg-saffron-500 hover:bg-saffron-600 text-neutral-900 font-bold shadow-lg shadow-saffron-900/20 rounded-xl">
                <UtensilsCrossed className="w-5 h-5" /> Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-neutral-100">
          <div className="bg-green-600 p-4 text-center">
            <h2 className="text-2xl font-heading font-bold text-white flex items-center justify-center gap-2">
              <Clock className="w-6 h-6" /> Working Hours
            </h2>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <span className="font-bold text-neutral-500 uppercase tracking-wider text-sm">
                Monday - Saturday
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-medium text-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  5:30 AM - 11:00 AM
                </div>
                <div className="flex items-center gap-2 text-lg font-medium text-neutral-800">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  4:30 PM - 9:00 PM
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0">
              <Calendar className="w-12 h-12 text-red-400 mb-3" />
              <span className="font-bold text-red-500 text-xl">
                Sunday Holiday
              </span>
              <p className="text-neutral-400 text-sm mt-2">
                We take a break to serve you better!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* WhatsApp FAB */}
      <WhatsAppFab />
    </div>
  );
}
