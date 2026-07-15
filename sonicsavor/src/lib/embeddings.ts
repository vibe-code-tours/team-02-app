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
  limit: number = 3
): Promise<MenuItem[]> {
  console.log(`[Embeddings] Searching for: "${query}" (limit: ${limit})`);

  const queryEmbedding = await embedText(query);
  const results = await searchByEmbedding(queryEmbedding, limit);

  console.log(
    `[Embeddings] Results:`,
    results.map((r) => r.name)
  );

  return results;
}
