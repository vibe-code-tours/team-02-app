import { MenuItem, Recommendation, CourseRecommendation } from "@/types";

/**
 * Calls OpenAI GPT-4o-mini to generate a personalized dining and music recommendation
 * based on the user's mood and candidate menu items.
 * 
 * @param mood The user's input mood string.
 * @param candidates A list of search-matched candidate menu items.
 * @returns A promise resolving to a structured Recommendation.
 */
export async function generateMealRecommendation(
  mood: string,
  candidates: MenuItem[]
): Promise<Recommendation> {
  console.log(`[OpenAI] Generating recommendation for mood: "${mood}" using ${candidates.length} candidates.`);

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === "sk-...") {
    console.warn("[OpenAI] API key missing or placeholder. Returning mock fallback recommendation.");
    return getMockFallbackRecommendation(mood, candidates);
  }

  try {
    // TODO: Team member to implement the real OpenAI API client call.
    // Recommended: Use structured outputs or JSON schema response format.
    // e.g.:
    // const response = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: [...],
    //   response_format: { type: "json_object" }
    // });
    
    throw new Error("OpenAI full logic not yet implemented by the team.");
  } catch (error) {
    console.error("[OpenAI] Error in API call. Falling back to mock data.", error);
    return getMockFallbackRecommendation(mood, candidates);
  }
}

/**
 * Internal helper to generate a reasonable mock fallback recommendation.
 */
function getMockFallbackRecommendation(mood: string, candidates: MenuItem[]): Recommendation {
  // Try to group candidates by course
  const starter = candidates.find(c => c.course === "starter") || {
    id: "mm-001",
    name: "Mohinga",
    cuisine: "Myanmar",
    course: "starter" as const,
    moodDescription: "A comforting starter broth.",
    tags: ["comforting"]
  };
  
  const main = candidates.find(c => c.course === "main") || {
    id: "mm-003",
    name: "Shan Noodles",
    cuisine: "Myanmar",
    course: "main" as const,
    moodDescription: "A satisfying main noodle course.",
    tags: ["cozy"]
  };

  const dessert = candidates.find(c => c.course === "dessert") || {
    id: "we-006",
    name: "Apple Crumble",
    cuisine: "Western",
    course: "dessert" as const,
    moodDescription: "A nostalgic sweet dessert.",
    tags: ["warm"]
  };

  const courses: CourseRecommendation[] = [
    {
      course: "starter",
      dishName: starter.name,
      cuisine: starter.cuisine,
      moodTags: starter.tags,
      description: `[Mocked OpenAI response] ${starter.moodDescription} Selected because you feel "${mood}".`,
      icon: "🍜"
    },
    {
      course: "main",
      dishName: main.name,
      cuisine: main.cuisine,
      moodTags: main.tags,
      description: `[Mocked OpenAI response] ${main.moodDescription} It matches your emotional vibe perfectly.`,
      icon: "🍝"
    },
    {
      course: "dessert",
      dishName: dessert.name,
      cuisine: dessert.cuisine,
      moodTags: dessert.tags,
      description: `[Mocked OpenAI response] ${dessert.moodDescription} To sweeten up your mood.`,
      icon: "🍰"
    }
  ];

  return {
    courses,
    playlistQuery: `${mood} acoustic chill playlist`
  };
}
