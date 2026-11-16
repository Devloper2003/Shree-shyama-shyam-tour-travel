"use client";

import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";

type CityDot = { name: string; x: number; y: number; size: number; delay: number };

// Stylized city dots positioned on a stylized India map background.
// Coordinates are percentage-based within the SVG viewBox (0-100 x, 0-100 y).
const cities: CityDot[] = [
  { name: "Delhi", x: 35, y: 22, size: 7, delay: 0 },
  { name: "Mumbai", x: 22, y: 60, size: 7, delay: 0.3 },
  { name: "Jaipur", x: 30, y: 28, size: 5, delay: 0.6 },
  { name: "Bangalore", x: 38, y: 78, size: 6, delay: 0.9 },
  { name: "Chennai", x: 50, y: 80, size: 6, delay: 1.2 },
  { name: "Kolkata", x: 65, y: 38, size: 6, delay: 1.5 },
  { name: "Hyderabad", x: 42, y: 60, size: 5, delay: 1.8 },
  { name: "Ahmedabad", x: 22, y: 42, size: 5, delay: 2.1 },
  { name: "Pune", x: 26, y: 62, size: 5, delay: 2.4 },
  { name: "Mathura", x: 36, y: 24, size: 4, delay: 2.7 },
  { name: "Varanasi", x: 50, y: 32, size: 4, delay: 3.0 },
  { name: "Amritsar", x: 33, y: 14, size: 4, delay: 3.3 },
  { name: "Goa", x: 30, y: 72, size: 4, delay: 3.6 },
  { name: "Rishikesh", x: 36, y: 18, size: 4, delay: 3.9 },
];

const statCards = [
  { target: 250, suffix: "+", label: "Cities Covered" },
  { target: 28, suffix: "+", label: "States & UTs" },
  { target: 5000, suffix: "+", label: "Routes Serviced" },
  { target: 24, suffix: "x7", label: "Available Hours" },
];

export function Coverage() {
  return (
    <section
      id="coverage"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="coverage-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text + stats */}
          <div>
            <Badge variant="secondary" className="mb-3">
              <MapPin className="w-3 h-3 mr-1" /> Pan India Coverage
            </Badge>
            <h2 id="coverage-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              One Cab Service,{" "}
              <span className="text-primary">Every Corner of India</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              From the Himalayan foothills to Kanyakumari, from metropolitan hubs to pilgrimage
              towns — our verified drivers and clean cabs are available wherever your journey
              takes you.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {statCards.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-muted/50 border border-border rounded-xl p-5 text-center"
                >
                  <p className="text-3xl font-bold text-primary">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <p>
                Even if you don&apos;t see your city listed, just tell us your pickup and drop —
                we cover every route that has a road.
              </p>
            </div>
          </div>

          {/* Right: animated stylized India map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-navy-gradient text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
              </div>
              <p className="relative text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Major Service Hubs
              </p>

              <svg viewBox="0 0 100 100" className="relative w-full h-auto" role="img" aria-label="Map of India with major service hubs">
                {/* Stylized India silhouette (simplified) */}
                <path
                  d="M40 8 L48 10 L55 14 L62 12 L70 18 L78 25 L82 35 L80 45 L75 55 L72 65 L68 75 L60 85 L50 90 L42 88 L35 82 L28 75 L22 65 L18 55 L20 45 L25 35 L30 25 L35 15 Z"
                  fill="oklch(1 0 0 / 8%)"
                  stroke="oklch(0.78 0.13 85)"
                  strokeWidth="0.5"
                  strokeDasharray="2 1"
                  className="opacity-70"
                />

                {/* Pulsing city dots */}
                {cities.map((c) => (
                  <g key={c.name}>
                    {/* Pulse ring */}
                    <motion.circle
                      cx={c.x}
                      cy={c.y}
                      r={c.size / 2}
                      fill="oklch(0.78 0.13 85)"
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: 0, scale: 3 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: c.delay,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                    />
                    {/* Solid dot */}
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={c.size / 5}
                      fill="oklch(0.78 0.13 85)"
                    />
                    {/* Label */}
                    <text
                      x={c.x + 1.5}
                      y={c.y + 0.8}
                      fontSize="2"
                      fill="white"
                      className="font-semibold"
                      style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.4)", strokeWidth: 0.3 }}
                    >
                      {c.name}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="relative mt-4 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  Active service hubs
                </span>
                <span>+ many more across India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
