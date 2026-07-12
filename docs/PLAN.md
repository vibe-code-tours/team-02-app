# SonicSavor — Milestone Plan

## Project Overview

SonicSavor is a mood-driven dining web app that turns a user's emotional state into a personalized 3-course meal recommendation with a matching Spotify ambience/playlist.

**Core flow:** User describes their mood → semantic search over menu → AI generates 3-course recommendation → app fetches mood-matched Spotify playlist → UI shows meal + embedded player.

**Tech stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + OpenAI GPT-4o-mini + Transformers.js embeddings + Spotify Web API.

---

## 1. Folder Structure

```
sonicsavor/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── recommend/
│   │   │   │   └── route.ts        # POST endpoint for recommendations
│   │   │   └── spotify/
│   │   │       └── route.ts        # GET endpoint for Spotify search
│   │   ├── layout.tsx              # Root layout (already exists)
│   │   ├── page.tsx                # Home page — mood input + results
│   │   └── globals.css             # Tailwind base (already exists)
│   ├── components/
│   │   ├── feedback/
│   │   │   └── CustomerFeedbackForm.tsx # Customer feedback form preview
│   │   ├── guest/
│   │   │   └── GuestRegistrationForm.tsx # Guest registration form preview
│   │   └── ui/
│   │       ├── LoadingState.tsx        # Skeleton / thinking animation
│   │       ├── MoodChips.tsx           # Preset mood chip row
│   │       ├── MoodInput.tsx           # Free-text textarea + submit
│   │       ├── RecommendationGrid.tsx  # 3-course grid wrapper
│   │       ├── SpotifyEmbed.tsx        # Spotify iframe embed player
│   │       └── StarRating.tsx          # Star rating component for feedback
│   ├── lib/
│   │   ├── menu-data.ts            # Static menu dataset (18 items)
│   │   ├── embeddings.ts           # Semantic vector search & mock tag-matching
│   │   ├── openai.ts               # OpenAI GPT-4o-mini request handler stub
│   │   └── spotify.ts              # Spotify Client Credentials search stub
│   └── types/
│       └── index.ts                # MenuItem, Recommendation, GuestRegistration, etc.
├── scripts/
│   └── test-search.ts              # CLI test: embed + search menu by mood string
├── .env.local                      # Secrets (gitignored)
├── package.json
├── tsconfig.json
├── next.config.ts
├── AGENTS.md
└── CLAUDE.md
```

**Key decisions:**
- **Layered Service Architecture**: The app follows a separation of concerns layout. Next.js API routes act as controllers, while code in `src/lib/` behaves as services. This isolates business logic for easier unit/CLI testing.
- `src/app/page.tsx` is a single-page app — mood input at top, results below, no routing needed for MVP.
- `src/lib/` holds all server-side logic (embeddings, OpenAI, Spotify). These run in API routes or server components only.
- `src/types/index.ts` is the single source of truth for all shared interfaces.
- `scripts/test-search.ts` is a standalone Node script to test embeddings + vector search in isolation.

---

## 2. Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `OPENAI_API_KEY` | `.env.local` + Vercel | GPT-4o-mini API access |
| `SPOTIFY_CLIENT_ID` | `.env.local` + Vercel | Spotify Client Credentials flow |
| `SPOTIFY_CLIENT_SECRET` | `.env.local` + Vercel | Spotify Client Credentials flow |

`.env.local` format:
```
OPENAI_API_KEY=sk-...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

---

## 3. Menu Item Schema

```typescript
export interface MenuItem {
  id: string;                    // e.g. "mm-001"
  name: string;                  // Display name
  description: string;           // 1-2 sentence description for semantic search
  cuisine: "Myanmar" | "Western" | "European";
  course: "starter" | "main" | "dessert";
  price: number;                 // USD, display only
  dietaryTags: string[];         // e.g. ["vegetarian", "gluten-free"]
  moodTags: string[];            // e.g. ["comforting", "cozy", "warming"]
  moodDescription: string;       // Longer text explaining why this dish fits certain moods
  imageUrl?: string;             // Optional placeholder image path
}
```

### Placeholder Dataset (18 items)

| ID | Name | Cuisine | Course | Mood Tags |
|---|---|---|---|---|
| mm-001 | Mohinga | Myanmar | starter | comforting, nostalgic, warming |
| mm-002 | Tea Leaf Salad | Myanmar | starter | energizing, refreshing, adventurous |
| mm-003 | Shan Noodles | Myanmar | main | cozy, gentle, satisfying |
| mm-004 | Slow-Cooked Pork Curry | Myanmar | main | indulgent, hearty, celebratory |
| mm-005 | Shwe Yin Aye | Myanmar | dessert | refreshing, playful, cooling |
| mm-006 | Mont Lone Yay Paw | Myanmar | dessert | nostalgic, sweet, celebratory |
| we-001 | Classic Caesar Salad | Western | starter | fresh, light, reliable |
| we-002 | Loaded Potato Soup | Western | starter | cozy, warming, indulgent |
| we-003 | Grilled Ribeye Steak | Western | main | indulgent, bold, celebratory |
| we-004 | Mushroom Risotto | Western | main | comforting, elegant, calming |
| we-005 | New York Cheesecake | Western | dessert | indulgent, sweet, satisfying |
| we-006 | Apple Crumble | Western | dessert | nostalgic, warm, homey |
| eu-001 | French Onion Soup | European | starter | cozy, warming, elegant |
| eu-002 | Smoked Salmon Tartare | European | starter | refined, light, romantic |
| eu-003 | Coq au Vin | European | main | hearty, romantic, sophisticated |
| eu-004 | Mediterranean Grilled Sea Bass | European | main | refreshing, bright, energizing |
| eu-005 | Crème Brûlée | European | dessert | elegant, romantic, indulgent |
| eu-006 | Tiramisu | European | dessert | romantic, bittersweet, comforting |

---

## 4. AI Recommendation Output Schema

```typescript
export interface CourseRecommendation {
  menuItemId: string;          // References MenuItem.id
  name: string;                // Dish name (denormalized for display)
  cuisine: string;             // Cuisine (denormalized)
  reason: string;              // 1-2 sentences: why this dish fits the user's mood
  moodMatch: number;           // 1-10 score: how well it matches the mood
}

