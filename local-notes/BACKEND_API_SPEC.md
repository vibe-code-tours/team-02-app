# SonicSavor — Backend API Specification

> For: Backend Developer
> Version: 2.0
> Date: 14 Jul 2026

---

## Overview

SonicSavor is a restaurant web app with:
- **Staff-generated OTP authentication** (no email required)
- **Admin panel** for staff to manage bookings and generate OTPs
- **Table booking system** (22 tables, 5 types)
- **Menu ordering** with mood-based recommendations
- **Session management** (4-hour guest sessions)

**Tech Stack:**
- Next.js 16 API Routes (App Router)
- TypeScript
- In-memory storage (for MVP) → upgrade to SQLite/PostgreSQL later

---

## Authentication Flow (Updated)

```
┌──────────────────────────────────────────────────────────────┐
│  TWO SCENARIOS:                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  1. WALK-IN (No booking)                                    │
│     Customer arrives → Staff generates OTP in admin panel    │
│     → Staff gives code to customer → Customer enters code    │
│                                                              │
│  2. ONLINE BOOKING (Has reservation)                        │
│     Customer booked online → Staff sees booking in admin     │
│     → Staff clicks "Check In" → System generates OTP        │
│     → Staff gives code to customer → Customer enters code    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Key Points:**
- Staff generates OTP (NOT email-based)
- OTP displayed on staff screen
- Staff verbally gives code to customer (or shows screen)
- Customer enters code on website to access service
- No email required for basic access

---

## 1. Admin Panel API (Staff)

### 1.1 Generate OTP (Walk-in Customer)

```
POST /api/admin/generate-otp
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Request:**
```json
{
  "tableType": "private",
  "partySize": 4,
  "guestName": "Walk-in Guest",
  "guestEmail": null
}
```

**Response (201):**
```json
{
  "success": true,
  "otp": {
    "code": "472891",
    "tableId": "P2",
    "tableType": "private",
    "expiresAt": "2026-07-14T18:00:00Z",
    "sessionToken": "abc123xyz"
  },
  "message": "Show this code to customer"
}
```

**Business Logic:**
- Find available table matching type + party size
- Generate 6-digit OTP code
- Create session with 4-hour expiry
- Link OTP to table assignment
- Return code for staff to show customer

---

### 1.2 Check-In Booking (Online Reservation)

```
POST /api/admin/check-in
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Request:**
```json
{
  "bookingId": "BK-20260714-P1"
}
```

**Response (200):**
```json
{
  "success": true,
  "otp": {
    "code": "839201",
    "tableId": "P1",
    "tableType": "private",
    "booking": {
      "id": "BK-20260714-P1",
      "guestName": "Sarah Chen",
      "partySize": 4,
      "occasion": "date_night",
      "specialRequests": "Anniversary dinner"
    },
    "expiresAt": "2026-07-14T18:00:00Z",
    "sessionToken": "def456abc"
  },
  "message": "Guest checked in. Show this code to customer."
}
```

**Business Logic:**
- Find booking by ID
- Mark booking as "checked-in"
- Generate OTP code
- Create session with booking preferences loaded
- Return code + booking details for staff verification

---

### 1.3 Get Today's Bookings

```
GET /api/admin/bookings?date=2026-07-14
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Response (200):**
```json
{
  "date": "2026-07-14",
  "bookings": [
    {
      "id": "BK-20260714-P1",
      "time": "19:00",
      "tableId": "P1",
      "tableType": "private",
      "guestName": "Sarah Chen",
      "partySize": 4,
      "status": "reserved",
      "occasion": "date_night"
    },
    {
      "id": "BK-20260714-S4",
      "time": "19:30",
      "tableId": "S4",
      "tableType": "squad",
      "guestName": "James Wilson",
      "partySize": 4,
      "status": "reserved",
      "occasion": "casual"
    }
  ],
  "summary": {
    "total": 3,
    "reserved": 2,
    "checkedIn": 1,
    "completed": 0
  }
}
```

---

### 1.4 Get Active Sessions

