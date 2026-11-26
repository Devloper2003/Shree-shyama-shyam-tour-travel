/**
 * ============================================================================
 *  SITE DATA — All static content for the Braj Yatra website lives here.
 *  Update yatra packages, sacred sites, routes, testimonials, FAQs here.
 * ============================================================================
 */

// ============================================================================
//  YATRA PACKAGES — replaces the old cab "services" data
// ============================================================================

export type YatraPackageCategory = "short" | "agra" | "complete" | "custom";

export type YatraItineraryDay = {
  day: number;
  title: string;
  sites: string[];
};

export type YatraPackage = {
  id: string;
  name: string;
  category: string;
  duration: string;
  days: number;
  price: number; // 0 means "Price on Request"
  startingFrom: number; // 0 means "Price on Request"
  temples: string[];
  inclusions: string[];
  bestFor: string[];
  popular?: boolean;
  tab: YatraPackageCategory;
  itinerary: YatraItineraryDay[];
};

export const yatraPackages: YatraPackage[] = [
  {
    id: "2n3d-braj",
    name: "2N / 3D Customized Braj Yatra",
    category: "2 Nights / 3 Days — Customized",
    duration: "3 Days, 2 Nights",
    days: 3,
    price: 0,
    startingFrom: 0,
    temples: ["Mathura", "Vrindavan", "Gokul", "Mahavan", "Govardhan", "Barsana", "Nandgaon", "Radha Kund"],
    inclusions: ["AC Cab for 3 days", "Dedicated Braj guide", "2-night stay at Dharamshala/Hotel", "All temple visits", "Govardhan Parikrama support", "Evening aartis", "Morning boat ride at Vishram Ghat"],
    bestFor: ["Comprehensive Braj experience", "Family groups", "First-time Braj visitors"],
    popular: true,
    tab: "short",
    itinerary: [
      { day: 1, title: "Mathura & Gokul", sites: ["Krishna Janmabhoomi", "Vishram Ghat (boat ride)", "Gokulnath Temple", "Raman Reti", "Mahavan"] },
      { day: 2, title: "Vrindavan Deep Darshan", sites: ["Banke Bihari", "Prem Mandir", "ISKCON", "Seva Kunj", "Kesi Ghat aarti"] },
      { day: 3, title: "Barsana, Nandgaon & Govardhan", sites: ["Radha Rani Temple", "Nand Bhavan", "Govardhan Parikrama", "Radha Kund"] },
    ],
  },
  {
    id: "3n4d-braj-agra",
    name: "3N / 4D Customized Braj + Agra Package",
    category: "3 Nights / 4 Days — with Agra",
    duration: "4 Days, 3 Nights",
    days: 4,
    price: 0,
    startingFrom: 0,
    temples: ["Complete Braj Mandala", "Agra (Taj Mahal)", "Fatehpur Sikri"],
    inclusions: ["AC Innova/SUV for 4 days", "Dedicated guide", "3-night stay at hotels", "All temple visits", "Taj Mahal visit", "Fatehpur Sikri excursion", "Govardhan Parikrama", "Boat ride at Yamuna"],
    bestFor: ["Braj + heritage combo", "International tourists", "Family with elders"],
    popular: true,
    tab: "agra",
    itinerary: [
      { day: 1, title: "Arrival & Mathura", sites: ["Krishna Janmabhoomi", "Vishram Ghat", "Gokul"] },
      { day: 2, title: "Vrindavan Full Day", sites: ["Banke Bihari", "Prem Mandir", "ISKCON", "Seva Kunj"] },
      { day: 3, title: "Govardhan, Barsana & Agra", sites: ["Govardhan Parikrama", "Radha Kund", "Barsana", "Nandgaon", "Taj Mahal sunset"] },
      { day: 4, title: "Agra Fort & Departure", sites: ["Agra Fort", "Fatehpur Sikri", "Drop"] },
    ],
  },
  {
    id: "84-kos-yatra",
    name: "84 Kos Braj Yatra",
    category: "Complete 84 Kos Parikrama",
    duration: "Flexible (3-7 days)",
    days: 5,
    price: 0,
    startingFrom: 0,
    temples: ["All 84 kos Braj circuit", "12 main sacred sites", "72 additional sites", "Govardhan Parikrama", "Radha Kund", "Kusum Sarovar"],
    inclusions: ["AC vehicle for full circuit", "Dedicated Braj guide", "Accommodation at multiple stops", "All temple visits", "Govardhan Parikrama support", "Local pandit arrangements", "Evening aartis at all major temples"],
    bestFor: ["Complete spiritual journey", "Serious devotees", "Once-in-a-lifetime yatra"],
    popular: true,
    tab: "complete",
    itinerary: [
      { day: 1, title: "Mathura & Vrindavan", sites: ["Krishna Janmabhoomi", "Banke Bihari", "Prem Mandir", "ISKCON", "Seva Kunj", "Vishram Ghat"] },
      { day: 2, title: "Gokul, Mahavan & Govardhan", sites: ["Gokulnath Temple", "Raman Reti", "Mahavan", "Govardhan Parikrama", "Radha Kund", "Kusum Sarovar"] },
      { day: 3, title: "Barsana, Nandgaon & Surrounding", sites: ["Radha Rani Temple", "Maan Mandir", "Nand Bhavan", "Kokilavan", "Bhandiravan"] },
      { day: 4, title: "Remaining 84 Kos Sites", sites: ["Uncha Gaon", "Baheli", "Chatikara", "Bathain", "Asoy"] },
      { day: 5, title: "Final Darshan & Departure", sites: ["Morning aarti at Vishram Ghat", "Final temple visits", "Drop"] },
    ],
  },
  {
    id: "6n7d-custom",
    name: "6N / 7D Customized Package (As Per Your Demand)",
    category: "6 Nights / 7 Days — Fully Customized",
    duration: "7 Days, 6 Nights",
    days: 7,
    price: 0,
    startingFrom: 0,
    temples: ["Complete Braj Mandala", "Agra", "Jaipur", "Khajuraho", "Or any combination you desire"],
    inclusions: ["AC SUV/Tempo for 7 days", "Dedicated guide", "6-night stay at premium hotels", "All temple visits", "Govardhan Parikrama", "Sightseeing as per your plan", "All tolls & parking", "Local pandit arrangements"],
    bestFor: ["Grand spiritual circuit", "NRIs & international groups", "Customized itinerary", "Group size 10+"],
    popular: true,
    tab: "custom",
    itinerary: [
      { day: 0, title: "Tell us your plan", sites: ["Share your preferred sites, dates, and group size — we craft your perfect 7-day yatra"] },
    ],
  },
];

