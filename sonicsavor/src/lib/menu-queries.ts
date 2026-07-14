import { supabase } from "./supabase";
import { MenuItem } from "@/types";
import { michelinMenuItems } from "./michelin-menu-data";

// ── Types ──────────────────────────────────────────────────

interface MenuRow {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  course: string;
  price: number;
  dietary_tags: string[];
  mood_tags: string[];
  mood_description: string;
  image_url: string | null;
  embedding: number[] | null;
}

// ── Row → MenuItem mapper ──────────────────────────────────

function toMenuItem(row: MenuRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    cuisine: row.cuisine as MenuItem["cuisine"],
    course: row.course as MenuItem["course"],
    price: row.price,
    dietaryTags: row.dietary_tags,
    moodTags: row.mood_tags,
    moodDescription: row.mood_description,
    imageUrl: row.image_url ?? undefined,
  };
}

// ── Fetch all menu items ───────────────────────────────────

export async function getAllMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name, description, cuisine, course, price, dietary_tags, mood_tags, mood_description, image_url");

  if (error) {
    console.error("[Supabase] Error fetching menu items:", error.message);
    throw error;
  }

  const dbItems = (data as MenuRow[]).map(toMenuItem);
  const michelinClean = michelinMenuItems.map(({ embedding, ...rest }) => rest);
  return [...dbItems, ...michelinClean];
}

// ── Vector similarity search ────────────────────────────────

/**
 * Find the top N menu items closest to the query embedding using cosine similarity.
 * Pass the query embedding (from Transformers.js) as a float array.
 */
export async function searchByEmbedding(
  queryEmbedding: number[],
  limit: number = 3
): Promise<MenuItem[]> {
  const { data, error } = await supabase.rpc("match_menu_items", {
    query_embedding: queryEmbedding,
    match_count: limit,
  });

  if (error) {
    console.error("[Supabase] Vector search error:", error.message);
    throw error;
  }

  return (data as MenuRow[]).map(toMenuItem);
}

/**
 * Fetch all menu items including their embedding vectors.
 */
export async function getAllMenuItemsWithEmbeddings(): Promise<(MenuItem & { embedding: number[] | null })[]> {
  const { data, error } = await supabase
    .from("menu_items")
    .select("id, name, description, cuisine, course, price, dietary_tags, mood_tags, mood_description, image_url, embedding");

  if (error) {
    console.error("[Supabase] Error fetching menu items with embeddings:", error.message);
    throw error;
  }

  const dbItems = (data as MenuRow[]).map((row) => ({
    ...toMenuItem(row),
    embedding: typeof row.embedding === "string" ? JSON.parse(row.embedding) : row.embedding,
  }));

  return [...dbItems, ...michelinMenuItems];
}
