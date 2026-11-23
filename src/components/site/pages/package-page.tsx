"use client";

import { motion } from "framer-motion";
import { Check, Star, Clock, MapPin, Users, ArrowRight, Calendar, Route, Crown, Sparkles, MapPinned, ChevronLeft, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollableTabs } from "@/components/site/scrollable-tabs";
import { yatraPackages, type YatraPackageCategory } from "@/lib/site-data";
import { usePageStore } from "@/lib/page-store";
import { siteConfig, buildTelLink, buildWhatsAppLink } from "@/lib/site-config";

type TabKey = "all" | YatraPackageCategory;

const tabs: { key: TabKey; label: string; icon: typeof Star; description: string }[] = [
  { key: "all", label: "All Packages", icon: Star, description: "View our complete yatra offerings — same-day to 7-day grand tours" },
  { key: "day-tour", label: "1-Day Yatra", icon: Clock, description: "Same-day pilgrimage — perfect for time-short devotees" },
  { key: "short", label: "2-Day Circuit", icon: Route, description: "Comfortable pace covering Mathura, Gokul, Vrindavan & Govardhan" },
  { key: "complete", label: "3-Day Complete", icon: Crown, description: "Full 84-kosa Braj Mandala with all 12 main sites" },
  { key: "multicity", label: "Multi-City Tours", icon: MapPinned, description: "2N/3D to 6N/7D — Braj + Agra + Jaipur + Khajuraho combinations" },
  { key: "custom", label: "Custom Yatra", icon: Sparkles, description: "Tailored to your specific sankalp and group — fully customizable" },
];

export function PackagePage() {
  const navigate = usePageStore((s) => s.navigate);
  const [active, setActive] = useState<TabKey>("all");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filtered = active === "all" ? yatraPackages : yatraPackages.filter((p) => p.tab === active);

  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons, active]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [active]);

  const scrollCards = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 400);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleBookPackage = (packageName: string) => {
    navigate("contact", { contactPrefill: { yatraPackage: packageName, source: "package-page" } });
  };

  return (
    <div className="pt-8 pb-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <MapPin className="w-3 h-3 mr-1" /> Yatra Packages
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Choose Your Sacred Braj Yatra
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From a single day of darshan at Mathura-Vrindavan to the complete 7-day Braj + Jaipur +
            Khajuraho circuit — every package is led by Braj-born guides and includes AC cab,
            driver-cum-guide, and all temple visits.
          </p>
        </div>

        {/* Scrollable tabs */}
        <ScrollableTabs
          tabs={tabs}
          active={active}
          onChange={(k) => setActive(k as TabKey)}
          layoutId="services-tab"
        />

        {/* Tab description */}
        <motion.p
          key={`desc-${active}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-muted-foreground mb-8"
        >
          {tabs.find((t) => t.key === active)?.description}
        </motion.p>

        {/* Package cards carousel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCards("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll packages left"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
              canScrollLeft ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards("right")}
            disabled={!canScrollRight}
            aria-label="Scroll packages right"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center transition-all ${
              canScrollRight ? "opacity-100 hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer" : "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {canScrollLeft && <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" aria-hidden="true" />}
          {canScrollRight && <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" aria-hidden="true" />}

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]"
              >
                <Card className={`relative h-full flex flex-col ${p.popular ? "border-gold ring-1 ring-gold/40" : ""} hover:shadow-lg hover:-translate-y-1 transition-all`}>
                  {p.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gold text-accent-foreground hover:bg-gold gap-1">
                        <Star className="w-3 h-3 fill-current" /> Most Booked
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.category}</p>
                    <h3 className="text-lg font-bold text-foreground leading-tight min-h-[3.5rem]">{p.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> {p.duration}</span>
                      {p.days > 0 && <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" /> {p.days} day{p.days > 1 ? "s" : ""}</span>}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> Sites Covered</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.temples.slice(0, 4).map((t) => <Badge key={t} variant="outline" className="text-[11px] font-normal">{t}</Badge>)}
                        {p.temples.length > 4 && <Badge variant="outline" className="text-[11px] font-normal">+{p.temples.length - 4} more</Badge>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Inclusions</p>
                      <ul className="space-y-1">
                        {p.inclusions.slice(0, 3).map((inc) => <li key={inc} className="text-xs text-foreground/80 flex items-start gap-1.5"><Check className="w-3 h-3 text-primary mt-0.5 shrink-0" /><span>{inc}</span></li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1"><Users className="w-3 h-3 text-primary" /> Best For</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.bestFor.map((b) => <Badge key={b} variant="secondary" className="text-[11px] font-normal">{b}</Badge>)}
                      </div>
                    </div>
                    <div className="border-t border-border pt-3">
                      {p.price > 0 ? (
                        <div className="flex items-baseline justify-between">
                          <span className="text-sm text-muted-foreground">Starting from</span>
                          <span className="text-xl font-bold text-primary">₹{p.price.toLocaleString("en-IN")}<span className="text-xs text-muted-foreground font-normal">/person</span></span>
                        </div>
                      ) : <p className="text-sm text-primary font-medium">Custom quote — based on your sankalp</p>}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full gap-2" onClick={() => handleBookPackage(p.name)}>
                      Book This Yatra <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customization callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 max-w-3xl mx-auto bg-saffron-gradient text-white rounded-xl p-6 text-center"
        >
          <p className="text-lg font-bold mb-1">Customization Available for Every Yatra</p>
          <p className="text-sm text-white/90">
            We customize packages as per your demand — 2N/3D, 4N/5D with Agra, 6N/7D with
            Jaipur &amp; Khajuraho, or any combination you desire. Share your sankalp and we
            craft the perfect itinerary for you.
          </p>
        </motion.div>

        {/* Quick contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Questions? Call <strong className="text-foreground">{siteConfig.contactPerson}</strong> at{" "}
            <a href={buildTelLink()} className="text-primary font-semibold">{siteConfig.phoneDisplay}</a>
          </p>
          <div className="flex justify-center gap-3">
            <a href={buildTelLink()}>
              <Button variant="outline" className="gap-2"><Phone className="w-4 h-4" /> Call Now</Button>
            </a>
            <a href={buildWhatsAppLink(`Radhe Radhe! I'd like to enquire about a Braj Yatra package.`)} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
