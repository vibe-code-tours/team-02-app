# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is SonicSavor

A mood-driven dining web app. User describes their mood (free text or preset chips) → semantic search over a static menu dataset → GPT-4o-mini generates a structured 3-course recommendation → app fetches a mood-matched Spotify playlist → UI renders the meal + embedded Spotify player.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js dev server (Turbopack) at localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npx tsx scripts/test-search.ts "<mood>"` | Test embeddings + vector search in isolation (M1) |

## Architecture

**Single-page app** — `src/app/page.tsx` is the only page. Mood input at top, results below. No client-side routing.

**Server-side logic** lives in `src/lib/` and is never imported into client components:
- `menu-data.ts` — static 18-item menu dataset (Myanmar/Western/European, starters/mains/desserts)
- `embeddings.ts` — Transformers.js (Xenova/all-MiniLM-L6-v2) loads at startup, embeds menu `moodDescription` fields, exposes `searchByMood(query, topK)` for in-memory cosine similarity search
- `openai.ts` — calls GPT-4o-mini with structured output (function calling) to produce a `Recommendation`
- `spotify.ts` — Spotify Client Credentials flow (no user OAuth), searches playlists by mood-derived query

**API routes** in `src/app/api/`:
- `POST /api/recommend` — takes `{ mood: string }`, runs vector search, calls OpenAI, returns `Recommendation`
- `GET /api/spotify?q=...` — takes a search query, returns Spotify playlist embed URL

**Types** — all shared interfaces (`MenuItem`, `Recommendation`, `CourseRecommendation`) are in `src/types/index.ts`.

**Data flow:** Client → API route → `embeddings.ts` (search) → `openai.ts` (recommend) → client. Spotify lookup is a separate parallel call from the client after recommendation returns.

## Environment Variables

Three secrets in `.env.local` (gitignored by `.env*` pattern):
- `OPENAI_API_KEY` — GPT-4o-mini access
- `SPOTIFY_CLIENT_ID` — Spotify Client Credentials
- `SPOTIFY_CLIENT_SECRET` — Spotify Client Credentials

A `.env.example` is committed as a template.

## Key Conventions

- Next.js 16 (App Router) with `src/` directory layout. **Breaking changes may exist** — read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- Tailwind CSS v4 for styling.
- Transformers.js runs the embedding model entirely in Node — no GPU, no external API. First load is ~30MB (cached after).
- The menu dataset is a typed TypeScript array, not a JSON file. Search operates on `moodDescription` fields (longer mood-focused text), not just dish names.
- The AI output schema uses OpenAI's structured output mode (function calling with JSON schema), not freeform parsing. The `Recommendation` type is the contract between API and UI.
- Milestones are tracked in `docs/PLAN.md` with status markers (⬜/✅).

# Local AI Agent Configurations (Personal Developer Rules)
.claude.local.md

# Local Rules Override
- If a file named '.claude.local.md' exists in the root directory, OpneCode Must read it and merge its contents with this file.
- Give the isntructions in '.claude.local.md' higher priority over general rules for developer-specific preferences .
