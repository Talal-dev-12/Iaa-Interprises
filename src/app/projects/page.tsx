import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Featured Projects & Portfolio",
  description: "Explore our portfolio of corporate, government, and institutional construction and renovation projects across Pakistan, including work for National Bank and Pak Suzuki.",
  openGraph: {
    title: "Featured Projects | IAA Enterprises",
    description: "Explore our portfolio of construction and renovation projects across Pakistan.",
    url: "https://iaaenterprises.com/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
