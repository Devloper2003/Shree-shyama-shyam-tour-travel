"use client";

import { motion } from "framer-motion";
import { Award, Users, MapPinned, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { aboutPoints } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

const statCards = [
  { icon: Users, value: siteConfig.stats.happyClients, label: "Happy Travellers" },
  { icon: MapPinned, value: siteConfig.stats.citiesCovered, label: "Cities Covered" },
  { icon: Car, value: siteConfig.stats.fleetSize, label: "Vehicles in Fleet" },
  { icon: Award, value: `${siteConfig.experienceYears}+`, label: "Years of Service" },
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
              About Us
            </Badge>
            <h2 id="about-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              {siteConfig.name}
            </h2>
            <p className="mt-3 text-primary font-medium">{siteConfig.tagline}</p>

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
            className="bg-navy-gradient text-white rounded-2xl p-8 shadow-lg"
          >
            <p className="text-gold text-sm font-semibold uppercase tracking-wider">
              Our Numbers
            </p>
            <h3 className="text-2xl font-bold mt-2 mb-6">
              A decade of dependable journeys
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-5 text-center">
                  <s.icon className="w-6 h-6 text-gold mx-auto" />
                  <p className="text-3xl font-bold text-white mt-2">{s.value}</p>
                  <p className="text-xs text-white/85 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-white/80 leading-relaxed">
              Founded in {siteConfig.establishedYear}, we started with a single sedan and a
              promise of reliability. Today, our network spans every major Indian city — but our
              family-run ethos and attention to detail remain unchanged.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
