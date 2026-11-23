"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageStore } from "@/lib/page-store";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image?: string;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Spiritual Significance of Braj Mandala",
    excerpt:
      "Discover why the 84-kosa Braj circuit is considered the most sacred pilgrimage in Krishna bhakti — covering Mathura, Vrindavan, Gokul, Govardhan and beyond.",
    category: "Spiritual Guide",
    date: "Nov 15, 2026",
    readTime: "8 min read",
  },
  {
    id: "2",
    title: "Govardhan Parikrama: A Complete Guide",
    excerpt:
      "Everything you need to know about the 21-km Govardhan Parikrama — when to go, what to carry, the route, and the spiritual significance of each stop.",
    category: "Pilgrimage Guide",
    date: "Nov 10, 2026",
    readTime: "12 min read",
  },
  {
    id: "3",
    title: "Janmashtami in Mathura: A Devotee's Experience",
    excerpt:
      "Midnight celebrations at Krishna Janmabhoomi, the atmosphere, the crowds, and why Janmashtami is the most auspicious time to visit Braj.",
    category: "Festival Special",
    date: "Nov 5, 2026",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Banke Bihari Temple: The Living Deity of Vrindavan",
    excerpt:
      "The history, the tribhanga form, the unique darshan tradition, and why Banke Bihari is the most beloved deity in all of Braj.",
    category: "Temple Guide",
    date: "Oct 28, 2026",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Lathmar Holi of Barsana: The Divine Play",
    excerpt:
      "The world-famous Lathmar Holi where Radha playfully hits Krishna with sticks — the legends, the celebration, and how to experience it.",
    category: "Festival Special",
    date: "Oct 20, 2026",
    readTime: "9 min read",
  },
  {
    id: "6",
    title: "Best Time to Visit Braj: A Seasonal Guide",
    excerpt:
      "When is the best time for Braj Yatra? Compare the spiritual significance, weather, and crowd levels across different seasons.",
    category: "Travel Tips",
    date: "Oct 15, 2026",
    readTime: "5 min read",
  },
];

const categories = ["All", "Spiritual Guide", "Pilgrimage Guide", "Festival Special", "Temple Guide", "Travel Tips"];

export function BlogsPage() {
  const navigate = usePageStore((s) => s.navigate);

  return (
    <div className="pt-8 pb-16 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Badge variant="secondary" className="mb-3">
            <BookOpen className="w-3 h-3 mr-1" /> Blog
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
            <Badge
              key={cat}
              variant="outline"
              className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Tag className="w-3 h-3 mr-1" /> {cat}
            </Badge>
          ))}
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer overflow-hidden">
                {/* Blog image placeholder */}
                <div className="h-40 bg-braj-gradient relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-gold/30">
                    <BookOpen className="w-16 h-16" />
                  </div>
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
                    className="w-full gap-1 text-primary hover:text-primary"
                    onClick={() => navigate("contact")}
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
