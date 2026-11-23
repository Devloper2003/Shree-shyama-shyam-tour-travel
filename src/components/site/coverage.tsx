"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";
import { OmIcon } from "@/components/site/om-icon";

type BrajSite = {
  name: string;
  sanskrit?: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  significance: string;
  image?: string;
  location: string;
};

// Sites plotted on a detailed Braj Mandala map with approximate geographic layout.
// Mathura is central; sites positioned relative to their real geography.
const brajSites: BrajSite[] = [
  { name: "Mathura", sanskrit: "मथुरा", x: 50, y: 48, size: 9, delay: 0, significance: "Krishna's birthplace — heart of Braj", image: "/sites/janmabhoomi.jpg", location: "Central Braj" },
  { name: "Vrindavan", sanskrit: "वृन्दावन", x: 36, y: 35, size: 8, delay: 0.3, significance: "Krishna's childhood & Ras Leela forests", image: "/sites/prem-mandir.jpg", location: "North of Mathura" },
  { name: "Gokul", sanskrit: "गोकुल", x: 58, y: 35, size: 7, delay: 0.6, significance: "Where Yashoda raised baby Krishna", image: "/sites/gokulnath.jpg", location: "East of Mathura" },
  { name: "Mahavan", sanskrit: "महावन", x: 64, y: 48, size: 6, delay: 0.9, significance: "Nand's first home in Braj", location: "East of Mathura" },
  { name: "Govardhan", sanskrit: "गोवर्धन", x: 28, y: 56, size: 8, delay: 1.2, significance: "The hill Krishna lifted on His finger", image: "/sites/govardhan.jpg", location: "West of Mathura" },
  { name: "Radha Kund", sanskrit: "राधाकुंड", x: 22, y: 60, size: 6, delay: 1.5, significance: "Most sacred pond in Braj", image: "/sites/radha-kund.jpg", location: "Near Govardhan" },
  { name: "Barsana", sanskrit: "बरसाना", x: 72, y: 68, size: 7, delay: 1.8, significance: "Radha Rani's eternal abode", image: "/sites/radha-rani.jpg", location: "South-East of Mathura" },
  { name: "Nandgaon", sanskrit: "नंदगांव", x: 58, y: 74, size: 6, delay: 2.1, significance: "Nanda Maharaj's village", image: "/sites/nand-bhavan.jpg", location: "Near Barsana" },
  { name: "Kusum Sarovar", sanskrit: "कुसुम सरोवर", x: 20, y: 48, size: 5, delay: 2.4, significance: "Where Radha picked flowers", location: "Near Govardhan" },
  { name: "Bhandiravan", sanskrit: "भांडीरवन", x: 80, y: 56, size: 5, delay: 2.7, significance: "Where Krishna & Radha married", location: "East of Braj" },
  { name: "Uncha Gaon", sanskrit: "ऊँचा गांव", x: 86, y: 70, size: 5, delay: 3.0, significance: "Sri Vrishbhanu's residence", location: "Near Barsana" },
  { name: "Kokilavan", sanskrit: "कोकिलावन", x: 38, y: 78, size: 5, delay: 3.3, significance: "Where Krishna became a cuckoo", location: "South of Braj" },
];

const statCards = [
  { target: 84, suffix: "", label: "Kosa Braj Circuit" },
  { target: 12, suffix: "", label: "Main Sacred Sites" },
  { target: 300, suffix: " km", label: "Total Parikrama Route" },
  { target: 5000, suffix: "+ years", label: "Of Divine Heritage" },
];