```
GET /api/admin/sessions
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Response (200):**
```json
{
  "sessions": [
    {
      "sessionToken": "abc123xyz",
      "tableId": "P2",
      "tableType": "private",
      "guestName": "Walk-in Guest",
      "otpCode": "472891",
      "startedAt": "2026-07-14T17:00:00Z",
      "expiresAt": "2026-07-14T21:00:00Z",
      "status": "active",
      "totalSpent": 54.45
    }
  ],
  "activeCount": 2,
  "totalSessionsToday": 8
}
```

---

### 1.5 Revoke Session

```
POST /api/admin/revoke
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Request:**
```json
{
  "sessionToken": "abc123xyz",
  "reason": "Customer left"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Session revoked successfully"
}
```

---

### 1.6 Get Table Availability (Admin View)

```
GET /api/admin/tables?date=2026-07-14
Headers: { "Authorization": "Bearer <adminToken>" }
```

**Response (200):**
```json
{
  "date": "2026-07-14",
  "tables": [
    {
      "id": "P1",
      "type": "private",
      "capacity": { "min": 2, "max": 6 },
      "status": "booked",
      "bookingId": "BK-20260714-P1",
      "guestName": "Sarah Chen",
      "time": "19:00"
    },
    {
      "id": "P2",
      "type": "private",
      "capacity": { "min": 2, "max": 6 },
      "status": "available",
      "bookingId": null,
      "guestName": null,
      "time": null
    }
  ],
  "summary": {
    "total": 22,
    "available": 18,
    "booked": 3,
    "occupied": 1
  }
}
```

---

## 2. Customer Authentication (Enter OTP)

### 2.1 Verify OTP (Customer Entry)

```
POST /api/auth/verify-otp
```

**Request:**
```json
{
  "code": "472891"
}
```

**Response (200):**
```json
{
  "success": true,
  "sessionToken": "abc123xyz",
  "session": {
    "tableId": "P2",
    "tableType": "private",
    "guestName": "Walk-in Guest",
    "expiresAt": "2026-07-14T21:00:00Z",
    "preferences": null
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid or expired code"
}
```

**Business Logic:**
- Verify code matches an active OTP
- Check OTP hasn't expired
- Return session token + table assignment
- If online booking → load customer preferences
- Delete used OTP (one-time use)

---

### 2.2 Get Session

```
GET /api/auth/session
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Response (200):**
```json
{
  "authenticated": true,
  "session": {
    "tableId": "P2",
    "tableType": "private",
    "guestName": "Sarah Chen",
    "expiresAt": "2026-07-14T21:00:00Z",
    "preferences": {
      "occasion": "date_night",
      "dietaryRestrictions": ["vegetarian"],
      "specialRequests": "Anniversary dinner"
    },
    "totalSpent": 54.45
  }
}
```

---

### 2.3 Logout

```
POST /api/auth/logout
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 3. Online Booking System (Customer)

### 3.1 Create Booking

```
POST /api/bookings
```

**Request:**
```json
{
  "tableType": "private",
  "date": "2026-07-14",
  "time": "19:00",
  "partySize": 4,
  "guestName": "Sarah Chen",
  "guestEmail": "sarah@example.com",
  "occasion": "date_night",
  "dietaryRestrictions": ["vegetarian"],
  "specialRequests": "Anniversary dinner, window seat preferred"
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "id": "BK-20260714-P1",
    "confirmationCode": "SONIC-7X9K2M",
    "tableType": "private",
    "date": "2026-07-14",
    "time": "19:00",
    "partySize": 4,
    "status": "confirmed",
    "guestName": "Sarah Chen",
    "message": "Your table is reserved! Show this code when you arrive."
  }
}
```

**Business Logic:**
- Email is required for booking confirmation
- Send confirmation email via Resend API
- Store email for future updates

---

### 3.2 Get Booking by Confirmation Code

```
GET /api/bookings/SONIC-7X9K2M
```

**Response (200):**
```json
{
  "booking": {
    "id": "BK-20260714-P1",
    "confirmationCode": "SONIC-7X9K2M",
    "tableType": "private",
    "date": "2026-07-14",
    "time": "19:00",
    "partySize": 4,
    "status": "confirmed",
    "guestName": "Sarah Chen"
  }
}
```

---

## 4. Table System

### Table Configuration (22 tables)

