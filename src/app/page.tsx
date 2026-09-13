import { Marquee } from "@/components/BrandMarquee";
import { CaseStudies } from "@/components/CaseStudies";
import {
  ContactSection,
  ContactSectionClassic,
} from "@/components/ContactSection";
import { ContactSectionForm } from "@/components/ContactSectionForm";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero1";
import { HowWeWork } from "@/components/HowWeWork";
import { Metrics } from "@/components/Metrics";
import { Navbar } from "@/components/Navbar";
import { OldVsNew } from "@/components/OldVsNew";
import { ProblemsSection } from "@/components/ProblemsSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ServicesTimeline } from "@/components/ServicesTimeline";
import { SolutionsProcess } from "@/components/SolutionsProcess";
import { SolutionsSection } from "@/components/SolutionsSection";
import { UseCaseNetwork } from "@/components/UseCaseNetwork";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { WhyUsSection } from "@/components/WhyUsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Metrics />
      <CaseStudies />
      <UseCaseNetwork />
      {/* <ProblemsSection /> */}
      {/* <SolutionsSection /> */}
      <WhyUsSection />
      {/* <HowWeWork /> */}
      {/* <ServicesTimeline /> */}
      {/* <ServicesGrid /> */}
      {/* <OldVsNew /> */}
      <SolutionsProcess />
      <FaqSection />
      <ContactSection />
      {/* <ContactSectionForm /> */}
      {/* <ContactSectionClassic /> */}
      <WhatsappFloat />
    </>
  );
}
