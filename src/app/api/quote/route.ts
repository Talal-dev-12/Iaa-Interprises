import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory rate limiter
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max requests
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, company, phone, email, projectType, location, message, website, formLoadedAt, recaptchaToken } = body;

    // Honeypot check
    if (website) {
      // Bot detected — silently accept
      return NextResponse.json({ success: true });
    }

    // Timing check — form filled too fast (< 3 seconds)
    if (formLoadedAt && Date.now() - formLoadedAt < 3000) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA (if configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (
      recaptchaSecret &&
      recaptchaSecret !== "your-recaptcha-secret-key" &&
      recaptchaToken &&
      recaptchaToken !== "dev-bypass"
    ) {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`,
        { method: "POST" }
      );
      const verifyData = await verifyRes.json();
      if (!verifyData.success) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed." },
          { status: 400 }
        );
      }
    }

    // Send email
    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpEmail || !smtpPass) {
      console.error("SMTP credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    // Sanitize user input to prevent HTML injection in the email body
    const escapeHtml = (str: unknown): string => {
      if (str == null) return "N/A";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPass,
      },
    });

    const htmlBody = `
      <h2>New Quote Request</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Company</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(company)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(phone)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Project Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(projectType)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(location)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Message</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(message)}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from: `"IAA Enterprises Website" <${smtpEmail}>`,
      to: "iaaenterprises.official@gmail.com",
      subject: `New Quote Request from ${name}`,
      html: htmlBody,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
