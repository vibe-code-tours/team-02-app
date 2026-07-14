# SonicSavor Typography System

## Font Stack

| Role | Font | Fallback | Usage |
|---|---|---|---|
| Display | `Playfair Display SC` | Georgia, serif | Hero headings, section titles, branding |
| Body | `Karla` | system-ui, sans-serif | Body text, descriptions, inputs, buttons, labels |
| Mono | `Geist Mono` | ui-monospace, monospace | Keyboard hints, character counters, code snippets |

---

## Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-hero` | `3rem / 48px` | 700 | 1.1 | "SonicSavor" main heading (sm: `2.25rem / 36px`) |
| `text-xl` | `1.25rem / 20px` | 600 | 1.4 | Form headings, section titles |
| `text-lg` | `1.125rem / 18px` | 600 | 1.35 | Dish names (Tom Yum Soup) |
| `text-base` | `1rem / 16px` | 400 | 1.5 | Body text, descriptions, hero subtitle |
| `text-sm` | `0.875rem / 14px` | 400–500 | 1.5 | Labels, inputs, button text, cuisine labels |
| `text-xs` | `0.75rem / 12px` | 500–600 | 1.4 | Badges, tags, hints, uppercase labels |
| `text-[11px]` | `11px` | 600 | 1.3 | Course badges (Starter / Main / Dessert) |

---

## Why These Fonts

| Psychological Intent | Font Choice |
|---|---|
| Culinary sophistication | Playfair Display SC — small-caps serif reminiscent of fine dining menus |
| Modern readability | Karla — clean humanist sans-serif, highly legible at small sizes |
| Tech-meets-creative | Geist Mono — subtle personality for code/hint elements |
| Visual hierarchy | High contrast between serif headings and sans-serif body creates clear separation |
| Warmth without clutter | Generous line heights (1.5–1.6) reduce cognitive load when reading meal descriptions |

---

## CSS Custom Properties

```css
@theme inline {
  --font-display: 'Playfair Display SC', serif;
  --font-sans: 'Karla', sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

---

## Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&family=Playfair+Display+SC:wght@400;700&display=swap');
```

---

## Tailwind Usage

```tsx
{/* Display font */}
<h1 className="font-[family-name:var(--font-display)]">SonicSavor</h1>

{/* Body font (default) */}
<p className="text-sm">Tell us your mood</p>

{/* Mono font */}
<kbd className="font-mono">Enter</kbd>
```
