"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";

export function WhatsAppFab() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/919642415385", "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <IconBrandWhatsapp className="w-8 h-8" stroke={1.5} />
    </button>
  );
}
