import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about IAA Enterprises, Karachi's most trusted corporate contractor. Over 15 years of excellence in construction, renovation, and supply chain services.",
  openGraph: {
    title: "About Us | IAA Enterprises",
    description: "Learn about IAA Enterprises, Karachi's most trusted corporate contractor.",
    url: "https://iaaenterprises.com/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
