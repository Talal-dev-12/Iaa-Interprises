/**
 * IAA Enterprises – Express + MongoDB Backend
 * ─────────────────────────────────────────────
 * Install:  npm install express mongoose cors dotenv
 * Run:      node server/index.js
 *
 * Set DB_PASSWORD in .env or replace <db_password> below.
 */
import dotenv from "dotenv"
import mongoose from "mongoose";
import express from "express"
import cors from "cors"

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

// ── Quote Schema ─────────────────────────────────────────────────────────────
const quoteSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    company:     String,
    phone:       { type: String, required: true },
    email:       { type: String, required: true },
    projectType: String,
    location:    String,
    message:     String,
    submittedAt: { type: Date, default: Date.now },
    status:      { type: String, default: "new" }, // new | contacted | closed
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/quote  –  save a new quote request
app.post("/api/quote", async (req, res) => {
  try {
    const { name, company, phone, email, projectType, location, message } = req.body;
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "name, phone and email are required" });
    }
    const quote = await Quote.create({ name, company, phone, email, projectType, location, message });
    res.status(201).json({ success: true, id: quote._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error – could not save quote" });
  }
});

// GET /api/quotes  –  list all quote requests (admin use)
app.get("/api/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀  IAA backend running on http://localhost:${PORT}`));
