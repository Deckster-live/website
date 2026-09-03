import { Marquee } from "@/components/BrandMarquee";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowWeWork } from "@/components/HowWeWork";
import { Metrics } from "@/components/Metrics";
import { Navbar } from "@/components/Navbar";
import { OldVsNew } from "@/components/OldVsNew";
import { ProblemsSection } from "@/components/ProblemsSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServicesTimeline } from "@/components/ServicesTimeline";
import { SolutionsSection } from "@/components/SolutionsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee />
      <Metrics />
      <ProblemsSection />
      <SolutionsSection />
      {/* <HowWeWork /> */}
      {/* <ServicesTimeline /> */}
      <ServicesGrid />
      <OldVsNew />
      <ContactSection />
      <Footer />
    </>
  );
}
