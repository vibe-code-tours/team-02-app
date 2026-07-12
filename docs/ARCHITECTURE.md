# Architecture — SonicSavor (Team 02)

> One page. Keep it true as the project grows. A teammate should be able to read
> this and find their way around in 5 minutes.

## What it does

SonicSavor is a mood-driven dining web app that turns a user's emotional state into a personalized 3-course meal recommendation and a matching Spotify playlist. Designed to reduce decision fatigue for any diner who is unsure of what to eat (e.g., after a long workday or during stressful periods), SonicSavor allows users to input their mood in free text or select from presets. It instantly delivers a curated meal experience along with matching embedded music, creating an immersive, multi-sensory dining moment.

## Diagram

```
+-------------------------------------------------------------------+
|                            Browser UI                             |
|           (Next.js Client Components: Mood Input / Chips,         |
|              Recommendation Cards, Spotify Embed Player)          |
+-------------------------------------------------------------------+
                                  │
                     HTTP POST    │  API Requests (e.g., /api/recommend)
                                  ▼
+-------------------------------------------------------------------+
|                          Next.js Server                           |
|           (API Routes / Server Actions & Application Logic)       |
+-------------------------------------------------------------------+
          │                          │                        │
          │ Local Import             │ HTTP API               │ HTTP API
          ▼                          ▼                        ▼
+--------------------+     +-------------------+    +--------------------+
|   Local Database   |     |   OpenAI API      |    |  Spotify Web API   |
| (Static Menu JSON) |     |  (GPT-4o-mini for |    | (Playlist Search & |
|         &          |     |  recommendations) |    |  Embed Generation) |
| Transformers.js    |     +-------------------+    +--------------------+
| (Local Embeddings) |
+--------------------+
```

## Where things live

| Path | What |
|---|---|
| `sonicsavor/src/app/` | Next.js Page Router (pages, global styles, page logic) |
| `sonicsavor/src/components/` | Reusable React UI components (Mood input, loading states, grids) |
| `sonicsavor/src/lib/` | Application logic helper modules (OpenAI, Spotify, embeddings, local menu) |
| `sonicsavor/src/types/` | Shared TypeScript type definitions |
| `docs/` | Project documentation, team proposal, architecture decisions (ADRs) |
| `.github/workflows/` | CI (`ci.yml`) and security scanning workflows (`security.yml`) |

## External services

- **OpenAI API**: Uses `GPT-4o-mini` to analyze user mood and return a structured JSON response matching the menu items to starter, main, and dessert courses. Requires `OPENAI_API_KEY`.
- **Spotify Web API**: Used to search for public playlists matching the mood tag query and fetch player embed links. Requires `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`.
- **Vercel / Netlify / Cloudflare Pages**: Hosting platform for production deployments and PR preview builds.

## How to run

See the [README](../README.md) Quickstart. To spin up the Next.js development server locally:

```bash
cd sonicsavor
cp .env.example .env.local  # Fill in the API keys
npm install
npm run dev
```
