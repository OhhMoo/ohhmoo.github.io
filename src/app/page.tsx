import { Nav } from "@/components/Nav";
import { HeroGrid } from "@/components/HeroGrid";
import { WorkSection } from "@/components/WorkSection";
import { GridRowSection } from "@/components/GridRowSection";
import { Footer } from "@/components/Footer";
import { ScrollDownIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Nav />

      <section className="hero">
        <div className="hero-bg-circle"></div>
        <HeroGrid />
      </section>

      <div className="scroll-arrow">
        <ScrollDownIcon />
      </div>

      <WorkSection />

      <GridRowSection />

      <Footer />
    </>
  );
}
