/**
 * ============================================================================
 *  SEO STRUCTURED DATA (JSON-LD) — Rich Results / Schema.org
 * ============================================================================
 *
 * Generates JSON-LD structured data objects for search engine rich results.
 * Used by Google, Bing, and AI search engines to understand entity context,
 * business info, FAQs, breadcrumbs, and content relationships.
 *
 * Reference: https://schema.org/
 * Validation: https://search.google.com/test/rich-results
 * ============================================================================
 */

import { siteConfig } from "@/lib/site-config";
import { yatraPackages } from "@/lib/site-data";

/**
 * Organization + LocalBusiness schema
 * — tells Google this is a travel agency in Vrindavan with NAP consistency.
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${siteConfig.seo.siteUrl}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: `${siteConfig.name} is a trusted Braj Yatra pilgrimage tour operator based in ${siteConfig.address.city}, offering customized Mathura Vrindavan tour packages, 84 Kos Yatra, Govardhan Parikrama, and Agra combined tours.`,
    url: siteConfig.seo.siteUrl,
    telephone: `+${siteConfig.phoneRaw}`,
    email: siteConfig.email,
    image: `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    logo: `${siteConfig.seo.siteUrl}/logo.png`,
    priceRange: siteConfig.localSeo.priceRange,
    foundingDate: String(siteConfig.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.localSeo.geoLatitude,
      longitude: siteConfig.localSeo.geoLongitude,
    },
    areaServed: siteConfig.localSeo.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.youtube,
    ].filter(Boolean),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "25000",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * WebSite schema — enables sitelinks search box in Google results.
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.seo.siteUrl}/#website`,
    url: siteConfig.seo.siteUrl,
    name: siteConfig.name,
    publisher: { "@id": `${siteConfig.seo.siteUrl}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.seo.siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Service / Tour schema — for each yatra package.
 */
export function getTourSchema(packageId: string) {
  const pkg = yatraPackages.find((p) => p.id === packageId);
  if (!pkg) return null;
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: `${pkg.duration} — ${pkg.temples.join(", ")}. Includes: ${pkg.inclusions.join(", ")}.`,
    provider: { "@id": `${siteConfig.seo.siteUrl}/#business` },
    touristType: "Pilgrimage",
    duration: `P${pkg.days}D`,
    itinerary: pkg.itinerary.map((day) => ({
      "@type": "ItemList",
      name: `Day ${day.day}: ${day.title}`,
      itemListElement: day.sites.map((site, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: site,
      })),
    })),
  };
}

/**
 * FAQ schema — for rich results with collapsible Q&A.
 */
export function getFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/**
 * Breadcrumb schema — for breadcrumb navigation in search results.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.seo.siteUrl}${item.url}`,
    })),
  };
}

/**
 * BlogPosting schema — for blog post rich results.
 */
export function getBlogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${siteConfig.seo.siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author || siteConfig.name,
    },
    publisher: { "@id": `${siteConfig.seo.siteUrl}/#business` },
    image: post.image
      ? `${siteConfig.seo.siteUrl}${post.image}`
      : `${siteConfig.seo.siteUrl}${siteConfig.seo.ogImage}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.seo.siteUrl}/blog/${post.slug}`,
    },
  };
}

/**
 * Offer schema — for special offers / deals.
 */
export function getOfferSchema(offer: {
  title: string;
  description: string;
  discount?: string;
  validTill?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.title,
    description: offer.description,
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    validThrough: offer.validTill || undefined,
    seller: { "@id": `${siteConfig.seo.siteUrl}/#business` },
  };
}

/**
 * Collection of all schemas for the homepage.
 */
export function getAllSchemas() {
  return [
    getLocalBusinessSchema(),
    getWebsiteSchema(),
  ];
}
