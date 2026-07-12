import { MenuItem } from "@/types";
import { MENU_ITEMS } from "./menu-data";

/**
 * Interface representing a menu item with its calculated similarity score.
 */
export interface ScoredMenuItem extends MenuItem {
  score: number;
}

/**
 * Initializes the embedding model.
 * In a real implementation, this will load the model (e.g. Xenova/all-MiniLM-L6-v2) 
 * and generate embeddings for all static menu items.
 */
export async function initEmbeddings(): Promise<void> {
  console.log("[Embeddings] Initializing model & generating menu item embeddings...");
  // TODO: Team member to implement Xenova Transformers pipeline loading
  // e.g. pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
}

/**
 * Performs a semantic vector search on the menu items based on a user's mood query.
 * 
 * @param query The user's input mood string (e.g., "I am feeling exhausted")
 * @param limit The maximum number of recommendations to return (defaults to 3)
 * @returns A promise resolving to an array of matching menu items.
 */
export async function searchByMood(query: string, limit: number = 3): Promise<MenuItem[]> {
  console.log(`[Embeddings] Searching menu for mood: "${query}" (limit: ${limit})`);
  
  // SKELETON MOCK: Simple keyword matching on tag fields to act as a fallback/stub.
  // Team member will replace this with real cosine similarity score calculations over generated embeddings.
  const normalizedQuery = query.toLowerCase();
  
  const scoredItems: ScoredMenuItem[] = MENU_ITEMS.map((item) => {
    let score = 0;
    
    // Check tags
    item.tags.forEach((tag) => {
      if (normalizedQuery.includes(tag.toLowerCase())) {
        score += 2;
      }
    });

    // Check description
    if (item.moodDescription.toLowerCase().includes(normalizedQuery)) {
      score += 1;
    }
    
    // Default score decay
    return { ...item, score };
  });

  // Sort descending by score, and select top items
  const sorted = scoredItems
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const results = sorted.length > 0
    ? sorted.map(({ score: _score, ...item }) => item)
    : MENU_ITEMS.slice(0, limit); // fallback to first few items if no matches

  return results.slice(0, limit);
}
