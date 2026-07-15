/**
 * Seed embeddings into Supabase.
 *
 * Usage: npx tsx scripts/seed-embeddings.ts
 *
 * Fetches all menu items from Supabase, generates 384-dim embeddings
 * for each item's moodDescription using Xenova/all-MiniLM-L6-v2,
 * and writes the vectors back to the embedding column.
 */

import { createClient } from "@supabase/supabase-js";
import { pipeline } from "@xenova/transformers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("[seed] Loading embedding model...");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractor: any = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
  console.log("[seed] Model loaded.");

  // Fetch all menu items
  const { data: items, error } = await supabase
    .from("menu_items")
    .select("id, mood_description");

  if (error) {
    console.error("[seed] Failed to fetch menu items:", error.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log("[seed] No menu items found. Run the SQL migration first.");
    process.exit(1);
  }

  console.log(`[seed] Found ${items.length} items. Generating embeddings...`);

  // Batch embed all mood descriptions
  const descriptions = items.map((item) => item.mood_description);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = await extractor(descriptions, {
    pooling: "mean",
    normalize: true,
  });
  const embeddings = output.tolist() as number[][];

  // Update each row with its embedding
  let updated = 0;
  for (let i = 0; i < items.length; i++) {
    const { error: updateError } = await supabase
      .from("menu_items")
      .update({ embedding: JSON.stringify(embeddings[i]) })
      .eq("id", items[i].id);

    if (updateError) {
      console.error(`[seed] Failed to update ${items[i].id}:`, updateError.message);
    } else {
      updated++;
    }
  }

  console.log(`[seed] Done. Updated ${updated}/${items.length} items with embeddings.`);
}

main().catch((err) => {
  console.error("[seed] Fatal error:", err);
  process.exit(1);
});
