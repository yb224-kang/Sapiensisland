import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";

export default function AboutVisionPage() {
  const tabs = [
    { id: "vision", label: "비전", path: "/vision" },
    { id: "competency", label: "역량", path: "/competency" },
    { id: "history", label: "연혁", path: "/history" },
    { id: "location", label: "연락처 / 오시는길", path: "/location" }
  ];

  return (
    <PageHeroLayout
      title="회사소개"
      description="지식 전문가의 인사이트와 초개인화 IT 기술을 결합해,<br class='hidden md:block' />타인과 자신을 이해하고 삶의 복잡한 문제를 해소하는 솔루션을 제공합니다."
      backgroundImage="https://images.presentationgo.com/2025/09/abstract-digital-data-wave.jpg"
      backgroundAlt="Team collaboration and network"
      tabs={tabs}
      basePath="/about"
    >
      {/* 비전 콘텐츠 영역 */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="flex items-start justify-center w-full max-w-[75rem] mx-auto py-12 md:py-16">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12 md:space-y-16"
            >
              {/* 비전 텍스트 내용 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8 md:space-y-10 px-4 md:px-8"
              >
                {/* 첫 번째 문단 */}
                <div className="max-w-[56rem] mx-auto">
                  <p 
                    className="text-[#1e1e1e] leading-relaxed"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 400,
                      fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                      lineHeight: '1.8',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    사피엔스아일랜드는 지혜전문가들의 지식을 연결하여 인사이트를 촉진하고 이를 수요자에게 공유하는 회사입니다.
                    일방향적 지식의 전달 또는 주입이나 일회적 응답에서 벗어나 지속적인 상호작용이 가능하도록 설계하여
                    고도화되는 고객의 요구를 충족할 수 있는 <span style={{ fontWeight: 700, color: '#000050' }}>지혜생태계 플랫폼을 구축</span>하고자 합니다.
                  </p>
                </div>

                {/* 두 번째 문단 */}
                <div className="max-w-[56rem] mx-auto">
                  <p 
                    className="text-[#1e1e1e] leading-relaxed"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 400,
                      fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                      lineHeight: '1.8',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    또한 휴먼 마인드의 기저를 탐구하는 <span style={{ fontWeight: 700, color: '#000050' }}>인지과학과 뇌분석을 기반</span>으로
                    개인의 특성과 잠재된 욕구를 반영한 고객의 특성 분석 시스템을 개발하고,
                    이를 바탕으로 세밀화 된 초개인화 서비스를 제공하고자 합니다.
                  </p>
                </div>

                {/* 세 번째 문단 */}
                <div className="max-w-[56rem] mx-auto">
                  <p 
                    className="text-[#1e1e1e] leading-relaxed"
                    style={{ 
                      fontFamily: 'Pretendard Variable, sans-serif', 
                      fontWeight: 400,
                      fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)',
                      lineHeight: '1.8',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    이러한 지식생태계 구축과 시스템 개발을 통해서
                    세계 최고 수준의 서비스를 요구하는 <span style={{ fontWeight: 700, color: '#000050' }}>국내 소비자의 욕구를 충족</span>할 뿐만 아니라
                    향후 한국 문화가 폭넓게 전파되고 <span style={{ fontWeight: 700, color: '#000050' }}>아시아국가</span>에 융합할 수 있도록 적용할 것입니다.
                  </p>
                </div>
              </motion.div>

              {/* 하단 여백 */}
              <div className="h-8"></div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}