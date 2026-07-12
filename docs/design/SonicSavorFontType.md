# SonicSavor Typography System

## Font Stack

| Role | Font | Fallback | Usage |
|---|---|---|---|
| Display | `Playfair Display` | Georgia, serif | Hero headings, course names, branding |
| Body | `Inter` | system-ui, sans-serif | Body text, descriptions, inputs, buttons |
| Accent | `JetBrains Mono` | monospace | Mood tags, AI confidence labels, code snippets |

---

## Type Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-hero` | `3rem / 48px` | 700 | 1.1 | "How do you feel?" main heading |
| `text-xl` | `1.5rem / 24px` | 600 | 1.3 | Course names (Tom Yum Soup) |
| `text-lg` | `1.125rem / 18px` | 500 | 1.5 | Section labels, button text |
| `text-base` | `1rem / 16px` | 400 | 1.6 | Body text, descriptions |
| `text-sm` | `0.875rem / 14px` | 400 | 1.5 | Muted labels, footer, timestamps |
| `text-xs` | `0.75rem / 12px` | 500 | 1.4 | Badges, tags, "Powered by AI" |

---

## Why These Fonts

| Psychological Intent | Font Choice |
|---|---|
| Culinary sophistication | Playfair Display — elegant serif reminiscent of fine dining menus |
| Modern readability | Inter — clean, highly legible at small sizes, designed for screens |
| Tech-meets-creative | JetBrains Mono — subtle personality without sacrificing clarity |
| Visual hierarchy | High contrast between serif headings and sans-serif body creates clear separation |
| Warmth without clutter | Generous line heights (1.5–1.6) reduce cognitive load when reading meal descriptions |

---

## Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Playfair+Display:wght@600;700&display=swap');