# SonicSavor Authentication Flow (v2.0)

## Overview

SonicSavor uses **staff-generated OTP** authentication. No email required for basic access.

---

## Two Scenarios

### 1. Walk-in Customer (No Booking)

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

### 2. Online Booking (Has Reservation)

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

## Key Points

| Aspect | Details |
|--------|---------|
| **Who generates OTP?** | Staff (via admin panel) |
| **How does customer get it?** | Staff shows screen or tells verbally |
| **Is email required?** | No for access, Yes for registration |
| **Registration method** | Email-based (standard web flow) |
| **Session duration** | 4 hours |
| **OTP expiry** | 10 minutes (if not used) |

---

## API Endpoints

### Staff Endpoints (Admin Panel)
- `POST /api/admin/generate-otp` — Generate OTP for walk-in
- `POST /api/admin/check-in` — Check in booking + generate OTP
- `GET /api/admin/bookings` — View today's bookings
- `GET /api/admin/sessions` — View active sessions
- `POST /api/admin/revoke` — Revoke a session

### Customer Endpoints
- `POST /api/auth/verify-otp` — Enter OTP code
- `GET /api/auth/session` — Check session
- `POST /api/auth/logout` — End session

### Booking Endpoints
- `POST /api/bookings` — Create online booking
- `GET /api/bookings/:code` — Get booking by confirmation code

---

## Security Notes

- OTP is one-time use only
- OTP expires after 10 minutes
- Session expires after 4 hours
- Staff authentication required for admin endpoints
- All session data is encrypted
