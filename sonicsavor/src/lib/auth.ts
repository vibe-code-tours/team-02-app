import { auth0 } from "./auth0";
import { createClient } from "@supabase/supabase-js";

interface ProfileRow {
  role: string;
}

// Server-side role check
export async function getServerRole(): Promise<"guest" | "admin"> {
  const session = await auth0.getSession();
  if (!session?.user) return "guest";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.sub)
    .single();

  return ((data as ProfileRow | null)?.role as "guest" | "admin") ?? "guest";
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  const role = await getServerRole();
  return role === "admin";
}
