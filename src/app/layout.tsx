import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site-config";
import {
  getLocalBusinessSchema,
  getWebsiteSchema,
  getFaqSchema,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Font optimization: swap to system font while loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = siteConfig.seo.siteUrl;
const ogImage = `${siteUrl}${siteConfig.seo.ogImage}`;

// ============================================================================
//  DYNAMIC META — SEO-friendly title, description, keywords, canonical
// ============================================================================
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sri Shyama Tour & Travels | Mathura Vrindavan Braj Yatra & Pilgrimage Tours",
    template: "%s | Sri Shyama Tour & Travels",
  },
  description:
    "Book sacred Braj Yatra with Sri Shyama Tour & Travels, Vrindavan. 2N/3D, 3N/4D with Agra, 84 Kos Yatra, 6N/7D custom packages. Pickup from Delhi & Agra. 25,000+ pilgrims served. Call +91 83197 10872.",
  keywords: [
    "Braj Yatra",
    "Brij Yatra",
    "Mathura Vrindavan tour",
    "Sri Shyama Tour Travels",
    "Krishna Janmabhoomi darshan",
    "Banke Bihari temple",
    "Govardhan Parikrama",
    "Barsana Nandgaon yatra",
    "Braj Mandala pilgrimage",
    "Mathura pilgrimage tours",
    "Agra Mathura Vrindavan package",
    "84 kos yatra",
    "Vrindavan tour package",
    "Radha Krishna pilgrimage",
    "Mathura Vrindavan taxi",
    "Delhi to Mathura cab",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "Travel & Tourism",
  formatDetection: { telephone: true, address: true, email: true },
  alternates: {
    canonical: "/",
    languages: { "en-IN": "/", "hi-IN": "/" },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Sri Shyama Tour & Travels | Mathura Vrindavan Braj Yatra",
    description:
      "Sacred Braj Yatra pilgrimage tours — Mathura, Vrindavan, Gokul, Barsana, Nandgaon, Govardhan. 2N/3D to 6N/7D packages with verified drivers and local guides. Call +91 83197 10872.",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    alternateLocale: ["hi_IN"],
    url: siteUrl,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Braj Yatra pilgrimage tours`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Shyama Tour & Travels | Braj Yatra",
    description: "Mathura Vrindavan Braj Yatra pilgrimage tours across the holy Braj Mandala.",
    images: [ogImage],
    creator: siteConfig.seo.twitterHandle || undefined,
  },
  verification: {
    google: siteConfig.seo.gscVerification || undefined,
    other: {
      "msvalidate.01": siteConfig.seo.bingVerification || undefined,
    },
  },
  other: {
    // PWA / mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": siteConfig.shortName,
    // Geo tags for local SEO
    geo: {
      latitude: String(siteConfig.localSeo.geoLatitude),
      longitude: String(siteConfig.localSeo.geoLongitude),
      placename: siteConfig.address.city,
      region: "IN-UP",
    },
    // Theme color for browsers
    "theme-color": "#d97706",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d97706" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1f3a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ============================================================================
//  FAQ SCHEMA — for rich results
// ============================================================================
const faqSchema = getFaqSchema([
  {
    q: "What is Braj Yatra?",
    a: "Braj Yatra is a sacred pilgrimage across the Braj Mandala — the 84-kosa (about 300 km) region where Lord Krishna performed His pastimes. It covers Mathura (birthplace), Vrindavan (ras-lila), Gokul (childhood), Barsana (Radha's home), Nandgaon, and Govardhan Hill.",
  },
  {
    q: "How long is the complete 84 Kos Yatra?",
    a: "The complete 84 Kos Braj Yatra takes 3-7 days depending on the pace and depth of darshan at each site. We offer flexible durations.",
  },
  {
    q: "Do you provide pickup from Delhi or Agra?",
    a: "Yes, we provide AC cab pickup from Delhi and Agra to Mathura Vrindavan, with optional return drop.",
  },
  {
    q: "Are guides available?",
    a: "Yes, all packages include dedicated Braj-born guides who understand the spiritual significance of each site and speak Hindi, English, and Bengali.",
  },
  {
    q: "Can packages be customized?",
    a: "Yes, all our packages are fully customizable — routes, duration, accommodation, and group size. Share your sankalp and we craft the perfect itinerary.",
  },
]);

// ============================================================================
//  ROOT LAYOUT
// ============================================================================
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for rich results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getLocalBusinessSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebsiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* Google Analytics 4 — only if GA4 ID is set */}
        {siteConfig.seo.ga4Id && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.seo.ga4Id}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.seo.ga4Id}', {
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
