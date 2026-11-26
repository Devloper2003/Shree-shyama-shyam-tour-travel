"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, buildTelLink } from "@/lib/site-config";
import { usePageStore, type PageName } from "@/lib/page-store";

const navItems: { label: string; page: PageName }[] = [
  { label: "Home", page: "home" },
  { label: "Package", page: "package" },
  { label: "Services", page: "services" },
  { label: "Blogs", page: "blogs" },
  { label: "Contact", page: "contact" },
  { label: "About", page: "about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const currentPage = usePageStore((s) => s.currentPage);
  const navigate = usePageStore((s) => s.navigate);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (page: PageName) => {
    navigate(page);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur shadow-md border-b border-border"
          : "bg-background/90 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-3 sm:px-4 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0"
            aria-label={siteConfig.name}
          >
            <img
              src="/logo.png"
              alt="Sri Shyama Tour & Travels logo"
              className="h-10 sm:h-12 w-auto object-contain shrink-0"
              width={40}
              height={40}
            />
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-bold leading-tight text-foreground truncate">
                Sri Shyama Travels
              </p>
              <p className="text-[10px] text-muted-foreground leading-tight">
                Tour & Travels • Mathura Vrindavan
              </p>
            </div>
          </button>

          {/* Desktop nav — only show on large screens */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-foreground/80 hover:text-primary hover:bg-muted"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions — optimized for mobile touch targets */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Call button — show icon only on mobile, icon+text on larger */}
            <a href={buildTelLink()} aria-label="Call us" className="flex">
              <Button variant="outline" size="icon" className="h-11 w-11 sm:hidden">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">Call Now</span>
              </Button>
            </a>
            {/* Book Yatra button */}
            <Button
              size="sm"
              className="h-11 px-3 sm:px-4 sm:h-9"
              onClick={() => handleNav("contact")}
            >
              <span className="hidden sm:inline">Book Yatra</span>
              <span className="sm:hidden">Book</span>
            </Button>

            {/* Mobile menu button — larger touch target (44px) */}
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — full screen overlay */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] max-w-[85vw] bg-background shadow-xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto"
                width={40}
                height={40}
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            {/* Nav items — large touch targets */}
            <nav className="flex flex-col p-2 overflow-y-auto flex-1" aria-label="Mobile navigation">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`px-4 py-4 text-base font-medium rounded-md transition-colors text-left min-h-[52px] flex items-center ${
                      isActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-foreground/90 hover:bg-muted hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
            {/* Bottom actions */}
            <div className="p-4 border-t border-border flex flex-col gap-2">
              <a href={buildTelLink()}>
                <Button variant="outline" className="w-full h-12 gap-2 text-base">
                  <Phone className="w-5 h-5" /> {siteConfig.phoneDisplay}
                </Button>
              </a>
              <Button
                className="w-full h-12 text-base"
                onClick={() => handleNav("contact")}
              >
                Book Your Yatra
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
