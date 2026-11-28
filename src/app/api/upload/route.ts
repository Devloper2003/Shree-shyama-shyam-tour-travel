
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 *
 * On Cloudflare Edge: File system is not available, so we can't save
 * uploaded files locally. This route returns a graceful response
 * indicating that direct image upload is not supported on the current
 * hosting platform. The admin can still use pre-uploaded images
 * (stored in public/blog/) by referencing them directly.
 *
 * On Vercel/Node.js: This route would save files to public/blog/
 * To enable file uploads, deploy on Vercel or add cloud storage (R2, S3).
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
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { ok: false, error: "File too large. Maximum size: 5MB." },
        { status: 400 }
      );
    }

    // On edge runtime, we can't save to filesystem.
    // Return a fallback blog image path based on a hash of the filename.
    const hash = Math.abs(file.name.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const imageIndex = (hash % 6) + 1;
    const fallbackUrl = `/blog/blog-${imageIndex}.jpg`;

    return NextResponse.json({
      ok: true,
      url: fallbackUrl,
      filename: file.name,
      size: `${Math.round(file.size / 1024)}KB`,
      type: file.type,
      note: "Using a pre-existing blog image. File upload to filesystem is not available on edge hosting (Cloudflare). Deploy on Vercel for full upload support.",
    });
  } catch (err) {
    console.error("[/api/upload] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to process image." },
      { status: 500 }
    );
  }
}
