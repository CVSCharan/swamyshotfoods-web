import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Swamy's Hot Foods Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Serving authentic South Indian vegetarian cuisine with traditional
              recipes passed down through generations.
            </p>
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <span className="text-lg">🌱</span>
              <span>100% Pure Vegetarian</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/menu", label: "Menu" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">
              Visit Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-400">
                  123 Main Street, Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-neutral-400 hover:text-green-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-green-400 flex-shrink-0" />
                <a
                  href="mailto:info@swamyshotfoods.com"
                  className="text-neutral-400 hover:text-green-400 transition-colors"
                >
                  info@swamyshotfoods.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Social */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-white mb-4">
              Opening Hours
            </h4>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-neutral-400">
                  <p className="font-medium text-white">Mon - Sat</p>
                  <p>8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-neutral-400">
                  <p className="font-medium text-white">Sunday</p>
                  <p>9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h5 className="text-sm font-semibold text-white mb-3">
                Follow Us
              </h5>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-green-500 hover:text-white transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
            <p>© {currentYear} Swamy's Hot Foods. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-green-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-green-400 transition-colors"
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
