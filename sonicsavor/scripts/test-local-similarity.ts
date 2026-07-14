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

// Dot product of two vectors (since Xenova generates normalized vectors)
function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

async function main() {
  const query = process.argv[2] || "unwell";
  console.log(`\nComputing local cosine similarity for query: "${query}"...\n`);

  // 1. Embed query
  const { embedText } = await import("../src/lib/embeddings");
  const queryEmbedding = await embedText(query);

  // 2. Fetch all menu items with embeddings
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("id, name, course, cuisine, mood_tags, mood_description, embedding");

  if (error) {
    console.error("Error fetching menu items:", error.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log("No menu items found.");
    process.exit(0);
  }

  // 3. Compute similarity for all items
  const scoredItems = items
    .map((item) => {
      let score = 0;
      if (item.embedding) {
        // Parse the embedding if it's a string, or use it directly if array
        const emb = typeof item.embedding === "string" 
          ? JSON.parse(item.embedding) 
          : item.embedding;
        score = dotProduct(queryEmbedding, emb);
      }
      return {
        id: item.id,
        name: item.name,
        course: item.course,
        cuisine: item.cuisine,
        mood_tags: item.mood_tags,
        mood_description: item.mood_description,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  console.log(`=== All Local Matches for "${query}" ===`);
  scoredItems.forEach((item, idx) => {
    console.log(`${idx + 1}. [${item.course}] ${item.name} (${item.cuisine}) - Score: ${item.score.toFixed(4)}`);
    console.log(`   Mood Tags: [${item.mood_tags?.join(", ")}]`);
    console.log(`   Description: "${item.mood_description}"`);
    console.log("-".repeat(60));
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
