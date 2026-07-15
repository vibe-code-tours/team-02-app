import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(to: string, code: string) {
  await transporter.sendMail({
    from: `"SonicSavor" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Your SonicSavor Access Code",
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #0F0E17; margin-bottom: 8px;">Your Access Code</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code to access SonicSavor:</p>
        <div style="background: #F0E6FF; border-radius: 12px; padding: 20px; text-align: center;">
          <span style="font-size: 32px; font-weight: bold; color: #7B2FF7; letter-spacing: 8px;">${code}</span>
        </div>
        <p style="color: #999; font-size: 12px; margin-top: 24px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
}
