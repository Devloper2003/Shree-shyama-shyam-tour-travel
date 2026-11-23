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
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 shrink-0"
            aria-label={siteConfig.name}
          >
            <img
              src="/logo.png"
              alt="Shri Shyama Shyam Tour & Travels logo"
              className="h-12 sm:h-14 w-auto object-contain"
              width={48}
              height={56}
            />
            <div className="hidden md:block">
              <p className="text-sm sm:text-base font-bold leading-tight text-foreground">
                Shri Shyama Shyam
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                Tour & Travels • Mathura Vrindavan
              </p>
            </div>
          </button>

          {/* Desktop nav — only 6 tabs */}
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

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a href={buildTelLink()} aria-label="Call us" className="hidden sm:flex">
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden md:inline">Call Now</span>
              </Button>
            </a>
            <Button
              size="sm"
              className="gap-2"
              onClick={() => handleNav("contact")}
            >
              Book Yatra
            </Button>

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
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors text-left ${
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
            <div className="mt-auto p-4 border-t border-border flex flex-col gap-2">
              <a href={buildTelLink()}>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="w-4 h-4" /> Call {siteConfig.phoneDisplay}
                </Button>
              </a>
              <Button className="w-full" onClick={() => handleNav("contact")}>
                Book Your Yatra
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
