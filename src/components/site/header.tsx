"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { OmIcon } from "@/components/site/om-icon";
import { Button } from "@/components/ui/button";
import { siteConfig, buildTelLink } from "@/lib/site-config";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Yatra Packages", href: "#services" },
  { label: "Sacred Sites", href: "#sacred-sites" },
  { label: "Braj Map", href: "#coverage" },
  { label: "Festivals", href: "#auspicious-dates" },
  { label: "Routes", href: "#routes" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Yatra", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur shadow-md border-b border-border"
          : "bg-background/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 shrink-0" aria-label={siteConfig.name}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-braj-deep flex items-center justify-center text-gold animate-sacred-glow">
              <OmIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="hidden xs:block sm:block">
              <p className="text-sm sm:text-base font-bold leading-tight text-foreground">
                Shri Shyam Travels
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                Mathura • Vrindavan • Braj Yatra
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href={buildTelLink()} aria-label="Call us" className="hidden sm:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">Call Now</span>
              </Button>
            </a>
            <Link href="#contact" className="hidden sm:block">
              <Button size="sm" className="gap-2">
                Book a Cab
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-background shadow-xl flex flex-col animate-fade-up">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-bold text-foreground">Menu</span>
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="flex flex-col p-2 overflow-y-auto" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-foreground/90 hover:bg-muted hover:text-primary rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto p-4 border-t border-border flex flex-col gap-2">
              <a href={buildTelLink()}>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="w-4 h-4" /> Call {siteConfig.phoneDisplay}
                </Button>
              </a>
              <Link href="#contact" onClick={() => setOpen(false)}>
                <Button className="w-full">Book a Cab</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
