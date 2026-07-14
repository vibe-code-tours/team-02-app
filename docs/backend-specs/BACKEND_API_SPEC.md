# SonicSavor — Backend API Specification

> For: Backend Developer
> Version: 1.0
> Date: 14 Jul 2026

---

## Overview

SonicSavor is a restaurant web app with:
- **OTP-based authentication** (no passwords)
- **Table booking system** (22 tables, 5 types)
- **Menu ordering** with mood-based recommendations
- **Session management** (4-hour guest sessions)

**Tech Stack:**
- Next.js 16 API Routes (App Router)
- TypeScript
- In-memory storage (for MVP) → upgrade to SQLite/PostgreSQL later

---

## 1. Authentication System (OTP)

### 1.1 Send OTP

```
POST /api/auth/send-otp
```

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "OTP sent to email",
  "expiresIn": 600
}
```

**Response (400):**
```json
{
  "error": "Valid email is required"
}
```

**Business Logic:**
- Generate 6-digit OTP code
- Store in memory: `{ email, code, expiresAt }`
- OTP expires in 10 minutes
- Rate limit: 1 OTP per email per 60 seconds
- **Send OTP via email using Resend API**

**Email Service Integration:**
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'SonicSavor <otp@sonicsavor.com>',
  to: email,
  subject: 'Your SonicSavor Access Code',
  html: `
    <h1>Your Access Code</h1>
    <p style="font-size: 24px; font-weight: bold;">${code}</p>
    <p>This code expires in 10 minutes.</p>
    <p>If you didn't request this, ignore this email.</p>
  `
});
```

**Required Environment Variable:**
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

---

### 1.2 Verify OTP

```
POST /api/auth/verify-otp
```

**Request:**
```json
{
  "email": "user@example.com",
  "code": "472891"
}
```

**Response (200):**
```json
{
  "success": true,
  "sessionToken": "abc123xyz",
  "isNewUser": true,
  "expiresAt": "2026-07-14T18:00:00Z"
}
```

**Response (401):**
```json
{
  "error": "Invalid or expired OTP"
}
```

**Business Logic:**
- Verify code matches and hasn't expired
- Check if email exists in user database
  - If yes → `isNewUser: false`, return existing user data
  - If no → `isNewUser: true`, create temporary guest session
- Generate session token (JWT or random string)
- Store session with 4-hour expiry
- Delete used OTP (one-time use)

---

### 1.3 Get Session

```
GET /api/auth/session
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Response (200):**
```json
{
  "authenticated": true,
  "user": {
    "email": "user@example.com",
    "name": "Sarah Chen",
    "isRegistered": true,
    "sessionExpiresAt": "2026-07-14T18:00:00Z"
  }
}
```

**Response (401):**
```json
{
  "authenticated": false,
  "error": "Invalid or expired session"
}
```

---

### 1.4 Logout

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

**Business Logic:**
- Delete session from store
- Invalidate token

---

## 2. Table Booking System

### Table Configuration

```typescript
interface Table {
  id: string;
  type: "family" | "squad" | "duo" | "single" | "private";
  capacity: { min: number; max: number };
  features: string[];
  location: string;
}