// ============================================================================
//  VEHICLE FLEET — for transport to/from Braj and within the circuit
// ============================================================================

export type VehicleCategory = "economy" | "premium" | "group";

export type Vehicle = {
  id: string;
  name: string;
  category: string;
  seating: string;
  ac: boolean;
  luggage: string;
  example: string;
  perKmRate: number;
  startingFrom: number;
  bestFor: string[];
  popular?: boolean;
  tab: VehicleCategory;
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
    perKmRate: 12,
    startingFrom: 2500,
    bestFor: ["Small family", "Delhi-Mathura", "Airport pickup"],
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
    perKmRate: 15,
    startingFrom: 3200,
    bestFor: ["Family of 6", "Hills to Braj", "Comfort yatra"],
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
    perKmRate: 19,
    startingFrom: 4000,
    bestFor: ["Long Braj circuit", "Senior devotees", "Premium comfort"],
    popular: true,
    tab: "premium",
  },
  {
    id: "luxury",
    name: "Luxury Sedan",
    category: "Executive Class",
    seating: "4 + 1",
    ac: true,
    luggage: "2 Bags",
    example: "Honda Civic, Mercedes E-Class",
    perKmRate: 30,
    startingFrom: 6000,
    bestFor: ["VIP pickup", "Mahants/Sants", "Wedding car"],
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
    perKmRate: 24,
    startingFrom: 5000,
    bestFor: ["Bhajan mandalis", "Temple groups", "Pilgrimage tours"],
    popular: true,
    tab: "group",
  },
  {
    id: "bus",
    name: "Mini Bus / Coach",
    category: "Large Group",
    seating: "25 — 45 seater",
    ac: true,
    luggage: "Underfloor",
    example: "Volvo, Ashok Leyland",
    perKmRate: 38,
    startingFrom: 9000,
    bestFor: ["Satsang groups", "Community yatra", "Large tours"],
    tab: "group",
  },
];

