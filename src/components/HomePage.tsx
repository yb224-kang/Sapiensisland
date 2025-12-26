import HeroSection from "./HeroSection";
import ServicePromoSection from "./ServicePromoSection";
import PartnersSection from "./PartnersSection";
import ExpertsGridSection from "./ExpertsGridSection";
import YouTubeSection from "./YouTubeSection";
import Footer from "./Footer";

interface HomePageProps {
  onOpenBookingModal?: () => void;
}

export default function HomePage({ onOpenBookingModal }: HomePageProps) {
  return (
    <>
      <HeroSection onOpenBookingModal={onOpenBookingModal} />
      <PartnersSection />
      <ServicePromoSection />
      <ExpertsGridSection />
      <YouTubeSection />
      <Footer />
    </>
  );
}