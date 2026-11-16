"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, Users, Wind, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { vehicles } from "@/lib/site-data";

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-background" aria-labelledby="services-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Our Fleet
          </Badge>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Choose the Right Cab for Your Journey
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From budget sedans to luxury coaches — we have a sanitized, well-maintained vehicle
            for every group size, route, and occasion. All prices are per-kilometre and fully
            inclusive of fuel, driver allowance, and state taxes.
          </p>
        </div>

        {/* Vehicle cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card
                className={`relative h-full flex flex-col ${
                  v.popular ? "border-gold ring-1 ring-gold/40" : ""
                }`}
              >
                {v.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
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
                  {/* Quick specs */}
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

                  {/* Best for */}
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

                  {/* Pricing */}
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
        </div>

        {/* Footnote */}
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