// ============================================================================
//  SACRED SITES — temples and pilgrimage places in Braj
// ============================================================================

export type SacredSiteCategory = "birthplace" | "childhood" | "ras-lila" | "govardhan" | "radha" | "ghat";

export type SacredSite = {
  id: string;
  name: string;
  sanskritName?: string;
  location: string;
  significance: string;
  bestTime: string;
  mustSee: string;
  category: SacredSiteCategory;
  image: string;
};

export const sacredSites: SacredSite[] = [
  {
    id: "janmabhoomi",
    name: "Krishna Janmabhoomi",
    sanskritName: "कृष्ण जन्मभूमि",
    location: "Mathura",
    significance: "The exact birthplace of Lord Krishna — the prison cell where Devaki and Vasudev were held by Kansa.",
    bestTime: "Year-round; Janmashtami is most auspicious",
    mustSee: "Garbha Griha (birthplace), Bhagavata Bhavan",
    category: "birthplace",
    image: "/sites/janmabhoomi.jpg",
  },
  {
    id: "banke-bihari",
    name: "Banke Bihari Temple",
    sanskritName: "बांके बिहारी मंदिर",
    location: "Vrindavan",
    significance: "Home to the divine self-manifested idol of Krishna in His tribhanga (three-fold bent) form.",
    bestTime: "Year-round; avoid afternoon (temple closed 12-5:30 PM)",
    mustSee: "Shringar darshan in morning, evening aarti",
    category: "ras-lila",
    image: "/sites/banke-bihari.jpg",
  },
  {
    id: "prem-mandir",
    name: "Prem Mandir",
    sanskritName: "प्रेम मंदिर",
    location: "Vrindavan",
    significance: "A breathtaking white marble temple dedicated to Radha-Krishna and Sita-Ram, built by Jagadguru Kripalu Maharaj.",
    bestTime: "Evening for light & sound show (7 PM)",
    mustSee: "Evening illumination, life-sized Krishna leela scenes",
    category: "ras-lila",
    image: "/sites/prem-mandir.jpg",
  },
  {
    id: "iskcon",
    name: "ISKCON Temple",
    sanskritName: "श्री कृष्ण बलराम मंदिर",
    location: "Vrindavan",
    significance: "International Society for Krishna Consciousness temple — one of the most beautiful ISKCON temples in the world.",
    bestTime: "Mangala aarti (4:30 AM) or Sandhya aarti (7 PM)",
    mustSee: "Krishna-Balaram deities, samadhi of Srila Prabhupada",
    category: "ras-lila",
    image: "/sites/iskcon.jpg",
  },
  {
    id: "radha-rani",
    name: "Radha Rani Temple (Shriji)",
    sanskritName: "श्री राधा रानी मंदिर",
    location: "Barsana",
    significance: "The only temple where Radha is worshipped as the presiding deity — Her divine abode.",
    bestTime: "Radhashtami (Sept), Holi (March)",
    mustSee: "Radha-Krishna idols, Maan Mandir nearby",
    category: "radha",
    image: "/sites/radha-rani.jpg",
  },
  {
    id: "govardhan",
    name: "Govardhan Hill",
    sanskritName: "गोवर्धन पहाड़ी",
    location: "Govardhan",
    significance: "The sacred hill lifted by Krishna on His little finger for 7 days to protect Braj from Indra's wrath.",
    bestTime: "Kartik month (Oct-Nov), Govardhan Puja",
    mustSee: "21-km parikrama, Daan Ghati, Haridev Temple",
    category: "govardhan",
    image: "/sites/govardhan.jpg",
  },
  {
    id: "radha-kund",
    name: "Radha Kund & Shyam Kund",
    sanskritName: "राधा कुंड एवं श्याम कुंड",
    location: "Govardhan",
    significance: "The most sacred ponds in Braj — created by Radha and Krishna respectively. Bathing here on Ahoi Ashtami is highly auspicious.",
    bestTime: "Kartik month, Ahoi Ashtami",
    mustSee: "Both kunds, evening deep-daan",
    category: "govardhan",
    image: "/sites/radha-kund.jpg",
  },
  {
    id: "nand-bhavan",
    name: "Nand Bhavan",
    sanskritName: "नंद भवन",
    location: "Nandgaon",
    significance: "The childhood home of Krishna where Nanda Maharaj raised Him. The hilltop temple offers panoramic views of Braj.",
    bestTime: "Year-round; Bhado month special",
    mustSee: "Nand Bhavan, Pan Sarovar, Charan Pahadi",
    category: "childhood",
    image: "/sites/nand-bhavan.jpg",
  },
  {
    id: "gokulnath",
    name: "Gokulnath Temple",
    sanskritName: "गोकुलनाथ मंदिर",
    location: "Gokul",
    significance: "Where Krishna was secretly brought by Vasudev across the Yamuna, and raised by Yashoda Maiya.",
    bestTime: "Gokul Ashtami (Janmashtami)",
    mustSee: "Raman Reti (sacred sand where Krishna played), Brahmand Ghat",
    category: "childhood",
    image: "/sites/gokulnath.jpg",
  },
  {
    id: "vishram-ghat",
    name: "Vishram Ghat",
    sanskritName: "विश्राम घाट",
    location: "Mathura",
    significance: "The most important of Mathura's 25 ghats — where Krishna rested after slaying Kansa. Boat rides here are a must at dawn.",
    bestTime: "Dawn (5-7 AM) for boat ride & morning aarti",
    mustSee: "Yamuna aarti at sunrise, boat ride past all 25 ghats",
    category: "ghat",
    image: "/sites/vishram-ghat.jpg",
  },
  {
    id: "seva-kunj",
    name: "Seva Kunj & Nidhuban",
    sanskritName: "सेवा कुंज एवं निधुवन",
    location: "Vrindavan",
    significance: "The sacred grove where Krishna performs the Maha-Ras every night with Radha and the Gopis. No one stays here after dusk.",
    bestTime: "Daytime visits; evening aarti at entrance",
    mustSee: "Seva Kunj temple, Lakshmi's visit legend",
    category: "ras-lila",
    image: "/sites/seva-kunj.jpg",
  },
  {
    id: "barsana-maan",
    name: "Maan Mandir",
    sanskritName: "मान मंदिर",
    location: "Barsana",
    significance: "The hilltop spot where Radha Rani would go in 'maan' (divine loving anger) and Krishna would come to pacify Her.",
    bestTime: "Sunset for panoramic views",
    mustSee: "Sunset point, Bhajan kutir of Hit Harivansh",
    category: "radha",
    image: "/sites/maan-mandir.jpg",
  },
];

