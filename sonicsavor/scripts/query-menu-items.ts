import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "@next/env";

// Load Next.js environment variables
loadEnvConfig(process.cwd());

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("id, name, course, cuisine, price, mood_tags, mood_description, embedding");

  if (error) {
    console.error("Error fetching menu items:", error.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log("No menu items found.");
    process.exit(0);
  }

  const itemsWithoutEmbedding = items.filter((item) => !item.embedding);
  console.log(`\n=== Found ${items.length} Menu Items. Items missing embeddings: ${itemsWithoutEmbedding.length} ===\n`);
  if (itemsWithoutEmbedding.length > 0) {
    console.log("Items missing embeddings:");
    itemsWithoutEmbedding.forEach((item) => console.log(`- [${item.id}] ${item.name}`));
    console.log("-".repeat(60));
  }
  items.forEach((item) => {
    console.log(`[${item.id}] ${item.name} (${item.cuisine} - ${item.course}) - $${item.price}`);
    console.log(`   Mood Description: "${item.mood_description}"`);
    console.log(`   Mood Tags: [${item.mood_tags?.join(", ")}]`);
    console.log("-".repeat(60));
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
