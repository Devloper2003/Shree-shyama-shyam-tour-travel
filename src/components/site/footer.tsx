"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle, MapPin, Clock, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { siteConfig, buildTelLink, buildWhatsAppLink } from "@/lib/site-config";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Yatra Packages", href: "#services" },
  { label: "Sacred Sites", href: "#sacred-sites" },
  { label: "Braj Mandala Map", href: "#coverage" },
  { label: "Festival Calendar", href: "#auspicious-dates" },
  { label: "Popular Routes", href: "#routes" },
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Book Your Yatra", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-braj-deep text-white mt-auto">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Shri Shyama Shyam Tour & Travels logo"
              className="h-24 w-auto object-contain mb-4 rounded-lg bg-white/95 p-1.5"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Mathura-Vrindavan&apos;s trusted Braj Yatra pilgrimage partner since {siteConfig.establishedYear}.
              Braj-born guides, verified vegetarian drivers, local pandit arrangements — across
              all 84-kosa of the sacred Braj Mandala. Coordinated by {siteConfig.contactPerson}.
            </p>
            <p className="text-xs text-gold mt-4 font-medium">{siteConfig.businessHours}</p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/75 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={buildTelLink()} className="flex items-start gap-2 text-white/75 hover:text-gold">
                  <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(`Hello ${siteConfig.shortName}, I'd like to book a cab.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white/75 hover:text-gold"
                >
                  <MessageCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2 text-white/75 hover:text-gold break-all"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>
                  {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
                  {siteConfig.address.city}, {siteConfig.address.state} —{" "}
                  {siteConfig.address.pincode}, {siteConfig.address.country}
                </span>
              </li>
              <li className="flex items-start gap-2 text-white/75">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{siteConfig.businessHours}</span>
              </li>
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex gap-2 mb-6">
              {siteConfig.social.facebook && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.instagram && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.youtube && (
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-accent-foreground transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
            </div>
            <Link href="#contact">
              <button className="w-full px-4 py-2.5 rounded-md bg-gold text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Book Your Yatra
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            राधे राधे • Coordinated by {siteConfig.contactPerson} • {siteConfig.phoneDisplay}
          </p>
        </div>
      </div>
    </footer>
  );
}
