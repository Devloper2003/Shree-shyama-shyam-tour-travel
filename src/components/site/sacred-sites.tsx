"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MapPin, Clock, Star, Sparkles, Crown, Baby, Heart, Mountain, Waves } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sacredSites, type SacredSiteCategory } from "@/lib/site-data";

type TabKey = "all" | SacredSiteCategory;

const tabs: { key: TabKey; label: string; icon: typeof MapPin }[] = [
  { key: "all", label: "All Sites", icon: MapPin },
  { key: "birthplace", label: "Birthplace", icon: Crown },
  { key: "childhood", label: "Childhood Leelas", icon: Baby },
  { key: "ras-lila", label: "Ras Lila Sites", icon: Heart },
  { key: "govardhan", label: "Govardhan & Kunds", icon: Mountain },
  { key: "radha", label: "Radha&apos;s Abode", icon: Sparkles },
  { key: "ghat", label: "Yamuna Ghats", icon: Waves },
];

export function SacredSites() {
  const [active, setActive] = useState<TabKey>("all");

  const filtered =
    active === "all" ? sacredSites : sacredSites.filter((s) => s.category === active);

  return (
    <section
      id="sacred-sites"
      className="py-16 sm:py-20 lg:py-24 bg-background"
      aria-labelledby="sacred-sites-heading"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" /> Sacred Sites of Braj
          </Badge>
          <h2 id="sacred-sites-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
            Walk Through Krishna&apos;s Divine Pastimes
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From the prison cell where Krishna appeared, to the forests of Vrindavan where He
            performed the Maha-Ras, to the hill He lifted on His little finger — explore the
            sacred sites of Braj Mandala with us.
          </p>
        </div>

        {/* Animated category tabs */}
        <LayoutGroup>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tabs.map((t) => {
              const isActive = active === t.key;
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  aria-pressed={isActive}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive ? "text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sites-tab-pill"
                      className="absolute inset-0 rounded-full bg-primary z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10" dangerouslySetInnerHTML={{ __html: t.label }} />
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Sites grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((site, i) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="h-full hover:shadow-lg hover:border-gold/50 transition-all overflow-hidden">
                  {/* Decorative Om/tilak strip */}
                  <div className="braj-pattern-border" aria-hidden="true" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-foreground leading-tight">{site.name}</h3>
                        {site.sanskritName && (
                          <p className="text-sm text-primary mt-0.5 font-medium">
                            {site.sanskritName}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="gap-1 shrink-0 mt-1">
                        <MapPin className="w-3 h-3 text-primary" /> {site.location}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {site.significance}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Best Time</p>
                          <p className="text-muted-foreground">{site.bestTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Star className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Must See</p>
                          <p className="text-muted-foreground">{site.mustSee}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          These 12 are the main sites — our yatra packages also cover the smaller sacred spots
          like Kusum Sarovar, Mansi Ganga, Mor Kuti, Uncha Gaon, and the 84-kosa parikrama
          route.
        </p>
      </div>
    </section>
  );
}
