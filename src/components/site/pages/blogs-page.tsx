"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePageStore } from "@/lib/page-store";
import { staticBlogPosts, type StaticBlogPost } from "@/lib/blog-data";

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

// Convert static posts to the BlogPost format
const staticPostsAsBlogPosts: BlogPost[] = staticBlogPosts.map((p) => ({
  ...p,
  fullContent: p.fullContent,
}));

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
              image: p.image || `/blog/blog-${((parseInt(p.id.slice(-2), 36) % 6) + 1)}.jpg`,
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

  // Merge API posts with static posts (API posts first)
  const allPosts = [...apiPosts, ...staticPostsAsBlogPosts];

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
