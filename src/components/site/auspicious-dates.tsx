"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Sparkles, MapPin, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auspiciousDates } from "@/lib/site-data";
import { usePageStore } from "@/lib/page-store";

export function AuspiciousDates() {
  const navigate = usePageStore((s) => s.navigate);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
  }, [updateScrollButtons]);

  const scrollCards = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      id="auspicious-dates"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="dates-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <Calendar className="w-3 h-3 mr-1" /> Auspicious Yatra Dates
          </Badge>
          <h2 id="dates-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Sacred Festival Calendar of Braj
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Certain days in Braj are exponentially more meritorious for yatra. Plan your
            pilgrimage around these divine festivals — when the spiritual energy of Braj is at
            its peak.
          </p>
        </div>

        {/* Festival cards carousel — horizontal scroll with left/right buttons */}
        <div className="relative">
          {/* Left scroll button */}
          <button
            type="button"
            onClick={() => scrollCards("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll festivals left"
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
            aria-label="Scroll festivals right"
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

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {auspiciousDates.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="shrink-0 w-[280px] sm:w-[310px] lg:w-[330px]"
              >
                <Card className="h-full hover:shadow-lg hover:border-gold/50 transition-all relative overflow-hidden">
                  {/* Decorative top strip */}
                  <div className="bg-saffron-gradient h-1.5" aria-hidden="true" />

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="w-3 h-3" /> {d.monthCode}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-foreground leading-tight min-h-[3.5rem]">{d.festival}</h3>
                    {d.sanskritName && (
                      <p className="text-sm text-primary font-medium mt-0.5">{d.sanskritName}</p>
                    )}

                    <p className="text-xs text-muted-foreground mt-2">{d.month}</p>

                    <p className="text-sm text-muted-foreground leading-relaxed mt-3 line-clamp-3">
                      {d.significance}
                    </p>

                    <div className="mt-4 pt-4 border-t border-border space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Best Yatra</p>
                          <p className="text-muted-foreground line-clamp-2">{d.bestYatra}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Recommended Package</p>
                          <p className="text-muted-foreground line-clamp-2">{d.recommendedPackage}</p>
                        </div>
                      </div>
                    </div>

                    <div className="block mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-1.5"
                        onClick={() =>
                          navigate("contact", {
                            contactPrefill: {
                              yatraPackage: d.recommendedPackage,
                              notes: `Planning yatra for ${d.festival}. Best yatra site: ${d.bestYatra}.`,
                              source: "auspicious-dates",
                            },
                          })
                        }
                      >
                        Book for {d.festival.split(" ")[0]} <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Festival dates vary each year based on the Hindu panchang.{" "}
          <button
            onClick={() => navigate("contact")}
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            Contact us
          </button>{" "}
          to confirm exact dates for your planned yatra.
        </p>
      </div>
    </section>
  );
}
