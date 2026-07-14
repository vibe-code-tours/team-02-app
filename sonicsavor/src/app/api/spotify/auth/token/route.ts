import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("spotify_access_token")?.value;
  const expiresAt = request.cookies.get("spotify_token_expires_at")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Check if token is expired (with 60s buffer)
  if (expiresAt && Date.now() > Number(expiresAt) - 60_000) {
    // Try to refresh
    const refreshToken = request.cookies.get("spotify_refresh_token")?.value;
    if (refreshToken) {
      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      if (clientId && clientSecret) {
        try {
          const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
          const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
              Authorization: `Basic ${credentials}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: refreshToken,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            const response = NextResponse.json({
              access_token: data.access_token,
              expires_in: data.expires_in,
            });
            response.cookies.set("spotify_access_token", data.access_token, {
              maxAge: data.expires_in,
              path: "/",
            });
            response.cookies.set("spotify_token_expires_at", String(Date.now() + data.expires_in * 1000), {
              maxAge: data.expires_in,
              path: "/",
            });
            if (data.refresh_token) {
              response.cookies.set("spotify_refresh_token", data.refresh_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: "/",
              });
            }
            return response;
          }
        } catch (error) {
          console.error("[Spotify Token] Refresh failed:", error);
        }
      }
    }

    // Token expired and refresh failed — clear cookies
    const response = NextResponse.json({ error: "Token expired" }, { status: 401 });
    response.cookies.delete("spotify_access_token");
    response.cookies.delete("spotify_refresh_token");
    response.cookies.delete("spotify_token_expires_at");
    return response;
  }

  return NextResponse.json({
    access_token: accessToken,
    expires_in: Math.max(0, (Number(expiresAt) - Date.now()) / 1000),
  });
}
