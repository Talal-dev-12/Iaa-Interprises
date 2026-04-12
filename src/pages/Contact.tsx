import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";

const ContactPage = () => (
  <main className="pt-20">
    <section className="gradient-hero py-20">
      <div className="container mx-auto px-4 text-center">
        <span className="text-accent text-sm font-semibold tracking-widest uppercase">Contact Us</span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mt-2 mb-4">
          Get In Touch
        </h1>
        <p className="text-primary-foreground/70 max-w-xl mx-auto">
          Ready to start your project? Contact us for a free consultation.
        </p>
      </div>
    </section>

    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground mb-6">Contact Information</h3>
              <div className="space-y-5">
                <a href="tel:+923012088090" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground group-hover:text-accent transition-colors">+92 301 2088090</div>
                  </div>
                </a>
                <a href="tel:+923018252797" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Phone</div>
                    <div className="font-medium text-foreground group-hover:text-accent transition-colors">+92 301 8252797</div>
                  </div>
                </a>
                <a href="mailto:iaaenterprises@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="font-medium text-foreground group-hover:text-accent transition-colors">iaaenterprises@gmail.com</div>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Location</div>
                    <div className="font-medium text-foreground">Karachi, Pakistan</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Business Hours</div>
                    <div className="font-medium text-foreground">Mon – Sat, 9 AM – 6 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-8 shadow-card border border-border">
              <SectionHeading label="Request a Quote" title="Tell Us About Your Project" />
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Map */}
    <section className="h-[400px]">
      <iframe
        title="IAA Enterprises Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462118.02491053595!2d66.7549807!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  </main>
);

export default ContactPage;
