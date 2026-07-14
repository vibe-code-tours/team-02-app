# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is SonicSavor

A mood-driven dining web app that pairs music with food. Users describe their mood → semantic search over a static menu dataset → GPT-4o-mini generates a 3-course recommendation → Spotify playlist match → UI renders meal + player.

**Evolution:** The app is transitioning from a mood-based recommendation tool to a full restaurant ordering system with table booking, OTP authentication, and admin panel.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js dev server (Turbopack) at localhost:3000 |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npx tsx scripts/test-search.ts "<mood>"` | Test embeddings + vector search in isolation |

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

## Design System

Color palette is defined in `local-notes/color-system.md`. Key colors:
- Primary: `#E85D04` (Burnt Orange) — CTAs, active states
- Secondary: `#FFB703` (Golden Yellow) — Highlights, hover states
- Accent: `#9D4EDD` (Deep Purple) — Music-related elements
- Background: `#0F0E17` (Dark Aubergine) — Main background
- Surface: `#1A1926` (Midnight Slate) — Cards, inputs
- Text Primary: `#F5F3F0` (Warm White)
- Text Secondary: `#A7A4B8` (Muted Lavender)

## Table Configuration

22 tables total (see `local-notes/table-booking-system.md`):
- 5 Family (6-8 people)
- 5 Squad (4 people)
- 4 Duo (2 people)
- 4 Single (1 person)
- 4 Private (2-6 people) — **current focus**

## Local Developer Notes

The `local-notes/` directory contains developer reference materials (gitignored):
- `BACKEND_API_SPEC.md` / `.html` — Backend API specification
- `EMAIL_SETUP.md` — Resend email service setup
- `auth-flow.md` — Authentication flow diagrams
- `color-system.md` — UI color palette
- `table-booking-system.md` — Table configuration

## Planned Features (In Progress)

1. **OTP Authentication** — Staff-generated codes (not email-based)
2. **Admin Panel** — Staff dashboard for managing bookings and generating OTPs
3. **Table Booking** — Online reservation system with date/time/party selection
4. **Menu Ordering** — Full menu with categories, prices, and cart
5. **Session Management** — 4-hour guest sessions with token-based auth

## Local AI Agent Configurations

If `.claude.local.md` exists in root, read and merge its contents. Give `.claude.local.md` higher priority over general rules for developer-specific preferences.
