import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECOVERY_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recover Your WorkProxy Account</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f7fa;
            color: #2c3e50;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header-logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
        }
        .header-subtitle {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 400;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #2c3e50;
        }
        .message {
            font-size: 15px;
            line-height: 1.8;
            color: #555;
            margin-bottom: 30px;
        }
        .highlight {
            color: #667eea;
            font-weight: 600;
        }
        .cta-container {
            text-align: center;
            margin: 40px 0;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 16px 48px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .cta-text {
            font-size: 13px;
            color: #999;
            margin-top: 20px;
        }
        .cta-text a {
            color: #667eea;
            text-decoration: none;
        }
        .security-box {
            background-color: #f0f4ff;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .security-title {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .security-text {
            font-size: 13px;
            color: #555;
            line-height: 1.7;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer-text {
            font-size: 12px;
            color: #999;
            margin-bottom: 15px;
            line-height: 1.6;
        }
        .footer-links {
            font-size: 12px;
            margin-top: 15px;
        }
        .footer-links a {
            color: #667eea;
            text-decoration: none;
            margin: 0 10px;
        }
        .divider {
            border: 0;
            border-top: 1px solid #e9ecef;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-logo">🔐 WorkProxy</div>
            <div class="header-subtitle">Account Recovery</div>
        </div>

        <div class="content">
            <div class="greeting">Hi there,</div>

            <div class="message">
                We received a request to recover your WorkProxy account. If this was you, click the button below to <span class="highlight">verify your identity and regain access</span> to your account.
            </div>

            <div class="cta-container">
                <a href="{{RECOVERY_LINK}}" class="cta-button">Recover My Account</a>
                <div class="cta-text">
                    Or paste this link in your browser:<br>
                    <a href="{{RECOVERY_LINK}}">{{RECOVERY_LINK}}</a>
                </div>
            </div>

            <hr class="divider">

            <div class="security-box">
                <div class="security-title">🛡️ Security Tips</div>
                <div class="security-text">
                    • This link expires in <span class="highlight">24 hours</span><br>
                    • Never share this link with anyone<br>
                    • WorkProxy will never ask for your password via email<br>
                    • If you didn't request this, you can safely ignore this email
                </div>
            </div>

            <div class="message" style="margin-top: 30px;">
                Need help? Our support team is here for you. Reply to this email or visit our <span class="highlight">Help Center</span> for more information.
            </div>
        </div>

        <div class="footer">
            <div class="footer-text">
                <strong>WorkProxy</strong><br>
                Helping you work better, together
            </div>
            <div class="footer-links">
                <a href="#">Help Center</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Contact Support</a>
            </div>
            <hr class="divider">
            <div class="footer-text" style="font-size: 11px; color: #bbb;">
                © 2026 WorkProxy. All rights reserved.<br>
                You're receiving this because recovery was requested for your account.
            </div>
        </div>
    </div>
</body>
</html>`;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Security check: Only allow admins
  if (!session?.user || (session.user as any).role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { email, recoveryLink } = await req.json();

    if (!email || !recoveryLink) {
      return NextResponse.json(
        { error: "Email and recovery link are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Replace the recovery link placeholder in the template
    const htmlContent = RECOVERY_EMAIL_TEMPLATE.replace(/{{RECOVERY_LINK}}/g, recoveryLink);

    // Send email via Resend
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@workproxy.com",
      to: email,
      subject: "Recover Your WorkProxy Account",
      html: htmlContent,
    });

    if (response.error) {
      return NextResponse.json(
        { error: response.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Recovery email sent to ${email}`,
      messageId: response.data?.id,
    });
  } catch (error) {
    console.error("Error sending recovery email:", error);
    return NextResponse.json(
      { error: "Failed to send recovery email" },
      { status: 500 }
    );
  }
}
