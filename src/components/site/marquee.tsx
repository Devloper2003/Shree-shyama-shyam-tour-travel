"use client";

import { Star, ShieldCheck, Clock, MapPin, Sparkles, Heart } from "lucide-react";
import { OmIcon } from "@/components/site/om-icon";

const items = [
  { icon: OmIcon, text: "Radhe Radhe — Braj Mandala Pilgrimage" },
  { icon: Star, text: "4.9/5 Rated by 25,000+ Pilgrims" },
  { icon: ShieldCheck, text: "Vegetarian Braj-Born Drivers" },
  { icon: Clock, text: "24x7 — Braj Never Sleeps" },
  { icon: MapPin, text: "84 Sacred Sites Covered" },
  { icon: Heart, text: "Local Pandit Arrangements" },
  { icon: Sparkles, text: "Mathura • Vrindavan • Gokul • Barsana • Govardhan" },
];

/**
 * Infinite horizontal marquee strip — duplicates items so the animation
 * loops seamlessly. Pauses on hover for readability.
 */
export function Marquee() {
  return (
    <div
      className="bg-braj-deep text-white py-3 overflow-hidden border-y border-gold/20"
      role="complementary"
      aria-label="Quick highlights"
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm shrink-0">
            <item.icon className="w-4 h-4 text-gold" />
            <span className="text-white/90 font-medium">{item.text}</span>
            <span className="text-gold ml-6">✦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
