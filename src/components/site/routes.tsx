"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { popularRoutes } from "@/lib/site-data";
import { usePageStore } from "@/lib/page-store";

const ROUTES_PER_SLIDE = 6;

export function Routes() {
  const navigate = usePageStore((s) => s.navigate);
  const [query, setQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const filtered = useMemo(
    () =>
      popularRoutes.filter((r) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          r.from.toLowerCase().includes(q) ||
          r.to.toLowerCase().includes(q) ||
          r.popularFor.toLowerCase().includes(q)
        );
      }),
    [query]
  );

  // Split filtered routes into slides of ROUTES_PER_SLIDE
  const slides = useMemo(() => {
    const result: typeof popularRoutes[] = [];
    for (let i = 0; i < filtered.length; i += ROUTES_PER_SLIDE) {
      result.push(filtered.slice(i, i + ROUTES_PER_SLIDE));
    }
    return result;
  }, [filtered]);

  // Clamp currentSlide when filtered results change
  const totalSlides = slides.length;
  const safeSlide = Math.min(currentSlide, Math.max(0, totalSlides - 1));

  const goToSlide = (index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentSlide(clamped);
  };

  const goNext = () => goToSlide(safeSlide + 1);
  const goPrev = () => goToSlide(safeSlide - 1);

  // Reset slide when search changes
  const handleSearchChange = (value: string) => {
    setQuery(value);
    setCurrentSlide(0);
  };

  // When a "Book this route" button is clicked, navigate to Contact page with prefill
  const handleBookRoute = (from: string, to: string) => {
    navigate("contact", {
      contactPrefill: { pickup: from, drop: to, source: "route-card" },
    });
  };

  const canGoLeft = safeSlide > 0;
  const canGoRight = safeSlide < totalSlides - 1;
  const currentRoutes = slides[safeSlide] || [];

  return (
    <section
      id="routes"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="routes-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Popular Braj Routes
          </Badge>
          <h2 id="routes-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Most Booked Braj Pilgrimage Routes
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            A glimpse of the Braj routes our pilgrims book most often — from Delhi to Mathura,
            within the Braj circuit, and to specific sacred sites. Prices shown are starting
            fares for a sedan one-way.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search city or Braj site (e.g. Mathura, Vrindavan, Govardhan)"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
            aria-label="Search Braj routes"
          />
        </div>

        {/* Paged routes carousel — 6 routes per slide */}
        {totalSlides > 0 ? (
          <div className="relative">
            {/* Left slide button */}
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoLeft}
              aria-label="Previous routes slide"
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
                canGoLeft
                  ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right slide button */}
            <button
              type="button"
              onClick={goNext}
              disabled={!canGoRight}
              aria-label="Next routes slide"
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
                canGoRight
                  ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Edge fades */}
            {canGoLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-muted/40 to-transparent" aria-hidden="true" />
            )}
            {canGoRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-muted/40 to-transparent" aria-hidden="true" />
            )}

            {/* Slides container */}
            <div className="overflow-hidden px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeSlide}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {currentRoutes.map((r, i) => (
                    <motion.div
                      key={`${r.from}-${r.to}-${safeSlide}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      className="bg-background border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary shrink-0" />
                        <span className="font-semibold text-foreground">{r.from}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold text-foreground">{r.to}</span>
                      </div>

                      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>~ {r.approxKm} km</span>
                        <span className="text-foreground">|</span>
                        <span>{r.popularFor}</span>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">Starting from</p>
                          <p className="text-xl font-bold text-primary">
                            ₹{r.fromPrice.toLocaleString("en-IN")}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() => handleBookRoute(r.from, r.to)}
                        >
                          Book <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide indicators (dots) */}
            {totalSlides > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === safeSlide
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Slide counter */}
            {totalSlides > 1 && (
              <p className="text-center text-xs text-muted-foreground mt-2">
                Slide {safeSlide + 1} of {totalSlides} • {filtered.length} routes total
              </p>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No routes found for &quot;{query}&quot;. Try another Braj site, or{" "}
            <a href="#contact" className="text-primary font-semibold underline-offset-4 hover:underline">
              request a custom Braj route
            </a>
            .
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t see your route? We cover <strong className="text-foreground">all 84-kosa of Braj</strong> and
          every major city in India — just tell us your pickup and Braj destination in the booking form.
        </p>
      </div>
    </section>
  );
}
