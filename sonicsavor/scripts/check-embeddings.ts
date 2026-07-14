import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("id, name, embedding")
    .limit(3);

  if (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }

  items?.forEach((item) => {
    const emb = typeof item.embedding === "string" ? JSON.parse(item.embedding) : item.embedding;
    console.log(`\nItem: ${item.name} (${item.id})`);
    console.log(`Embedding exists: ${!!emb}`);
    console.log(`Embedding type: ${typeof emb} (isArray: ${Array.isArray(emb)})`);
    if (emb) {
      console.log(`Embedding length: ${emb.length}`);
      console.log(`First 5 values:`, emb.slice(0, 5));
      // Calculate magnitude/norm to check if it's normalized
      const sumSq = emb.reduce((sum: number, val: number) => sum + val * val, 0);
      console.log(`Vector magnitude (norm): ${Math.sqrt(sumSq).toFixed(4)}`);
    }
  });
}

main().catch(console.error);
