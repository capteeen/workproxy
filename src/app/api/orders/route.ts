import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where order alerts are sent. Override with ORDER_NOTIFY_EMAIL.
const NOTIFY_TO = process.env.ORDER_NOTIFY_EMAIL || "onboarding@workproxy.fun";

// Shared secret the Claw bot must send so only it can create orders.
// Set ORDER_WEBHOOK_SECRET in the environment.
const WEBHOOK_SECRET = process.env.ORDER_WEBHOOK_SECRET;

function buildEmail(o: {
  name: string;
  service: string;
  amount: string;
  whatsapp: string;
  email?: string;
  notes?: string;
}) {
  const rows = [
    ["Service", o.service],
    ["Amount", o.amount],
    ["Name", o.name],
    ["WhatsApp", o.whatsapp],
    ["Email", o.email || "—"],
    ["Notes", o.notes || "—"],
    ["Received", new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " (WAT)"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 14px;color:#667eea;font-weight:600;white-space:nowrap">${k}</td><td style="padding:8px 14px;color:#2c3e50">${v}</td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f5f7fa;padding:24px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e9ecef">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:28px 24px;color:#fff">
      <div style="font-size:22px;font-weight:700">🛎️ New Work Proxy Order</div>
      <div style="font-size:13px;opacity:.9;margin-top:4px">A user just booked a service via Claw</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">${rows}</table>
    <div style="padding:18px 24px;background:#f0f4ff;border-top:1px solid #e9ecef;font-size:13px;color:#555">
      Payment account: <strong>OPay 8152688569</strong> · Confirm payment proof on WhatsApp
      <strong>+234 707 624 5153</strong>.
    </div>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  // Auth: require the shared secret via Authorization: Bearer <secret>
  if (WEBHOOK_SECRET) {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
    if (token !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
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

    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@workproxy.fun",
      to: NOTIFY_TO,
      subject: `New order: ${service} — ${amount} (${name})`,
      html: buildEmail({ name, service, amount, whatsapp, email, notes }),
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message || "Failed to send alert" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, messageId: response.data?.id });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
