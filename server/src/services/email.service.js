import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const hasSmtpConfig = Boolean(env.email.user && env.email.pass);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: env.email.user, pass: env.email.pass },
    })
  : null;

export async function sendOtpEmail(to, code) {
  const subject = 'Your echo verification code';
  const html = `
    <div style="font-family: sans-serif; max-width: 400px;">
      <h2>Verify your email</h2>
      <p>Your verification code is:</p>
      <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px;">${code}</p>
      <p>This code expires in 10 minutes.</p>
    </div>
  `;

  if (!transporter) {
    console.log(`\n[email.service] SMTP not configured — OTP for ${to}: ${code}\n`);
    return;
  }

  await transporter.sendMail({ from: env.email.from, to, subject, html });
}