import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyConfirmToken } from "@/lib/orders";

// The team clicks the "Confirm payment received" link in the order email.
// This flips the order to PAID, after which Open Claw releases WhatsApp to the
// customer. Protected by an HMAC token tied to the reference.
function page(title: string, body: string, ok: boolean) {
  return new NextResponse(
    `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f5f7fa;margin:0;padding:48px 20px">
  <div style="max-width:460px;margin:0 auto;background:#fff;border:1px solid #e9ecef;border-radius:12px;padding:36px;text-align:center">
    <div style="font-size:42px;margin-bottom:8px">${ok ? "✅" : "⚠️"}</div>
    <h1 style="font-size:20px;color:#2c3e50;margin:0 0 10px">${title}</h1>
    <p style="font-size:14px;color:#555;line-height:1.6;margin:0">${body}</p>
  </div>
</body></html>`,
    { status: ok ? 200 : 400, headers: { "Content-Type": "text/html" } }
  );
}

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("ref") || "";
  const token = req.nextUrl.searchParams.get("t") || "";

  if (!reference || !token || !verifyConfirmToken(reference, token)) {
    return page("Invalid or expired link", "This confirmation link is not valid.", false);
  }

  const order = await prisma.order.findUnique({ where: { reference } });
  if (!order) {
    return page("Order not found", `No order found for reference ${reference}.`, false);
  }

  if (order.status === "PAID") {
    return page(
      "Already confirmed",
      `Order ${reference} was already marked paid. The customer can chat on WhatsApp.`,
      true
    );
  }

  await prisma.order.update({
    where: { reference },
    data: { status: "PAID", paidAt: new Date() },
  });

  return page(
    "Payment confirmed",
    `Order ${reference} (${order.service}, ${order.amount}) is now marked PAID. ${order.name} will be released to chat with you on WhatsApp.`,
    true
  );
}
