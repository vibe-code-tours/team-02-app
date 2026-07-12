This branch is to build UI/UX components of SonicSavor Web App using Next.js 16 (App Router) and Tailwind CSS v4. Since it is a single-page layout, all components must be gathered under src/components/ and linked in src/app/page.tsx.

# File Directory
src/
├── app/
│   ├── favicon.ico               # App icon
│   ├── globals.css               # Global styles & Tailwind config
│   ├── layout.tsx                # Root layout wrapper
│   └── page.tsx                  # Main Entry Point (Single Page Layout)
├── components/
│   ├── feedback/
│   │   └── CustomerFeedbackForm.tsx # Post-meal feedback capture form
│   ├── guest/
│   │   └── GuestRegistrationForm.tsx # Decoration preference & guest registration form
│   ├── recommendation/
│   │   └── RecommendationCard.tsx # Display individual course detail
│   └── ui/
│       ├── MoodInput.tsx          # Textarea matching user mood
│       ├── MoodChips.tsx          # 8 Preset mood choice buttons
│       ├── LoadingState.tsx       # Smooth transition & micro-animations
│       ├── RecommendationGrid.tsx # Wrap 3-course layouts
│       ├── SpotifyEmbed.tsx       # Spotify Web Player Widget
│       └── StarRating.tsx         # Reusable interactive star rating component
└── types/
    └── index.ts                  # Shared TypeScript interfaces

# Responsibilities of files
## 1. src/app/page.tsx
### Description
- The home page of a single-page app that connects all UI components together.
### Tasks
- To place MoodInput and MoodChips in the top section.
- To display the LoadingState while loading.
- To manage State Workflows so that RecommendationGrid and SpotifyEmbed appear below if results are generated.

## 2. src/components/ui/MoodInput.tsx
### Description
- Textarea where User can freely input "Mood".
### Tasks
- To creat Floating Chat-like Textarea.
- To show a smooth border transition (focus ring in Tailwind v4) when the user gives focus to type.
- Include a Submit Button and send the written text to the Main Page Context (State) when it is clicked.

## 3. src/components/ui/MoodChips.tsx
### Description
- Function that displays 8 Preset Mood buttons that users can choose from without spending time typing.
### Tasks
- To display 8 Preset Chips in an orderly row or Flex Grid.
- To differentiate colors according to mood (eg Warm Orange/Amber if Cozy, Pastel Green/Teal if Refreshing).
- To add micro-interactions that will appear on mouse hover (hover:-translate-y-0.5 transition-all).
- To click on a chip to enter the corresponding text directly into MoodInput or State.

## 4. src/components/ui/LoadingState.tsx
### Description
- Screen display according to uer's mood while searching for dishes and Spotify playlists.
### Tasks
- Instead of a boring simple Loading Indicator, use interesting Micro-animations based on food and music.
- To create a beautiful and smooth Skeleton Screen so that the layout is not lost while the content is loading and the user has to wait.

## 5. src/components/recommendation/RecommendationCard.tsx
### Desription
- display the information of each dish (Starter / Main / Dessert) of the recommended 3-Course Meal in the form of a card.
### Tasks
- To neatly arrange symbols and Mood Tags, dish name (Dish Name) and Type (Cuisine).
- To add food images (if needed and Component UI Elements) to create a minimalist modern design to make it appetizing.

## 6. src/components/ui/RecommendationGrid.tsx
### Description
- A Wrapper Component that gathers RecommendationCards and lays out all 3 types on the Dashboard.
### Tasks
- Responsive Layout Adjust Starter, Main Course and Dessert depending on Screen Size in Left-to-Right or Column format.
- To render all the cards at the same time only when the information of all 3 types of dishes is uploaded perfectly.

## 7. src/components/ui/SpotifyEmbed.tsx
### Description
- A section that allows you to directly listen to the music list (Playlist) that matches the mood as a Web Player in the UI.
### Tasks
- Embed URL provided by Spotify API using "iframe" to display seamlessly in UI.
- Compatible with food cards, either next to the layout or To be placed below.

## 8. src/components/ui/StarRating.tsx
### Description
- A reusable interactive star rating component used by the feedback form. Displays 5 clickable stars with hover preview and keyboard accessibility.
### Tasks
- Render 5 star icons that fill with amber color on hover and selection.
- Support controlled value/onChange pattern for integration with parent forms.
- Include aria-label, role="radiogroup", and aria-checked for screen reader accessibility.
- Show numeric feedback (e.g. "4/5") next to stars when a rating is selected.

## 9. src/components/guest/GuestRegistrationForm.tsx
### Description
- A comprehensive guest registration form that captures decoration preferences, occasion details, dietary restrictions, and seating preferences before the dining experience.
### Tasks
- Render a card-based form with sections: Guest Info, Occasion, Decoration Preference, Dietary Restrictions, Seating Preference, and Special Requests.
- Provide chip-style selectors (matching MoodChips pattern) for Occasion, Decoration, and Seating with unique color schemes per option.
- Implement multi-select toggle chips for dietary restrictions (vegetarian, vegan, gluten-free, halal, kosher, nut-free, dairy-free).
- Include a name text input, party size dropdown (1-8 guests), and optional textarea for special requests.
- Validate required fields (name, occasion, decoration, seating) before enabling submit.
- On submit, emit a GuestRegistration object with all captured data.

## 10. src/components/feedback/CustomerFeedbackForm.tsx
### Description
- A post-meal feedback form that captures star ratings across multiple dimensions, free-text comments, and yes/no sentiment toggles for recommendation and return intent.
### Tasks
- Render a card-based form with 4 StarRating components: Overall Experience, Food Quality, Ambiance & Decor, and Playlist Match.
- Include an optional comments textarea for open-ended feedback.
- Provide toggle button pairs for "Would you recommend us?" and "Would you come back?" with yes/no variants.
- Validate that all 4 star ratings are provided before enabling submit.
- On submit, emit a CustomerFeedback object with all captured data.


# General UI/UX Implementation Guidelines (Tailwind CSS v4)
- **Design Pattern**: Aim for a minimalist design that is clean and uncluttered.
- **Typography**: Make text clear and easy to read using Vercel's Geist Font Family. The Geist font is the default body font via `--font-geist-sans` CSS variable — do not override with Arial.
- **Theme**: In color selection, we recommend avoiding strong primary neon colors and using muted/desaturated accents that calm the mind.
- **Dark Mode**: All colored chip components must include `dark:` variants (e.g. `dark:bg-amber-950 dark:text-amber-300`) to avoid bright-on-dark contrast issues.
- **Animations**: Use `animate-[fadeIn_0.3s_ease-out]` for page-level content transitions. Components use staggered `fadeInUp` for card grids.
- **Accessibility**: Loading states include `role="status"` and `aria-live="polite"`. Results container uses `aria-live="polite"`. Star ratings use `role="radiogroup"` with `aria-checked`.
- **Critical Reference Materials**: When performing UI styling, fetch and refer to .claude/skills/ui-ux-pro-max


