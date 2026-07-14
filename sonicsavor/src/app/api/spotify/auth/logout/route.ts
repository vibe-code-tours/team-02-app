import { NextResponse } from "next/server";

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("spotify_access_token");
  response.cookies.delete("spotify_refresh_token");
  response.cookies.delete("spotify_token_expires_at");
  return response;
}
