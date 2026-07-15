import { NextResponse } from "next/server";
import { sendOtpEmail } from "@/lib/email";
import { setOtp } from "@/lib/otp-store";

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const code = generateCode();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    setOtp(email, code, expiresAt);

    await sendOtpEmail(email, code);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
