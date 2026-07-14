# SonicSavor Color System

## Core Palette

| Role | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| Background | `#ffffff` (white) | `#0C0A09` (stone-950) | Page background |
| Surface | `#fafafa` (zinc-50) | `#1C1917` (stone-900) | Cards, inputs, modals |
| Surface Elevated | `#ffffff` (white) | `#292524` (stone-800) | Hovered cards, dropdowns |
| Border | `#e4e4e7` (zinc-200) | `#44403C` (stone-700) | Card borders, input borders |
| Text Primary | `#18181b` (zinc-900) | `#FAFAF9` (stone-50) | Headings, dish names |
| Text Secondary | `#71717a` (zinc-500) | `#A8A29E` (stone-400) | Subtitles, muted labels |
| Text Body | `#52525b` (zinc-600) | `#D6D3D1` (stone-300) | Descriptions, body text |
| Text Muted | `#a1a1aa` (zinc-400) | `#78716C` (stone-500) | Placeholders, hints |
| CTA / Primary | `#44403c` (stone-800) | `#CA8A04` (amber-600) | Primary buttons, send icon |
| CTA Hover | `#292524` (stone-900) | `#A16207` (amber-500) | Button hover |
| Focus Ring | `#d6d3d1` (stone-300) | `#CA8A04` (amber-600) | Keyboard focus indicators |
| Error | `#dc2626` (red-600) | `#f87171` (red-400) | Error messages, validation |
| Success | `#059669` (emerald-600) | `#34d399` (emerald-400) | Dietary tags, confirmations |

---

## Semantic Accent Colors

| Role | Color | Tailwind | Usage |
|---|---|---|---|
| Starter Course | Amber | `amber-50` / `amber-700` | Badge background, mood tag |
| Main Course | Emerald | `emerald-50` / `emerald-700` | Badge background, mood tag |
| Dessert Course | Rose | `rose-50` / `rose-700` | Badge background, mood tag |
| Dietary Tags | Emerald | `emerald-50` / `emerald-700` | Leaf icon + label |
| Price | Stone | `stone-600` | Dish price display |
| Star Rating | Amber | `amber-400` | Filled stars |

---

## Brand Warm Red Palette (Accent Only)

Defined in `globals.css` as `brand-*`. Used sparingly on accent elements:

| Token | Hex | Usage |
|---|---|---|
| `brand-50` | `#FEF2F2` | Mood chip backgrounds |
| `brand-400` | `#F87171` | Mood chip icons |
| `brand-600` | `#DC2626` | CuisineSelector "Mixed" selected bg |
| `brand-900` | `#7F1D1D` | CuisineSelector "Mixed" selected text (dark) |
| `brand-950` | `#450A0A` | — (reserved) |

---

## Mood Chip Colors

| Mood | Background | Text | Icon |
|---|---|---|---|
| Cozy | `amber-50` | `amber-700` | Coffee (amber-600) |
| Refreshing | `emerald-50` | `emerald-700` | Leaf (emerald-600) |
| Romantic | `rose-50` | `rose-700` | Heart (rose-600) |
| Adventurous | `orange-50` | `orange-700` | Compass (orange-600) |
| Nostalgic | `violet-50` | `violet-700` | Clock (violet-600) |
| Energetic | `yellow-50` | `yellow-700` | Zap (yellow-600) |
| Calm | `sky-50` | `sky-700` | Cloud (sky-600) |
| Indulgent | `fuchsia-50` | `fuchsia-700` | Gem (fuchsia-600) |

---

## Dark Mode — 5-Star Luxury Theme

Dark mode uses **class-based** toggling (`.dark` on `<html>`) with a luxury palette inspired by 5-star hotels and fine dining:

| Role | Token | Hex | Tailwind | Usage |
|---|---|---|---|---|
| Background | `--background` | `#0C0A09` | stone-950 | Page background — deep warm black |
| Surface | `--surface` | `#1C1917` | stone-900 | Cards, inputs, modals |
| Surface Elevated | `--surface-elevated` | `#292524` | stone-800 | Hover states, dropdowns |
| Border | `--border` | `#44403C` | stone-700 | Card/input borders |
| Text Primary | `--text-primary` | `#FAFAF9` | stone-50 | Headings — warm cream white |
| Text Secondary | `--text-secondary` | `#A8A29E` | stone-400 | Muted labels |
| Text Body | `--text-body` | `#D6D3D1` | stone-300 | Body text |
| Text Muted | `--text-muted` | `#78716C` | stone-500 | Hints, placeholders |
| CTA Gold | `--accent-gold` | `#CA8A04` | amber-600 | Primary buttons, focus rings |
| CTA Gold Hover | `--accent-gold-hover` | `#A16207` | amber-500 | Button hover |

```css
@variant dark (&:where(.dark, .dark *));

.dark {
  --background: #0C0A09;
  --foreground: #FAFAF9;
  --surface: #1C1917;
  --surface-elevated: #292524;
  --border: #44403C;
  --text-primary: #FAFAF9;
  --text-secondary: #A8A29E;
  --text-body: #D6D3D1;
  --text-muted: #78716C;
  --accent-gold: #CA8A04;
  --accent-gold-hover: #A16207;
}
```

The Navbar component manages state via `localStorage` key `sonicsavor-theme`.

### Dark Mode Design Principles

| Principle | Implementation |
|---|---|
| No pure black | `#0C0A09` (stone-950) — warm undertone reduces eye strain |
| No pure white | `#FAFAF9` (stone-50) — cream white feels premium |
| Gold accents | `amber-600` for CTAs, focus rings — champagne gold luxury |
| Warm borders | `stone-700` — visible but not harsh |
| Consistent warmth | All dark colors from stone scale — no cold grays |

---

## Why These Colors

| Psychological Intent | Color Choice |
|---|---|
| Clean & neutral | Zinc palette — no color bias, lets food content stand out |
| Culinary warmth | Stone accents — warm gray for CTAs, prices, star ratings |
| Course differentiation | Amber / Emerald / Rose — clear visual hierarchy per course |
| Mood expression | Distinct color per mood chip — instant recognition |
| Accessibility | All text meets WCAG AA (4.5:1 minimum) on both backgrounds |
| Dark comfort | Stone-950 warm black — reduces eye strain for late-night use |
| 5-star luxury (dark) | Deep warm black + cream text + champagne gold — Michelin restaurant ambiance |
| Premium dark CTA | Amber-600 gold buttons — associated with luxury, exclusivity |

---

## CSS Custom Properties

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-display: 'Playfair Display SC', serif;
  --font-sans: 'Karla', sans-serif;
}
```
