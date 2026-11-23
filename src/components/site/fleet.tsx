"use client";

import { motion } from "framer-motion";
import { Users, Wind, Badge as BadgeIcon, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { vehicles } from "@/lib/site-data";

/**
 * Inline SVG illustrations of each cab type — no external image dependency.
 * Each is a simplified, branded side view of the vehicle category.
 */
function VehicleSvg({ type }: { type: string }) {
  const common = "w-full h-32";
  switch (type) {
    case "sedan":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="Sedan illustration">
          <path d="M20 60 Q22 40 45 38 L80 36 Q100 24 130 24 L160 36 Q180 38 184 60 L184 68 Q184 72 180 72 L172 72 Q170 64 162 64 Q154 64 152 72 L60 72 Q58 64 50 64 Q42 64 40 72 L24 72 Q20 72 20 68 Z" fill="oklch(0.28 0.08 250)" />
          <path d="M84 38 Q100 28 124 28 L150 38 L150 56 L84 56 Z" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <circle cx="50" cy="68" r="9" fill="#1a1a1a" />
          <circle cx="50" cy="68" r="4" fill="#888" />
          <circle cx="162" cy="68" r="9" fill="#1a1a1a" />
          <circle cx="162" cy="68" r="4" fill="#888" />
          <rect x="170" y="50" width="10" height="6" rx="1" fill="oklch(0.78 0.13 85)" />
        </svg>
      );
    case "suv":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="SUV illustration">
          <path d="M18 62 Q20 38 38 36 L70 30 Q90 20 120 20 L160 30 Q180 34 184 62 L184 70 Q184 74 180 74 L172 74 Q170 66 162 66 Q154 66 152 74 L60 74 Q58 66 50 66 Q42 66 40 74 L22 74 Q18 74 18 70 Z" fill="oklch(0.28 0.08 250)" />
          <path d="M72 32 Q90 24 116 24 L150 32 L150 56 L72 56 Z" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <circle cx="50" cy="70" r="10" fill="#1a1a1a" />
          <circle cx="50" cy="70" r="4" fill="#888" />
          <circle cx="162" cy="70" r="10" fill="#1a1a1a" />
          <circle cx="162" cy="70" r="4" fill="#888" />
        </svg>
      );
    case "innova":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="Innova Crysta illustration">
          <path d="M16 64 Q18 36 36 34 L66 28 Q88 18 118 18 L160 28 Q182 32 186 64 L186 72 Q186 76 182 76 L172 76 Q170 68 162 68 Q154 68 152 76 L60 76 Q58 68 50 68 Q42 68 40 76 L20 76 Q16 76 16 72 Z" fill="oklch(0.26 0.06 250)" />
          <path d="M68 30 Q88 22 114 22 L150 30 L150 54 L68 54 Z" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="92" y="30" width="2" height="24" fill="oklch(0.28 0.08 250)" opacity="0.5" />
          <circle cx="50" cy="72" r="10" fill="#1a1a1a" />
          <circle cx="50" cy="72" r="4" fill="#bbb" />
          <circle cx="162" cy="72" r="10" fill="#1a1a1a" />
          <circle cx="162" cy="72" r="4" fill="#bbb" />
          <rect x="172" y="54" width="10" height="6" rx="1" fill="oklch(0.78 0.13 85)" />
        </svg>
      );
    case "tempo":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="Tempo Traveller illustration">
          <path d="M16 68 L16 32 Q16 26 22 26 L130 26 Q150 26 158 38 L182 50 Q186 52 186 58 L186 70 Q186 74 182 74 L172 74 Q170 66 162 66 Q154 66 152 74 L40 74 Q38 66 30 66 Q22 66 20 74 L16 74 Z" fill="oklch(0.28 0.08 250)" />
          <rect x="30" y="32" width="14" height="14" rx="2" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="52" y="32" width="14" height="14" rx="2" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="74" y="32" width="14" height="14" rx="2" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="96" y="32" width="14" height="14" rx="2" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="118" y="32" width="14" height="14" rx="2" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <circle cx="30" cy="70" r="9" fill="#1a1a1a" />
          <circle cx="30" cy="70" r="3" fill="#bbb" />
          <circle cx="162" cy="70" r="9" fill="#1a1a1a" />
          <circle cx="162" cy="70" r="3" fill="#bbb" />
        </svg>
      );
    case "luxury":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="Luxury Sedan illustration">
          <path d="M18 62 Q20 40 42 38 L76 34 Q98 22 130 22 L160 34 Q180 38 184 62 L184 70 Q184 74 180 74 L172 74 Q170 66 162 66 Q154 66 152 74 L60 74 Q58 66 50 66 Q42 66 40 74 L24 74 Q18 74 18 70 Z" fill="oklch(0.18 0.04 250)" />
          <path d="M80 36 Q98 26 122 26 L150 36 L150 56 L80 56 Z" fill="oklch(0.85 0.05 240)" opacity="0.9" />
          <circle cx="50" cy="70" r="10" fill="#0a0a0a" />
          <circle cx="50" cy="70" r="5" fill="oklch(0.78 0.13 85)" />
          <circle cx="162" cy="70" r="10" fill="#0a0a0a" />
          <circle cx="162" cy="70" r="5" fill="oklch(0.78 0.13 85)" />
          <rect x="170" y="50" width="12" height="7" rx="1" fill="oklch(0.78 0.13 85)" />
        </svg>
      );
    case "bus":
      return (
        <svg viewBox="0 0 200 90" className={common} role="img" aria-label="Mini Bus illustration">
          <path d="M14 70 L14 28 Q14 22 20 22 L150 22 Q170 22 178 32 L186 44 Q188 46 188 52 L188 70 Q188 74 184 74 L172 74 Q170 66 162 66 Q154 66 152 74 L40 74 Q38 66 30 66 Q22 66 20 74 L14 74 Z" fill="oklch(0.28 0.08 250)" />
          <rect x="24" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="46" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="68" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="90" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="112" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <rect x="134" y="28" width="16" height="14" rx="1" fill="oklch(0.85 0.05 240)" opacity="0.85" />
          <circle cx="30" cy="70" r="9" fill="#1a1a1a" />
          <circle cx="162" cy="70" r="9" fill="#1a1a1a" />
        </svg>
      );
    default:
      return null;
  }
}

export function Fleet() {
  return (
    <section id="fleet" className="py-16 sm:py-20 lg:py-24 bg-background" aria-labelledby="fleet-heading">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            Pilgrimage Fleet
          </Badge>
          <h2 id="fleet-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            A Vehicle for Every Pilgrim Group
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From a small family sedan for a same-day Mathura darshan to a 45-seater coach for
            your bhajan mandali&apos;s Braj tour — our fleet is deep-cleaned, AC-equipped, and
            driven by vegetarian drivers who know Braj&apos;s every lane.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative h-40 sm:h-44 bg-muted overflow-hidden">
                  <img
                    src={`/fleet/${v.id}.jpg`}
                    alt={`${v.name} — ${v.example}`}
                    className="block w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  {v.popular && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gold text-accent-foreground gap-1">
                        <Star className="w-3 h-3 fill-current" /> Popular
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{v.name}</h3>
                      <p className="text-xs text-muted-foreground">{v.category}</p>
                    </div>
                    <Badge variant="outline" className="gap-1 shrink-0">
                      <BadgeIcon className="w-3 h-3 text-primary" /> ₹{v.perKmRate}/km
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-primary" /> {v.seating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-primary" /> AC
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">e.g. {v.example}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {v.bestFor.join(" • ")}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
