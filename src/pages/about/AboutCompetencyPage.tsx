import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { TrendingUp, Users, Shield } from "lucide-react";

export default function AboutCompetencyPage() {
  const tabs = [
    { id: "vision", label: "비전", path: "/vision" },
    { id: "competency", label: "역량", path: "/competency" },
    { id: "history", label: "연혁", path: "/history" },
    { id: "location", label: "연락처 / 오시는길", path: "/location" }
  ];

  const competencies = [
    {
      number: "1",
      title: "빠르게 성장하는\n지식전문가 수요 시장",
      icon: TrendingUp,
      iconColor: "#000050",
      items: [
        "국내 자기계발 수요 시장은 매년 8.6%씩 빠르게 성장하여 '21년 약 5조원 규모로 성장, 이에 따라 지식전문가를 찾는 수요도 함께 증가하고 있음",
        "글로벌 자기계발 시장은 '22년 약 54조원 규모, 최근 삶의 질 향상에 대한 개인들의 관심이 증가함에 따라 자기인식(Self-awareness) 부문의 성장세가 가파름"
      ]
    },
    {
      number: "2",
      title: "지식전문가 라인업 구축 및\n비즈니스 검증",
      icon: Users,
      iconColor: "#000050",
      items: [
        "국내 대표 인지심리학자 김경일 교수가 콘텐츠 개발 및 자문 총괄을 맡고 있으며, 기업 및 개인 고객의 다양한 니즈에 대응 가능한 전문가 라인업 구축",
        "2022년 8월 회사 설립 후 2024년 매출 18억원, 시장의 수요 확인 및 지식전문가를 공급하는 비즈니스 검증"
      ]
    },
    {
      number: "3",
      title: "핵심 지적재산권 및\n기술경쟁력 보유",
      icon: Shield,
      iconColor: "#000050",
      items: [
        "개인 심리 및 성격(기질) 검사 모델인 PDIC(Personal Digital Identity Care)의 License 확보, HEXACO, 국내 언어 분석 서비스 석학 확보와 지적재산권 확보, 특허 출원 및 논문 게재",
        "20년 이상 IT 경력을 보유한 경영진으로 초기 팀 구성하여 지식재산권 기반 IT 솔루션 구현, 고객 확대 및 비즈니스 확장 가능"
      ]
    }
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
      {/* 역량 콘텐츠 영역 */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="flex items-start justify-center w-full max-w-[75rem] mx-auto py-12 md:py-16">
          <div className="w-full px-4 md:px-8">
            <div className="space-y-6 md:space-y-8">
              {competencies.map((competency, index) => (
                <motion.div
                  key={competency.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* 왼쪽 영역 - 번호와 제목 */}
                    <div 
                      className="w-full md:w-[18.75rem] p-6 md:p-8 flex flex-col justify-center items-center"
                      style={{ backgroundColor: '#f5f5f7' }}
                    >
                      <div 
                        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: competency.iconColor }}
                      >
                        <competency.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <h3 
                        className="text-[#1e1e1e] whitespace-pre-line text-center"
                        style={{ 
                          fontFamily: 'Pretendard Variable, sans-serif',
                          fontWeight: 700,
                          fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)',
                          lineHeight: '1.5',
                          letterSpacing: '-0.01em'
                        }}
                      >
                        {competency.title}
                      </h3>
                    </div>

                    {/* 오른쪽 영역 - 상세 내용 */}
                    <div className="flex-1 p-6 md:p-8">
                      <ul className="space-y-4">
                        {competency.items.map((item, itemIndex) => (
                          <li 
                            key={itemIndex}
                            className="flex items-start gap-3"
                          >
                            <div className="flex-shrink-0 mt-2">
                              <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: '#000050' }}
                              />
                            </div>
                            <p 
                              className="text-[#1e1e1e] flex-1"
                              style={{ 
                                fontFamily: 'Pretendard Variable, sans-serif',
                                fontWeight: 400,
                                fontSize: 'clamp(0.875rem, 1.8vw, 1rem)',
                                lineHeight: '1.7',
                                letterSpacing: '-0.01em'
                              }}
                            >
                              {item}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 하단 여백 */}
            <div className="h-8"></div>
          </div>
        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}