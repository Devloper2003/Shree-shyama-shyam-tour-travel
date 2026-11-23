"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
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

  const filtered = testimonials.filter((t) =>
    filters.find((f) => f.key === active)?.match(t)
  );

  // Duplicate the list so the marquee loops seamlessly.
  // Rendering the same cards twice means translating from 0 to -50%
  // brings us back to the exact same visual position.
  const loopCards = [...filtered, ...filtered];

  // Speed scales with card count so reading time stays comfortable.
  const animationDuration = `${Math.max(30, filtered.length * 12)}s`;

  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40 overflow-hidden"
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

        {/* Auto-scrolling marquee — right to left, continuous loop, no buttons */}
        <div className="relative">
          {/* Edge fades for visual polish */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-muted/60 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-muted/60 to-transparent"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filtered.length > 0 ? (
                <div className="testimonial-marquee-track flex gap-5" style={{ animationDuration }}>
                  {loopCards.map((t, i) => (
                    <div
                      key={`${t.name}-${i}`}
                      className="shrink-0 w-[300px] sm:w-[340px] lg:w-[360px]"
                    >
                      <Card className="h-full hover:shadow-md transition-shadow">
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full text-center text-muted-foreground py-10">
                  No pilgrim reviews in this category yet. Be the first to share your Braj experience!
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .testimonial-marquee-track {
          width: max-content;
          animation-name: testimonial-scroll-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        /* Pause on hover so users can read a review comfortably */
        .testimonial-marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes testimonial-scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Move left by exactly half the track width — since we duplicated
               the card list, this brings us back to the same visual position
               and the loop is seamless. */
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonial-marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
