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

// Sites positioned on the Braj Mandala map with approximate geographic layout.
const brajSites: BrajSite[] = [
  { name: "Mathura", sanskrit: "मथुरा", x: 50, y: 48, size: 10, delay: 0, significance: "Krishna's birthplace — heart of Braj", image: "/sites/janmabhoomi.jpg", location: "Central Braj" },
  { name: "Vrindavan", sanskrit: "वृन्दावन", x: 34, y: 33, size: 9, delay: 0.3, significance: "Krishna's childhood & Ras Leela forests", image: "/sites/prem-mandir.jpg", location: "North of Mathura" },
  { name: "Gokul", sanskrit: "गोकुल", x: 60, y: 33, size: 8, delay: 0.6, significance: "Where Yashoda raised baby Krishna", image: "/sites/gokulnath.jpg", location: "East of Mathura" },
  { name: "Mahavan", sanskrit: "महावन", x: 66, y: 48, size: 7, delay: 0.9, significance: "Nand's first home in Braj", location: "East of Mathura" },
  { name: "Govardhan", sanskrit: "गोवर्धन", x: 26, y: 56, size: 9, delay: 1.2, significance: "The hill Krishna lifted on His finger", image: "/sites/govardhan.jpg", location: "West of Mathura" },
  { name: "Radha Kund", sanskrit: "राधाकुंड", x: 20, y: 62, size: 7, delay: 1.5, significance: "Most sacred pond in Braj", image: "/sites/radha-kund.jpg", location: "Near Govardhan" },
  { name: "Barsana", sanskrit: "बरसाना", x: 74, y: 70, size: 8, delay: 1.8, significance: "Radha Rani's eternal abode", image: "/sites/radha-rani.jpg", location: "South-East of Mathura" },
  { name: "Nandgaon", sanskrit: "नंदगांव", x: 58, y: 76, size: 7, delay: 2.1, significance: "Nanda Maharaj's village", image: "/sites/nand-bhavan.jpg", location: "Near Barsana" },
  { name: "Kusum Sarovar", sanskrit: "कुसुम सरोवर", x: 18, y: 46, size: 6, delay: 2.4, significance: "Where Radha picked flowers", location: "Near Govardhan" },
  { name: "Bhandiravan", sanskrit: "भांडीरवन", x: 82, y: 56, size: 6, delay: 2.7, significance: "Where Krishna & Radha married", location: "East of Braj" },
  { name: "Uncha Gaon", sanskrit: "ऊँचा गांव", x: 88, y: 72, size: 6, delay: 3.0, significance: "Sri Vrishbhanu's residence", location: "Near Barsana" },
  { name: "Kokilavan", sanskrit: "कोकिलावन", x: 38, y: 80, size: 6, delay: 3.3, significance: "Where Krishna became a cuckoo", location: "South of Braj" },
];

const statCards = [
  { target: 84, suffix: "", label: "Kosa Braj Circuit" },
  { target: 12, suffix: "", label: "Main Sacred Sites" },
  { target: 300, suffix: " km", label: "Total Parikrama Route" },
  { target: 5000, suffix: "+ years", label: "Of Divine Heritage" },
];

