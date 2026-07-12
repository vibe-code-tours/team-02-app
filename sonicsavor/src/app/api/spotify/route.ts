import { NextResponse } from "next/server";
import { searchSpotifyPlaylist } from "@/lib/spotify";

/**
 * GET /api/spotify?q=query+string
 * 
 * Returns: { url: string }
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { error: "Query parameter 'q' is required." },
        { status: 400 }
      );
    }

    // Search Spotify for a matching playlist and get the embed URL
    const embedUrl = await searchSpotifyPlaylist(query);

    return NextResponse.json({ url: embedUrl });
  } catch (error: unknown) {
    console.error("[API spotify] Handler error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
