"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Testimonials
          </Badge>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            What Our Travellers Say
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Real reviews from real travellers across India. We are proud of the trust they place
            in us for their journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card className="h-full">
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
          ))}
        </div>
      </div>
    </section>
  );
}
