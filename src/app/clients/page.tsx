import { Metadata } from "next";
import ClientsClient from "./ClientsClient";

export const metadata: Metadata = {
  title: "Our Trusted Clients",
  description: "Join 50+ organizations that trust IAA Enterprises, including National Bank of Pakistan, NADRA, Pakistan Navy, and Pak Suzuki.",
  openGraph: {
    title: "Our Clients | IAA Enterprises",
    description: "Organizations that trust IAA Enterprises for their critical projects.",
    url: "https://iaaenterprises.com/clients",
  },
};

export default function ClientsPage() {
  return <ClientsClient />;
}
