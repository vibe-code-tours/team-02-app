import OpenAI from "openai";
import { MenuItem, Recommendation, CourseRecommendation } from "@/types";

// ── Client (lazy — reads env at call time, not module load) ─

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
}

// ── JSON Schema for structured output ──────────────────────

const recommendationSchema = {
  type: "object" as const,
  properties: {
    courses: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          course: { type: "string" as const, enum: ["starter", "main", "dessert"] },
          dishName: { type: "string" as const },
          cuisine: { type: "string" as const },
          moodTags: { type: "array" as const, items: { type: "string" as const } },
          description: { type: "string" as const },
          icon: { type: "string" as const },
        },
        required: ["course", "dishName", "cuisine", "moodTags", "description", "icon"],
      },
      minItems: 3,
      maxItems: 3,
    },
    playlistQuery: { type: "string" as const },
  },
  required: ["courses", "playlistQuery"],
};

// ── Icons per course ───────────────────────────────────────

const COURSE_ICONS: Record<string, string> = {
  starter: "🥗",
  main: "🍽️",
  dessert: "🍰",
};

// ── Main function ──────────────────────────────────────────

/**
 * Calls GPT-4o-mini to generate a personalized 3-course dining recommendation
 * and a Spotify search query, based on the user's mood and candidate menu items.
 */
export async function generateMealRecommendation(
  mood: string,
  candidates: MenuItem[]
): Promise<Recommendation> {
  console.log(
    `[OpenAI] Generating recommendation for mood: "${mood}" using ${candidates.length} candidates.`
  );

  if (!process.env.OPENAI_API_KEY) {
    console.warn("[OpenAI] API key missing. Returning mock fallback recommendation.");
    return getMockFallbackRecommendation(mood, candidates);
  }

  try {
    // Build the candidate list as text for the prompt
    const candidateList = candidates
      .map(
        (c) =>
          `- [${c.id}] ${c.name} (${c.cuisine}, ${c.course}) — tags: ${c.moodTags.join(", ")} — ${c.moodDescription}`
      )
      .join("\n");

    const response = await getClient().chat.completions.create({
      model: "openai/gpt-4o-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a dining concierge. Given a user's mood and a list of available menu candidates, select exactly ONE starter, ONE main, and ONE dessert that best match the mood.

For each dish, explain in 1-2 sentences why it fits the user's mood. Be vivid and evocative — write like a food poet, not a menu planner.

Also generate a short Spotify search query (3-6 words) for a playlist that matches the mood and meal vibe (e.g. "acoustic chill cozy evening").

You MUST select from the candidates provided. Do not invent dishes.`,
        },
        {
          role: "user",
          content: `My mood: "${mood}"\n\nAvailable dishes:\n${candidateList}`,
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "recommend_meal",
            description: "Generate a 3-course meal recommendation with a Spotify search query",
            parameters: recommendationSchema,
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "recommend_meal" } },
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall || toolCall.type !== "function") {
      throw new Error("No function tool call in response");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = JSON.parse((toolCall as any).function.arguments);

    // Ensure icons are set (LLM sometimes omits them)
    const courses: CourseRecommendation[] = raw.courses.map(
      (c: CourseRecommendation) => ({
        ...c,
        icon: c.icon || COURSE_ICONS[c.course] || "🍴",
      })
    );

    const recommendation: Recommendation = {
      courses,
      playlistQuery: raw.playlistQuery,
    };

    console.log(`[OpenAI] Recommendation generated. Courses: ${courses.map((c) => c.dishName).join(", ")}`);
    return recommendation;
  } catch (error) {
    console.error("[OpenAI] Error in API call. Falling back to mock data.", error);
    return getMockFallbackRecommendation(mood, candidates);
  }
}

// ── Mock fallback ──────────────────────────────────────────

function getMockFallbackRecommendation(mood: string, candidates: MenuItem[]): Recommendation {
  const starter = candidates.find((c) => c.course === "starter") || {
    id: "mm-001",
    name: "Mohinga",
    description: "Myanmar's iconic fish noodle soup.",
    cuisine: "Myanmar" as const,
    course: "starter" as const,
    price: 5.5,
    dietaryTags: [],
    moodTags: ["comforting"],
    moodDescription: "A comforting starter broth.",
  };

  const main = candidates.find((c) => c.course === "main") || {
    id: "mm-003",
    name: "Shan Noodles",
    description: "Sticky rice noodles with chicken.",
    cuisine: "Myanmar" as const,
    course: "main" as const,
    price: 6.5,
    dietaryTags: [],
    moodTags: ["cozy"],
    moodDescription: "A satisfying main noodle course.",
  };

  const dessert = candidates.find((c) => c.course === "dessert") || {
    id: "we-006",
    name: "Apple Crumble",
    description: "Warm cinnamon apple crumble.",
    cuisine: "Western" as const,
    course: "dessert" as const,
    price: 7.5,
    dietaryTags: ["vegetarian"],
    moodTags: ["warm"],
    moodDescription: "A nostalgic sweet dessert.",
  };

  const courses: CourseRecommendation[] = [
    {
      course: "starter",
      dishName: starter.name,
      cuisine: starter.cuisine,
      moodTags: starter.moodTags,
      description: `[Mock] ${starter.moodDescription} Selected because you feel "${mood}".`,
      icon: "🍜",
    },
    {
      course: "main",
      dishName: main.name,
      cuisine: main.cuisine,
      moodTags: main.moodTags,
      description: `[Mock] ${main.moodDescription} It matches your emotional vibe.`,
      icon: "🍝",
    },
    {
      course: "dessert",
      dishName: dessert.name,
      cuisine: dessert.cuisine,
      moodTags: dessert.moodTags,
      description: `[Mock] ${dessert.moodDescription} To sweeten up your mood.`,
      icon: "🍰",
    },
  ];

  return {
    courses,
    playlistQuery: `${mood} acoustic chill playlist`,
  };
}
