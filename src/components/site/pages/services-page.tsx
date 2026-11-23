"use client";

import { SacredSites } from "@/components/site/sacred-sites";
import { Coverage } from "@/components/site/coverage";
import { AuspiciousDates } from "@/components/site/auspicious-dates";
import { Routes } from "@/components/site/routes";
import { FareCalculator } from "@/components/site/fare-calculator";
import { Fleet } from "@/components/site/fleet";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function ServicesPage() {
  return (
    <div className="pt-8 pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" /> Our Services
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Braj Yatra Services & Sacred Sites
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Explore the complete 84-kosa Braj Mandala — sacred sites, pilgrimage routes,
            festival calendar, fare calculator, and our pilgrimage fleet.
          </p>
        </div>
      </div>
      <SacredSites />
      <Coverage />
      <AuspiciousDates />
      <Routes />
      <FareCalculator />
      <Fleet />
    </div>
  );
}
