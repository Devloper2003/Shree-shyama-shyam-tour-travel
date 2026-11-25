export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * POST /api/upload
 *
 * Accepts a multipart/form-data upload with an "image" field.
 * Saves the file to public/blog/ and returns the URL path.
 *
 * In production on serverless platforms (Vercel, etc.), the public/ directory
 * is read-only. For production, switch to cloud storage (AWS S3, Cloudinary,
 * etc.) by replacing the fs.writeFileSync call with a cloud upload.
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "No file uploaded. Use field name 'image'." },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: `Invalid file type: ${file.type}. Allowed: JPEG, PNG, WebP, GIF.` },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { ok: false, error: "File too large. Maximum size: 5MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "blog");
    const filepath = path.join(uploadDir, filename);

    // Ensure upload directory exists
    fs.mkdirSync(uploadDir, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(bytes));

    const url = `/blog/${filename}`;
    const sizeKB = Math.round(file.size / 1024);

    return NextResponse.json({
      ok: true,
      url,
      filename,
      size: `${sizeKB}KB`,
      type: file.type,
    });
  } catch (err) {
    console.error("[/api/upload] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to upload image. Please try again." },
      { status: 500 }
    );
  }
}
