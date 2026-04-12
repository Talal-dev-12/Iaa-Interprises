import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

const projects = [
  {
    title: "National Bank of Pakistan Renovation",
    client: "National Bank of Pakistan",
    type: "Renovation",
    logo: "/nbp_logo.png",
    bgImage: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    desc: "Comprehensive renovation and interior fitout of corporate office spaces, covering multiple floors with modern infrastructure and executive design standards.",
    highlight: "Multiple Locations",
  },
  {
    title: "PPHI Sindh Facility Works",
    client: "PPHI Sindh",
    type: "Construction",
    logo: "/pphi_logo.png",
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    desc: "Construction, renovation, and maintenance of healthcare and administrative facilities across multiple sites under Pakistan's public health initiative.",
    highlight: "Multiple Locations",
  },
  {
    title: "Pak Suzuki Facility Works",
    client: "Pak Suzuki",
    type: "Construction",
    logo: "/pak_suzuki_logo.png",
    bgImage: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    desc: "Construction and renovation of industrial and commercial facilities including showrooms and corporate office spaces across multiple locations.",
    highlight: "Multiple Locations",
  },
  {
    title: "NADRA Office Fitout",
    client: "NADRA",
    type: "Interior Fitout",
    logo: "/nadra_logo.png",
    bgImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    desc: "Professional interior fitout and renovation of registration centers and office spaces meeting strict government security and design requirements.",
    highlight: "Multiple Locations",
  },
  {
    title: "UBL Branch Renovations",
    client: "UBL",
    type: "Renovation",
    logo: "/ubl_logo.png",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    desc: "Standardized renovation and interior fitout across multiple branch locations, delivering a consistent and modern brand experience.",
    highlight: "Multiple Locations",
  },
  {
    title: "Pakistan Navy Infrastructure",
    client: "Pakistan Navy",
    type: "Construction",
    logo: "/pakistan_navy_logo.png",
    bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    desc: "Specialized construction, renovation, and maintenance works for naval facilities adhering to strict military-grade standards and specifications.",
    highlight: "Multiple Locations",
  },
  {
    title: "Bank Alfalah Branch Renovations",
    client: "Bank Alfalah",
    type: "Renovation",
    logo: "/bank_alfalah_logo.png",
    bgImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    desc: "Modern branch renovation and interior redesign across multiple locations, enhancing customer experience with contemporary finishes and upgraded infrastructure.",
    highlight: "Multiple Locations",
  },
];

const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "15+", label: "Years of Excellence" },
  { value: "50+", label: "Happy Clients" },
  { value: "0", label: "Missed Deadlines" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 45, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const ProjectsPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="pt-20">
      <motion.div className="scroll-progress" style={{ scaleX }} />

      {/* Hero */}
      <section className="gradient-hero py-24 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full opacity-[0.06]"
          style={{ background: "hsl(8 67% 62%)" }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-accent text-sm font-semibold tracking-widest uppercase">Our Portfolio</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mt-2 mb-4">
              Projects That Define Excellence
            </h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              A showcase of our work across corporate, government, and institutional projects across Pakistan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-accent">
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
                <div className="text-3xl font-display font-bold text-accent-foreground">{s.value}</div>
                <div className="text-sm text-accent-foreground/70 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <SectionHeading label="Featured Projects" title="Our Work Speaks for Itself" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => {
              return (
                <motion.div
                  key={project.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-card group hover:shadow-elevated transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Visual header — real background image + dark overlay */}
                  <div className="relative h-44 overflow-hidden">
                    {/* Background image */}
                    <img
                      src={project.bgImage}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20" />

                    {/* Client logo badge — solid white, top left */}
                    <div
                      className="absolute top-4 left-4 rounded-xl shadow-lg"
                      style={{
                        width: 52,
                        height: 52,
                        backgroundColor: "#ffffff",
                        padding: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={project.logo}
                        alt={project.client}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* Highlight pill — bottom right */}
                    <span className="absolute bottom-4 right-4 text-xs font-medium text-white bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                      {project.highlight}
                    </span>

                    {/* Project type — bottom left */}
                    <span className="absolute bottom-4 left-4 text-xs font-semibold text-white/90 bg-accent/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-muted-foreground font-medium">{project.client}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-display font-bold text-primary-foreground mb-4">Have a Project in Mind?</h2>
            <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
              Let's discuss how we can bring your vision to life with precision and quality.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a href="tel:+923012088090">
                <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground btn-quote">
                  <Phone className="w-5 h-5" /> Call Now
                </Button>
              </a>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="gap-2 btn-quote btn-quote-outline">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
