"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Star, Sparkles, Crown, Baby, Heart, Mountain, Waves, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollableTabs } from "@/components/site/scrollable-tabs";
import { sacredSites, type SacredSiteCategory } from "@/lib/site-data";

type TabKey = "all" | SacredSiteCategory;

const tabs: { key: TabKey; label: string; icon: typeof MapPin }[] = [
  { key: "all", label: "All Sites", icon: MapPin },
  { key: "birthplace", label: "Birthplace", icon: Crown },
  { key: "childhood", label: "Childhood Leelas", icon: Baby },
  { key: "ras-lila", label: "Ras Lila Sites", icon: Heart },
  { key: "govardhan", label: "Govardhan & Kunds", icon: Mountain },
  { key: "radha", label: "Radha's Abode", icon: Sparkles },
  { key: "ghat", label: "Yamuna Ghats", icon: Waves },
];

export function SacredSites() {
  const [active, setActive] = useState<TabKey>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filtered =
    active === "all" ? sacredSites : sacredSites.filter((s) => s.category === active);

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
      id="sacred-sites"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="sacred-sites-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" /> Sacred Sites of Braj
          </Badge>
          <h2 id="sacred-sites-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Walk Through Krishna&apos;s Divine Pastimes
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From the prison cell where Krishna appeared, to the forests of Vrindavan where He
            performed the Maha-Ras, to the hill He lifted on His little finger — explore the
            sacred sites of Braj Mandala with us.
          </p>
        </div>

        {/* Scrollable uniform-width tabs with left/right navigation */}
        <ScrollableTabs
          tabs={tabs}
          active={active}
          onChange={(k) => setActive(k as TabKey)}
          layoutId="sites-tab"
          tabWidth={170}
        />

        {/* Sites carousel — horizontal scroll with left/right buttons */}
        <div className="relative">
          {/* Left scroll button */}
          <button
            type="button"
            onClick={() => scrollCards("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll sites left"
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
            aria-label="Scroll sites right"
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
            <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
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
              {filtered.map((site, i) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="shrink-0 w-[280px] sm:w-[310px] lg:w-[330px]"
                >
                  <Card className="h-full hover:shadow-lg hover:border-gold/50 transition-all overflow-hidden">
                    {/* Real temple image */}
                    <div className="relative h-44 overflow-hidden bg-muted">
                      <img
                        src={site.image}
                        alt={`${site.name} — ${site.location}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      {/* Location badge overlay */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="gap-1 bg-background/90 backdrop-blur-sm">
                          <MapPin className="w-3 h-3 text-primary" /> {site.location}
                        </Badge>
                      </div>
                      {/* Gradient overlay for text readability at bottom */}
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                      {site.sanskritName && (
                        <p className="absolute bottom-2 left-3 text-white text-sm font-medium drop-shadow-lg">
                          {site.sanskritName}
                        </p>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-foreground leading-tight mb-3">{site.name}</h3>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {site.significance}
                      </p>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Best Time</p>
                            <p className="text-muted-foreground line-clamp-2">{site.bestTime}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-foreground">Must See</p>
                            <p className="text-muted-foreground line-clamp-2">{site.mustSee}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          These 12 are the main sites — our yatra packages also cover the smaller sacred spots
          like Kusum Sarovar, Mansi Ganga, Mor Kuti, Uncha Gaon, and the 84-kosa parikrama
          route.
        </p>
      </div>
    </section>
  );
}
