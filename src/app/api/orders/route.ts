import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import {
  makeReference,
  confirmUrl,
  PAYMENT_ACCOUNT,
  SUPPORT_WHATSAPP,
} from "@/lib/orders";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where order alerts are sent. Override with ORDER_NOTIFY_EMAIL.
const NOTIFY_TO = process.env.ORDER_NOTIFY_EMAIL || "onboarding@workproxy.fun";

// Shared secret the Open Claw bot must send so only it can create orders.
const WEBHOOK_SECRET = process.env.ORDER_WEBHOOK_SECRET;

function authed(req: NextRequest): boolean {
  if (!WEBHOOK_SECRET) return true; // auth disabled if no secret set
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token === WEBHOOK_SECRET;
}

function buildEmail(o: {
  reference: string;
  name: string;
  service: string;
  amount: string;
  whatsapp: string;
  email?: string;
  notes?: string;
}) {
  const rows = [
    ["Reference", `<strong>${o.reference}</strong>`],
    ["Service", o.service],
    ["Amount", o.amount],
    ["Name", o.name],
    ["WhatsApp", o.whatsapp],
    ["Email", o.email || "—"],
    ["Notes", o.notes || "—"],
    [
      "Received",
      new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " (WAT)",
    ],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;color:#667eea;font-weight:600;white-space:nowrap">${k}</td><td style="padding:8px 14px;color:#2c3e50">${v}</td></tr>`
    )
    .join("");

  const confirm = confirmUrl(o.reference);

  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f5f7fa;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e9ecef">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:28px 24px;color:#fff">
      <div style="font-size:22px;font-weight:700">🛎️ New Work Proxy Order</div>
      <div style="font-size:13px;opacity:.9;margin-top:4px">A customer booked a service via Open Claw</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="padding:22px 24px;text-align:center;border-top:1px solid #e9ecef">
      <div style="font-size:13px;color:#555;margin-bottom:14px">
        Once you receive <strong>${o.amount}</strong> into <strong>${PAYMENT_ACCOUNT}</strong>,
        click below. The customer is then released to WhatsApp ${SUPPORT_WHATSAPP}.
      </div>
      <a href="${confirm}" style="display:inline-block;background:#16a34a;color:#fff;padding:13px 34px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">✓ Confirm payment received</a>
    </div>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, service, amount, whatsapp, email, notes } = body || {};

    if (!name || !service || !amount || !whatsapp) {
      return NextResponse.json(
        { error: "name, service, amount and whatsapp are required" },
        { status: 400 }
      );
    }

    const reference = makeReference();

    const order = await prisma.order.create({
      data: { reference, name, service, amount, whatsapp, email, notes },
    });

    // Fire the alert email. Don't fail the order if email hiccups.
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "noreply@workproxy.fun",
        to: NOTIFY_TO,
        subject: `New order ${reference}: ${service} — ${amount} (${name})`,
        html: buildEmail({ reference, name, service, amount, whatsapp, email, notes }),
      });
    } catch (e) {
      console.error("Order email failed:", e);
    }

    // Tell Open Claw the reference + payment instructions to relay to the customer.
    return NextResponse.json({
      success: true,
      reference: order.reference,
      status: order.status,
      paymentAccount: PAYMENT_ACCOUNT,
      message: `Order ${order.reference} created. Ask the customer to pay ${amount} to ${PAYMENT_ACCOUNT} and quote reference ${order.reference}.`,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
