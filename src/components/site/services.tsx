"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Check, Star, Users, Wind, Briefcase, ArrowRight, Wallet, Crown, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { vehicles, type VehicleCategory } from "@/lib/site-data";

type TabKey = "all" | VehicleCategory;

const tabs: { key: TabKey; label: string; icon: typeof Wallet; description: string }[] = [
  { key: "all", label: "All Vehicles", icon: Star, description: "View our complete fleet" },
  { key: "economy", label: "Economy", icon: Wallet, description: "Budget-friendly for everyday trips" },
  { key: "premium", label: "Premium", icon: Crown, description: "Executive comfort for long journeys" },
  { key: "group", label: "Group Travel", icon: Users2, description: "Spacious options for large parties" },
];

export function Services() {
  const [active, setActive] = useState<TabKey>("all");

  const filtered =
    active === "all" ? vehicles : vehicles.filter((v) => v.tab === active);

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Our Fleet
          </Badge>
          <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Choose the Right Cab for Your Journey
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From budget sedans to luxury coaches — pick a category to explore. All prices are
            per-kilometre and fully inclusive of fuel, driver allowance, and state taxes.
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

        {/* Vehicle cards grid with animated transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  className={`relative h-full flex flex-col ${
                    v.popular ? "border-gold ring-1 ring-gold/40" : ""
                  } hover:shadow-lg hover:-translate-y-1 transition-all`}
                >
                  {v.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gold text-accent-foreground hover:bg-gold gap-1">
                        <Star className="w-3 h-3 fill-current" /> Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {v.category}
                    </p>
                    <h3 className="text-xl font-bold text-foreground">{v.name}</h3>
                  </CardHeader>

                  <CardContent className="flex-1 space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-muted rounded-md py-2 px-1">
                        <Users className="w-4 h-4 mx-auto text-primary" />
                        <p className="text-[11px] text-muted-foreground mt-1">Seating</p>
                        <p className="text-xs font-semibold text-foreground">{v.seating}</p>
                      </div>
                      <div className="bg-muted rounded-md py-2 px-1">
                        <Wind className="w-4 h-4 mx-auto text-primary" />
                        <p className="text-[11px] text-muted-foreground mt-1">AC</p>
                        <p className="text-xs font-semibold text-foreground">{v.ac ? "Yes" : "—"}</p>
                      </div>
                      <div className="bg-muted rounded-md py-2 px-1">
                        <Briefcase className="w-4 h-4 mx-auto text-primary" />
                        <p className="text-[11px] text-muted-foreground mt-1">Luggage</p>
                        <p className="text-xs font-semibold text-foreground">{v.luggage}</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Examples: <span className="text-foreground font-medium">{v.example}</span>
                    </p>

                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Best for</p>
                      <div className="flex flex-wrap gap-1.5">
                        {v.bestFor.map((b) => (
                          <Badge key={b} variant="outline" className="text-[11px] font-normal">
                            {b}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-border pt-3 space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted-foreground">Per KM</span>
                        <span className="text-lg font-bold text-foreground">
                          ₹{v.perKmRate}
                          <span className="text-xs text-muted-foreground font-normal">/km</span>
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted-foreground">Starting from</span>
                        <span className="text-base font-semibold text-primary">
                          ₹{v.startingFrom.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <Link href="#contact" className="w-full">
                      <Button className="w-full gap-2">
                        Book {v.name} <ArrowRight className="w-4 h-4" />
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
            All prices include fuel, driver allowance, and state taxes.
          </p>
          <p className="mt-2">
            Need a custom package or a vehicle not listed above?{" "}
            <Link href="#contact" className="text-primary font-semibold underline-offset-4 hover:underline">
              Contact us
            </Link>{" "}
            for a tailored quote.
          </p>
        </div>
      </div>
    </section>
  );
}
