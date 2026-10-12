import { HeroSection } from "./components/HeroSection";
import { SiteHeader } from "./components/SiteHeader";

export function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <HeroSection />
      </main>
    </div>
  );
}
