"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageStore } from "@/lib/page-store";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  date: string;
  readTime: string;
  image: string;
  fullContent?: string;
};

// Static blog posts (always available on the site)
const staticBlogPosts: BlogPost[] = [
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

Devotees traditionally complete the 84-kosa Braj parikrama over 40 days on foot. This sacred circumambulation covers all the major sites and is believed to grant immense spiritual merit. The parikrama route passes through forests, villages, and along the Yamuna River, allowing pilgrims to walk in Krishna's footsteps.

## Spiritual Benefits

Completing the Braj Yatra is said to:
- Cleanse one's heart of material desires
- Awaken pure love of God (prema bhakti)
- Grant darshan of Radha-Krishna in one's heart
- Remove the cycle of birth and death

At Shri Shyama Shyam Tour & Travels, we facilitate this sacred journey with experienced Braj-born guides who know every site's significance and history.`,
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

The most auspicious time for Govardhan Parikrama is during **Kartik month** (October-November), especially on **Govardhan Puja** day (the day after Diwali). However, devotees perform the parikrama year-round.

## The Route

The parikrama starts and ends at **Mansi Ganga**, a sacredkund in the center of Govardhan town. The 21-km route passes through:

1. **Mansi Ganga** — The starting point, a sacred pond created by Krishna
2. **Daan Ghati** — Where Krishna stopped the cowherd men from offering to Indra
3. **Haridev Temple** — An ancient temple dedicated to Lord Hari
4. **Radha Kund & Shyam Kund** — The most sacred ponds in Braj
5. **Kusum Sarovar** — Where Radha would pick flowers
6. **Back to Mansi Ganga** — Completing the circuit

## What to Carry

- Comfortable walking shoes (or go barefoot for traditional parikrama)
- Water bottle (there are also many water stations along the route)
- Sun protection (hat, sunscreen) for summer
- Light snacks or fruits for energy
- A small bag for prasad and offerings

## How Long It Takes

Walking the full 21 km takes about **6-8 hours** at a moderate pace. Some devotees do it in less time, while others take a full day, stopping at temples and kunds along the way.

## Dandavat Parikrama

For the most dedicated devotees, there is **dandavat parikrama** — offering full prostrations (dandavat pranams) at every step. This can take weeks to complete the full 21 km. We can facilitate this with prior notice.

## Vehicle Parikrama

For elderly devotees or those unable to walk, the parikrama can be done by vehicle. Our cabs drop you at Mansi Ganga, and you can drive around the hill, stopping at the major sites.

At Shri Shyama Shyam Tour & Travels, we provide experienced guides for the parikrama route, ensuring you don't miss any sacred spot.`,
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
    fullContent: `Janmashtami — the appearance day of Lord Krishna — is the most grand and spiritually charged festival in all of Braj. Celebrated in August-September (Bhadrapad month), the entire Braj Mandala transforms into a realm of divine celebration.

## Midnight at Krishna Janmabhoomi

The centerpiece of Janmashtami in Mathura is the **midnight darshan** at Krishna Janmabhoomi — the exact location where Krishna appeared. At precisely midnight, the deity is revealed in a special shringar (decoration), and the temple erupts with ecstatic kirtan, bell ringing, and the chanting of "Hare Krishna Hare Krishna Krishna Krishna Hare Hare."

## The Atmosphere

Days before Janmashtami, Mathura and Vrindavan come alive with:
- **Rasleela performances** — dramatic enactments of Krishna's pastimes
- **Jhanki displays** — tableaux depicting scenes from Krishna's life
- **Decorated temples** — every temple is adorned with flowers and lights
- **Devotional music** — kirtan and bhajan echo through every street
- **Fasting devotees** — many observe nirjala (waterless) fast until midnight

## Where to Go

1. **Krishna Janmabhoomi (Mathura)** — The birthplace, midnight celebration
2. **Banke Bihari Temple (Vrindavan)** — Special shringar darshan
3. **ISKCON Temple (Vrindavan)** — Grand abhishek and kirtan
4. **Dwarkadhish Temple (Mathura)** — Evening aarti and celebrations

## Tips for Devotees

- **Arrive early** — Temples are extremely crowded, arrive hours before midnight
- **Book accommodation in advance** — Hotels and dharamshalas fill up weeks ahead
- **Use a local guide** — Navigating the crowds is easier with someone who knows the area
- **Dress traditionally** — Devotees are expected to wear modest, traditional clothing

## Our Janmashtami Package

We offer a special Janmashtami yatra package that includes:
- AC cab for the full day and night
- Driver-cum-guide who knows temple timings
- Guaranteed darshan arrangements
- Accommodation near the temples

Book your Janmashtami yatra early — it's our most requested package!`,
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
    fullContent: `Banke Bihari Temple in Vrindavan is one of the most revered temples in all of India, housing the self-manifested deity of Lord Krishna in His enchanting tribhanga (three-fold bent) form.

## The Name

"Banke" means bent in three places, and "Bihari" means enjoyer. The deity of Krishna is in a tribhanga pose — bent at the knees, waist, and neck — holding a flute, representing Krishna in His most enchanting form.

## The History

The deity was originally worshipped by **Swami Haridas** in Nidhuban, Vrindavan. It is believed that the deity self-manifested from a sacred hill of earth. Later, the deity was moved to the current temple, which was built in 1864.

## Unique Darshan Tradition

Banke Bihari Temple has several unique traditions:
- **The curtain** — The deity is hidden behind a curtain that is drawn every few minutes. This is because it's believed that if one looks at Banke Bihari too long, He will become shy and run away.
- **No mangala aarti** — Unlike most temples, there is no early morning mangala aarti at Banke Bihari, as the Lord is said to not like to be woken up early.
- **Shringar darshan** — In the morning, the deity is decorated with special shringar (ornaments and clothing)
- **Evening aarti** — The evening aarti is a grand affair with hundreds of devotees

## Temple Timings

- **Morning darshan**: 7:45 AM - 12:00 PM
- **Afternoon**: Temple closed (12:00 PM - 5:30 PM)
- **Evening darshan**: 5:30 PM - 9:30 PM (varies by season)

## Tips for Visitors

- **Best time**: Morning shringar darshan (around 8 AM) or evening aarti
- **Dress code**: Traditional clothing; men may need to remove shirts inside the sanctum
- **Photography**: Strictly prohibited inside the temple
- **Avoid crowds**: Visit on weekdays; weekends and festivals are extremely crowded

## Nearby Attractions

- **Seva Kunj & Nidhuban** — The sacred grove where the deity originally appeared
- **Imli Tal** — Where Krishna sat waiting for Radha
- **Radha Vallabh Temple** — Another important temple nearby

At Shri Shyama Shyam Tour & Travels, our drivers know the exact darshan timings and can plan your visit for the best experience.`,
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
    fullContent: `Lathmar Holi — the "Holi of Sticks" — is perhaps the most unique and colorful celebration in all of India. Held in Barsana (Radha's village) and Nandgaon (Krishna's village), this playful reenactment of divine love draws thousands of visitors from around the world.

## The Legend

According to tradition, Krishna visited Barsana to tease Radha and Her friends (gopis) on Holi. In response, the women of Barsana chased Krishna and His friends away with sticks (lathis). This divine play is reenacted every year with great fervor.

## When It Happens

Lathmar Holi is celebrated a few days before the main Holi festival (usually in March):
1. **Barsana Holi** — Men from Nandgaon visit Barsana, and women playfully hit them with sticks
2. **Nandgaon Holi** — The next day, women from Barsana visit Nandgaon for the same playful celebration

## The Celebration

- **Huranga** — After the stick play, colors are thrown in a joyful celebration
- **Songs** — Devotees sing special Holi songs (Rasiya) in Braj bhasha
- **Colors** — Natural colors made from flowers (kesar, palash) are used
- **Temple celebrations** — Special darshan at Radha Rani Temple and Nand Bhavan

## How to Experience Lathmar Holi

1. **Arrive early** — The crowds are massive, arrive by early morning
2. **Wear old clothes** — You will be drenched in colors
3. **Protect your camera** — Colors can damage electronic equipment
4. **Stay with your group** — It's easy to get separated in the crowds
5. **Respect traditions** — This is a sacred celebration, not just a tourist event

## Our Holi Package

We offer a special **Lathmar Holi Yatra Package** that includes:
- AC cab for the full day
- Driver who knows the best viewing spots
- Accommodation in Mathura/Vrindavan
- Natural colors provided
- Guidance on temple customs and etiquette

Book early — Holi is our second most popular festival yatra after Janmashtami!`,
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
    fullContent: `Planning your Braj Yatra at the right time can make a huge difference in your pilgrimage experience. Here's a seasonal guide to help you choose the best time for your spiritual journey.

## Winter (October - March) — BEST TIME

**Temperature:** 8°C - 25°C (pleasant and comfortable)

This is the ideal time for Braj Yatra. The weather is pleasant, making it comfortable to visit temples, walk parikramas, and explore outdoor sites.

**Key festivals during this period:**
- **Kartik Purnima** (October-November) — Most auspicious for Govardhan Parikrama
- **Govardhan Puja** (day after Diwali) — Grand celebrations at Govardhan
- **Sharad Purnima** (October) — Ras Purnima, the night of Maha-Ras
- **Holi** (March) — The world-famous Braj Holi celebrations

**Pros:** Comfortable weather, major festivals, pleasant for walking
**Cons:** Most crowded, especially during festivals

## Summer (April - June) — AVOID

**Temperature:** 35°C - 47°C (extremely hot)

Summer in Braj is extremely hot, with temperatures regularly crossing 45°C. We do not recommend visiting during this period, especially for elderly devotees.

**Pros:** Less crowded, lower prices
**Cons:** Dangerous heat, limited outdoor activity

## Monsoon (July - September) — MODERATE

**Temperature:** 28°C - 38°C (warm but humid)

The monsoon brings some relief from the heat, but the humidity can be uncomfortable. The Yamuna River swells, and some areas may be waterlogged.

**Key festivals:**
- **Janmashtami** (August-September) — Krishna's appearance day

**Pros:** Janmashtami celebrations, cooler than summer
**Cons:** Humidity, possible rain disruptions

## Our Recommendation

For the best overall experience, we recommend visiting during:
1. **October-November** (Kartik month) — Best weather, Govardhan Puja, Sharad Purnima
2. **February-March** (pre-Holi) — Pleasant weather, Holi celebrations approaching
3. **August-September** (Janmashtami) — Only if you specifically want to experience Janmashtami

## Booking Advice

Book your yatra at least 2-3 months in advance for festival periods (Janmashtami, Holi, Kartik Purnima). These are our busiest times and availability fills up fast.

Contact us at **+91 83197 10872** to plan your yatra at the perfect time!`,
  },
];

