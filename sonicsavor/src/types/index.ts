export interface MenuItem {
  id: string;
  name: string;
  cuisine: string;
  course: "starter" | "main" | "dessert";
  moodDescription: string;
  tags: string[];
  emoji: string;
}

export interface CourseRecommendation {
  course: "starter" | "main" | "dessert";
  dishName: string;
  cuisine: string;
  moodTags: string[];
  description: string;
  icon: string;
}

export interface Recommendation {
  courses: CourseRecommendation[];
  playlistQuery: string;
}

// ── Guest Registration ─────────────────────────────────────

export type Occasion =
  | "birthday"
  | "anniversary"
  | "casual"
  | "business"
  | "date_night"
  | "celebration"
  | "other";

export type DecorationPreference =
  | "romantic"
  | "festive"
  | "minimal"
  | "elegant"
  | "cozy"
  | "none";

export type SeatingPreference = "indoor" | "outdoor" | "bar" | "private";

export type DietaryRestriction =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "halal"
  | "kosher"
  | "nut-free"
  | "dairy-free"
  | "none";

export interface GuestRegistration {
  name: string;
  partySize: number;
  reservationDate: string;
  occasion: Occasion;
  decorationPreference: DecorationPreference;
  dietaryRestrictions: DietaryRestriction[];
  seatingPreference: SeatingPreference;
  specialRequests: string;
}

// ── Customer Feedback ──────────────────────────────────────

export interface CustomerFeedback {
  overallRating: number;
  foodQuality: number;
  ambianceRating: number;
  playlistMatch: number;
  comments: string;
  wouldRecommend: boolean | null;
  wouldReturn: boolean | null;
}
