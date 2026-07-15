// In-memory OTP store
// In production, use Redis or database for persistence
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export function setOtp(email: string, code: string, expiresAt: number) {
  otpStore.set(email, { code, expiresAt });
}

export function verifyOtp(email: string, code: string): { valid: boolean; error?: string } {
  const stored = otpStore.get(email);
  if (!stored) {
    return { valid: false, error: "No OTP found. Please request a new code." };
  }
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return { valid: false, error: "OTP expired. Please request a new code." };
  }
  if (stored.code !== code.trim()) {
    return { valid: false, error: "Invalid code. Please try again." };
  }
  otpStore.delete(email);
  return { valid: true };
}
