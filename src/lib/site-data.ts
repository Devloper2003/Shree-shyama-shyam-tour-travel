/**
 * ============================================================================
 *  SITE DATA — All static content for the website lives here.
 *  Update cab types, routes, testimonials, FAQs in this single file.
 * ============================================================================
 */

export type VehicleCategory = "economy" | "premium" | "group";

export type Vehicle = {
  id: string;
  name: string;
  category: string;
  seating: string;
  ac: boolean;
  luggage: string;
  example: string;
  perKmRate: number; // base per-km rate (INR) — used by fare calculator
  startingFrom: number; // one-day minimum fare (INR)
  bestFor: string[];
  popular?: boolean;
  tab: VehicleCategory; // for the animated services tabs
};

export const vehicles: Vehicle[] = [
  {
    id: "sedan",
    name: "Sedan",
    category: "Hatchback / Sedan",
    seating: "4 + 1",
    ac: true,
    luggage: "2 Bags",
    example: "Swift Dzire, Etios, Amaze",
    perKmRate: 11,
    startingFrom: 2200,
    bestFor: ["City rides", "Small family", "Airport drop"],
    popular: true,
    tab: "economy",
  },
  {
    id: "suv",
    name: "SUV",
    category: "Compact SUV",
    seating: "6 + 1",
    ac: true,
    luggage: "3 Bags",
    example: "Ertiga, Marazzo, Xylo",
    perKmRate: 14,
    startingFrom: 2800,
    bestFor: ["Hills trips", "Family of 6", "Comfort rides"],
    tab: "economy",
  },
  {
    id: "innova",
    name: "Innova Crysta",
    category: "Premium SUV",
    seating: "6 + 1",
    ac: true,
    luggage: "4 Bags",
    example: "Toyota Innova Crysta",
    perKmRate: 18,
    startingFrom: 3600,
    bestFor: ["Long outstation", "Corporate travel", "Premium comfort"],
    popular: true,
    tab: "premium",
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    category: "Mini Bus",
    seating: "12 / 17 / 20 seater",
    ac: true,
    luggage: "Roof carrier",
    example: "Force Motors Traveller",
    perKmRate: 22,
    startingFrom: 4500,
    bestFor: ["Group tours", "Wedding groups", "Pilgrimage"],
    tab: "group",
  },
  {
    id: "luxury",
    name: "Luxury Sedan",
    category: "Executive Class",
    seating: "4 + 1",
    ac: true,
    luggage: "2 Bags",
    example: "Honda Civic, Mercedes E-Class",
    perKmRate: 28,
    startingFrom: 5500,
    bestFor: ["VIP pickup", "Business meetings", "Wedding car"],
    tab: "premium",
  },
  {
    id: "bus",
    name: "Mini Bus / Coach",
    category: "Large Group",
    seating: "25 — 45 seater",
    ac: true,
    luggage: "Underfloor",
    example: "Volvo, Ashok Leyland",
    perKmRate: 35,
    startingFrom: 8500,
    bestFor: ["Corporate outings", "School trips", "Large tour groups"],
    tab: "group",
  },
];

export type Route = {
  from: string;
  to: string;
  approxKm: number;
  fromPrice: number;
  popularFor: string;
};

