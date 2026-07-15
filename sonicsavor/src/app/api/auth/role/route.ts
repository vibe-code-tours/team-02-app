import { auth0 } from "@/lib/auth0";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface ProfileRow {
  role: string;
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ role: "guest" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.sub)
    .single();

  if (error || !data) {
    return NextResponse.json({ role: "guest" });
  }

  return NextResponse.json({ role: (data as ProfileRow).role });
}
