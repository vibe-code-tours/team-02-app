import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/feedback — save customer feedback
export async function POST(request: Request) {
  const body = await request.json();

  const { email, overallRating, foodQuality, ambianceRating, playlistMatch, comments, wouldRecommend, wouldReturn } = body;

  if (!email || !overallRating || !foodQuality || !ambianceRating || !playlistMatch) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("customer_feedback")
    .insert({
      email,
      overall_rating: overallRating,
      food_quality: foodQuality,
      ambiance_rating: ambianceRating,
      playlist_match: playlistMatch,
      comments,
      would_recommend: wouldRecommend,
      would_return: wouldReturn,
    })
    .select()
    .single();

  if (error) {
    console.error("[Feedback] Failed to save feedback:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id });
}

// GET /api/feedback — list all feedback (admin)
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
    .from("customer_feedback")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ feedback: data });
}