export const popularRoutes: Route[] = [
  { from: "Delhi", to: "Agra", approxKm: 230, fromPrice: 2800, popularFor: "Taj Mahal day trip" },
  { from: "Delhi", to: "Jaipur", approxKm: 280, fromPrice: 3400, popularFor: "Pink City tour" },
  { from: "Delhi", to: "Mathura", approxKm: 180, fromPrice: 2400, popularFor: "Pilgrimage" },
  { from: "Delhi", to: "Haridwar", approxKm: 240, fromPrice: 3000, popularFor: "Spiritual trip" },
  { from: "Delhi", to: "Rishikesh", approxKm: 260, fromPrice: 3200, popularFor: "Adventure & yoga" },
  { from: "Delhi", to: "Chandigarh", approxKm: 250, fromPrice: 3100, popularFor: "Business" },
  { from: "Mumbai", to: "Pune", approxKm: 150, fromPrice: 2200, popularFor: "Express route" },
  { from: "Mumbai", to: "Goa", approxKm: 590, fromPrice: 7200, popularFor: "Beach holiday" },
  { from: "Mumbai", to: "Shirdi", approxKm: 240, fromPrice: 3000, popularFor: "Pilgrimage" },
  { from: "Mumbai", to: "Nashik", approxKm: 170, fromPrice: 2400, popularFor: "Wine country" },
  { from: "Jaipur", to: "Ajmer", approxKm: 130, fromPrice: 1900, popularFor: "Dargah trip" },
  { from: "Jaipur", to: "Pushkar", approxKm: 145, fromPrice: 2100, popularFor: "Camel fair" },
  { from: "Bangalore", to: "Mysore", approxKm: 150, fromPrice: 2200, popularFor: "Palace tour" },
  { from: "Bangalore", to: "Ooty", approxKm: 270, fromPrice: 3600, popularFor: "Hills" },
  { from: "Chennai", to: "Pondicherry", approxKm: 170, fromPrice: 2400, popularFor: "French town" },
  { from: "Chennai", to: "Tirupati", approxKm: 130, fromPrice: 1900, popularFor: "Temple darshan" },
  { from: "Kolkata", to: "Digha", approxKm: 180, fromPrice: 2400, popularFor: "Beach weekend" },
  { from: "Hyderabad", to: "Srisailam", approxKm: 215, fromPrice: 2800, popularFor: "Temple" },
  { from: "Ahmedabad", to: "Statue of Unity", approxKm: 200, fromPrice: 2600, popularFor: "Monument visit" },
  { from: "Varanasi", to: "Prayagraj", approxKm: 120, fromPrice: 1800, popularFor: "Spiritual circuit" },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
  trip: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Verma",
    location: "Delhi",
    rating: 5,
    text: "Booked an Innova for a Delhi-Jaipur round trip. Driver was professional, cab was spotless and on time. Pricing was transparent with no hidden charges. Highly recommended for family trips.",
    trip: "Delhi → Jaipur Round Trip",
  },
  {
    name: "Sneha Patel",
    location: "Mumbai",
    rating: 5,
    text: "Used their service for Mumbai-Shirdi with my elderly parents. The driver was patient and helpful throughout. The 24x7 support team answered every question promptly. Will book again.",
    trip: "Mumbai → Shirdi One-way",
  },
  {
    name: "Arun Kumar",
    location: "Bangalore",
    rating: 5,
    text: "Took a Tempo Traveller for a 12-person team outing to Mysore. Vehicle was comfortable, AC worked perfectly, driver knew all the routes. Best group travel experience so far.",
    trip: "Bangalore → Mysore Group",
  },
  {
    name: "Pooja Sharma",
    location: "Mathura",
    rating: 5,
    text: "Booked a sedan for local Mathura-Vrindavan sightseeing. Driver knew every temple and shortcut. Very reasonable rate and clean cab. Our go-to travel partner now.",
    trip: "Mathura Local Sightseeing",
  },
  {
    name: "Mohammed Faisal",
    location: "Hyderabad",
    rating: 5,
    text: "Airport pickup at 3 AM was on time, no extra night charges surprised us. Driver helped with luggage and the cab was sanitized. Smooth and reliable service.",
    trip: "Hyderabad Airport Transfer",
  },
  {
    name: "Anjali Desai",
    location: "Ahmedabad",
    rating: 5,
    text: "Statue of Unity trip with 8 family members in an Innova Crysta. Booking was easy through WhatsApp, driver was friendly, and the vehicle was premium. Five stars from our whole family.",
    trip: "Ahmedabad → Statue of Unity",
  },
];

export type FaqCategory = "booking" | "pricing" | "service" | "policy";

export type FaqItem = {
  q: string;
  a: string;
  category: FaqCategory;
};