export function Coverage() {
  const [selectedSite, setSelectedSite] = useState<BrajSite | null>(null);

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
              <MapPin className="w-4 h-4 mr-1.5" /> Braj Mandala
            </Badge>
            <h2 id="coverage-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              The 84-Kosa Sacred Circuit of{" "}
              <span className="text-primary">Braj Bhoomi</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
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
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <OmIcon className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
              <p>
                Devotees traditionally complete the 84-kosa Braj parikrama over 40 days on
                foot. We facilitate shorter versions by vehicle for elderly devotees and
                time-constrained pilgrims, with the same spiritual merit.
              </p>
            </div>
          </div>

          {/* Right: Detailed interactive Braj map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-braj-gradient text-white rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
              </div>
              <p className="relative text-gold text-sm font-semibold uppercase tracking-wider mb-4">
                Braj Mandala — Interactive Map
              </p>

              {/* Map SVG */}
              <svg viewBox="0 0 100 100" className="relative w-full h-auto" role="img" aria-label="Interactive map of Braj Mandala showing 12 sacred sites">
                {/* Background terrain — subtle topographic feel */}
                <defs>
                  <radialGradient id="brajTerrain" cx="50%" cy="48%" r="55%">
                    <stop offset="0%" stopColor="oklch(1 0 0 / 12%)" />
                    <stop offset="50%" stopColor="oklch(1 0 0 / 5%)" />
                    <stop offset="100%" stopColor="oklch(1 0 0 / 0%)" />
                  </radialGradient>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="url(#brajTerrain)" />

                {/* Yamuna River — curved path through Braj */}
                <path
                  d="M55 5 Q 58 20, 52 35 Q 47 50, 53 65 Q 58 80, 54 95"
                  fill="none"
                  stroke="oklch(0.65 0.12 220)"
                  strokeWidth="1.2"
                  opacity="0.4"
                />
                <text x="60" y="15" fontSize="2" fill="oklch(0.65 0.12 220)" opacity="0.6">Yamuna</text>

                {/* Outer parikrama circle (84-kosa route) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="oklch(0.72 0.13 80 / 0.35)"
                  strokeWidth="0.5"
                  strokeDasharray="1.5 1.5"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Inner circle (Braj heart) */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="oklch(1 0 0 / 4%)"
                  stroke="oklch(0.72 0.13 80 / 0.2)"
                  strokeWidth="0.3"
                  strokeDasharray="0.8 0.8"
                />

                {/* Connection lines from Mathura to each site */}
                {brajSites.filter(s => s.name !== "Mathura").map((site) => (
                  <line
                    key={`line-${site.name}`}
                    x1="50"
                    y1="48"
                    x2={site.x}
                    y2={site.y}
                    stroke="oklch(0.72 0.13 80 / 0.12)"
                    strokeWidth="0.3"
                    strokeDasharray="0.5 0.8"
                  />
                ))}

                {/* Sacred site markers */}
                {brajSites.map((site) => (
                  <g
                    key={site.name}
                    onClick={() => setSelectedSite(site)}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Pulse ring */}
                    <motion.circle
                      cx={site.x}
                      cy={site.y}
                      r={site.size / 2.5}
                      fill="oklch(0.72 0.13 80)"
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
                      fill={selectedSite?.name === site.name ? "oklch(0.55 0.16 45)" : "oklch(0.72 0.13 80)"}
                      stroke="white"
                      strokeWidth="0.3"
                    />
                    {/* Label */}
                    <text
                      x={site.x + 1.8}
                      y={site.y + 0.8}
                      fontSize="2.5"
                      fill="white"
                      className="font-semibold pointer-events-none"
                      style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.5)", strokeWidth: 0.3 }}
                    >
                      {site.name}
                    </text>
                  </g>
                ))}

                {/* Central Om symbol */}
                <text
                  x="50"
                  y="49.5"
                  fontSize="4"
                  fill="oklch(0.72 0.13 80)"
                  textAnchor="middle"
                  className="font-bold pointer-events-none"
                  style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.4)", strokeWidth: 0.2 }}
                >
                  ॐ
                </text>
              </svg>

              {/* Selected site detail card with image */}
              {selectedSite ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-white/10 backdrop-blur rounded-lg p-4 flex gap-4"
                >
                  {selectedSite.image && (
                    <img
                      src={selectedSite.image}
                      alt={selectedSite.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-sm sm:text-base">{selectedSite.name}</p>
                      {selectedSite.sanskrit && (
                        <span className="text-gold text-xs sm:text-sm">{selectedSite.sanskrit}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{selectedSite.location}</p>
                    <p className="text-xs text-white/85 mt-1.5">{selectedSite.significance}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSite(null)}
                    className="text-white/50 hover:text-white text-xs ml-auto shrink-0"
                    aria-label="Close site detail"
                  >
                    ✕
                  </button>
                </motion.div>
              ) : (
                <div className="relative mt-4 flex items-center justify-between text-xs text-white/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                    12 sacred sites — click any marker
                  </span>
                  <span>+ 72 sites across the parikrama</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
