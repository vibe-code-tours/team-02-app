import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/guest — save guest registration
export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, partySize, reservationDate, occasion, decorationPreference, dietaryRestrictions, seatingPreference, specialRequests } = body;

  if (!name || !email || !occasion || !decorationPreference || !seatingPreference) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("guest_registrations")
    .insert({
      name,
      email,
      party_size: partySize,
      reservation_date: reservationDate,
      occasion,
      decoration_preference: decorationPreference,
      dietary_restrictions: dietaryRestrictions,
      seating_preference: seatingPreference,
      special_requests: specialRequests,
    })
    .select()
    .single();

  if (error) {
    console.error("[Guest] Failed to save registration:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id });
}

// GET /api/guest — list all registrations (admin)
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
    .from("guest_registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ registrations: data });
}
