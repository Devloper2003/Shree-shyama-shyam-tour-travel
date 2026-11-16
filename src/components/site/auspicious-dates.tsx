"use client";

import { motion } from "framer-motion";
import { Calendar, Sparkles, MapPin, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auspiciousDates } from "@/lib/site-data";

export function AuspiciousDates() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auspiciousDates.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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

                  <h3 className="text-lg font-bold text-foreground leading-tight">{d.festival}</h3>
                  {d.sanskritName && (
                    <p className="text-sm text-primary font-medium mt-0.5">{d.sanskritName}</p>
                  )}

                  <p className="text-xs text-muted-foreground mt-2">{d.month}</p>

                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    {d.significance}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border space-y-2">
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Best Yatra</p>
                        <p className="text-muted-foreground">{d.bestYatra}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Recommended Package</p>
                        <p className="text-muted-foreground">{d.recommendedPackage}</p>
                      </div>
                    </div>
                  </div>

                  <Link href="#contact" className="block mt-4">
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      Book for {d.festival.split(" ")[0]} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Festival dates vary each year based on the Hindu panchang.{" "}
          <Link href="#contact" className="text-primary font-semibold underline-offset-4 hover:underline">
            Contact us
          </Link>{" "}
          to confirm exact dates for your planned yatra.
        </p>
      </div>
    </section>
  );
}
