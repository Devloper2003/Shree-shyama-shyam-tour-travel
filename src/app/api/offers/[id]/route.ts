import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// PUT /api/offers/[id] — update an offer
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, description, discount, validTill, active } = body;

    const offer = await db.offer.update({
      where: { id: params.id },
      data: {
        ...(title !== undefined && { title: String(title).slice(0, 200) }),
        ...(description !== undefined && { description: String(description).slice(0, 500) }),
        ...(discount !== undefined && { discount: discount ? String(discount).slice(0, 100) : null }),
        ...(validTill !== undefined && { validTill: validTill ? String(validTill).slice(0, 50) : null }),
        ...(active !== undefined && { active: Boolean(active) }),
      },
    });

    return NextResponse.json({ ok: true, offer });
  } catch (err) {
    console.error("[/api/offers/[id]] PUT error:", err);
    return NextResponse.json({ ok: false, error: "Failed to update offer" }, { status: 500 });
  }
}

// DELETE /api/offers/[id] — delete an offer
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await db.offer.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/offers/[id]] DELETE error:", err);
    return NextResponse.json({ ok: false, error: "Failed to delete offer" }, { status: 500 });
  }
}
