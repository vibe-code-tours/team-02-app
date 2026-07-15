# SonicSavor — UI Component Specifications

> For: Frontend Developer
> Version: 1.0
> Date: 14 Jul 2026

---

## Overview

This document specifies all UI components needed for the SonicSavor web app. Each component includes:
- Purpose
- Props/State
- Visual design
- Behavior

**Tech Stack:**
- React 19 (Client Components)
- Tailwind CSS v4
- Color system from `color-system.md`

---

## Page Structure

```
src/app/
├── page.tsx                    ← Landing (Hero, How It Works, Explore)
├── checkin/page.tsx            ← Access code entry (one-time visit)
├── register/page.tsx           ← Email registration with OTP
├── dashboard/page.tsx          ← Main hub (post-login)
├── booking/page.tsx            ← Table booking
├── menu/page.tsx               ← Menu + course filter
├── cart/page.tsx               ← Cart summary
├── exit/page.tsx               ← Feedback + registration
├── admin/page.tsx              ← Staff panel
└── layout.tsx                  ← Root layout

src/components/
├── landing/                    ← Landing page components
│   ├── HeroSection.tsx
│   ├── AccessCodeEntry.tsx
│   └── EmailInput.tsx
├── auth/                       ← OTP verification
├── admin/                      ← Staff panel
├── booking/                    ← Table booking
├── menu/                       ← Menu + ordering
├── cart/                       ← Cart
├── exit/                       ← Feedback + registration
├── ui/                         ← Shared UI components
└── layout/                     ← Layout components
```

---

## Current Status (July 15, 2026)

**Built & Working:**
- ✅ Landing page with Hero, How It Works, Explore sections
- ✅ Checkin page (6-digit access code entry)
- ✅ Register page (email + OTP flow)
- ✅ Menu page (18 items, course filter: All/Starters/Mains/Desserts)
- ✅ Dashboard page (mood chips, navigation)
- ✅ Admin page (OTP generation, code generator)
- ✅ Cart page (placeholder)
- ✅ Booking page (placeholder - needs implementation)
- ✅ Exit page (placeholder)

**Pending:**
- ⏳ Booking page (real booking form)
- ⏳ Cart page (order summary)
- ⏳ Exit page (feedback + registration)
- ⏳ Navigation header component
- ⏳ Mobile responsiveness testing

---

## 1. Landing Page Components

### 1.1 HeroSection (Current)

**Purpose:** Visual intro with animated gradient, app explanation, and CTAs

**Visual:**
```
┌──────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← Animated gradient
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    (Dark Aubergine ↔ Deep Purple)
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓   🎵               ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓   SonicSavor       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓   "Where music     ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓    meets flavor"   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓   Tell us your mood...              │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│  ▓▓▓▓▓  [Enter Access Code] [Create Account]│
│  ～～～～～～∿∿∿～～～～～～～～～～～～～～～～～│  ← Waveform animation
└──────────────────────────────────────────────┘
```

**Sections:**
1. **Hero** - Logo, title, tagline, explanation, 2 CTA buttons
2. **How It Works** - 3 steps (Mood → Meal → Music)
3. **Explore** - Menu card + Booking card (clickable)

**Behavior:**
- Slow gradient animation (10s cycle)
- Subtle waveform at bottom (CSS animation)
- Responsive (mobile-first)