const categories = ["All", "Spiritual Guide", "Pilgrimage Guide", "Festival Special", "Temple Guide", "Travel Tips"];

export function BlogsPage() {
  const navigate = usePageStore((s) => s.navigate);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [apiPosts, setApiPosts] = useState<BlogPost[]>([]);

  // Fetch blog posts created via admin panel
  useEffect(() => {
    let cancelled = false;
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog-posts");
        const data = await res.json();
        if (cancelled) return;
        if (data.ok && data.posts) {
          // Convert API posts to the BlogPost format
          const converted: BlogPost[] = data.posts
            .filter((p: any) => p.published)
            .map((p: any) => ({
              id: p.id,
              title: p.title,
              excerpt: p.excerpt,
              content: p.content,
              category: p.category || "General",
              date: new Date(p.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }),
              readTime: "5 min read",
              image: `/blog/blog-${((parseInt(p.id, 36) % 6) + 1)}.jpg`, // Assign image based on post ID hash
              fullContent: p.content || p.excerpt,
            }));
          setApiPosts(converted);
        }
      } catch (e) {
        console.error("Failed to fetch blog posts:", e);
      }
    };
    fetchPosts();
    return () => { cancelled = true; };
  }, []);

  // Merge static posts with API posts (API posts first, then static)
  const allPosts = [...apiPosts, ...staticBlogPosts];

  const filteredPosts = selectedCategory === "All"
    ? allPosts
    : allPosts.filter((p) => p.category === selectedCategory);

  // If a post is selected, show the detail view
  if (selectedPost) {
    return (
      <div className="pt-8 pb-16 bg-background min-h-screen">
        {/* Hero image */}
        <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden bg-muted">
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="block w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl mx-auto">
            <Badge className="bg-gold text-accent-foreground mb-3">
              {selectedPost.category}
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-4 mt-3 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {selectedPost.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {selectedPost.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPost(null)}
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Blogs
          </Button>

          <div className="prose prose-sm sm:prose-base max-w-none">
            {selectedPost.fullContent ? (
              <div className="space-y-4">
                {selectedPost.fullContent.split("\n").map((line, i) => {
                  if (line.startsWith("## ")) {
                    return <h2 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.replace("## ", "")}</h2>;
                  } else if (line.startsWith("- ")) {
                    return <li key={i} className="text-sm sm:text-base text-muted-foreground ml-6">{line.replace("- ", "")}</li>;
                  } else if (line.match(/^\d+\./)) {
                    return <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{line}</p>;
                  } else if (line.trim() === "") {
                    return <div key={i} className="h-2" />;
                  } else {
                    return <p key={i} className="text-sm sm:text-base text-muted-foreground leading-relaxed">{line}</p>;
                  }
                })}
              </div>
            ) : (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {selectedPost.excerpt}
              </p>
            )}
          </div>

          {/* Share + CTA */}
          <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Share2 className="w-4 h-4" /> Share this article
            </div>
            <Button onClick={() => navigate("contact")} className="gap-2">
              Book Your Yatra <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </article>
      </div>
    );
  }

  // Blog list view
  return (
    <div className="pt-8 pb-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <BookOpen className="w-4 h-4 mr-1.5" /> Blog
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Braj Yatra Blog & Pilgrimage Guides
          </h1>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Stories, guides, and spiritual insights about Braj Mandala — to help you plan
            your sacred pilgrimage with devotion and knowledge.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
            >
              <Tag className="w-3 h-3" /> {cat}
            </button>
          ))}
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card
                className="h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                {/* Real blog image */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="block w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-gold text-accent-foreground">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full gap-1.5 text-primary hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to embark on your sacred Braj Yatra?
          </p>
          <Button size="lg" onClick={() => navigate("contact")} className="gap-2">
            Book Your Yatra Now <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
