import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import Download from "../../imports/Download";
import insiqMockup from "figma:asset/04c57dbacc0ea9b0f58ee0399e55174b7be696f2.png";

export default function BusinessInsiqPage() {
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
      {/* INSIQ Section */}
      <SectionContainer backgroundColor="gray" reducedTopPadding>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[75rem]">
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-3">
            {/* Title - Badge Style */}
            <div 
              className="inline-flex items-center self-start px-3 py-1.5 bg-white border-2 border-[#000050] text-[#000050] rounded-full text-[0.625rem] md:text-[0.75rem] tracking-wider"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
            >
              INSIQ
            </div>
            
            {/* Subtitle - Main Heading */}
            <h2 
              className="text-[var(--section-text-primary)] text-[28px] md:text-[38px] lg:text-[44px] leading-tight"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              고객의 목소리를 반영한<br />
              강연 서비스 플랫폼
            </h2>
            
            {/* Description */}
            <p 
              className="text-[var(--section-text-secondary)] text-[16px] md:text-[18px] leading-relaxed"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              전문가의 강연 서비스에 실시간 및 양방향 소통이 가능한 시스템을 도입하여 고객들의 강연 집중도 및 만족도를 극대화합니다.
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
                src={insiqMockup}
                alt="INSIQ 앱 화면 목업"
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