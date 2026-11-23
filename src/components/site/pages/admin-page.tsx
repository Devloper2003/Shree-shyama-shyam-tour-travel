"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { usePageStore } from "@/lib/page-store";
import { staticBlogPosts } from "@/lib/blog-data";
import { Lock, Plus, Trash2, Edit, Eye, EyeOff, Tag, FileText, LogOut, LockKeyhole, Upload, ImageIcon, X, KeyRound, Check } from "lucide-react";

// Note: The default password is stored in the database (Setting table).
// Login is verified via POST /api/admin/login API endpoint.
// The client-side code never contains or checks the password directly.

type ApiBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content?: string | null;
  category: string;
  image?: string | null;
  published: boolean;
  createdAt: string;
};

export function AdminPage() {
  const navigate = usePageStore((s) => s.navigate);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState<"blog" | "offers" | "settings">("blog");

  // Change password state
  const [showChangePwd, setShowChangePwd] = useState(false);
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);

  // Blog state
  const [apiPosts, setApiPosts] = useState<ApiBlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<ApiBlogPost | null>(null);
  const [postForm, setPostForm] = useState({ title: "", excerpt: "", content: "", category: "General", image: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Offer state
  const [offers, setOffers] = useState<any[]>([]);
  const [editingOffer, setEditingOffer] = useState<any | null>(null);
  const [offerForm, setOfferForm] = useState({ title: "", description: "", discount: "", validTill: "" });

  // Refresh trigger
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
        if (postsData.ok) setApiPosts(postsData.posts);
        if (offersData.ok) setOffers(offersData.offers);
      } catch (e) {
        console.error("Failed to fetch admin data:", e);
      }
    };
    fetchData();
    return () => { cancelled = true; };
  }, [authed, refreshTrigger]);

  const handleLogin = async () => {
    setLoggingIn(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok && data.match) {
        setAuthed(true);
        setPassword(""); // Clear password from state
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (e) {
      setError("Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  // Change password handler
  const handleChangePassword = async () => {
    setPwdError("");
    setPwdSuccess(false);

    if (!pwdForm.currentPassword || !pwdForm.newPassword) {
      setPwdError("Please fill in all fields.");
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      setPwdError("New password must be at least 6 characters long.");
      return;
    }
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      setPwdError("New password and confirmation do not match.");
      return;
    }
    if (pwdForm.newPassword === pwdForm.currentPassword) {
      setPwdError("New password must be different from the current password.");
      return;
    }

    setChangingPwd(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: pwdForm.currentPassword,
          newPassword: pwdForm.newPassword,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setPwdSuccess(true);
        setPwdForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => {
          setShowChangePwd(false);
          setPwdSuccess(false);
        }, 2000);
      } else {
        setPwdError(data.error || "Failed to change password.");
      }
    } catch (e) {
      setPwdError("Failed to change password. Please try again.");
    } finally {
      setChangingPwd(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.ok) {
        setPostForm((prev) => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const clearImage = () => {
    setPostForm((prev) => ({ ...prev, image: "" }));
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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
      setPostForm({ title: "", excerpt: "", content: "", category: "General", image: "" });
      setImagePreview(null);
      setEditingPost(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
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

  const togglePostPublished = async (post: ApiBlogPost) => {
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

  const editPost = (post: ApiBlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      category: post.category,
      image: post.image || "",
    });
    setImagePreview(post.image || null);
  };

  const cancelEdit = () => {
    setEditingPost(null);
    setPostForm({ title: "", excerpt: "", content: "", category: "General", image: "" });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            <Button className="w-full" onClick={handleLogin} disabled={loggingIn || !password}>
              <Lock className="w-4 h-4 mr-2" /> {loggingIn ? "Verifying..." : "Login"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Contact your administrator if you&apos;ve forgotten the password.
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
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={tab === "blog" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("blog")}
            className="gap-2"
          >
            <FileText className="w-4 h-4" /> Blog Posts ({apiPosts.length + staticBlogPosts.length})
          </Button>
          <Button
            variant={tab === "offers" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("offers")}
            className="gap-2"
          >
            <Tag className="w-4 h-4" /> Offers ({offers.length})
          </Button>
          <Button
            variant={tab === "settings" ? "default" : "outline"}
            size="sm"
            onClick={() => setTab("settings")}
            className="gap-2"
          >
            <KeyRound className="w-4 h-4" /> Settings
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
                {/* Image upload */}
                <div className="space-y-2">
                  <Label>Blog Image</Label>
                  {imagePreview || postForm.image ? (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                      <img src={imagePreview || postForm.image} alt="Preview" className="block w-full h-full object-cover" />
                      <button
                        onClick={clearImage}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80"
                        aria-label="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-40 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-muted/40 transition-colors"
                    >
                      {uploadingImage ? (
                        <p className="text-sm text-muted-foreground">Uploading...</p>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                          <p className="text-xs text-muted-foreground mt-1">JPEG, PNG, WebP (max 5MB)</p>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

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
                    placeholder="Full blog post content. Use ## for headings, - for bullet points."
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
                  <Button onClick={savePost} className="gap-2" disabled={uploadingImage}>
                    {editingPost ? "Update" : "Publish"} Post
                  </Button>
                  {editingPost && (
                    <Button variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Posts list — shows ALL posts (API + static) */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                All Blog Posts ({apiPosts.length + staticBlogPosts.length})
              </h3>

              {/* API-created posts (editable) */}
              {apiPosts.length > 0 && (
                <>
                  <p className="text-xs font-medium text-primary">Your Posts (editable)</p>
                  {apiPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {post.image && (
                            <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                          )}
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
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => editPost(post)}>
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => togglePostPublished(post)}>
                              {post.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </Button>
                            <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deletePost(post.id)}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}

              {/* Static built-in posts (read-only) */}
              <p className="text-xs font-medium text-muted-foreground pt-2">Built-in Posts (read-only)</p>
              {staticBlogPosts.map((post) => (
                <Card key={post.id} className="opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground text-sm truncate">{post.title}</p>
                          <Badge variant="outline" className="text-[10px] shrink-0">Built-in</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {post.category} • {post.date} • {post.readTime}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Button size="icon" variant="ghost" className="h-7 w-7 opacity-50" disabled title="Built-in posts cannot be edited">
                          <ImageIcon className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {apiPosts.length === 0 && staticBlogPosts.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No blog posts yet. Create your first post!
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {tab === "offers" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <Button variant="outline" onClick={() => { setEditingOffer(null); setOfferForm({ title: "", description: "", discount: "", validTill: "" }); }}>
                      Cancel
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Active Offers ({offers.length})
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
                            size="icon" variant="ghost" className="h-7 w-7"
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
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => deleteOffer(offer.id)}>
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

        {/* Settings Tab — Change Password */}
        {tab === "settings" && (
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <KeyRound className="w-5 h-5" /> Change Admin Password
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Change the password used to access this admin panel. The new password
                  takes effect immediately.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {pwdSuccess ? (
                  <div className="flex items-center gap-2 p-4 bg-primary/10 rounded-lg">
                    <Check className="w-5 h-5 text-primary" />
                    <p className="text-sm font-medium text-primary">Password changed successfully!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="current-pwd">Current Password</Label>
                      <Input
                        id="current-pwd"
                        type="password"
                        value={pwdForm.currentPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-pwd">New Password</Label>
                      <Input
                        id="new-pwd"
                        type="password"
                        value={pwdForm.newPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                        placeholder="Enter new password (min 6 characters)"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-pwd">Confirm New Password</Label>
                      <Input
                        id="confirm-pwd"
                        type="password"
                        value={pwdForm.confirmPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                      />
                    </div>
                    {pwdError && (
                      <p className="text-sm text-destructive">{pwdError}</p>
                    )}
                    <Button
                      onClick={handleChangePassword}
                      disabled={changingPwd || !pwdForm.currentPassword || !pwdForm.newPassword || !pwdForm.confirmPassword}
                      className="gap-2"
                    >
                      <KeyRound className="w-4 h-4" /> {changingPwd ? "Changing..." : "Change Password"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Password management info */}
            <div className="mt-6 p-4 bg-muted/40 rounded-lg border border-border space-y-3">
              <p className="text-sm font-semibold text-foreground">Password Management Guide</p>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Change password:</strong> Use the form above. Enter your current password, then set a new one (minimum 6 characters). The new password is stored securely in the database.</li>
                <li><strong className="text-foreground">Forgot password:</strong> If you forget the password, you can reset it by:
                  <ol className="list-decimal pl-4 mt-1 space-y-0.5">
                    <li>Accessing the database directly (via Prisma Studio or database tool)</li>
                    <li>Deleting the <code className="bg-muted px-1 rounded">Setting</code> row with key <code className="bg-muted px-1 rounded">admin_password</code></li>
                    <li>The system will then fall back to the default password</li>
                  </ol>
                </li>
                <li><strong className="text-foreground">Default password:</strong> If no custom password is set in the database, the system uses the default password defined in the code.</li>
                <li><strong className="text-foreground">For production:</strong> Consider upgrading to NextAuth.js for proper authentication with hashed passwords and session management.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Info note */}
        <div className="mt-8 p-4 bg-muted/40 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">How to use:</strong> Upload an image, fill in the blog
            details, and click Publish. Your posts appear alongside the built-in posts on the Blogs page.
            Built-in posts are read-only. To edit pricing or contact details, see the deployment guide.
          </p>
        </div>
      </div>
    </div>
  );
}
