"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

// ── reCAPTCHA helpers ────────────────────────────────────────────────────────
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
}

// ── Component ────────────────────────────────────────────────────────────────
const QuoteForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formLoadedAt] = useState(() => Date.now());
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  // Load reCAPTCHA script & render widget
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === "your-recaptcha-site-key") {
      // Skip in development when key is not configured
      setRecaptchaReady(true);
      return;
    }

    loadRecaptchaScript().then(() => {
      const waitForGrecaptcha = setInterval(() => {
        if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current) {
          clearInterval(waitForGrecaptcha);
          try {
            recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
              sitekey: RECAPTCHA_SITE_KEY,
              callback: () => setRecaptchaReady(true),
              "expired-callback": () => setRecaptchaReady(false),
            });
            setRecaptchaReady(true);
          } catch {
            // Widget may already be rendered
            setRecaptchaReady(true);
          }
        }
      }, 200);

      return () => clearInterval(waitForGrecaptcha);
    });
  }, []);

  const getRecaptchaToken = useCallback((): string => {
    if (!RECAPTCHA_SITE_KEY || RECAPTCHA_SITE_KEY === "your-recaptcha-site-key") return "dev-bypass";
    try {
      return window.grecaptcha?.getResponse(recaptchaWidgetId.current ?? undefined) || "";
    } catch {
      return "";
    }
  }, []);

  const resetRecaptcha = useCallback(() => {
    try {
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      }
    } catch {
      // ignore
    }
    setRecaptchaReady(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    // Get reCAPTCHA token
    const recaptchaToken = getRecaptchaToken();
    if (!recaptchaToken && RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "your-recaptcha-site-key") {
      toast({
        title: "Please verify you're human",
        description: "Complete the reCAPTCHA checkbox before submitting.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get("name"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      projectType: formData.get("projectType"),
      location: formData.get("location"),
      message: formData.get("message"),
      // Anti-spam fields
      website: formData.get("website"),  // honeypot
      formLoadedAt,                       // timing
      recaptchaToken,                     // reCAPTCHA
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast({
          title: "Quote Request Submitted!",
          description: "We'll get back to you within 24 hours.",
        });
        (e.target as HTMLFormElement).reset();
        resetRecaptcha();
      } else if (res.status === 429) {
        toast({
          title: "Too Many Requests",
          description: "Please wait a while before submitting again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network Error",
        description: "Could not reach the server. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ── Honeypot (invisible to humans) ── */}
      <div
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
        }}
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input name="name" placeholder="Your Name *" required className="bg-card border-border" />
        <Input name="company" placeholder="Company Name" className="bg-card border-border" />
        <Input name="phone" placeholder="Phone Number *" required type="tel" className="bg-card border-border" />
        <Input name="email" placeholder="Email Address *" required type="email" className="bg-card border-border" />
        <Input name="projectType" placeholder="Project Type" className="bg-card border-border" />
        <Input name="location" placeholder="Location" className="bg-card border-border" />
      </div>
      <Textarea name="message" placeholder="Tell us about your project..." rows={4} className="bg-card border-border" />

      {/* ── reCAPTCHA Widget ── */}
      {RECAPTCHA_SITE_KEY && RECAPTCHA_SITE_KEY !== "your-recaptcha-site-key" && (
        <div className="flex items-center gap-3">
          <div ref={recaptchaRef} />
        </div>
      )}

      {/* ── Security badge ── */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-green-500" />
        <span>Protected by reCAPTCHA &amp; anti-spam measures</span>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full btn-quote bg-accent hover:bg-accent text-accent-foreground font-semibold text-base gap-2"
        disabled={loading}
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
        ) : (
          <>Request Project Quote <ArrowRight className="w-5 h-5" /></>
        )}
      </Button>
    </form>
  );
};

export default QuoteForm;
