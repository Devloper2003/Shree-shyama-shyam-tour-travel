export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/offers — list all offers
export async function GET() {
  try {
    const offers = await db.offer.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ ok: true, offers });
  } catch (err) {
    console.error("[/api/offers] GET error:", err);
    return NextResponse.json({ ok: false, error: "Failed to fetch offers" }, { status: 500 });
  }
}

// POST /api/offers — create a new offer
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, discount, validTill } = body;

    if (!title || !description) {
      return NextResponse.json({ ok: false, error: "Title and description are required" }, { status: 400 });
    }

    const offer = await db.offer.create({
      data: {
        title: String(title).slice(0, 200),
        description: String(description).slice(0, 500),
        discount: discount ? String(discount).slice(0, 100) : null,
        validTill: validTill ? String(validTill).slice(0, 50) : null,
      },
    });

    return NextResponse.json({ ok: true, offer });
  } catch (err) {
    console.error("[/api/offers] POST error:", err);
    return NextResponse.json({ ok: false, error: "Failed to create offer" }, { status: 500 });
  }
}