// ============================================================================
//  AUSPICIOUS YATRA DATES — festival calendar
// ============================================================================

export type AuspiciousDate = {
  id: string;
  festival: string;
  sanskritName?: string;
  month: string;
  monthCode: string;
  significance: string;
  bestYatra: string;
  recommendedPackage: string;
};

export const auspiciousDates: AuspiciousDate[] = [
  {
    id: "janmashtami",
    festival: "Krishna Janmashtami",
    sanskritName: "कृष्ण जन्माष्टमी",
    month: "August / September",
    monthCode: "Bhadrapad",
    significance: "The divine appearance day of Lord Krishna — midnight celebrations at Krishna Janmabhoomi, Mathura.",
    bestYatra: "Mathura & Vrindavan",
    recommendedPackage: "3-Day Complete Braj Mandala",
  },
  {
    id: "radhashtami",
    festival: "Radhashtami",
    sanskritName: "राधाष्टमी",
    month: "September",
    monthCode: "Bhadrapad",
    significance: "Appearance day of Radha Rani — the most auspicious day to visit Barsana, Her eternal abode.",
    bestYatra: "Barsana & Nandgaon",
    recommendedPackage: "Barsana & Nandgaon Yatra",
  },
  {
    id: "holi",
    festival: "Braj Holi (Lathmar Holi)",
    sanskritName: "ब्रज होली",
    month: "March",
    monthCode: "Phalguna",
    significance: "The world-famous Lathmar Holi of Barsana & Nandgaon — Radha playfully hits Krishna with sticks.",
    bestYatra: "Barsana, Nandgaon, Vrindavan",
    recommendedPackage: "2-Day Braj Circuit",
  },
  {
    id: "sharad-purnima",
    festival: "Sharad Purnima (Ras Purnima)",
    sanskritName: "शरद पूर्णिमा",
    month: "October",
    monthCode: "Ashwin",
    significance: "The night Krishna performed the Maha-Ras with Radha and the Gopis in Vrindavan's forests.",
    bestYatra: "Vrindavan",
    recommendedPackage: "Same Day Braj Yatra",
  },
  {
    id: "kartik-purnima",
    festival: "Kartik Purnima & Govardhan Puja",
    sanskritName: "कार्तिक पूर्णिमा",
    month: "November",
    monthCode: "Kartik",
    significance: "The culmination of the holy Kartik month — most auspicious for Govardhan Parikrama and deep-daan at Radha Kund.",
    bestYatra: "Govardhan & Radha Kund",
    recommendedPackage: "Govardhan Parikrama Special",
  },
  {
    id: "nand-utsav",
    festival: "Nand Utsav",
    sanskritName: "नंद उत्सव",
    month: "September (day after Janmashtami)",
    monthCode: "Bhadrapad",
    significance: "The celebration in Nandgaon of Krishna's arrival — a joyous festival marking the end of Janmashtami festivities.",
    bestYatra: "Nandgaon & Gokul",
    recommendedPackage: "Custom Braj Itinerary",
  },
];

