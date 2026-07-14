import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/?error=no_code", request.url));
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/spotify/auth/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/?error=no_credentials", request.url));
  }

  try {
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!res.ok) {
      console.error("[Spotify Auth] Token exchange failed:", res.status);
      return NextResponse.redirect(new URL("/?error=token_exchange_failed", request.url));
    }

    const data = await res.json();
    const { access_token, refresh_token, expires_in } = data;

    // Store tokens in cookies (httpOnly not possible with Next.js cookies API easily,
    // so we use regular cookies — these are only used client-side for the SDK)
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("spotify_access_token", access_token, {
      maxAge: expires_in,
      path: "/",
    });
    response.cookies.set("spotify_refresh_token", refresh_token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
    response.cookies.set("spotify_token_expires_at", String(Date.now() + expires_in * 1000), {
      maxAge: expires_in,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[Spotify Auth] Callback error:", error);
    return NextResponse.redirect(new URL("/?error=auth_failed", request.url));
  }
}
