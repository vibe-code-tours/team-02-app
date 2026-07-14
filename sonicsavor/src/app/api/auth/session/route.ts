import { NextResponse } from "next/server";

// GET /api/auth/session — check if session cookie exists
export async function GET() {
  // Middleware already handles cookie validation
  // This endpoint just confirms the cookie is present
  return NextResponse.json({ authenticated: true });
}

// DELETE /api/auth/session — logout (clear cookie)
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("ssonicsavor_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
