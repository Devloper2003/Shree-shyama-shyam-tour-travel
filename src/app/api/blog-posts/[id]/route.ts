export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// PUT /api/blog-posts/[id] — update a blog post
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, excerpt, content, category, published, image } = body;

    const post = await db.blogPost.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title: String(title).slice(0, 200) }),
        ...(excerpt !== undefined && { excerpt: String(excerpt).slice(0, 500) }),
        ...(content !== undefined && { content: content ? String(content).slice(0, 10000) : null }),
        ...(category !== undefined && { category: String(category).slice(0, 50) }),
        ...(published !== undefined && { published: Boolean(published) }),
        ...(image !== undefined && { image: image ? String(image).slice(0, 200) : null }),
      },
    });

    return NextResponse.json({ ok: true, post });
  } catch (err) {
    console.error("[/api/blog-posts/[id]] PUT error:", err);
    return NextResponse.json({ ok: false, error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE /api/blog-posts/[id] — delete a blog post
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.blogPost.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/blog-posts/[id]] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete post" }, { status: 500 });
  }
}
