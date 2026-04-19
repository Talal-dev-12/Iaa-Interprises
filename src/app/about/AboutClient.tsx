"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Shield, Users, Award, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const industries = [
  "Banking & Finance",
  "Government Institutions",
  "Military & Defense",
  "Automotive",
  "FMCG & Retail",
  "Industrial & Manufacturing",
];

const values = [
  { icon: Shield, title: "Integrity", desc: "Transparent dealings and honest business practices in every project." },
  { icon: Award, title: "Excellence", desc: "Uncompromising quality standards in materials and workmanship." },
  { icon: Users, title: "Partnership", desc: "Long-term relationships built on trust and mutual growth." },
  { icon: Building2, title: "Innovation", desc: "Modern techniques and materials for superior results." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">About Us</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mt-2 mb-4">
            About IAA Enterprises
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">
            Over 15 years of excellence in construction, renovation, and supply chain services.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              IAA Enterprises was founded with a simple mission: to deliver world-class construction and renovation services to Pakistan&apos;s leading organizations. Starting from Karachi, we&apos;ve grown into a trusted partner for banks, government institutions, military organizations, and corporate giants.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, with over 200 completed projects and 50+ corporate clients, we stand as one of Karachi&apos;s most reliable construction and supply chain companies. Our portfolio includes prestigious names like National Bank of Pakistan, Pakistan Navy, NADRA, PPHI Sindh, and many more.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="bg-card rounded-xl p-8 shadow-card border border-border">
              <Target className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To provide exceptional construction, renovation, and supply chain services that exceed client expectations through quality workmanship, timely delivery, and innovative solutions.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="bg-card rounded-xl p-8 shadow-card border border-border">
              <Eye className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-xl font-display font-bold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                To be Pakistan&apos;s most trusted and preferred construction partner for corporate and government organizations, setting new standards of excellence in the industry.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Values" title="What Drives Us" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="text-center p-6">
                <v.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                <h4 className="font-display font-bold text-foreground mb-2">{v.title}</h4>
                <p className="text-xs text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <SectionHeading label="Industries We Serve" title="Diverse Expertise" />
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {industries.map((ind) => (
              <span key={ind} className="bg-card border border-border rounded-full px-6 py-3 text-sm font-medium text-foreground shadow-card">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">Let&apos;s Build Together</h2>
          <p className="text-primary-foreground/70 mb-6">Partner with Karachi&apos;s most trusted corporate contractor.</p>
          <Link href="/contact"><Button variant="hero" size="lg" className="gap-2">Contact Us <ArrowRight className="w-5 h-5" /></Button></Link>
        </div>
      </section>
    </main>
  );
}
