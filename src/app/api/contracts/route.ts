import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { rateLimit, rateLimitResponse, clientIp } from "@/lib/rate-limit";

const VALID_TYPES = ["AGENT_AGREEMENT", "TASKER_CONTRACT_OUTLIER"];

// ~500KB of base64 — generous for a drawn signature PNG, but stops abuse of
// this public endpoint from bloating the database.
const MAX_SIGNATURE_LENGTH = 700_000;

// POST /api/contracts — called by the public fill-and-sign documents.
// Saves a submission and stamps the signing date automatically (server-side).
export async function POST(req: Request) {
  try {
    const limited = rateLimit(`contracts:${clientIp(req)}`, 5, 10 * 60 * 1000);
    if (!limited.ok) return rateLimitResponse(limited.retryAfterSeconds);

    const body = await req.json();

    const docType = String(body.docType || "");
    if (!VALID_TYPES.includes(docType)) {
      return NextResponse.json({ error: "Invalid docType" }, { status: 400 });
    }

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const signatureImage = String(body.signatureImage || "");

    if (!fullName || !email || !signatureImage.startsWith("data:image")) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, signature)" },
        { status: 400 }
      );
    }

    if (signatureImage.length > MAX_SIGNATURE_LENGTH) {
      return NextResponse.json(
        { error: "Signature image is too large" },
        { status: 413 }
      );
    }

    const record = await prisma.signedDocument.create({
      data: {
        docType,
        fullName,
        firstName: body.firstName ? String(body.firstName) : null,
        lastName: body.lastName ? String(body.lastName) : null,
        email,
        phone: body.phone ? String(body.phone) : null,
        country: body.country ? String(body.country) : null,
        region: body.region ? String(body.region) : null,
        dob: body.dob ? String(body.dob) : null,
        address: body.address ? String(body.address) : null,
        payoutMethod: body.payoutMethod ? String(body.payoutMethod) : null,
        commissionRate: body.commissionRate ? String(body.commissionRate) : null,
        teamLead: body.teamLead ? String(body.teamLead) : null,
        signatureImage,
        // signedAt defaults to now() in the DB — the date of signing is set automatically.
      },
      select: { id: true, signedAt: true },
    });

    return NextResponse.json({ ok: true, id: record.id, signedAt: record.signedAt });
  } catch (error) {
    console.error("Save signed document error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/contracts — admin only. Lists submissions (signature omitted from the list).
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const docType = searchParams.get("docType");

    const documents = await prisma.signedDocument.findMany({
      where: docType && VALID_TYPES.includes(docType) ? { docType } : {},
      orderBy: { signedAt: "desc" },
      select: {
        id: true,
        docType: true,
        fullName: true,
        email: true,
        phone: true,
        country: true,
        region: true,
        dob: true,
        address: true,
        payoutMethod: true,
        commissionRate: true,
        teamLead: true,
        signedAt: true,
        createdAt: true,
        // signatureImage intentionally excluded from the list to keep it light
      },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("List signed documents error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
