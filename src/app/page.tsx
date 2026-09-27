import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechLayers from "@/components/TechLayers";
import LiveSection from "@/components/LiveSection";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechLayers />
        <LiveSection />
        <FeaturedProject />
        <ProjectsGrid />
        <Contact />
      </main>
    </>
  );
}