// ============================================================================
//  POPULAR ROUTES — Braj pilgrimage routes
// ============================================================================

export type Route = {
  from: string;
  to: string;
  approxKm: number;
  fromPrice: number;
  popularFor: string;
};

export const popularRoutes: Route[] = [
  { from: "Delhi", to: "Mathura", approxKm: 180, fromPrice: 2800, popularFor: "Krishna Janmabhoomi darshan" },
  { from: "Delhi", to: "Vrindavan", approxKm: 200, fromPrice: 3000, popularFor: "Banke Bihari darshan" },
  { from: "Mathura", to: "Vrindavan", approxKm: 15, fromPrice: 1200, popularFor: "Same-day temple circuit" },
  { from: "Mathura", to: "Gokul", approxKm: 10, fromPrice: 1000, popularFor: "Krishna's childhood sites" },
  { from: "Vrindavan", to: "Govardhan", approxKm: 25, fromPrice: 1800, popularFor: "Parikrama & Radha Kund" },
  { from: "Vrindavan", to: "Barsana", approxKm: 45, fromPrice: 2500, popularFor: "Radha Rani temple" },
  { from: "Barsana", to: "Nandgaon", approxKm: 10, fromPrice: 900, popularFor: "Nanda Maharaj's village" },
  { from: "Mathura", to: "Govardhan", approxKm: 25, fromPrice: 1800, popularFor: "21-km parikrama" },
  { from: "Govardhan", to: "Radha Kund", approxKm: 5, fromPrice: 700, popularFor: "Sacred ponds darshan" },
  { from: "Delhi", to: "Barsana", approxKm: 220, fromPrice: 3500, popularFor: "Lathmar Holi & Radhashtami" },
  { from: "Agra", to: "Mathura", approxKm: 60, fromPrice: 1500, popularFor: "Taj + Krishna combo yatra" },
  { from: "Delhi Airport", to: "Braj Circuit", approxKm: 180, fromPrice: 3200, popularFor: "Direct airport transfer" },
  { from: "Mathura", to: "Nandgaon", approxKm: 50, fromPrice: 2600, popularFor: "Nand Bhavan darshan" },
  { from: "Vrindavan", to: "Gokul", approxKm: 20, fromPrice: 1500, popularFor: "Raman Reti visit" },
  { from: "Jaipur", to: "Mathura", approxKm: 280, fromPrice: 4000, popularFor: "Rajasthan devotees" },
  { from: "Lucknow", to: "Mathura", approxKm: 360, fromPrice: 5200, popularFor: "UP devotee groups" },
];

