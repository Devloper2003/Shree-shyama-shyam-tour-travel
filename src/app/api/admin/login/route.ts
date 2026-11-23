import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Default password — used if no password is set in the database
const DEFAULT_PASSWORD = "vithika2026";

/**
 * POST /api/admin/login
 *
 * Verifies the admin password against the database (Setting table).
 * If no password is set in the database, falls back to the default.
 *
 * Body: { password: string }
 * Response: { ok: boolean, match: boolean }
 *
 * Note: This does NOT return the actual password — only whether the
 * submitted password matches. The password is never sent to the client.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submittedPassword = body?.password;

    if (!submittedPassword || typeof submittedPassword !== "string") {
      return NextResponse.json({ ok: false, match: false }, { status: 400 });
    }

    // Fetch the stored password from the database
    const setting = await db.setting.findUnique({
      where: { key: "admin_password" },
    });

    // Use stored password if available, otherwise default
    const actualPassword = setting?.value || DEFAULT_PASSWORD;

    const match = submittedPassword === actualPassword;

    return NextResponse.json({ ok: true, match });
  } catch (err) {
    console.error("[/api/admin/login] error:", err);
    return NextResponse.json({ ok: false, match: false }, { status: 500 });
  }
}
