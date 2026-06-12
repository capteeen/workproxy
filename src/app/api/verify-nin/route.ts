import { NextResponse } from 'next/server';
import { rateLimit, rateLimitResponse, clientIp } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    const limited = rateLimit(`verify-nin:${clientIp(req)}`, 5, 60 * 1000);
    if (!limited.ok) return rateLimitResponse(limited.retryAfterSeconds);

    const { nin } = await req.json();

    if (!nin || nin.length !== 11) {
      return NextResponse.json({ success: false, error: "Invalid NIN format. Must be 11 digits." }, { status: 400 });
    }

    // SIMULATED API CALL to "Get-A-NIN" or NIMC
    // In a real scenario, you would fetch from a service like VerifyMe or SmileID here.
    
    // Simulate latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock success for any 11-digit NIN for now
    // Later you can add real API logic here with your keys
    return NextResponse.json({ 
      success: true, 
      message: "NIN Verified Successfully",
      data: {
        firstName: "Simulated",
        lastName: "User",
        status: "Verified"
      }
    });

  } catch (error) {
    console.error("NIN Verification error:", error);
    return NextResponse.json({ success: false, error: "Verification service currently unavailable." }, { status: 500 });
  }
}
