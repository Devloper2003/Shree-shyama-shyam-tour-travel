"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

        {/* Animated filter tabs */}
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => {
              const isActive = active === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  aria-pressed={isActive}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive ? "text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="testimonials-tab-pill"
                      className="absolute inset-0 rounded-full bg-primary z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Testimonials grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
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
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-10">
                No pilgrim reviews in this category yet. Be the first to share your Braj experience!
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
