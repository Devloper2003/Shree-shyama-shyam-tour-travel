"use client";

import { Star, ShieldCheck, Clock, MapPin, Car, Sparkles } from "lucide-react";

const items = [
  { icon: Star, text: "4.9/5 Rated by 15,000+ Travellers" },
  { icon: ShieldCheck, text: "Police-Verified Drivers" },
  { icon: Clock, text: "24x7 Service, 365 Days" },
  { icon: MapPin, text: "250+ Cities Across India" },
  { icon: Car, text: "80+ Vehicle Fleet" },
  { icon: Sparkles, text: "Sanitized, AC Cabs" },
];

/**
 * Infinite horizontal marquee strip — duplicates items so the animation
 * loops seamlessly. Pauses on hover for readability.
 */
export function Marquee() {
  return (
    <div
      className="bg-navy-deep text-white py-3 overflow-hidden border-y border-white/10"
      role="complementary"
      aria-label="Quick highlights"
    >
      <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
        {/* Duplicate the list so the loop is seamless */}
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm shrink-0">
            <item.icon className="w-4 h-4 text-gold" />
            <span className="text-white/90 font-medium">{item.text}</span>
            <span className="text-gold ml-6">•</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
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