```typescript
// 22 Tables Total
const TABLES = [
  // Family (5 tables, 6-8 people)
  { id: "F1", type: "family", capacity: { min: 6, max: 8 }, features: ["large", "window"], location: "main hall" },
  { id: "F2", type: "family", capacity: { min: 6, max: 8 }, features: ["large", "private corner"], location: "main hall" },
  { id: "F3", type: "family", capacity: { min: 6, max: 8 }, features: ["large"], location: "main hall" },
  { id: "F4", type: "family", capacity: { min: 6, max: 8 }, features: ["large", "kids friendly"], location: "patio" },
  { id: "F5", type: "family", capacity: { min: 6, max: 8 }, features: ["large"], location: "patio" },

  // Squad (5 tables, 4 people)
  { id: "S1", type: "squad", capacity: { min: 3, max: 4 }, features: ["central"], location: "main hall" },
  { id: "S2", type: "squad", capacity: { min: 3, max: 4 }, features: ["central"], location: "main hall" },
  { id: "S3", type: "squad", capacity: { min: 3, max: 4 }, features: ["near bar"], location: "bar area" },
  { id: "S4", type: "squad", capacity: { min: 3, max: 4 }, features: ["booth"], location: "main hall" },
  { id: "S5", type: "squad", capacity: { min: 3, max: 4 }, features: ["booth"], location: "main hall" },

  // Duo (4 tables, 2 people)
  { id: "D1", type: "duo", capacity: { min: 2, max: 2 }, features: ["window"], location: "main hall" },
  { id: "D2", type: "duo", capacity: { min: 2, max: 2 }, features: ["candle"], location: "main hall" },
  { id: "D3", type: "duo", capacity: { min: 2, max: 2 }, features: ["outdoor"], location: "patio" },
  { id: "D4", type: "duo", capacity: { min: 2, max: 2 }, features: ["quiet"], location: "corner" },

  // Single (4 tables, 1 person)
  { id: "C1", type: "single", capacity: { min: 1, max: 1 }, features: ["corner", "power outlet"], location: "corner" },
  { id: "C2", type: "single", capacity: { min: 1, max: 1 }, features: ["corner", "window"], location: "corner" },
  { id: "C3", type: "single", capacity: { min: 1, max: 1 }, features: ["corner"], location: "corner" },
  { id: "C4", type: "single", capacity: { min: 1, max: 1 }, features: ["corner", "quiet"], location: "corner" },

  // Private (4 tables, 2-6 people) ← FOCUS
  { id: "P1", type: "private", capacity: { min: 2, max: 6 }, features: ["soundproof", "dedicated speaker", "dimmer"], location: "private wing" },
  { id: "P2", type: "private", capacity: { min: 2, max: 6 }, features: ["soundproof", "dedicated speaker", "window"], location: "private wing" },
  { id: "P3", type: "private", capacity: { min: 2, max: 6 }, features: ["soundproof", "premium menu", "smart tablet"], location: "private wing" },
  { id: "P4", type: "private", capacity: { min: 2, max: 6 }, features: ["soundproof", "premium menu", "dimmer"], location: "private wing" },
];
```

---

### 4.1 Get Table Availability

```
GET /api/tables?date=2026-07-14&partySize=4
```

**Response (200):**
```json
{
  "date": "2026-07-14",
  "tables": [
    {
      "id": "P1",
      "type": "private",
      "capacity": { "min": 2, "max": 6 },
      "features": ["soundproof", "dedicated speaker", "dimmer"],
      "location": "private wing",
      "available": true,
      "availableSlots": ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"]
    }
  ],
  "summary": {
    "total": 22,
    "available": 18,
    "byType": {
      "family": { "total": 5, "available": 4 },
      "squad": { "total": 5, "available": 5 },
      "duo": { "total": 4, "available": 3 },
      "single": { "total": 4, "available": 4 },
      "private": { "total": 4, "available": 2 }
    }
  }
}
```

---

## 5. Menu System

### 5.1 Get Menu

```
GET /api/menu
```

**Response (200):**
```json
{
  "categories": [
    {
      "id": "starters",
      "name": "Starters",
      "icon": "🥗",
      "items": [
        {
          "id": "ST001",
          "name": "Mohinga",
          "description": "Traditional Myanmar fish noodle soup",
          "price": 8.50,
          "cuisine": "Myanmar",
          "course": "starter",
          "moodTags": ["comforting", "nostalgic", "warming"],
          "dietary": ["gluten-free"],
          "spiceLevel": 1,
          "image": "/images/mohinga.jpg",
          "available": true
        }
      ]
    }
  ],
  "moodPairings": [
    {
      "mood": "comforting",
      "playlist": "Acoustic Comfort",
      "items": ["ST001", "MN003", "DS002"]
    }
  ]
}
```

