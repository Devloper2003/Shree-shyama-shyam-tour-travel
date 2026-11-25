export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Default password — used only if no password is set in the database.
// Set this via environment variable ADMIN_DEFAULT_PASSWORD in production.
const DEFAULT_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || "change-me";

/**
 * POST /api/admin/change-password
 *
 * Changes the admin password. Requires the current password to match.
 * The new password is stored in the database (Setting table, key: "admin_password").
 *
 * Body: { currentPassword: string, newPassword: string }
 * Response: { ok: boolean, error?: string }
 *
 * Password requirements:
 * - Minimum 6 characters
 * - Cannot be the same as the current password
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { ok: false, error: "Both current and new passwords are required." },
        { status: 400 }
      );
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { ok: false, error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    if (newPassword === currentPassword) {
      return NextResponse.json(
        { ok: false, error: "New password must be different from the current password." },
        { status: 400 }
      );
    }

    // Fetch the stored password from the database
    const setting = await db.setting.findUnique({
      where: { key: "admin_password" },
    });

    const actualPassword = setting?.value || DEFAULT_PASSWORD;

    // Verify current password
    if (currentPassword !== actualPassword) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 403 }
      );
    }

    // Save the new password (upsert: create if doesn't exist, update if it does)
    await db.setting.upsert({
      where: { key: "admin_password" },
      update: { value: newPassword },
      create: { key: "admin_password", value: newPassword },
    });

    return NextResponse.json({ ok: true, message: "Password changed successfully." });
  } catch (err) {
    console.error("[/api/admin/change-password] error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to change password. Please try again." },
      { status: 500 }
    );
  }
}
