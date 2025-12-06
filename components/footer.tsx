"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  ChevronRight,
  Leaf,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-950 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      {/* Curved Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-saffron-400 to-green-500" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section - Spans 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl p-2 ring-2 ring-white/20 group-hover:ring-saffron-400 transition-all duration-300">
                  <Image
                    src="/logo.png"
                    alt="Swamy's Hot Foods Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white leading-none">
                    <span className="text-saffron-400">Swamy&apos;s</span> Hot
                    Foods
                  </h3>
                  <p className="text-xs text-green-300 font-semibold tracking-widest uppercase mt-1 flex items-center gap-1">
                    <Leaf className="w-3 h-3" />
                    Pure Veg Since 1944
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-green-100/80 text-sm leading-relaxed max-w-sm">
              Experience the authentic flavors of South India. Every dish is
              crafted with traditional recipes, fresh ingredients, and the
              warmth of home cooking.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: Facebook,
                  href: "https://www.facebook.com/swamyshotfoodsnlr",
                  label: "Facebook",
                  color: "hover:bg-blue-600",
                },
                {
                  icon: Instagram,
                  href: "https://www.instagram.com/swamyshotfoodsnlr",
                  label: "Instagram",
                  color: "hover:bg-pink-600",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white ${social.color} transition-all duration-300 shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links - Spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold text-saffron-400 uppercase tracking-wider mb-6">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Our Menu" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-100/70 hover:text-white transition-colors flex items-center gap-2 group text-sm font-medium"
                  >
                    <ChevronRight className="w-4 h-4 text-saffron-400 group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Spans 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-saffron-400 uppercase tracking-wider mb-6">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 text-saffron-400 border border-white/20 group-hover:bg-saffron-400 group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="text-green-100/90 leading-relaxed">
                    Opposite Railway Station,
                    <br />
                    Nellore, Andhra Pradesh 524001
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 text-saffron-400 border border-white/20 group-hover:bg-saffron-400 group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <a
                  href="tel:+919876543210"
                  className="text-green-100/90 hover:text-white transition-colors text-sm font-medium"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 text-saffron-400 border border-white/20 group-hover:bg-saffron-400 group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <a
                  href="mailto:hello@swamyshotfoods.com"
                  className="text-green-100/90 hover:text-white transition-colors text-sm font-medium"
                >
                  hello@swamyshotfoods.com
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours - Spans 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold text-saffron-400 uppercase tracking-wider mb-6">
              Opening Hours
            </h4>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-saffron-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-green-100/60 text-xs font-medium uppercase tracking-wider">
                    Morning
                  </p>
                  <p className="text-white font-bold text-lg">
                    5:30 AM - 11:00 AM
                  </p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-saffron-400 shrink-0" />
                <div className="flex-1">
                  <p className="text-green-100/60 text-xs font-medium uppercase tracking-wider">
                    Evening
                  </p>
                  <p className="text-white font-bold text-lg">
                    4:30 PM - 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-green-100/50">
              <p>
                &copy; {currentYear}{" "}
                <span className="text-saffron-400 font-bold">
                  Swamy&apos;s Hot Foods
                </span>
                . All rights reserved.
              </p>
              <span className="hidden md:inline text-green-100/20">•</span>
              <p className="text-xs">
                Crafted by{" "}
                <a
                  href="https://www.charan-cvs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-300/70 font-semibold hover:text-saffron-400 transition-colors cursor-pointer"
                >
                  CVS
                </a>
              </p>
            </div>
            <div className="flex gap-6 font-medium text-green-100/50">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