---

## 6. Order System

### 6.1 Create Order

```
POST /api/orders
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "items": [
    { "menuItemId": "ST001", "quantity": 1 },
    { "menuItemId": "MN003", "quantity": 2 },
    { "menuItemId": "DS002", "quantity": 1 }
  ],
  "mood": "cozy evening",
  "specialInstructions": "No nuts in dessert please"
}
```

**Response (201):**
```json
{
  "success": true,
  "order": {
    "id": "ORD-20260714-001",
    "status": "received",
    "items": [
      { "name": "Mohinga", "quantity": 1, "price": 8.50 },
      { "name": "Mushroom Risotto", "quantity": 2, "price": 16.00 },
      { "name": "Apple Crumble", "quantity": 1, "price": 9.00 }
    ],
    "subtotal": 49.50,
    "tax": 4.95,
    "total": 54.45,
    "estimatedReady": "2026-07-14T19:25:00Z",
    "playlistQuery": "cozy evening acoustic playlist"
  }
}
```

---

### 6.2 Get Order Status

```
GET /api/orders/:orderId
```

**Response (200):**
```json
{
  "id": "ORD-20260714-001",
  "status": "cooking",
  "statusHistory": [
    { "status": "received", "at": "2026-07-14T19:00:00Z" },
    { "status": "preparing", "at": "2026-07-14T19:02:00Z" },
    { "status": "cooking", "at": "2026-07-14T19:05:00Z" }
  ],
  "estimatedReady": "2026-07-14T19:25:00Z",
  "progress": 60
}
```

---

## 7. Feedback System

### 7.1 Submit Feedback

```
POST /api/feedback
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "overallRating": 5,
  "foodQuality": 5,
  "ambianceRating": 4,
  "playlistMatch": 5,
  "comments": "Amazing experience! The music pairing was perfect.",
  "wouldRecommend": true,
  "wouldReturn": true
}
```

**Response (201):**
```json
{
  "success": true,
  "feedbackId": "FB-20260714-001",
  "message": "Thank you for your feedback!"
}
```

---

### 7.2 Upgrade to Registered User

```
POST /api/auth/register
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "email": "sarah@example.com",
  "name": "Sarah Chen"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "USR-001",
    "email": "sarah@example.com",
    "name": "Sarah Chen",
    "isRegistered": true,
    "registeredAt": "2026-07-14T19:30:00Z"
  },
  "benefits": [
    "Order history saved",
    "Favorite dishes tracked",
    "Faster checkout next time",
    "Rewards points: +100"
  ]
}
```

**Business Logic:**
- Registration is email-based (standard web flow)
- Email must be unique
- Send welcome email via Resend API
- Link email to existing guest session

---

## 8. Data Models (TypeScript)

```typescript
// ── Auth ──────────────────────────────────────────
interface OTPRecord {
  id: string;
  code: string;
  tableId: string;
  sessionToken: string;
  guestName: string;
  bookingId?: string; // null for walk-ins
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
  generatedBy: string; // admin staff ID
}

interface Session {
  token: string;
  tableId: string;
  tableType: string;
  guestName: string;
  bookingId?: string;
  createdAt: Date;
  expiresAt: Date; // 4 hours from creation
}

interface User {
  id: string;
  email: string; // Primary identifier (email-based registration)
  name?: string;
  isRegistered: boolean;
  createdAt: Date;
  lastVisitAt: Date;
}

interface Admin {
  id: string;
  username: string;
  role: "admin" | "staff";
  createdAt: Date;
}

// ── Tables ────────────────────────────────────────
interface Table {
  id: string;
  type: "family" | "squad" | "duo" | "single" | "private";
  capacity: { min: number; max: number };
  features: string[];
  location: string;
}

interface Booking {
  id: string;
  confirmationCode: string;
  tableType: string;
  date: string;
  time: string;
  partySize: number;
  status: "confirmed" | "checked-in" | "completed" | "cancelled";
  guestName: string;
  guestEmail: string; // Primary contact for booking
  occasion?: string;
  dietaryRestrictions?: string[];
  specialRequests?: string;
  createdAt: Date;
  checkedInAt?: Date;
}

// ── Menu ──────────────────────────────────────────
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  cuisine: string;
  course: "starter" | "main" | "dessert" | "drink";
  moodTags: string[];
  dietary: string[];
  spiceLevel: number;
  image: string;
  available: boolean;
  allergens: string[];
  preparationTime: number; // minutes
}

// ── Orders ────────────────────────────────────────
interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  sessionToken: string;
  items: OrderItem[];
  status: "received" | "preparing" | "cooking" | "ready" | "served";
  subtotal: number;
  tax: number;
  total: number;
  mood?: string;
  specialInstructions?: string;
  playlistQuery?: string;
  estimatedReady: Date;
  createdAt: Date;
}

// ── Feedback ──────────────────────────────────────
interface Feedback {
  id: string;
  sessionToken: string;
  overallRating: number;
  foodQuality: number;
  ambianceRating: number;
  playlistMatch: number;
  comments: string;
  wouldRecommend: boolean;
  wouldReturn: boolean;
  createdAt: Date;
}
```

