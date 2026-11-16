"use client";

import { motion } from "framer-motion";
import { ClipboardList, Car, CheckCircle2, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: ClipboardList,
    title: "1. Tell Us Your Trip",
    description:
      "Fill the booking form or message us on WhatsApp with your pickup, drop, date, and vehicle preference. Takes less than a minute.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Car,
    title: "2. Choose Your Cab",
    description:
      "We suggest the best vehicle for your route, group size, and budget. Pick from Sedan, SUV, Innova, Tempo Traveller or luxury options.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: CheckCircle2,
    title: "3. We Confirm & Dispatch",
    description:
      "Receive driver name, photo, and vehicle number 30 minutes before pickup. Track your cab and stay in touch with the driver.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Route,
    title: "4. Enjoy Your Journey",
    description:
      "A verified, experienced driver takes you safely to your destination. Pay after the trip by UPI, card, or cash — as per your convenience.",
    color: "from-rose-500 to-rose-600",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-muted/40"
      aria-labelledby="how-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-3">
            How It Works
          </Badge>
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Book in 4 Simple Steps
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From enquiry to destination — our streamlined process ensures a smooth, reliable
            experience every single time.
          </p>
        </div>

        <div className="relative">
          {/* Animated connecting line (desktop) */}
          <motion.div
            className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 mx-16"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originX: 0, background: "linear-gradient(90deg, transparent, oklch(0.78 0.13 85), transparent)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  {/* Icon circle with animated gradient */}
                  <div className="relative mx-auto mb-5 w-24 h-24">
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                    <div className="relative w-24 h-24 rounded-full bg-background border-2 border-gold flex items-center justify-center shadow-md">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-accent-foreground text-xs font-bold flex items-center justify-center shadow">
                      {i + 1}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