// 22 Tables Total
const TABLES: Table[] = [
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

### 2.1 Get Table Availability

```
GET /api/tables?date=2026-07-14&partySize=4
```

**Query Parameters:**
- `date` (required): YYYY-MM-DD
- `partySize` (optional): Number of guests

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
    },
    {
      "id": "P2",
      "type": "private",
      "capacity": { "min": 2, "max": 6 },
      "features": ["soundproof", "dedicated speaker", "window"],
      "location": "private wing",
      "available": true,
      "availableSlots": ["10:00", "12:00", "18:00", "20:00"]
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

### 2.2 Get Available Time Slots

```
GET /api/tables/slots?tableId=P1&date=2026-07-14
```

**Response (200):**
```json
{
  "tableId": "P1",
  "date": "2026-07-14",
  "slots": [
    { "time": "10:00", "available": true },
    { "time": "11:00", "available": false, "bookedBy": "guest_abc" },
    { "time": "12:00", "available": true },
    { "time": "13:00", "available": true },
    { "time": "14:00", "available": true },
    { "time": "15:00", "available": false, "bookedBy": "guest_def" },
    { "time": "16:00", "available": true },
    { "time": "17:00", "available": true },
    { "time": "18:00", "available": true },
    { "time": "19:00", "available": true },
    { "time": "20:00", "available": true },
    { "time": "21:00", "available": true }
  ]
}
```

---

### 2.3 Create Booking

```
POST /api/tables/book
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "tableId": "P1",
  "date": "2026-07-14",
  "time": "19:00",
  "partySize": 4,
  "guestName": "Sarah Chen",
  "guestEmail": "sarah@example.com",
  "occasion": "date_night",
  "specialRequests": "Anniversary dinner, window seat preferred"
}
```

**Response (201):**
```json
{
  "success": true,
  "booking": {
    "id": "BK-20260714-P1",
    "tableId": "P1",
    "tableType": "private",
    "date": "2026-07-14",
    "time": "19:00",
    "partySize": 4,
    "status": "confirmed",
    "guestName": "Sarah Chen",
    "expiresAt": "2026-07-14T19:30:00Z"
  }
}
```

**Response (409):**
```json
{
  "error": "Table not available for selected time slot"
}
```

**Business Logic:**
- Verify session token
- Check table availability for date + time
- Create booking record
- Mark table as reserved
- Booking expires if not checked in within 30 minutes

---

## 3. Menu System

### 3.1 Get Menu

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
    },
    {
      "id": "mains",
      "name": "Main Courses",
      "icon": "🍖",
      "items": [...]
    },
    {
      "id": "desserts",
      "name": "Desserts",
      "icon": "🍰",
      "items": [...]
    },
    {
      "id": "drinks",
      "name": "Drinks",
      "icon": "🍷",
      "items": [...]
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

### 3.2 Get Menu Item

```
GET /api/menu/items/:id
```

**Response (200):**
```json
{
  "id": "ST001",
  "name": "Mohinga",
  "description": "Traditional Myanmar fish noodle soup with crispy fritters",
  "price": 8.50,
  "cuisine": "Myanmar",
  "course": "starter",
  "moodTags": ["comforting", "nostalgic", "warming"],
  "dietary": ["gluten-free"],
  "spiceLevel": 1,
  "image": "/images/mohinga.jpg",
  "available": true,
  "allergens": ["fish", "shellfish"],
  "preparationTime": 15
}
```

---

## 4. Order System

### 4.1 Create Order

```
POST /api/orders
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "bookingId": "BK-20260714-P1",
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
    "bookingId": "BK-20260714-P1",
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

### 4.2 Get Order Status

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

### 4.3 Get Orders for Booking

```
GET /api/orders?bookingId=BK-20260714-P1
```

**Response (200):**
```json
{
  "orders": [
    {
      "id": "ORD-20260714-001",
      "status": "cooking",
      "total": 54.45
    }
  ],
  "totalSpent": 54.45
}
```

---

## 5. Feedback System

### 5.1 Submit Feedback

```
POST /api/feedback
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "bookingId": "BK-20260714-P1",
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

### 5.2 Upgrade to Registered User

```
POST /api/auth/register
Headers: { "Authorization": "Bearer <sessionToken>" }
```

**Request:**
```json
{
  "name": "Sarah Chen",
  "phone": "+95 9 123 456 789",
  "password": "optional_for_future"
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

---

## 6. Data Models (TypeScript)

```typescript
// ── Auth ──────────────────────────────────────────
interface OTPRecord {
  email: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
}

interface Session {
  token: string;
  email: string;
  createdAt: Date;
  expiresAt: Date; // 4 hours from creation
}

interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  isRegistered: boolean;
  createdAt: Date;
  lastVisitAt: Date;
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
  tableId: string;
  sessionToken: string;
  date: string;
  time: string;
  partySize: number;
  status: "reserved" | "checked-in" | "completed" | "cancelled";
  guestName: string;
  guestEmail: string;
  occasion?: string;
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
  bookingId: string;
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
  bookingId: string;
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

## 7. In-Memory Storage (MVP)

```typescript
// src/lib/storage.ts
export const storage = {
  otps: new Map<string, OTPRecord>(),
  sessions: new Map<string, Session>(),
  users: new Map<string, User>(),
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

## 8. API Response Format

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

## 9. Authentication Flow

```
┌─────────────────────────────────────────────────┐
│  Client (Browser)                               │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. User enters email                          │
│     ↓                                          │
│  2. POST /api/auth/send-otp                    │
│     ↓                                          │
│  3. User receives OTP (console for MVP)        │
│     ↓                                          │
│  4. User enters OTP                            │
│     ↓                                          │
│  5. POST /api/auth/verify-otp                  │
│     ↓                                          │
│  6. Receive sessionToken                       │
│     ↓                                          │
│  7. Store token in localStorage                │
│     ↓                                          │
│  8. All future requests include token          │
│     ↓                                          │
│  9. POST /api/auth/logout when done            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 10. Deployment Notes

- **MVP:** Use in-memory storage (data lost on restart)
- **Production:** Add SQLite or PostgreSQL
- **Email:** Integrate Resend or SendGrid for real OTP delivery
- **Security:** Add rate limiting, CORS, helmet
- **Session:** Consider JWT for scalability

---

## Questions?

Contact the frontend team for:
- UI component specs
- Color system (see `color-system.md`)
- Table booking UI (see `table-booking-system.md`)
