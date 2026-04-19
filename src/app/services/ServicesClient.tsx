"use client";

import { Building2, Wrench, Paintbrush, Landmark, Factory, Truck, Settings, CheckCircle, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    icon: Building2,
    title: "Construction Services",
    desc: "Complete commercial and industrial construction from foundation to finish for corporate and government clients.",
    benefits: ["Turnkey project delivery", "Certified engineering team", "Quality materials sourcing", "Regulatory compliance"],
    accent: "#232A49",
  },
  {
    icon: Wrench,
    title: "Renovation Services",
    desc: "Transform existing spaces with modern renovation solutions — specializing in banks, offices, and government buildings.",
    benefits: ["Minimal operational disruption", "Modern design integration", "Cost-effective solutions", "Timeline adherence"],
    accent: "#4C4E64",
  },
  {
    icon: Paintbrush,
    title: "Interior Fitout",
    desc: "Professional interior fitout services for corporate offices, retail spaces, and institutional buildings.",
    benefits: ["Custom design solutions", "Premium finishes", "Ergonomic planning", "Brand-aligned interiors"],
    accent: "#DF6D5C",
  },
  {
    icon: Landmark,
    title: "Office Renovation",
    desc: "Specialized office renovation for banks, corporate HQs, and commercial offices across Pakistan.",
    benefits: ["Space optimization", "IT infrastructure integration", "Modern aesthetics", "Safety compliance"],
    accent: "#232A49",
  },
  {
    icon: Factory,
    title: "Commercial Construction",
    desc: "Large-scale commercial construction for retail chains, industrial facilities, and mixed-use developments.",
    benefits: ["Scalable solutions", "Industrial expertise", "Project management", "Budget optimization"],
    accent: "#4C4E64",
  },
  {
    icon: Truck,
    title: "Supply Chain Services",
    desc: "Reliable supply chain management for construction materials, equipment, and specialized resources.",
    benefits: ["Bulk procurement", "Quality assurance", "Timely delivery", "Cost-effective sourcing"],
    accent: "#DF6D5C",
  },
  {
    icon: Settings,
    title: "Maintenance Services",
    desc: "Ongoing maintenance contracts for corporate buildings, banks, and government facilities.",
    benefits: ["Preventive maintenance", "24/7 emergency support", "Annual contracts", "Dedicated teams"],
    accent: "#7F8087",
  },
];

const processSteps = [
  { num: "01", title: "Consultation", desc: "We meet to understand your project requirements and vision." },
  { num: "02", title: "Planning", desc: "Detailed scope, timeline, and cost estimation prepared." },
  { num: "03", title: "Execution", desc: "Expert teams deliver with precision and quality control." },
  { num: "04", title: "Handover", desc: "Final inspection, documentation, and smooth project handover." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 12, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="pt-20">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[0.04]"
          style={{ background: "hsl(8 67% 62%)" }}
          animate={{ scale: [1, 1.12, 1], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mt-2 mb-4">
              Comprehensive Construction Solutions
            </h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
              End-to-end construction, renovation, and supply chain services for Pakistan&apos;s leading organizations.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground btn-quote text-base animate-pulse-glow"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+923012088090">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 btn-quote btn-quote-outline"
                >
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <SectionHeading
            label="What We Offer"
            title="7 Core Services"
            description="From construction to supply chain — every service engineered for excellence."
          />
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((svc) => (
              <motion.div
                key={svc.title}
                variants={cardVariants}
                className="bg-card border border-border rounded-2xl p-8 shadow-card service-card"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                    style={{ background: `${svc.accent}20`, border: `1.5px solid ${svc.accent}30` }}
                  >
                    <svc.icon className="w-7 h-7" style={{ color: svc.accent }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2">{svc.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{svc.desc}</p>
                    <ul className="grid grid-cols-2 gap-2 mb-5">
                      {svc.benefits.map((b) => (
                        <li key={b} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <button className="btn-quote inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 bg-accent/10 hover:bg-accent/20 px-4 py-2 rounded-lg transition-colors">
                        Get a Quote <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeading label="How We Work" title="Our Simple 4-Step Process" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                custom={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="relative bg-secondary rounded-2xl p-6 card-3d"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-px bg-border translate-x-full -translate-y-px z-10" />
                )}
                <div className="text-4xl font-display font-black text-accent/20 mb-3">{step.num}</div>
                <h4 className="font-display font-bold text-foreground text-lg mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{ background: "radial-gradient(circle at 50% 50%, hsl(8 67% 62%), transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Contact us today and let&apos;s build something exceptional together.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="tel:+923012088090">
                <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground btn-quote animate-pulse-glow">
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="gap-2 btn-quote btn-quote-outline">
                  Request Quote <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
