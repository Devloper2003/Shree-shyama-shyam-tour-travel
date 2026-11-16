"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";
import { siteConfig, buildTelLink, buildWhatsAppLink } from "@/lib/site-config";

const trustBadges = [
  { icon: ShieldCheck, label: "Verified Drivers" },
  { icon: Clock, label: "24x7 Service" },
  { icon: Star, label: "4.9 / 5 Rated" },
  { icon: MapPin, label: "Pan India" },
];

// Stats with numeric targets for the animated counter
const stats = [
  { target: 15000, suffix: "+", label: "Happy Travellers" },
  { target: 250, suffix: "+", label: "Cities Covered" },
  { target: 80, suffix: "+", label: "Vehicles in Fleet" },
  { target: 99, suffix: "%", label: "On-Time Pickup" },
];

// Pre-generated positions for floating particles (stable across renders)
const particles = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  left: `${(i * 7.3 + 5) % 95}%`,
  top: `${(i * 11.7 + 8) % 85}%`,
  size: 4 + ((i * 3) % 7),
  delay: (i * 0.4) % 4,
  duration: 4 + ((i * 1.5) % 4),
}));

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-navy-gradient text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold/40"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-gold text-accent-foreground hover:bg-gold mb-4">
                Trusted Since {siteConfig.establishedYear}
              </Badge>
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              Private Cab Service
              <motion.span
                className="block text-gold mt-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                All Over India
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0"
            >
              From airport drops to multi-day tours — book verified, sanitized cabs with
              transparent all-inclusive pricing. Sedan, SUV, Innova, Tempo Traveller & luxury
              coaches available 24x7 across 250+ cities.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="#contact">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold/90">
                  Book a Cab Now
                </Button>
              </Link>
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteConfig.shortName}, I would like to enquire about a cab booking. Pickup: , Drop: , Date: `
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp Us
                </Button>
              </a>
              <a href={buildTelLink()}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                >
                  <Phone className="w-5 h-5" /> Call
                </Button>
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto lg:mx-0"
            >
              {trustBadges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/40 transition-colors"
                >
                  <b.icon className="w-5 h-5 text-gold" />
                  <span className="text-xs text-white/90 text-center">{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats card with animated counters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Animated gradient border accent */}
              <div className="absolute -inset-px rounded-2xl pointer-events-none opacity-60" aria-hidden="true">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0 animate-pulse" />
              </div>

              <p className="relative text-gold text-sm font-semibold uppercase tracking-wider">
                Why travellers choose us
              </p>
              <h2 className="relative text-2xl font-bold mt-2 mb-6">
                India&apos;s trusted private cab partner
              </h2>
              <div className="relative grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    className="bg-white/10 rounded-xl p-5 text-center hover:bg-white/15 transition-colors"
                  >
                    <p className="text-3xl font-bold text-gold">
                      <CountUp target={s.target} suffix={s.suffix} startDelay={600 + i * 150} />
                    </p>
                    <p className="text-sm text-white/85 mt-1">{s.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="relative mt-6 flex items-center gap-3 text-sm text-white/85">
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span>Rated 4.9/5 by 15,000+ travellers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(1 0 0)" />
        </svg>
      </div>
    </section>
  );
}
