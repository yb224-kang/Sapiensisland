import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import Download from "../../imports/Download";
import hatiMockup from "figma:asset/d2981efae0e25a3844ec2ae1f7ff83860fbb42f7.png";

export default function BusinessHatiPage() {
  const tabs = [
    { id: "overview", label: "Business", path: "/overview" },
    { id: "hati", label: "HATI", path: "/hati" },
    { id: "insiq", label: "INSIQ", path: "/insiq" }
  ];

  return (
    <PageHeroLayout
      title="서비스"
      description="혁신적인 기술과 전문 지식을 바탕으로<br class='hidden md:block' />고객의 성장과 성공을 지원하는 다양한 서비스를 제공합니다."
      backgroundImage="https://png.pngtree.com/thumb_back/fw800/background/20250830/pngtree-minimalist-green-tech-lines-image_18707991.webp"
      backgroundAlt="Business innovation and technology"
      tabs={tabs}
      basePath="/business"
    >
      {/* HATI Section */}
      <SectionContainer backgroundColor="light" reducedTopPadding>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[75rem]">
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-[var(--section-gap-small)]">
            {/* Title - Badge Style */}
            <div 
              className="inline-flex items-center self-start px-4 py-2 bg-[var(--section-brand-primary)] text-white rounded-full text-[14px] md:text-[16px] tracking-wider"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
            >
              HATI
            </div>
            
            {/* Subtitle - Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[28px] md:text-[38px] lg:text-[44px] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              나를 이해하고 성장시키는<br />
              마인드 케어 플랫폼
            </h2>
            
            {/* Description */}
            <p 
              className="text-[var(--section-text-secondary)] text-[16px] md:text-[18px] leading-relaxed"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              '개인' 중심의 수요 시장과 특히 '자기 인식' 부문의 수요 증가에 대응하고자, 개인 진단을 통해 맞춤형 알고리즘 서비스를 추천합니다.
            </p>
            
            {/* App Store Buttons */}
            <div className="mt-[var(--section-gap-xsmall)]">
              <Download />
            </div>
          </div>

          {/* Right Side - Mockup Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center lg:justify-end lg:mt-[1.625rem]"
          >
            <div className="relative w-full max-w-[500px]">
              <img
                src={hatiMockup}
                alt="HATI 앱 화면 목업"
                className="w-full h-auto drop-shadow-2xl"
                style={{ transform: 'scale(1.2)', transformOrigin: 'center' }}
              />
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}