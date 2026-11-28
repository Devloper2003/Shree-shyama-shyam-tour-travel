
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, isBcryptHash } from "@/lib/password";

/**
 * POST /api/admin/login
 *
 * Verifies the admin password against the hashed password stored in the
 * database (Setting table, key = "admin_password_hash").
 *
 * Security:
 * - Passwords are stored as bcrypt hashes, NEVER as plaintext.
 * - Uses constant-time comparison (bcrypt.compare) to prevent timing attacks.
 * - The actual password / hash is NEVER returned to the client.
 * - If no password is set in the database, login is refused and the
 *   admin must run the setup script (scripts/init-admin-password.ts)
 *   or set ADMIN_INITIAL_PASSWORD env var and redeploy.
 *
 * Body: { password: string }
 * Response: { ok: boolean, match: boolean, needsSetup?: boolean }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const submittedPassword = body?.password;

    if (!submittedPassword || typeof submittedPassword !== "string") {
      return NextResponse.json({ ok: false, match: false }, { status: 400 });
    }

    // Fetch the stored hashed password from the database
    const setting = await db.setting.findUnique({
      where: { key: "admin_password_hash" },
    });

    // If no password hash is set in the database, refuse login
    // and signal that setup is required.
    if (!setting || !setting.value) {
      return NextResponse.json(
        {
          ok: false,
          match: false,
          needsSetup: true,
          message:
            "Admin password not initialized. Run the setup script or set ADMIN_INITIAL_PASSWORD env var.",
        },
        { status: 403 }
      );
    }

    const storedHash = setting.value;

    // Safety check: if the stored value is NOT a bcrypt hash (e.g. someone
    // manually inserted plaintext), refuse to compare and log a warning.
    if (!isBcryptHash(storedHash)) {
      console.error(
        "[/api/admin/login] SECURITY: stored admin_password_hash is not a bcrypt hash. Refusing login."
      );
      return NextResponse.json(
        { ok: false, match: false, error: "Password storage error." },
        { status: 500 }
      );
    }

    // Constant-time bcrypt comparison
    const match = await verifyPassword(submittedPassword, storedHash);

    return NextResponse.json({ ok: true, match });
  } catch (err) {
    console.error("[/api/admin/login] error:", err);
    return NextResponse.json({ ok: false, match: false }, { status: 500 });
  }
}
