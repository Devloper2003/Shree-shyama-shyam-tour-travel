/**
 * ============================================================================
 *  STATIC BLOG POSTS — Built-in blog posts that always appear on the website
 *  and in the admin panel (read-only, cannot be deleted).
 *
 *  To add a new built-in blog post, add an entry to this array.
 *  The admin panel can also create dynamic posts (stored in the database)
 *  which appear alongside these.
 * ============================================================================
 */

export type StaticBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  fullContent: string;
};

export const staticBlogPosts: StaticBlogPost[] = [
  {
    id: "static-1",
    title: "The Spiritual Significance of Braj Mandala",
    excerpt:
      "Discover why the 84-kosa Braj circuit is considered the most sacred pilgrimage in Krishna bhakti — covering Mathura, Vrindavan, Gokul, Govardhan and beyond.",
    category: "Spiritual Guide",
    date: "Nov 15, 2026",
    readTime: "8 min read",
    image: "/blog/blog-1.jpg",
    fullContent: `The Braj Mandala, spanning approximately 300 kilometers (84 kosa), is the sacred land where Lord Krishna appeared over 5,000 years ago. This region, centered around Mathura-Vrindavan, holds unparalleled spiritual significance in Hindu tradition.

## The Sacred Geography

Braj is not just a physical location — it is a spiritual realm where every hill, river, pond, and grove is connected to a specific leela (divine pastime) of Krishna. The 12 main sites of Braj are:

1. **Mathura** — Krishna's birthplace, where He appeared in the prison cell of Kansa
2. **Vrindavan** — The sacred forests where Krishna spent His childhood
3. **Gokul** — Where Yashoda Maiya raised baby Krishna
4. **Govardhan** — The hill Krishna lifted on His little finger for 7 days
5. **Barsana** — Radha Rani's eternal abode
6. **Nandgaon** — Nanda Maharaj's village
7. **Radha Kund** — The most sacred pond in all of Braj

## The 84-Kosa Parikrama

Devotees traditionally complete the 84-kosa Braj parikrama over 40 days on foot. This sacred circumambulation covers all the major sites and is believed to grant immense spiritual merit.

## Spiritual Benefits

Completing the Braj Yatra is said to cleanse one's heart of material desires, awaken pure love of God (prema bhakti), and grant darshan of Radha-Krishna in one's heart.

At Sri Shyama Tour & Travels, we facilitate this sacred journey with experienced Braj-born guides who know every site's significance and history.`,
  },
  {
    id: "static-2",
    title: "Govardhan Parikrama: A Complete Guide",
    excerpt:
      "Everything you need to know about the 21-km Govardhan Parikrama — when to go, what to carry, the route, and the spiritual significance of each stop.",
    category: "Pilgrimage Guide",
    date: "Nov 10, 2026",
    readTime: "12 min read",
    image: "/blog/blog-2.jpg",
    fullContent: `The Govardhan Parikrama is one of the most sacred pilgrimages in Braj. The 21-kilometer circumambulation of Govardhan Hill commemorates the day Lord Krishna lifted the entire hill on His little finger to protect the residents of Braj from Indra's devastating rains.

## When to Go

The most auspicious time for Govardhan Parikrama is during Kartik month (October-November), especially on Govardhan Puja day.

## The Route

The parikrama starts and ends at Mansi Ganga. Key stops include Daan Ghati, Haridev Temple, Radha Kund & Shyam Kund, and Kusum Sarovar.

## What to Carry

- Comfortable walking shoes
- Water bottle
- Sun protection
- Light snacks
- Small bag for prasad

Walking the full 21 km takes about 6-8 hours at a moderate pace. For elderly devotees, vehicle parikrama is also available.

At Sri Shyama Tour & Travels, we provide experienced guides for the parikrama route.`,
  },
  {
    id: "static-3",
    title: "Janmashtami in Mathura: A Devotee's Experience",
    excerpt:
      "Midnight celebrations at Krishna Janmabhoomi, the atmosphere, the crowds, and why Janmashtami is the most auspicious time to visit Braj.",
    category: "Festival Special",
    date: "Nov 5, 2026",
    readTime: "6 min read",
    image: "/blog/blog-3.jpg",
    fullContent: `Janmashtami — the appearance day of Lord Krishna — is the most grand and spiritually charged festival in all of Braj.

## Midnight at Krishna Janmabhoomi

The centerpiece of Janmashtami in Mathura is the midnight darshan at Krishna Janmabhoomi — the exact location where Krishna appeared. At precisely midnight, the deity is revealed in a special shringar.

## The Atmosphere

Days before Janmashtami, Mathura and Vrindavan come alive with rasleela performances, jhanki displays, decorated temples, and devotional music.

## Tips for Devotees

- Arrive early — temples are extremely crowded
- Book accommodation in advance
- Use a local guide
- Dress traditionally

We offer a special Janmashtami yatra package with AC cab, driver-cum-guide, and guaranteed darshan arrangements.`,
  },
  {
    id: "static-4",
    title: "Banke Bihari Temple: The Living Deity of Vrindavan",
    excerpt:
      "The history, the tribhanga form, the unique darshan tradition, and why Banke Bihari is the most beloved deity in all of Braj.",
    category: "Temple Guide",
    date: "Oct 28, 2026",
    readTime: "7 min read",
    image: "/blog/blog-4.jpg",
    fullContent: `Banke Bihari Temple in Vrindavan is one of the most revered temples in all of India, housing the self-manifested deity of Lord Krishna in His enchanting tribhanga form.

## The Name

"Banke" means bent in three places, and "Bihari" means enjoyer. The deity is in a tribhanga pose — bent at the knees, waist, and neck.

## Unique Darshan Tradition

The deity is hidden behind a curtain that is drawn every few minutes. There is no early morning mangala aarti. Shringar darshan is in the morning, and evening aarti is a grand affair.

## Temple Timings

- Morning darshan: 7:45 AM - 12:00 PM
- Afternoon: Temple closed
- Evening darshan: 5:30 PM - 9:30 PM

Our drivers know the exact darshan timings and can plan your visit for the best experience.`,
  },
  {
    id: "static-5",
    title: "Lathmar Holi of Barsana: The Divine Play",
    excerpt:
      "The world-famous Lathmar Holi where Radha playfully hits Krishna with sticks — the legends, the celebration, and how to experience it.",
    category: "Festival Special",
    date: "Oct 20, 2026",
    readTime: "9 min read",
    image: "/blog/blog-5.jpg",
    fullContent: `Lathmar Holi — the "Holi of Sticks" — is perhaps the most unique and colorful celebration in all of India. Held in Barsana and Nandgaon, this playful reenactment of divine love draws thousands of visitors.

## The Legend

Krishna visited Barsana to tease Radha and Her friends. In response, the women of Barsana chased Krishna and His friends away with sticks.

## How to Experience

- Arrive early
- Wear old clothes
- Protect your camera
- Stay with your group
- Respect traditions

We offer a special Lathmar Holi Yatra Package with AC cab, driver, accommodation, and natural colors.`,
  },
  {
    id: "static-6",
    title: "Best Time to Visit Braj: A Seasonal Guide",
    excerpt:
      "When is the best time for Braj Yatra? Compare the spiritual significance, weather, and crowd levels across different seasons.",
    category: "Travel Tips",
    date: "Oct 15, 2026",
    readTime: "5 min read",
    image: "/blog/blog-6.jpg",
    fullContent: `Planning your Braj Yatra at the right time can make a huge difference in your pilgrimage experience.

## Winter (October - March) — BEST TIME

Temperature: 8°C - 25°C. Ideal for all activities. Key festivals: Kartik Purnima, Govardhan Puja, Sharad Purnima, Holi.

## Summer (April - June) — AVOID

Temperature: 35°C - 47°C. Extremely hot, not recommended.

## Monsoon (July - September) — MODERATE

Temperature: 28°C - 38°C. Key festival: Janmashtami.

## Recommendation

Best months: October-November (Kartik), February-March (pre-Holi), August-September (Janmashtami).

Book at least 2-3 months in advance for festival periods.`,
  },
];
