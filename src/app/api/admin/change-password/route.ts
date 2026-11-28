
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, hashPassword, isBcryptHash } from "@/lib/password";

/**
 * POST /api/admin/change-password
 *
 * Changes the admin password. Requires the current password to match.
 * The new password is hashed with bcrypt (12 salt rounds) and stored
 * in the database (Setting table, key: "admin_password_hash").
 *
 * Security:
 * - Current password is verified against the stored bcrypt hash.
 * - New password is hashed before storage — NEVER stored as plaintext.
 * - Plaintext passwords are never logged.
 * - If the stored value is not a bcrypt hash (legacy/migration), the
 *   change is refused with a security warning.
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

    // Fetch the stored hashed password from the database
    const setting = await db.setting.findUnique({
      where: { key: "admin_password_hash" },
    });

    if (!setting || !setting.value) {
      return NextResponse.json(
        { ok: false, error: "Admin password not initialized. Run setup first." },
        { status: 403 }
      );
    }

    const storedHash = setting.value;

    // Safety check: refuse if the stored value is not a bcrypt hash
    if (!isBcryptHash(storedHash)) {
      console.error(
        "[/api/admin/change-password] SECURITY: stored admin_password_hash is not a bcrypt hash."
      );
      return NextResponse.json(
        { ok: false, error: "Password storage error. Contact developer." },
        { status: 500 }
      );
    }

    // Verify current password against the stored hash
    const isMatch = await verifyPassword(currentPassword, storedHash);
    if (!isMatch) {
      return NextResponse.json(
        { ok: false, error: "Current password is incorrect." },
        { status: 403 }
      );
    }

    // Hash the new password before storing
    const newHash = await hashPassword(newPassword);

    // Save the new hashed password
    await db.setting.upsert({
      where: { key: "admin_password_hash" },
      update: { value: newHash },
      create: { key: "admin_password_hash", value: newHash },
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
