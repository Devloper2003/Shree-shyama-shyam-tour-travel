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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                        <Star className="w-3.5 h-3.5 fill-current" /> Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                      {p.category}
                    </p>
                    <h3 className="text-xl font-bold text-foreground mt-2 mb-3 leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" /> {p.duration}
                      </span>
                      {p.days > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-primary" /> {p.days} day{p.days > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 mb-4">
                      {p.temples.slice(0, 3).join(" • ")}
                      {p.temples.length > 3 && ` +${p.temples.length - 3} more`}
                    </p>
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <div>
                        {p.price > 0 ? (
                          <>
                            <p className="text-xs text-muted-foreground">Starting from</p>
                            <p className="text-2xl font-bold text-primary">
                              ₹{p.price.toLocaleString("en-IN")}
                              <span className="text-sm text-muted-foreground font-normal">/person</span>
                            </p>
                          </>
                        ) : (
                          <p className="text-base text-primary font-medium">Custom quote</p>
                        )}
                      </div>
                      <Button size="sm" className="gap-1.5">
                        Book <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
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

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
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
                <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
                  <div className="relative h-40 sm:h-44 overflow-hidden bg-muted">
                    <img
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      {site.sanskritName && (
                        <p className="text-gold text-xs font-medium mb-0.5 drop-shadow-lg">{site.sanskritName}</p>
                      )}
                      <p className="text-white text-sm font-bold leading-tight drop-shadow-lg">
                        {site.name}
                      </p>
                      <p className="text-white/70 text-[11px] mt-0.5">{site.location}</p>
                    </div>
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
