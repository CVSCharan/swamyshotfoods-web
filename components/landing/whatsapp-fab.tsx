"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Button } from "../ui/button";

export function WhatsAppFab() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919642415385", "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center !w-[60px] !h-[60px] !p-0 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] active:scale-95 border-4 border-white/20"
      aria-label="Chat on WhatsApp"
    >
      <IconBrandWhatsapp className="!w-[36px] !h-[36px]" stroke={1.5} />
    </Button>
  );
}
