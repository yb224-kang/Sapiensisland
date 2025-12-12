import SectionContainer from "./SectionContainer";
import Download from "../imports/Download";

export default function Section2() {
  return (
    <SectionContainer backgroundColor="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[var(--section-max-width)]">
        {/* Left Side - Text Content */}
        <div className="flex flex-col gap-[var(--section-gap-small)]">
          {/* Title - Badge Style */}
          <div 
            className="inline-flex items-center self-start px-[1rem] py-[0.5rem] bg-[var(--section-brand-primary)] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            HATI
          </div>
          
          {/* Subtitle - Main Heading */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            나를 이해하고 성장시키는<br />
            마인드 케어 플랫폼
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] leading-relaxed"
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
  );
}