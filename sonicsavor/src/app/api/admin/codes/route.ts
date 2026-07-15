import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Generate a random 8-char alphanumeric code
function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid confusion
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// POST /api/admin/codes — generate new codes
export async function POST(request: Request) {
  const { adminCode, count = 1 } = await request.json();

  // Verify admin access code
  if (adminCode !== process.env.ADMIN_ACCESS_CODE) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 403 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = generateCode();
    const { error } = await supabase.from("access_codes").insert({ code });
    if (error) {
      console.error("[Admin] Failed to insert code:", error.message);
      continue;
    }
    codes.push(code);
  }

  return NextResponse.json({ codes });
}

// GET /api/admin/codes — list all codes
export async function GET(request: Request) {
  const url = new URL(request.url);
  const adminCode = url.searchParams.get("adminCode");

  if (adminCode !== process.env.ADMIN_ACCESS_CODE) {
    return NextResponse.json({ error: "Invalid admin code" }, { status: 403 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("access_codes")
    .select("id, code, created_at, used, used_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ codes: data });
}