---

## 9. In-Memory Storage (MVP)

```typescript
// src/lib/storage.ts
export const storage = {
  otps: new Map<string, OTPRecord>(),
  sessions: new Map<string, Session>(),
  admins: new Map<string, Admin>(),
  users: new Map<string, User>(),
  tables: new Map<string, Table>(),
  bookings: new Map<string, Booking>(),
  orders: new Map<string, Order>(),
  feedbacks: new Map<string, Feedback>(),
};

// Cleanup expired OTPs every minute
setInterval(() => {
  const now = new Date();
  for (const [key, otp] of storage.otps) {
    if (otp.expiresAt < now || otp.used) {
      storage.otps.delete(key);
    }
  }
}, 60 * 1000);
```

---

## 10. API Response Format

All responses follow this format:

```typescript
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

---

## 11. Complete Flow Diagrams

### Walk-in Customer Flow

```
┌─────────────────────────────────────────────────────────────┐
│  STAFF PANEL                                                │
├─────────────────────────────────────────────────────────────┤
│  1. Staff: "Welcome! How many people?"                      │
│  2. Customer: "4 people, private table"                     │
│  3. Staff selects: Private + 4 people                       │
│  4. Staff clicks: [Generate OTP]                            │
│  5. System shows: "Code: 472891"                            │
│  6. Staff: "Here's your access code"                        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CUSTOMER                                                   │
├─────────────────────────────────────────────────────────────┤
│  7. Customer opens website                                  │
│  8. Customer enters code: 472891                            │
│  9. System verifies → Shows: "Welcome! Ready to order?"    │
│  10. Customer browses menu + orders food                    │
│  11. Customer enjoys meal + music                           │
│  12. Customer leaves → Feedback → Maybe register            │
└─────────────────────────────────────────────────────────────┘
```

### Online Booking Flow

```
┌─────────────────────────────────────────────────────────────┐
│  CUSTOMER (at home, before visit)                           │
├─────────────────────────────────────────────────────────────┤
│  1. Customer opens website                                  │
│  2. Customer selects: Private table, 4 people, Jul 14 7pm  │
│  3. Customer fills: Name, email, occasion, preferences     │
│  4. System confirms: "Booking confirmed! Code: SONIC-7X9K" │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  STAFF PANEL (on visit day)                                 │
├─────────────────────────────────────────────────────────────┤
│  5. Staff sees: "Sarah Chen - 19:00 - Private Table 2"     │
│  6. Staff clicks: [Check In]                                │
│  7. System generates OTP: "Code: 839201"                    │
│  8. Staff: "Welcome Sarah! Here's your access code"        │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  CUSTOMER                                                   │
├─────────────────────────────────────────────────────────────┤
│  9. Customer enters code: 839201                            │
│  10. System loads preferences: "Anniversary dinner"         │
│  11. Customer sees personalized welcome message             │
│  12. Customer orders food                                   │
│  13. Customer leaves → Feedback → Maybe register            │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. Deployment Notes

- **MVP:** Use in-memory storage (data lost on restart)
- **Production:** Add SQLite or PostgreSQL
- **Admin Auth:** Add JWT for admin panel security
- **Security:** Add rate limiting, CORS, helmet
- **Session:** Consider JWT for scalability

---

## Questions?

Contact the frontend team for:
- UI component specs
- Color system (see `color-system.md`)
- Table booking UI (see `table-booking-system.md`)