export const faqs: FaqItem[] = [
  {
    q: "Which cities and states do you cover?",
    a: "We provide private cab services all over India. Whether you need a cab in Delhi NCR, Mumbai, Jaipur, Bangalore, Chennai, Kolkata, or for an outstation trip between any two cities — we have a verified driver and clean vehicle ready for you. Our 250+ city network covers every major route.",
    category: "service",
  },
  {
    q: "How do I book a cab?",
    a: "You can book in three ways: (1) Fill the booking form on this website and our team will call you back within 15 minutes, (2) Message us directly on WhatsApp with your pickup, drop, date and vehicle preference, or (3) Call us on the number listed above. We confirm every booking personally before dispatch.",
    category: "booking",
  },
  {
    q: "What are your fare and pricing rules?",
    a: "Pricing is per-kilometre and depends on the vehicle you choose. The fare includes driver allowance, fuel, and state taxes for the booked route. For one-way outstation trips, we charge for the return kilometres as per industry standard. There are no hidden charges — what we quote is what you pay.",
    category: "pricing",
  },
  {
    q: "Are your drivers verified and cabs sanitized?",
    a: "Yes. Every driver is police-verified, holds a valid commercial license, and has at least 3 years of experience. Each cab is sanitized before every trip, has a working AC, first-aid kit, and clean interiors. We share the driver's name, photo, and vehicle number with you 30 minutes before pickup.",
    category: "service",
  },
  {
    q: "What is your cancellation and refund policy?",
    a: "Cancellations made 6 hours before pickup are fully refundable with no charge. Cancellations within 6 hours may attract a small driver allowance fee. No charge if the cab has not been dispatched. Rescheduling is always free of cost.",
    category: "policy",
  },
  {
    q: "Do you offer airport pickup and drop?",
    a: "Yes. We offer on-time airport transfers to and from all major Indian airports including Delhi (DEL), Mumbai (BOM), Bangalore (BLR), Chennai (MAA), Hyderabad (HYD), Kolkata (CCU) and Jaipur (JAI). We track your flight status so the driver is there even if your flight is delayed.",
    category: "service",
  },
  {
    q: "Can I book a cab for multiple days or a tour package?",
    a: "Absolutely. We offer multi-day packages, pilgrimage tours (Char Dham, Vaishno Devi, Shirdi, Tirupati), Rajasthan tours, Golden Triangle tours and customized itineraries. The cab stays with you for the entire duration. Contact us with your plan and we will share a fixed package price.",
    category: "booking",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI (PhonePe, Google Pay, Paytm), bank transfer, credit/debit cards, and cash. For online bookings, a 25% advance confirms the booking and the balance is paid to the driver after the trip.",
    category: "pricing",
  },
];

export const faqCategories: { key: FaqCategory | "all"; label: string }[] = [
  { key: "all", label: "All Questions" },
  { key: "booking", label: "Booking" },
  { key: "pricing", label: "Pricing & Payment" },
  { key: "service", label: "Service & Fleet" },
  { key: "policy", label: "Policies" },
];

export const whyChooseUs = [
  {
    title: "24x7 Service, 365 Days",
    description:
      "Our support team and drivers are available round the clock, every day of the year. Be it a 3 AM airport pickup or a late-night outstation drop, we are always on call.",
    icon: "clock",
  },
  {
    title: "Verified, Experienced Drivers",
    description:
      "Every driver is police-verified, holds a valid commercial licence, and brings 3+ years of route knowledge. You get the driver's photo and vehicle number 30 minutes before pickup.",
    icon: "shield-check",
  },
  {
    title: "Transparent, All-Inclusive Pricing",
    description:
      "What we quote is what you pay — fuel, driver allowance, and state taxes are all included. No hidden surcharges, no last-minute additions, no meter games.",
    icon: "receipt",
  },
  {
    title: "Clean, Sanitized Cabs",
    description:
      "Every vehicle is sanitized before each trip, with working AC, clean seat covers, and a first-aid kit. Comfort and hygiene are non-negotiable for us.",
    icon: "sparkles",
  },
  {
    title: "Pan India Coverage",
    description:
      "From metro cities to tier-3 towns, from pilgrimage routes to hill stations — our 250+ city network covers every corner of India with the same service standard.",
    icon: "map-pin",
  },
  {
    title: "On-Time Pickup, Every Time",
    description:
      "We track flights, monitor traffic, and dispatch early when needed. Our on-time rate is 99%. If we are ever late because of us, your wait time is on us.",
    icon: "timer",
  },
];

export const aboutPoints = [
  {
    heading: "Our Story",
    body:
      "Shree Shyama Shyam Tour and Travels was founded in 2015 with a single sedan and a simple promise — to make outstation cab travel in India reliable, transparent and comfortable. Over the years, word-of-mouth from happy travellers has grown our fleet to 80+ vehicles and our network to 250+ cities across the country.",
  },
  {
    heading: "Our Mission",
    body:
      "To be India's most trusted private cab service by combining the warmth of a family-run business with the discipline of a professional fleet operator. Every booking — whether a single airport drop or a 10-day Rajasthan tour — gets the same attention to detail.",
  },
  {
    heading: "Why Travellers Trust Us",
    body:
      "We answer our phone, we show up on time, and we charge exactly what we quoted. Our drivers are paid fairly and trained to treat every passenger like a guest. That is why over 15,000 travellers have chosen us for their journeys across India.",
  },
];
