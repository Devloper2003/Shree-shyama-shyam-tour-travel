/**
 * ============================================================================
 *  PASSWORD HASHING UTILITIES (bcrypt)
 * ============================================================================
 *
 * Security notes:
 * - Passwords are NEVER stored in plaintext.
 * - We use bcryptjs with 12 salt rounds (industry standard: 10-12).
 * - The hashed password is stored in the database Setting table under
 *   the key "admin_password_hash".
 * - Plaintext passwords are never logged, never returned to the client,
 *   and never persisted anywhere.
 *
 * Flow:
 *   1. Admin sets password → hashPassword() → store hash in DB
 *   2. Admin logs in → fetch hash from DB → verifyPassword()
 *   3. Admin changes password → verify old → hash new → update DB
 * ============================================================================
 */

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hash a plaintext password using bcrypt.
 * Returns a string like "$2a$12$..." that is safe to store in the database.
 */
export async function hashPassword(plaintext: string): Promise<string> {
  if (!plaintext || plaintext.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plaintext, salt);
}

/**
 * Verify a plaintext password against a stored bcrypt hash.
 * Returns true if the password matches, false otherwise.
 * Uses constant-time comparison to prevent timing attacks.
 */
export async function verifyPassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  if (!plaintext || !hash) return false;
  try {
    return await bcrypt.compare(plaintext, hash);
  } catch {
    return false;
  }
}

/**
 * Check if a stored value looks like a bcrypt hash.
 * Bcrypt hashes start with "$2a$", "$2b$", or "$2y$".
 */
export function isBcryptHash(value: string): boolean {
  return /^\$2[aby]\$\d{2}\$.{53}$/.test(value);
}
