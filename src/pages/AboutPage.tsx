import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Target, Eye, Heart, Users, Zap, Shield } from "lucide-react";
import SectionContainer from "../components/SectionContainer";
import Footer from "../components/Footer";
import TabNavigation from "../components/TabNavigation";

export default function AboutPage() {
  const navigate = useNavigate();

  const tabs = [
    { id: "vision", label: "비전" },
    { id: "competency", label: "역량" },
    { id: "history", label: "연혁" }
  ];

  const milestones = [
    { year: "2024", title: "글로벌 확장", description: "해외 시장 진출 및 파트너십 확대" },
    { year: "2023", title: "AI 플랫폼 런칭", description: "초개인화 서비스 플랫폼 정식 출시" },
    { year: "2022", title: "Series A 투자 유치", description: "기술 개발 및 인력 확충" },
    { year: "2021", title: "회사 설립", description: "사피엔스아일랜드 공식 출범" }
  ];

  return (
    <div className="w-full">
      {/* Hero Section with Full Background */}
      <div className="relative w-full min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1564069970419-0bc8e7b487da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcGFydG5lcnNoaXAlMjBoYW5kc2hha2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NDQ4Nzg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="디지털 파트너십 협업"
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
              className="text-white tracking-[-0.1px] leading-[1.2] text-[42px] md:text-[56px] lg:text-[68px] mb-6"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              회사소개
            </h1>
            
            <p
              className="text-white/90 leading-[1.7] max-w-[800px] mx-auto text-[16px] md:text-[18px] lg:text-[19px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
            >
              지식 전문가의 인사이트와 초개인화 IT 기술을 결합해,<br className="hidden md:block" />
              타인과 자신을 이해하고 삶의 복잡한 문제를 해소하는 솔루션을 제공합니다.
            </p>
          </div>
        </div>

        {/* Bottom Tab Navigation */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center px-[var(--section-padding-x-mobile)] md:px-[var(--section-padding-x-tablet)] lg:px-[var(--section-padding-x-desktop)]">
          <TabNavigation tabs={tabs} />
        </div>
      </div>

      {/* Vision Section */}
      <div id="vision">
        <SectionContainer backgroundColor="gray-50">
          <div className="flex flex-col items-center justify-center gap-[var(--section-gap-large)] w-full max-w-[1200px] mx-auto">
            {/* Vision Title */}
            <h2
              className="text-[var(--section-brand-primary)] tracking-[-0.1px] leading-[1.3] text-[32px] md:text-[42px] lg:text-[48px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              VISION
            </h2>

            {/* Vision Content */}
            <div className="flex flex-col gap-6 text-[var(--section-text-secondary)] text-[16px] md:text-[18px] lg:text-[19px] leading-[1.8] text-center max-w-[1000px]">
              <p style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                사피엔스아일랜드는 지식전문가들의 지식을 연결하여 인사이트를 촉진고 이를 수요자에게 공급하는 회사입니다.
                일방향적 지식의 전달이나 일회적 응답에서 벗어나 지속적인 상호작용이 가능하도록 설계하여 고도화되는 고객의 요구를
                충족할 수 있는 지식생태계 플랫폼을 구축하고자 합니다.
              </p>
              <p style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                또한 휴먼 마인드의 기저를 탐구하는 인지심리학과 뇌과학에 기반으로 개인의 특성과 잠재된 욕구를 반영한 고객 특성 분석
                시스템을 개발하고, 이를 바탕으로 세밀화된 초개인화 서비스를 제공하고자 합니다.
              </p>
              <p style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}>
                이러한 지식생태계 구축과 시스템 개발을 통하여 세계 최고 수준의 서비스를 요구하는 국내 소비자의 욕구를 충족할 뿐만
                아니라 향후 한국 문화가 폭넓게 전파되고 아시아 국가에 적용하도록 할 것입니다.
              </p>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Competency Section */}
      <div id="competency">
        <SectionContainer backgroundColor="white">
          <div className="flex flex-col items-center justify-center gap-[var(--section-gap-large)] w-full max-w-[1200px] mx-auto">
            <h2
              className="text-[var(--section-brand-primary)] tracking-[-0.1px] leading-[1.3] text-[32px] md:text-[42px] lg:text-[48px]"
              style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
            >
              핵심 역량
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-[var(--section-brand-primary)] text-white rounded-full mb-6 mx-auto">
                  <Users className="w-8 h-8" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[22px] md:text-[24px] mb-4 text-center"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  전문가 네트워크
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      국내외 1,000+ 전문가 풀 보유
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      다양한 분야의 석학 및 실무 전문가
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      검증된 전문가 매칭 시스템
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-[var(--section-brand-primary)] text-white rounded-full mb-6 mx-auto">
                  <Eye className="w-8 h-8" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[22px] md:text-[24px] mb-4 text-center"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  AI 기반 분석
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      인심리학 기반 사용자 분석
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      개인 맞춤형 추천 알고리즘
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      실시간 데터 분석 및 최적화
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-[var(--section-brand-primary)] text-white rounded-full mb-6 mx-auto">
                  <Shield className="w-8 h-8" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[22px] md:text-[24px] mb-4 text-center"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  플랫폼 기술
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      안정적인 클라우드 인프라
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      확장 가능한 마이크로서비스 아키텍처
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      보안 및 개인정보 보호 시스템
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-[var(--section-brand-primary)] text-white rounded-full mb-6 mx-auto">
                  <Zap className="w-8 h-8" />
                </div>
                <h3
                  className="text-[var(--section-text-primary)] text-[22px] md:text-[24px] mb-4 text-center"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                >
                  비즈니스 역량
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      대기업 및 공공기관 협력 경험
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      글로벌 시장 진출 전략
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[var(--section-brand-primary)] rounded-full mt-2 flex-shrink-0" />
                    <span
                      className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                      style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                    >
                      지속 가능한 비즈니스 모델
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Company History */}
      <div id="history">
        <section className="w-full bg-white py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-12">
              <div className="text-center">
                <h2 
                  className="text-[var(--section-text-primary)] text-[32px] md:text-[42px] mb-4"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 900 }}
                >
                  우리의 여정
                </h2>
                <p 
                  className="text-[var(--section-text-secondary)] text-[16px] md:text-[18px]"
                  style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                >
                  혁신을 향한 끊임없는 도전
                </p>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--section-brand-primary)]/20 hidden md:block" />

                <div className="flex flex-col gap-8">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center ${
                        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
                          <h3 
                            className="text-[var(--section-text-primary)] text-[22px] md:text-[26px] mb-2"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 700 }}
                          >
                            {milestone.title}
                          </h3>
                          <p 
                            className="text-[var(--section-text-secondary)] text-[14px] md:text-[16px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 400 }}
                          >
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Year Badge */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center bg-[var(--section-brand-primary)] text-white rounded-full shadow-lg z-10">
                          <span 
                            className="text-[18px] md:text-[20px]"
                            style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 800 }}
                          >
                            {milestone.year}
                          </span>
                        </div>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}