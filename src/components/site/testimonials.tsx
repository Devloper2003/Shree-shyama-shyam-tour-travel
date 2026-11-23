"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollableTabs } from "@/components/site/scrollable-tabs";
import { testimonials, type Testimonial } from "@/lib/site-data";

type FilterKey = "all" | "complete" | "day-tour" | "airport" | "custom";

const filters: { key: FilterKey; label: string; match: (t: Testimonial) => boolean }[] = [
  { key: "all", label: "All Reviews", match: () => true },
  {
    key: "complete",
    label: "Multi-Day Yatra",
    match: (t) => /3-Day|2-Day|Complete/i.test(t.trip),
  },
  {
    key: "day-tour",
    label: "Same-Day Yatra",
    match: (t) => /Same Day|Govardhan|Barsana/i.test(t.trip),
  },
  {
    key: "airport",
    label: "Airport Transfer",
    match: (t) => /Airport/i.test(t.trip),
  },
  {
    key: "custom",
    label: "Custom Yatra",
    match: (t) => /Custom/i.test(t.trip),
  },
];

export function Testimonials() {
  const [active, setActive] = useState<FilterKey>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filtered = testimonials.filter((t) =>
    filters.find((f) => f.key === active)?.match(t)
  );

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons, active]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [active]);

  const scrollCards = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Pilgrim Experiences
          </Badge>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            What Our Pilgrims Say
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Real experiences from devotees who walked Braj&apos;s sacred grounds with us. Filter
            by yatra type to read stories similar to the journey you&apos;re planning.
          </p>
        </div>

        {/* Scrollable uniform-width tabs with left/right navigation */}
        <ScrollableTabs
          tabs={filters}
          active={active}
          onChange={(k) => setActive(k as FilterKey)}
          layoutId="testimonials-tab"
        />

        {/* Testimonials carousel — horizontal scroll with left/right buttons */}
        <div className="relative">
          {/* Left scroll button */}
          <button
            type="button"
            onClick={() => scrollCards("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll testimonials left"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
              canScrollLeft
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right scroll button */}
          <button
            type="button"
            onClick={() => scrollCards("right")}
            disabled={!canScrollRight}
            aria-label="Scroll testimonials right"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
              canScrollRight
                ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Edge fades */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-muted/40 to-transparent" aria-hidden="true" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-muted/40 to-transparent" aria-hidden="true" />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              ref={carouselRef}
              className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filtered.length > 0 ? (
                filtered.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="shrink-0 w-[300px] sm:w-[340px] lg:w-[360px]"
                  >
                    <Card className="h-full hover:shadow-md hover:-translate-y-1 transition-all">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                          <Quote className="w-8 h-8 text-primary/30" />
                          <div className="flex" aria-label={`${t.rating} out of 5 stars`}>
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-4 h-4 ${
                                  idx < t.rating
                                    ? "fill-gold text-gold"
                                    : "text-muted-foreground/40"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-foreground/90 leading-relaxed flex-1">
                          &ldquo;{t.text}&rdquo;
                        </p>
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="font-semibold text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.location}</p>
                          <p className="text-xs text-primary mt-1">{t.trip}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="w-full text-center text-muted-foreground py-10">
                  No pilgrim reviews in this category yet. Be the first to share your Braj experience!
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
