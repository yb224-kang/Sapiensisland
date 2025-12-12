import { motion } from "framer-motion";
import PageHeroLayout from "../../components/PageHeroLayout";
import SectionContainer from "../../components/SectionContainer";
import Footer from "../../components/Footer";

export default function AboutCompetencyPage() {
  const tabs = [
    { id: "vision", label: "비전", path: "/vision" },
    { id: "competency", label: "역량", path: "/competency" },
    { id: "history", label: "연혁", path: "/history" }
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
      {/* 역량 콘텐츠 영역 - 비어있음 */}
      <SectionContainer backgroundColor="white" reducedTopPadding>
        <div className="flex items-start justify-center min-h-[400px] w-full max-w-[75rem] mx-auto pt-8">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-[var(--section-bg-gray)] to-white rounded-2xl border-2 border-dashed border-[var(--section-brand-primary)]/30">
                <div className="text-center p-8">
                  <p 
                    className="text-[var(--section-text-secondary)] text-[16px] md:text-[18px]"
                    style={{ fontFamily: 'Pretendard Variable, sans-serif', fontWeight: 600 }}
                  >
                    준비중입니다
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Footer */}
      <Footer />
    </PageHeroLayout>
  );
}