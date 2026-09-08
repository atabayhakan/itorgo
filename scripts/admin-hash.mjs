// Usage: node scripts/admin-hash.mjs "your-strong-password"
// Prints an ADMIN_PASSWORD_HASH value for .env (PBKDF2-SHA256, 210k iterations).
import { webcrypto as crypto } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error("Give a password of at least 10 characters.");
  process.exit(1);
}
const b64url = (u8) => Buffer.from(u8).toString("base64url");
const ITER = 210_000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: ITER }, key, 256);
console.log(`ADMIN_PASSWORD_HASH="pbkdf2:${ITER}:${b64url(salt)}:${b64url(new Uint8Array(bits))}"`);
