"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Star, ShieldCheck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/site/count-up";
import { OmIcon } from "@/components/site/om-icon";
import { siteConfig, buildTelLink, buildWhatsAppLink } from "@/lib/site-config";

const trustBadges = [
  { icon: ShieldCheck, label: "Braj-Born Guides" },
  { icon: Clock, label: "24x7 Yatra Support" },
  { icon: Star, label: "4.9 / 5 Rated" },
  { icon: MapPin, label: "84 Sacred Sites" },
];

const stats = [
  { target: 25000, suffix: "+", label: "Blessed Pilgrims" },
  { target: 84, suffix: "", label: "Sacred Sites Covered" },
  { target: 10, suffix: "+", label: "Years of Seva" },
  { target: 99, suffix: "%", label: "Yatra Completion" },
];

// Floating lotus/petal particles for the sacred ambience
const particles = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: `${(i * 6.5 + 4) % 96}%`,
  top: `${(i * 11.7 + 8) % 85}%`,
  size: 3 + ((i * 3) % 8),
  delay: (i * 0.35) % 4,
  duration: 4 + ((i * 1.4) % 4),
  // alternate gold and saffron petals
  color: i % 3 === 0 ? "bg-gold/40" : i % 3 === 1 ? "bg-saffron/30" : "bg-white/30",
}));

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-braj-gradient text-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-saffron/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Diya (lamp) pattern strip at top */}
      <div className="braj-pattern-border" aria-hidden="true" />

      {/* Floating particles (petals) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={`absolute rounded-full ${p.color}`}
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1],
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
              className="flex items-center justify-center lg:justify-start gap-3 mb-4"
            >
              <Badge className="bg-gold text-accent-foreground hover:bg-gold">
                <OmIcon className="w-3 h-3 mr-1" /> Mathura • Vrindavan • Since {siteConfig.establishedYear}
              </Badge>
            </motion.div>

            {/* Sanskrit tagline */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gold text-lg sm:text-xl font-medium mb-2"
            >
              {siteConfig.sanskritTagline}
            </motion.p>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
            >
              Sacred Braj Yatra
              <motion.span
                className="block text-gold mt-2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                with Shri Shyam Travels
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-5 text-base sm:text-lg text-white/85 max-w-xl mx-auto lg:mx-0"
            >
              Walk in the divine footsteps of Shri Krishna through the 84-kosa Braj Mandala —
              Mathura, Vrindavan, Gokul, Barsana, Nandgaon & Govardhan. Same-day to 3-day
              pilgrimage packages with Braj-born guides, verified vegetarian drivers, and
              local pandit arrangements.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Link href="#contact">
                <Button size="lg" className="w-full sm:w-auto bg-gold text-accent-foreground hover:bg-gold/90">
                  Book Your Yatra
                </Button>
              </Link>
              <a
                href={buildWhatsAppLink(
                  `Radhe Radhe! I would like to book a Braj Yatra. Preferred package: , Dates: , Group size: `
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white gap-2"
                >
                  <MessageCircle className="w-5 h-5" /> WhatsApp
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
              transition={{ duration: 0.6, delay: 0.45 }}
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
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden animate-sacred-glow">
              {/* Om symbol watermark */}
              <OmIcon className="absolute -top-4 -right-4 w-32 h-32 text-gold/10 pointer-events-none" aria-hidden="true" />

              <p className="relative text-gold text-sm font-semibold uppercase tracking-wider">
                Why devotees choose us
              </p>
              <h2 className="relative text-2xl font-bold mt-2 mb-6">
                Braj&apos;s most trusted yatra partner
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
                <span>Blessed by 25,000+ pilgrims across India</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[40px] sm:h-[60px]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.985 0.008 80)" />
        </svg>
      </div>
    </section>
  );
}