**Colors:**
- Background: Animated gradient (#0F0E17 → #9D4EDD)
- Text: #F5F3F0 (Warm White)
- Waveform: #E85D04 (Burnt Orange)

---

### 1.2 EmailInput

**Purpose:** Email input for OTP request

**Props:**
```typescript
interface EmailInputProps {
  onSubmit: (email: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  Join Us Tonight                             │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ 📧 Enter your email                   │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  [ ✨ Get Access Code ]                      │
│                                              │
│  ─── or ───                                  │
│                                              │
│  Already have account? Sign In               │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Email validation on submit
- Loading state while sending OTP
- Error message if invalid email

**Colors:**
- Input background: #1A1926 (Midnight Slate)
- Input border: #242334 (Lighter Slate)
- Button background: #E85D04 (Burnt Orange)
- Button text: #F5F3F0 (Warm White)

---

### 1.3 AccessCodeEntry

**Purpose:** Customer enters OTP code from staff

**Props:**
```typescript
interface AccessCodeEntryProps {
  onSubmit: (code: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string | null;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🎵 SonicSavor                              │
│                                              │
│  Enter your access code                      │
│                                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐           │
│  │4 │ │7 │ │  │ │  │ │  │ │  │           │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘           │
│                                              │
│  [ Verify & Enter ]                          │
│                                              │
│  ──────────────────────────────────────────  │
│  💡 This is a one-time code from our staff  │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Auto-focus first input
- Auto-advance on digit entry
- Auto-submit on 6 digits
- Backspace navigates back
- Error shake animation on invalid code

**Colors:**
- Input background: #1A1926 (Midnight Slate)
- Input border: #242334 (Lighter Slate)
- Input border (focus): #E85D04 (Burnt Orange)
- Button background: #E85D04 (Burnt Orange)

---

## 1.3 Checkin Page ✅

**Purpose:** Access code entry for one-time visits

**Visual:**
```
┌──────────────────────────────────────────────┐
│  Welcome to SonicSavor 🎵                    │
│  Enter your 6-digit access code from staff   │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │ 6-digit code input (AccessCodeEntry) │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  ← Back to Home                             │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Uses AccessCodeEntry component
- Verifies code → redirects to /dashboard
- Session: 4 hours
- Error handling for invalid codes

---

## 1.4 Register Page ✅

**Purpose:** Email registration with OTP verification

**Visual:**
```
┌──────────────────────────────────────────────┐
│  Create Your Account ✨                      │
│                                              │
│  Step 1: Email Input                         │
│  ┌──────────────────────────────────────┐   │
│  │ 📧 Enter your email                   │   │
│  └──────────────────────────────────────┘   │
│  [ ✨ Get Access Code ]                      │
│                                              │
│  Step 2: OTP Verification                    │
│  ┌──────────────────────────────────────┐   │
│  │ 6-digit code input                   │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  Already have account? Sign in here          │
│  ← Back to Home                             │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Step 1: Email input → sends OTP
- Step 2: OTP verification → creates account
- Session: 7 days (registered users)
- Link to /checkin for existing users

---

## 2. Admin Panel Components

### 2.1 AdminHeader

**Purpose:** Staff panel header with quick actions

**Props:**
```typescript
interface AdminHeaderProps {
  staffName: string;
  onLogout: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🎵 SonicSavor — Staff Panel    John ● [Logout]│
└──────────────────────────────────────────────┘
```

---

### 2.2 QuickActions

**Purpose:** Generate OTP / Check-in buttons

**Props:**
```typescript
interface QuickActionsProps {
  onGenerateOTP: () => void;
  onCheckIn: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🔵 QUICK ACTIONS                           │
│                                              │
│  [ + Generate OTP ]   [ + Check In Booking ]│
└──────────────────────────────────────────────┘
```

**Colors:**
- Generate OTP button: #E85D04 (Burnt Orange)
- Check In button: #2EC4B6 (Teal)

---

### 2.3 OTPDisplay

**Purpose:** Show generated OTP to staff

**Props:**
```typescript
interface OTPDisplayProps {
  code: string;
  guestName: string;
  tableInfo: string;
  onDismiss: () => void;
  onCopy: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  ✅ OTP Generated!                          │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │                                      │   │
│  │        4 7 2 8 9 1                   │   │
│  │                                      │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  Guest: Walk-in Guest                       │
│  Table: Private Table 2                     │
│                                              │
│  [ Copy Code ]  [ Dismiss ]                 │
└──────────────────────────────────────────────┘
```

**Behavior:**
- Large, clear numbers
- Auto-copy to clipboard
- 10-minute countdown timer
- Dismiss after customer enters code

**Colors:**
- Code background: #1A1926 (Midnight Slate)
- Code text: #FFB703 (Golden Yellow)
- Timer text: #A7A4B8 (Muted Lavender)

---

### 2.4 BookingList

**Purpose:** Today's bookings

**Props:**
```typescript
interface BookingListProps {
  bookings: Booking[];
  onCheckIn: (bookingId: string) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  📋 TODAY'S BOOKINGS (3)                    │
│                                              │
│  19:00 — Sarah Chen — Private T2 — [Check In]│
│  19:30 — James Wilson — Squad T4 — [Check In]│
│  20:00 — Maria Garcia — Private T1 — [Check In]│
└──────────────────────────────────────────────┘
```

**Colors:**
- Background: #1A1926 (Midnight Slate)
- Text: #F5F3F0 (Warm White)
- Check In button: #2EC4B6 (Teal)

---

### 2.5 ActiveSessions

**Purpose:** Currently active sessions

**Props:**
```typescript
interface ActiveSessionsProps {
  sessions: Session[];
  onRevoke: (sessionToken: string) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🔒 ACTIVE SESSIONS (2)                     │
│                                              │
│  Table P2 — Sarah Chen — 472891 — [Revoke] │
│  Table P1 — Guest — 839201 — [Revoke]      │
└──────────────────────────────────────────────┘
```

**Colors:**
- Revoke button: #E63946 (Soft Red)

---

### 2.6 WalkInForm

**Purpose:** Generate OTP for walk-in customer

**Props:**
```typescript
interface WalkInFormProps {
  onSubmit: (data: { tableType: string; partySize: number; guestName: string }) => void;
  disabled?: boolean;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🚶 WALK-IN                                 │
│                                              │
│  Table Type: [Private ▼]                     │
│  Party Size: [4 ▼]                           │
│  Guest Name: [Walk-in Guest]                 │
│                                              │
│  [ Generate OTP ]                            │
└──────────────────────────────────────────────┘
```

---

## 3. Dashboard Components

### 3.1 DashboardHeader

**Purpose:** Main header with session info

**Props:**
```typescript
interface DashboardHeaderProps {
  guestName: string;
  tableInfo: string;
  timeRemaining: number; // minutes
  onLogout: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🎵 SonicSavor    Guest ● Private T2 [3:45] │
└──────────────────────────────────────────────┘
```

**Colors:**
- Timer (green): #2EC4B6 (Teal)
- Timer (warning): #FFB703 (Golden Yellow)
- Timer (danger): #E63946 (Soft Red)

---

### 3.2 QuickAccessCards

**Purpose:** Quick access to main features

**Props:**
```typescript
interface QuickAccessCardsProps {
  onNavigate: (page: "booking" | "menu" | "cart") => void;
  cartCount?: number;
}
```

**Visual:**
```
┌────────────────────┐  ┌────────────────────┐
│  📅 BOOK TABLE     │  │  🍽️ ORDER NOW      │
│                    │  │                    │
│  Find your         │  │  Browse menu       │
│  perfect seat      │  │  & order           │
└────────────────────┘  └────────────────────┘
```

**Colors:**
- Card background: #1A1926 (Midnight Slate)
- Card hover: #242334 (Lighter Slate)
- Icon color: #E85D04 (Burnt Orange)

---

### 3.3 TableAvailabilityWidget

**Purpose:** Quick view of table availability

**Props:**
```typescript
interface TableAvailabilityWidgetProps {
  availability: {
    family: { total: number; available: number };
    squad: { total: number; available: number };
    duo: { total: number; available: number };
    single: { total: number; available: number };
    private: { total: number; available: number };
  };
  onSelectType: (type: string) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🪑 TABLE AVAILABILITY TODAY                │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 👨‍👩‍👧‍👦 Family │ │ 🧑‍🤝‍🧑 Squad  │ │ 💑 Duo    │   │
│  │  3/5 free │ │  4/5 free│ │  2/4 free│   │
│  └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐                 │
│  │ 🧑 Single │ │ 🔒 Private│                 │
│  │  4/4 free │ │  1/4 free │                 │
│  └──────────┘ └──────────┘                 │
└──────────────────────────────────────────────┘
```

**Colors:**
- Available: #2EC4B6 (Teal)
- Limited: #FFB703 (Golden Yellow)
- Full: #E63946 (Soft Red)

---

## 4. Booking Components

### 4.1 DatePicker

**Purpose:** Select booking date

**Props:**
```typescript
interface DatePickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  📅 Select Date                             │
│                                              │
│  [ 14 Jul 2026 ▼ ]                          │
│                                              │
│  ┌─────┬─────┬─────┬─────┬─────┐           │
│  │ Mon │ Tue │ Wed │ Thu │ Fri │           │
│  ├─────┼─────┼─────┼─────┼─────┤           │
│  │  14 │  15 │  16 │  17 │  18 │           │
│  │ ●●● │     │     │     │     │           │
│  └─────┴─────┴─────┴─────┴─────┘           │
└──────────────────────────────────────────────┘
```

---

### 4.2 TimeSlotPicker

**Purpose:** Select booking time

**Props:**
```typescript
interface TimeSlotPickerProps {
  availableSlots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🕐 Select Time                             │
│                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ 18:00│ │ 19:00│ │ 20:00│ │ 21:00│      │
│  │  ✅  │ │      │ │      │ │      │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
└──────────────────────────────────────────────┘
```

---

### 4.3 PartySizeSelector

**Purpose:** Select number of guests

**Props:**
```typescript
interface PartySizeSelectorProps {
  selectedSize: number;
  onSelect: (size: number) => void;
  min?: number;
  max?: number;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  👥 Party Size                              │
│                                              │
│  [- ]  [ 4 ]  [ + ]                         │
└──────────────────────────────────────────────┘
```

---

### 4.4 TableCard

**Purpose:** Display table option

**Props:**
```typescript
interface TableCardProps {
  table: Table;
  isAvailable: boolean;
  isSelected: boolean;
  onSelect: (tableId: string) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│ 🔒 Private Table 2                          │
│ ⭐ Premium  •  Near window                  │
│ 👥 Up to 6  •  Soundproof                   │
│                                              │
│ 🟢 Available                                │
│                                              │
│ [ SELECT THIS TABLE ]                       │
└──────────────────────────────────────────────┘
```

**Colors:**
- Available: #2EC4B6 (Teal) border
- Selected: #E85D04 (Burnt Orange) border
- Unavailable: #E63946 (Soft Red) border

---

### 4.5 BookingConfirmation

**Purpose:** Show booking confirmation

**Props:**
```typescript
interface BookingConfirmationProps {
  booking: {
    confirmationCode: string;
    tableType: string;
    date: string;
    time: string;
    partySize: number;
  };
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  ✅ Booking Confirmed!                      │
│                                              │
│  ┌──────────────────────────────────────┐   │
│  │  SONIC-7X9K2M                        │   │
│  └──────────────────────────────────────┘   │
│                                              │
│  Private Table 2                            │
│  14 Jul 2026 • 19:00                        │
│  4 guests                                   │
│                                              │
│  Show this code when you arrive!            │
└──────────────────────────────────────────────┘
```

---

## 5. Menu Components

### 5.1 MenuCategory

**Purpose:** Menu category with items

**Props:**
```typescript
interface MenuCategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
    items: MenuItem[];
  };
  onAddToCart: (item: MenuItem) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  ── STARTERS ──                             │
│                                              │
│  ┌──────────┐  Mohinga                      │
│  │  🍜      │  Myanmar fish noodle soup     │
│  │          │  ⭐ 4.8  •  🌶️ Mild            │
│  └──────────┘  $8.50  [- 1 +]              │
└──────────────────────────────────────────────┘
```

---

### 5.2 MenuItem

**Purpose:** Individual menu item

**Props:**
```typescript
interface MenuItemProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  ┌──────────┐  Mohinga                      │
│  │  🍜      │  Myanmar fish noodle soup     │
│  │          │  ⭐ 4.8  •  🌶️ Mild            │
│  │          │  🥜 Contains: fish            │
│  └──────────┘                               │
│                                              │
│  $8.50                    [- 1 +]  or [+ Add]│
└──────────────────────────────────────────────┘
```

**Colors:**
- Price: #E85D04 (Burnt Orange)
- Rating stars: #FFB703 (Golden Yellow)
- Spice level: #E63946 (Soft Red)

---

### 5.3 CartSummary

**Purpose:** Mini cart summary in menu

**Props:**
```typescript
interface CartSummaryProps {
  items: CartItem[];
  total: number;
  onViewCart: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🛒 YOUR ORDER                  [View Cart] │
│  1x Mohinga         $8.50                   │
│  2x Risotto        $32.00                   │
│  ─────────────────────────                  │
│  Total:             $45.50                  │
└──────────────────────────────────────────────┘
```

---

### 5.4 MoodPairing

**Purpose:** Show mood-based recommendations

**Props:**
```typescript
interface MoodPairingProps {
  mood: string;
  playlist: string;
  items: MenuItem[];
  onPlayPlaylist: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🎵 MOOD PAIRING                           │
│                                              │
│  "Comforting" → Mohinga + Acoustic playlist │
│                                              │
│  [ 🎧 Play Playlist ]                       │
└──────────────────────────────────────────────┘
```

---

## 6. Cart Components

### 6.1 CartItem

**Purpose:** Individual cart item

**Props:**
```typescript
interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🍜 Mohinga                                 │
│  Myanmar fish noodle soup                   │
│                                              │
│  $8.50           [- 1 +]          [ 🗑️ ]   │
└──────────────────────────────────────────────┘
```

---

### 6.2 CartTotal

**Purpose:** Order total summary

**Props:**
```typescript
interface CartTotalProps {
  subtotal: number;
  tax: number;
  total: number;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  Subtotal:           $49.50                 │
│  Tax (10%):           $4.95                 │
│  ─────────────────────────                  │
│  Total:              $54.45                 │
└──────────────────────────────────────────────┘
```

---

### 6.3 PlaceOrderButton

**Purpose:** Submit order

**Props:**
```typescript
interface PlaceOrderButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  [ PLACE ORDER — $54.45 ]                   │
└──────────────────────────────────────────────┘
```

**Colors:**
- Background: #E85D04 (Burnt Orange)
- Text: #F5F3F0 (Warm White)

---

## 7. Exit Components

### 7.1 FeedbackForm

**Purpose:** Collect customer feedback

**Props:**
```typescript
interface FeedbackFormProps {
  onSubmit: (data: Feedback) => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  🙏 Thank you for dining!                   │
│                                              │
│  How was your experience?                    │
│  ⭐ ⭐ ⭐ ⭐ ☆                               │
│                                              │
│  ┌──────────────────────────────────┐       │
│  │  Tell us more (optional)         │       │
│  │  The food was amazing!           │       │
│  └──────────────────────────────────┘       │
│                                              │
│  [ Submit Feedback ]                         │
└──────────────────────────────────────────────┘
```

---

### 7.2 RegistrationUpsell

**Purpose:** Invite guest to create account

**Props:**
```typescript
interface RegistrationUpsellProps {
  onSubmit: (email: string, name: string) => void;
  onSkip: () => void;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  💜 Love SonicSavor? Create an account:     │
│                                              │
│  ✓ Save your favorite orders                │
│  ✓ Earn rewards points                      │
│  ✓ Faster checkout next time                │
│  ✓ Get personalized recommendations         │
│                                              │
│  ┌──────────────────────────────────┐       │
│  │ 📧 Email                         │       │
│  └──────────────────────────────────┘       │
│  ┌──────────────────────────────────┐       │
│  │ 👤 Name (optional)               │       │
│  └──────────────────────────────────┘       │
│                                              │
│  [ Create Account ]                          │
│                                              │
│  [ Maybe Next Time ]                         │
└──────────────────────────────────────────────┘
```

---

## 8. Shared UI Components

### 8.1 Button

**Purpose:** Reusable button component

**Props:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ghost" | "danger";
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
```

**Variants:**
- primary: #E85D04 background
- secondary: #1A1926 background with border
- ghost: transparent background
- danger: #E63946 background

---

### 8.2 Input

**Purpose:** Reusable input component

**Props:**
```typescript
interface InputProps {
  type: "text" | "email" | "tel" | "number";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  error?: string;
  disabled?: boolean;
}
```

---

### 8.3 Modal

**Purpose:** Overlay modal

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
```

---

### 8.4 Toast

**Purpose:** Notification toast

**Props:**
```typescript
interface ToastProps {
  type: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}
```

**Colors:**
- success: #2EC4B6 (Teal)
- error: #E63946 (Soft Red)
- info: #9D4EDD (Deep Purple)

---

## 9. Layout Components

### 9.1 Header

**Purpose:** App header (post-login)

**Props:**
```typescript
interface HeaderProps {
  guestName: string;
  timeRemaining?: number;
  onLogout: () => void;
}
```

---

### 9.2 BottomNav

**Purpose:** Mobile bottom navigation

**Props:**
```typescript
interface BottomNavProps {
  activePage: "dashboard" | "booking" | "menu" | "cart";
  onNavigate: (page: string) => void;
  cartCount?: number;
}
```

**Visual:**
```
┌──────────────────────────────────────────────┐
│  📅 Book  │  🍽️ Menu  │  🛒 Cart (3)  │ 👤 │
└──────────────────────────────────────────────┘
```

---

## 10. Color Reference

| Role | Hex | Usage |
|------|-----|-------|
| Primary | #E85D04 | CTAs, active states |
| Secondary | #FFB703 | Highlights, stars |
| Accent | #9D4EDD | Music elements |
| Background | #0F0E17 | Main background |
| Surface | #1A1926 | Cards, inputs |
| Surface Elevated | #242334 | Hover states |
| Text Primary | #F5F3F0 | Headings |
| Text Secondary | #A7A4B8 | Labels |
| Success | #2EC4B6 | Available, confirmations |
| Error | #E63946 | Errors, unavailable |

---

## 11. Component Count Summary

| Section | Components | Count |
|---------|------------|-------|
| Landing | HeroSection, EmailInput, AccessCodeEntry | 3 |
| Admin | AdminHeader, QuickActions, OTPDisplay, BookingList, ActiveSessions, WalkInForm | 6 |
| Dashboard | DashboardHeader, QuickAccessCards, TableAvailabilityWidget | 3 |
| Booking | DatePicker, TimeSlotPicker, PartySizeSelector, TableCard, BookingConfirmation | 5 |
| Menu | MenuCategory, MenuItem, CartSummary, MoodPairing | 4 |
| Cart | CartItem, CartTotal, PlaceOrderButton | 3 |
| Exit | FeedbackForm, RegistrationUpsell | 2 |
| Shared | Button, Input, Modal, Toast | 4 |
| Layout | Header, BottomNav | 2 |
| **Total** | | **32** |
