import { motion } from "motion/react";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";
import { useState } from "react";
import { historyData, QuarterData } from "../../data/historyData";

export default function AboutHistoryPage() {
  const tabs = [
    { id: "vision", label: "비전", path: "/vision" },
    { id: "competency", label: "역량", path: "/competency" },
    { id: "history", label: "연혁", path: "/history" },
    { id: "location", label: "연락처 / 오시는길", path: "/location" }
  ];

  // 분기별 색상 테마
  const quarterColors = {
    '1분기': { 
      bg: 'rgba(34, 197, 94, 0.08)',
      border: 'rgba(34, 197, 94, 0.2)',
      accent: '#22c55e'
    },
    '2분기': { 
      bg: 'rgba(59, 130, 246, 0.08)',
      border: 'rgba(59, 130, 246, 0.2)',
      accent: '#3b82f6'
    },
    '3분기': { 
      bg: 'rgba(251, 146, 60, 0.08)',
      border: 'rgba(251, 146, 60, 0.2)',
      accent: '#fb923c'
    },
    '4분기': { 
      bg: 'rgba(168, 85, 247, 0.08)',
      border: 'rgba(168, 85, 247, 0.2)',
      accent: '#a855f7'
    }
  };

  const getQuarterColor = (quarterName: string) => {
    return quarterColors[quarterName as keyof typeof quarterColors] || quarterColors['1분기'];
  };

  // 연도별로 그룹핑
  const groupedByYear = historyData.reduce((acc, item) => {
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push(item);
    return acc;
  }, {} as Record<string, QuarterData[]>);

  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  const [expandedYears, setExpandedYears] = useState<string[]>(years);

  const toggleYear = (year: string) => {
    if (expandedYears.includes(year)) {
      setExpandedYears(expandedYears.filter(y => y !== year));
    } else {
      setExpandedYears([...expandedYears, year]);
    }
  };

  // 전체 타임라인 인덱스 계산
  let globalIndex = 0;

  return (
    <PageHeroLayout
      title="회사소개"
      description="지식 전문가의 인사이트와 초개인화 IT 기술을 결합해,<br class='hidden md:block' />타인과 자신을 이해하고 삶의 복잡한 문제를 해소하는 솔루션을 제공합니다."
      backgroundImage="https://images.presentationgo.com/2025/09/abstract-digital-data-wave.jpg"
      backgroundAlt="Team collaboration and network"
      tabs={tabs}
      basePath="/about"
    >
      {/* 연혁 타임라인 */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
          
          {/* 타임라인 컨테이너 */}
          <div className="relative">
            
            {/* 중앙 세로선 */}
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
              style={{ 
                background: 'linear-gradient(180deg, transparent 0%, #000050 10%, #000050 90%, transparent 100%)'
              }}
            />
            
            {/* 모바일 좌측 세로선 */}
            <div 
              className="absolute left-8 top-0 bottom-0 w-0.5 md:hidden"
              style={{ 
                background: 'linear-gradient(180deg, transparent 0%, #000050 10%, #000050 90%, transparent 100%)'
              }}
            />

            {/* 연도별 섹션 */}
            <div className="space-y-10 md:space-y-14">
              {years.map((year, yearIndex) => {
                const isExpanded = expandedYears.includes(year);
                const quarters = groupedByYear[year].sort((a, b) => 
                  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                
                return (
                  <div key={year} className="relative">
                    
                    {/* 연도 배지 - 중앙 */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative z-10 flex justify-center md:justify-center mb-6 md:mb-8"
                    >
                      <div className="flex items-center gap-4 ml-20 md:ml-0">
                        <button
                          onClick={() => toggleYear(year)}
                          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, #000050 0%, #000080 100%)',
                            boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 80, 0.3), 0 0 0 0.25rem rgba(255, 255, 255, 1), 0 0 0 0.375rem rgba(0, 0, 80, 0.2)'
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'Pretendard Variable, sans-serif',
                              fontWeight: 800,
                              fontSize: '1.5rem',
                              color: 'white'
                            }}
                          >
                            {year}
                          </span>
                        </button>
                        
                        <button
                          onClick={() => toggleYear(year)}
                          className="px-3 py-1.5 rounded-full text-sm transition-all duration-300 md:hidden"
                          style={{
                            fontFamily: 'Pretendard Variable, sans-serif',
                            fontWeight: 600,
                            background: isExpanded ? '#000050' : 'white',
                            color: isExpanded ? 'white' : '#000050',
                            border: '0.125rem solid #000050'
                          }}
                        >
                          {isExpanded ? '접기' : '펼치기'}
                        </button>
                      </div>
                    </motion.div>

                    {/* 분기별 내용 */}
                    {isExpanded && (
                      <div className="space-y-6 md:space-y-8">
                        {quarters.map((quarter, qIndex) => {
                          const colors = getQuarterColor(quarter.quarter);
                          const isLeft = globalIndex % 2 === 0;
                          const currentGlobalIndex = globalIndex++;
                          
                          return (
                            <div key={qIndex} className="relative">
                              
                              {/* 데스크톱: 좌우 번갈아 배치 */}
                              <div className="hidden md:block">
                                <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                                  <motion.div
                                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: qIndex * 0.1 }}
                                    className="w-5/12"
                                  >
                                    {/* 분기 카드 */}
                                    <div
                                      className="rounded-xl p-6 relative"
                                      style={{
                                        background: 'white',
                                        border: `0.125rem solid ${colors.border}`,
                                        boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.08)'
                                      }}
                                    >
                                      {/* 내용 */}
                                      <div className="space-y-4">
                                        {quarter.content.map((item, itemIndex) => (
                                          <div key={itemIndex}>
                                            <div className="flex items-center gap-2 mb-2">
                                              <div
                                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                                style={{ background: colors.bg }}
                                              >
                                                <item.icon className="w-4 h-4" style={{ color: colors.accent }} />
                                              </div>
                                              <h4
                                                style={{
                                                  fontFamily: 'Pretendard Variable, sans-serif',
                                                  fontWeight: 600,
                                                  fontSize: '0.875rem',
                                                  color: '#000050'
                                                }}
                                              >
                                                {item.category}
                                              </h4>
                                            </div>
                                            <ul className="space-y-1 ml-10">
                                              {item.items.map((detail, detailIndex) => (
                                                <li
                                                  key={detailIndex}
                                                  className="flex items-start gap-2"
                                                >
                                                  <span
                                                    className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                                                    style={{ background: colors.accent }}
                                                  />
                                                  <span
                                                    style={{
                                                      fontFamily: 'Pretendard Variable, sans-serif',
                                                      fontWeight: 400,
                                                      fontSize: '0.8125rem',
                                                      color: '#1e1e1e',
                                                      lineHeight: '1.5'
                                                    }}
                                                  >
                                                    {detail}
                                                  </span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>

                                {/* 중앙 분기 태그 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileInView={{ scale: 1, opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: qIndex * 0.1 + 0.5 }}
                                  className="absolute left-1/2 -translate-x-1/2 z-20"
                                  style={{ top: '0.25rem' }}
                                >
                                  <div
                                    className="inline-flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap"
                                    style={{
                                      background: 'white',
                                      border: `0.125rem solid ${colors.border}`,
                                      boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)'
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: 'Pretendard Variable, sans-serif',
                                        fontWeight: 700,
                                        fontSize: '0.875rem',
                                        color: colors.accent
                                      }}
                                    >
                                      {quarter.quarter}
                                    </span>
                                  </div>
                                </motion.div>
                              </div>

                              {/* 모바일: 좌측 정렬 */}
                              <div className="md:hidden pl-20">
                                <motion.div
                                  initial={{ opacity: 0, x: -30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.5, delay: qIndex * 0.1 }}
                                >
                                  {/* 분기 카드 */}
                                  <div
                                    className="rounded-xl p-4 relative"
                                    style={{
                                      background: 'white',
                                      border: `0.125rem solid ${colors.border}`,
                                      boxShadow: '0 0.25rem 1rem rgba(0, 0, 0, 0.08)'
                                    }}
                                  >
                                    {/* 내용 */}
                                    <div className="space-y-3">
                                      {quarter.content.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                          <div className="flex items-center gap-2 mb-2">
                                            <div
                                              className="w-7 h-7 rounded-full flex items-center justify-center"
                                              style={{ background: colors.bg }}
                                            >
                                              <item.icon className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                                            </div>
                                            <h4
                                              style={{
                                                fontFamily: 'Pretendard Variable, sans-serif',
                                                fontWeight: 600,
                                                fontSize: '0.8125rem',
                                                color: '#000050'
                                              }}
                                            >
                                              {item.category}
                                            </h4>
                                          </div>
                                          <ul className="space-y-1 ml-9">
                                            {item.items.map((detail, detailIndex) => (
                                              <li
                                                key={detailIndex}
                                                className="flex items-start gap-2"
                                              >
                                                <span
                                                  className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                                                  style={{ background: colors.accent }}
                                                />
                                                <span
                                                  style={{
                                                    fontFamily: 'Pretendard Variable, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: '0.75rem',
                                                    color: '#1e1e1e',
                                                    lineHeight: '1.5'
                                                  }}
                                                >
                                                  {detail}
                                                </span>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>

                                {/* 좌측 분기 태그 */}
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileInView={{ scale: 1, opacity: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: qIndex * 0.1 + 0.5 }}
                                  className="absolute left-8 -translate-x-1/2 z-20"
                                  style={{ top: '0.5rem' }}
                                >
                                  <div
                                    className="inline-flex items-center px-2.5 py-1 rounded-lg whitespace-nowrap"
                                    style={{
                                      background: 'white',
                                      border: `0.125rem solid ${colors.border}`,
                                      boxShadow: '0 0.125rem 0.5rem rgba(0, 0, 0, 0.1)'
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: 'Pretendard Variable, sans-serif',
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        color: colors.accent
                                      }}
                                    >
                                      {quarter.quarter}
                                    </span>
                                  </div>
                                </motion.div>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </SectionContainer>

      <Footer />
    </PageHeroLayout>
  );
}