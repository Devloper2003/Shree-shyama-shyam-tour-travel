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
  name: "Sri Shyama Tour & Travels",
  legalName: "Sri Shyama Tour & Travels, Mathura Vrindavan",
  shortName: "Sri Shyama Travels",
  tagline: "Mathura Vrindavan Braj Yatra & Pilgrimage Tours",
  sanskritTagline: "श्री श्यामा टूर एंड ट्रैवल्स",
  establishedYear: 2015,
  experienceYears: 10,

  // ---- Contact person ----
  contactPerson: "Vithika",
  contactPersonRole: "Yatra Coordinator",

  // ---- Contact details ----
  phoneDisplay: "+91 83197 10872",
  phoneRaw: "918319710872",

  whatsappDisplay: "+91 83197 10872",
  whatsappRaw: "918319710872",

  email: "bookings@shrishyamashyamtravels.in",

  // Office address — Mathura/Vrindavan (heart of Braj)
  address: {
    line1: "Sri Shyama Tour & Travels",
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
