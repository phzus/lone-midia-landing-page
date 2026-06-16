import { TopBar } from "@/components/sections/TopBar";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MobileProof } from "@/components/sections/MobileProof";
import { LoneGrowth } from "@/components/sections/LoneGrowth";
import { CinematicDisplay } from "@/components/sections/CinematicDisplay";
import { Testimonials } from "@/components/sections/Testimonials";
import { ValueStack } from "@/components/sections/ValueStack";
import { FinalCta } from "@/components/sections/FinalCta";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { Footer } from "@/components/sections/Footer";
import { MetaPixel } from "@/components/MetaPixel";
import { ConsentBanner } from "@/components/ConsentBanner";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <MobileProof />
        <LeadFormSection />
        <LoneGrowth />
        <CinematicDisplay />
        <Testimonials />
        <ValueStack />
        <FinalCta />
      </main>
      <Footer />
      <MetaPixel />
      <ConsentBanner />
    </>
  );
}
