"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePageStore } from "@/lib/page-store";
import { Lock, Plus, Trash2, Edit, Eye, EyeOff, Tag, FileText, LogOut, LockKeyhole } from "lucide-react";

// Simple password — client should change this to a strong password
// In production, use proper auth (NextAuth.js or server-side session)
const ADMIN_PASSWORD = "vithika2026";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  published: boolean;
  createdAt: string;
};

type Offer = {
  id: string;
  title: string;
  description: string;
  discount?: string | null;
  validTill?: string | null;
  active: boolean;
  createdAt: string;
};

export function AdminPage() {
  const navigate = usePageStore((s) => s.navigate);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"blog" | "offers">("blog");

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", content: "", category: "General" });

  // Offer state
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [offerForm, setOfferForm] = useState({ title: "", description: "", discount: "", validTill: "" });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Refresh trigger — increment to re-fetch data from the API
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const refresh = () => setRefreshTrigger((t) => t + 1);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    const fetchData = async () => {
      try {
        const [postsRes, offersRes] = await Promise.all([
          fetch("/api/blog-posts"),
          fetch("/api/offers"),
        ]);
        const postsData = await postsRes.json();
        const offersData = await offersRes.json();
        if (cancelled) return;
        if (postsData.ok) setPosts(postsData.posts);
        if (offersData.ok) setOffers(offersData.offers);
      } catch (e) {
        console.error("Failed to fetch admin data:", e);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [authed, refreshTrigger]);

  const savePost = async () => {
    if (!postForm.title || !postForm.excerpt) return;
    try {
      if (editingPost) {
        await fetch(`/api/blog-posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });
      } else {
        await fetch("/api/blog-posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postForm),
        });
      }
      setPostForm({ title: "", excerpt: "", content: "", category: "General" });
      setEditingPost(null);
      refresh();
    } catch (e) {
      console.error("Failed to save post:", e);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await fetch(`/api/blog-posts/${id}`, { method: "DELETE" });
      refresh();
    } catch (e) {
      console.error("Failed to delete post:", e);
    }
  };

  const togglePostPublished = async (post: BlogPost) => {
    try {
      await fetch(`/api/blog-posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      refresh();
    } catch (e) {
      console.error("Failed to toggle:", e);
    }
  };

  const saveOffer = async () => {
    if (!offerForm.title || !offerForm.description) return;
    try {
      if (editingOffer) {
        await fetch(`/api/offers/${editingOffer.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(offerForm),
        });
      } else {
        await fetch("/api/offers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(offerForm),
        });
      }
      setOfferForm({ title: "", description: "", discount: "", validTill: "" });
      setEditingOffer(null);
      refresh();
    } catch (e) {
      console.error("Failed to save offer:", e);
    }
  };

  const deleteOffer = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
      refresh();
    } catch (e) {
      console.error("Failed to delete offer:", e);
    }
  };

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <LockKeyhole className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter password to manage blog posts and offers
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
            <Button className="w-full" onClick={handleLogin}>
              <Lock className="w-4 h-4 mr-2" /> Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Default password: <code className="bg-muted px-1.5 py-0.5 rounded">vithika2026</code>
              <br />
              (Change this in <code>src/components/site/pages/admin-page.tsx</code>)
            </p>
            <Button variant="ghost" className="w-full" onClick={() => navigate("home")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="pt-8 pb-16 bg-background min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              <Lock className="w-3 h-3 mr-1" /> Admin
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Manage Content</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setAuthed(false); navigate("home"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={tab === "blog" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("blog")}
            className="gap-2"
          >
            <FileText className="w-4 h-4" /> Blog Posts ({posts.length})
          </Button>
          <Button
            variant={tab === "offers" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("offers")}
            className="gap-2"
          >
            <Tag className="w-4 h-4" /> Offers ({offers.length})
          </Button>
        </div>

        {/* Blog Posts Tab */}
        {tab === "blog" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add/Edit form */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {editingPost ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingPost ? "Edit Post" : "Add New Blog Post"}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post-title">Title *</Label>
                  <Input
                    id="post-title"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    placeholder="e.g. The Spiritual Significance of Braj Mandala"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-excerpt">Excerpt *</Label>
                  <Textarea
                    id="post-excerpt"
                    rows={3}
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    placeholder="Short summary shown on the blog page..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-content">Full Content (optional)</Label>
                  <Textarea
                    id="post-content"
                    rows={6}
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="Full blog post content..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-category">Category</Label>
                  <Input
                    id="post-category"
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    placeholder="e.g. Pilgrimage Guide, Festival Special"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={savePost} className="gap-2">
                    {editingPost ? "Update" : "Publish"} Post
                  </Button>
                  {editingPost && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingPost(null);
                        setPostForm({ title: "", excerpt: "", content: "", category: "General" });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Posts list */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Published Posts
              </h3>
              {posts.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No blog posts yet. Create your first post!
                  </CardContent>
                </Card>
              ) : (
                posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground text-sm truncate">{post.title}</p>
                            {post.published ? (
                              <Badge variant="secondary" className="text-[10px] gap-0.5 shrink-0">
                                <Eye className="w-2.5 h-2.5" /> Live
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] gap-0.5 shrink-0">
                                <EyeOff className="w-2.5 h-2.5" /> Hidden
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {post.category} • {new Date(post.createdAt).toLocaleDateString("en-IN")}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingPost(post);
                              setPostForm({
                                title: post.title,
                                excerpt: post.excerpt,
                                content: post.content || "",
                                category: post.category,
                              });
                            }}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => togglePostPublished(post)}
                          >
                            {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-destructive"
                            onClick={() => deletePost(post.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {tab === "offers" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add/Edit form */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  {editingOffer ? <Edit className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {editingOffer ? "Edit Offer" : "Add New Offer"}
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="offer-title">Title *</Label>
                  <Input
                    id="offer-title"
                    value={offerForm.title}
                    onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                    placeholder="e.g. Janmashtami Special 20% Off"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="offer-desc">Description *</Label>
                  <Textarea
                    id="offer-desc"
                    rows={3}
                    value={offerForm.description}
                    onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    placeholder="Offer details..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="offer-discount">Discount</Label>
                    <Input
                      id="offer-discount"
                      value={offerForm.discount}
                      onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                      placeholder="e.g. 20% off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="offer-valid">Valid Till</Label>
                    <Input
                      id="offer-valid"
                      value={offerForm.validTill}
                      onChange={(e) => setOfferForm({ ...offerForm, validTill: e.target.value })}
                      placeholder="e.g. Aug 25, 2026"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={saveOffer} className="gap-2">
                    {editingOffer ? "Update" : "Add"} Offer
                  </Button>
                  {editingOffer && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingOffer(null);
                        setOfferForm({ title: "", description: "", discount: "", validTill: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Offers list */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Active Offers
              </h3>
              {offers.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No offers yet. Create your first offer!
                  </CardContent>
                </Card>
              ) : (
                offers.map((offer) => (
                  <Card key={offer.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground text-sm">{offer.title}</p>
                            <Badge variant={offer.active ? "secondary" : "outline"} className="text-[10px] shrink-0">
                              {offer.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{offer.description}</p>
                          {(offer.discount || offer.validTill) && (
                            <p className="text-[10px] text-primary mt-1">
                              {offer.discount && `Discount: ${offer.discount}`}
                              {offer.discount && offer.validTill && " • "}
                              {offer.validTill && `Valid till: ${offer.validTill}`}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingOffer(offer);
                              setOfferForm({
                                title: offer.title,
                                description: offer.description,
                                discount: offer.discount || "",
                                validTill: offer.validTill || "",
                              });
                            }}
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-destructive"
                            onClick={() => deleteOffer(offer.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}

        {/* Info note */}
        <div className="mt-8 p-4 bg-muted/40 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">How to use:</strong> Use this panel to add blog posts
            and special offers. Blog posts appear on the Blogs page, and offers can be displayed
            anywhere on the site. Content is stored in the database and persists across sessions.
            <br />
            <strong className="text-foreground">Security note:</strong> This is a simple password
            protection. For production, upgrade to NextAuth.js for proper authentication. Change the
            default password in <code className="bg-muted px-1 rounded">admin-page.tsx</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
