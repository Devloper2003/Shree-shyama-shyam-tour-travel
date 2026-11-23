import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blog-posts — list all blog posts
export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, posts });
  } catch (err) {
    console.error("[/api/blog-posts] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST /api/blog-posts — create a new blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, excerpt, content, category } = body;

    if (!title || !excerpt) {
      return NextResponse.json({ ok: false, error: "Title and excerpt are required" }, { status: 400 });
    }

    const post = await db.blogPost.create({
      data: {
        title: String(title).slice(0, 200),
        excerpt: String(excerpt).slice(0, 500),
        content: content ? String(content).slice(0, 10000) : null,
        category: category ? String(category).slice(0, 50) : "General",
      },
    });

    return NextResponse.json({ ok: true, post });
  } catch (err) {
    console.error("[/api/blog-posts] POST error:", err);
    return NextResponse.json({ ok: false, error: "Failed to create post" }, { status: 500 });
  }
}
