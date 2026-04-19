import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://iaaenterprises.com"),
  title: {
    template: "%s | IAA Enterprises",
    default: "IAA Enterprises | Construction, Renovation & Supply Chain",
  },
  description: "Leading construction, renovation & supply chain company based in Karachi, Pakistan. Trusted by National Bank, Pakistan Navy, NADRA, and 50+ major corporations.",
  keywords: [
    "construction company Karachi",
    "renovation services Pakistan",
    "supply chain Pakistan",
    "IAA Enterprises",
    "corporate contractor",
    "office renovation Karachi",
    "commercial construction",
  ],
  authors: [{ name: "IAA Enterprises" }],
  openGraph: {
    title: "IAA Enterprises | Construction, Renovation & Supply Chain",
    description: "Leading construction, renovation & supply chain company based in Karachi, Pakistan.",
    url: "https://iaaenterprises.com",
    siteName: "IAA Enterprises",
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IAA Enterprises | Construction & Supply Chain",
    description: "Leading construction, renovation & supply chain company in Karachi.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "IAA Enterprises",
  image: "https://iaaenterprises.com/favicon.svg",
  "@id": "https://iaaenterprises.com",
  url: "https://iaaenterprises.com",
  telephone: "+923012088090",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.8607343,
    longitude: 66.7549807,
  },
  sameAs: [
    "https://facebook.com",
    "https://twitter.com",
    "https://linkedin.com",
    "https://instagram.com/asadd.frr"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Toaster />
          <Sonner />
          <Header />
          {children}
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