export interface Recommendation {
  courses: {
    starter: CourseRecommendation;
    main: CourseRecommendation;
    dessert: CourseRecommendation;
  };
  overallMood: string;         // AI's interpretation of the user's mood (1 phrase)
  moodSummary: string;         // 2-3 sentence narrative tying the meal together
  spotifySearchQuery: string;  // The query to send to Spotify for a matching playlist
}
```

**Example output** (for mood: "I'm exhausted after a long week and just want to curl up"):

```json
{
  "courses": {
    "starter": {
      "menuItemId": "mm-001",
      "name": "Mohinga",
      "cuisine": "Myanmar",
      "reason": "The warm, aromatic fish broth is the ultimate comfort — like a gentle embrace for your tired soul.",
      "moodMatch": 9
    },
    "main": {
      "menuItemId": "we-004",
      "name": "Mushroom Risotto",
      "cuisine": "Western",
      "reason": "Creamy, earthy, and meditative. The slow rhythm of risotto mirrors the slowing down you need right now.",
      "moodMatch": 8
    },
    "dessert": {
      "menuItemId": "we-006",
      "name": "Apple Crumble",
      "cuisine": "Western",
      "reason": "Warm cinnamon apples and crunchy crumble — like a blanket and a fireplace in dessert form.",
      "moodMatch": 9
    }
  },
  "overallMood": "exhausted and seeking comfort",
  "moodSummary": "You need warmth, familiarity, and gentle nourishment. This meal starts with Myanmar's coziest soup, moves to a meditative risotto, and ends with the homey sweetness of apple crumble — each course pulling you deeper into comfort.",
  "spotifySearchQuery": "acoustic chill cozy evening playlist"
}
```

---

## 5. Milestones

| # | Milestone | What's Testable | Depends On | Status |
|---|---|---|---|---|
| **M0** | Project setup | `npm run dev` serves, env vars load | — | ✅ |
| **M1** | Menu data + embeddings + search | `scripts/test-search.ts "I feel exhausted"` → returns top 3 | M0 | ⚠️ *Skeleton & dataset ready* |
| **M2** | Mood input UI | Type a mood or click a chip → raw text captured in state | M0 | ⬜ |
| **M3** | AI recommendation endpoint | `POST /api/recommend` → structured `Recommendation` JSON | M1, M2 | ⚠️ *Skeleton & API route ready* |
| **M4** | Spotify integration | `GET /api/spotify?q=chill+acoustic` → playlist embed URL | M0 | ⚠️ *Skeleton & API route ready* |
| **M5** | Wire it together | Full flow: mood → recommendation → Spotify embed → UI | M2, M3, M4 | ⬜ |
| **M6** | Polish + deploy | Loading states, errors, responsive, Vercel deploy | M5 | ⬜ |

### M0 — Project setup (~15 min)
- Install additional deps: `openai`, `@xenova/transformers`
- Create the folder structure
- Set up `.env.local` with placeholder values
- Verify `npm run dev` works

### M1 — Menu data + embeddings + search (~1-2 hours)
- Create `src/types/index.ts` with all interfaces
- Create `src/lib/menu-data.ts` with the 18-item dataset
- Create `src/lib/embeddings.ts`: load Xenova/all-MiniLM-L6-v2, embed menu items at startup, expose `searchByMood(query, topK)`
- Create `scripts/test-search.ts` CLI test script
- **Test:** `npx tsx scripts/test-search.ts "I'm feeling adventurous"` → returns relevant items

### M2 — Mood input UI (~1-2 hours)
- Build `MoodInput.tsx`: textarea + submit button
- Build `MoodChips.tsx`: row of 8 preset chips
- Wire into `page.tsx`
- **Test:** Type or click → mood string in console/state

### M3 — AI recommendation endpoint (~2-3 hours)
- Create `src/lib/openai.ts`: structured output recommendation
- Create `src/app/api/recommend/route.ts`
- **Test:** `curl POST /api/recommend` → valid JSON

### M4 — Spotify integration (~1-2 hours)
- Create `src/lib/spotify.ts`: Client Credentials flow
- Create `src/app/api/spotify/route.ts`
- **Test:** `curl /api/spotify?q=chill+acoustic` → playlist URL

### M5 — Wire it together (~2-3 hours)
- Build `RecommendationCard.tsx`, `RecommendationGrid.tsx`, `SpotifyEmbed.tsx`, `LoadingState.tsx`
- Wire full flow in `page.tsx`
- **Test:** End-to-end in browser

### M6 — Polish + deploy (~1-2 hours)
- Error handling, responsive layout, loading states
- Deploy to Vercel
- **Test:** Live URL works on mobile

---

## NPM Dependencies

```json
{
  "openai": "^4.x",
  "@xenova/transformers": "^2.x"
}
```

Two new production deps. Transformers.js runs the embedding model entirely in Node (no GPU, no external API), ~30MB on first load (cached after).
