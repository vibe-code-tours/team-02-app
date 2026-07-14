import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const desc = "Crisp romaine; creamy dressing; and garlic croutons. Simple; fresh; and highly reliable.";
  console.log(`\nGenerating local embedding for: "${desc}"...\n`);
  
  const { embedText } = await import("../src/lib/embeddings");
  const localEmb = await embedText(desc);
  console.log("Local Embedding first 5 values:", localEmb.slice(0, 5));
  
  const { createClient } = await import("@supabase/supabase-js");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: item } = await supabase.from("menu_items").select("embedding").eq("id", "we-001").single();
  const dbEmb = typeof item?.embedding === "string" ? JSON.parse(item.embedding) : item?.embedding;
  
  console.log("DB Embedding first 5 values:   ", dbEmb.slice(0, 5));
  
  // Calculate difference
  const diff = localEmb.slice(0, 5).map((val, i) => Math.abs(val - dbEmb[i]));
  console.log("Differences:", diff);
  const match = diff.every((d) => d < 1e-4);
  console.log(`\nDo they match? ${match ? "YES" : "NO"}`);
}

main().catch(console.error);
