"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { OmIcon } from "@/components/site/om-icon";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";

type BrajSite = { name: string; sanskrit?: string; x: number; y: number; size: number; delay: number; significance: string };

// Sites plotted on a stylized Braj Mandala circular map.
// Mathura is the central anchor; other sites arranged around it on the
// 84-kosa Braj parikrama circuit.
const brajSites: BrajSite[] = [
  { name: "Mathura", sanskrit: "मथुरा", x: 50, y: 50, size: 8, delay: 0, significance: "Krishna's birthplace — the heart of Braj" },
  { name: "Vrindavan", sanskrit: "वृन्दावन", x: 38, y: 38, size: 7, delay: 0.3, significance: "Krishna's childhood & Ras Leela forests" },
  { name: "Gokul", sanskrit: "गोकुल", x: 60, y: 38, size: 6, delay: 0.6, significance: "Where Yashoda raised baby Krishna" },
  { name: "Mahavan", sanskrit: "महावन", x: 65, y: 50, size: 5, delay: 0.9, significance: "Nand's first home in Braj" },
  { name: "Govardhan", sanskrit: "गोवर्धन", x: 30, y: 60, size: 7, delay: 1.2, significance: "The hill Krishna lifted on His finger" },
  { name: "Radha Kund", sanskrit: "राधाकुंड", x: 24, y: 64, size: 5, delay: 1.5, significance: "Most sacred pond in Braj" },
  { name: "Barsana", sanskrit: "बरसाना", x: 70, y: 70, size: 6, delay: 1.8, significance: "Radha Rani's eternal abode" },
  { name: "Nandgaon", sanskrit: "नंदगांव", x: 60, y: 76, size: 5, delay: 2.1, significance: "Nanda Maharaj's village" },
  { name: "Kusum Sarovar", sanskrit: "कुसुम सरोवर", x: 22, y: 50, size: 4, delay: 2.4, significance: "Where Radha picked flowers" },
  { name: "Bhandiravan", sanskrit: "भांडीरवन", x: 76, y: 60, size: 4, delay: 2.7, significance: "Where Krishna & Radha married" },
  { name: "Uncha Gaon", sanskrit: "ऊँचा गांव", x: 82, y: 70, size: 4, delay: 3.0, significance: "Sri Vrishbhanu's residence" },
  { name: "Kokilavan", sanskrit: "कोकिलावन", x: 40, y: 80, size: 4, delay: 3.3, significance: "Where Krishna became a cuckoo" },
];

const statCards = [
  { target: 84, suffix: "", label: "Kosa Braj Circuit" },
  { target: 12, suffix: "", label: "Main Sacred Sites" },
  { target: 300, suffix: " km", label: "Total Parikrama Route" },
  { target: 5000, suffix: "+ years", label: "Of Divine Heritage" },
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
              <MapPin className="w-3 h-3 mr-1" /> Braj Mandala
            </Badge>
            <h2 id="coverage-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              The 84-Kosa Sacred Circuit of{" "}
              <span className="text-primary">Braj Bhoomi</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              The Braj Mandala is the 84-kosa (approximately 300 km) sacred land where Lord
              Krishna appeared 5,000 years ago and performed His divine pastimes. Mathura is at
              its heart, surrounded by the 12 main sites — each a chapter in Krishna&apos;s
              eternal leela.
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
              <OmIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p>
                Devotees traditionally complete the 84-kosa Braj parikrama over 40 days on
                foot. We facilitate shorter versions by vehicle for elderly devotees and
                time-constrained pilgrims, with the same spiritual merit.
              </p>
            </div>
          </div>

          {/* Right: animated Braj Mandala circular map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-braj-gradient text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
              </div>
              <p className="relative text-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Braj Mandala — 84 Kosa Parikrama
              </p>

              <svg viewBox="0 0 100 100" className="relative w-full h-auto" role="img" aria-label="Braj Mandala map showing 12 main sacred sites">
                {/* Outer parikrama circle (84-kosa route) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="oklch(0.78 0.14 85 / 0.3)"
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Inner circle (Mathura's heart) */}
                <circle
                  cx="50"
                  cy="50"
                  r="22"
                  fill="oklch(1 0 0 / 5%)"
                  stroke="oklch(0.78 0.14 85 / 0.2)"
                  strokeWidth="0.3"
                  strokeDasharray="0.8 0.8"
                />

                {/* Pulsing sacred sites */}
                {brajSites.map((site) => (
                  <g key={site.name}>
                    {/* Pulse ring */}
                    <motion.circle
                      cx={site.x}
                      cy={site.y}
                      r={site.size / 2.5}
                      fill="oklch(0.78 0.14 85)"
                      initial={{ opacity: 0.5, scale: 1 }}
                      animate={{ opacity: 0, scale: 3 }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: site.delay,
                        ease: "easeOut",
                      }}
                      style={{ transformOrigin: `${site.x}px ${site.y}px` }}
                    />
                    {/* Solid dot */}
                    <circle
                      cx={site.x}
                      cy={site.y}
                      r={site.size / 5}
                      fill="oklch(0.78 0.14 85)"
                    />
                    {/* Label */}
                    <text
                      x={site.x + 1.5}
                      y={site.y + 0.8}
                      fontSize="2.2"
                      fill="white"
                      className="font-semibold"
                      style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.4)", strokeWidth: 0.3 }}
                    >
                      {site.name}
                    </text>
                  </g>
                ))}

                {/* Central Om symbol */}
                <text
                  x="50"
                  y="52"
                  fontSize="3"
                  fill="oklch(0.78 0.14 85)"
                  textAnchor="middle"
                  className="font-bold"
                  style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.4)", strokeWidth: 0.2 }}
                >
                  ॐ
                </text>
              </svg>

              <div className="relative mt-4 flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  12 main sacred sites
                </span>
                <span>+ 72 sites across the parikrama</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
