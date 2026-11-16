"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ShieldCheck,
  Receipt,
  Sparkles,
  MapPin,
  Timer,
  HandPlatter,
  type LucideIcon,
} from "lucide-react";
import { whyChooseUs } from "@/lib/site-data";

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  "shield-check": ShieldCheck,
  receipt: Receipt,
  sparkles: Sparkles,
  "map-pin": MapPin,
  timer: Timer,
  "hand-platter": HandPlatter,
};

export function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="why-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
            Why Choose Us
          </p>
          <h2
            id="why-heading"
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Built on Trust, Driven by Service
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            We do not just rent cabs — we deliver reliable journeys. Every promise below is the
            standard you get on every single booking, every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
