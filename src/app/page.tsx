import { Nav } from "@/components/Nav";
import { PageHeader } from "@/components/PageHeader";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Publications } from "@/components/Publications";
import { Photos } from "@/components/Photos";
import { Contact } from "@/components/Contact";
import { SideTimeline } from "@/components/SideTimeline";
import { ColumnWidthProvider } from "@/contexts/ColumnWidthContext";

export default function Home() {
  return (
    <ColumnWidthProvider>
      <Nav />
      <SideTimeline />
      <main style={{ paddingTop: "52px" }}>
        <PageHeader />
        <About />
        <Projects />
        <Publications />
        <Photos />
        <Contact />
      </main>
    </ColumnWidthProvider>
  );
}