// ============================================================================
//  TESTIMONIALS — pilgrimage reviews
// ============================================================================

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
    text: "Booked the 3-Day Complete Braj Mandala for our family of 6. The driver knew every temple's timing and guided us to the best darshan spots. Evening aarti at Kesi Ghat was the highlight. Felt truly blessed.",
    trip: "3-Day Complete Braj Mandala",
  },
  {
    name: "Sneha Patel",
    location: "Mumbai",
    rating: 5,
    text: "Same Day Braj Yatra was perfectly organized. Started with the dawn boat ride at Vishram Ghat, then Banke Bihari, Prem Mandir and ISKCON. The driver-cum-guide was knowledgeable about every leela. Highly recommended.",
    trip: "Same Day Braj Yatra",
  },
  {
    name: "Anil Agrawal",
    location: "Jaipur",
    rating: 5,
    text: "Took my elderly parents for Govardhan Parikrama in Kartik month. The team arranged everything — cab, guide for the parikrama route, even packed prasad. Radha Kund deep-daan at sunset was divine.",
    trip: "Govardhan Parikrama Special",
  },
  {
    name: "Pooja Sharma",
    location: "Mathura",
    rating: 5,
    text: "As locals, we thought we knew Braj — but the 2-day package showed us Mahavan and Nandgaon spots we had never visited. Driver was respectful, vegetarian, and knew the local pandits. Will book for Janmashtami again.",
    trip: "2-Day Braj Circuit",
  },
  {
    name: "Mohammed Faisal",
    location: "Hyderabad",
    rating: 5,
    text: "Booked an Innova for airport pickup to Vrindavan at 4 AM. Driver was on time, the cab was spotless, and he took us straight to mangala aarti at ISKCON. Smooth experience from start to finish.",
    trip: "Airport Transfer → Vrindavan",
  },
  {
    name: "Anjali Desai",
    location: "Ahmedabad",
    rating: 5,
    text: "Custom Braj Itinerary for our bhajan mandali of 18 people. Tempo Traveller was perfect, the team arranged a local Braj pandit for sankalp at all major temples, and we even attended a special evening kirtan. Jai Shri Krishna!",
    trip: "Custom Braj Itinerary",
  },
];

// ============================================================================
//  FAQ — pilgrimage-specific questions
// ============================================================================

export type FaqCategory = "booking" | "yatra" | "rituals" | "logistics";

export type FaqItem = {
  q: string;
  a: string;
  category: FaqCategory;
};

