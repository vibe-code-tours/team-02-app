import { pipeline } from "@xenova/transformers";
import { MenuItem } from "@/types";
import { searchByEmbedding } from "./menu-queries";

// ── Globals ────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let extractor: any;
let initialized = false;

// ── Init ───────────────────────────────────────────────────

/**
 * Loads the embedding model. Safe to call multiple times — only runs once.
 */
export async function initEmbeddings(): Promise<void> {
  if (initialized) return;

  console.log("[Embeddings] Loading Xenova/all-MiniLM-L6-v2...");
  extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );
  initialized = true;
  console.log("[Embeddings] Model loaded.");
}

// ── Embed text ─────────────────────────────────────────────

/**
 * Generate a 384-dim embedding vector for a single text string.
 */
export async function embedText(text: string): Promise<number[]> {
  await initEmbeddings();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return (output.tolist() as number[][])[0];
}

/**
 * Generate embeddings for multiple texts in a batch.
 */
export async function embedTexts(texts: string[]): Promise<number[][]> {
  await initEmbeddings();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any = await extractor(texts, {
    pooling: "mean",
    normalize: true,
  });
  return output.tolist() as number[][];
}

// ── Search ─────────────────────────────────────────────────

/**
 * Semantic search over menu items by mood query.
 * Embeds the query locally, then sends the vector to Supabase for cosine similarity search.
 */
export async function searchByMood(
  query: string,
  limit: number = 3,
  cuisine?: string
): Promise<MenuItem[]> {
  console.log(`[Embeddings] Local balanced search for: "${query}" (limit: ${limit}, cuisine: ${cuisine || "any"})`);

  // 1. Embed query
  const queryEmbedding = await embedText(query);

  // 2. Fetch all menu items with embeddings
  const { getAllMenuItemsWithEmbeddings } = await import("./menu-queries");
  const items = await getAllMenuItemsWithEmbeddings();

  // Filter items by cuisine if specified
  let filteredItems = items;
  if (cuisine && cuisine.toLowerCase() !== "all" && cuisine.toLowerCase() !== "any") {
    filteredItems = items.filter(
      (item) => item.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }

  // 3. Compute cosine similarity (dot product of normalized vectors)
  const scored = filteredItems.map((item) => {
    let score = 0;
    if (item.embedding) {
      score = queryEmbedding.reduce((sum, val, i) => sum + val * item.embedding![i], 0);
    }
    return { item, score };
  });

  // 4. Group scored items by course and sort descending
  const starters = scored.filter((s) => s.item.course === "starter").sort((a, b) => b.score - a.score);
  const mains = scored.filter((s) => s.item.course === "main").sort((a, b) => b.score - a.score);
  const desserts = scored.filter((s) => s.item.course === "dessert").sort((a, b) => b.score - a.score);

  // 5. Select the top M matches for each course.
  // We want to ensure at least Math.max(3, limit) candidates of each course.
  const M = Math.max(3, limit);

  const results: MenuItem[] = [
    ...starters.slice(0, M).map((s) => s.item),
    ...mains.slice(0, M).map((m) => m.item),
    ...desserts.slice(0, M).map((d) => d.item),
  ];

  console.log(
    `[Embeddings] Balanced Candidates (${cuisine || "any"}):`,
    results.map((r) => `[${r.course}] ${r.name}`)
  );

  return results;
}
