"use client";

import { useState, useEffect } from "react";
import { Home, UtensilsCrossed, Search, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { useMenuItems } from "@/lib/hooks/useMenuItems";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function Header() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { menuItems } = useMenuItems();
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut for command palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 sm:h-20 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-md"
            : "bg-white/80 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-green-500/10 group-hover:ring-green-500/30 transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="Swamy's Hot Foods Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-heading text-lg sm:text-xl font-bold text-saffron-500 leading-tight group-hover:text-saffron-600 transition-colors duration-300">
                  Swamy&apos;s Hot Foods
                </h1>
                <p className="text-xs text-green-600 font-medium tracking-wide">
                  Since 1944
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-4 py-2 rounded-full group"
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-green-50 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                        active
                          ? "text-green-700"
                          : "text-neutral-600 group-hover:text-green-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border-2 border-neutral-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md group"
              >
                <Search className="w-4 h-4 text-neutral-600 group-hover:text-green-600 transition-colors" />
                <span className="hidden sm:inline text-sm text-neutral-700 group-hover:text-green-700 font-medium">
                  Search
                </span>
                <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-neutral-500 bg-neutral-50 border border-neutral-300 rounded ml-1">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {/* Mobile Menu Icons */}
              <div className="md:hidden flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`p-2 rounded-full transition-colors ${
                        active
                          ? "bg-green-50 text-green-600"
                          : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 sm:h-20" />

      {/* Command Palette */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <div className="border-b border-neutral-200 bg-neutral-50/50 px-4 py-3">
          <p className="text-xs font-medium text-neutral-500">
            Search our menu for delicious items...
          </p>
        </div>
        <CommandInput
          placeholder="Search for idli, dosa, vada..."
          className="border-none focus:ring-0"
        />
        <CommandList className="max-h-[500px]">
          <CommandEmpty>
            <Empty className="border-0 py-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <UtensilsCrossed className="text-muted-foreground" />
                </EmptyMedia>
                <EmptyTitle>No menu items found</EmptyTitle>
                <EmptyDescription>
                  Try searching with different keywords
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CommandEmpty>

          {menuItems.length > 0 && (
            <CommandGroup heading="Menu Items" className="p-2">
              <div className="grid gap-2">
                {menuItems.map((item) => (
                  <CommandItem
                    key={item._id}
                    value={`${item.name} ${item.desc} ${item.ingredients}`}
                    onSelect={() => {
                      router.push("/menu");
                      setCommandOpen(false);
                    }}
                    className="p-2 rounded-lg aria-selected:bg-neutral-100"
                  >
                    <div className="flex gap-3 w-full">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
                        {item.imgSrc ? (
                          <Image
                            src={item.imgSrc}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UtensilsCrossed className="w-4 h-4 text-neutral-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-medium text-neutral-900 text-sm truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-500 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </div>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
