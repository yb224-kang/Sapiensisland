import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import SectionContainer from "./SectionContainer";

export default function Section1() {
  const navigate = useNavigate();

  return (
    <SectionContainer backgroundColor="white">
      <div className="flex flex-col items-center justify-center text-center gap-[var(--section-gap-medium)] w-full max-w-[var(--section-max-width)] mx-auto">
        {/* Main Heading */}
        <div className="w-full flex flex-col">
          <h2
            className="w-full text-[var(--section-text-primary)] tracking-[-0.1px] leading-[1.3] text-[2.25rem] md:text-[3.0625rem] lg:text-[3.5625rem] text-left px-[0.25rem] md:px-[0.5rem] lg:px-[1rem]"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            Spreading The Insights,
          </h2>
          <h2
            className="w-full text-[var(--section-brand-primary)] tracking-[-0.1px] leading-[1.3] text-[2.25rem] md:text-[3.0625rem] lg:text-[3.5625rem] text-right px-[0.25rem] md:px-[0.5rem] lg:px-[1rem]"
            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
          >
            SAPIENS ISLAND
          </h2>
        </div>

        {/* Description */}
        <p
          className="text-[var(--section-text-secondary)] leading-[1.7] max-w-[56.25rem] text-[1rem] md:text-[1.125rem]"
          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
        >
          사피엔스아일랜드는 고도화되는 고객의 니즈를 충족하기 위한,
          <br />
          초개인화 서비스 플랫폼 개발과 IT서비스 기반의 전문가 액셀러레이팅 서비스를 제공합니다.
        </p>

        {/* CTA Button */}
        <Button
          onClick={() => navigate("/about")}
          className="bg-[var(--section-brand-secondary)] text-white hover:bg-gray-800 hover:shadow-lg transition-all duration-300 px-[2rem] py-[0.75rem] rounded-full text-[1rem] md:text-[1.125rem] tracking-[-0.05px]"
          style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 500 }}
        >
          view more?
        </Button>
      </div>
    </SectionContainer>
  );
}