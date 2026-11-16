"use client";

import { motion } from "framer-motion";
import { Heart, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { yatraSteps } from "@/lib/site-data";

const stepIcons = [Heart, MapPin, CheckCircle2, Sparkles];
const stepColors = [
  "from-rose-500 to-rose-600",
  "from-amber-500 to-amber-600",
  "from-emerald-500 to-emerald-600",
  "from-purple-500 to-purple-600",
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
            How Your Yatra Unfolds
          </Badge>
          <h2 id="how-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            From Sankalp to Darshan — In 4 Sacred Steps
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            We make your Braj Yatra as smooth as it is spiritual — from the first &ldquo;Radhe
            Radhe&rdquo; to the final darshan, every detail is handled with devotion.
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
            style={{ originX: 0, background: "linear-gradient(90deg, transparent, oklch(0.78 0.14 85), transparent)" }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {yatraSteps.map((step, i) => {
              const Icon = stepIcons[i] || Heart;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  {/* Icon circle with animated gradient pulse */}
                  <div className="relative mx-auto mb-5 w-24 h-24">
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${stepColors[i]} opacity-20`}
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
