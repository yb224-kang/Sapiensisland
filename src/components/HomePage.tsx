import HeroSection from "./HeroSection";
import ServicePromoSection from "./ServicePromoSection";
import PartnersSection from "./PartnersSection";
import ExpertsGridSection from "./ExpertsGridSection";
import YouTubeSection from "./YouTubeSection";
import Footer from "./Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersSection />
      <ServicePromoSection />
      <ExpertsGridSection />
      <YouTubeSection />
      <Footer />
    </>
  );
}