export const faqs: FaqItem[] = [
  {
    q: "What is Braj Yatra and what places does it cover?",
    a: "Braj Yatra (Brij Yatra) is the sacred pilgrimage circuit through the Braj Mandala — the holy land where Lord Krishna appeared 5,000 years ago. It covers Mathura (birthplace), Vrindavan (childhood pastimes), Gokul (infancy), Mahavan, Barsana (Radha's village), Nandgaon (Nanda's village), Govardhan (the hill Krishna lifted), Radha Kund, and the complete 84-kosa (about 300 km) Braj circuit.",
    category: "yatra",
  },
  {
    q: "How do I book a Braj Yatra package?",
    a: "Three ways: (1) Fill the booking form on this website and we'll call you back within 15 minutes, (2) WhatsApp us with your preferred dates, package, and group size, or (3) Call us directly. We confirm every booking personally and share the driver's details, vehicle number, and itinerary 12 hours before your yatra.",
    category: "booking",
  },
  {
    q: "Which is the best time to do Braj Yatra?",
    a: "Braj is sacred year-round, but the most auspicious times are: Kartik month (Oct-Nov) for Govardhan Parikrama, Janmashtami (Aug-Sept) for Mathura, Radhashtami (Sept) for Barsana, Holi (March) for Lathmar Holi celebrations, and Sharad Purnima (Oct) for the Ras Lila in Vrindavan. Avoid peak summer (May-June) when temperatures cross 45°C.",
    category: "yatra",
  },
  {
    q: "Can you arrange a local Braj pandit for sankalp and special pujas?",
    a: "Yes. We have a network of trusted local Braj pandits who can perform sankalp at Vishram Ghat, abhishek at Krishna Janmabhoomi, special aartis, name-giving ceremonies, and annaprashan. Mention this requirement in the notes when booking, and we'll arrange it at actual cost (no commission).",
    category: "rituals",
  },
  {
    q: "Are your drivers vegetarian and familiar with temple protocols?",
    a: "Yes — every driver in our Braj fleet is vegetarian, teetotaler, and respectful of temple traditions. They know the darshan timings, dress codes (men remove shirts at Banke Bihari), photography restrictions, and the local Pandits at each temple. Most can also recite key Krishna bhajans and narrate the leelas of each site.",
    category: "logistics",
  },
  {
    q: "What is included in the yatra package price?",
    a: "All packages include AC cab, driver-cum-guide, fuel, toll, parking, and all temple visits. Multi-day packages also include accommodation at a clean Dharamshala or hotel (your choice). Govardhan Parikrama packages include a guide for the 21-km walk. Not included: personal donations, prasad purchases, meals (we recommend pure-veg Braj restaurants), and optional paid VIP darshan.",
    category: "booking",
  },
  {
    q: "How is Govardhan Parikrama done — by walking or vehicle?",
    a: "Traditionally, the 21-km Govardhan Parikrama is done on foot as a mark of devotion, taking 6-8 hours. Elderly devotees or those with time constraints can do it by vehicle. We drop you at Mansi Ganga (the starting point), provide a guide if walking, and the cab meets you at specified stops. Some devotees also do 'dandavat parikrama' — we can facilitate this with prior notice.",
    category: "rituals",
  },
  {
    q: "Can you customize a yatra for our specific sankalp or group?",
    a: "Absolutely. Whether you want to do only Radha Kund deep-daan, perform abhishek for a birthday, visit specific Nitya-Vihari temples, or take a satsang group of 40+ devotees — we craft custom itineraries. Share your sankalp, dates, and group size via WhatsApp or the booking form, and we'll share a tailored quote within 4 hours.",
    category: "booking",
  },
];

export const faqCategories: { key: FaqCategory | "all"; label: string }[] = [
  { key: "all", label: "All Questions" },
  { key: "booking", label: "Booking & Pricing" },
  { key: "yatra", label: "About Braj Yatra" },
  { key: "rituals", label: "Rituals & Pujas" },
  { key: "logistics", label: "Logistics & Fleet" },
];

// ============================================================================
//  WHY CHOOSE US — pilgrimage-specific USPs
// ============================================================================

