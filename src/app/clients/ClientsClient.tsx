"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Building2, Landmark, Shield } from "lucide-react";

const clients = [
  {
    name: "National Bank of Pakistan",
    category: "Banking",
    abbr: "NBP",
    logo: "/nbp_logo.png",
    color: "#232A49",
    desc: "Pakistan's largest state-owned commercial bank",
  },
  {
    name: "PPHI Sindh",
    category: "Government",
    abbr: "PPHI",
    logo: "/pphi_logo.png",
    color: "#4C4E64",
    desc: "People's Primary Healthcare Initiative, Sindh",
  },
  {
    name: "Pak Suzuki",
    category: "Automotive",
    abbr: "PSM",
    logo: "/pak_suzuki_logo.png",
    color: "#DF6D5C",
    desc: "Leading automobile manufacturer in Pakistan",
  },
  {
    name: "NADRA",
    category: "Government",
    abbr: "NADRA",
    logo: "/nadra_logo.png",
    color: "#232A49",
    desc: "National Database & Registration Authority",
  },
  {
    name: "UBL",
    category: "Banking",
    abbr: "UBL",
    logo: "/ubl_logo.png",
    color: "#4C4E64",
    desc: "United Bank Limited – serving Pakistan since 1959",
  },
  {
    name: "Government of Sindh",
    category: "Government",
    abbr: "GoS",
    logo: "/gov_sindh_logo.png",
    color: "#DF6D5C",
    desc: "Provincial government of Sindh, Pakistan",
  },
  {
    name: "Pakistan Navy",
    category: "Military",
    abbr: "PN",
    logo: "/pakistan_navy_logo.png",
    color: "#232A49",
    desc: "Naval branch of the Pakistan Armed Forces",
  },
  {
    name: "Bank Alfalah",
    category: "Banking",
    abbr: "BAF",
    logo: "/bank_alfalah_logo.png",
    color: "#4C4E64",
    desc: "One of Pakistan's leading private sector banks",
  },
];

const categories = [
  {
    icon: Landmark,
    label: "Government & Military",
    count: clients.filter((c) => ["Government", "Military"].includes(c.category)).length,
  },
  {
    icon: Building2,
    label: "Banking & Finance",
    count: clients.filter((c) => c.category === "Banking").length,
  },
  {
    icon: Shield,
    label: "Corporate & Automotive",
    count: clients.filter((c) => ["FMCG", "Automotive"].includes(c.category)).length,
  },
];

const categoryColors: Record<string, string> = {
  Banking: "bg-blue-100 text-blue-800",
  Government: "bg-green-100 text-green-800",
  Military: "bg-slate-100 text-slate-800",
  Automotive: "bg-orange-100 text-orange-800",
  FMCG: "bg-amber-100 text-amber-800",
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { delay: i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ClientsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="pt-20">
      {/* Scroll progress */}
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-5"
          style={{ background: "hsl(8 67% 62%)" }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Clients</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mt-2 mb-4">
              Trusted by Pakistan&apos;s Leaders
            </h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              From government institutions to corporate giants — they trust us to deliver excellence every time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center justify-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                  <cat.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-display font-bold text-accent-foreground">{cat.count}+</div>
                  <div className="text-sm text-accent-foreground/70">{cat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="Client Portfolio"
            title="Organizations We've Served"
            description="Every client represents a relationship built on trust, quality, and outstanding results."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border border-gray-100 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm client-logo-card"
                style={{ backgroundColor: "#ffffff" }}
              >
                {/* Logo container — white bg, consistent sizing */}
                <div
                  className="flex items-center justify-center mb-5 rounded-xl"
                  style={{ width: 140, height: 80, backgroundColor: "#ffffff", padding: 10 }}
                >
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <h3 className="font-display font-bold text-foreground text-base mb-1 leading-snug">{client.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{client.desc}</p>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryColors[client.category] ?? "bg-muted text-muted-foreground"}`}>
                  {client.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section className="py-16 gradient-hero text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-3">
              Become Our Next Success Story
            </h2>
            <p className="text-primary-foreground/70 max-w-md mx-auto mb-6">
              Join 50+ organizations that trust IAA Enterprises with their most critical projects.
            </p>
            <a href="tel:+923012088090">
              <button className="btn-quote bg-accent text-accent-foreground font-semibold px-8 py-3 rounded-lg text-base inline-flex items-center gap-2">
                Contact Us Today
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
