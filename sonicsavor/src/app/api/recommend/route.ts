import { NextResponse } from "next/server";
import { searchByMood } from "@/lib/embeddings";
import { generateMealRecommendation } from "@/lib/openai";

/**
 * POST /api/recommend
 * 
 * Body: { mood: string }
 * Returns: Recommendation JSON (courses, playlistQuery)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mood } = body;

    if (!mood || typeof mood !== "string" || mood.trim() === "") {
      return NextResponse.json(
        { error: "Mood input string is required." },
        { status: 400 }
      );
    }

    // 1. Search static menu items matching the user's mood query semantically
    const candidates = await searchByMood(mood);

    // 2. Pass candidates to OpenAI for fine-tuned 3-course selection and matching Spotify search query
    const recommendation = await generateMealRecommendation(mood, candidates);

    return NextResponse.json(recommendation);
  } catch (error: unknown) {
    console.error("[API recommend] Handler error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