export function Coverage() {
  const [selectedSite, setSelectedSite] = useState<BrajSite | null>(null);
  const [hoveredSite, setHoveredSite] = useState<BrajSite | null>(null);

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

          {/* Right: Enhanced interactive Braj map with temple image thumbnails */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-braj-gradient text-white rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-saffron/15 rounded-full blur-3xl" />
              </div>
              <p className="relative text-gold text-sm font-semibold uppercase tracking-wider mb-3">
                Braj Mandala — Interactive Map
              </p>

              {/* Enhanced SVG Map */}
              <svg viewBox="0 0 100 100" className="relative w-full h-auto" role="img" aria-label="Interactive map of Braj Mandala showing 12 sacred sites with temple images">
                <defs>
                  {/* Terrain gradient for land */}
                  <radialGradient id="brajTerrain" cx="50%" cy="48%" r="60%">
                    <stop offset="0%" stopColor="oklch(0.35 0.06 50)" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="oklch(0.28 0.05 45)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="oklch(0.20 0.04 40)" stopOpacity="0" />
                  </radialGradient>
                  {/* Clip path for circular image thumbnails */}
                  {brajSites.map((site) => (
                    <clipPath key={`clip-${site.name}`} id={`clip-${site.name}`}>
                      <circle cx={site.x} cy={site.y} r={site.size / 2.2} />
                    </clipPath>
                  ))}
                </defs>

                {/* Background terrain */}
                <rect x="0" y="0" width="100" height="100" fill="url(#brajTerrain)" />

                {/* Outer parikrama circle (84-kosa route) — more prominent */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="oklch(0.72 0.13 80)"
                  strokeWidth="0.6"
                  strokeDasharray="2 1"
                  opacity="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.5 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Inner circle (Braj heart) */}
                <circle
                  cx="50"
                  cy="50"
                  r="28"
                  fill="oklch(1 0 0 / 3%)"
                  stroke="oklch(0.72 0.13 80 / 0.15)"
                  strokeWidth="0.3"
                  strokeDasharray="0.8 0.8"
                />

                {/* Yamuna River — wider, more prominent with glow */}
                <path
                  d="M56 3 Q 60 18, 53 33 Q 46 48, 52 63 Q 58 78, 54 97"
                  fill="none"
                  stroke="oklch(0.65 0.12 220)"
                  strokeWidth="2.5"
                  opacity="0.25"
                />
                <path
                  d="M56 3 Q 60 18, 53 33 Q 46 48, 52 63 Q 58 78, 54 97"
                  fill="none"
                  stroke="oklch(0.70 0.14 225)"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
                <text x="62" y="12" fontSize="2.2" fill="oklch(0.70 0.14 225)" opacity="0.8" className="font-medium">
                  यमुना
                </text>
                <text x="62" y="15" fontSize="1.8" fill="oklch(0.70 0.14 225)" opacity="0.6">
                  Yamuna
                </text>

                {/* Connection lines from Mathura to each site (subtle) */}
                {brajSites.filter(s => s.name !== "Mathura").map((site) => (
                  <line
                    key={`line-${site.name}`}
                    x1="50"
                    y1="48"
                    x2={site.x}
                    y2={site.y}
                    stroke="oklch(0.72 0.13 80 / 0.1)"
                    strokeWidth="0.25"
                    strokeDasharray="0.4 0.6"
                  />
                ))}

                {/* Sacred site markers with temple image thumbnails */}
                {brajSites.map((site) => {
                  const isSelected = selectedSite?.name === site.name;
                  const isHovered = hoveredSite?.name === site.name;
                  const r = isHovered || isSelected ? site.size / 1.8 : site.size / 2.2;
                  return (
                    <g
                      key={site.name}
                      onClick={() => setSelectedSite(site)}
                      onMouseEnter={() => setHoveredSite(site)}
                      onMouseLeave={() => setHoveredSite(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Pulse ring */}
                      <motion.circle
                        cx={site.x}
                        cy={site.y}
                        r={r}
                        fill="oklch(0.72 0.13 80)"
                        initial={{ opacity: 0.4, scale: 1 }}
                        animate={{ opacity: 0, scale: 3.5 }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: site.delay,
                          ease: "easeOut",
                        }}
                        style={{ transformOrigin: `${site.x}px ${site.y}px` }}
                      />

                      {/* Temple image thumbnail (circular) */}
                      {site.image && (
                        <image
                          href={site.image}
                          x={site.x - r}
                          y={site.y - r}
                          width={r * 2}
                          height={r * 2}
                          clipPath={`url(#clip-${site.name})`}
                          preserveAspectRatio="xMidYMid slice"
                        />
                      )}

                      {/* Gold border ring around thumbnail */}
                      <circle
                        cx={site.x}
                        cy={site.y}
                        r={r}
                        fill="none"
                        stroke={isSelected ? "oklch(0.55 0.16 45)" : "oklch(0.72 0.13 80)"}
                        strokeWidth={isSelected ? 1 : 0.6}
                      />

                      {/* Label below marker */}
                      <text
                        x={site.x}
                        y={site.y + r + 2.5}
                        fontSize="2.2"
                        fill="white"
                        textAnchor="middle"
                        className="font-semibold pointer-events-none"
                        style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.6)", strokeWidth: 0.3 }}
                      >
                        {site.name}
                      </text>
                      {site.sanskrit && (isHovered || isSelected) && (
                        <text
                          x={site.x}
                          y={site.y + r + 5}
                          fontSize="1.8"
                          fill="oklch(0.72 0.13 80)"
                          textAnchor="middle"
                          className="pointer-events-none"
                        >
                          {site.sanskrit}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Central Om symbol */}
                <text
                  x="50"
                  y="49.5"
                  fontSize="5"
                  fill="oklch(0.72 0.13 80)"
                  textAnchor="middle"
                  className="font-bold pointer-events-none"
                  style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.4)", strokeWidth: 0.3 }}
                >
                  ॐ
                </text>

                {/* Compass / North indicator */}
                <g transform="translate(92, 8)" className="pointer-events-none">
                  <circle cx="0" cy="0" r="3" fill="oklch(1 0 0 / 10%)" stroke="oklch(0.72 0.13 80 / 0.3)" strokeWidth="0.3" />
                  <path d="M 0 -2 L 1 0 L 0 2 L -1 0 Z" fill="oklch(0.72 0.13 80)" opacity="0.6" />
                  <text x="0" y="-3.5" fontSize="1.5" fill="oklch(0.72 0.13 80)" textAnchor="middle" opacity="0.6">N</text>
                </g>
              </svg>

              {/* Legend */}
              <div className="relative mt-3 flex items-center justify-between text-xs text-white/70 border-t border-white/10 pt-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
                  Click any marker for details
                </span>
                <span className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-[oklch(0.70_0.14_225)]" /> Yamuna
                  </span>
                  <span>+ 72 more sites</span>
                </span>
              </div>

              {/* Selected site detail card with image */}
              {selectedSite && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 bg-white/10 backdrop-blur rounded-lg p-4 flex gap-4"
                >
                  {selectedSite.image && (
                    <img
                      src={selectedSite.image}
                      alt={selectedSite.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-base">{selectedSite.name}</p>
                      {selectedSite.sanskrit && (
                        <span className="text-gold text-sm">{selectedSite.sanskrit}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{selectedSite.location}</p>
                    <p className="text-sm text-white/85 mt-2 leading-relaxed">{selectedSite.significance}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSite(null)}
                    className="text-white/50 hover:text-white text-sm ml-auto shrink-0 self-start"
                    aria-label="Close site detail"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
