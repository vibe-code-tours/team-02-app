# Email Service Setup (Resend)

## Why Resend?
- Free tier: 100 emails/day, 3000/month
- Easy to set up (5 minutes)
- Good for MVP
- No credit card required

---

## Setup Steps:

### 1. Create Resend Account
Go to: https://resend.com
Sign up with GitHub or email

### 2. Get API Key
- Dashboard → API Keys → Create API Key
- Copy the key (starts with `re_`)

### 3. Add to .env
```bash
# In sonicsavor/.env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

### 4. Install Package
```bash
cd sonicsavor
npm install resend
```

### 5. Verify Domain (Optional for Production)
- Resend Dashboard → Domains → Add Domain
- Add DNS records to your domain
- This lets you send from `otp@sonicsavor.com`

For MVP: Use `onboarding@resend.dev` (Resend's test domain)

---

## Code Example:

```typescript
// src/app/api/auth/send-otp/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();
  
  // Generate 6-digit OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store OTP (in-memory for MVP)
  otpStore.set(email, {
    code,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000)
  });
  
  // Send email
  await resend.emails.send({
    from: 'SonicSavor <onboarding@resend.dev>',
    to: email,
    subject: 'Your SonicSavor Access Code',
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto;">
        <h1 style="color: #E85D04;">Your Access Code</h1>
        <div style="background: #1A1926; color: #F5F3F0; padding: 20px; border-radius: 8px; text-align: center;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
        </div>
        <p style="color: #A7A4B8; font-size: 14px;">This code expires in 10 minutes.</p>
      </div>
    `
  });
  
  return Response.json({ success: true });
}
```

---

## Testing:

1. Run the app: `npm run dev`
2. Enter your email on the landing page
3. Check your email inbox (and spam folder)
4. You should receive the OTP code!

---

## Troubleshooting:

| Issue | Solution |
|-------|----------|
| Email not received | Check spam folder |
| "Invalid API key" | Check `.env` file |
| "Rate limited" | Wait 60 seconds between requests |
| "Domain not verified" | Use `onboarding@resend.dev` for testing |

---

## Cost:

| Plan | Price | Emails |
|------|-------|--------|
| Free | $0 | 100/day, 3000/month |
| Pro | $20/month | 50,000/month |
| Enterprise | Custom | Unlimited |

For MVP: **Free plan is enough**
