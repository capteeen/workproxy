import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { whatsappLink, SUPPORT_WHATSAPP } from "@/lib/orders";

const WEBHOOK_SECRET = process.env.ORDER_WEBHOOK_SECRET;

function authed(req: NextRequest): boolean {
  if (!WEBHOOK_SECRET) return true;
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  return token === WEBHOOK_SECRET;
}

// Open Claw calls this to check whether an order is paid yet.
// When status is PAID, it also returns the WhatsApp link to hand the customer.
export async function GET(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reference = req.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "reference is required" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { reference } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const paid = order.status === "PAID";
  return NextResponse.json({
    reference: order.reference,
    status: order.status,
    paidAt: order.paidAt,
    // Only released once payment is confirmed.
    whatsapp: paid ? SUPPORT_WHATSAPP : null,
    whatsappLink: paid ? whatsappLink(order.reference) : null,
  });
}
