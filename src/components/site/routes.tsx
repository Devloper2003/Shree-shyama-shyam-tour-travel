"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { popularRoutes } from "@/lib/site-data";

export function Routes() {
  const [query, setQuery] = useState("");

  const filtered = popularRoutes.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.from.toLowerCase().includes(q) ||
      r.to.toLowerCase().includes(q) ||
      r.popularFor.toLowerCase().includes(q)
    );
  });

  // When a "Book this route" button is clicked, scroll to contact and prefill
  const handleBookRoute = (from: string, to: string) => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Dispatch a custom event the contact form listens for
    window.dispatchEvent(
      new CustomEvent("prefill-booking", {
        detail: { pickup: from, drop: to, source: "route-card" },
      })
    );
  };

  return (
    <section
      id="routes"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="routes-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            Popular Routes
          </Badge>
          <h2 id="routes-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Most Booked Intercity Routes
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            A glimpse of the routes our travellers book most often. Prices shown are starting
            fares for a sedan on a one-way trip — final fare depends on vehicle and trip type.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search city or route (e.g. Delhi, Jaipur, Mumbai)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search routes"
          />
        </div>

        {/* Routes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r, i) => (
            <motion.div
              key={`${r.from}-${r.to}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
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
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No routes found for &quot;{query}&quot;. Try another city, or{" "}
            <a href="#contact" className="text-primary font-semibold underline-offset-4 hover:underline">
              request a custom route quote
            </a>
            .
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t see your route? We cover <strong className="text-foreground">all over India</strong> —
          just tell us your pickup and drop in the booking form.
        </p>
      </div>
    </section>
  );
}
