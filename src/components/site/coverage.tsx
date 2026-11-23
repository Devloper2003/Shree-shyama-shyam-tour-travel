"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";
import { OmIcon } from "@/components/site/om-icon";

type BrajSite = {
  name: string;
  sanskrit?: string;
  significance: string;
  image?: string;
  location: string;
  lat: number;
  lng: number;
  // Calculated position on the map overlay (percentage)
  x: number;
  y: number;
};

// Sacred sites with real GPS coordinates + calculated overlay positions
// bbox used: 77.30,27.40 to 77.80,27.65
// x% = (lng - 77.30) / 0.50 * 100
// y% = (27.65 - lat) / 0.25 * 100
const brajSites: BrajSite[] = [
  { name: "Mathura", sanskrit: "मथुरा", significance: "Krishna's birthplace — heart of Braj", image: "/sites/janmabhoomi.jpg", location: "Central Braj", lat: 27.4924, lng: 77.6737, x: 74.7, y: 63.0 },
  { name: "Vrindavan", sanskrit: "वृन्दावन", significance: "Krishna's childhood & Ras Leela forests", image: "/sites/prem-mandir.jpg", location: "North of Mathura", lat: 27.5780, lng: 77.6980, x: 79.6, y: 28.8 },
  { name: "Gokul", sanskrit: "गोकुल", significance: "Where Yashoda raised baby Krishna", image: "/sites/gokulnath.jpg", location: "East of Mathura", lat: 27.5350, lng: 77.7280, x: 85.6, y: 46.0 },
  { name: "Govardhan", sanskrit: "गोवर्धन", significance: "The hill Krishna lifted on His finger", image: "/sites/govardhan.jpg", location: "West of Mathura", lat: 27.5120, lng: 77.4590, x: 31.8, y: 55.2 },
  { name: "Radha Kund", sanskrit: "राधाकुंड", significance: "Most sacred pond in Braj", image: "/sites/radha-kund.jpg", location: "Near Govardhan", lat: 27.5070, lng: 77.4630, x: 32.6, y: 57.2 },
  { name: "Barsana", sanskrit: "बरसाना", significance: "Radha Rani's eternal abode", image: "/sites/radha-rani.jpg", location: "South-East of Mathura", lat: 27.5860, lng: 77.3810, x: 16.2, y: 25.6 },
  { name: "Nandgaon", sanskrit: "नंदगांव", significance: "Nanda Maharaj's village", image: "/sites/nand-bhavan.jpg", location: "Near Barsana", lat: 27.5720, lng: 77.4310, x: 26.2, y: 31.2 },
  { name: "ISKCON", sanskrit: "इस्कॉन", significance: "Krishna-Balaram temple, international center", image: "/sites/iskcon.jpg", location: "Vrindavan", lat: 27.5713, lng: 77.6770, x: 75.4, y: 31.5 },
  { name: "Banke Bihari", sanskrit: "बांके बिहारी", significance: "Self-manifested Krishna in tribhanga form", image: "/sites/banke-bihari.jpg", location: "Vrindavan", lat: 27.5730, lng: 77.6930, x: 78.6, y: 30.8 },
  { name: "Vishram Ghat", sanskrit: "विश्राम घाट", significance: "Where Krishna rested after slaying Kansa", image: "/sites/vishram-ghat.jpg", location: "Mathura", lat: 27.4880, lng: 77.6780, x: 75.6, y: 64.8 },
  { name: "Maan Mandir", sanskrit: "मान मंदिर", significance: "Where Radha went in divine loving anger", image: "/sites/maan-mandir.jpg", location: "Barsana", lat: 27.5880, lng: 77.3780, x: 15.6, y: 24.8 },
  { name: "Seva Kunj", sanskrit: "सेवा कुंज", significance: "Where Krishna performs Maha-Ras every night", image: "/sites/seva-kunj.jpg", location: "Vrindavan", lat: 27.5740, lng: 77.6920, x: 78.4, y: 30.4 },
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

  // OpenStreetMap embed covering the Braj region
  const osmEmbedUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=77.30%2C27.40%2C77.80%2C27.65&layer=mapnik";

  const openInGoogleMaps = (site: BrajSite) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}`,
      "_blank"
    );
  };

  return (
    <section
      id="coverage"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="coverage-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
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

            {/* Selected site detail card (below the stats, on the left column) */}
            {selectedSite && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-muted/50 rounded-xl p-4 border border-border flex gap-4"
              >
                {selectedSite.image && (
                  <img
                    src={selectedSite.image}
                    alt={selectedSite.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground text-base">{selectedSite.name}</p>
                    {selectedSite.sanskrit && (
                      <span className="text-saffron text-sm font-medium">{selectedSite.sanskrit}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedSite.location}</p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{selectedSite.significance}</p>
                  <button
                    onClick={() => openInGoogleMaps(selectedSite)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Get directions in Google Maps
                  </button>
                </div>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="text-muted-foreground hover:text-foreground text-sm shrink-0 self-start"
                  aria-label="Close site detail"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </div>

          {/* Right: Real map with markers overlaid directly on it */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-background border border-border rounded-2xl shadow-lg overflow-hidden">
              <p className="text-sm font-semibold uppercase tracking-wider text-primary px-4 pt-4 pb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Braj Mandala — Interactive Map
              </p>

              {/* Real OpenStreetMap with markers overlaid directly on top */}
              <div className="relative w-full h-[400px] sm:h-[450px] bg-muted">
                <iframe
                  title="Braj Mandala Map — Mathura, Vrindavan, Govardhan region"
                  src={osmEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  style={{ border: 0, pointerEvents: "none" }}
                />

                {/* Marker overlay layer — clickable markers on top of the map */}
                <div className="absolute inset-0">
                  {brajSites.map((site) => {
                    const isSelected = selectedSite?.name === site.name;
                    const isHovered = hoveredSite?.name === site.name;
                    return (
                      <button
                        key={site.name}
                        onClick={() => setSelectedSite(site)}
                        onMouseEnter={() => setHoveredSite(site)}
                        onMouseLeave={() => setHoveredSite(null)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group"
                        style={{ left: `${site.x}%`, top: `${site.y}%` }}
                        aria-label={`${site.name} — ${site.location}`}
                      >
                        {/* Pulse ring */}
                        <span
                          className={`absolute inset-0 rounded-full ${
                            isSelected ? "bg-saffron" : "bg-primary"
                          } opacity-30 animate-ping`}
                          style={{ width: isSelected ? "24px" : "18px", height: isSelected ? "24px" : "18px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                        />
                        {/* Marker dot */}
                        <span
                          className={`relative block rounded-full border-2 border-white shadow-lg transition-all ${
                            isSelected
                              ? "w-4 h-4 bg-saffron"
                              : isHovered
                              ? "w-3.5 h-3.5 bg-primary"
                              : "w-3 h-3 bg-primary"
                          }`}
                        />
                        {/* Tooltip on hover */}
                        {isHovered && (
                          <div className="absolute left-1/2 -translate-x-1/2 -top-9 z-20 whitespace-nowrap bg-foreground text-background text-xs font-medium px-2 py-1 rounded shadow-lg pointer-events-none">
                            {site.name}
                            {site.sanskrit && (
                              <span className="text-gold ml-1">{site.sanskrit}</span>
                            )}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Map footer */}
              <div className="px-4 py-2 bg-muted/40 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Click any marker for details
                </span>
                <a
                  href="https://www.openstreetmap.org/?mlat=27.4924&mlon=77.6737#map=11/27.52/77.60"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium flex items-center gap-1 hover:underline"
                >
                  Open full map <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