export const whyChooseUs = [
  {
    title: "Braj-Born Pilgrimage Specialists",
    description:
      "We are not a generic cab company — we are Braj-born locals who have spent 10+ years guiding devotees through every sacred site of the Braj Mandala. We know the leela behind each temple.",
    icon: "sparkles",
  },
  {
    title: "Verified Vegetarian Drivers",
    description:
      "Every driver is vegetarian, teetotaler, and respectful of temple traditions. They know darshan timings, dress codes, and the local pandits at each temple — treating devotees as their own family.",
    icon: "shield-check",
  },
  {
    title: "Local Pandit Network",
    description:
      "Need a sankalp at Vishram Ghat, abhishek at Krishna Janmabhoomi, or a special aarti? We arrange trusted local Braj pandits at actual cost — no commissions, no tourist traps.",
    icon: "hand-platter",
  },
  {
    title: "24x7 — Braj Never Sleeps",
    description:
      "Mangala aarti at 4 AM, midnight Janmashtami darshan, evening Kesi Ghat aarti — we operate round the clock, 365 days a year. Braj's rhythm sets our schedule.",
    icon: "clock",
  },
  {
    title: "Sanitized, AC Cabs",
    description:
      "Every vehicle is deep-cleaned before your yatra, with working AC and first-aid. We carry Yamuna water, fresh flowers, and prasad thalis on request for en-route temple visits.",
    icon: "sparkles",
  },
  {
    title: "Transparent, All-Inclusive Pricing",
    description:
      "What we quote is what you pay — cab, driver, fuel, toll, parking, and all temple visits included. No hidden charges, no tourist-shop commissions, no detours to overpriced stores.",
    icon: "receipt",
  },
];

// ============================================================================
//  ABOUT — Braj specialist story
// ============================================================================

export const aboutPoints = [
  {
    heading: "Our Story",
    body:
      "Sri Shyama Tour & Travels was founded in 2015 in Mathura — the heart of Braj — with a single sedan and a devotee's love for sharing the sacred land of Krishna. Our founder, born and raised in Vrindavan, saw that pilgrims often struggled with unreliable transport and guides who didn't understand the spiritual significance of each site. Over 10 years, we have served 25,000+ devotees and grown into Braj's most trusted yatra partner.",
  },
  {
    heading: "Our Mission",
    body:
      "To make the sacred Braj Yatra accessible, authentic, and deeply spiritual for every devotee who visits Krishna's land. We combine the warmth of a Braj-vasi family with the discipline of a professional pilgrimage operator. Every yatra — whether a same-day Mathura darshan or a 3-day Braj Mandala circuit — is treated as our own sacred sankalp.",
  },
  {
    heading: "Why Devotees Trust Us",
    body:
      "We answer our phone at 3 AM. We know which temple has which aarti at what time. We arrange pandits without commission. Our drivers are vegetarian and treat every devotee as a guest of Krishna. That is why 25,000+ pilgrims have chosen us to walk them through Krishna's Braj — and why they call us again every Janmashtami.",
  },
];

// ============================================================================
//  HOW IT WORKS — yatra booking process
// ============================================================================

export const yatraSteps = [
  {
    title: "Share Your Sankalp",
    description:
      "Tell us your preferred yatra dates, package, group size, and any special requirements (pandit, abhishek, sankalp) via the form, WhatsApp, or call.",
  },
  {
    title: "We Plan Your Yatra",
    description:
      "Within 4 hours, we share a detailed itinerary, vehicle options, and a transparent quote — tailored to your sankalp and the auspicious timings of each temple.",
  },
  {
    title: "Confirm & Begin",
    description:
      "Confirm with a 25% advance. We share driver details, vehicle number, and the local guide's contact 12 hours before. Your yatra begins with our driver's warm 'Radhe Radhe'.",
  },
  {
    title: "Sacred Braj Experience",
    description:
      "Walk through Krishna's leelas with a Braj-vasi guide. We handle every detail — temple timings, parikrama support, pandit coordination — so you focus only on darshan.",
  },
];
