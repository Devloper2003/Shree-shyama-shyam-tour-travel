"use client";

import { motion } from "framer-motion";
import { Award, Users, MapPinned, Heart, Om, ShieldCheck, Clock, Receipt, Sparkles, HandPlatter, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/site/count-up";
import { OmIcon } from "@/components/site/om-icon";
import { aboutPoints, whyChooseUs, faqs, faqCategories } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { usePageStore } from "@/lib/page-store";
import { useState } from "react";
import { motion as framerMotion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollableTabs } from "@/components/site/scrollable-tabs";
import { LayoutGroup } from "framer-motion";

const statCards = [
  { icon: Users, target: 25000, suffix: "+", label: "Blessed Pilgrims" },
  { icon: MapPinned, target: 84, suffix: "", label: "Sacred Sites Covered" },
  { icon: Heart, target: 12, suffix: "", label: "Main Braj Temples" },
  { icon: Award, target: siteConfig.experienceYears, suffix: "+", label: "Years of Seva" },
];

const iconMap: Record<string, LucideIcon> = {
  clock: Clock,
  "shield-check": ShieldCheck,
  receipt: Receipt,
  sparkles: Sparkles,
  "map-pin": MapPinned,
  timer: Clock,
  "hand-platter": HandPlatter,
};

type FaqCategory = "booking" | "yatra" | "rituals" | "logistics";
type TabKey = "all" | FaqCategory;

export function AboutPage() {
  const navigate = usePageStore((s) => s.navigate);
  const [activeFaq, setActiveFaq] = useState<TabKey>("all");
  const filteredFaqs = activeFaq === "all" ? faqs : faqs.filter((f) => f.category === activeFaq);

  return (
    <div className="pt-8 pb-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <OmIcon className="w-3 h-3 mr-1" /> About Us
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-primary font-medium text-lg">{siteConfig.tagline}</p>
          <p className="mt-1 text-sm text-saffron font-medium">{siteConfig.sanskritTagline}</p>
        </div>

        {/* Story + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <div className="space-y-5">
              {aboutPoints.map((p, i) => (
                <motion.div
                  key={p.heading}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-1">{p.heading}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <Button onClick={() => navigate("contact")} className="gap-2">
                Book Your Yatra <Heart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="bg-braj-gradient text-white rounded-2xl p-8 shadow-lg relative overflow-hidden animate-sacred-glow"
          >
            <OmIcon className="absolute -top-4 -right-4 w-32 h-32 text-gold/10 pointer-events-none" aria-hidden="true" />
            <p className="relative text-gold text-sm font-semibold uppercase tracking-wider">
              Our Sacred Numbers
            </p>
            <h3 className="relative text-2xl font-bold mt-2 mb-6">
              A decade of devoted seva
            </h3>
            <div className="relative grid grid-cols-2 gap-4">
              {statCards.map((s) => (
                <div key={s.label} className="bg-white/10 rounded-xl p-5 text-center">
                  <s.icon className="w-6 h-6 text-gold mx-auto" />
                  <p className="text-3xl font-bold text-white mt-2">
                    <CountUp target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="text-xs text-white/85 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="relative mt-6 text-sm text-white/80 leading-relaxed">
              Founded in {siteConfig.establishedYear} in the heart of Braj — Mathura — we started
              with a single sedan and a devotee&apos;s love for sharing Krishna&apos;s sacred land.
              Today, our network covers all 84-kosa of the Braj Mandala, with {siteConfig.contactPerson}
              and our team coordinating every yatra with the same family-run seva and devotion.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-3">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Built on Trust, Driven by Devotion
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              We do not just rent cabs — we deliver reliable, sacred journeys through Krishna&apos;s Braj.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon] ?? ShieldCheck;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="bg-muted/40 rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="secondary" className="mb-3">Pilgrimage FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Your Braj Yatra Questions Answered
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              Everything you need to know before embarking on your sacred Braj pilgrimage.
            </p>
          </div>

          <ScrollableTabs
            tabs={faqCategories}
            active={activeFaq}
            onChange={(k) => setActiveFaq(k as TabKey)}
            layoutId="faq-tab"
            tabWidth={175}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFaq}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((f, i) => (
                  <AccordionItem
                    key={`${activeFaq}-${i}`}
                    value={`item-${i}`}
                    className="bg-background mb-2 rounded-lg px-4 border border-border"
                  >
                    <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
