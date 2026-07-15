# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is SonicSavor

A mood-driven dining web app. User describes their mood (free text or preset chips) → semantic search over a static menu dataset → GPT-4o-mini generates a structured 3-course recommendation → app fetches a mood-matched Spotify playlist → UI renders the meal + embedded Spotify player.

**All app code lives in `sonicsavor/`.** The repo root holds CI, docs, and team workflow files.

## Commands

All commands run from `sonicsavor/`:

```bash
cd sonicsavor
npm install          # install deps (first time)
npm run dev          # Next.js dev server (localhost:3000)
npm run build        # production build
npm run lint         # ESLint
npm run start        # production server (after build)
```

CI runs `npm run lint --if-present`, `npm run typecheck --if-present`, `npm test --if-present`, and `npm run build --if-present`. There are no typecheck or test scripts defined yet — adding them will start enforcement.

There is no `scripts/test-search.ts` on disk yet. When created, test it with `npx tsx scripts/test-search.ts "<mood>"`.

## Architecture

**Single-page app** — `sonicsavor/src/app/page.tsx` is the only page. Mood input at top, results below. No client-side routing.

**Server-side logic** lives in `sonicsavor/src/lib/` and is never imported into client components:
- `menu-queries.ts` — Supabase queries for menu items. Fetches from `menu_items` table and performs vector similarity search via `match_menu_items` RPC function.
- `supabase.ts` — Supabase client initialization.
- `embeddings.ts` — Transformers.js (Xenova/all-MiniLM-L6-v2) loads at startup, embeds text queries, and sends vectors to Supabase for cosine similarity search. **Fully implemented** — embeds query locally, calls `searchByEmbedding()` from menu-queries.
- `openai.ts` — calls GPT-4o-mini via OpenRouter to produce a structured `Recommendation`. **Fully implemented** — uses function calling with structured output schema. Falls back to mock data when no API key is set.
- `spotify.ts` — Spotify Client Credentials flow, searches playlists by mood-derived query. **Currently falls back to a hardcoded embed URL.** Full implementation pending.
- `auth.ts` — Auth0 helper functions (getSession, isAdmin).
- `auth0.ts` — Auth0 SDK initialization.

**API routes** in `sonicsavor/src/app/api/`:
- `POST /api/recommend` — takes `{ mood: string }`, runs vector search, calls OpenAI, returns `Recommendation`
- `GET /api/spotify?q=...` — takes a search query, returns `{ url: string }` (Spotify playlist embed URL)
- `POST /api/auth/verify` — takes `{ code: string }`, verifies one-time access code, sets session cookie
- `GET/DELETE /api/auth/session` — check session / logout (clear cookie)
- `POST /api/admin/codes` — generate new access codes (admin only)
- `GET /api/admin/codes` — list all codes with usage status (admin only)

**Auth & Admin** (one-time access code system):
- `src/middleware.ts` — cookie-based session check for `/admin` routes
- `src/app/admin/` — Admin dashboard with code generator (protected by `ADMIN_ACCESS_CODE`)
- `src/components/auth/AccessCodeForm.tsx` — code entry screen for users
- `src/components/admin/CodeGenerator.tsx` — admin UI to generate & list codes
- Auth0/Google Auth is planned for phase 2

**Components** in `sonicsavor/src/components/`:
- `ui/` — MoodInput, MoodChips, LoadingState, RecommendationGrid, SpotifyEmbed, StarRating
- `guest/GuestRegistrationForm.tsx` — reservation form (preview)
- `feedback/CustomerFeedbackForm.tsx` — feedback form (preview)
- `auth/` — LoginButton, auth-related components

**Types** — all shared interfaces (`MenuItem`, `Recommendation`, `CourseRecommendation`, `GuestRegistration`, `CustomerFeedback`) are in `sonicsavor/src/types/index.ts`. Database types in `sonicsavor/src/types/database.ts`.

**Current state:**
- `page.tsx` calls the API routes and renders real recommendations
- Embeddings + Supabase vector search is fully implemented
- OpenAI/OpenRouter integration is fully implemented with fallback to mock data
- **Spotify integration is still a stub** — needs real API implementation
- **Auth** — one-time access codes (admin generates, user enters). Auth0/Google Auth planned for phase 2
- **Admin** — code generator dashboard at `/admin`

## Key Conventions

- Next.js 16 (App Router) with `src/` directory layout. **Breaking changes may exist** — read `node_modules/next/dist/docs/` before writing Next.js-specific code.
- Tailwind CSS v4 for styling.
- Transformers.js runs the embedding model entirely in Node — no GPU, no external API. First load is ~30MB (cached after).
- Menu items are stored in **Supabase** (not static array). The `menu_items` table has a `mood_description` column for semantic search. Vector search uses the `match_menu_items` RPC function with pgvector.
- `MenuItem.moodTags` is the field name in TypeScript; `mood_tags` is the snake_case column in Supabase.
- The `Recommendation` type uses a flat `courses: CourseRecommendation[]` array with a `course` discriminator field, not a nested `{ starter, main, dessert }` object.
- The AI output schema uses OpenAI's structured output mode (function calling with JSON schema), not freeform parsing. We route through OpenRouter (`https://openrouter.ai/api/v1`) instead of direct OpenAI.
- Auth0 handles authentication. Protected routes go through `src/middleware.ts`.
- Milestones are tracked in `docs/PLAN.md` with status markers (⬜/✅).

## Environment Variables

Secrets in `sonicsavor/.env.local` (gitignored by `.env*` pattern):
- `OPENAI_API_KEY` — OpenRouter API key (routes to GPT-4o-mini via `openai/gpt-4o-mini`)
- `SPOTIFY_CLIENT_ID` — Spotify Client Credentials
- `SPOTIFY_CLIENT_SECRET` — Spotify Client Credentials
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (for admin operations)
- `ADMIN_ACCESS_CODE` — Password to access `/admin` dashboard
- `NEXT_PUBLIC_ADMIN_ACCESS_CODE` — Same as above, exposed to browser

A `sonicsavor/.env.example` is committed as a template. The root `.env.example` is generic and not app-specific.

## CI

`.github/workflows/ci.yml` runs on push to `main` and PRs. Steps: lint → typecheck → test → build. All steps are guarded (`--if-present`) so missing scripts don't fail CI. Enforcement is advisory until branch protection marks the `ci` check as required.

## Git Workflow

**GitHub Flow:** branch off `main` (`feat/…` / `fix/…`) → PR → 1 teammate review → merge. No direct push to `main`. No self-merge. Keep PRs small (< ~300 lines). Open a Draft PR early.

# Local AI Agent Configurations (Personal Developer Rules)
.claude.local.md

# Local Rules Override
- If a file named `.claude.local.md` exists in the root directory, read it and merge its contents with this file.
- Give the instructions in `.claude.local.md` higher priority over general rules for developer-specific preferences.

## Team Workflow Rules

**Git Workflow:**
- Only push to `dev` branch (never directly to `main`)
- PRs should target `dev` branch
- `dev` → `main` only for production releases
- Never merge PRs without explicit approval from the team
- Always wait for reviewer approval before merging

**Branch Strategy:**
- Feature branches: `feat/...` or `feature/...`
- Fix branches: `fix/...`
- All PRs go to `dev` first
- After testing on `dev`, merge to `main` for production

**Code Review:**
- Always get at least 1 teammate review before merging
- Never self-merge your own PR
- Check for color system alignment (refer to `local-notes/color-system.md`)
- Ensure all UI components use the correct color palette

**Documentation:**
- Keep `local-notes/` folder for local documentation only (not committed to repo)
- Update this file when workflow rules change
