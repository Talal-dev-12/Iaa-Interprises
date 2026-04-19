"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Building2, Wrench, Truck, Shield, Users, Award, CheckCircle } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";

const clients = [
  { name: "National Bank of Pakistan", logo: "/nbp_logo.png" },
  { name: "PPHI Sindh", logo: "/pphi_logo.png" },
  { name: "Pak Suzuki", logo: "/pak_suzuki_logo.png" },
  { name: "NADRA", logo: "/nadra_logo.png" },
  { name: "UBL", logo: "/ubl_logo.png" },
  { name: "Government of Sindh", logo: "/gov_sindh_logo.png" },
  { name: "Pakistan Navy", logo: "/pakistan_navy_logo.png" },
  { name: "Bank Alfalah", logo: "/bank_alfalah_logo.png" },
];

const services = [
  { icon: Building2, title: "Construction", desc: "Full-scale commercial and corporate construction projects delivered on time." },
  { icon: Wrench, title: "Renovation", desc: "Complete renovation solutions for offices, banks, and commercial buildings." },
  { icon: Truck, title: "Supply Chain", desc: "Reliable supply chain services for construction materials and equipment." },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Corporate Clients" },
  { value: "100%", label: "Client Satisfaction" },
];

const whyUs = [
  { icon: Shield, title: "Trusted by Government", desc: "Proven track record with government and military institutions." },
  { icon: Users, title: "Corporate Expertise", desc: "Specialized in corporate and institutional projects across Pakistan." },
  { icon: Award, title: "Quality Assurance", desc: "Highest standards of quality in materials and workmanship." },
  { icon: CheckCircle, title: "On-Time Delivery", desc: "Reliable project timelines with efficient execution." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn3D = {
  hidden: { opacity: 0, y: 50, rotateX: 12, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main>
      {/* Scroll Progress */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero-construction.jpg" alt="Corporate construction site" width={1920} height={1080}
            className="w-full h-full object-cover opacity-15" priority />
        </div>
        {/* 3D floating background shapes */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-5"
          style={{ background: "hsl(8 67% 62%)" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-5"
          style={{ background: "hsl(8 67% 62%)" }}
          animate={{ y: [0, 15, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
            style={{ perspective: 1000 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block font-semibold text-sm tracking-widest uppercase mb-4"
            >
              <span className="text-accent">Construction</span>
              <span className="text-white"> · Renovation · </span>
              <span className="text-accent">Supply Chain</span>
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Building Pakistan&apos;s Corporate Future
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-8 font-body">
              Trusted by National Bank, Pakistan Navy, NADRA, and 50+ major corporations. We deliver excellence in construction, renovation, and supply chain services.
            </p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <a href="tel:+923012088090">
                <Button size="lg" className="gap-2 text-base bg-accent hover:bg-accent/90 text-accent-foreground btn-quote">
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="gap-2 text-base btn-quote btn-quote-outline">
                  Request Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-accent-foreground">{s.value}</div>
                <div className="text-sm text-accent-foreground/70 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading label="Our Clients" title="Trusted by Pakistan's Leading Organizations" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn3D}
                className="border border-gray-100 rounded-xl p-5 flex flex-col items-center justify-center gap-3 shadow-sm client-logo-card"
                style={{ backgroundColor: "#ffffff" }}
              >
                <div style={{ width: "100%", height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground text-center leading-snug">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Do"
            title="Our Core Services"
            description="Comprehensive construction, renovation, and supply chain solutions for Pakistan's leading organizations."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn3D}
                className="gradient-card border border-border rounded-xl p-8 shadow-card service-card"
              >
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                  <svc.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{svc.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">{svc.desc}</p>
                <Link href="/services">
                  <Button variant="ghost" className="text-accent hover:text-accent/80 gap-1 p-0">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
            >
              <span className="text-sm font-semibold tracking-widest uppercase text-accent">About Us</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-6">
                Karachi&apos;s Trusted Corporate Contractor
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 15 years of experience, IAA Enterprises has established itself as a leading construction, renovation, and supply chain company in Pakistan. We specialize in serving corporate companies, banks, government departments, and military institutions.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                From the National Bank of Pakistan to Pak Suzuki, from PPHI Sindh to Pakistan Navy — our portfolio reflects the trust that Pakistan&apos;s biggest organizations place in us.
              </p>
              <Link href="/about">
                <Button size="lg" className="gap-2 btn-quote bg-accent hover:bg-accent/90 text-accent-foreground">
                  Learn More About Us <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {whyUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn3D}
                  className="bg-secondary rounded-xl p-6 card-3d"
                >
                  <item.icon className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-display font-semibold text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Get in touch with our team for a free consultation and project estimate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+923012088090">
                <Button size="lg" className="gap-2 text-base bg-accent hover:bg-accent/90 text-accent-foreground btn-quote">
                  <Phone className="w-5 h-5" /> Call +92 301 2088090
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="gap-2 text-base btn-quote btn-quote-outline">
                  Request a Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              label="Get In Touch"
              title="Request a Project Quote"
              description="Fill out the form below and our team will get back to you within 24 hours."
            />
            <QuoteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
