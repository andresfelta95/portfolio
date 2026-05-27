import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
        <LiveSection />
        <FeaturedProject />
        <ProjectsGrid />
        <Contact />
      </main>
    </>
  );
}
