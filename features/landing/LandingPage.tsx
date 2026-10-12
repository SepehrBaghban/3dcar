import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { ContactCta } from "./components/ContactCta";
import { HeroSection } from "./components/HeroSection";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SpecSheet } from "./components/SpecSheet";

export function LandingPage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <HeroSection />
        <SpecSheet />
        <CapabilitiesSection />
        <ContactCta />
      </main>
      <SiteFooter />
    </div>
  );
}
