import OpenAI from "openai";
import { MenuItem, Recommendation, CourseRecommendation } from "@/types";

// ── Client (lazy — reads env at call time, not module load) ─

function getApiKey() {
  return process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
}

function getClient() {
  const key = getApiKey();
  return new OpenAI({
    apiKey: key,
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
          price: { type: "number" as const },
          dietaryTags: { type: "array" as const, items: { type: "string" as const } },
        },
        required: ["course", "dishName", "cuisine", "moodTags", "description", "icon", "price", "dietaryTags"],
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
  candidates: MenuItem[],
  cuisine?: string
): Promise<Recommendation> {
  console.log(
    `[OpenAI] Generating recommendation for mood: "${mood}" using ${candidates.length} candidates. (Cuisine: ${cuisine || "any"})`
  );

  const apiKey = getApiKey();
  if (!apiKey || apiKey === "sk-your-key-here") {
    console.warn("[OpenAI] API key missing or default placeholder. Returning mock fallback recommendation.");
    return getMockFallbackRecommendation(mood, candidates, cuisine);
  }

  try {
    // Build the candidate list as text for the prompt
    const candidateList = candidates
      .map(
        (c) =>
          `- [${c.id}] ${c.name} (${c.cuisine}, ${c.course}) — $${c.price} — dietary: ${c.dietaryTags.join(", ") || "none"} — tags: ${c.moodTags.join(", ")} — ${c.moodDescription}`
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

Include the price and dietary tags from the candidate data. If a dish has no dietary restrictions, use an empty array.

Also generate a short Spotify search query (3-6 words) for a playlist that matches the mood and meal vibe (e.g. "acoustic chill cozy evening").

You MUST select from the candidates provided. Do not invent dishes. If a specific cuisine is specified, ensure all recommended courses belong to that cuisine (they should since candidates are pre-filtered).`,
        },
        {
          role: "user",
          content: `My mood: "${mood}"${cuisine && cuisine.toLowerCase() !== "all" && cuisine.toLowerCase() !== "any" ? `\nChosen cuisine: ${cuisine}` : ""}\n\nAvailable dishes:\n${candidateList}`,
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
        price: c.price ?? 0,
        dietaryTags: c.dietaryTags ?? [],
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
    return getMockFallbackRecommendation(mood, candidates, cuisine);
  }
}

// ── Mock fallback ──────────────────────────────────────────

function getMockFallbackRecommendation(
  mood: string,
  candidates: MenuItem[],
  cuisine?: string
): Recommendation {
  const getFallbackDish = (course: "starter" | "main" | "dessert", targetCuisine?: string): MenuItem => {
    const normalizedCuisine = targetCuisine?.toLowerCase();
    if (normalizedCuisine === "myanmar") {
      if (course === "starter") {
        return {
          id: "mm-001",
          name: "Mohinga",
          description: "Myanmar's iconic fish noodle soup.",
          cuisine: "Myanmar",
          course: "starter",
          price: 5.5,
          dietaryTags: [],
          moodTags: ["comforting"],
          moodDescription: "A comforting starter broth.",
        };
      } else if (course === "main") {
        return {
          id: "mm-003",
          name: "Shan Noodles",
          description: "Sticky rice noodles with chicken.",
          cuisine: "Myanmar",
          course: "main",
          price: 6.5,
          dietaryTags: [],
          moodTags: ["cozy"],
          moodDescription: "A satisfying main noodle course.",
        };
      } else {
        return {
          id: "mm-005",
          name: "Shwe Yin Aye",
          description: "Sweet coconut milk dessert with sticky rice, jelly, and bread.",
          cuisine: "Myanmar",
          course: "dessert",
          price: 3.5,
          dietaryTags: ["vegetarian"],
          moodTags: ["sweet", "refreshing"],
          moodDescription: "A traditional sweet, cool dessert.",
        };
      }
    } else if (normalizedCuisine === "thai") {
      if (course === "starter") {
        return {
          id: "th-005",
          name: "Tod Mun Pla",
          description: "Thai fish cakes with red curry paste, kaffir lime, and long beans.",
          cuisine: "Thai",
          course: "starter",
          price: 6,
          dietaryTags: [],
          moodTags: ["aromatic", "comforting"],
          moodDescription: "An aromatic and comforting starting bite.",
        };
      } else if (course === "main") {
        return {
          id: "th-010",
          name: "Panang Curry",
          description: "Thick coconut curry with sliced beef, kaffir lime, and crushed peanuts.",
          cuisine: "Thai",
          course: "main",
          price: 10,
          dietaryTags: [],
          moodTags: ["rich", "aromatic"],
          moodDescription: "A rich, indulgent, aromatic beef curry.",
        };
      } else {
        return {
          id: "th-015",
          name: "Bua Loy",
          description: "Colorful glutinous rice balls in warm coconut cream.",
          cuisine: "Thai",
          course: "dessert",
          price: 5,
          dietaryTags: ["vegetarian"],
          moodTags: ["warm", "sweet"],
          moodDescription: "Warm, sweet glutinous rice dumplings.",
        };
      }
    } else if (normalizedCuisine === "european") {
      if (course === "starter") {
        return {
          id: "eu-001",
          name: "French Onion Soup",
          description: "Rich caramelized onion broth with a toasted bread slice topped with melted Gruyere cheese.",
          cuisine: "European",
          course: "starter",
          price: 9.5,
          dietaryTags: [],
          moodTags: ["cozy", "warming"],
          moodDescription: "A cozy, warming classic onion soup.",
        };
      } else if (course === "main") {
        return {
          id: "eu-003",
          name: "Coq au Vin",
          description: "Classic French chicken braised in red wine, lardons, and mushrooms.",
          cuisine: "European",
          course: "main",
          price: 18,
          dietaryTags: [],
          moodTags: ["hearty", "sophisticated"],
          moodDescription: "A hearty and sophisticated French chicken stew.",
        };
      } else {
        return {
          id: "eu-017",
          name: "Fruit Tart",
          description: "Buttery pastry crust filled with vanilla custard and fresh seasonal fruits.",
          cuisine: "European",
          course: "dessert",
          price: 8,
          dietaryTags: ["vegetarian"],
          moodTags: ["cheerful", "elegant"],
          moodDescription: "A bright, elegant, and cheerful sweet tart.",
        };
      }
    }

    // Default Western fallback
    if (course === "starter") {
      return {
        id: "we-001",
        name: "Classic Caesar Salad",
        description: "Crisp romaine, creamy dressing, and garlic croutons.",
        cuisine: "Western",
        course: "starter",
        price: 8,
        dietaryTags: [],
        moodTags: ["fresh", "light"],
        moodDescription: "A fresh and light starter salad.",
      };
    } else if (course === "main") {
      return {
        id: "we-004",
        name: "Mushroom Risotto",
        description: "Creamy arborio rice with rich forest mushrooms and parmesan.",
        cuisine: "Western",
        course: "main",
        price: 15,
        dietaryTags: ["vegetarian"],
        moodTags: ["comforting", "creamy"],
        moodDescription: "A comforting and creamy mushroom risotto.",
      };
    } else {
      return {
        id: "we-006",
        name: "Apple Crumble",
        description: "Warm cinnamon apple crumble.",
        cuisine: "Western",
        course: "dessert",
        price: 7.5,
        dietaryTags: ["vegetarian"],
        moodTags: ["warm", "comforting"],
        moodDescription: "A warm cinnamon apple dessert.",
      };
    }
  };

  const starter = candidates.find((c) => c.course === "starter") || getFallbackDish("starter", cuisine);
  const main = candidates.find((c) => c.course === "main") || getFallbackDish("main", cuisine);
  const dessert = candidates.find((c) => c.course === "dessert") || getFallbackDish("dessert", cuisine);

  const courses: CourseRecommendation[] = [
    {
      course: "starter",
      dishName: starter.name,
      cuisine: starter.cuisine,
      moodTags: starter.moodTags,
      description: `[Mock] ${starter.moodDescription} Selected because you feel "${mood}".`,
      icon: COURSE_ICONS[starter.course] || "🥗",
      price: starter.price,
      dietaryTags: starter.dietaryTags,
    },
    {
      course: "main",
      dishName: main.name,
      cuisine: main.cuisine,
      moodTags: main.moodTags,
      description: `[Mock] ${main.moodDescription} It matches your emotional vibe.`,
      icon: COURSE_ICONS[main.course] || "🍽️",
      price: main.price,
      dietaryTags: main.dietaryTags,
    },
    {
      course: "dessert",
      dishName: dessert.name,
      cuisine: dessert.cuisine,
      moodTags: dessert.moodTags,
      description: `[Mock] ${dessert.moodDescription} To sweeten up your mood.`,
      icon: COURSE_ICONS[dessert.course] || "🍰",
      price: dessert.price,
      dietaryTags: dessert.dietaryTags,
    },
  ];

  return {
    courses,
    playlistQuery: `${mood} acoustic chill playlist`,
  };
}
