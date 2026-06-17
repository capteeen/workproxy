import crypto from "crypto";

// Public base URL used to build links in emails (confirm payment, etc.)
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://workproxy.fun";

// The single official channels — keep these consistent everywhere.
export const SUPPORT_WHATSAPP = "+234 707 624 5153";
export const SUPPORT_WHATSAPP_WA = "2347076245153"; // wa.me format
export const PAYMENT_ACCOUNT = "OPay 8152688569";

// Secret used to sign confirm links and authenticate the bot.
const SECRET = process.env.ORDER_WEBHOOK_SECRET || "";

// Short, human-friendly order reference, e.g. "WP-7F3K9Q".
export function makeReference(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let code = "";
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) code += alphabet[bytes[i] % alphabet.length];
  return `WP-${code}`;
}

// HMAC token tying a confirm link to a specific order reference so only
// someone who received our email (with the secret-signed link) can confirm.
export function confirmToken(reference: string): string {
  return crypto
    .createHmac("sha256", SECRET || "workproxy-fallback")
    .update(reference)
    .digest("hex")
    .slice(0, 24);
}

export function verifyConfirmToken(reference: string, token: string): boolean {
  const expected = confirmToken(reference);
  if (token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

export function confirmUrl(reference: string): string {
  return `${BASE_URL}/api/orders/confirm?ref=${encodeURIComponent(
    reference
  )}&t=${confirmToken(reference)}`;
}

// WhatsApp deep link the customer gets AFTER payment is confirmed.
export function whatsappLink(reference: string): string {
  const msg = `Hi Work Proxy, my order ${reference} is paid. I'd like to continue.`;
  return `https://wa.me/${SUPPORT_WHATSAPP_WA}?text=${encodeURIComponent(msg)}`;
}
