import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services - Construction, Renovation & Supply Chain",
  description: "End-to-end construction, renovation, and supply chain services tailored for corporate facilities, banks, and government institutions across Pakistan.",
  openGraph: {
    title: "Our Services | IAA Enterprises",
    description: "End-to-end construction, renovation, and supply chain services in Pakistan.",
    url: "https://iaaenterprises.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
