import SectionContainer from "./SectionContainer";
import Download from "../imports/Download";

export default function Section4() {
  return (
    <SectionContainer backgroundColor="light">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[var(--section-max-width)]">
        {/* Left Side - Empty for future content */}
        <div className="flex justify-center lg:justify-start">
          {/* 좌측 콘텐츠 영역 (이미지 등) */}
        </div>

        {/* Right Side - Text Content */}
        <div className="flex flex-col gap-[var(--section-gap-small)]">
          {/* Title - Badge Style */}
          <div 
            className="inline-flex items-center self-start px-[1rem] py-[0.5rem] bg-[var(--section-brand-primary)] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            INSIQ
          </div>
          
          {/* Subtitle - Main Heading */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            고객의 목소리를 반영한<br />
            강연 서비스 플랫폼
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] leading-relaxed"
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
  );
}