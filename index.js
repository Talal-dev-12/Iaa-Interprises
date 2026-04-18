/**
 * IAA Enterprises – Express + MongoDB Backend
 * ─────────────────────────────────────────────
 * Install:  npm install express mongoose cors dotenv nodemailer
 * Run:      node index.js
 *
 * Set SMTP_EMAIL, SMTP_PASS, RECAPTCHA_SECRET_KEY in .env
 */
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// ── MongoDB Connection ───────────────────────────────────────────────────────
const DB_PASSWORD = process.env.DB_PASSWORD || "Asadkhaniaa";
const MONGO_URI = `mongodb+srv://Asadkhaniaa:${DB_PASSWORD}@cluster0.lviubkv.mongodb.net/?appName=Cluster0`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅  MongoDB connected"))
  .catch((err) => console.error("❌  MongoDB connection error:", err.message));

// ── Nodemailer Transporter (Gmail SMTP) ──────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP on startup
transporter.verify().then(() => {
  console.log("✅  SMTP transporter ready (Gmail)");
}).catch((err) => {
  console.error("❌  SMTP transporter error:", err.message);
});

// ── Rate Limiter (in-memory) ─────────────────────────────────────────────────
const rateLimitMap = new Map(); // ip -> { count, resetAt }
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// Clean up expired entries every 30 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 30 * 60 * 1000);

// ── reCAPTCHA Verification ───────────────────────────────────────────────────
async function verifyCaptcha(token) {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret || secret === "your-recaptcha-secret-key") {
      console.warn("⚠️  RECAPTCHA_SECRET_KEY not configured – skipping verification");
      return true; // Skip in development
    }

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: "POST" }
    );
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("reCAPTCHA verification error:", err.message);
    return false;
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/quote  –  validate & send email (no DB storage)
app.post("/api/quote", async (req, res) => {
  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // 1. Rate limiting
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: "Too many submissions. Please try again later.",
      });
    }

    const {
      name, company, phone, email, projectType, location, message,
      website,         // honeypot
      formLoadedAt,    // timing check
      recaptchaToken,  // reCAPTCHA
    } = req.body;

    // 2. Honeypot check – bots fill hidden fields
    if (website) {
      // Silently accept (don't alert the bot)
      return res.status(200).json({ success: true });
    }

    // 3. Timing check – human forms take > 3 seconds
    if (formLoadedAt) {
      const elapsed = Date.now() - Number(formLoadedAt);
      if (elapsed < 3000) {
        return res.status(400).json({ error: "Submission too fast. Please try again." });
      }
    }

    // 4. reCAPTCHA verification
    const captchaValid = await verifyCaptcha(recaptchaToken || "");
    if (!captchaValid) {
      return res.status(400).json({ error: "CAPTCHA verification failed. Please try again." });
    }

    // 5. Required field validation
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "Name, phone, and email are required." });
    }

    // 6. Send email
    const htmlBody = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 32px 24px; text-align: center;">
          <h1 style="color: #c9a84c; margin: 0; font-size: 22px; letter-spacing: 1px;">IAA Enterprises</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">New Quote Request Received</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; width: 130px; vertical-align: top;">Name</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Company</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px;">${company || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Phone</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px;">
                <a href="tel:${phone}" style="color: #1a73e8; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Email</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px;">
                <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Project Type</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px;">${projectType || "—"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Location</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px;">${location || "—"}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 14px 8px; color: #888; font-size: 13px; vertical-align: top;">Message</td>
              <td style="padding: 14px 8px; color: #222; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>
        </div>

        <!-- Footer -->
        <div style="background: #f8f9fa; padding: 16px 24px; text-align: center; border-top: 1px solid #e9ecef;">
          <p style="color: #aaa; font-size: 11px; margin: 0;">
            Submitted on ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"IAA Enterprises Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // Send to yourself
      replyTo: email,             // Reply goes to the customer
      subject: `🏗️ New Quote Request — ${name}`,
      html: htmlBody,
    });

    console.log(`📧  Quote email sent for "${name}" (${email})`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌  Email send error:", err);
    res.status(500).json({ error: "Failed to send your request. Please try again later." });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀  IAA backend running on http://localhost:${PORT}`));
