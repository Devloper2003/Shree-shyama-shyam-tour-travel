"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star, Users, Clock, ShieldCheck, Om, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { HowItWorks } from "@/components/site/how-it-works";
import { Testimonials } from "@/components/site/testimonials";
import { usePageStore } from "@/lib/page-store";
import { siteConfig } from "@/lib/site-config";
import { yatraPackages, sacredSites, auspiciousDates } from "@/lib/site-data";
import { CountUp } from "@/components/site/count-up";
import { OmIcon } from "@/components/site/om-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const trustBadges = [
  { icon: ShieldCheck, label: "Verified Drivers" },
  { icon: Clock, label: "24x7 Service" },
  { icon: Star, label: "4.9 / 5 Rated" },
  { icon: MapPin, label: "84 Sacred Sites" },
];

export function HomePage() {
  const navigate = usePageStore((s) => s.navigate);
  const popularPackages = yatraPackages.filter((p) => p.popular).slice(0, 4);
  const previewSites = sacredSites.slice(0, 6);
  const featuredFestivals = auspiciousDates.slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />
      <HowItWorks />

      {/* Package preview — links to Package page */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="home-packages-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-3">
              <MapPin className="w-3 h-3 mr-1" /> Yatra Packages
            </Badge>
            <h2 id="home-packages-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              Popular Braj Yatra Packages
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              From same-day darshan to 7-day grand spiritual tours — explore our most booked
              pilgrimage packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularPackages.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  className={`relative h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer ${
                    p.popular ? "border-gold ring-1 ring-gold/40" : ""
                  }`}
                  onClick={() => navigate("package", { contactPrefill: { yatraPackage: p.name, source: "home-preview" } })}
                >
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gold text-accent-foreground hover:bg-gold gap-1">
                        <Star className="w-3 h-3 fill-current" /> Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-5 flex flex-col h-full">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="text-base font-bold text-foreground mt-1 mb-2 leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" /> {p.duration}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex-1 mb-3 line-clamp-2">
                      {p.temples.slice(0, 3).join(" • ")}
                    </p>
                    <div className="border-t border-border pt-3">
                      {p.price > 0 ? (
                        <p className="text-lg font-bold text-primary">
                          ₹{p.price.toLocaleString("en-IN")}
                          <span className="text-xs text-muted-foreground font-normal">/person</span>
                        </p>
                      ) : (
                        <p className="text-sm text-primary font-medium">Custom quote</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" onClick={() => navigate("package")} className="gap-2">
              View All Packages <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sacred Sites preview — links to Services page */}
      <section className="py-16 sm:py-20 bg-muted/40" aria-labelledby="home-sites-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-3">
              <Sparkles className="w-3 h-3 mr-1" /> Sacred Sites
            </Badge>
            <h2 id="home-sites-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              Walk Through Krishna&apos;s Divine Pastimes
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              From Krishna Janmabhoomi to Govardhan Hill — explore the sacred sites of Braj Mandala.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {previewSites.map((site, i) => (
              <motion.div
                key={site.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="cursor-pointer"
                onClick={() => navigate("services")}
              >
                <Card className="overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="relative h-24 sm:h-28 overflow-hidden bg-muted">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                    <p className="absolute bottom-1 left-2 right-2 text-white text-[10px] sm:text-xs font-semibold leading-tight drop-shadow-lg">
                      {site.name}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate("services")} className="gap-2">
              Explore All Sacred Sites <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Festival preview */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="home-festivals-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-3">
              <Calendar className="w-3 h-3 mr-1" /> Auspicious Dates
            </Badge>
            <h2 id="home-festivals-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
              Plan Your Yatra Around Sacred Festivals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredFestivals.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate("services")}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">{d.festival}</p>
                        <p className="text-xs text-muted-foreground">{d.month}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{d.significance}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* About preview — links to About page */}
      <section className="py-16 sm:py-20 bg-muted/40" aria-labelledby="home-about-heading">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">
                <OmIcon className="w-3 h-3 mr-1" /> About Us
              </Badge>
              <h2 id="home-about-heading" className="text-3xl sm:text-4xl font-bold text-foreground">
                {siteConfig.name}
              </h2>
              <p className="mt-2 text-primary font-medium">{siteConfig.tagline}</p>
              <p className="mt-4 text-muted-foreground text-base">
                Founded in {siteConfig.establishedYear} in the heart of Braj — Mathura — we are
                Braj-born pilgrimage specialists. For {siteConfig.experienceYears}+ years, we&apos;ve
                guided 25,000+ devotees through Krishna&apos;s sacred land with verified drivers,
                local pandit arrangements, and deep devotion.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 max-w-md">
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <p className="text-2xl font-bold text-primary">
                    <CountUp target={25000} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Blessed Pilgrims</p>
                </div>
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <p className="text-2xl font-bold text-primary">
                    <CountUp target={84} />
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Sacred Sites</p>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline" onClick={() => navigate("about")} className="gap-2">
                  Read Our Full Story <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-braj-gradient text-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
              <div className="space-y-3">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <b.icon className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-sm text-white/90">{b.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <Button className="w-full bg-gold text-accent-foreground hover:bg-gold/90" onClick={() => navigate("contact")}>
                  Book Your Yatra
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
