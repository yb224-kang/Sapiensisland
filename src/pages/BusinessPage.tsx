import SectionContainer from "../components/SectionContainer";
import Footer from "../components/Footer";
import Download from "../imports/Download";
import TabNavigation from "../components/TabNavigation";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function BusinessPage() {
  const tabs = [
    { id: "hati", label: "HATI" },
    { id: "insiq", label: "INSIQ" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Full Background */}
      <div className="relative w-full min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGlubm92YXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2NDIyNDMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Business innovation and technology"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Center Content - Title & Description */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <div className="text-center max-w-[1000px]">
            {/* Main Heading */}
            <h1 
              className="text-white text-center text-[28px] sm:text-[32px] md:text-[42px] lg:text-[56px] leading-tight tracking-[-0.1px] mb-6"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              서비스
            </h1>
            
            <p
              className="text-white/90 leading-[1.7] max-w-[800px] mx-auto text-[16px] md:text-[18px] lg:text-[19px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              혁신적인 기술과 전문 지식을 바탕으로<br className="hidden md:block" />
              고객의 성장과 성공을 지원하는 다양한 서비스를 제공합니다.
            </p>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <TabNavigation tabs={tabs} />
        </div>
      </div>

      {/* HATI Section */}
      <div id="hati">
        <SectionContainer backgroundColor="light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[1200px]">
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
          </div>
        </SectionContainer>
      </div>

      {/* INSIQ Section */}
      <div id="insiq">
        <SectionContainer backgroundColor="gray">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[1200px]">
            {/* Left Side - Empty for future content */}
            <div className="flex justify-center lg:justify-start">
              {/* 좌측 콘텐츠 영역 (이미지 등) */}
            </div>

            {/* Right Side - Text Content */}
            <div className="flex flex-col gap-[var(--section-gap-small)]">
              {/* Title - Badge Style */}
              <div 
                className="inline-flex items-center self-start px-4 py-2 bg-[var(--section-brand-primary)] text-white rounded-full text-[14px] md:text-[16px] tracking-wider"
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
          </div>
        </SectionContainer>
      </div>

      <Footer />
    </div>
  );
}