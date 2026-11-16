"use client";

import { motion } from "framer-motion";
import { Award, Users, MapPinned, Heart } from "lucide-react";
import { OmIcon } from "@/components/site/om-icon";
import { Badge } from "@/components/ui/badge";
import { aboutPoints } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { CountUp } from "@/components/site/count-up";

const statCards = [
  { icon: Users, target: 25000, suffix: "+", label: "Blessed Pilgrims" },
  { icon: MapPinned, target: 84, suffix: "", label: "Sacred Sites Covered" },
  { icon: Heart, target: 12, suffix: "", label: "Main Braj Temples" },
  { icon: Award, target: siteConfig.experienceYears, suffix: "+", label: "Years of Seva" },
];

export function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: text content */}
          <div>
            <Badge variant="secondary" className="mb-3">
              <OmIcon className="w-3 h-3 mr-1" /> About Us
            </Badge>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              {siteConfig.name}
            </h2>
            <p className="mt-2 text-primary font-medium">{siteConfig.tagline}</p>
            <p className="mt-1 text-sm text-gold">{siteConfig.sanskritTagline}</p>

            <div className="mt-6 space-y-5">
              {aboutPoints.map((p, i) => (
                <motion.div
                  key={p.heading}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">{p.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: stat grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-braj-gradient text-white rounded-2xl p-8 shadow-lg relative overflow-hidden animate-sacred-glow"
          >
            {/* Om watermark */}
            <OmIcon className="absolute -top-4 -right-4 w-32 h-32 text-gold/10 pointer-events-none" aria-hidden="true" />
            <p className="relative text-gold text-sm font-semibold uppercase tracking-wider">
              Our Sacred Numbers
            </p>
            <h3 className="relative text-2xl font-bold mt-2 mb-6">
              A decade of devoted seva
            </h3>
            <div className="relative grid grid-cols-2 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-5 text-center">
                  <s.icon className="w-6 h-6 text-gold mx-auto" />
                  <p className="text-3xl font-bold text-white mt-2">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-white/85 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="relative mt-6 text-sm text-white/80 leading-relaxed">
              Founded in {siteConfig.establishedYear} in the heart of Braj — Mathura — we started
              with a single sedan and a devotee&apos;s love for sharing Krishna&apos;s sacred land.
              Today, our network covers all 84-kosa of the Braj Mandala, but our family-run seva
              and devotion remain unchanged.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
