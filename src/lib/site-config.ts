/**
 * ============================================================================
 *  SITE CONFIG — EDIT THIS FILE TO UPDATE YOUR CONTACT DETAILS
 * ============================================================================
 *  Replace the placeholder values below with your real business information.
 *  Everything on the website (header, footer, WhatsApp button, booking form,
 *  email enquiries) reads from this single file, so one update propagates
 *  everywhere automatically.
 * ============================================================================
 */

export const siteConfig = {
  // ---- Business identity ----
  name: "Shree Shyama Shyam Tour and Travels",
  shortName: "Shree Shyama Shyam",
  tagline: "Sacred Braj Yatra & Pilgrimage Tours",
  sanskritTagline: "श्री श्यामा श्याम ब्रज यात्रा",
  establishedYear: 2015,
  experienceYears: 10,

  // ---- Contact details (REPLACE THESE PLACEHOLDERS) ----
  phoneDisplay: "+91 98765 43210",
  phoneRaw: "919876543210",

  whatsappDisplay: "+91 98765 43210",
  whatsappRaw: "919876543210",

  email: "bookings@shreeshyamshyambrajyatra.com",

  // Office address — Mathura (heart of Braj)
  address: {
    line1: "Shree Shyama Shyam Yatra Bhawan",
    line2: "Near Krishna Janmabhoomi, Krishna Nagar",
    city: "Mathura",
    state: "Uttar Pradesh",
    pincode: "281001",
    country: "India",
  },

  // ---- Business hours ----
  businessHours: "Open 24x7 — Braj never sleeps",

  // ---- Social links (leave empty string "" to hide) ----
  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
    twitter: "",
  },

  // ---- Quick stats shown on hero / about ----
  stats: {
    happyPilgrims: "25,000+",
    sacredSites: "84",
    yatraYears: "10+",
    onCompleteRate: "99%",
  },
} as const;

// Helper: build a WhatsApp deep link with a pre-filled message
export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappRaw}?text=${encoded}`;
}

// Helper: build a tel: link
export function buildTelLink(): string {
  return `tel:+${siteConfig.phoneRaw}`;
}

// Helper: build a mailto: link with subject + body
export function buildMailtoLink(subject: string, body: string): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
