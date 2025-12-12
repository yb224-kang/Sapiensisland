import { Button } from "./ui/button";
import SectionContainer from "./SectionContainer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import ContactModal from "./ContactModal";
import { professors } from "../data/professors";

export default function Section6() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <SectionContainer backgroundColor="light" id="experts-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--section-gap-large)] lg:gap-[var(--section-gap-xlarge)] items-center w-full max-w-[var(--section-max-width)]">
        {/* Left Side - Text Content */}
        <div className="flex flex-col gap-[var(--section-gap-small)]">
          {/* Badge */}
          <div 
            className="inline-flex items-center self-start px-[1rem] py-[0.5rem] bg-gradient-to-br from-[#000050] to-[#000040] text-white rounded-full text-[0.875rem] md:text-[1rem] tracking-wider"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
          >
            지혜전문가 소개
          </div>
          
          {/* Subtitle - Main Heading */}
          <h2 
            className="text-[var(--section-text-primary)] text-[1.75rem] md:text-[2.375rem] lg:text-[2.75rem] leading-tight"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            당신의 인사이트를 열어줄<br />
            파트너를 소개합니다.
          </h2>
          
          {/* Description */}
          <p 
            className="text-[var(--section-text-secondary)] text-[1rem] md:text-[1.125rem] leading-relaxed"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
          >
            사피엔스아일랜드는 분야별 전문성과 풍부한 경험을 갖춘<br />
            전문가들과 함께 합니다.
            <br /><br />
            빠르게 성장하는 국내 자기계발(이러닝) 시장 흐름에 발맞춰,<br />
            기업과 개인 고객의 다양한 니즈에 부응하기 위해 강연, 자문, 컨설팅 등<br />
            깊이 있는 지식 콘텐츠를 제공합니다.
          </p>
          
          {/* CTA Button */}
          <Button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-[var(--section-brand-secondary)] text-white hover:bg-gray-800 hover:shadow-lg transition-all duration-300 px-[2rem] py-[0.75rem] rounded-full text-[1rem] md:text-[1.125rem] self-start mt-[var(--section-gap-xsmall)]"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
          >
            문의하기
          </Button>
        </div>

        {/* Right Side - Professor Cards Grid */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[31.25rem]">
            {/* Scrollable Container */}
            <div 
              className="flex flex-wrap justify-center gap-[1rem] md:gap-[1.5rem] max-h-[28.125rem] overflow-y-auto pr-[0.5rem]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--section-brand-primary) transparent'
              }}
            >
              {professors.map((professor) => (
                <div
                  key={professor.id}
                  className="relative group cursor-pointer w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] max-w-[160px]"
                  onMouseEnter={() => setHoveredId(professor.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                    {/* Professor Image */}
                    <ImageWithFallback
                      src={professor.image}
                      alt={professor.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Basic Info - Always Visible */}
                    <div className="absolute bottom-0 left-0 right-0 p-[1rem] text-white">
                      <h3
                        className="text-[1rem] md:text-[1.125rem] mb-[0.25rem]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                      >
                        {professor.name}
                      </h3>
                      <p
                        className="text-[0.75rem] md:text-[0.875rem] text-[var(--section-brand-primary)]"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                      >
                        {professor.field}
                      </p>
                    </div>
                    
                    {/* Detailed Info - Visible on Hover */}
                    <div
                      className={`absolute inset-0 bg-[var(--section-brand-secondary)]/95 p-[1rem] flex flex-col justify-center items-center text-white text-center transition-opacity duration-300 ${
                        hoveredId === professor.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <button
                        className="px-[1.5rem] py-[0.75rem] bg-white text-[var(--section-brand-secondary)] rounded-full text-[0.8125rem] md:text-[0.9375rem] hover:bg-[var(--section-brand-primary)] hover:text-white transition-all duration-300 shadow-lg"
                        style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                        onClick={() => setIsContactModalOpen(true)}
                      >
                        더보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Modal */}
      <ContactModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </SectionContainer>
  );
}