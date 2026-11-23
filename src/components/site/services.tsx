"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Check, Star, Clock, MapPin, Users, ArrowRight, Calendar, Route, Crown, Sparkles, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { yatraPackages, type YatraPackageCategory } from "@/lib/site-data";

type TabKey = "all" | YatraPackageCategory;

const tabs: { key: TabKey; label: string; icon: typeof Star; description: string }[] = [
  { key: "all", label: "All Packages", icon: Star, description: "View our complete yatra offerings — same-day to 7-day grand tours" },
  { key: "day-tour", label: "1-Day Yatra", icon: Clock, description: "Same-day pilgrimage — perfect for time-short devotees" },
  { key: "short", label: "2-Day Circuit", icon: Route, description: "Comfortable pace covering Mathura, Gokul, Vrindavan & Govardhan" },
  { key: "complete", label: "3-Day Complete", icon: Crown, description: "Full 84-kosa Braj Mandala with all 12 main sites" },
  { key: "multicity", label: "Multi-City Tours", icon: MapPinned, description: "2N/3D to 6N/7D — Braj + Agra + Jaipur + Khajuraho combinations" },
  { key: "custom", label: "Custom Yatra", icon: Sparkles, description: "Tailored to your specific sankalp and group — fully customizable" },
];

export function Services() {
  const [active, setActive] = useState<TabKey>("all");

  const filtered =
    active === "all" ? yatraPackages : yatraPackages.filter((p) => p.tab === active);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <MapPin className="w-3 h-3 mr-1" /> Yatra Packages
          </Badge>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Choose Your Sacred Braj Yatra
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From a single day of darshan at Mathura-Vrindavan to the complete 3-day Braj
            Mandala circuit — every package is led by Braj-born guides and includes AC cab,
            driver-cum-guide, and all temple visits.
          </p>
        </div>

        {/* Animated tabs */}
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((t) => {
              const isActive = active === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="services-tab-pill"
                      className="absolute inset-0 rounded-full bg-primary z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${active}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            {tabs.find((t) => t.key === active)?.description}
          </motion.p>
        </AnimatePresence>

        {/* Package cards grid with animated transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  className={`relative h-full flex flex-col ${
                    p.popular ? "border-gold ring-1 ring-gold/40" : ""
                  } hover:shadow-lg hover:-translate-y-1 transition-all`}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gold text-accent-foreground hover:bg-gold gap-1">
                        <Star className="w-3 h-3 fill-current" /> Most Booked
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" /> {p.duration}
                      </span>
                      {p.days > 0 && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" /> {p.days} day{p.days > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    {/* Temples visited */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" /> Sites Covered
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.temples.slice(0, 5).map((t) => (
                          <Badge key={t} variant="outline" className="text-[11px] font-normal">
                            {t}
                          </Badge>
                        ))}
                        {p.temples.length > 5 && (
                          <Badge variant="outline" className="text-[11px] font-normal">
                            +{p.temples.length - 5} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Inclusions</p>
                      <ul className="space-y-1">
                        {p.inclusions.slice(0, 4).map((inc) => (
                          <li key={inc} className="text-xs text-foreground/80 flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Best for */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" /> Best For
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.bestFor.map((b) => (
                          <Badge key={b} variant="secondary" className="text-[11px] font-normal">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="border-t border-border pt-3">
                      {p.price > 0 ? (
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm text-muted-foreground">Starting from</span>
                          <span className="text-xl font-bold text-primary">
                            ₹{p.price.toLocaleString("en-IN")}
                            <span className="text-xs text-muted-foreground font-normal">/person</span>
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-primary font-medium">
                          Custom quote — based on your sankalp
                        </p>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Link href="#contact" className="w-full">
                      <Button className="w-full gap-2">
                        Book This Yatra <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 text-center text-sm text-muted-foreground max-w-3xl mx-auto">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <Check className="w-4 h-4 text-primary" />
            All packages include AC cab, driver-cum-guide, fuel, toll, parking, and temple visits.
          </p>
          <p className="mt-2">
            Need a custom yatra for your sankalp or group?{" "}
            <Link href="#contact" className="text-primary font-semibold underline-offset-4 hover:underline">
              Tell us your requirement
            </Link>{" "}
            and we&apos;ll craft a tailored itinerary.
          </p>
        </div>

        {/* Customization callout — from client's audio message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl mx-auto bg-saffron-gradient text-white rounded-xl p-6 text-center"
        >
          <p className="text-lg font-bold mb-1">Customization Available for Every Yatra</p>
          <p className="text-sm text-white/90">
            We customize packages as per your demand — 2N/3D, 4N/5D with Agra, 6N/7D with
            Jaipur &amp; Khajuraho, or any combination you desire. Share your sankalp and we
            craft the perfect itinerary for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
