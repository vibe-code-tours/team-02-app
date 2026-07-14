import { loadEnvConfig } from "@next/env";

// Load environment variables
loadEnvConfig(process.cwd());

async function main() {
  const query = process.argv[2];
  if (!query) {
    console.error("Please provide a search query. E.g. npx tsx scripts/test-search.ts 'unwell'");
    process.exit(1);
  }

  const { searchByMood } = await import("../src/lib/embeddings");

  // Test with different limits
  console.log(`\nTesting search for mood query: "${query}"...\n`);
  
  const limits = [65];
  for (const limit of limits) {
    console.log(`=== Top ${limit} Results ===`);
    try {
      const results = await searchByMood(query, limit);
      results.forEach((r, idx) => {
        console.log(`${idx + 1}. [${r.course}] ${r.name} (${r.cuisine}) - price: $${r.price}`);
        console.log(`   Mood Tags: [${r.moodTags.join(", ")}]`);
        console.log(`   Description: "${r.moodDescription}"\n`);
      });
    } catch (err: any) {
      console.error(`Search failed for limit ${limit}:`, err.message);
    }
    console.log("=".repeat(60) + "\n");
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
