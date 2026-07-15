import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyOtp } from "@/lib/otp-store";

export async function POST(request: Request) {
  const { code, email } = await request.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Code is required" }, { status: 400 });
  }

  // OTP email verification
  if (email) {
    const result = verifyOtp(email, code);
    if (!result.valid) {
      return NextResponse.json({ error: result.error }, { status: 401 });
    }

    // Set session cookie for email-based auth
    const response = NextResponse.json({ success: true });
    response.cookies.set("ssonicsavor_session", `email:${email}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  // Access code verification (admin-generated codes from Supabase)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("access_codes")
    .select("id, code, used")
    .eq("code", code.toUpperCase().trim())
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  if (data.used) {
    return NextResponse.json({ error: "Code has already been used" }, { status: 401 });
  }

  const { error: updateError } = await supabase
    .from("access_codes")
    .update({ used: true, used_at: new Date().toISOString() })
    .eq("id", data.id);

  if (updateError) {
    console.error("[Auth] Failed to mark code as used:", updateError.message);
    return NextResponse.json({ error: "Failed to verify code" }, { status: 500 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("ssonicsavor_session", data.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
